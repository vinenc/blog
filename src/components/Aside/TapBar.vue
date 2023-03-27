<template>
  <div class="tap-bar">
    <div class="left">
      <icon-font class="position" :icon="'icon-clock'" />
      <div class="user-type">Admin</div>
    </div>
    <div class="right">
      <icon-font class="bell-icon" :icon="'icon-bell'" />
      <icon-font
        class="setting-icon"
        :icon="'icon-setting'"
        @click="clickSetting"
        id="settingIcon"
      />
    </div>
    <setting />
  </div>
</template>

<script setup>
import Setting from "./Drops/Setting.vue";
import emitter from "@/utils/bus";

const clickSetting = function () {
  emitter.emit("chagneSetting");
};
</script>

<style lang="scss" scoped>
.tap-bar {
  @include display(flex, space-between, center);
  position: relative;
  height: 60px;
  padding: 7px 16px 0;
  .left {
    @include flex-center;
    .position {
      width: 24px;
      height: 24px;
      cursor: pointer;
      &:hover {
        @include color("theme-color-2");
      }
    }
    .user-type {
      width: 50px;
      height: 20px;
      line-height: 20px;
      margin-left: 10px;
      font-size: 12px;
      font-weight: bold;
      border-radius: 5px;
      color: #ffffff;
      @include background-color("background-4");
    }
  }

  .right {
    line-height: 100%;
    .setting-icon {
      margin-left: 15px;
    }
    .bell-icon,
    .setting-icon {
      width: 20px;
      height: 20px;
      cursor: pointer;
      &:hover {
        stroke-width: 15;
        @include color("theme-color-2");
        @include stroke("theme-color-3");
      }
    }
  }
}
</style>
