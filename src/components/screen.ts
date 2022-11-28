import Vue, { computed, defineComponent, getCurrentInstance, onMounted, Ref, ref } from "vue";
import { IProjectableModel, Projector } from "../helpers/Projector";

export default defineComponent({
  props: {
    name: { type: String, default: "defaultscreen" },
  },
  template: `<div v-show="isVisible"><component v-if="currentView" v-bind:is="currentView" :value="screenModel" :key="screenModel"></component></div>`,
  setup(props, {expose}) {
    
    const me = getCurrentInstance();

    const currentView: Ref<any> = ref(null);
    const screenModel: Ref<IProjectableModel<any> | null> = ref(null!);

    expose({ currentView, screenModel })

    const isVisible = computed(() => {
      return currentView.value != null;
    })

    onMounted(() => {
      Projector.Instance.setScreen(me, props.name);
    })

    return {
      currentView,
      screenModel,
      isVisible
    }
  }
})