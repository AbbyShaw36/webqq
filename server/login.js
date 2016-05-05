var cookies = require("./cookies");
var fs = require("fs");
var querystring = require("querystring");
var mysql = require("easymysql");

var connection = mysql.create({
	maxconnections : 10
});

connection.addserver({
	host : "localhost",
	user : "root",
	password : ""
})

exports.isLogin = function(req) {
	console.log(cookies.getCookies(req).user);
	if (cookies.getCookies(req).user) {
		return true;
	} else {
		return false;
	}
}

exports.sendLoginFile = function(res) {
	fs.readFile("./template/login.html",function(err,data){
		res.writeHead(200,{"Content-Type" : "text/html"});
		res.end(data);
	});
}

/*
	登陆返回数据：
	0 : 失败
	1 : 成功
	2 : 用户已存在
*/
exports.setLogin = function(req, res) {
	req.addListener("data",function(data) {
		var name = querystring.parse(data + '').name;
		var setSql = "INSERT INTO user(name) VALUES('"+name+"'')";
		var searchSql = "SELECT * FROM user WHERE name='" + name + "'";

		connection.query("USE webqq",function(err) {
			if (err) {
				console.log("[USE DATABASE ERROR] - :",err.message);
				res.end("0");
				return;
			}
			console.log("[connection use database] succeed!");
		});
		// 查找是否有相同名字用户存在
		connection.query(searchSql,function(err,result) {
			if (err) {
				console.log("[SELECT ERROR]-",err.message);
				res.end("0");
				return;
			}

			if (result.length > 0) {
				res.end("2");
				return;
			}
		});
		// 写入数据库表
		connection.query(setSql,function(err,result) {
			if (err) {
				console.log("[INSERT ERROR]-",err.message);
				res.end("0");
				return;
			}
			console.log("INSERT ID:",result);
			res.writeHead(200,{
				"Set-Cookie" : "user=" + result.insertId
			});
			res.end("1");
		});
	});
}