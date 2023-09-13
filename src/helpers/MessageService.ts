const askReplyChannels = new Map<string, MessageChannel>();
const sendSubscribeChannels = new Map<string, MessageChannel>();
const sendSubscribeCallbacks = new Map<Function, (...args: any[]) => any>();

const ask = <T>(name: string, ...args: any[]): Promise<T> => {
  return new Promise(resolve => {
    let port = askReplyChannels.get(name)?.port1
    if (!port) {
      const c = new MessageChannel();
      askReplyChannels.set(name, c);
      port = c.port1
    }
    let innerchannel = new MessageChannel();
    const l = (evt: MessageEvent) => {
      resolve(evt.data);
      innerchannel = null!;
    }
    innerchannel.port1.onmessage = l;
    port.postMessage(args, [innerchannel.port2]);
  });
}

const reply = (name: string, cb: (...args: any[]) => Promise<any> | any, opts: { force: boolean } = { force: false }) => {
  let port = askReplyChannels.get(name)?.port2
  if (!port) {
    const c = new MessageChannel();
    askReplyChannels.set(name, c);
    port = c.port2
  }
  if (!opts.force && port.onmessage) throw "reply already set for message " + name
  const l = async (evt: MessageEvent) => {
    const innerport = evt.ports[0]
    const r = await cb(...evt.data);
    innerport.postMessage(r);
    innerport.close();
  }
  port.onmessage = l;
  return () => {
    port!.onmessage = null!;
  }
}

const send = (name: string, ...args: any[]) => {
  let port = sendSubscribeChannels.get(name)?.port1
  if (!port) {
    const c = new MessageChannel();
    sendSubscribeChannels.set(name, c);
    port = c.port1
  }
  port.postMessage(args);
}

const subscribe = (name: string, cb: (...args: any[]) => any) => {
  let port = sendSubscribeChannels.get(name)?.port2
  if (!port) {
    const c = new MessageChannel();
    sendSubscribeChannels.set(name, c);
    port = c.port2
  }
  const l = (evt: MessageEvent) => {
    cb(...evt.data);
  }
  sendSubscribeCallbacks.set(cb, l);
  port.addEventListener("message", l);
  port.start();
  return () => {
    port?.removeEventListener("message", l);
    sendSubscribeCallbacks.delete(cb);
  }
}

const once = (name: string, cb: (...args: any[]) => any) => {
  const unsubscibe = subscribe(name, (...args: any[]) => {
    cb(...args);
    unsubscibe();
  });
}

const unsubscribe = (name: string, cb: (...args: any[]) => any) => {
  let port = sendSubscribeChannels.get(name)?.port2
  if (!port) return;
  const l = sendSubscribeCallbacks.get(cb);
  if (l) {
    port.removeEventListener("message", l);
    sendSubscribeCallbacks.delete(cb);
  }
}

export {
  ask,
  reply,
  send,
  subscribe,
  once,
  unsubscribe
}

export const MessageService = {
  Instance: {
    ask,
    reply,
    send,
    subscribe,
    once,
    unsubscibe: unsubscribe
  }
}