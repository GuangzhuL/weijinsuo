"use strict";
$(function() {
    function resize() {
        var windowWidth = $(window).width();
        var isSmallScreen = windowWidth < 768;
        $("#main_ad .carousel-inner .item").each(function(i, item) {
            var $item = $(item);
            var imgSrc = isSmallScreen ? $item.data("image-xs") : $item.data("image-lg");
            $item.css("backgroundImage", 'url("' + imgSrc + '")');
            if (isSmallScreen) {
                $item.html('<img src="' + imgSrc + '" alt=""/>');
            } else {
                $item.empty();
            }
        });
    }
// 后面的trigger("resize")是默认触发一次的意思
$(window).on("resize", resize).trigger("resize");

// 滑动图片
var $carousels = $(".carousel");
var startX,
    endX;
var offset = 50;
// 绑定多个事件
$carousels.on("touchstart", function(e) {
    startX = e.originalEvent.touches[0].clientX;
}).on("touchmove", function(e) {
    endX = e.originalEvent.touches[0].clientX;
}).on("touchend", function(e) {
    // 取正数
    var distance = Math.abs(startX - endX);
    if (distance > offset) {
        $(this).carousel(startX > endX ? "next" : "prev");
    }
})
// 初始化工具，使其生效
$('[data-toggle="tooltip"]').tooltip();

// 控制标签页的标签容器的宽度
var $ulContainer = $(".nav-tabs");
var width = 30;
$ulContainer.children().each(function(index, element) {
    width += element.clientWidth;
});
if (width > $(window).width()) {
    $ulContainer.css("width", width).parent().css("overflow-x", "scroll");
}

// 点击新闻发生变化
var $newsTitle = $(".news-title");
$("#news .nav-pills a").on("click", function(){
    var $this = $(this);
    var title = $this.data("title");
    $newsTitle.text(title);
});


 
})