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
	else{
		var re = /^[A-Za-z]+$/;
		
		if((re.test(shortValue) === false) && (shortValue != "")) {
			alert("Invalid input in Short URL! You should either enter letters or leave it blank to auto-generate a short URL.");
			return false;
		}
		else {
			short_url = shortValue;     
		}
	}
	
	return true;
});
	