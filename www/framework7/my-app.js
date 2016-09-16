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

var obj = {};

function getJsonData() {

	$.getJSON("http://app.veldhovenviertfeest.nl/json.php?key=lkj23oSDFLKijf9SD823oijslkhv89238WDFK23923", function(json) {
		

		for(var i in json.events) {
				
				
						
			var startDate = moment(json.events[i].timestamp_b * 1000).format("DD-MM-YYYY");
			var endDate = moment(json.events[i].timestamp_e * 1000).format("DD-MM-YYYY");

			var startTime = moment(json.events[i].timestamp_b * 1000).format("HH:MM");
			var endTime = moment(json.events[i].timestamp_e * 1000).format("HH:MM");
			
			obj[i] = { 
				"ID" : json.events[i].id,
				"name" : json.events[i].name,
				"multiple_days" : json.events[i].multiple_days,
				"timestamp_b" : json.events[i].timestamp_b,
				"timestamp_e" : json.events[i].timestamp_e,
				"endtime" : json.events[i].endtime,
				"description" : json.events[i].description,
				"facebook" : json.events[i].facebook,
				"location_name" : json.events[i].location_details.name,
				"location_address" : json.events[i].location_details.address,
				"location_zipcode" : json.events[i].location_details.zipcode,
				"location_place" : json.events[i].location_details.place,
				"image" : json.events[i].images[0],
				"ticket_option" : json.events[i].ticket_option,
/*
				"ticket_info" : { 
					"early" : json.events[i].ticket_info.tp_early,
					"regular" : json.events[i].ticket_info.tp_regular,
					"door" : json.events[i].ticket_info.tp_door
				}
*/
			};
			
		    $$('ul.cu-events').append("<li data-id='" + json.events[i].id + "' class='media-item widget uib_w_11 d-margins' data-uib='framework7/media_item' data-ver='0'><a href='#' id='event'><div class='item-content'><div class='item-media'><img src='" + json.events[i].images[0] + "' height='80'></div><div class='item-inner'><div class='item-title-row'><div class='item-title'>" + json.events[i].name + "</div><div class='item-after'>" + startDate + "</div></div><div class='item-subtitle'>" + json.events[i].location_details.name + "</div><div class='item-text'>" + json.events[i].description + "</div></div></div></a></li>");
		    
		}

		
	});	

}
			
var dataObject = getJsonData();

// Event page content and settings
function createEventContent(name, image, description, location_name){ 
	
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
				'		 			<a href="#" class="link back" data-view=".view-main">'+
				'						<i class="icon icon-back"></i>'+
				'						<span>Back</span>'+
				'					</a>'+
				'		        </div>'+
				'            </div>'+
				'			 <div class="center labeltext">' + name  + '</div>' +
				'	         <div class="right">'+
				'  	            <div class="widget-container content-area horiz-area wrapping-col"></div>'+
				'	         </div>'+
				'	    </div>'+
				'	</div>'+
				'	<div class="page-content bg-img" style="background: url('+  image  +') no-repeat center center fixed; background-size: cover;" >'+
				'	    <div class="content-block cu-bottom cu-no-margin cu-no-padding">'+
				'			<div class="row no-gutter">'+
				'				<div class="col-50 cu-short-info">'+
				' 					<ul>'+
				'						<li class="listHeader">' +  location_name  + '</li>'+				
				'						<li>Tijd</li>'+				
				'						<li>Entree</li>'+				
				'						<li>Aanwezigheid</li>'+				
				'					</ul>'+					
				'				</div>'+
				'				<div class="col-50 cu-friends-info">' +
				'					<ul>'+
				'						<li class="listHeader">Vrienden</li>'+				
				'						<li>Aanwezig</li>'+	
				'						<li>Voeg foto toe</li>'+			
				'					</ul>'+
				'					<a class="button widget uib_w_8" data-uib="framework7/button" data-ver="0" onclick="capturePhoto(\'.uib_w_8 img\')"><i class="icon icon-camera"></i></a>' +
				'				</div>'+
				'			</div>'+	
				'	    	<div class="row no-gutter">'+
				'				<div class="col-50"></div>'+
				'	            <div class="col-50 cu-extra-info" >' +  description  + '</div>'+
				'	            <div class="col-50 cu-maps" style="padding: 0px" ><div id="map_canvas" width="100%" height="100%"></div></div>'+
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

	var id = $(this).parents('.media-item').attr('data-id');

	// get the event data from object
	for (var key in dataObject){
		
	 	var obj = dataObject[key];
	 	for(var prop in obj){
		 	
		 	if(obj[prop] === id){
			 	
// 			 	console.log(prop + " = " + obj[prop]);

				// init for function and further use of data. 
	 			var image = obj.image;
	 			var name = obj.name;
	 			var description = obj.description;
	 			var location_address = obj.location_address;
	 			var place = obj.location_place;
	 			var location_name = obj.location_name;
// 	 			console.log(location_address);
		 	}
	 	}
	 	
	}

	createEventContent( name, image, description, location_name );	
	
	
	// function for read more text
	// @ if: check content length
/*
	$(function(){
		
		var max_length = 80;
		var cuExtraInfo = $$('.cu-extra-info');


		if(cuExtraInfo.html().length > max_length){ 
					
			// split content in two parts
			var short_content 	= cuExtraInfo.html().substr(0,max_length); 
			var long_content	= cuExtraInfo.html().substr(max_length);
			
			// create the read more button
			cuExtraInfo.html(
// 				"<div class='content-block'>"+
					"<div class='row no-gutter'>"+
						"<div class='col-75'><h3>Extra info</h3></div>"+
						"<a href='#' class='close close-popup'><div class='col-25'>Sluit</div></a>"+
					"</div>"+
					"<p>"+short_content+"...</p><a href='#' class='read_more'>Read More</a>"+
					"<span class='more_text' style='display:none; opacity:0'>"+long_content+"</span>"
// 				"</div>"
			); 
						 
			// find a.read_more and show other part of content.
			// - hide read more btn
			// - show other part of content
			cuExtraInfo.find('a.read_more').click(function(event){ 
 
				event.preventDefault(); 
				$(this).hide(); 
				$(this).parents('.cu-extra-info').addClass('active');
				$(this).parents('.cu-extra-info').find('.more_text').addClass('on');
				$(this).parents('.cu-extra-info').find('.close').css({'display':'block'});
				
// 				$('.cu-maps, .cu-short-info, .cu-friends-info, .bg-img:before').addClass('cu-fixed');
// 				$(this).parents('.cu-extra-info').find('.more_text').(); 
			
			});			
			
			cuExtraInfo.find('a.close').click(function(event){
				
				$(this).parents('.cu-extra-info').removeClass('active');
				$('.more_text').removeClass('on');
				$(this).css({'display':'none'});
				$('a.read_more').show();
			});
		}
		
	});

	var location = location_address + " " + place;
	// execute maps
	mapReady(location);

	$('.cu-maps').click(location, function(){
		location = location.split(" ").join('+');
		window.location.href = "http://maps.apple.com/?daddr="+location;
	});
	
*/
	
});



// setup maps 
function mapReady(location){
	
	// Map functionality
// 	navigator.geolocation.getCurrentPosition(onSuccess, onError, {maximumAge:300000, timeout:5000, enableHighAccuracy: true});
	
// 	function onSuccess(location_address){
		
		// own location
/*
		lat = position.coords.latitude;
		lng = position.coords.longitude;
*/

	// party location
	var geocoder = new google.maps.Geocoder();


	geocoder.geocode({'address':location}, function(results, status){
				
		if(status == google.maps.GeocoderStatus.OK){
			var lat = results[0].geometry.location.lat();
			var lng = results[0].geometry.location.lng();
			initialize(lat, lng);
		}else{

		}
		
	});		

		
// 	}


	function onError(error){
		myApp.alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}
	
	// map initializer function
	function initialize(lat, lng){

		var mapOptions = {
		    zoom: 11,
		    center: new google.maps.LatLng(lat, lng),
// 		    center: new google.maps.LatLng(51.45174939038716, 5.482397856522782),
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
    


/***************************************
*
*	Picture upload
*
***************************************/

var pictureSource;   // picture source
var destinationType; // sets the format of returned value
 
document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}
 
function clearCache() {
    navigator.camera.cleanup();
}
 
var retries = 0;
function onCapturePhoto(fileURI) {
    var win = function (r) {
        clearCache();
        retries = 0;
        alert('Done!');
    }
 
    var fail = function (error) {
        if (retries == 0) {
            retries ++
            setTimeout(function() {
                onCapturePhoto(fileURI)
            }, 1000)
        } else {
            retries = 0;
            clearCache();
            alert('Ups. Something wrong happens!');
        }
    }
    
    var params = {};
    params.eventId = 22;
 
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.params = params; // if we need to send parameters to the server request
    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI("http://app.veldhovenviertfeest.nl/photo/upload.php"), win, fail, options);
}
 
function capturePhoto() {
    navigator.camera.getPicture(onCapturePhoto, onFail, {
        quality: 40,
        correctOrientation: true,
        destinationType: destinationType.FILE_URI
    });
}
 
function onFail(message) {
    alert('Failed because: ' + message);
}
