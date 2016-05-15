var fs = require("fs"),
	path = require("path"),
	mime = require("mime");

function serveStatic(res,pathname) {
	var filePath = "./" + pathname;
	fs.exists(filePath,function(exists){
		if (exists) {
			fs.readFile(filePath,function(err, data) {
				if (err) {
					send404(res);
				} else {
					sendFile(res,filePath,data);
				}
			});
		} else {
			send404(res);
		}
	});
}

function send404(res) {
	res.writeHead(404,{"Content-Type" : "text/plain"});
	res.write("Error 404: resource not found.");
	res.end();
}

function sendFile(res, filePath, fileContent) {
	res.writeHead(200,{
		"Content-Type" : mime.lookup(path.basename(filePath))
	});
	res.end(fileContent);
}

exports.serveStatic = serveStatic;
exports.sendFile = sendFile;