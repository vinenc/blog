<template>
  <div class="date-chart">
    <div class="data">
      <div class="text-box" v-for="tap in tap" :key="tap.text">
        <p>{{ tap.value }}</p>
        <p>{{ tap.text }}</p>
      </div>
    </div>
    <div class="chart-info">
      <div class="vertical" v-for="item in chartData" :key="item.id">
        <div
          class="box"
          :class="box.count > 0 ? 'box-active' : 'box-default'"
          :style="box.count > 0 ? `opacity:${box.count / 5}` : ''"
          v-for="box in item.week"
          :key="box.id"
          :title="`${box.date}，${box.count}`"
        ></div>
        <div class="month" v-if="item.num">{{ chineseMonth(item.num) }}月</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import API from "@/api/axios";
import { getChartData, chineseMonth, addCount } from "@/js/chart";

const chartData = ref("");
const tap = ref([
  { text: "MEMO", value: "11" },
  { text: "TAG", value: "22" },
  { text: "DAY", value: "33" },
]);

const getChartCount = function () {
  const params = {
    start: chartData.value[0].week[0].date,
    end: chartData.value[11].week[6].date,
  };
  API.post("/getDataChart", params).then((res) => {
    const a = addCount(chartData.value, res.data);
    tap.value[1].value = a.active;
  });
};
const getCount = function () {
  API.get("/getCount").then((res) => {
    tap.value[0].value = res.data[0].count;
  });
};
const getElapsed = function (start, end) {
  const startDate = new Date(start).getTime(),
    endDate = new Date(end).getTime(),
    elapsed = endDate - startDate;
  const day = Math.floor(elapsed / (24 * 3600 * 1000));
  return day;
};

onBeforeMount(() => {
  tap.value[2].value = getElapsed("2023-03-01", new Date());
  chartData.value = getChartData();
  getChartCount();
  getCount();
});
</script>

<style lang="scss" scoped>
.date-chart {
  margin: 20px 0;
  padding: 0 16px;
  .data {
    @include display(flex, space-between, center);
    .text-box {
      p {
        margin: 0;
        text-align: left;
      }
      p:nth-child(1) {
        font-size: 24px;
        font-weight: normal;
      }
      p:nth-child(2) {
        font-size: 10px;
        line-height: 2;
      }
    }
  }
  .chart-info {
    margin-top: 10px;
    @include display(flex, space-between, center);
    .vertical {
      position: relative;
      .box {
        width: 14px;
        height: 14px;
        border-radius: 2px;
        margin-bottom: 4px;
      }
      .box-default {
        @include background-color("chartBox-background");
      }
      .box-active {
        @include background-color("theme-color-2");
      }
      .month {
        position: absolute;
        margin-top: 5px;
        font-size: 12px;
        white-space: nowrap;
        font-weight: light;
      }
    }
  }
}
</style>
