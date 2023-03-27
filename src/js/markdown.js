// 获取markdown标题列表
export const getTitleList = function () {
  const list = [];
  const node = document.getElementById("markdown").childNodes[0];
  [...node.childNodes].forEach((el) => {
    for (let i = 1; i <= 6; i++) {
      if (el.tagName === "H" + i)
        list.push({
          text: el.innerText,
          level: i,
          offsetTop: el.offsetTop,
          active: false,
        });
    }
  });
  return list;
};

// 将mark-body的样式修正
export const markBodyStyle = function () {
  const node = document.getElementById("markdown");
  if (!node) return;
  node.childNodes[0].style.padding = "16px 0 32px";
  node.childNodes[0].style.setProperty("font-family", "inherit");
};

// 生成摘要和标签
export const getSummary = function (callback) {
  const node = document.getElementById("markdown").childNodes[0];
  let str = "";
  // 获取所有innerText，排除某部分
  [...node.childNodes].forEach((el) => {
    if (el.nodeName == "TABLE") return;
    if (el.innerText != undefined) {
      str += el.innerText + " ";
    }
  });
  // 获取标签
  const tag = getType(str);
  // 去除换行\n，截取前200字
  str = str.replace(/\n/g, " ").substring(0, 200);
  callback(str, tag);
};

export const paperNumber = function (page, index) {
  let num = ((page - 1) * 5 + index + 1).toString();
  return num[1] ? num : "0" + num;
};

// 将时间戳转为 YY:MM:DD HH:MM:SS
export const dateTime = function (time) {
  if (!time) return;
  const d = new Date(time);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const t = d.getDate();
  const h = d.getHours();
  const f = d.getMinutes();
  const s = d.getSeconds();
  const format = function (val) {
    const a = val.toString();
    return a[1] ? a : "0" + a;
  };
  const dateTime =
    [y, m, t].map(format).join("-") + " " + [h, s, f].map(format).join(":");
  return dateTime;
};

// 获取标签及排序，并截取前3
const getType = function (str) {
  const type = [
    "JS",
    "Vue",
    "Sass",
    "Linux",
    "Docker",
    "MySQL",
    "Axios",
    "Wxml",
  ];
  const arr = [];
  // 标签名，出现次数
  type.forEach((el) => {
    let v = new RegExp(el.toLowerCase(), "g");
    let t = str.toLowerCase().match(v);
    if (t) {
      t = t.length;
      arr.push({
        name: el,
        time: t,
      });
    }
  });
  // 标签按出现的频率降序
  if (arr.length > 1) {
    const a = arr.sort((a, b) => {
      const v1 = a["time"];
      const v2 = b["time"];
      return v2 - v1;
    });
  }
  return arr.slice(0, 3);
};
