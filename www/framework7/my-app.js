/*global Framework7, Dom7 */
// Initialize your app
var myApp = new Framework7({
	
	//app settings
	
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    domCache: true
});

myApp.onPageInit('index', function (page) {

// 	createIndexPage();

}).trigger();

// Event page content and settings
function createEventContent(name, image, description){ 
	
	// check if name exists
	if(name == null){
		name = "Nederland Viert Feest";
	}
	
	mainView.router.load({
		content:'<div class="page no-toolbar navbar-fixed" data-page="event">'+
				'	<div class="navbar inner-element uib_w_2" data-uib="framework7/header" data-ver="0">'+
				'		<div class="navbar-inner">'+
				'			<div class="left">'+
				'		    	<div class="widget-container content-area horiz-area wrapping-col"></div>'+
				'				<div class="left">'+
				'		 			<a href="#" class="back" data-view=".view-main"> Back </a>'+
				'		        </div>'+
				'            </div>' +
				'			 <div class="center labeltext">' + name + '</div>' +
				'	         <div class="right">'+
				'  	            <div class="widget-container content-area horiz-area wrapping-col"></div>'+
				'	         </div>'+
				'	    </div>'+
				'	</div>'+
				'	<div class="page-content bg-img" style="background: url('+ image +') no-repeat center center fixed; background-size: cover;" >'+
				'	    <div class="content-block cu-bottom cu-no-margin cu-no-padding">'+
				'			<div class="row no-gutter">'+
				'				<div class="col-50 cu-short-info">'+
				' 					<ul>'+
				'						<li class="listHeader">Locatie</li>'+				
				'						<li>Tijd</li>'+				
				'						<li>Entree</li>'+				
				'						<li>Aanwezigheid</li>'+				
				'					</ul>'+					
				'				</div>'+
				'				<div class="col-50 cu-friends-info"></div>'+
				'			</div>'+	
				'	    	<div class="row no-gutter">'+
				'	            <div class="col-50 cu-extra-info" >' + description + '</div>'+
				'	            <div class="col-50 cu-maps" ><div id="map_canvas" style="padding: 0;"></div></div>'+
				'	      	</div>'+
				'	    </div>'+
				'	</div>'+
				'</div>',
		animatePages: true
	});
	return;	
};


$$(document.body).on('click', '#event',function(e){
	e.preventDefault();
	
	// init var for function:	
	var image = $(this).find('img').attr('src');
	var name = $(this).find('div.item-title').html();
// 	var startDate = $(this).find('p.startDate').html();
// 	var endDate = $(this).find('p.endDate').html();
	var description = $(this).find('div.item-text').html();

	createEventContent(name, image, description);	
	
	
	// function for read more text
	// @ if: check content length
	$(function(){
		
		var max_length = 150;
		var cuExtraInfo = $$('.cu-extra-info');


		if(cuExtraInfo.html().length > max_length){ 
					
			// split content in two parts
			var short_content 	= cuExtraInfo.html().substr(0,max_length); 
			var long_content	= cuExtraInfo.html().substr(max_length);
			
			// create the read more button
			cuExtraInfo.html(short_content+ 
						 '<a href="#" class="read_more"><br/>Read More</a>'+
						 '<span class="more_text" style="display:none;">'+long_content+'</span>'); 
						 
			// find a.read_more and show other part of content.
			// - hide read more btn
			// - show other part of content
			cuExtraInfo.find('a.read_more').click(function(event){ 
 
				event.preventDefault(); 
				$(this).hide(); 
				$(this).parents('.cu-extra-info').find('.more_text').show(); 
		 
			});			
		}
		
	});

	// execute maps
	mapReady();

});


// setup maps 
function mapReady(){
	
	// Map functionality
/* 	document.addEventListener("deviceReady", onDeviceReady, false); */

// 	function onDeviceReady(){
// 		(succes function, error function, options{cached location between now and 5 min. old., time to search available position, using GPS chip})
		navigator.geolocation.getCurrentPosition(onSuccess, onError, {maximumAge:300000, timeout:5000, enableHighAccuracy: true});
// 	}

	
	function onSuccess(position){
		lat = position.coords.latitude;
		lng = position.coords.longitude;
// 		myApp.alert("getpos: " + lat + ", " + lng);
		initialize(lat, lng);
	}


	function onError(error){
		myApp.alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}
	
	// map initializer function
	function initialize(lat, lng){
		
		var mapOptions = {
		    zoom: 11,
		    center: new google.maps.LatLng(lat, lng),
		    mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		var map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
		
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng),
			animation: google.maps.Animation.DROP
		});
		marker.setMap(map);
		
	}
	
}


	     
/* 	    google.maps.event.addDomListener(window, 'load', initialize); */

function getJsonData() {
	$.getJSON("http://app.veldhovenviertfeest.nl/json.php?key=lkj23oSDFLKijf9SD823oijslkhv89238WDFK23923", function(json) {
		
		for(var i in json.events) {
			var startDate = moment(json.events[i].timestamp_b * 1000).format("DD-MM-YYYY");
			
		    $$('ul.cu-events').append("<li class='media-item widget uib_w_11 d-margins' data-uib='framework7/media_item' data-ver='0'><a href='#' id='event'> <div class='item-content'><div class='item-media'><img src='" + json.events[i].images[0] + "' height='80'></div><div class='item-inner'><div class='item-title-row'><div class='item-title'>" + json.events[i].name + "</div><div class='item-after'>" + startDate + "</div></div><div class='item-subtitle'>" + json.events[i].location_details.name + "</div><div class='item-text'>" + json.events[i].description + "</div></div></div></a></li>");
		}
	});	
}

		
