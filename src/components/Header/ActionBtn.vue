<template>
  <div
    class="action-btn"
    :class="app.screenS ? 'action-mobile' : 'action-pc'"
    id="actionBtn"
  >
    <button class="btn" @click="clickMsgBtn" id="msgIcon">
      <icon-font :icon="'icon-messages'" />
    </button>
    <msg />

    <button class="btn" @click="clickUserBtn" id="userIcon">
      <icon-font :icon="'icon-admin'" />
    </button>
    <user />
  </div>
</template>

<script setup>
import { inject } from "vue";
import User from "./Drops/user.vue";
import Msg from "./Drops/Msg.vue";
import emitter from "@/utils/bus";
const app = inject("app");

const clickUserBtn = function () {
  emitter.emit("changeUser");
};
const clickMsgBtn = function () {
  emitter.emit("changeMsg");
};
</script>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
  box-sizing: border-box;
  @include color("text-2");
  @include background-color("background-1");
  &:hover {
    @include color("theme-color-2");
  }
}
// PC
.action-pc {
  position: relative;
  height: 100%;
  .btn {
    width: 60px;
    height: 60px;
    padding-top: 14px;
  }
}
// Mobile
.action-mobile {
  box-shadow: 0 1px 6px rgb(0 0 0 / 8%);
  .btn {
    width: 100%;
    height: 40px;
    padding-right: 90%;
    border-bottom: 1px solid rgb(0 0 0 / 8%);
  }
}
</style>
