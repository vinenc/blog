<template>
  <div class="home">
    <div class="home-main">
      <welcome />
      <home-item />
    </div>
    <div>
      <home-hot-list />
    </div>
  </div>
</template>

<script setup>
import Welcome from "../Custom/Welcome.vue";
import HomeItem from "./HomeItem.vue";
import HomeHotList from "./HomeHotList.vue";
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  .home-main {
    width: 0;
    flex: 1;
  }
}
</style>
