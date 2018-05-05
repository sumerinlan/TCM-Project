function render_search() {
	sym = $("#search_sym").val();
	if (sym != "") {
		$("#show").css('display', 'inline-block');
		$("#hide").css('display', 'inline-block');
		render_sym(sym);
	}
	else {
		$("#show").css('display', 'none');
		$("#hide").css('display', 'none');
		$("#s_res").html("");
		$("#d_res").html("");
	}
	$('html, body').animate({
		scrollTop: $('#show').offset().top - $(window).height() / 2
	}, 500);
}

// render symptom
function render_sym(sym) {
	$("#s_res").html("");
	$("#s_res").append("<p>Based on your symptom <b>" + sym + "</b>, you may have the following diseases:</p>");

	$.ajax({
		url: "https://api.myjson.com/bins/1g0d33",
		contentType: "application/json; charset=UTF-8",
		dataType: "JSON",
		type: "GET",
		success: function(response) {
			render_dis(response);
		}
	});
}

function render_dis(dis) {
	$("#d_res").html("");
	var prev = `
	<table class="table">
		<thead>
			<tr>
				<th scope="col">Diseases</th>
				<th scope="col">Herbs</th>
				<th scope="col"></th>
				<th scope="col"></th>
				<th scope="col"></th>
			</tr>
		</thead>
		<tbody>
	`;
	var after = `</tbody></table>`

	var content = "";
	$.each(dis, function(key, value) {

		var herbs = "";
		for (j = 0, len = value.length; j < len; j++) {
			herbs = herbs + '<td>' + value[j] + '</td>';
		}

		content = content + '<tr><td scope="row">' + key + '</td>' + herbs + '</tr>';
	});
	$("#d_res").append(prev + content + after);

	var min_fields = 1;
	var max_fields = 7;
	var stepsize = 3;
	var itemsCount = stepsize;

	//hide all tr greater than page length
	var selector = "tr:gt(" + itemsCount + ")";
	$(selector).hide();

	$("#show").not(':disabled').click(function(e) {
		e.preventDefault();
		itemsCount = Math.min(max_fields, itemsCount + stepsize);
		if (itemsCount >= max_fields) {
			$(this).attr("disabled", true);
		}
		var selector = "tr:lt(" + (itemsCount + 1) + ")";
		$(selector).show();
		$("#hide").attr("disabled", false);
		// move
		$('html, body').animate({
			scrollTop: $(this).offset().top - $(window).height() / 2
		}, 500);
	});

	$("#hide").not(':disabled').click(function(e) {
		e.preventDefault();
		itemsCount = Math.max(min_fields, itemsCount - stepsize);
		if (itemsCount <= 0) {
			$(this).attr("disabled", true);
		}
		var selector = "tr:gt(" + itemsCount + ")";
		$(selector).hide();
		$('#show').attr("disabled", false);
		// move
		$('html, body').animate({
			scrollTop: $(this).offset().top - $(window).height() / 2
		}, 500);
	});
}
