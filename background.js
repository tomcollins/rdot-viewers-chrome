/*chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  alert('bg');
  //console.log('BG', arguments);
  sendResponse({foo: 'bar'});
});
*/

function sendMessage(data) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, data, function(response) {
      ///alert('foo ' + response);//response.farewell);
      console.log('background.sendMessage.response', response);
    });
  });
}

chrome.webRequest.onCompleted.addListener(
  function(details) {
    var vpid;
    //console.log('details.url: ' + details.url);
    //sendMessage({url: details.url});
    if (details.url.indexOf("ess_enriched=true") == -1) {
      if (details.url.indexOf("version_id=") != -1) {
        vpid = details.url.split('version_id=')[1].split('&')[0];
      } else if (details.url.indexOf("service_id=") != -1) {
        vpid = details.url.split('service_id=')[1].split('&')[0];
      }
      if (vpid ) {
        console.log('vpid', vpid);
        sendMessage({vpid: vpid});
      }
    }
    
  },
  {urls: ['*://*.bbc.co.uk/*']}
);

//setTimeout(function(){
//  sendMessage({vpid: 'foo'});  
//}, 10000);

/*
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("background.js got a message")
        console.log(request);
        console.log(sender);
        function 
        sendResponse("bar");

        return true
    }
);
*/
/*
setTimeout(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
      console.log(response.farewell);
    });
  });
}, 3000);
*/






/*
function sendMessage() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
      console.log(response.farewell);
    });
  });
}

chrome.runtime.onMessage.addListener(function() {
  alert("Background script has received a message from contentscript:'");// + request.message + "'");
  sendMessage();
});
*/

/*
chrome.extension.onRequest.addListener(function(request, sender)
{
 alert("Background script has received a message from contentscript:'" + request.message + "'");
 sendMessage(request.message);
});
*/

/*
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {  
    if (info.status && (info.status == "complete")) {
        // The page is loaded, so inject a content script
        sendMessage();
    }
});
*/

//setInterval(sendMessage, 3000);

/*
chrome.runtime.onConnect.addListener(function(port){
  port.postMessage({greeting:"hello"});
});
*/

/*
chrome.webRequest.onCompleted.addListener(
  function(details) {
    var parts, elements;

    console.log('details.url', details.url);
    parts = details.url.split('?')[1].split('&');
    parts.forEach(function(part){
      elements = part.split('=');
      //console.log(elements[0] + ' = ' + elements[1]);
      if (elements[0] === 'name') {
        console.log('Found countername', elements[1]);
      }
    });
  }, {urls: ["*://sa.bbc.co.uk/*"]}
);
*/

/*
document.addEventListener('DOMContentLoaded', function() {


  var greeting = "hola, ";
  var button = document.getElementById("mybutton");
  button.person_name = "Roberto";
  button.addEventListener("click", function() {
    alert(greeting + button.person_name + ".");
  }, false);


  chrome.webRequest.onCompleted.addListener(
    function(details) {
      var parts, elements;
      parts = details.url.split('?')[1].split('&');
      parts.forEach(function(part){
        elements = part.split('=');
        //console.log(elements[0] + ' = ' + elements[1]);
        if (elements[0] === 'name') {
          console.log('Found countername', elements[1]);
        }
      });
    }, {urls: ["*://sa.bbc.co.uk/*"]}
  );
});
*/