<template>
  <div class="about" v-loading="!markData.content">
    <v-md-preview :text="markData.content" id="markdown"></v-md-preview>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import API from "@/api/axios";
import { markBodyStyle } from "@/js/markdown";

const markData = ref("");

// API
const getPaper = function () {
  API.get("/getPaper?id=" + 65).then((res) => {
    markData.value = res.data[0];
  });
};
const addWatcher = function () {
  API.post("/addWatcher", { id: 65 }).then((res) => {
    console.log(res.data + " BY " + "关于");
  });
};

onMounted(() => {
  getPaper();
  addWatcher();
  markBodyStyle();
});
</script>

<style lang="scss" scoped>
.about {
  text-align: left;
  padding: 20px;
}
</style>
