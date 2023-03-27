<template>
  <div
    class="markdown-list"
    :class="!SM ? 'list-pc' : 'list-mobile'"
    id="markdownList"
  >
    <div
      class="title-list"
      :class="SM && !showList ? 'translate-h160' : 'translate-0'"
    >
      <div class="icon-btn" v-if="SM" @click="changeShowList">
        <icon-font class="icon" :icon="'icon-slack'" :size="24"></icon-font>
      </div>
      <div class="box">
        <div class="list-name">本页目录</div>
        <div
          class="title"
          :class="item.active ? 'title-active' : ''"
          :style="`padding-left:${item.level * 10}px`"
          v-for="item in titleList"
          :key="item.content"
          @click="clickTitle(item.offsetTop)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, computed, nextTick } from "vue";
import { getTitleList } from "@/js/markdown";

const app = inject("app");
const titleList = ref([]);
const showList = ref(false);

const SM = computed(() => {
  return app.screenS || app.screenM;
});

const changeShowList = function () {
  showList.value = !showList.value;
};
const clickTitle = function (offsetTop) {
  document.documentElement.scrollTop = offsetTop - 98;
};
const titleActive = function (index) {
  const list = titleList.value;
  for (let i = 0; i < list.length; i++)
    if (i == index) list[i].active = true;
    else list[i].active = false;
};
const scrollTitleActive = function (pageYOffset) {
  const list = titleList.value;
  const p = Math.round(pageYOffset) + 99;
  for (let i = 0; i < list.length - 1; i++) {
    const a = list[i].offsetTop;
    const b = list[i + 1].offsetTop;
    if (a <= p && b > p) titleActive(i);
    else if (i + 1 == list.length) titleActive(i + 1);
  }
};

onMounted(() => {
  document.documentElement.scrollTop = 0;
  nextTick(() => {
    titleList.value = getTitleList();
    titleActive(0);
  });
  window.onscroll = () => scrollTitleActive(window.pageYOffset);
});
</script>

<style lang="scss" scoped>
.title-list {
  display: flex;
  width: 200px;
  font-size: 14px;
  font-weight: bold;
  @include transition-5;
  .box {
    width: 100%;
    @include background-color("background-1");
    .list-name {
      margin: 0 0 10px 10px;
    }
    .title {
      padding: 0 0 7px 10px;
      color: #8e8e8e;
      cursor: pointer;
      @include border-left(2px, "background-3");
      @include text-overflow-ellipsis(1);
      white-space: nowrap;
    }
    .title-active {
      @include color("theme-color-2");
      @include border-left(2px, "theme-color-2");
    }
  }
  .icon-btn {
    @include flex-center;
    width: 40px;
    min-width: 40px;
    height: 40px;
    border-radius: 17px 0 0 37px;
    box-shadow: 0 1px 6px rgb(0 0 0 / 8%);
    @include background-color("background-2");
    cursor: pointer;
    &:hover {
      @include background-color("background-3");
    }
    .icon {
      font-size: 25px;
      line-height: 40px;
    }
  }
}
.list-pc {
  .title-list {
    position: sticky;
    top: 80px;
    padding: 16px 0 0 32px;
  }
}
.list-mobile {
  .title-list {
    position: fixed;
    width: 230px;
    top: 180px;
    right: 0;
    z-index: 10;
    .box {
      padding: 10px;
      box-shadow: 0 1px 6px rgb(0 0 0 / 8%);
    }
  }
}
.translate-h160 {
  transform: translateX(190px);
}
</style>
