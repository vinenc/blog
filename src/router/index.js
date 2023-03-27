import { createRouter, createWebHashHistory } from "vue-router";

import BlogIndex from "../components/BlogIndex.vue";
import Home from "../components/Index/Home.vue";
import Markdown from "../components/Index/Markdown.vue";
import Upload from "../components/Index/Upload.vue";
import SearchPage from "../components/Index/SearchPage.vue";
import About from "../components/About.vue";
import Live from "../components/Live.vue";

import userStore from "../store/userStore";

const routes = [
  {
    path: "/",
    name: "index",
    component: BlogIndex,
    children: [
      { path: "", name: "home", component: Home },
      { path: "markdown", name: "markdown", component: Markdown },
      { path: "upload", name: "upload", component: Upload },
      { path: "search", name: "search", component: SearchPage },
    ],
  },
  { path: "/about", name: "about", component: About },
  { path: "/live", name: "live", component: Live },
];

// 创建路由实例并传递 `routes` 配置。
const router = createRouter({
  // 内部提供了history模式的实现。为了简单起见，我们在这里使用 hash模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

router.beforeEach((to, from, next) => {
  if (to.name == "upload") {
    const user = userStore().$state;
    if (user.id) next();
    else next("/");
  } else next();
});

export default router;
