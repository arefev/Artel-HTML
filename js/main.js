// MAIN JavaScript

$(function(){
	$(".menu__item").click(function(){
		var item = $(this).data("menu-item");
		
		if (item) {
			var scrollTop = $(".index-section[data-menu-item=" + item + "]").offset().top;
			$("html, body").animate({ scrollTop: scrollTop });
			return false;
		}
	});
	
});

function lockBody() {
	var scrollTop = $("html").scrollTop();
	if (!scrollTop) scrollTop = $("body").scrollTop(); // IE hack
	
	$("html").addClass("lock-body").data("scrollTop", scrollTop);
}

function unlockBody()
{
	var scrollTop = $("html").data("scrollTop");
	$("html, body").removeClass("lock-body").scrollTop(scrollTop);
}