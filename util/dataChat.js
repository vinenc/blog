const sqlConnect = require("../config/db.js");

exports.getDataChart = function (req, res) {
  const start = req.body.start;
  const end = req.body.end;
  const sql = `select t3.date, IFNULL(t3.num2 + t3.num3, 0) AS count
  from (SELECT DATE_FORMAT(t1.date, '%Y-%m-%d') AS date,
               IFNULL(t2.num, 0)                AS num2,
               IFNULL(t3.num, 0)                AS num3
        FROM (SELECT @i := @i + 1                                          AS 'NO',
                     DATE(
                             DATE_ADD(?, INTERVAL @i DAY)) AS date -- 开始时间[创建日期表]
              FROM mysql.help_topic,
                   (SELECT @i := - 1) t
              WHERE @i < DATEDIFF(?, ?)) t1 -- 结束时间,开始时间
                 LEFT JOIN
             (SELECT DATE_FORMAT(create_time, '%Y-%m-%d') AS date,
                     COUNT(1)                             AS num
              FROM paper
              WHERE create_time >= ? &&
                    DATE_FORMAT(create_time, '%Y-%m-%d') <> DATE_FORMAT(update_time, '%Y-%m-%d')
              group by date) t2 ON t1.date = t2.date -- 开始时间[联表查询]]
                 LEFT JOIN
             (SELECT DATE_FORMAT(update_time, '%Y-%m-%d') AS date,
                     COUNT(1)                             AS num
              FROM paper
              WHERE update_time >= ?
              group by date) t3 ON t1.date = t3.date
        group by date) t3`;
  const callback = (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  };
  sqlConnect(sql, [start, end, start, start, start], callback);
};
