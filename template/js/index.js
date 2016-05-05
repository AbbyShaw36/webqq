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
})