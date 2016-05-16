var mysql = require("mysql");
var events = require('events');
global.mysqlEvent = new events.EventEmitter();

function connect(callback) {
	var connection = mysql.createConnection({
		host : "localhost",
		user : "root",
		password : ""
	});

	connection.connect();

	connection.query("USE webqq",function(err) {
		if (err) {
			console.log("[USE DATABASE ERROR] - :",err.message);
			global.mysqlEvent.emit("useDb",{
				result : 0,
				connection : connection
			});
		}

		console.log("[connection use database] succeed!");
		global.mysqlEvent.emit("useDb",{
			result : 1,
			connection : connection
		});
	});
}

exports.connect = connect;