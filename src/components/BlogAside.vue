<template>
  <div
    class="aside"
    :class="app.screenS ? 'aside-moblie' : 'aside-pc'"
    id="blogAside"
  >
    <tap-bar />
    <div class="line"></div>
    <date-chart />
    <aside-menu />
  </div>
</template>

<script setup>
import { inject } from "vue";
import TapBar from "./Aside/TapBar.vue";
import DateChart from "./Aside/DateChart.vue";
import AsideMenu from "./Aside/AsideMenu.vue";

const app = inject("app");
</script>

<style lang="scss" scoped>
.aside {
  width: 100%;
  padding: 0 20px;
  @include background-color("background-1");
  z-index: 20;
  user-select: none;
  .line {
    height: 1px;
    margin: 0 16px 10px;
    @include background-color("background-3");
  }
}
.aside-moblie {
  @include position(fixed, 0, 0, 0, 0);
  max-width: 300px;
  padding: 0 10px;
  @include transition-5;
}
.aside-pc {
  position: sticky;
  top: 0;
  max-width: 280px;
  min-width: 280px;
}
</style>
