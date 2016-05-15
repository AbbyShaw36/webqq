var http = require("http");

function start(route,handle) {
	function onRequest(req,res) {
		var pathname = req.url;
		console.log("Request for " + pathname + " received.");
		route(req,res,pathname,handle);
	}

	http.createServer(onRequest).linsten(3000,function() {
		console.log("Server has started.");
	});
}

exports.start = start;