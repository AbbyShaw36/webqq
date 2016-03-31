var http = require("http");	// http服务
var fs = require("fs");	// 文件操作
var path = require("path"); // 处理文件路径
var mime = require("mime");	// 处理文件扩展名
var index = require("./server/index.js");

// 返回404响应
function send404(res) {
	res.writeHead(404,{"Content-Type" : "text/plain"});
	res.write("Error 404: resource not found.");
	res.end();
}

// 返回相应页面响应
function sendFile(res, filePath, fileContent) {
	res.writeHead(200,{
		"Content-Type" : mime.lookup(path.basename(filePath))
	});
	res.end(fileContent);
}

// 请求处理
function serveStatic(res, filePath) {
	console.log(filePath);
	// 文件是否存在
	fs.exists(filePath, function(exists){
		if (exists) {
			// 文件是否可读取
			fs.readFile(filePath, function(err, data) {
				if (err) {
					send404(res);
				} else {
					sendFile(res, filePath, data);
				}
			});
		} else {
			send404(res);
		}
	})
}

// 创建服务
var server = http.createServer(function(req, res){
	var filePath = "";

	if (req.url == "/") {
		// filePath = "index.html";
		res.writeHead(200,{"Content-Type" : "text/html"});
		res.end(index.getFile());
		return;
	} else {
		filePath = req.url;
	}

	filePath = "./" + filePath;

	serveStatic(res, filePath);
});

// 监听服务
server.listen(3000, function() {
	console.log("Server listening on port 3000.");
});