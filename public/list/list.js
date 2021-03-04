var proId = location.search.slice(5);

var number = 0;

var flag = true;

var typ = "price";

var data = "asc";

function pull() {
	$.myAjax({
		url: `/product/list`,
		type: 'post',
		data: {
			name: '',
			cid: proId,
			orderCol: typ,
			orderDir: data,
			begin: number,
			pageSize: 6,
		},
		success: function(data) {
			
			var length = data.length
			console.log(length);
			if (length < 6) {
				flag = false;
			}
			data.forEach(function(item) {
				$(
					`<div class="card" data-id="${item.id}">
					<div class="card-left">
						<img src="${item.avatar}" alt="">
					</div>
					<div class="card-right">
						<h3>${item.name}</h3>
						<p><span>销量：</span>${item.sale}</p>
						<p>${item.brief}</p>
						<p class="card-price"><span>￥</span>${item.price}</p>
						<p>${item.rate}人评价</p>
					</div>
				</div>`
				).appendTo($('.cl'))
			})
		}
	});
}
pull()

$('.icon-back').on('click', function() {
	history.back();
});

//排版
$('.icon-category2').click(function() {
	$(this).toggleClass('show').siblings('.icon-listview').toggleClass('show');
	$('.list-content').toggleClass('ctn');
});
$('.icon-listview').click(function() {
	$(this).toggleClass('show').siblings('.icon-category2').toggleClass('show');
	$('.list-content').toggleClass('ctn');
});

//Up
$('.dat').click(function() {
	$('.dat').toggleClass('icon-descend icon-ascending');
	$('.cl').empty();
	number =0;
	trans(data);
});

//价格
$('.price').click(function() {
	number =0;
	$(this).addClass('sty').siblings().removeClass('sty');
	typ = 'price';
	//先开始清空下面的数据 从新拿数据
	$('.cl').empty();
	data = document.querySelector('.icon-ascending') ? "asc" : "desc";
	console.log(data);
	trans();
})

//评论
$('.rate').click(function() {
	number =0;
	$(this).addClass('sty').siblings().removeClass('sty');
	typ = 'rate';
	//先开始清空下面的数据 从新拿数据
	$('.cl').empty();
	data = document.querySelector('.icon-ascending') ? "asc" : "desc";
	console.log(data);
	trans();
})

//销量
$('.sale').click(function() {
	$(this).addClass('sty').siblings().removeClass('sty');
	number =0;
	typ = 'sale';
	//先开始清空下面的数据 从新拿数据
	$('.cl').empty();
	data = document.querySelector('.icon-ascending') ? "asc" : "desc";
	console.log(data);
	trans();
})

//跳转
$('.cl').on('click', '.card', function() {
	 id = this.dataset.id;
	console.log(id);
	window.location.href = `/details/index.html?id=${id}`;
})


//被调用
function trans() {
	console.log();
	$.myAjax({
		url: `/product/list`,
		type: 'post',
		data: {
			name: '',
			cid: proId,
			orderCol: typ,
			orderDir: data,
			begin: number,
			pageSize: 6,
		},
		success: function(data) {
			// $('.list-content').empty().toggleClass('show', data.length > 0);
			// $('.empty').toggleClass('show', data.length === 0);
			console.log(data);
			data.forEach(function(item) {
				$(
					`<div class="card">
		  				<div class="card-left">
		  					<img src="${item.avatar}" alt="">
		  				</div>
						<div class="card-right">
							<h3>${item.name}</h3>
							<p><span>销量：</span>${item.sale}</p>
							<p>${item.brief}</p>
							<p class="card-price"><span>￥</span>${item.price}</p>
							<p>${item.rate}人评价</p>
						</div>
		  			</div>`
				).appendTo($('.cl'))
			})
		}
	});
}

//下拉加载
// var flag = true;
$('.cc').scroll(function() {

	if (flag == false) {
		return;
	}
	if ($('.list-header').find('.icon-category2').hasClass('show')) {
		// $('.cl').empty();
		var List = $('.list-content').outerHeight();
		var Cl = $('.cl').outerHeight();
		var height = eval(Cl - List);
		console.log(height);
		if ($(this).scrollTop() > height) {
			number += 6;
			trans()
		}

	} else {
		console.log(123);
		var List = $('.list-content').outerHeight();
		var Cl = $('.cl').outerHeight();
		var height = eval(Cl - List - 10);
		console.log(height);
		if ($(this).scrollTop() > height) {
			number += 6;
			trans()
		}
	}
});

//220px
