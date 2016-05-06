var fs = require("fs");
var ejs = require("ejs");
var mysql = require("mysql");
var cookies = require("./cookies");
var login = require("./login");
var template = fs.readFileSync("./template/index.ejs","utf8");

exports.getFile = function(req,res) {
	res.writeHead(200,{
		"Content-Type" : "text/html"
	});

	if (login.isLogin(req)) {
		var userId = cookies.getCookies(req).user;
		var sql_getFriends = "SELECT * FROM user WHERE id !='" + userId + "'";
		var connection = mysql.createConnection({
			host : "localhost",
			user : "root",
			password : ""
		});

		connection.connect();

		connection.query("USE webqq",function(err) {
			if (err) {
				console.log("[USE DATABASE ERROR] - :",err.message);
				return;
			}
			console.log("[connection use database] succeed!");
			connection.query(sql_getFriends,function(err,result) {
				if (err) {
					console.log("[SELECT ERROR]-",err.message);
					return;
				}

				var context = {friends: result};
				res.end(ejs.render(template,context));
				connection.end();
			});
		});
	} else {
		login.sendLoginFile(res);
	}
}