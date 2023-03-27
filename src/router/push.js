import router from "./index";

// 点击标题Title，携带id，title到路由markdown
export const clickTitle = function (id, title) {
  router.push({
    name: "markdown",
    query: {
      id: id,
      title: title,
    },
  });
};
