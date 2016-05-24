var cookie = require("../util/cookie").Cookie;
var userDao = require("../dao/user").UserDao;

function UserService(req) {
	this.req = req;
}

UserService.prototype.signin = function(user,cb) {
	if (this.isLogin()) {
		cb({message: "The user has logged."});
		return;
	}

	userDao.getUserByName(user,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length > 0) {
			cb({code:"2"});
			return;
		}

		userDao.createUser(user,function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			user.setId(result.insertId);

			cb(null,user);
		});
	});
}

UserService.prototype.isLogin = function() {
	var cookies = cookie.getCookies(this.req);
	console.log(cookies);
	var isLogin = cookie.getCookie(this.req,"isLogin");

	if (isLogin === "true") {
		return true;
	} else if (isLogin === "false") {
		return false;
	}
}

exports.userService = UserService;