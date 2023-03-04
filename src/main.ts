import Vue from "vue";


import screen from "./components/screen.vue";
Vue.component("screen", screen);





import screenContainer from "./playground/screenContainer.vue";

const app = new Vue({
  render: h => h(screenContainer),
});

app.$mount("#app")



