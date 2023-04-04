# API 接口文档

### 简介

本文档包含了项目中使用的所有 API 接口。这些接口可以通过 HTTP + 端口 访问，请求和响应均使用 JSON 格式。

### 基本信息

1. 接口地址：`http://127.0.0.1:6927`
2. 请求方式：GET 或 POST
3. 请求头：`Content-Type: application/json`
4. 响应格式：JSON

## API 列表

| 接口地址         | 请求方式 |                    请求参数                     | 响应参数                              | 描述                                       |
| ---------------- | :------: | :---------------------------------------------: | ------------------------------------- | ------------------------------------------ |
| /getCount        |   GET    |                       N/A                       | num / 文章总数                        | 获取博客文章总数量                         |
| /getPaper        |   GET    |                       id                        | obj / 文章所有数据                    | 获取一篇博客的详细数据                     |
| /getPaperList    |   GET    |                      page                       | array / 文章所有数据，除内容          | 根据页数获取文章，一页5篇                  |
| /getPaperTop     |   GET    |                       N/A                       | array / (id,title,watcher)          | 获取浏览量前十的文章                       |
| /searchPaper     |   POST   |                      input                      | array / (id,title)                    | 搜索输入关联的文章                         |
| /searchPaperList |   GET    |                      input                      | array / 文章所有数据，除内容          | 搜索输入关联的文章                         |
| /typePaperList   |   GET    |                      type                       | array / 文章所有数据，除内容          | 根据类型获取文章列表                       |
| /addWatcher      |   POST   |                       id                        | string / 成功文本                     | 文章浏览量+1                               |
| /addPaper        |   POST   | title,tag,<br/>summary,<br/>content,<br/>author | string / 成功文本                     | 添加文章                                   |
| /delPaper        |   POST   |                       id                        | string / 成功文本                     | 删除文章                                   |
| /login           |   POST   |              acount,<br/>password               | obj / (id,acount,<br/>password,token) | 用户登录，返回用户数据和token              |
| /verify          |   POST   |                      token                      | obj / (id,acount,<br/>password)       | 根据token验证用户，返回用户数据            |
| /getDataChart    |   POST   |                    start,end                    | array / (date,count)                  | 根据文章创建时间和修改时间，组成活跃度数据 |

> 文章所有数据包括：id，title，tag，summary，content，author，watcher，create_time，update_time

## 参数描述

| 参数名      | 类型             | 描述                    |
| ----------- | ---------------- | ----------------------- |
| N/A         | /                | 无参数                  |
| id          | Number           | 文章ID                  |
| title       | String           | 文章标题                |
| tag         | [Object，Object] | 文章标签                |
| summary     | String           | 文章摘要                |
| content     | String           | 文章内容                |
| author      | String           | 文章作者                |
| create_time | Timestamp        | 文章创建时间            |
| update_time | Timestamp        | 文件更新时间            |
| page        | Number,String    | 页数                    |
| type        | String           | 类型                    |
| input       | String           | 搜索框 输入             |
| acount      | String           | 账户名                  |
| password    | String           | 密码                    |
| start，end  | Timestamp        | 开始时间，结束时间      |
| token       | String           | JsonWebToken生成的Token |