<template>
  <div
    class="user"
    :class="app.screenS ? 'user-mobile' : 'user-pc'"
    v-if="showUser"
    id="user"
  >
    <div class="login" v-show="!admin.id">
      <div class="title">管理员登录</div>
      <div class="line"></div>
      <p>用户名</p>
      <el-input
        class="name"
        v-model="data.acount"
        placeholder="输入用户名"
        clearable
      />
      <p>密码</p>
      <el-input
        v-model="data.password"
        type="password"
        placeholder="输入密码"
        show-password
      />
      <el-button class="btn" type="primary" @click="clickLogin">
        登 录
      </el-button>
      <el-alert
        class="warning"
        type="error"
        title="请输入用户名或密码"
        show-icon
        :closable="false"
        v-if="data.warning"
      />
    </div>
    <div class="admin" v-show="admin.id">
      <div class="title">已登录</div>
      <div class="line"></div>
      <p>管理员：{{ admin.acount }}</p>
      <p>登录时间：{{ dateTime(admin.update_time) }}</p>
      <el-button class="btn" @click="clickUpload">
        点击<i-ep-upload-filled />上传文档
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { inject, nextTick, onBeforeUnmount, reactive, ref, watch } from "vue";
import emitter from "@/utils/bus";
import { closeDrop, watchListener } from "@/js/drop";
import API from "@/api/axios";
import { dateTime } from "@/js/markdown";
import router from "@/router/index";
import { _animate } from "@/js/animate";
import userStore from "@/store/userStore";

const app = inject("app");
const showUser = ref(false);
const admin = userStore().$state;
const data = reactive({
  acount: "",
  password: "",
  warning: false,
});

const changeUser = function () {
  showUser.value = !showUser.value;
};
const closeUser = function (e) {
  const callback = (val) => (showUser.value = val);
  closeDrop(e, callback, "user", "userIcon");
};
const clickUpload = function () {
  router.push({ name: "upload" });
  changeUser();
  if (app.screenS) emitter.emit("changeBtnActive");
};
const clickLogin = function () {
  if (!data.acount || !data.password) {
    data.warning = true;
    setTimeout(() => (data.warning = false), 2000);
    return;
  } else {
    API.post("/login", data).then((res) => {
      if (!res.data) return ElMessage.error("登录失败，账户或密码错误");
      else {
        userStore().$state = res.data.result[0];
        ElMessage.success("管理员登录成功");
        localStorage.setItem("token", res.data.token);
      }
    });
  }
};

emitter.on("changeUser", changeUser);
onBeforeUnmount(() => emitter.off("changeUser"));

watch(showUser, (nVal, oVal) => {
  watchListener(nVal, closeUser);
  if (!nVal) {
    data.acount = "";
    data.password = "";
  }
  // nextTick(() => {
  //   const target = document.getElementById("user");
  //   if (nVal && !oVal) {
  //     _animate(target, "opacity", "0", "1");
  //   }
  // });
});
</script>

<style lang="scss" scoped>
.user {
  width: 250px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.08);
  padding: 10px 20px;
  @include background-color("background-2");
  .title {
    font-size: 18px;
    text-align: left;
  }
  .line {
    @include background-color("background-3");
    height: 1px;
    margin: 5px 0;
  }
  p {
    text-align: left;
    font-size: 14px;
    margin: 5px 0;
  }
  .name {
    margin-bottom: 10px;
  }
  .btn {
    margin-top: 20px;
    width: 100%;
    font-size: 14px;
    color: #ffffff;
    @include background-color("theme-color-2");
    &:hover {
      @include background-color("theme-color-3");
    }
  }
  .warning {
    margin-top: 10px;
  }
}
.user-pc {
  position: absolute;
  top: 60px;
  right: 0;
}
.user-mobile {
  width: 100%;
  padding: 15px 20px 20px;
}
</style>
