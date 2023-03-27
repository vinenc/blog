<template>
  <div class="search-setting" v-if="showSetting" id="searchSetting">
    <div class="more">更多高级功能还在开发中....</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import emitter from "@/utils/bus";
import { closeDrop, watchListener } from "@/js/drop";

const showSetting = ref(false);

const changeSearchSetting = function () {
  showSetting.value = !showSetting.value;
};
const closeSearchSetting = function (e) {
  const callback = (val) => (showSetting.value = val);
  closeDrop(e, callback, "searchSetting", "searchSettingIcon");
};

emitter.on("changeSearchSetting", changeSearchSetting);
onBeforeUnmount(() => emitter.off("changeSearchSetting"));

watch(showSetting, (val) => {
  watchListener(val, closeSearchSetting);
});
</script>

<style lang="scss" scoped>
.search-setting {
  width: 100%;
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
  padding: 10px 20px;
  text-align: left;
  user-select: none;
  @include background-color("background-2");
  box-shadow: 0 1px 6px rgb(0 0 0 / 8%);
  .more {
    @include color("text-2");
  }
}
</style>
