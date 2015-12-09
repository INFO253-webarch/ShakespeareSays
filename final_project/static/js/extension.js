chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log('hello')
    var tab_url = tabs[0].url;
    console.log(tab_url);
    var urlObj = document.getElementById("url");
    urlObj.value = tab_url;
    var long_url = tab_url;
    console.log(long_url)
});

$("#url_shortener").submit(function(){    
    return true;
}); 