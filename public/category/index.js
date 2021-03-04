$('ul.list-main').on('click', function(e) {
	var li = e.target.tagName === "LI" ? e.target : e.target.parentNode;
	console.log(li.dataset.avatar);

	if ($(li).hasClass('active')) return;
	$('li span').removeClass('active');
	$(li).find('span').addClass('active');
	$('img.avatar').attr('src', li.dataset.avatar);
	//二级分类
	// $.ajax({
	// 	url: `/category/list/${li.dataset.id}`,
	// 	type: 'get',
	// 	success: function(result) {
	// 		console.log(result);
	// 		if (result.code === 200) {
	// 			$('ul.list-sub').empty().toggleClass('show', result.data.length > 0);
	// 			$('p.empty').toggleClass('show', result.data.length === 0);
	// 			result.data.forEach(function(item) {
	// 				$(
	// 					`<li>
	// 						<a href ="/list/index.html?=cid=${item.id}">
	// 							<img src="${item.avatar}" />
	// 							<span>${item.name}</span>
	// 						</a>
	// 					</li>`
	// 				).appendTo('ul.list-sub');
	// 			})
	// 		}
	// 	}
	// })
	$.myAjax({
		url: `/category/list/${li.dataset.id}`,
		success: function(data) {
			$('ul.list-sub').empty().toggleClass('show', data.length > 0);
			$('p.empty').toggleClass('show', data.length === 0);
			data.forEach(function(item) {
				$(
					`<li>
							<a href ="/list/list.html?cid=${item.id}">
								<img src="${item.avatar}" />
								<span>${item.name}</span>
							</a>
					</li>`
				).appendTo('ul.list-sub');
			})
		}
	});
});

//发送ajax请求一级分类的数据
// $.ajax({
// 	url: "/category/list/0",
// 	type: "get",
// 	success: function(result) {
// 		//把回来的数据拼成多个li放在ul.list-main中
// 		if (result.code === 200) {
// 			result.data.forEach(function(item) {
// 				$('ul.list-sub').empty().toggleClass('show', result.data.length > 0);
// 				$('p.empty').toggleClass('show', result.data.length === 0);
// 				$(`<li data-id="${item.id}" data-avatar="${item.avatar}">
// 				<span>${item.name}</span>
// 				</li>`).appendTo(
// 					'ul.list-main');
// 			});
// 			$('ul.list-main li').eq(0).trigger('click');
// 		}
// 	}
// });
$.myAjax({
	url: "/category/list/0",
	success: function(data) {
		console.log(data);
		data.forEach(function(item) {
			$('ul.list-sub').empty().toggleClass('show', data.length > 0);
			$('p.empty').toggleClass('show', data.length === 0);
			$(`<li data-id="${item.id}" data-avatar="${item.avatar}">
			<span>${item.name}</span>
			</li>`).appendTo(
				'ul.list-main');
		});
		$('ul.list-main li').eq(0).trigger('click');
	}
});
