<template>
  <div class="copy-content">
    <div
      class="copy-btn code-data-copy"
      @click="copyMessage"
      data-clipboard-action="copy"
      :data-clipboard-text="code"
    >
      <svg
        t="1609826359524"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2955"
      >
        <path
          d="M770.63802083 933.875H216.92708332c-44.82421875 0-79.1015625-34.27734375-79.10156249-79.1015625V195.59374999h553.7109375c44.82421875 0 79.1015625 34.27734375 79.1015625 79.10156251v659.1796875zM190.55989583 248.328125v606.4453125c0 15.8203125 10.546875 26.3671875 26.36718751 26.3671875h500.97656249V274.6953125c0-15.8203125-10.546875-26.3671875-26.3671875-26.3671875H190.55989583z"
          p-id="2956"
        />
        <path
          d="M612.43489583 424.98828125H296.02864583c-13.18359375 0-26.3671875-10.546875-26.3671875-26.3671875 0-13.18359375 10.546875-26.3671875 26.3671875-26.3671875h316.40625c13.18359375 0 26.3671875 10.546875 26.36718751 26.3671875 0 13.18359375-13.18359375 26.3671875-26.36718751 26.3671875z m0 131.8359375H296.02864583c-13.18359375 0-26.3671875-10.546875-26.3671875-26.3671875 0-13.18359375 10.546875-26.3671875 26.3671875-26.3671875h316.40625c13.18359375 0 26.3671875 10.546875 26.36718751 26.3671875 0 13.18359375-13.18359375 26.3671875-26.36718751 26.3671875z m0 131.8359375H296.02864583c-13.18359375 0-26.3671875-10.546875-26.3671875-26.3671875 0-13.18359375 10.546875-26.3671875 26.3671875-26.3671875h316.40625c13.18359375 0 26.3671875 10.546875 26.36718751 26.3671875 0 13.18359375-13.18359375 26.3671875-26.36718751 26.3671875z"
          p-id="2957"
        />
        <path
          d="M828.64583333 90.125h-527.34375001c-15.8203125 0-26.3671875 10.546875-26.36718749 26.3671875s10.546875 26.3671875 26.36718751 26.3671875h527.34374999c15.8203125 0 26.3671875 10.546875 26.3671875 26.3671875v606.4453125H823.37239583v52.73437499h84.375V169.2265625c0-44.82421875-36.9140625-79.1015625-79.1015625-79.1015625z"
          p-id="2958"
        />
        <path
          d="M797.00520833 802.0390625a26.3671875 26.3671875 0 1 0 52.73437501 0 26.3671875 26.3671875 0 1 0-52.73437501 0z"
          p-id="2959"
        />
      </svg>
    </div>
    <div v-if="success" class="copy-success-text">复制成功!</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import clipboard from "clipboard"; // 复制插件

const props = defineProps(["code"]);
const success = ref(false);

const copyMessage = function (value) {
  success.value = false;
  let cp = new clipboard(".code-data-copy");
  cp.on("success", function (e) {
    console.log("复制成功");
    success.value = true;
    cp.destroy(); // 销毁,避免多次点击重复出现
  });
  cp.on("error", function (e) {
    console.log("复制失败", e);
    cp.destroy();
  });
};
</script>

<style lang="scss" scoped>
.copy-content {
  height: 0;
}
.icon {
  width: 1.2rem;
  height: 1.2rem;
  @include color("theme-color-3");
  fill: currentColor;
}
.copy-btn {
  height: 36px;
  padding: 10px;
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 10;
  border-radius: 3px;
  opacity: 0;
  transition: 0.3s;
  background: rgba(235, 235, 235, 0.685);
  user-select: none;
  cursor: pointer;
  &:hover {
    background: rgba(225, 225, 225, 0.685);
  }
  &:active {
    background: rgba(194, 194, 194, 0.685);
  }
}
.copy-success-text {
  @include color("theme-color-3");
  position: absolute;
  z-index: 10;
  right: 3rem;
  top: 5px;
  padding: 0 10px;
  line-height: 36px;
  font-size: 12px;
  border-radius: 3px;
  animation: successCopy 1s ease-in-out both 1;
  background: rgba(235, 235, 235, 0.685);
}
@keyframes successCopy {
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
