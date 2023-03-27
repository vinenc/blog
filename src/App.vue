<template>
  <div class="aside-box" id="aside-box">
    <blog-aside
      :class="data.screenS && !data.showAside ? 'translate-h-1' : 'translate-0'"
    />
  </div>
  <div
    class="mask"
    :class="data.showMask ? 'opacity-1' : 'opacity-0'"
    v-if="data.screenS && data.showMask"
    @click="changeAside"
    id="mask"
  ></div>
  <div class="container">
    <div style="min-height: 100vh">
      <blog-header />
      <router-view></router-view>
    </div>
    <div class="record">
      <a href="https://beian.miit.gov.cn/" target="_bank">
        <span class="left">粤ICP备</span>
        <span class="right"> 2022064833号-1</span>
      </a>
      <a href="https://www.waowaowao.cn">
        <span class="left">Copyright</span>
        <span class="right">@2022 TXR</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  watch,
} from "vue";
import { RouterView } from "vue-router";
import BlogAside from "./components/BlogAside.vue";
import BlogHeader from "./components/BlogHeader.vue";
import emitter from "@/utils/bus";
import appStore from "@/store/appStore";
import userStore from "@/store/userStore";
import API from "@/api/axios";
import { _animate } from "@/js/animate";
import { getScreen, bodySlipBlock, firstRunFun } from "@/js/screen";

const store = appStore();
const data = reactive(store);
provide("app", data);

const blockAnimate = function () {
  data.animating = true;
  setTimeout(() => {
    data.animating = false;
  }, 300);
};
const changeAside = function () {
  if (data.screenS && !data.animating) {
    data.showAside = !data.showAside;
    if (data.showAside) {
      data.showMask = true;
      nextTick(() => maskAnimate("0", "1"));
    } else {
      maskAnimate("1", "0");
      setTimeout(() => {
        data.showMask = false;
      }, 300);
    }
    bodySlipBlock(data.screenS, data.showAside);
    blockAnimate();
  }
};
const maskAnimate = function (start, end) {
  const node = document.getElementById("mask");
  _animate(node, "opacity", start, end);
};
const getVerify = function () {
  const token = localStorage.getItem("token");
  if (token) {
    API.post("/verify", { token }).then((res) => {
      if (res.data) userStore().$state = res.data.data;
      else {
        ElMessage.error("Token过期或无效，请重新登录");
        localStorage.removeItem("token");
      }
    });
  }
};

emitter.on("changeAside", changeAside);
onMounted(() => {
  getVerify();
  firstRunFun(data.firstRun, (val) => (data.firstRun = val));
  const callback = (S, M) => {
    data.screenS = S;
    data.screenM = M;
  };
  getScreen(callback);
  window.onresize = () => getScreen(callback);
  window.document.documentElement.setAttribute("data-theme", "light-blue");
});
onBeforeUnmount(() => {
  localStorage.removeItem("login");
  emitter.off("changeAside");
});

let oldVal = false;
watch(
  data,
  (obj) => {
    if (!oldVal && obj.screenS && obj.showAside) {
      const node = document.getElementById("blogAside");
      nextTick(() => maskAnimate("0", "1"));
      _animate(node, "transform", "translate(-100%,0)", "translate(0,0)");
    }
    if (oldVal != obj.screenS) oldVal = obj.screenS;
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.aside-box {
  min-height: 100vh;
  @include background-color("background-1");
}
.container {
  width: 0;
  flex: 1;
  .record {
    padding: 1rem;
    span {
      padding: 2px 5px;
      font-size: 0.8rem;
      color: #f9f9f9;
    }
    .left {
      border-radius: 4px 0 0 4px;
      border-right: 3px solid rgb(220, 220, 220);
      background-color: rgb(91, 91, 91);
    }
    .right {
      margin-right: 1rem;
      border-radius: 0 4px 4px 0;
      @include background-color("theme-color-2");
    }
  }
}
.mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 15;
  @include transition-5;
  background-color: rgba(31, 31, 31, 0.616);
}
</style>
