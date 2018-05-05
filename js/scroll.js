// scroll smoothly
$(document).on('click', 'a[href^="#"]', function(event) {
	event.preventDefault();
	$('html, body').animate({
		scrollTop: $($.attr(this, 'href')).offset().top
	}, 500);
});

// search button
$("#search-btn").on("click" ,function(){
	scrollToTable();
});

function scrollToTable(speed=500) {
	$('html, body').animate({
		scrollTop: $("#reference").offset().top - $(window).height()//+ $("#search").height() + $(window).height()
	}, speed);
}
