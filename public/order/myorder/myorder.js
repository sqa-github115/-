function pull(addres) {
	$.myAjax({
		url: addres,
		success: function(data) {
			console.log(data);

			data.forEach(function(item, index) {
				console.log(item);
				var information;
				if (item.pay == 1) {
					information = '已支付';
				} else {
					information = '未支付';
				}
				$(
					`
				<li data-orderid="${item.orderId}">
					<h2>
					<img src="../img/logo_xiaomi.png">
					<span class="explain">小米自营</span>
					<span class="cancel">${information}</span>
					</h2>
					<div class="goods-data_list">
						
					</div>
					
					<div class="end">
						<span>共1件商品,</span>
						<span>总金额</span>
						<em>￥</em><span class="price">${item.account}</span>
					</div>
					<div class="agin">
						<div class="del">
							删除订单
						</div>
						<div class="buy">
							再次购买
						</div>
					</div>
				</li>
				`
				).appendTo('.goods');

				// item.details.forEach(function (index) {
				// 	console.log(index);
				// });

				item.details.forEach(function(item) {
					// console.log(item);
					$(
						`
					<div class="goods-data">
						<img src="${item.avatar}">
						<div class="introduce">
							<p class="name">${item.name}</p>
							<p class="num">
								<span class="goods-price">${item.price}</span>
								<span class="goods-amount">x${item.count}</span>
							</p>
						</div>
					</div>
					`
					).appendTo(`.goods-data_list:eq(${index})`);
				});
			});

		}
	});

}
pull($('.tab').find('li').eq(0).data('id'));

$('.tab li').click(function() {
	$('.goods').empty();
	var Id = $(this).data('id');
	$(this).find('span').addClass('color').parent().siblings().find('span').removeClass('color');
	pull(Id);
})

//删除订单
$('.goods').on('click', '.del', function() {
	$(this).parents('li').remove();
	var Id = $(this).parents('li').data('orderid');
	$.myAjax({
		url: `/order/remove/${Id}`,
		success: function(data) {
			layer.open({
				content: '删除成功',
				skin: 'msg',
				time: 1 //2秒后自动关闭
			});
		}
	});
});

//回退
$('.icon-back1').click(function () {
	history.back();
})