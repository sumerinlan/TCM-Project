$(document).ready(function() {

	var sym_list = [];


	$.getJSON("data/data.json", function(data) {
		$.each(data, function(index, value) {
			sym_list.push(value);
		});

		var input = document.getElementById("search_sym");
		var awesomplete = new Awesomplete(input);
		awesomplete.list = sym_list;
	});
});
