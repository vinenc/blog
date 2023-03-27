<template>
  <div class="aside-menu">
    <ul class="item-box">
      <li v-for="(item, itemIndex) in menuList" :key="item.name">
        <div
          class="item"
          :class="item.highLight ? 'item-active' : 'item-default'"
          @click="itemHighLight(itemIndex, item.name, item.drop)"
        >
          <icon-font class="icon" :icon="item.icon" />
          <i class="name">{{ item.text }}</i>
          <icon-font
            class="drop-icon"
            :icon="item.active ? 'icon-down-arrow' : 'icon-right-arrow'"
            v-if="item.drop"
          />
        </div>
        <ul class="list-box" v-if="item.drop && item.active">
          <li
            class="list-item"
            v-for="(drop, dropIndex) in item.dropList"
            :key="drop.name"
            :class="drop.active ? 'item-active' : 'item-default'"
            @click="dropHighLight(itemIndex, dropIndex, drop.name)"
          >
            <icon-font class="list-icon" :icon="'icon-slack'" />
            {{ drop.name }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import emitter from "@/utils/bus";
import { menuData } from "@/utils/data";
import router from "@/router/index";
const menuList = ref(menuData);

const itemHighLight = function (index, name, drop) {
  const a = menuList.value;
  // 重复点击已激活且无drop的按钮，则返回。点击有drop的按钮总会执行下面函数
  if (a[index].active && !drop) return;
  a.forEach((el) => {
    if (el.name == name) {
      el.active = !el.active;
      el.highLight = true;
    } else {
      el.active = false;
      el.highLight = false;
    }
    // 在drop激活的状态下，点击其他一级菜单按钮时，drop的子菜单也会失活
    if (el.drop && !el.highLight)
      el.dropList.forEach((el) => (el.active = false));
    // 重复点击drop开关时，子菜单的激活状态不会移除。原来子菜单有按钮激活时，总开关会失去高光
    if (el.drop && el.active)
      el.dropList.forEach((e) => {
        if (e.active) el.highLight = false;
      });
  });
  if (!drop)
    setTimeout(() => {
      emitter.emit("changeAside");
    }, 100);
  pushItemRouter(name);
};
// 下拉菜单按钮高光，按钮激活时，总开关会失去高光，但会保持激活状态
const dropHighLight = function (itemIndex, dropIndex, name) {
  const list = menuList.value[itemIndex].dropList;
  if (list[dropIndex].active) return;
  list.forEach((el) => {
    if (el.name == name) {
      menuList.value[itemIndex].highLight = false;
      el.active = true;
    } else el.active = false;
  });
  setTimeout(() => {
    emitter.emit("changeAside");
  }, 100);
  pushDropRouter(name);
};
const pushItemRouter = function (name) {
  switch (name) {
    case "home":
      router.push({ name: "home" });
      break;
    case "about":
      router.push({ name: "about" });
      break;
    case "live":
      router.push({ name: "live" });
      break;
  }
};
const pushDropRouter = function (name) {
  router.push({ name: "search", query: { type: name } });
};

watch(
  router.currentRoute,
  (obj) => {
    menuList.value.forEach((el) => {
      if (el.name == obj.name) {
        el.active = true;
        el.highLight = true;
      } else {
        el.active = false;
        el.highLight = false;
      }
      if (el.name == "type") {
        if (obj.name == "search" && obj.query.type) {
          el.dropList.forEach((drop) => {
            const a = drop.name.toLowerCase();
            const b = obj.query.type.toLowerCase();
            if (a == b) {
              el.active = true;
              drop.active = true;
            } else drop.active = false;
          });
        }
      }
    });
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.aside-menu {
  margin-top: 45px;
  .item-box {
    .item {
      height: 36px;
      line-height: 36px;
      padding: 0 17px 0;
      font-size: 14px;
      border-radius: 5px;
      text-align: left;
      cursor: pointer;
      .icon {
        width: 14px;
        height: 14px;
      }
      .name {
        margin-left: 6px;
      }
      .drop-icon {
        float: right;
        width: 10px;
        height: 36px;
        stroke: #737373;
        stroke-width: 50;
      }
    }
    .item-default {
      &:hover {
        @include background-color("background-3");
      }
      .list-icon {
        color: #b0b0b0;
      }
    }
    .item-active {
      color: #fff;
      font-weight: bold;
      @include background-color("theme-color-2");
      .drop-icon {
        stroke-width: 50;
        stroke: #fff;
      }
    }
    .list-box {
      margin: 5px 0 5px 30px;
      text-align: left;
      border-left: 2px solid #efefef;
      padding-left: 12px;
      .list-item {
        height: 36px;
        line-height: 36px;
        border-radius: 5px;
        cursor: pointer;
        .list-icon {
          font-size: 18px;
          margin-left: 6px;
          stroke-width: 30;
          stroke: #fff;
        }
      }
    }
  }
}
</style>
