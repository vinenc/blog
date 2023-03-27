import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import { createPinia } from "pinia";
import VMdPreview from "./utils/md";
import IconFont from "./components/Custom/IconFont.vue";
import router from "@/router/index";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(VMdPreview);
app.component("IconFont", IconFont);

app.mount("#app");
