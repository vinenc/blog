<template>
  <div class="markdown" v-loading="!markData.content">
    <v-md-preview :text="markData.content" id="markdown"></v-md-preview>
    <markdown-title-list v-if="markData.content" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MarkdownTitleList from "./MarkdownTitleList.vue";
import API from "@/api/axios";
import router from "@/router/index";
import { markBodyStyle } from "@/js/markdown";

const markData = ref("");
const route = router.currentRoute;

// 初始化或更新时获取markdown数据
const getMarkData = function () {
  const mark = route.value.query;
  getPaper(mark.id);
  addWatcher(mark.id, mark.title);
};
// API
const getPaper = function (id) {
  API.get("/getPaper?id=" + id).then((res) => {
    markData.value = res.data[0];
  });
};
const addWatcher = function (id, title) {
  API.post("/addWatcher", { id: id }).then((res) => {
    console.log(res.data + " BY " + title);
  });
};

onMounted(() => {
  getMarkData();
  markBodyStyle();
});
watch(
  route,
  (obj) => {
    if (!obj.query.id) return;
    else getMarkData();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.markdown {
  display: flex;
  text-align: left;
  min-height: 70%;
  #markdown {
    width: 0;
    flex: 1;
  }
}
</style>
