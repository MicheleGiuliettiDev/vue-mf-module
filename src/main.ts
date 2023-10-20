import { createApp } from "vue";


import screen from "./components/screen.vue";

import screenContainer from "./playground/screenContainer.vue";

const app = createApp({
  render: (h: Function) => h(screenContainer),
})

app.component('screen', screen);

app.mount("#app")



