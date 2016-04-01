$(document).ready(function(){
	$("body").on("click",".btn input[value='登录']",function() {
		var name = $("input[name='name']").val();
		console.log(name);

		$.ajax({
			type : "POST",
			url : "/setLogin",
			dataType : "text",
			data : "name=" + name,
			success : function(data) {
				switch (data) {
					case "0" :
						alert("登录失败！");
						break;
					case "1" :
						location.reload();
						break;
					case "2" :
						alert("用户名已存在！");
						break;
				}
			}
		});
	})
});