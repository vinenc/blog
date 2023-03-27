const sqlConnect = require("../config/db.js");

exports.getCount = function (req, res) {
  const sql = `SELECT COUNT(*) AS count FROM paper`;
  const callback = (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  };
  sqlConnect(sql, "", callback);
};
exports.getPaper = function (req, res) {
  const id = req.query.id;
  const sql = `SELECT * FROM paper WHERE id = ?`;
  const callback = (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  };
  sqlConnect(sql, id, callback);
};
exports.getPaperList = function (req, res) {
  const page = req.query.page;
  const sql = `SELECT id,title,tag,summary,author,url,watcher,create_time,update_time FROM paper ORDER BY update_time DESC 
    LIMIT ?,?`;
  const callback = (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  };
  sqlConnect(sql, [(page - 1) * 5, 5], callback);
};
exports.getPaperTop = function (req, res) {
  const sql = `SELECT id,title,watcher from paper ORDER BY watcher DESC LIMIT 0,10`;
  const callback = (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  };
  sqlConnect(sql, "", callback);
};
exports.searchPaper = function (req, res) {
  const input = req.body.input;
  const sql = `SELECT id,title FROM paper WHERE paper.title LIKE CONCAT('%',?,'%') OR to_pinyin(paper.title) LIKE CONCAT('%',?,'%')`;
  const callback = (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  };
  sqlConnect(sql, [input, input], callback);
};
exports.searchPaperList = function (req, res) {
  const input = req.query.input;
  const sql = `SELECT id,title,tag,summary,author,url,watcher,create_time,update_time FROM paper WHERE paper.title LIKE CONCAT('%',?,'%') OR to_pinyin(paper.title) LIKE CONCAT('%',?,'%')`;
  const callback = (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  };
  sqlConnect(sql, [input, input], callback);
};
exports.typePaperList = function (req, res) {
  const type = req.query.type;
  const sql = `SELECT id,title,tag,summary,author,url,watcher,create_time,update_time FROM paper WHERE paper.tag LIKE CONCAT('%',?,'%')`;
  const callback = (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  };
  sqlConnect(sql, type, callback);
};
exports.addWatcher = function (req, res) {
  const id = req.body.id;
  const sql = `UPDATE paper SET watcher = watcher + 1 WHERE id = ?`;
  const callback = (err, result) => {
    if (err) console.log(err);
    else res.send("Add paper watcher success!");
  };
  sqlConnect(sql, id, callback);
};
exports.addPaper = function (req, res) {
  const title = req.body.title;
  const tag = JSON.stringify(req.body.tag);
  const summary = req.body.summary;
  const content = req.body.content;
  const author = req.body.author;
  const url = req.body.url;
  const sql = `INSERT INTO paper (title,tag,summary,content,author,url) VALUES (?,?,?,?,?,?)`;
  const callback = (err, result) => {
    if (err) console.log(err);
    else res.send(true);
  };
  sqlConnect(sql, [title, tag, summary, content, author, url], callback);
};
exports.delPaper = function (req, res) {
  const id = req.body.id;
  const sql = `DELETE FROM paper WHERE id = ?`;
  const callback = (err, result) => {
    if (err) console.log(err);
    else res.send("Delete paper sueecss!");
  };
  sqlConnect(sql, id, callback);
};
