<template>
  <div class="search-list" id="searchList">
    <div
      class="box"
      v-for="item in resultList"
      :key="item.id"
      @click="clickTitle(item.id, item.title)"
    >
      <span>{{ item.title }}</span>
    </div>
    <div
      class="more"
      @click="$emit('searchPage')"
      v-if="resultList.length > 10"
    >
      查看更多...
    </div>
    <div class="list-none" v-show="showNone">
      没有词条 '{{ input }}' 的搜索结果...
    </div>
  </div>
</template>

<script setup>
import { clickTitle } from "@/router/push";
defineEmits(["searchPage"]);
defineProps(["resultList", "showNone", "input"]);
</script>

<style lang="scss" scoped>
.search-list {
  position: absolute;
  top: 100%;
  width: 100%;
  text-align: left;
  user-select: none;
  box-shadow: 0 1px 6px rgb(0 0 0 / 8%);
  @include background-color("background-1");
  .box {
    padding: 10px 20px;
    @include transition-5;
    cursor: pointer;
    @include text-overflow-ellipsis(1);
    &:hover {
      padding-left: 2rem;
      @include color("theme-color-2");
      @include background-color("theme-background-1");
    }
  }
  .more {
    margin: 5px 0;
    text-align: center;
    cursor: pointer;
    @include color("text-2");
    &:hover {
      @include color("theme-color-2");
    }
  }
  .list-none {
    @include flex-center;
    padding: 0.5rem;
  }
}
</style>
