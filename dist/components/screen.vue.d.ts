import { Component, Ref } from "vue";
import { IProjectableModel } from "../helpers/Projector";
declare const _default: import("vue").DefineComponent<{
    name: {
        type: StringConstructor;
        default: string;
    };
}, {
    currentViewUID: import("vue").ComputedRef<any>;
    currentView: Ref<Component>;
    model: Ref<IProjectableModel<any> | null>;
    isVisible: import("vue").ComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    name: string;
}, {}>;
export default _default;
