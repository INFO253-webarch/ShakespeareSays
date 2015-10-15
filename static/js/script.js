$("#url_shortener").submit(function(){

	var long_url = "";
	var longValue = $("#url_shortener input[name='long_url']").val();

	var short_url = "";
	var shortValue = $("#url_shortener input[name='short_url']").val();


/* Checks long url field. If it's empty, doesn't reload the page and gives an alert*/
	if (longValue ===""){				
		alert("You didn't enter a URL to be shortened!") /*change to us generating a URL*/
		return false;
	}

/* Checks short URL. If blank, generates one. If not a digit AND not an empty string, proceeds */
	else {
		if((isNaN(shortValue) === false) && (shortValue != "")) {
			alert("Invalid input. You cannot enter in a digit!");
			return false;
		}
		else {
			short_url = shortValue;     
		}
	}

	
	return true;
});
