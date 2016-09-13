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
    dynamicNavbar: true
});

myApp.onPageInit('index', function (page) {

// 	createIndexPage();

}).trigger();

// Event page content and settings
function createEventContent(name){ 
	mainView.router.load({
		content:'<div class="page no-toolbar navbar-fixed" data-page="event">'+
				'	<div class="navbar inner-element uib_w_2" data-uib="framework7/header" data-ver="0">'+
				'		<div class="navbar-inner">'+
				'			<div class="left">'+
				'		    	<div class="widget-container content-area horiz-area wrapping-col"></div>'+
				'				<div class="left">'+
				'		 			<a href="#" class="back" data-view=".view-main"> Back </a>'+
				'		        </div>'+
				'            </div>'+
				'	         <div class="center labeltext">Event // dynamic //</div>'+
				'	         <div class="right">'+
				'  	            <div class="widget-container content-area horiz-area wrapping-col"></div>'+
				'	         </div>'+
				'	    </div>'+
				'	</div>'+
				'	<div class="page-content" style="background: url()" >'+
				' 		<p>' + name + '</p>'+
				' 		<p></p>'+
				' 		<p></p>'+
				'	    <div class="content-block cu-bottom cu-no-margin cu-no-padding">'+
				'	    	<div class="row no-gutter">'+
				'	            <div class="col-50 cu-extra-info">' + /* description */ + '</div>'+
				'	            <div class="col-50 cu-maps"></div>'+
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
	console.log('test');
/*
	// init var for function:	
	var image = $(this).find('img').attr('src'); */
	var name = $(this).find('div.item-title').html();
/*	var startDate = $(this).find('p.startDate').html();
	var endDate = $(this).find('p.endDate').html();
	var description = $(this).find('p.desc').html();
*/
	createEventContent(name);	
});


function getJsonData() {
	$.getJSON("http://app.veldhovenviertfeest.nl/json.php?key=lkj23oSDFLKijf9SD823oijslkhv89238WDFK23923", function(json) {
		
		for(var i in json.events) {
			var startDate = moment(json.events[i].timestamp_b * 1000).format("DD-MM-YYYY");
			
		    $$('ul.cu-events').append("<li class='media-item widget uib_w_11 d-margins' data-uib='framework7/media_item' data-ver='0'><a href='#' id='event'> <div class='item-content'><div class='item-media'><img src='" + json.events[i].images[0] + "' height='80'></div><div class='item-inner'><div class='item-title-row'><div class='item-title'>" + json.events[i].name + "</div><div class='item-after'>" + startDate + "</div></div><div class='item-subtitle'>" + json.events[i].location_details.name + "</div><div class='item-text'>" + json.events[i].description + "</div></div></div></a></li>");
		}
	});	
}