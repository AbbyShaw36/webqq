$(document).ready(function(){
	$("body").on("click","#login",function() {
		var name = $("#name").val();
		console.log(name);

		$.ajax({
			type : "POST",
			url : "/index",
			dataType : "text",
			data : "name=" + name,
			success : function(data) {
				switch (data) {
					case "0" :
						alert("登录失败！");
						break;
					case "1" :
						window.location = "/index";
						break;
					case "2" :
						alert("用户名已存在！");
						break;
				}
			}
		});
	})
});