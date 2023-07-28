export declare const MessageService: {
    Instance: {
        ask: <T>(name: string, ...args: any[]) => Promise<T>;
        reply: (name: string, cb: (...args: any[]) => Promise<any>, opts?: {
            force: boolean;
        }) => () => void;
        send: (name: string, ...args: any[]) => void;
        subscribe: (name: string, cb: (...args: any[]) => any) => () => void;
        once: (name: string, cb: (...args: any[]) => any) => void;
        unsubscibe: (name: string, cb?: ((...args: any[]) => any) | undefined) => void;
    };
};
