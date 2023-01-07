import { Ref } from "vue";
import { IProjectableModel } from "../helpers/Projector";
declare const _sfc_main: import("vue").DefineComponent<{
    name: {
        type: StringConstructor;
        default: string;
    };
}, {
    currentView: Ref<any>;
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
