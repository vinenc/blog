// 添加transition过渡动画，接收target，css属性，开始值，结束值
export const _animate = function (target, attr, start, end) {
  let ms = 300;
  _css(target, "transition", "none");
  _css(target, attr, start);
  // 触发重绘
  target.offsetWidth;
  // 变换开始，translate设置为0，即返回新坐标位置
  _css(target, "transition", "all " + ms + "ms " + "ease-in-out");
  _css(target, attr, end);

  // 变换结束后清除style；如果上一个变换仍在进行，则清除上一个定时器，防止新变换中途被清除，而引起动画闪现
  clearTimeout(target.animated);
  target.animated = setTimeout(function () {
    _css(target, "transition", "");
    _css(target, attr, "");
    target.animated = false;
  }, ms);
};
// 元素添加style
export const _css = function (el, prop, val) {
  let style = el && el.style;
  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, "");
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }

      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style)) {
        prop = "-webkit-" + prop;
      }
      style[prop] = val + (typeof val === "string" ? "" : "px");
    }
  }
};

// body动画过渡
export const bodyAnimate = function () {
  document.body.style.transition = "all 0.5s ease-in-out";
  setTimeout(() => {
    document.body.style.transition = "";
  }, 500);
};
// 动画过渡，接收节点id
export const animateTime = function (id) {
  const node = document.getElementById(id);
  node.style.transition = "all 0.5s ease-in-out";
  setTimeout(() => {
    node.style.transition = "";
  }, 500);
};
