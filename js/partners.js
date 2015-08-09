// Partners JavaScript

$(function(){
	var partnersDebugFlag = false;
	
	$(".partners__item").click(function(e){
		if (!$(this).is(".base"))
		{
			var baseItem = $(".partners__item.base"),
				baseItemLeft = baseItem.offset().left,
				activeItem = $(this),
				activeItemLeft = activeItem.offset().left,
				activeItemIndex = activeItem.index();
				
			if (baseItem.is(".opened")) {
				closeBaseItem();
				
			} else {
			
				setItemsDataLeft();
				setItemsAbsolute();
				
				activeItem.animate({
					position: "absolute",
					left: baseItemLeft
				});
				
				baseItem.animate({
					position: "absolute",
					left: activeItemLeft
				}, function(){
					
					if (activeItemIndex == 0) {
						activeItem.insertAfter($(".partners__item").eq(1));
					} else {
						baseItem.insertAfter($(".partners__item").eq(activeItemIndex));
						activeItem.insertAfter($(".partners__item").eq(0));
					}
					
					baseItem.removeClass("base");
					activeItem.addClass("base");
					
					openBaseItem();
				});
			}
		} else if (!$(this).is(".opened")) {
			setItemsDataLeft();
			setItemsAbsolute();
			openBaseItem();
		}
	});
	
	// setItemsDataLeft();
	// setItemsAbsolute();
	// openBaseItem();
	
	$(".partners").on("click", ".partners__item__close", function(){
		closeBaseItem();
	});
	
	function setItemsDataLeft() {
		$(".partners__item").each(function(){
			var left = $(this).offset().left;
			$(this).data("left", left);
		});
	}
	
	function setItemsAbsolute() {
		$(".partners__item").each(function(){
			var left = $(this).data("left");
			$(this).css({
				position: "absolute",
				left: left
			});
		});
	}
	
	function setItemsRelative() {
		$(".partners__item").each(function(){
			$(this).css({
				position: "relative",
				left: 0
			});
		});
		
		// debug
		partnersDebug("setItemsRelative");
	}
	
	function hideNextItems() {
		$(".partners__item.base").nextAll(".partners__item").hide();
	}
	
	function showNextItems() {
		$(".partners__item.base").nextAll(".partners__item").show();
	}
	
	function setItemBaseLogoLeft(clear) {
		var itemBase = $(".partners__item.base"),
			itemBaseLeft = itemBase.offset().left,
			logo = itemBase.find(".partners__item__text__logo"),
			logoLeft = logo.find("img").offset().left;
			
		if (!clear) {
			logoLeft = logoLeft - itemBaseLeft;
		} else {
			logoLeft = 0;
		}
		
		logo.css({
			marginLeft: logoLeft
		});
	}
	
	function showItemBaseDetailText() {
		var itemBase = $(".partners__item.base"),
			detailText = itemBase.find(".partners__item__detail-text");
		
		detailText.show();
		detailText.mCustomScrollbar({
			callbacks:{
				onInit:function(){
					$(this).prepend('<div class="partners__item__close"></div>');
				}
			}
		});
		detailText.addClass("slideLeft");
	}
	
	function hideItemBaseDetailText() {
		var itemBase = $(".partners__item.base"),
			detailText = itemBase.find(".partners__item__detail-text");
			
		detailText.hide().removeClass("slideLeft");
	}
	
	function recountItemBasePaddingLeft() {
		var itemBase = $(".partners__item.base"),
			itemFirst = $(".partners__item").eq(0),
			itemFirstWidth = itemFirst.width(),
			parentPartners = itemBase.closest(".partners");
			
		if (itemBase.is(".opened")) {
			itemBase.css("padding-left", itemFirstWidth);
		}
	}
	
	function openBaseItem() {
		var itemBase = $(".partners__item.base"),
			itemFirst = $(".partners__item").eq(0),
			itemFirstWidth = itemFirst.width(),
			parentPartners = itemBase.closest(".partners");
			
		setItemsDataLeft();
		setItemBaseLogoLeft(false);
		
		itemBase.animate({
			width: "100%",
			left: 0,
			paddingLeft: itemFirstWidth,
			position: "absolute"
		}, function(){
			hideNextItems();
			showItemBaseDetailText();
		}).addClass("opened");
		
		parentPartners.addClass("base-item-opened");
		
		// debug
		partnersDebug("openBaseItem");
	}
	
	function closeBaseItem() {
		var itemBase = $(".partners__item.base"),
			itemBaseLeft = itemBase.data("left"),
			itemBasePaddingLeft = parseInt(itemBase.css("padding-left")),
			itemBaseWidth = itemBase.width(),
			parentPartners = itemBase.closest(".partners");
		
		hideItemBaseDetailText();
		
		itemBase.css({
			paddingLeft: 0,
			left: itemBaseLeft,
			width: itemBaseWidth
		}).animate({
			width: "25%"
		}, function(){
			setItemsRelative();
			setItemBaseLogoLeft(true);
			itemBase.removeClass("opened");
		});
		
		showNextItems();
		parentPartners.removeClass("base-item-opened");
		
		// debug
		partnersDebug("closeBaseItem");
	}
	
	function partnersDebug(text) {
		if (partnersDebugFlag)
			console.log(text);
	}
	
	$(window).resize(function(){
		recountItemBasePaddingLeft();
	});
});