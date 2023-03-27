<template>
  <div class="header" id="blogHeader">
    <div class="box" :class="app.screenS ? 'box-mobile' : 'box-pc'">
      <!-- Header mobile client button & Logo -->
      <menu-btn />
      <!-- Search box -->
      <search-bar v-if="!app.screenS || btnActive" />
      <!-- Msg & Key button and droplist -->
      <action-btn v-if="!app.screenS || btnActive" />
    </div>
  </div>
</template>

<script setup>
import { inject, onBeforeUnmount, ref, watch } from "vue";
import MenuBtn from "./Header/MenuBtn.vue";
import SearchBar from "./Header/SearchBar.vue";
import ActionBtn from "./Header/ActionBtn.vue";
import emitter from "@/utils/bus";
import { watchListener } from "@/js/drop";

const app = inject("app");
const btnActive = ref(false);

const changeBtnActive = function () {
  btnActive.value = !btnActive.value;
};
const closeMobileBtn = function (e) {
  const node = document.getElementById("blogHeader");
  if (node.contains(e.target)) return;
  else btnActive.value = false;
};

emitter.on("changeBtnActive", changeBtnActive);
onBeforeUnmount(() => emitter.off("changeBtnActive"));

watch(btnActive, (val) => watchListener(val, closeMobileBtn));
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 10;
  @include background-color("background-1");
  .box {
    width: 100%;
    height: 100%;
  }
  // PC && Mobile
  .box-pc {
    @include display(flex, space-between, center);
  }
  .box-mobile {
    display: block;
    padding-left: 0;
  }
}
</style>
