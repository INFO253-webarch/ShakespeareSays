chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var tab_url = tabs[0].url;
    console.log(tab_url);
    var urlObj = document.getElementById("url");
    urlObj.innerHTML = tab_url;
});