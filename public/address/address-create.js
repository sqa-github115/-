var pageBack = document.referrer.slice(21);
$('.save').on('click', function() {
	$.ajax({
		url: "/address/add",
		type: "post",
		headers: {
			"Authorization": sessionStorage.getItem("token"),
			"Content-Type": "application/json"
		},
		data: JSON.stringify({
			"receiveName": $('input.name').val().trim(),
			"receivePhone": $('input.phone').val().trim(),
			"receiveRegion": $('input.regions-picker').val(),
			"receiveDetail": $('input.detail').val()
		}),
		success: function(result){
			if (result.code === 200) {
				layer.open({
					content: '创建成功',
					skin: 'msg',
					time: 1 //1秒后自动关闭
				});
				//延迟执行
				setTimeout(function(){
				window.location.href= pageBack;
				// window.history.back();
				},1100);
			} else{
				alert(result.msg);
			}
		}
	})

});

//回退
$('.address-header img').click(function () {
	window.history.back();
})