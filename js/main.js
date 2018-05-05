$(document).scroll(function() {
	$(".fixed-top").toggleClass('scrolled', $(this).scrollTop() > $("#home").height());

	// active nav
	$("#navhome").toggleClass('active', $(this).scrollTop() <= $("#home").height());
	$("#navsearch").toggleClass('active', $(this).scrollTop() > $("#home").height() && $(this).scrollTop() <= $("#home").height()  + $("#search").height());
	$("#navreference").toggleClass('active', $(this).scrollTop() > $("#home").height() + $("#search").height());
});

function showStuff(element)  {
    var tabContents = document.getElementsByClassName('tabContent');
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }

    // change tabsX into tabs-X in order to find the correct tab content
    var tabContentIdToShow = element.id.replace(/(\d)/g, '-$1');
    document.getElementById(tabContentIdToShow).style.display = 'block';

	document.getElementById("tabs-1").style.borderBottom = "none";
	document.getElementById("tabs-2").style.borderBottom = "none";
	document.getElementById(element.id).style.borderBottom = "thick solid #719b52";
}
