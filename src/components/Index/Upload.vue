<template>
  <el-upload
    class="upload-demo"
    action="#"
    :on-change="openFile"
    :auto-upload="false"
    :limit="1"
    :on-exceed="handleExceed"
    drag
    id="upload"
    ref="upload"
  >
    <el-icon class="el-icon--upload"><i-ep-upload-filled /></el-icon>
    <div class="el-upload__text">拖动文件到这里或 <em>点击开始上传</em></div>
    <template #tip>
      <div class="el-upload__tip">只支持Markdown文本 / 且大小不超过20KB</div>
    </template>
  </el-upload>
  <div
    class="upload-data"
    :class="app.screenS ? 'mobile' : ''"
    v-if="data.content"
    id="upload-data"
  >
    <div class="confirm">
      <div style="width: 0; flex: 1">
        <span>作者：</span>
        <el-input class="input" v-model="data.author" placeholder="Admin" />
      </div>
      <el-button class="btn" type="primary" @click="confirmUpload">
        确认上传
      </el-button>
    </div>
    <div v-if="data.tag[0]">
      <span>标签：</span>
      <span class="tag" v-for="tag in data.tag" :key="tag.name">
        {{ tag.name }}
      </span>
    </div>
    <h2>简介</h2>
    <el-input
      class="summary"
      v-model="summaryTxt"
      :rows="5"
      type="textarea"
      placeholder="Please input"
    />
    <h2>文本预览</h2>
    <v-md-preview class="preview" :text="markTxt" id="markdown"></v-md-preview>
  </div>
</template>

<script setup>
import { getCurrentInstance, inject, nextTick, reactive, ref } from "vue";
import "element-plus/theme-chalk/el-message.css";
import API from "@/api/axios";
import { genFileId } from "element-plus";
import { markBodyStyle, getSummary } from "@/js/markdown";
import { _animate } from "@/js/animate";

const app = inject("app");
const summaryTxt = ref("");
const markTxt = ref("");
const { proxy } = getCurrentInstance();
const data = reactive({
  title: "",
  tag: "",
  summary: "",
  content: "",
  author: "博主",
  url: "",
});

const openFile = function (file) {
  const fileType = file.name.replace(/.+\./, "");
  if (fileType != "md") {
    proxy.$refs.upload.clearFiles();
    return ElMessage.error("请添加正确格式的文件，只支持Markdown文本");
  } else if (file.size > 20480) return ElMessage.error("文件大小不能超过20KB");

  const reader = new FileReader();
  reader.onload = function () {
    // 打印文件内容
    if (reader.result) {
      markTxt.value = reader.result;
      data.content = reader.result;
      data.title = file.name.replace(/\.{1}[a-z]{1,}$/, "");
      data.url = "https://cos.waowaowao.cn/blog/" + file.name;
      nextTick(() => {
        const callback = (str, tag) => {
          summaryTxt.value = str;
          data.summary = str;
          data.tag = tag;
        };
        getSummary(callback);

        const node = document.getElementById("upload-data");
        _animate(node, "opacity", "0", "1");
        markBodyStyle();
      });
    }
  };
  reader.readAsText(file.raw);
};
const handleExceed = function (files) {
  proxy.$refs.upload.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  proxy.$refs.upload.handleStart(file);
};
const confirmUpload = function () {
  if (!data.author) data.author = "访客";
  addPaper();
};
// API
const addPaper = function () {
  API.post("/addPaper", data).then((res) => {
    if (res.data) {
      ElMessage.success(`文章：${data.title}，添加成功`);
      for (let key in data) data[key] = "";
      proxy.$refs.upload.clearFiles();
    }
  });
};
</script>

<style lang="scss" scoped>
#upload {
  padding: 20px;
  em {
    @include color("theme-color-3");
  }
}
.upload-data {
  padding: 20px;
  text-align: left;
  .confirm {
    @include display(flex, space-between, center);
    padding: 0.5rem 0;
    span {
      display: inline-block;
    }
    .input {
      max-width: 200px;
    }
  }
  h2 {
    border-bottom: 1px solid #b7b7b7;
  }
  .summary {
    font-size: 1rem;
    text-indent: 2em;
  }
  .preview {
    padding: 0;
  }
}
.mobile {
  padding: 20px 0;
  .input {
    width: 150px;
  }
}
.tag {
  font-size: 12px;
  padding: 1px 5px;
  margin-right: 7px;
  border-radius: 3px;
  color: #ffffff;
  user-select: none;
  @include background-color("theme-color-3");
}
</style>
