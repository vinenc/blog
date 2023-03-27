const mySql = require("mysql");
// secret是存放重要信息的文件，需要自己创建
const secret = require("./secret");

let count = 0;
//-----连接池创建与配置-----
const pool = mySql.createPool({
  host: secret.host,
  port: secret.port,
  user: secret.user,
  password: secret.password,
  database: "blog",
  connectionLimit: 20,
});

//-----连接池中获取连接-----
sqlConnect = function (sql, sqlArr, callback) {
  pool.getConnection((err, conn) => {
    count++;
    console.log("数据库连接成功 " + count);
    if (err) {
      console.log("连接失败！");
      return;
    }

    // 事件驱动回调
    conn.query(sql, sqlArr, callback);
    // 释放链接
    conn.release();
  });
};

module.exports = sqlConnect;
