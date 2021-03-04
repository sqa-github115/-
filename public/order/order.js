var isId = window.location.search.slice(1).split(',')
// console.log(isId);
//获取的商品
$.myAjax({
	url: "http://localhost:3000/cart/list_ids",
	type: "post",
	data: {
		"ids": isId,
	},
	success: function(data) {
		console.log(data);
		var arr = [];
		data.forEach(function(item) {
			console.log(item);
			$(
				`
			<li>
				<img src="${item.avatar}" >
				<div class="text">
					<p style="font-size: 14px;color: #000000;">${item.name}</p>
					<p style="margin-top: 8px;margin-bottom:8px;">
						<span class="order-price">${item.price}</span>
						<span class="order-amount">x${item.count}</span>
					</p>
					<p style="color: red;">7天无理由退货</p>
				</div>
			</li>
			`
			).appendTo('.order-goods');
			arr.push(item.price * item.count);
		})
		console.log(arr);
		var target = arr.reduce((a, b) => a + b);
		console.log(target);
		$('.discount-price').text("￥" + target);
		$('.money').text(target);
	}
});

//默认的收货地址
$.myAjax({
	url: "/address/get_default",
	success: function(data) {
		var dataId = data.id;
		$('.order-address').attr('data-id', dataId);
		// console.log(data)
		$('.order-name').text(data.receiveName);
		$('.order-tel').text(data.receivePhone);
		$('.address').text(data.receiveRegion);


	}
});

//收货地址
$.myAjax({
	url: "/address/list",
	success: function(data) {
		data.forEach(function(item, index) {
			$(
				`
			<li data-id="${item.id}" data-is="${item.isDefault}">
				<div class="checkAll">
					<i class="iconfont icon-Checkcontrol"></i>
				</div>
				<div class="order-information">
					<p class="order-information_item">
						<span class="information_item">
							<span class="name">${item.receiveName}</span>
							<span class="tx">默认</span>
							<span class="tx1">设置默认</span>
						</span>
						<span class="tel">${item.receivePhone}</span>
					</p>
					<div class="site">
						<span class="provinces address1">${item.receiveRegion}</span>
						<span class="site-details address2">${item.receiveDetail}</span>
					</div>
				</div>
				<img class="edit" src="img/修改.png" >
			</li>
			`
			).appendTo('.address-list');
			if (item.isDefault == 1) {
				$('.tx').eq(index).css('display', 'inline-block');
				$('.checkAll').eq(index).addClass('checked');
				// $('.tx1').css('display','none');
			} else {
				$('.tx1').eq(index).css('display', 'inline-block');
			}
		})
	}
});


//checked
$('.address-list').on('click', '.checkAll', function() {
	$(this).addClass('checked');
	//结算的ID
	var dataId = $(this).parent()[0].dataset.id;

	$(this).parent('li').siblings().find('.checkAll').removeClass('checked');
	var Name = $(this).parent('li').find('.name').text();
	var Tel = $(this).parent('li').find('.tel').text();
	var Provinces = $(this).parent('li').find('.provinces').text();
	var addressDetails = $(this).parent('li').find('.site-details').text();
	//改变数据
	$('.order-name').text(Name);
	$('.order-tel').text(Tel);
	$('.address').text(Provinces + addressDetails);
	//重新添加ID
	$('.order-address').attr('data-id', dataId);
	console.log(addressDetails);
	//关闭弹窗
	// $('.pop-up').css('top','100%');

});

//切换
$('.address-list').on('click', '.tx1', function() {
	var Id = $(this).parents('li')[0].dataset.id;

	$(this).stop().hide().siblings().stop().show().parents('li').siblings().find('.tx').stop().hide().siblings().stop().show();
	$.ajax({
		url: `/address/set_default/${Id}`,
		type: "get",
		headers: {
			"Authorization": sessionStorage.getItem("token"),
		},
		success: function(result) {
			if (result.code = 200) {

			} else {
				console.log(result.msg);
			}
		}
	});
});


//弹窗切换

$('.order-address').click(function() {
	$('.pop-up').css('top', '0');
});
$('.pop-up').click(function() {
	$(this).css('top', '100%')
});

//edit
$('.address-list').on('click', '.edit', function() {
	var Id = $(this).parents('li')[0].dataset.id;
	console.log(Id);

	sessionStorage.setItem("name", $(this).parent("li").find('.name').text().trim());
	sessionStorage.setItem("tel", $(this).parent("li").find('.tel').text());
	sessionStorage.setItem("address1", $(this).parent("li").find('.address1').text());
	sessionStorage.setItem("address2", $(this).parent("li").find('.address2').text().trim());


	window.location.href = `/address/addres-edit/edit.html?id=${Id}`;
});

$('.pop-up_footer').click(function() {
	window.location.href = `/address/address-create.html`;
});

//提交订单
$('.order-footer-right').click(function() {
	var arr = [];
	isId.forEach(item => arr.push(Number(item)));
	var account = $('.money').text();
	var Id = document.querySelector('.order-address').dataset.id;
	$.myAjax({
		url: "/order/confirm",
		type: "post",
		data: {
			"ids": arr,
			"account": account,
			"addressId": Id
		},
		success:function (data) {
			console.log(data);
			window.location.href = `/order/pay/pay.html?${data}`;
		}
	});
})

//回退
$(".icon-back1").click(function(){
	history.back();
})