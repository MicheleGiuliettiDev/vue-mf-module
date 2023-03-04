import { Component, Ref } from "vue";
import { IProjectableModel } from "../helpers/Projector";
declare const _sfc_main: import("vue").DefineComponent<{
    name: {
        type: StringConstructor;
        default: string;
    };
}, {
    currentViewUID: import("vue").ComputedRef<any>;
    currentView: Ref<Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>;
    model: Ref<IProjectableModel<any> | null>;
    isVisible: import("vue").ComputedRef<boolean>;
}, {}, {}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    name: string;
}>;
export default _sfc_main;
