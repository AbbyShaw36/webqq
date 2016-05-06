$(document).ready(function(){
	var socket = io.connect();

	socket.emit("getUser",$.cookie("user"));

	socket.on("getOnlineFrineds",function(data) {
		$(".userList li").each(function() {
			if ($.inArray($(this).attr("id"),data) !== -1) {
				$(this).find(".r").text("[在线]");
			}
		});
	});

	socket.on("getNewFriends",function(user) {
		console.log(user);
		var newUser = "<li id=\"" + user.userId + "\"><span class=\"l\">"+user.userName+"</span><span class=\"r\">[在线]</span></li>";
		$(".userList").append($(newUser));
		$(".content_title span").text(Number($(".content_title span").text()) + 1);
	})

	$(window).unload(function() {
		$.removeCookie("user");
	});
})