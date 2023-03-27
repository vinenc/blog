const jwt = require("jsonwebtoken");

//生成token的方法
exports.generateToken = function (data) {
  const created = Math.floor(Date.now() / 1000);
  const secret = "5RJwuod$YxzeHbe!";
  const token = jwt.sign(
    {
      data,
      exp: created + 3600 * 24,
    },
    secret
  );
  return token;
};

//验证token,最后的res
exports.verifyToken = function (token) {
  console.log("进入验证");
  const secret = "5RJwuod$YxzeHbe!";
  const callback = (err, res) => {
    if (err) {
      if (err.name == "TokenExpiredError") {
        const str = {
          iat: 1,
          exp: 0,
          msg: "Token已过期",
        };
        return str;
      } else if (err.name == "JsonWebTokenError") {
        const str = {
          iat: 1,
          exp: 0,
          msg: "无效的Token",
        };
        return str;
      }
    } else return res;
  };
  const result = jwt.verify(token, secret, callback);
  if (result.iat < result.exp) return result;
  else return false;
};
