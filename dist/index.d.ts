import { MenuHelper, menuType, MenuNotifications, IMenuDefinition } from "./helpers/MenuHelper";
import { CommonRegistry } from "./helpers/CommonRegistry";
import { MessageService } from "./helpers/MessageService";
import inject from './components/inject.vue';
import screen from "./components/screen.vue";
import { IProjectableModel, Projectable, Projector } from "./helpers/Projector";
import { ScreensManager } from "./directives/screen";
import { validate as ValidateDirective } from "./directives/validate";
import { RouteRecordRaw } from "vue-router";
declare function install(Vue: {
    component: any;
    directive: any;
}): void;
export interface IModuleInitializer {
    init(vuemf: typeof VueMfModule, menu: MenuHelper, configuration: any): Promise<void>;
    config?(menu: MenuHelper, configuration: any): Promise<void>;
    run?(menu: MenuHelper, configuration: any): Promise<void>;
    routes: RouteRecordRaw[];
}
interface IModuleInitializerWrapper {
    init(menu: MenuHelper, configuration: any, options: {
        registry: CommonRegistry;
        messageService: typeof MessageService.Instance;
        projector: Projector;
        screens: ScreensManager;
    }): Promise<void>;
    config(menu: MenuHelper): Promise<void>;
    run(menu: MenuHelper): Promise<void>;
    routes: RouteRecordRaw[];
}
export declare function ModuleInitializer(opts: IModuleInitializer): IModuleInitializerWrapper;
export declare function InitModule(module: {
    default: IModuleInitializerWrapper;
}, configuration: any | undefined): Promise<IModuleInitializer>;
export declare function ConfigModule(module: any): Promise<void>;
export declare function RunModule(module: any): Promise<void>;
export declare function ModuleRoutes(module: any): RouteRecordRaw[];
export { MenuHelper, type IMenuDefinition, menuType, CommonRegistry, MessageService, inject, screen, ValidateDirective, type Projectable, type IProjectableModel, MenuNotifications, Projector, };
declare const VueMfModule: {
    install: typeof install;
    MenuHelper: MenuHelper;
    menuType: typeof menuType;
    CommonRegistry: CommonRegistry;
    MessageService: {
        Instance: {
            ask: <T>(name: string, ...args: any[]) => Promise<T>;
            reply: (name: string, cb: (...args: any[]) => any, opts?: {
                force: boolean;
            }) => () => void;
            send: (name: string, ...args: any[]) => void;
            subscribe: (name: string, cb: (...args: any[]) => any) => () => void;
            once: (name: string, cb: (...args: any[]) => any) => void;
            unsubscribe: (name: string, cb: (...args: any[]) => any) => void;
        };
    };
    inject: import("vue").DefineComponent<{
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
                from<T_1>(arrayLike: ArrayLike<T_1>): T_1[];
                from<T_2, U>(arrayLike: ArrayLike<T_2>, mapfn: (v: T_2, k: number) => U, thisArg?: any): U[];
                from<T_3>(iterable: Iterable<T_3> | ArrayLike<T_3>): T_3[];
                from<T_4, U_1>(iterable: Iterable<T_4> | ArrayLike<T_4>, mapfn: (v: T_4, k: number) => U_1, thisArg?: any): U_1[];
                of<T_5>(...items: T_5[]): T_5[];
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
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
                from<T_1>(arrayLike: ArrayLike<T_1>): T_1[];
                from<T_2, U>(arrayLike: ArrayLike<T_2>, mapfn: (v: T_2, k: number) => U, thisArg?: any): U[];
                from<T_3>(iterable: Iterable<T_3> | ArrayLike<T_3>): T_3[];
                from<T_4, U_1>(iterable: Iterable<T_4> | ArrayLike<T_4>, mapfn: (v: T_4, k: number) => U_1, thisArg?: any): U_1[];
                of<T_5>(...items: T_5[]): T_5[];
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
        id: null;
        type: string;
        value: null;
        names: string[];
        group: string;
        metadata: Record<string, any>;
        disabled: boolean;
        readonly: boolean;
    }, {}>;
    screen: import("vue").DefineComponent<{
        name: {
            type: StringConstructor;
            default: string;
        };
    }, {
        currentViewUID: import("vue").ComputedRef<any>;
        currentView: import("vue").Ref<import("vue").Component>;
        model: import("vue").Ref<IProjectableModel<any> | null>;
        isVisible: import("vue").ComputedRef<boolean>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        name: {
            type: StringConstructor;
            default: string;
        };
    }>>, {
        name: string;
    }, {}>;
    ValidateDirective: {
        inserted: (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, bind: {
            value: (errors: string[], valid: boolean) => void;
            arg: "immediate";
        }) => void;
        unbind: (el: Element) => void;
    };
    MenuNotifications: {
        menuDefinitionAdded: string;
    };
    Projector: typeof Projector;
};
export default VueMfModule;
