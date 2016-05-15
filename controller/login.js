var mysql = require("./controller/login");

function login(data) {
	var name = data.name;
	if (name) {
		var searchSame = "SELECT * FROM user WHERE name='" + name + "'";
		var setName = "INSERT INTO user(name) VALUES('"+name+"')";
		var connectMysql = mysql.connect();

		if (connectMysql.result === 0) {
			return {
				result : 0
			};
		}

		connection.query(searchSame,function(err,result) {
			if (err) {
				console.log("[SELECT ERROR] - :",err.message);
				return {
					result : 0
				};
			}

			if (result.length > 0) {
				return {
					result : 2
				};
			}

			connection.query(setName,function(err,result) {
				if (err) {
					console.log("[INSERT ERROR] - :",err.message);
					return {
						result : 0
					};
				}

				console.log("INSERT ID:",result);
				return {
					result : 1,
					user : result.insertId
				}
			});
		});
	}
}

exports.login = login;