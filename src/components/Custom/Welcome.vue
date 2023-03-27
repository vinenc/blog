<template>
  <div class="welcome" v-if="app.showWelcome" id="welcome">
    <icon-font class="tips" :icon="'icon-tips'"></icon-font>
    <span class="text">
      <span style="color: #e65841; font-size: medium">
        欢迎访问我的个人博客！
      </span>
      里面所有内容仅供学习参考使用，如果您有疑问和建议，请在评论区或留言板上发表你的看法，博主会不定期回复！
    </span>
    <icon-font
      class="close"
      :icon="'icon-cancel'"
      :size="24"
      @click="closeWelcome"
    ></icon-font>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { _animate } from "@/js/animate";

const app = inject("app");
const closeWelcome = function () {
  const node = document.getElementById("welcome");
  const height = node.offsetHeight;
  _animate(node, "opacity", "1", "0");
  setTimeout(() => {
    node.style.opacity = 0;
    node.style.padding = 0;
    node.style.margin = 0;
    _animate(node, "height", height + 20, "0");
  }, 300);
  setTimeout(() => {
    app.showWelcome = false;
  }, 600);
};
</script>

<style lang="scss" scoped>
.welcome {
  @include display(flex, space-between, center);
  padding: 10px 0;
  margin-bottom: 20px;
  @include background-color("theme-background-2");
  box-shadow: 0 1px 6px rgb(0 0 0 / 8%);
  overflow: hidden;
  .tips {
    min-width: 30px;
    width: 30px;
    padding: 0 5px;
    color: #d1b200;
  }
  .text {
    text-align: left;
    font-size: 13px;
    font-weight: bold;
    color: #6e6c00;
  }
  .close {
    min-width: 30px;
    width: 30px;
    margin: 0;
    padding: 0 5px;
    @include color("theme-background-3");
    cursor: pointer;
    &:hover {
      @include color("theme-color-2");
    }
  }
}
</style>
