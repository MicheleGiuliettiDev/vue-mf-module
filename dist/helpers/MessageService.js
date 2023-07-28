// import { TinyEmitter } from "tiny-emitter";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// export class MessageService {
//   private static instance = new MessageService();
//   static get Instance() { return MessageService.instance }
//   static set Instance(v: MessageService) { this.instance = v; }
//   notifier: TinyEmitter = new TinyEmitter();
//   send(message: string, ...args: any[]) {
//     this.notifier.emit(message, ...args);
//   }
//   subscribe(message: string, callback: Function, ctx?: any) {
//     this.notifier.on(message, callback, ctx);
//   }
//   once(message: string, callback: Function, ctx?: any) {
//     this.notifier.once(message, callback, ctx);
//   }
//   unsubscribe(message: string, callback?: Function) {
//     this.notifier.off(message, callback);
//   }
//   ask<T>(message: string, ...args: any[]): Promise<T> {
//     return new Promise((resolve, reject) => {
//       this.notifier.emit(`$ask-${message}`, {
//         resolve,
//         reject,
//         args
//       })
//     })
//   }
//   reply<R>(message: string, callback: (...args: any[]) => R) {
//     this.notifier.on(`$ask-${message}`, (m: { resolve: (data: R) => void, reject: Function, args: any[] }) => {
//       try {
//         let result = callback(...m.args);
//         m.resolve(result);
//       }
//       catch (err) {
//         m.reject();
//       }
//     });
//   }
// }
const askReplyChannels = new Map();
const sendSubscribeChannels = new Map();
const sendSubscribeCallbacks = new Map();
const ask = (name, ...args) => {
    return new Promise(resolve => {
        var _a;
        let port = (_a = askReplyChannels.get(name)) === null || _a === void 0 ? void 0 : _a.port1;
        if (!port) {
            const c = new MessageChannel();
            askReplyChannels.set(name, c);
            port = c.port1;
        }
        let innerchannel = new MessageChannel();
        const l = (evt) => {
            resolve(evt.data);
            innerchannel = null;
        };
        innerchannel.port1.onmessage = l;
        port.postMessage(args, [innerchannel.port2]);
    });
};
const reply = (name, cb, opts = { force: false }) => {
    var _a;
    let port = (_a = askReplyChannels.get(name)) === null || _a === void 0 ? void 0 : _a.port2;
    if (!port) {
        const c = new MessageChannel();
        askReplyChannels.set(name, c);
        port = c.port2;
    }
    if (!opts.force && port.onmessage)
        throw "reply already set for message " + name;
    const l = (evt) => __awaiter(void 0, void 0, void 0, function* () {
        const innerport = evt.ports[0];
        const r = yield cb(...evt.data);
        innerport.postMessage(r);
        innerport.close();
    });
    port.onmessage = l;
    return () => {
        port.onmessage = null;
    };
};
const send = (name, ...args) => {
    var _a;
    let port = (_a = sendSubscribeChannels.get(name)) === null || _a === void 0 ? void 0 : _a.port1;
    if (!port) {
        const c = new MessageChannel();
        sendSubscribeChannels.set(name, c);
        port = c.port1;
    }
    port.postMessage(args);
};
const subscribe = (name, cb) => {
    var _a;
    let port = (_a = sendSubscribeChannels.get(name)) === null || _a === void 0 ? void 0 : _a.port2;
    if (!port) {
        const c = new MessageChannel();
        sendSubscribeChannels.set(name, c);
        port = c.port2;
    }
    const l = (evt) => {
        cb(...evt.data);
    };
    sendSubscribeCallbacks.set(cb, l);
    port.addEventListener("message", l);
    port.start();
    return () => {
        port === null || port === void 0 ? void 0 : port.removeEventListener("message", l);
        sendSubscribeCallbacks.delete(cb);
    };
};
const once = (name, cb) => {
    const unsubscibe = subscribe(name, (...args) => {
        cb(...args);
        unsubscibe();
    });
};
const unsubscibe = (name, cb) => {
    var _a;
    let port = (_a = sendSubscribeChannels.get(name)) === null || _a === void 0 ? void 0 : _a.port1;
    if (!port)
        return;
    if (cb) {
        const l = sendSubscribeCallbacks.get(cb);
        if (l) {
            port.removeEventListener("message", l);
            sendSubscribeCallbacks.delete(cb);
        }
    }
};
// export {
//   ask,
//   reply,
//   send,
//   subscribe,
//   once,
//   unsubscibe
// }
export const MessageService = {
    Instance: {
        ask,
        reply,
        send,
        subscribe,
        once,
        unsubscibe
    }
};
