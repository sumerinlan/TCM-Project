
$(document).scroll(function() {
	var $nav = $(".fixed-top");
	$nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());

	var $navbar = $("#navigation");
	$navbar.toggleClass('scrolled', $(".fixed-top").scrollTop() > $(".fixed-top").height());

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
