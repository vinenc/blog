<template>
  <div class="home-item-box" v-for="(item, index) in paperList" :key="item.id">
    <div class="title-box">
      <div class="num">{{ paperNumber(data.page, index) }}</div>
      <div class="title">
        <a @click="clickTitle(item.id, item.title)">{{ item.title }}</a>
        <div class="tag">
          <span v-for="itemTag in item.tag" :key="itemTag.name">{{
            itemTag.name
          }}</span>
        </div>
      </div>
    </div>
    <div class="about">{{ item.summary }}</div>
    <div class="info">
      <icon-font class="icon" :icon="'icon-people'" :size="14" />
      <i>{{ item.author }}</i>
      <icon-font class="icon" :icon="'icon-eye'" :size="14" />
      <i>{{ item.watcher }}</i>
      <icon-font class="icon" :icon="'icon-clock'" :size="14" />
      <i>{{ item.update_time }}</i>
    </div>
  </div>
  <el-pagination
    class="page"
    :total="data.total"
    :page-size="5"
    v-model:current-page="data.page"
    layout="prev, pager, next, jumper"
    @current-change="changePage"
    background
    hide-on-single-page
    v-if="paperList"
  />
  <div class="list-none" v-if="showNone">
    没有词条 '{{ router.currentRoute.value.query.input }}' 的搜索结果...
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import API from "@/api/axios";
import router from "@/router/index";
import { dateTime, paperNumber } from "@/js/markdown";
import { clickTitle } from "@/router/push";
import { _animate } from "@/js/animate";
const paperList = ref("");
const showNone = ref(false);
const data = reactive({
  page: 1,
  total: 5,
});

const changePage = function () {
  getPaperList();
};
const selectSearch = function () {
  const route = router.currentRoute.value;
  if (route.name == "home") {
    getCount();
    getPaperList();
  } else if (route.name == "search") {
    if (route.query.type) {
      getTypePaperList(route.query.type);
    } else if (route.query.input) {
      getSearchPaperList(route.query.input);
    }
  }
};

// API
const getCount = function () {
  API.get("/getCount").then((res) => {
    data.total = res.data[0].count;
  });
};
const getPaperList = function () {
  API.get("/getPaperList?page=" + data.page).then((res) => {
    formatRes(res.data);
  });
};
const getSearchPaperList = function (input) {
  API.get("/SearchPaperList?input=" + input).then((res) => {
    if (!res.data[0]) {
      showNone.value = true;
      paperList.value = [];
    } else {
      formatRes(res.data);
      showNone.value = false;
    }
  });
};
const getTypePaperList = function (type) {
  API.get("/TypePaperList?type=" + type).then((res) => {
    formatRes(res.data);
  });
};
const formatRes = function (data) {
  data.forEach((el) => {
    el.tag = JSON.parse(el.tag);
    el.update_time = dateTime(el.update_time);
  });
  paperList.value = data;
};

watch(router.currentRoute, () => selectSearch(), {
  deep: true,
  immediate: true,
});
</script>

<style lang="scss" scoped>
.home-item-box {
  padding: 20px 16px 15px;
  margin-bottom: 20px;
  text-align: left;
  @include transition-5;
  @include background-color("theme-background-1");
  &:hover {
    box-shadow: 0 1px 6px rgb(0 0 0 / 8%);
  }
  .title-box {
    display: flex;
    align-items: center;
    .num {
      min-width: 40px;
      max-width: 40px;
      height: 40px;
      line-height: 40px;
      margin-right: 12px;
      font-size: 20px;
      color: #ffffff;
      text-align: center;
      @include background-color("theme-background-2");
    }
    .title {
      a {
        font-weight: bold;
        font-size: 20px;
        @include color("theme-color-2");
        cursor: pointer;
        @include text-overflow-ellipsis(1);
        &:hover {
          @include color("theme-hover");
        }
      }
      .tag {
        padding-top: 2px;
        span {
          font-size: 12px;
          padding: 1px 5px;
          margin-right: 7px;
          border-radius: 3px;
          color: #ffffff;
          @include background-color("theme-color-3");
        }
      }
    }
  }
  .about {
    font-size: 14px;
    margin: 15px 0;
    @include text-overflow-ellipsis(3);
  }
  .info {
    .icon {
      margin-right: 3px;
    }
    font-size: 12px;
    i {
      margin-right: 16px;
      @include color("text-2");
    }
  }
}
.page {
  @include flex-center;
}
.list-none {
  @include flex-center;
  min-height: 70vh;
  font-size: 1.5rem;
}
</style>
