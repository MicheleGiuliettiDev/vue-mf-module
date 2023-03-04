<template>
  <div style="border: 1px solid rebeccapurple;">
    <button @click="project">project</button>
    <button @click="projectAsync">project async</button>
    <button @click="stopproject">stop projecting</button>
    <h1>below is the screen</h1>
    <screen></screen>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Projector } from '../helpers/Projector';
import injectedComponent from './injectedComponent.vue';

export default defineComponent({
  setup() {
    let count = ref(0);
    const project = () => {
      Projector.Instance.projectTo(injectedComponent, { starting: count });
      count.value++
    }

    const stopproject = () => {
      Projector.Instance.stopProjecting()
    }

    const projectAsync = async () => {
      const returnvalue = await Projector.Instance.projectAsyncTo(injectedComponent, { starting: 1 });
      console.debug("returning from async projection", returnvalue)
    }

    return {
      project,
      projectAsync,
      stopproject
    }
  }
})

</script>