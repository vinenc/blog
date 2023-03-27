// 获取Chart的数据，12个星期，84天
export const getChartData = function () {
  const d = new Date();
  const day = d.getDay();
  const data = [];

  // 如果今天不是周日，则将日期设置为本星期的周日 (数据以星期为单位)
  if (day != 0) d.setDate(d.getDate() + (7 - day));
  else d.setDate(d.getDate());
  // 包括周日当天共84天，即需要-83。为方便下面(j循环)计算，这里要多减一天-84
  d.setDate(d.getDate() - 84);

  let week,
    yesterdayMonth,
    monthNum,
    setMonth,
    setMonthNum = 0;
  for (let i = 12; i > 0; i--) {
    let arr = [];
    for (let j = 7; j > 0; j--) {
      // 如果-83，就需要先获取数据val，再设置时间setDate。(数据一样，但是d的时间会变成明天，因为循环了84次)
      d.setDate(d.getDate() + 1);
      const a = d.getFullYear();
      const b = d.getMonth() + 1;
      const c = d.getDate();
      const formate = function (val) {
        if (val < 10) return "0" + val;
        else return val;
      };
      const obj = {
        date: a + "-" + formate(b) + "-" + formate(c),
        id: i + "-" + j,
        count: "",
      };
      arr.push(obj);

      // 判断今日与昨日的月份是否一样，不一样则标记新的月份
      if (yesterdayMonth != b) {
        setMonth = true;
        monthNum = b;
      }
      yesterdayMonth = b;
    }

    // 有标记说明本星期(week)下面，需要显示月份
    if (setMonth) {
      setMonthNum += 1;
      week = { week: arr, id: i, num: monthNum };
    } else week = { week: arr, id: i, num: "" };
    setMonth = false;

    data.push(week);
  }
  if (setMonthNum == 4) data[0].num = "";
  return data;
};

// 将数字1~12,转换成中文
export const chineseMonth = function (val) {
  const arr = [
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "十一",
    "十二",
  ];
  return arr[val - 1];
};

// 将后端传来的，日期-文章(count)篇数，写入data当中
export const addCount = function (arr1, arr2) {
  let active = 0;
  arr1.forEach((item) => {
    item.week.forEach((el) => {
      arr2.forEach((res) => {
        if (el.date == res.date) {
          el.count = res.count;
          if (res.count) active++;
        } else return;
      });
    });
  });
  return { arr1, active };
};
