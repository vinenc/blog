export const appData = {
  firstRun: true, // First run the webside?
  screenS: false, // The user client is moblie?
  screenM: false, // Screen size is SM?
  showAside: false, // Show the aside?
  showMask: false, // Show the mask?
  animating: false, // Is animating?
  showWelcome: true,
};
export const themeData = {
  theme: {
    name: "theme",
    text: "主题",
    type: "select",
    value: [
      {
        name: "浅色",
        id: "light",
        active: true,
      },
      {
        name: "深色",
        id: "dark",
        active: false,
      },
    ],
  },
  color: {
    theme: "color",
    text: "颜色",
    type: "button",
    value: [
      {
        name: "蓝色",
        id: "blue",
        active: true,
      },
      {
        name: "绿色",
        id: "green",
        active: false,
      },
    ],
  },
};
export const menuData = [
  {
    name: "home",
    text: "首页",
    icon: "icon-home-fill",
    active: true,
    highLight: true,
    drop: false,
  },
  {
    name: "about",
    text: "关于",
    icon: "icon-link",
    active: false,
    highLight: false,
    drop: false,
  },
  {
    name: "live",
    text: "留言",
    icon: "icon-sun",
    active: false,
    highLight: false,
    drop: false,
  },
  {
    name: "type",
    text: "文章分类",
    icon: "icon-appstore-fill",
    active: false,
    highLight: false,
    drop: true,
    dropList: [
      {
        name: "JS",
        active: false,
      },
      {
        name: "Vue",
        active: false,
      },
      {
        name: "Wxml",
        active: false,
      },
      {
        name: "Linux",
        active: false,
      },
    ],
  },
];
