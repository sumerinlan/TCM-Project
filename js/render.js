function render_search() {
	sym = $("#search_sym").val();
	render_sym(sym);
}

// render symptom
function render_sym(sym) {
	$("#s_res").html("");
	$("#s_res").append("<p>Based on your symptom <b>" + sym + "</b>, you may have the following diseases:</p>");
	// var dis = {
	// 	"疾病的名字1" : ["对应的症状", "对应的症状", "对应的症状", "对应的症状"],
	// 	"疾病的名字2" : ["对应的症状", "对应的症状", "对应的症状", "对应的症状"],
	// 	"疾病的名字3" : ["对应的症状", "对应的症状", "对应的症状", "对应的症状"],
	// 	"疾病的名字4" : ["对应的症状", "对应的症状", "对应的症状", "对应的症状"],
	// 	"疾病的名字5" : ["对应的症状", "对应的症状", "对应的症状", "对应的症状"],
	// 	"疾病的名字6" : ["对应的症状", "对应的症状", "对应的症状", "对应的症状"],
	// 	"疾病的名字7" : ["对应的症状", "对应的症状", "对应的症状", "对应的症状"]
	// }

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
	var count = 0; // set row count
	$.each(dis, function(key, value) {

		var herbs = "";
		for (j = 0, len = value.length; j < len; j++) {
			herbs = herbs + '<td>' + value[j] + '</td>';
		}

		count = count + 1;
		content = content + '<tr id=' + count + '><td scope="row">' + key + '</td>' + herbs + '</tr>';
	});
	$("#d_res").append(prev + content + after);

	// table show and hide
	var min_fields = 1;
	var max_fields = 7;
	var stepsize = 3;
	var itemsCount = stepsize;
	// console.log("Count: " + itemsCount);
	// hide all tr greater than itemsCount
	var selector = "tr:gt(" + itemsCount + ")";
	$(selector).hide();
	// reset button
	$("#show").show()
	$("#hide").show()
	$("#show").attr("disabled", false);
	$("#hide").attr("disabled", false);

	$("#show").not(':disabled').click(function(e) {
		e.preventDefault();
		itemsCount = Math.min(max_fields, itemsCount + stepsize);
		// show all tr smaller than (itemsCount + 1)
		var selector = "tr:lt(" + (itemsCount + 1) + ")";
		$(selector).show();
		// reset button
		if (itemsCount >= max_fields) {
			$(this).attr("disabled", true);
		}
		$("#hide").attr("disabled", false);
		// console.log("Count: " + itemsCount);

		scrollToTable();
	});

	$("#hide").not(':disabled').click(function(e) {
		e.preventDefault();
		itemsCount = Math.max(min_fields, itemsCount - stepsize);
		// hide all tr greater than itemsCount
		var selector = "tr:gt(" + itemsCount + ")";
		$(selector).hide();
		if (itemsCount <= min_fields) {
			$(this).attr("disabled", true);
		}
		// reset button
		$('#show').attr("disabled", false);
		// console.log("Count: " + itemsCount);

		scrollToTable();
	});
}
