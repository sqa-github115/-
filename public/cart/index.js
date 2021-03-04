// if (sessionStorage.getItem("token")) {
// 	$('.have-data').stop().show().siblings('.no-data').hide();
// } else{
// 	$('.no-data').stop().show().siblings('.have-data').hide();
// }
var isId = [];
if(!sessionStorage.getItem("token")){
				window.location.href="/login/index.html"
			}
$.myAjax({
	url: "http://localhost:3000/cart/list",
	type: "post",
	success: function(data) {
		console.log(data);
		if (data.length === 0) {
			
			$('.no-data-box').css('display', 'block');
			$('.have-data').css('display', 'none');
		} else {
			$('.have-data').css('display', 'block');
			$('.no-data-box').css('display', 'none');
		}
		data.forEach(function(item) {
			console.log(item.name);
			$(
				`
			<li data-id="${item.id}">
				<div class="check checked">
					<i class="iconfont icon-Checkcontrol true"></i>
				</div>
				<div class="goods-print">
					<img src="${item.avatar}" >
				</div>
				<div class="state">
					<p>${item.name}</p>
					<div>
						<em>￥</em><span class="price">${item.price}</span>
						<div class="amount">
							<div class="relief">-</div>
							<div class="numbers">${item.count}</div>
							<div class="gagarin">+</div>
						</div>
					</div>
				</div>
			</li>
			`
			).appendTo('.goods-list');
			isId.push(item.id);
			
		})
		total();
		console.log(isId);
	}
});

//回退
$('.icon-back1').click(function() {
	window.history.back();
});


//add
$('.goods-list').on("click", ".gagarin", function() {
	// console.log($(this).parents('li')[0].dataset.id);
	var pid = $(this).parents('li')[0].dataset.id;

	var num = Number($(this).siblings('.numbers').text());
	console.log(num);
	if (num == 5) {
		layer.open({
			content: '商品最多为5件',
			btn: '确定'
		});
		return;
	}
	num += 1;
	$(this).siblings('.numbers').text(num);
	total();
	add(pid)
});
//减少
$('.goods-list').on("click", ".relief", function() {
	// console.log($(this).parents('li')[0].dataset.id);
	var pid = $(this).parents('li')[0].dataset.id;

	var num = Number($(this).siblings('.numbers').text());
	num -= 1;
	console.log(num);
	if (num == 0) {
		layer.open({
			content: '商品最少为1件',
			btn: '确定'
		});
		return;
	}

	$(this).siblings('.numbers').text(num);
	total()
	reduce(pid);
});


//修改数量
function add(item) {
	$.myAjax({
		url: `http://localhost:3000/cart/increase/${item}`,
		type: "post",
		success: function(data) {

		}
	})
}

function reduce(item) {
	$.myAjax({
		url: `http://localhost:3000/cart/decrease/${item}`,
		type: "post",
		success: function(data) {

		}
	})
}

//选择

//全选
$('.checkAll').click(function() {
	$('.checkAll').toggleClass('checked');

	// console.log($('.goods-list').find('li').find('.check'));
	if ($(this).hasClass('checked')) {
		$('.goods-list li').find('.check').addClass('checked');

	} else {
		$('.goods-list li').find('.check').removeClass('checked');

	}
	total();
})

//单选
$('.goods-list').on('click', '.check', function() {
	var len = $('.goods-list li').find('.check').length;
	$(this).toggleClass('checked');
	if ($('.goods-list li').find('.checked').length == len) {
		$('.checkAll').addClass('checked');
	} else {
		$('.checkAll').removeClass('checked');
	}
	total();
	// console.log($('.goods-list li').find('.check').has('checked'));
});


//价钱 调用
function total() {
	var sum = 0;
	var number = 0;
	//遍历里面的 check 寻找有class值checked的元素为判断条件
	$('.goods-list li .check').each(function(index) {
		if ($(this).hasClass('checked')) {
			var num = Number($(this).siblings('.state').find('.numbers').text());
			var num1 = Number($(this).siblings('.state').find('.price').text());
			// console.log(num);
			// console.log(num1);
			sum += num * num1;
			number += num;
		}
		// console.log(number);
		$('.total').text('￥' + sum);
		$('.settlement span').text(number + '件');
		$('.del span').text(number + '件');
	})
	// console.log($('.goods-list li').find('.check').hasClass('checked'));
}

//删除
$('.edit').click(function() {
	$(this).toggleClass('show').siblings().toggleClass('show');
	$('.settlement').toggleClass('show').siblings().toggleClass('show');
	$('.goods-list li').find('.check').removeClass('checked');
	$('.checkAll').removeClass('checked');
	total()

});

$('.complete').click(function() {
	$(this).toggleClass('show').siblings().toggleClass('show');
	$('.del').toggleClass('show').siblings().toggleClass('show');
	// var len = $('.goods-list li').find('.checked').length;
	// $('.settlement span').text(len + '件');
	total()
});


//删除的单选
$('.goods-list').on('click', '.check', function() {
	
	var id = parseInt($(this).parent()[0].dataset.id);
	console.log(id);
	// var index = $(this).parent().index();
	var index = isId.indexOf(id);
	console.log(index);
	if ($(this).hasClass('checked')) {
		isId.push(id);

	} else {
		isId.splice(index, 1);
		// isId.indexOf(id);
		// console.log(isId.indexOf(id));
	}
	console.log(isId);
});
//删除全选
$('.checkAll').click(function() {
	console.log($('.goods-list li'));
	if ($(this).hasClass('checked')) {
		$('.goods-list li').each(function() {
			// console.log($(this).data('id'));
			isId.push($(this).data('id'))
		})
	} else {
		isId = []
	}
	console.log(isId);
});
//删除
$('.del').click(function() {
	$('.goods-list li:has(div.checked)').remove();
	console.log($('.goods-list li:has(div.checked)'));
	$.myAjax({
		url: "http://localhost:3000/cart/remove",
		type: "post",
		data: {
			ids: isId
		},
		success: function(data) {

		}
	})
});

//结算
$('.settlement').click(function() {
	window.location.href = `/order/index.html?${isId}`;
});
//	var str = idsArr.join('-');
$('.browse').click(function () {
	window.location.href="/category/index.html"
})