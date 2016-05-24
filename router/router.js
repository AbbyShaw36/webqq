var send = require("../util/send");

function route(req,res,pathname,handle) {
	console.log("About to route a request for " + pathname);
		console.log(handle[pathname]);

	if (typeof handle[pathname] === "function") {
		handle[pathname](req,res);
	} else {
		send.serveStatic(res,"public/" + pathname);
	}
}

exports.route = route;