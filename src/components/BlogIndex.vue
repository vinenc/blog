<template>
  <div class="index">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style lang="scss" scoped>
.index {
  padding: 20px;
}
</style>
