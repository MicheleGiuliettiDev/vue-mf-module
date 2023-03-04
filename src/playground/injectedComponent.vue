<template>
  <div style="border: 1px solid red;">
    <strong>
      CIAO MONDO
      <span v-for="x in counter" :key="x">!!</span>
    </strong>
    <br />
    <button @click="exclams">!!</button>
    <button @click="stopProjecting">stop projecting me async!</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { Projector } from '..';
import { IProjectableModel } from '..';

export default defineComponent({
  props: {
    value: Object //IProjectableModel<{starting: number}>
  },
  setup(props) {
    console.debug("setting up the injected component", props.value)
    const counter: Ref<number> = ref(props.value?.data.starting || 0);

    const exclams = () => {
      counter.value++;
    }

    const stopProjecting = () => {
      if (props.value?.resolve) props.value?.resolve(counter.value);
      //  Projector.Instance.stopProjecting()   
    }

    return {
      counter,
      stopProjecting,
      exclams
    }
  }
})

</script>