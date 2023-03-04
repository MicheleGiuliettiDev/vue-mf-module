import { MenuHelper, menuType, MenuNotifications, IMenuDefinition } from "./helpers/MenuHelper";
import { CommonRegistry } from "./helpers/CommonRegistry";
import { MessageService } from "./helpers/MessageService";
import { IRouteConfig } from "./interfaces/RouterInterfaces";
import { IStore } from "./interfaces/StoreInterfaces";
import Inject from "./components/inject.vue";
import Screen from "./components/screen.vue";
import { VueConstructor } from "vue";
import { IProjectableModel, Projectable, Projector } from "./helpers/Projector";
import { ScreensManager } from "./directives/screen";
import { validate as ValidateDirective } from "./directives/validate";
declare function install(Vue: VueConstructor): void;
export interface IModuleInitializer {
    init(vuemf: typeof VueMfModule, menu: MenuHelper, store: IStore, configuration: any): Promise<void>;
    config?(menu: MenuHelper, store: IStore, configuration: any): Promise<void>;
    run?(menu: MenuHelper, store: IStore, configuration: any): Promise<void>;
    routes: IRouteConfig[];
}
interface IModuleInitializerWrapper {
    init(menu: MenuHelper, store: IStore, configuration: any, options: {
        registry: CommonRegistry;
        messageService: MessageService;
        projector: Projector;
        screens: ScreensManager;
    }): Promise<void>;
    config(menu: MenuHelper, store: IStore): Promise<void>;
    run(menu: MenuHelper, store: IStore): Promise<void>;
    routes: IRouteConfig[];
}
export declare function ModuleInitializer(opts: IModuleInitializer): IModuleInitializerWrapper;
export declare function InitModule(module: any, store: IStore, configuration: any | undefined): Promise<IModuleInitializer>;
export declare function ConfigModule(module: any, store: IStore): Promise<void>;
export declare function RunModule(module: any, store: IStore): Promise<void>;
export declare function ModuleRoutes(module: any): IRouteConfig[];
export { MenuHelper, type IMenuDefinition, menuType, CommonRegistry, MessageService, Inject, Screen, ValidateDirective, type Projectable, type IProjectableModel, MenuNotifications, Projector, };
declare const VueMfModule: {
    install: typeof install;
    MenuHelper: MenuHelper;
    menuType: typeof menuType;
    CommonRegistry: CommonRegistry;
    MessageService: MessageService;
    Inject: import("vue").DefineComponent<{
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
        type: string;
        id: null;
        names: string[];
        group: string;
        metadata: Record<string, any>;
        disabled: boolean;
        readonly: boolean;
    }>;
    Screen: import("vue").DefineComponent<{
        name: {
            type: StringConstructor;
            default: string;
        };
    }, {
        currentViewUID: import("vue").ComputedRef<any>;
        currentView: import("vue").Ref<import("vue").Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>;
        model: import("vue").Ref<IProjectableModel<any> | null>;
        isVisible: import("vue").ComputedRef<boolean>;
    }, {}, {}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
        name: {
            type: StringConstructor;
            default: string;
        };
    }>>, {
        name: string;
    }>;
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
