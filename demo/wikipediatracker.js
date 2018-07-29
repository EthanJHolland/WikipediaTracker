let serverUrl='######'; //fill in with desired server address

//based on https://stackoverflow.com/questions/247483/http-get-request-in-javascript
var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(JSON.parse(anHttpRequest.responseText));
        }

        anHttpRequest.open("GET", aUrl, true);            
        anHttpRequest.send( null );
    }
}

window.onload = ()=>{
    var client = new HttpClient();
    client.get('http://'+serverUrl+':5000/wikipediatracker?n=1', (api_response) => {
        articles=api_response
        for(var i=0; i<articles.length; i++){
            console.log(articles[i])
            client.get('https://en.wikipedia.org/api/rest_v1/page/summary/'+articles[i], (wiki_response) => {
                document.getElementById('title'+i).textContent=wiki_response.title;
                if(wiki_response.thumbnail){
                    document.getElementById('image'+i).src=wiki_response.thumbnail.source;
                }
                document.getElementById('desc'+i).innerHTML=wiki_response.extract_html;
            });
        }
    });
};