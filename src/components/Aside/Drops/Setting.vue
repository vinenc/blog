<template>
  <div class="setting" v-if="showSetting" id="settingList">
    <div class="title">界面设置</div>
    <div class="line"></div>
    <div class="theme" v-for="item in themeList" :key="item.name">
      <p class="title">{{ item.text }}</p>
      <el-select
        v-model="outLock.theme"
        v-if="item.type == 'select'"
        @change="changeTheme"
      >
        <el-option
          :label="option.name"
          :value="option.id"
          v-for="option in item.value"
          :key="option.id"
        >
          <span style="float: left">{{ option.name }}</span>
          <span
            style="
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            "
            >{{ option.id }}
          </span>
        </el-option>
      </el-select>
      <ul v-if="item.type == 'button'">
        <li
          class="btn"
          v-for="list in item.value"
          :class="list.active ? 'btn-active' : ''"
          @click="changeColor(list.id)"
          :key="list.id"
        >
          {{ list.name }}
        </li>
      </ul>
    </div>
    <div class="more">更多功能还在开发中....</div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, reactive, ref, watch } from "vue";
import emitter from "@/utils/bus";
import { themeData } from "@/utils/data";
import { bodyAnimate, animateTime } from "@/js/animate";
import { watchListener } from "@/js/drop";

const showSetting = ref(false);
const themeList = reactive({
  theme: themeData.theme,
  color: themeData.color,
});
const outLock = reactive({
  theme: "light",
  color: "blue",
});

const chagneSetting = function () {
  showSetting.value = !showSetting.value;
};
const changeColor = function (id) {
  outLock.color = id;
  changeTheme();
  themeList.color.value.forEach((el) => {
    if (el.id == id) el.active = true;
    else el.active = false;
  });
};
const changeTheme = function () {
  const theme = outLock.theme + "-" + outLock.color;
  window.document.documentElement.setAttribute("data-theme", theme);
  bodyAnimate();
  const list = [
    "aside-box",
    "blogAside",
    "blogHeader",
    "settingList",
    "msgIcon",
    "userIcon",
  ];
  list.forEach((el) => animateTime(el));
};
const settingClose = function (e) {
  const node = document.getElementById("settingList");
  const node2 = document.getElementById("settingIcon");
  const select = document.getElementsByClassName("el-popper")[0];
  if (
    node.contains(e.target) ||
    node2.contains(e.target) ||
    select.contains(e.target)
  )
    return;
  else showSetting.value = false;
};

emitter.on("chagneSetting", chagneSetting);
onBeforeUnmount(() => emitter.off("chagneSetting"));

watch(showSetting, (val) => watchListener(val, settingClose));
</script>

<style lang="scss" scoped>
.setting {
  position: absolute;
  top: 60px;
  right: 0;
  z-index: 1;
  width: 200px;
  padding: 10px 20px;
  text-align: left;
  box-shadow: 0 1px 6px rgb(0 0 0 / 8%);
  @include background-color("background-2");
  .title {
    font-size: 18px;
  }
  .line {
    @include background-color("background-3");
    height: 0.5px;
    margin: 5px 0;
  }
  .theme {
    p {
      font-size: 16px;
      margin: 14px 0 5px 0;
    }
    .btn {
      cursor: pointer;
      border-radius: 5px;
      padding: 5px 10px;
    }
    .btn-active {
      @include background-color("theme-color-2");
      color: #ffffff;
    }
  }
  .more {
    margin-top: 20px;
    @include color("text-3");
  }
}
</style>
