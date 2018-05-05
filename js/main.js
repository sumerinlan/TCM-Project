$(document).scroll(function() {
	$(".fixed-top").toggleClass('scrolled', $(this).scrollTop() > $("#home").height());

	// active nav
	$("#navhome").toggleClass('active', $(this).scrollTop() <= $("#home").height());
	$("#navsearch").toggleClass('active', $(this).scrollTop() > $("#home").height() && $(this).scrollTop() <= $("#home").height()  + $("#search").height());
	$("#navreference").toggleClass('active', $(this).scrollTop() > $("#home").height() + $("#search").height());
});
