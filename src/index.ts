import { MenuHelper, menuType, MenuNotifications, IMenuDefinition } from "./helpers/MenuHelper";
import { CommonRegistry } from "./helpers/CommonRegistry";
import { MessageService } from "./helpers/MessageService";
import { IRouteConfig } from "./interfaces/RouterInterfaces";
import { IStore } from "./interfaces/StoreInterfaces";
import Inject from "./components/inject.vue";
import Screen from "./components/screen.vue";
import { VueConstructor } from "vue";
import { IProjectableModel, Projectable, Projector } from "./helpers/Projector";
import directives, { ScreensManager } from "./directives/screen";
import { validate as ValidateDirective } from "./directives/validate";


function install(Vue: VueConstructor) {
  Vue.component("screen", Screen);
  Vue.component("inject", Inject);
  Vue.directive("screen", directives.screenDirective);
  Vue.directive("projectTo", directives.projectToDirective);
  Vue.directive("validate", ValidateDirective as any);
}


export interface IModuleInitializer {
  init(vuemf: typeof VueMfModule, menu: MenuHelper, store: IStore, configuration: any): Promise<void>,

  config?(menu: MenuHelper, store: IStore, configuration: any): Promise<void>,

  run?(menu: MenuHelper, store: IStore, configuration: any): Promise<void>,

  routes: IRouteConfig[]
}

interface IModuleInitializerWrapper {
  init(menu: MenuHelper,
    store: IStore,
    configuration: any
    , options: {
      registry: CommonRegistry,
      messageService: typeof MessageService.Instance,
      projector: Projector,
      screens: ScreensManager
    }): Promise<void>,
  config(menu: MenuHelper,
    store: IStore): Promise<void>,
  run(menu: MenuHelper,
    store: IStore): Promise<void>,
  routes: IRouteConfig[]
}

export function ModuleInitializer(opts: IModuleInitializer) {
  let moduleConfig = {};
  return {
    init(menu: MenuHelper, store: IStore, configuration: any,
      options: {
        registry: CommonRegistry,
        messageService: typeof MessageService.Instance,
        projector: Projector,
        screens: ScreensManager
      }) {

      if (options.registry) CommonRegistry.Instance = options.registry;
      if (options.messageService) MessageService.Instance = options.messageService
      if (options.projector) Projector.Instance = options.projector;
      if (options.screens) ScreensManager.Instance = options.screens;
      moduleConfig = configuration;
      return opts.init(VueMfModule, menu, store, configuration);
    },
    config(menu: MenuHelper, store: IStore) {
      return opts.config ? opts.config(menu, store, moduleConfig) : null;
    },
    run(menu: MenuHelper, store: IStore) {
      return opts.run ? opts.run(menu, store, moduleConfig) : null;
    },
    routes: opts.routes
  } as IModuleInitializerWrapper
}

export function InitModule(module: any, store: IStore, configuration: any | undefined): Promise<IModuleInitializer> {
  const initobj = (module.default.default || module.default) as IModuleInitializerWrapper;
  return initobj.init(MenuHelper.Instance, store, configuration || {},
    {
      registry: CommonRegistry.Instance,
      messageService: MessageService.Instance,
      projector: Projector.Instance,
      screens: ScreensManager.Instance
    }).then(() => {
      return initobj as unknown as IModuleInitializer;
    });
}

export function ConfigModule(module: any, store: IStore): Promise<void> {
  const initobj = (module.default.default || module.default) as IModuleInitializerWrapper;
  return initobj.config(MenuHelper.Instance, store);
}


export function RunModule(module: any, store: IStore): Promise<void> {
  const initobj = (module.default.default || module.default) as IModuleInitializerWrapper;
  return initobj.run(MenuHelper.Instance, store);
}

export function ModuleRoutes(module: any): IRouteConfig[] {
  const initobj = (module.default.default || module.default) as IModuleInitializerWrapper;
  return initobj.routes;
}

export {
  MenuHelper,
  type IMenuDefinition,
  menuType,
  CommonRegistry,
  MessageService,
  Inject,
  Screen,
  ValidateDirective,
  type Projectable,
  type IProjectableModel,
  MenuNotifications,
  Projector,
}

const VueMfModule = {
  install,
  MenuHelper: new MenuHelper(),
  menuType,
  CommonRegistry: new CommonRegistry(),
  MessageService: MessageService,
  Inject,
  Screen,
  ValidateDirective,
  MenuNotifications,
  Projector
}

export default VueMfModule;
