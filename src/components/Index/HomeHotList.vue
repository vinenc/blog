<template>
  <div class="hot-list" v-if="!app.screenS && !app.screenM">
    <div class="list-title">热门文章</div>
    <div class="line">
      <div class="light"></div>
    </div>
    <div class="list">
      <div class="box" v-for="(item, index) in hotList" :key="item.id">
        <div class="num">{{ addZero(index + 1) }}</div>
        <div class="title">
          <a @click="clickTitle(item.id, item.title)">{{ item.title }}</a>
          <div class="info">
            <icon-font class="icon" :icon="'icon-eye'" :size="14"></icon-font>
            <span>{{ item.watcher }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onBeforeMount, ref } from "vue";
import API from "@/api/axios";
import { clickTitle } from "@/router/push";

const app = inject("app");
const hotList = ref("");

// API
const getPaperTop = function () {
  API.get("/getPaperTop").then((res) => {
    hotList.value = res.data.splice(0, 5);
  });
};

const addZero = function (num) {
  const a = num.toString();
  return a[1] ? a : "0" + a;
};

onBeforeMount(() => {
  getPaperTop();
});
</script>

<style lang="scss" scoped>
.hot-list {
  position: sticky;
  top: 80px;
  min-width: 220px;
  max-width: 220px;
  padding-left: 30px;
  text-align: left;
  .list-title {
    font-size: 18px;
    font-weight: normal;
  }
  .line {
    width: 100%;
    height: 1px;
    @include background-color("background-3");
    margin: 10px 0;
    .light {
      width: 50%;
      height: 2px;
      @include background-color("theme-color-2");
    }
  }
  .box {
    display: flex;
    margin-top: 10px;
    padding: 10px;
    &:hover {
      @include background-color("theme-background-1");
    }
    .num {
      font-size: 18px;
      line-height: 42px;
      font-weight: bold;
      margin-right: 10px;
      color: #fd996b;
    }
    .title {
      a {
        cursor: pointer;
        @include color("theme-color-2");
        @include text-overflow-ellipsis(1);
        &:hover {
          @include color("theme-hover");
        }
      }
      .info {
        margin-top: 5px;
        font-size: 12px;
        .icon {
          margin-right: 3px;
        }
      }
    }
  }
}
</style>
