//根据当前窗口的父窗口的location.href的值，判断当前应该是哪个菜单处于激活状态
var reg = /.+\/(.+?)\/index.html$/;
var pageName = window.parent.location.href.match(reg)[1];
console.log($(`li[data-page=${pageName}]`));
$(`li[data-page=${pageName}] i`).addClass('active');
//为菜单绑定点击事件，实现导航跳转
$('li').on('click',function() {
	window.parent.location.href = `/${this.dataset.page}/index.html`;
})