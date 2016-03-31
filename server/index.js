var fs = require("fs");
var ejs = require("ejs");
var template = fs.readFileSync("./template/index.ejs","utf8");

exports.getFile = function() {
	var context = {name: "Li"};
	return ejs.render(template,context);
}