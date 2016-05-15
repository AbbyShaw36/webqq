var mysql = require("mysql");

function connect() {
	var connection = mysql.createConnection({
		host : "localhost",
		user : "root",
		password : ""
	});

	connection.connect();

	connection.query("USE webqq",function(err) {
		if (err) {
			console.log("[USE DATABASE ERROR] - :",err.message);
			return {
				result : 0,
				connection : connection
			};
		}

		console.log("[connection use database] succeed!");
		return {
			result : 1,
			connection : connection
		};
	});
}