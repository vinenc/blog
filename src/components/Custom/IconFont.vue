<template>
  <svg :class="classList" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  className: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 20,
  },
});
const classList = computed(() => {
  return ["icon", props.className || ""];
});
const iconName = computed(() => {
  return `#${props.icon}`;
});
const iconSize = computed(() => {
  return `${props.size}px`;
});
</script>

<style lang="scss" scoped>
.icon {
  /* v-bind是Vue3才支持的功能，可以将CSS的值与js的值绑定 */
  width: v-bind("iconSize");
  height: v-bind("iconSize");
  vertical-align: -2px;
  fill: currentColor;
}
</style>
