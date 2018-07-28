//based on https://developer.chrome.com/extensions/background_pages

let serverUrl='#######'; //fill in with desired server address

chrome.webNavigation.onCompleted.addListener((details) => {
    url=details.url;
    topic=url.substring(url.indexOf('/wiki/')+6);

    //make post request with article topic
    var request = new XMLHttpRequest();
    request.open("POST", "http://"+serverUrl+":5000/wikipediatracker", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({article: topic}));
}, {url: [{urlMatches : 'wikipedia\.org/wiki/'}]}); //only trigger function for wikipedia
//for re2 regex examples see https://support.google.com/a/answer/1371417?hl=en