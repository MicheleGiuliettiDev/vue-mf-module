declare const ask: <T>(name: string, ...args: any[]) => Promise<T>;
declare const reply: (name: string, cb: (...args: any[]) => Promise<any> | any, opts?: {
    force: boolean;
}) => () => void;
declare const send: (name: string, ...args: any[]) => void;
declare const subscribe: (name: string, cb: (...args: any[]) => any) => () => void;
declare const once: (name: string, cb: (...args: any[]) => any) => void;
declare const unsubscribe: (name: string, cb: (...args: any[]) => any) => void;
export { ask, reply, send, subscribe, once, unsubscribe };
export declare const MessageService: {
    Instance: {
        ask: <T>(name: string, ...args: any[]) => Promise<T>;
        reply: (name: string, cb: (...args: any[]) => Promise<any> | any, opts?: {
            force: boolean;
        }) => () => void;
        send: (name: string, ...args: any[]) => void;
        subscribe: (name: string, cb: (...args: any[]) => any) => () => void;
        once: (name: string, cb: (...args: any[]) => any) => void;
        unsubscribe: (name: string, cb: (...args: any[]) => any) => void;
    };
};
