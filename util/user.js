const sqlConnect = require("../config/db.js");
const jwt = require("./jwt");

exports.login = function (req, res) {
  const acount = req.body.acount;
  const password = req.body.password;
  const sql = `SELECT * FROM user WHERE acount = ? && password = ?`;
  const callback = (err, result) => {
    if (err) console.log(err);
    else if (!result[0]) res.send(false);
    else {
      // JsonWebToken
      const token = jwt.generateToken(result[0]);
      res.send({ result, token });
    }
  };
  sqlConnect(sql, [acount, password], callback);
};
exports.verify = function (req, res) {
  const token = req.body.token;
  const result = jwt.verifyToken(token);
  res.send(result);
};
