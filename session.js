/* @module session
 * a module respresenting a user session
 */

module.exports = {
  create: create,
  destroy: destroy
};

var json = require('../lib/form-json');

function create(req, res) {
  json(req, res, function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    db.get("SELECT * FROM users WHERE username=?", [username], function(err, user) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server error");
      return;
    });
    if (!user) {
      res.statusCode = 403;
      res.end("Incorrect username/password");
      return;
    }
    var cryptedPassword = encryption.digest(password + user.salt);
    if (cryptedPassword != user.cryptedPassword) {

    }else {
      var cookieData = {userId: user.id}
      var encryptedCookieData = encryption.encipher(cookieData);
      res.setHeader("Set-Cookie", ["user-id="]);
    }
  });
}

function loginRequired(req, res, next) {
  var session = req.headers.cookie.session;
  var sessionData = encryption.decipher(sessionData);
  var sessionObj = JSON.parse(sessionData);
  if (sessionObj.userId) {
    req.userId = sessionObj.userId;
    return next(req, res);
  }
}
