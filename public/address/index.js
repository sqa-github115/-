$('.address-create').click(function() {
	window.location.href = "/address/address-create.html";
});
$.ajax({
	url: "/address/list",
	type: "get",
	//请求头
	headers: {
		"Authorization": sessionStorage.getItem("token"),
	},
	success: function(result) {
		if (result.data.length === 0) {
			$('.address-hint').css('display', 'flex');
		} else {
			$('.address-hint').css('display', 'none');
			$('.address-box').stop().show();
		}
		result.data.forEach(function(item, index) {
			$(
				`
						<div class="box1" data-is="${item.isDefault}" data-id="${item.id}">
							<div class="address-info">
								<span class="name">${item.receiveName}</span>
								<span class="tel">${item.receivePhone}</span>
							</div>
							<div class="address">
								<span class="address1">${item.receiveRegion}</span>
								<span class="address2">${item.receiveDetail}</span>
							</div>
							<div class="edit"><a href="addres-edit/edit.html?id=${item.id}">
							<img src="img/bianji.png" >
							</a>
								<span class="the-address">设置默认地址</span>
								<span class="the-address1">默认地址</span>
							</div>
						</div>
					`
			).appendTo('.address-box');
			if (item.isDefault) {
				console.log(item.isDefault);
				//index限制寻找
				$('.the-address1').eq(index).css("display", "block");
				// console.log($('.edit .the-address1'));
			} else {
				console.log(123);
				$('.the-address').eq(index).css("display", "block");
				// console.log($('.edit .the-address'));
			}
		});
		//编辑
		$('.edit a').on("click", function() {
			sessionStorage.setItem("name", $(this).parents(".box1").find('.name').text().trim());
			sessionStorage.setItem("tel", $(this).parents(".box1").find('.tel').text());
			sessionStorage.setItem("address1", $(this).parents(".box1").find('.address1').text());
			sessionStorage.setItem("address2", $(this).parents(".box1").find('.address2').text().trim());
		});
	}
});

//地址

// setTimeout(function() {
// 	$('.the-address').on('click', function() {
// 		// console.log(this.parentNode.parentNode.dataset.is);
// 		var id = Number(this.parentNode.parentNode.dataset.id);
// 		console.log(id);
// 		$.ajax({
// 			url: `/address/get_default/id`,
// 			type: "get",
// 			headers: {
// 				"Authorization": sessionStorage.getItem("token"),
// 			},
// 			success: function(result) {
// 				if (result.code = 200) {
// 					window.location.reload;
// 				}
// 			}
// 		});
// 	});
// }, 100)
$('.address-box').on('click', '.the-address', function() {
	$(this).stop().hide().siblings().stop().show().parents('.box1').siblings().find('.the-address1').stop().hide().siblings()
		.stop().show();
	var id = Number(this.parentNode.parentNode.dataset.id);
	console.log(id);
	$.ajax({
		url: `/address/set_default/${id}`,
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

//回退
$('.back').click(function() {
	// history.back(-1);
	window.location.href = "../profile/index.html"
})
