// MAIN JavaScript
var arWaterwheelGallery = [];

$(function(){
	$(".menu__item").click(function(){
		var item = $(this).data("menu-item");
		
		if (item) {
			var scrollTop = $(".index-section[data-menu-item=" + item + "]").offset().top;
			$("html, body").animate({ scrollTop: scrollTop });
			return false;
		}
	});
	
	$("*[data-menu-item]").click(function(){
		var item = $(this).data("menu-item"),
			blockItem = $("*[data-menu-item-block=" + item + "]"),
			scrollTop = blockItem.offset().top;
		
		$(".top-menu__item.active").removeClass("active");
		$(this).parent().addClass("active");
		
		$("html, body").animate({ scrollTop: scrollTop});
		
		return false;
	});
	
	setPositionFooter();
	
	// WATERWEEL GALLERY
	$(".waterwheel-gallery").each(function(index){
		var carousel = $(this).waterwheelCarousel({
			flankingItems: 1,
		});
		
		$(this).data("index", index);
		arWaterwheelGallery.push(carousel);
	});
	
	$(".waterwheel-gallery__arrow").click(function(){
		var parrentIndex = $(this).closest(".waterwheel-gallery").data("index"),
			object = arWaterwheelGallery[parrentIndex];
			
		if ($(this).is(".waterwheel-gallery__arrow_left")) {
			object.prev();
		} else {
			object.next();
		}
	});
});

$(window).resize(function(){

	// WATERWEEL GALLERY
	$(".waterwheel-gallery__item").stop();
	$(".waterwheel-gallery").each(function(index){
		var object = arWaterwheelGallery[index];
		
		object.reload({
			flankingItems: 1
		});
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

function setPositionFooter()
{
	if (!$("body").is(".static-footer")) {
		var footerHeight = $(".footer").height(),
			footerPaddingTop = parseInt($(".footer").css("padding-top")),
			footerPaddingBottom = parseInt($(".footer").css("padding-bottom"));
			
		footerHeight += footerPaddingTop + footerPaddingBottom;
		$(".footer").css("margin-top", -footerHeight);
	}
}