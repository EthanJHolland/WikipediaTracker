//based on https://stackoverflow.com/questions/247483/http-get-request-in-javascript
let serverUrl='#######'; //fill in with desired server address

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
    client.get('http://'+serverUrl+':5000/wikipediatracker', (api_response) => {
        articles=api_response
        for(var i=0; i<articles.length; i++){
            console.log(articles[i])
            client.get('https://en.wikipedia.org/api/rest_v1/page/summary/'+articles[i], (wiki_response) => {
                if(wiki_response.thumbnail){
                    document.getElementById('image'+i).src=wiki_response.thumbnail.source;
                }
                document.getElementById('desc'+i).innerHTML=wiki_response.extract_html;
            });
        }
    });
    // client.get('https://en.wikipedia.org/api/rest_v1/page/summary/G%C3%B6del', (response) => {
    //     // do something with response
    //     console.log(response);
    //     console.log(response.thumbnail);
    //     console.log(response.thumbnail.source);
    //     if(response.thumbnail){
    //         document.getElementById('image1').src=response.thumbnail.source;
    //     }
    //     document.getElementById('desc1').innerHTML=response.extract_html;
    // });
};