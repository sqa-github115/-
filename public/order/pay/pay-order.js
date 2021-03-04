var isId = window.location.search.slice(1).split(',').join('').trim();
console.log(isId);

$.myAjax({
	url: `/order/account/${isId}`,
	success: function(data) {
		console.log(data);
		$('.price').text(data);
		$('.payment').text("确认支付￥"+data+'.00');
	}
});

//倒计时
var minute = 29;
var second = 59;
setInterval(function() {
	second--;
	if (second == 00 && minute == 00) {
		minute = 29;
		second = 59;
	}; //当分钟和秒钟都为00时，重新给值
	if (second == 00) {
		second = 59;
		minute--;
		if (minute < 10) minute = "0" + minute;
	}; //当秒钟为00时，秒数重新给值
	if (second < 10) second = "0" + second;
	$(".minute").text(minute);
	$(".second").text(second);
}, 1000);

//切换
$('.checkAll').click(function () {
	$(this).addClass('checked').parent().siblings().find('.checkAll').removeClass('checked');
});

//支付
$('.payment').click(function(){
	$.myAjax({
		url: `/order/pay/${isId}`,
		success: function(data) {
			window.location.href = "/order/myorder/index.html"
		}
	});
})