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

var eventView = myApp.addView('.view-event');

// Callbacks to run specific code for specific pages, for example for About page:
/*
myApp.onPageInit('event', function (page) {
    "use strict";

	console.log('event loaded');

	myApp.hideToolbar();
	
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});
*/

myApp.onPageInit('index', function (page) {

	createIndexPage();

}).trigger();


$$(document).on('pageInit', function (e) {
  
  // Get page data from event data
  var page = e.detail.page;
  
  if (page.name === 'event') {
    // Following code will be executed for page with data-page attribute equal to "event"
    createEventPage();
  }
  
});


function createEventPage() {
  "use strict";
  eventView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a event page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
  return;
}

