var Oid = window.location.search.slice(4);
// var id = Number(Oid);
var pageBack = document.referrer.slice(21);
console.log(pageBack);
// console.log(Oid);
$('input.name').val(sessionStorage.getItem("name"));
$('input.phone').val(sessionStorage.getItem("tel"));
$('input.regions-picker').val(sessionStorage.getItem("address1"));
$('input.detail').val(sessionStorage.getItem("address2"));

//保存
$('.save').click(function() {
	$.ajax({
		url: "/address/update",
		type: "post",
		headers: {
			"Authorization": sessionStorage.getItem("token"),
			"Content-Type": "application/json"
		},
		data: JSON.stringify({
			id: Oid,
			receiveName: $('input.name').val().trim(),
			receivePhone: $('input.phone').val().trim(),
			receiveRegion: $('input.regions-picker').val(),
			receiveDetail: $('input.detail').val()
		}),
		success: function(result) {
			if (result.code === 200) {
				layer.open({
					content: '修改成功',
					skin: 'msg',
					time: 1 //1秒后自动关闭
				});
				//延迟执行
				setTimeout(function(){
				window.location.href= pageBack;
				// window.history.back();
				},1100);
			} else {

			}
		}
	});


});

//删除
$('.delet').click(function() {
	$.ajax({
		url: `/address/remove/${Oid}`,
		type: "get",
		headers: {
			"Authorization": sessionStorage.getItem("token"),
		},
		success: function(result) {
			if (result.code === 200) {
				layer.open({
					content: '删除成功',
					skin: 'msg',
					time: 1 //1秒后自动关闭
				});
				setTimeout(function () {
					window.history.back();
				},1100);
				
			} else {

			}
		}
	});
	console.log(123);

});
