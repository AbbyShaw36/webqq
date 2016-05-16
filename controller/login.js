var mysql = require("./mysql");

function login(data) {
	var name = data.name;
	if (name) {
		var mysqlResult = mysql.query(function() {
			var searchSame = "SELECT * FROM user WHERE name='" + name + "'";
			var setName = "INSERT INTO user(name) VALUES('"+name+"')";

			global.mysqlEvent.on("useDb",function(data) {
				if (!data.result) {
					
				}
			});

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
		});
		console.log(mysqlResult);
	}
}

exports.login = login;