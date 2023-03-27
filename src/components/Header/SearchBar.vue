<template>
  <div :class="app.screenS ? 'search-mobile' : 'search-pc'">
    <div class="search-bar" id="searchBar">
      <button class="search-btn" @click="searchPage">
        <icon-font :icon="'icon-search'" />
      </button>
      <input
        class="input"
        type="text"
        v-model="input"
        @keyup.enter="searchPage"
        @focus="inputFocus"
      />
      <button
        class="options-btn"
        @click="clickSearchSettingIcon"
        id="searchSettingIcon"
      >
        <icon-font :icon="'icon-setting'" />
      </button>
      <search-setting class="options"></search-setting>
      <search-list
        @search-page="searchPage"
        :result-list="resultList"
        :show-none="showNone"
        :input="input"
        v-show="active"
      />
    </div>
  </div>
</template>

<script setup>
import { inject, ref, watch } from "vue";
import SearchList from "./Drops/SearchList.vue";
import SearchSetting from "./Drops/SearchSetting.vue";
import emitter from "@/utils/bus";
import API from "@/api/axios";
import router from "@/router/index";
import { watchListener } from "@/js/drop";

const app = inject("app");
const input = ref("");
const active = ref(false);
const resultList = ref("");
const showNone = ref(false);

const inputFocus = function () {
  active.value = true;
};
const searchPage = function () {
  if (!input.value) return;
  router.push({ name: "search", query: { input: input.value } });
  input.value = "";
};
const clickSearchSettingIcon = function () {
  emitter.emit("changeSearchSetting");
};
const closeSearchList = function (e) {
  const node = document.getElementById("searchBar");
  if (node.contains(e.target)) return;
  else active.value = false;
};

// API
const searchPaper = function (str) {
  API.post("/searchPaper", { input: str }).then((res) => {
    if (!input.value) return;
    resultList.value = res.data;
    if (!res.data[0]) showNone.value = true;
    else showNone.value = false;
  });
};

watch(input, (val) => {
  if (!val) {
    resultList.value = "";
    showNone.value = false;
  } else searchPaper(val);
});
watch(active, (val) => watchListener(val, closeSearchList));
</script>

<style lang="scss" scoped>
.search-bar {
  @include flex-center;
  position: relative;
  height: 40px;
  border-radius: 5px;
  @include background-color("searchBar-background");
  // Button
  button {
    padding: 0 10px;
    height: 100%;
    line-height: 100%;
    font-size: 16px;
    @include color("text-4");
    @include background-color("searchBar-background");
    &:hover {
      background-color: #dcdcdc;
      @include color("theme-color-2");
      stroke-width: 15;
      @include stroke("theme-color-2");
    }
  }
  .search-btn {
    border-radius: 5px 0 0 5px;
  }
  .options-btn {
    border-radius: 0 5px 5px 0;
  }
  // Input
  .input {
    flex: 1;
    height: 100%;
    line-height: 40px;
    padding-top: 3px;
    box-sizing: border-box;
    @include background-color("searchBar-background");
  }
}
.search-pc {
  width: 350px;
  padding-top: 7px;
}
.search-mobile {
  @include flex-center;
  height: 60px;
  @include background-color("background-1");
  .search-bar {
    width: 80%;
    .input {
      width: 100%;
    }
  }
}
</style>
