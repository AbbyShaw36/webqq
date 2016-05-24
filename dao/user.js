var mysql = require("./mysql");

exports.UserDao = {
	getUserByName : function(user,cb) {
		var queryText = "SELECT * FROM user WHERE user_name='" + user.getName() + "'";
		mysql.query(queryText,cb);
	},
	createUser : function(user,cb) {
		var queryText = "INSERT INTO user(user_name) VALUES('" + user.getName() + "')";
		mysql.query(queryText,cb);
	}
}