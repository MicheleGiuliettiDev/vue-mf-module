<template>
  <div>
    <div style="border: 1px solid rebeccapurple;">
      <button @click="project">project</button>
      <button @click="projectAsync">project async</button>
      <button @click="stopproject">stop projecting</button>
      <h1>below is the screen</h1>
      <screen></screen>
    </div>
    <div style="border: 1px solid fuchsia;">
      <h1>messages</h1>
      <p>
        <input v-model="asking" />
        <button @click="ask">ask</button>
        <span>reply: <strong>{{ replying }}</strong></span>
      </p>
      <p>
        <input v-model="asking" readonly />
        <button @click="send">send</button>
        <br/>
        <span>subscribtion result: <strong>{{ subscribb }}</strong></span>
        <br/>
        <span>other subscribtion result: <strong>{{ osubscribb }}</strong></span>
      </p>
      <span>once value: <strong>{{ once }}</strong></span>
      <p>
        <button @click="unsubscribeByR">unsubscribe by return handler</button>
        <button @click="unsubscribeByC">explicit unsubscribe</button>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Projector } from '../helpers/Projector';
import injectedComponent from './injectedComponent.vue';
import { MessageService } from '../helpers/MessageService';

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


    const asking = ref("?");
    const replying = ref("");
    const ask = () => {
      MessageService.Instance.ask<string>("TEST-ASK", asking.value).then(r => replying.value = r);
    }
    MessageService.Instance.reply("TEST-ASK", (v) => v + "" + v);

    const subscribb = ref("")
    const stf = (v: string) => subscribb.value = "value from subscruption: " + v;
    const r = MessageService.Instance.subscribe("TEST-SUB", stf);
    const send = () => {
      MessageService.Instance.send("TEST-SUB", asking.value);
    }

    const osubscribb = ref("")
    MessageService.Instance.subscribe("TEST-SUB", (v: string) => osubscribb.value = "osubcribb " + v);

    const unsubscribeByR = () => r();
    const unsubscribeByC = () => MessageService.Instance.unsubscibe("TEST-SUB", stf)
    const once = ref("")
    MessageService.Instance.once("TEST-SUB", (v) => once.value = "once " + v)



    return {
      project,
      projectAsync,
      stopproject,
      asking,
      ask,
      replying,
      send,
      subscribb,
      unsubscribeByR,
      unsubscribeByC,
      once,
      osubscribb
    }
  }
})

</script>