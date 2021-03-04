var proId = window.location.search.slice(4);

$.ajax({
	url: `http://localhost:3000/cart/total`,
	type: "get",
	headers: {
		"Authorization": sessionStorage.getItem("token"),
		"Content-Type": "application/json"
	},
	success: function(result) {
		if (result.data >= 1) {
			$('.num').text(result.data);
			$('.num').stop().show();
		} else {
			$('.num').stop().hide();
		}
	}
})


setTimeout(function() {
	$.myAjax({
		url: `/product/model/${proId}`,
		success: function(data) {
			// console.log(data.price);
			// console.log(data);
			$(
				`
					<div class="price"><em>￥</em>${data.price}</div>
						<div class="name">
							<span>${data.name}</span>
							<i class="iconfont icon-shoucang"></i>
						</div>
						<div class="abstract">
							${data.brief}
						</div>
					</div>
				`
			).prependTo($('.matter'));
			//图片
			$(`
				<img src="${data.avatar}">
			`).appendTo($('.avatar'));
			//价格
			$(`
				<span class="symbol">￥</span><span>${data.price}</span>
			`).appendTo($('.prc'));

			var bannerImgs = data.bannerImgs.split(',');
			var pic = data.otherImgs.split(',');
			//轮播
			bannerImgs.forEach(function(item) {
				$(`
					<div class="swiper-slide">
						<img src="${item}" alt="">
					</div>
					`).appendTo($(
					'.swiper-wrapper'))
			});
			//pic
			pic.forEach(function(item) {
				$(`
					<img src="${item}" alt="">
					`).appendTo($('.pic'))
			});
			var swiper = new Swiper('.swiper-container', {
				loop: true,
				spaceBetween: 30,
				centeredSlides: true,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false,
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
			});
		}
	})

}, 100)

//滚动
$('.ct').scroll(function() {
	var scrollTop = $('.ct').scrollTop();
	if (scrollTop >= 160) {
		$('.up-list').removeClass('hid');
		$('.up').css('backgroundColor', 'rgb(239, 239, 240)');
	} else {
		$('.up-list').addClass('hid');
		$('.up').css('backgroundColor', 'rgb(239, 239, 240,0)');
	}
})

//回退
$('.icon-back1').click(function() {
	window.history.back();
})


//已选
$('.selected').click(function() {
	$('.pop-up').toggleClass('hid');
	$('.pop-up').animate({
		top: "0",
		zIndex: '999'
	}, 1000, function() {
		$('.pop-up').css({
			background: 'rgba(0, 0, 0, 0.6)',
			transition: '1s'
		});
	})
});
//关闭
$('.icon-guanbi').click(function() {
	$('.pop-up').toggleClass('hid');
	$('.pop-up').animate({
		top: "100%",
		zIndex: '0'
		// background:'rgba(0, 0, 0, 0.1)'
	}, 10, function() {
		$('.pop-up').css({
			background: 'rgba(0, 0, 0, 0)',
			transition: '0s',
		});
	})
})

//--
$('.relief').click(function() {
	var num = Number($('.numbers').text());
	console.log(num);
	num -= 1;
	if (num == 0) {
		layer.open({
			content: '最少1件商品',
			style: 'background-color:#09C1FF; color:#fff; border:none;', //自定风格
			time: 2
		})
		return;
	}
	$('.numbers').text(num);
	$('.number').text(num);
	$('.page-num').text(num);
})

//++
$('.gagarin').click(function() {
	var num = Number($('.numbers').text());
	console.log(num);
	if (num == 5) {
		layer.open({
			content: '最多添加5件商品',
			style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
				,
			time: 2
		});
		return;
	}
	num += 1;
	$('.numbers').text(num);
	$('.number').text(num);
	$('.page-num').text(num);
})



//购物车发ajax
$('.cart-text').click(function() {
	var num = Number($('.numbers').text());
	console.log(num);

	$.ajax({
		url: `/cart/add`,
		type: "post",
		headers: {
			"Authorization": sessionStorage.getItem("token"),
			"Content-Type": "application/json"
		},
		data: JSON.stringify({
			pid: `${proId}`,
			count: `${num}`
		}),
		success: function(result) {
			layer.open({
				content: '添加成功',
				skin: 'msg',
				time: 3 //2秒后自动关闭
			});

		}
	})

	setTimeout(function() {
		$.ajax({
			url: `http://localhost:3000/cart/total`,
			type: "get",
			headers: {
				"Authorization": sessionStorage.getItem("token"),
				"Content-Type": "application/json"
			},
			success: function(result) {
				if (result.data >= 1) {
					$('.num').text(result.data);
					$('.num').stop().show();
				} else {
					$('.num').stop().hide();
				}
			}
		})
	}, 100)
	setTimeout(function() {
		$('.pop-up').toggleClass('hid');
		$('.pop-up').animate({
			top: "100%",
			// background:'rgba(0, 0, 0, 0.1)'
		}, 10, function() {
			$('.pop-up').css({
				background: 'rgba(0, 0, 0, 0)',
				transition: '0s',
			});
		})
	}, 1100)
});

$('.btn-pop').click(function() {
	$('.pop-up').toggleClass('hid');
	$('.pop-up').animate({
		top: "0",
		zIndex: '999'
	}, 1000, function() {
		$('.pop-up').css({
			background: 'rgba(0, 0, 0, 0.6)',
			transition: '1s'
		});
	})
});


// http://localhost:3000/cart/total
