<template>
  <div
    class="msg"
    :class="app.screenS ? 'msg-mobile' : 'msg-pc'"
    v-if="showMsg"
    id="msg"
  >
    更多功能正在开发中...
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import emitter from "@/utils/bus";
import { closeDrop, watchListener } from "@/js/drop";

const app = inject("app");
const showMsg = ref(false);

const changeMsg = function () {
  showMsg.value = !showMsg.value;
};
const closeMsg = function (e) {
  const callback = (val) => (showMsg.value = val);
  closeDrop(e, callback, "msg", "msgIcon");
};

emitter.on("changeMsg", changeMsg);
onBeforeUnmount(() => emitter.off("changeMsg"));

watch(showMsg, (val) => watchListener(val, closeMsg));
</script>

<style lang="scss" scoped>
.msg {
  @include flex-center;
  width: 250px;
  height: 100px;
  box-shadow: 0 1px 6px rgb(0 0 0 / 8%);
  @include background-color("background-2");
}
.msg-pc {
  position: absolute;
  top: 60px;
  right: 0;
}
.msg-mobile {
  width: 100%;
}
</style>
