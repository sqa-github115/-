// $('.please-log a').text(sessionStorage.getItem("name"));

if (sessionStorage.getItem("token")) {
	$('.user').text(sessionStorage.getItem("name"));
	$('.please-log a').css('display', 'none');
	$('.address').click(function() {
		window.location.href = "/address/index.html";
	});
	$('.btn').stop().show();
	
} else {
	$('.please-log a').css('display', 'block');
	$('.btn').stop().hide();
}

$('.btn').click(function () {
	sessionStorage.removeItem("token");
	window.location.href = "/home/index.html";
	console.log(123);
})

$('.my-order').click(function () {
	window.location.href = "/order/myorder/index.html";
})