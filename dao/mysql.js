var mysql = require("mysql");

function query(queryText,cb) {
	var connection = mysql.createConnection({
		host : "localhost",
		user : "root",
		password : "",
		datebase : "webqq"
	});

	connection.connect();
	connection.query("USE webqq");

	connection.query(queryText,function(err,result) {
		if (err) {
			console.log("[QUERY ERROR] - :" + err.message);
			cb({code : "0"});
			return;
		}

		cb(null,result);
	});

	connection.end();
}

exports.query = query;