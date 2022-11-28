declare const _default: import("vue").DefineComponent<{
    id: {
        default: null;
    };
    type: {
        default: null;
        type: StringConstructor;
    };
    value: {
        default: null;
    };
    name: {
        type: StringConstructor;
        default: null;
    };
    names: {
        type: {
            (arrayLength: number): string[];
            (...items: string[]): string[];
            new (arrayLength: number): string[];
            new (...items: string[]): string[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
            of<T_4>(...items: T_4[]): T_4[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: null;
    };
    group: {
        type: StringConstructor;
        default: null;
    };
    metadata: {
        type: ObjectConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    id: null;
    type: string;
    value: null;
    name: string;
    names: string[];
    group: string;
    metadata: Record<string, any>;
    disabled: boolean;
    readonly: boolean;
    click: (...args: any[]) => void;
    save: (...args: any[]) => void;
    Components: import("vue").ComputedRef<any[]>;
    Value: import("vue").WritableComputedRef<null>;
}, {}, {}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    id: {
        default: null;
    };
    type: {
        default: null;
        type: StringConstructor;
    };
    value: {
        default: null;
    };
    name: {
        type: StringConstructor;
        default: null;
    };
    names: {
        type: {
            (arrayLength: number): string[];
            (...items: string[]): string[];
            new (arrayLength: number): string[];
            new (...items: string[]): string[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
            of<T_4>(...items: T_4[]): T_4[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: null;
    };
    group: {
        type: StringConstructor;
        default: null;
    };
    metadata: {
        type: ObjectConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    name: string;
    value: null;
    id: null;
    type: string;
    names: string[];
    group: string;
    metadata: Record<string, any>;
    disabled: boolean;
    readonly: boolean;
}>;
export default _default;
