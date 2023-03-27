<template>
  <div
    class="menu-btn"
    :class="app.screenS ? 'menu-btn-mobile' : 'menu-btn-pc'"
    id="meuBtn"
  >
    <!-- Aside menu btn (Mobile) -->
    <button class="aside-btn" v-if="app.screenS" @click="clickMenu">
      <icon-font :icon="'icon-menu'" />
    </button>
    <!-- Logo (PC & Mobile) -->
    <icon-font class="logo" :icon="'icon-content'" v-if="!app.screenM" />
    <!-- Header menu btn (Mobile) -->
    <button class="search-btn" v-if="app.screenS" @click="clickSearch">
      <icon-font :icon="'icon-search'" />
    </button>
  </div>
</template>

<script setup>
import { inject } from "vue";
import emitter from "@/utils/bus";

const app = inject("app");

const clickMenu = function () {
  emitter.emit("changeAside");
};
const clickSearch = function () {
  emitter.emit("changeBtnActive");
};
</script>

<style lang="scss" scoped>
.menu-btn {
  @include display(flex, space-between, center);
  // Button
  .aside-btn,
  .search-btn {
    width: 60px;
    height: 60px;
    font-size: 24px;
    text-align: center;
    line-height: 60px;
    &:hover {
      @include color("theme-color-2");
      stroke-width: 20;
      @include stroke("theme-color-2");
    }
  }
  // Logo
  .logo {
    width: auto;
    max-width: 150px;
    margin-left: 20px;
    padding-top: 10px;
    height: 60px;
    box-sizing: border-box;
    cursor: pointer;
  }
}
// PC
// .menu-btn-pc {
// }
// Mobile
.menu-btn-mobile {
  box-shadow: 0 1px 6px rgb(0 0 0 / 8%);
}
</style>
