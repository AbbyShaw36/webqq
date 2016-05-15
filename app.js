var server = require("./server/server");
var router = require("./router/router");
var requestHandlers = require("./router/requestHandlers");

var handle = {};
handle["/"] = requestHandlers.index;
handle["/index"] = requestHandlers.index;
handle["/login"] = requestHandlers.login;

server.start(router.route,handle);