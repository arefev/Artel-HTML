// Map objects JavaScript

var dataObjects = {
	moscow: {
		image: "images/map-object-marker.png",
		points: {
			"0001": {
				text: "Текст маркера 0001",
				coords: [55.762367, 37.593318]
			},
			"0002": {
				text: "Текст маркера 0002",
				coords: [55.764641, 37.628828]
			}
		},
		center: [55.756361, 37.618762]
	},
	dmitrov: {
		image: "images/map-object-marker.png",
		points: {
			"0003": {
				text: "Текст маркера 0003",
				coords: [56.355716, 37.544153]
			},
			"0004": {
				text: "Текст маркера 0004",
				coords: [56.342684, 37.528017]
			}
		},
		center: [56.342684, 37.528017]
	},
	troick: {
		image: "images/map-object-marker.png",
		points: {
			"0005": {
				text: "Текст маркера 0005",
				coords: [55.481591, 37.307969]
			},
			"0006": {
				text: "Текст маркера 0006",
				coords: [55.493262, 37.311402]
			}
		},
		center: [55.486649, 37.306424]
	}
};

var mapObjects, markers = [];

$(function(){
	
	// Basic options for a simple Google Map
	// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
	var zoom = 13;
	var mapOptions = {
		// How zoomed in you want the map to start at (always required)
		zoom: zoom,
		minZoom: zoom,
		maxZoom: zoom,
		zoomControl: false,
		streetViewControl: false,
		panControl: false,
		mapTypeControl: false,
		scrollwheel: false,

		// The latitude and longitude to center the map (always required)
		center: new google.maps.LatLng(55.739209, 37.645448),

		// How you would like to style the map. 
		// This is where you would paste any style found on Snazzy Maps.
		styles: [{"featureType":"all","elementType":"all","stylers":[{"lightness":"29"},{"invert_lightness":true},{"hue":"#008fff"},{"saturation":"-73"}]},{"featureType":"all","elementType":"labels","stylers":[{"saturation":"-72"}]},{"featureType":"administrative","elementType":"all","stylers":[{"lightness":"32"},{"weight":"0.42"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":"-53"},{"saturation":"-66"}]},{"featureType":"landscape","elementType":"all","stylers":[{"lightness":"-86"},{"gamma":"1.13"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"hue":"#006dff"},{"lightness":"4"},{"gamma":"1.44"},{"saturation":"-67"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"lightness":"5"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"weight":"0.84"},{"gamma":"0.5"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"weight":"0.79"},{"gamma":"0.5"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":"-78"},{"saturation":"-91"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"color":"#ffffff"},{"lightness":"-69"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"lightness":"5"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"lightness":"10"},{"gamma":"1"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"lightness":"10"},{"saturation":"-100"}]},{"featureType":"transit","elementType":"all","stylers":[{"lightness":"-35"}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"saturation":"-97"},{"lightness":"-14"}]}]
	};

	// Get the HTML DOM element that will contain your map 
	// We are using a div with id="map" seen below in the <body>
	var mapElement = document.getElementById('mapObjects');

	// Create the Google Map using our element and options defined above
	mapObjects = new google.maps.Map(mapElement, mapOptions);
	

	showPointsFirstSection();
	
	
	// Click on section
	$(".cities__item").click(function(){
		var section = $(this).data("section");
		
		setMapCenter(section);
		showPoints(section);
		
		$(".cities__item_hidden").removeClass("cities__item_hidden");
		$(this).addClass("cities__item_hidden");
	});
});

function setMapCenter(sectionCode) {
	var coords = dataObjects[sectionCode]["center"];
	mapObjects.setCenter(new google.maps.LatLng(coords[0], coords[1]));
}

function showPointsFirstSection() {
	var sections = [];
	for (var sectionCode in dataObjects) {
		sections.push(sectionCode);
	}
	setMapCenter(sections[0]);
	showPoints(sections[0]);
}

function showPoints(sectionCode) {
	clearMarkers();
	
	var image = dataObjects[sectionCode]["image"];
	
	for (point in dataObjects[sectionCode]["points"]) {
		var points = dataObjects[sectionCode]["points"][point]["coords"],
			text = dataObjects[sectionCode]["points"][point]["text"];
			
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(points[0], points[1]),
			map: mapObjects,
			icon: image,
			ID: point,
			title: text
		});
		
		markers.push(marker);
		
		setMarkerEvents(marker);
	}
	
}

function setMarkerEvents(marker) {
	google.maps.event.addListener(marker, 'click', function() {
		var itemID = marker.get("ID");
		if (itemID) {
			var item = $("#object_" + itemID),
				title = item.data("title");
				
			$.fancybox({
				href : "#object_" + itemID,
				title : title,
				wrapCSS : "object-detail",
				padding: 0,
				helpers:  {
					title : {
						type : 'outside',
						position: 'top'
					}
				}
			});
		}
	});
}

// Sets the map on all markers in the array.
function setAllMap(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

function clearMarkers() {
	setAllMap(null);
}
