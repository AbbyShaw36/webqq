var fs = require("fs");
var ejs = require("ejs");
var login = require("./login");
var template = fs.readFileSync("./template/index.ejs","utf8");

exports.getFile = function(req,res) {
	res.writeHead(200,{
		"Content-Type" : "text/html"
	});
	if (login.isLogin(req)) {
		var context = {name: "Li"};
		res.end(ejs.render(template,context));
	} else {
		login.sendLoginFile(res);
	}
}