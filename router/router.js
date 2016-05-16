var send = require("./send");

function route(req,res,pathname,handle) {
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === "function") {
		handle[pathname](req,res);
	} else {
		send.serveStatic(res,"public/" + pathname);
	}
}

exports.route = route;