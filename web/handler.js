var querystring = require("querystring");
var UserService = require("../service/user").userService;
var User = require("../model/user").user;
var send = require("../util/send");
var cookie = require("../util/cookie").Cookie;

function Handler() {

}
	
// 是否已登录
Handler.prototype.isLogin = function(req) {
	this.userService = new UserService(req);
	return this.userService.isLogin();
}

// 除首页外其他页面都经过此检查是否登录，否则跳转到登录页面
Handler.prototype.checkLogin = function(req,res,cb) {
	// 未登录
	if (!this.isLogin(req)) {
		this.getLoginFile(res);
		return;
	}

	// 已登录
	cb();
}

// 获取登录页面
Handler.prototype.getLoginFile = function(res) {
	var pathname = "view/login.html";
	send.serveStatic(res,pathname);
}

// 请求登录页
Handler.prototype.signin = function(req,res) {
	this.checkLogin(req,res,function() {
		res.writeHead(302,{
			"Location" : "/index"
		});
		res.end();
	});
}

// 请求首页
Handler.prototype.index = function(req,res) {
	var that = this;
	console.log(this.isLogin(req));
	// 未登录
	if (!this.isLogin(req)) {
		// 登录操作
		if (req.method === "POST") {
			var data = "";

			req.addListener("data",function(chunk) {
				data += chunk;
			});

			req.addListener("end",function() {
				data = querystring.parse(data);
				
				var user = new User(data.name);
				
				that.userService.signin(user,function(err,user) {
					if (err) {
						res.end(err.code);
						return;
					}

					cookie.setCookie(res,[
						{
							key : "user",
							value : user.getName(),
							path : "/",
							httpOnly : true
						},
						{
							key : "userId",
							value : user.getId(),
							path : "/",
							httpOnly : true
						},
						{
							key : "isLogin",
							value : "true",
							path : "/",
							httpOnly : true
						}
					]);

					res.end("1");
				});
				
			});

			return;
		} // 登录操作结束

		// 返回登录页面
		this.getLoginFile(res);
		return;
	} // 未登录结束

	// 已登录
	
}

exports.handler = Handler;