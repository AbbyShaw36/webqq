var socketIo = require("socket.io");
var mysql = require("mysql");
var io;
var room = "public";
var onlineUsers = [];
var nickName = {};
var currentRooms = {};

exports.listen = function(server) {
	io = socketIo.listen(server);
	io.set("log level",1);

	io.sockets.on("connection",function(socket) {
		socket.on("getUser",function(user) {
			socket.join(room);
			onlineUsers.push(user);
			nickName[socket.id] = user;
			currentRooms[socket.id] = room;
			console.log("getUser:"+onlineUsers);

			if (onlineUsers.length > 1) {
				var connection = mysql.createConnection({
					host : "localhost",
					user : "root",
					password : ""
				});

				connection.connect();

				connection.query("USE webqq",function(err) {
					if (err) {
						console.log("[USE DATABASE ERROR] - :",err.message);
						return;
					}
					console.log("[connection use database] succeed!");
					connection.query("SELECT name FROM user WHERE id='" + user + "'",function(err,result) {
						if (err) {
							console.log("[SELECT ERROR]-",err.message);
							return;
						}
						console.log("[SELECT FROM table] succeed!");
						socket.broadcast.to(room).emit("getNewFriends",{
							userId : user,
							userName : result[0].name
						});
					});
				})
			}
		});

		socket.emit("getOnlineFrineds",onlineUsers);

		socket.on("disconnect",function() {
			console.log(nickName[socket.id] + " disconnect.");
			var sql_deleteUser = "DELETE FROM user WHERE id='" + nickName[socket.id] + "'";
			var connection = mysql.createConnection({
				host : "localhost",
				user : "root",
				password : ""
			});

			connection.connect();

			connection.query("USE webqq",function(err) {
				if (err) {
					console.log("[USE DATABASE ERROR] - :",err.message);
					return;
				}
				console.log("[connection use database] succeed!");
				connection.query(sql_deleteUser,function(err,result) {
					if (err) {
						console.log("[DELETE ERROR]-",err.message);
						return;
					}
					console.log("[Delete from table] succeed!");

					onlineUsers.splice(onlineUsers.indexOf(nickName[socket.id]),1);
					delete nickName[socket.id];
					delete currentRooms[socket.id];
					console.log("Delete:" + onlineUsers);
					connection.end();
				});
			});
		});
	});
}