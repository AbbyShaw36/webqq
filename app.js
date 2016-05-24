var http = require("http");
var router = require("./router/router");
var Handler = require("./web/handler").handler;
var handler = new Handler();

var handle = {};
handle["/"] = handle["/index"] = function(req,res){
	return handler.index(req,res);
};
handle["/login"] = handler.signin;

(function start(route,handle) {
	function onRequest(req,res) {
		var pathname = req.url;
		console.log("Request for " + pathname + " received.");
		route(req,res,pathname,handle);
	}

	http.createServer(onRequest).listen(3000,function() {
		console.log("Server has started.");
	});
})(router.route,handle);