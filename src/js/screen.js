// 根据内容宽度，判断视图Size
export const getScreen = function (callback) {
  let S, M;
  const width = document.body.offsetWidth;
  if (width <= 768) {
    S = true;
    M = false;
  } else if (width > 768 && width <= 992) {
    S = false;
    M = true;
  } else {
    S = false;
    M = false;
  }
  callback(S, M);
};
// 禁止body滚动
export const bodySlipBlock = function (S, showAside) {
  const style = document.body.style;
  if (S && showAside) style.overflow = "hidden";
  else style.overflow = "";
};
// 首次运行,禁止动画
export const firstRunFun = function (firstRun, callback) {
  if (firstRun) {
    stopAinimate("blogAside");
    stopAinimate("markdownList");
    callback(false);
  }
};
const stopAinimate = function (id) {
  const node = document.getElementById(id);
  if (!node) return;

  node.style.transition = "none";
  setTimeout(() => {
    node.style.transition = "";
  }, 500);
};
