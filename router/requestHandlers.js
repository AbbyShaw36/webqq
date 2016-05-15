var querystring = require("querystring"),
	cookies = require("./cookies"),
	send = require("./send"),
	index = require("./index"),
	login = require("./controller/login");

function login(req,res) {
	// 已登录，返回主页
	if (cookies.getCookies(req).isLogin) {
		res.writeHead(302,{
			"Location" : "/index"
		});
		res.end();
		return;
	}

	// 未登录
	var pathname = "./views/login.html";
	send.serveStatic(res,pathname);
}

function index(req,res) {
	// 未登录
	if (!cookies.getCookies(req).isLogin) {
		// 登录
		if (req.method === "POST") {
			var data = "";

			req.addListener("data",function(chunk) {
				data += chunk;
			});

			req.addListener("end",function() {
				data = querystring.parse(data);
				var loginResult = login.login(data);

				if (loginResult.result === 1) {
					res.writeHead(200,{
						"Set-Cookie" : "isLogin=true&&user=" + loginResult.user
					});
				}

				res.end(loginResult.result);
			});
		}

		// 返回登录页面
		res.writeHead(302,{
			"Location" : "/login"
		});
		res.end();
		return;
	}

	// 已登录
	var indexFile = index.getIndexFile();
}

exports.login = login;
exports.index = index;