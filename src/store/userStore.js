import { defineStore } from "pinia";
let user = {};
const userStore = defineStore("user", {
  state: () => user,
});
export default userStore;
