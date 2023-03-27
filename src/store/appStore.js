import { defineStore } from "pinia";
import { appData } from "@/utils/data";

const appStore = defineStore("app", {
  state: () => appData,
});
export default appStore;
