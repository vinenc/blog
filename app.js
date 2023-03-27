const express = require("express");
const app = express();

//-----创建Http服务，端口6927-----
const httpServer = require("http").createServer(app);
httpServer.listen("6927");

//-----跨域请求处理-----
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With, X_Requested_With"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("X-Powered-By", "3.2.1");
  if (req.method == "OPTIONS") {
    /*让options请求快速返回*/
    res.sendStatus(200);
  } else {
    next();
  }
});
//-----请求体格式数据解析-----
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//-----入口文件index.js-----
const indexRouter = require("./router/index.js");
app.use("/blog", indexRouter);
