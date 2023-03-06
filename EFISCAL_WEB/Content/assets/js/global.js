// CHECK IE 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// ADJUST SCREEN SIZE
function adjustHeight() {
	var mainNav = $('#mainNav'),
		page = $('html');

	// RESET NAV POSITION
	mainNav.css('bottom','auto');
	page.css('min-height','auto');

	var nav = mainNav.children().innerHeight(),
		main = $('main').innerHeight(),
		header = $('header').innerHeight();


	// DEFINES MIN-HEIGHT BASED ON CONTEXT OR WINDOW
	nav > main ? page.css('min-height',nav+header+15) : page.css('min-height',main);

	$('#mainNav').css('bottom',0);

	// FALLBACK FOR CSS GRID
	isIE ? mainNav.css('top',header) : true;
}


// ON RESIZE WINDOW
$(window).resize(function() {
	// ADJUST SCREEN SIZE
	$(window).width() >= 768 ? adjustHeight() : $('html').css('min-height','auto');

}).resize();