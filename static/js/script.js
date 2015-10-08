$("#url_shortener").submit(function(){

	var short_url = "";

	var shortValue = $("#url_shortener input[name='short_url']").val();

	if (shortValue ===""){
		alert("You didn't enter anything!") /*change to us generating a URL*/
	}
	else {
		if(isNaN(shortValue) === false) {
			alert("Invalid input. You cannot enter in a digit!");
			return false;
		}
		else {
			short_url = shortValue;
		}
	}

	$("#short_url").html(short_url);

	return false;
});
