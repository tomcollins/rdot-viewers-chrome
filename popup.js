console.log('HI');

var parent = document.getElementById("orb-banner").parentElement;
var d = document.createElement("div");
d.append('Test div');
//var span = document.createElement("span");
//span.
//parent.append(p);
parent.prepend(d);

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