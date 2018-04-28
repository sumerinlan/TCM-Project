// render symptom
function render_sym(sym) {
	$("#s_res").html("");
	$("#s_res").append("<p>Based on your symptom <b>" + sym + "</b>, you may have the following diseases:</p>");
	var dis = {
		"疾病的名字1" : ["对应的症状", "对应的症状", "对应的症状", "对应的症状"],
		"疾病的名字2" : ["对应的症状", "对应的症状", "对应的症状", "对应的症状"],
		"疾病的名字3" : ["对应的症状", "对应的症状", "对应的症状", "对应的症状"],
		"疾病的名字4" : ["对应的症状", "对应的症状", "对应的症状", "对应的症状"],
		"疾病的名字5" : ["对应的症状", "对应的症状", "对应的症状", "对应的症状"],
		"疾病的名字6" : ["对应的症状", "对应的症状", "对应的症状", "对应的症状"],
		"疾病的名字7" : ["对应的症状", "对应的症状", "对应的症状", "对应的症状"]
	}
	render_dis(dis);
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
	$.each(dis, function(index, value) {
		console.log(index);
		var herbs = "";
		for (j = 0, len = value.length; j < len; j ++) {
			herbs = herbs + '<td>' + value[j] + '</td>';
		}
		content = content + '<tr><td scope="row">' + index + '</td>' + herbs + '</tr>';
	});
	$("#d_res").append(prev + content + after);
}
