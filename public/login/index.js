//用户名密码登录与手机验证码登录模式的切换
$('button.btn-toggle').on('click', function() {
	$('.login-pwd, .login-phone').toggleClass('show');
});
//手机号验证码登录
$('button.btn-login-phone').on('click',function() {
	alert('手机号验证码登录功能暂未开放，请切换为用户名密码登录!');
})
//用户名密码登录
//收集用户信息发送ajax
//后台进行验证
$('button.btn-login-pwd').on('click',function() {
	$.ajax({
		url:'/user/login_pwd',
		type:'post',
		//headers节点永远设置请求头
		headers: {
			"Content-Type": "application/json"
		},
		data: JSON.stringify({
			name:$('input.name').val().trim(),
			pwd:$('input.pwd').val()
		}),
		success:function (result) {
			//返回token
			if(result.code === 200){
				//成功
				sessionStorage.setItem("token", result.data);
				sessionStorage.setItem("name", $('input.name').val().trim());
				window.location.replace("/profile/index.html");
				// history.back();
			}else{
				//登录失败
				alert(result.msg);
			}
		}
	});
})

$('.register').click(function () {
	window.location.href = "/login/register/index.html";
})



//json跨语言跨平台的数据交换格式

// JSON.stringify()
// JSON.parse()
// //互逆

// //浏览器存东西
// cookie
// sessionStorage//浏览器关闭 sessionStorage消失
// sessionStorage.setItem("token",ajax回来的token);
// sessionStorage.getItem("token");
// sessionStorage.removeItem();
// sessionStorage.clear();

// localStorage