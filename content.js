console.log('content.js');

var containerElement;
var vpid;
var isIPlayer = document.location.pathname.indexOf('/iplayer/') !== -1;

function fetchVpid(vpid, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      //console.log('content.js.fetchVpid - XHR complete');
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.open("GET", 'http://localhost:4000/vpid/' + vpid, true);
  xhr.send();
}

function setupContainerElement() {
  if (!containerElement) {
    var parent = document.getElementById("orb-banner").parentElement;
    containerElement = document.createElement("div");
    parent.prepend(containerElement);
  }
}

function renderVpidIPlayer(data) {
  console.log('renderVpidIPlayer', data);

  var container, div, span;

  function getNoOfClient(data) {
    var noOfClients, time;
    noOfClients = 0;
    if (data.result && data.result.length > 0) {
      data.result.forEach(function(minute){
        //console.log(minute.time +'=' +minute.noOfClients);
        if (minute.noOfClients > 0 && (Number(minute.noOfClients) > noOfClients/2)) {
          time = minute.time;
          noOfClients = Number(minute.noOfClients);
        }
      });
    }
    console.log(time +'=' +noOfClients);
    return {
      time: time,
      noOfClients: noOfClients
    };
  }

  function updateUI(result) {
    //var date = new Date(result.time);
    var age = new Date().getTime() - new Date(result.time).getTime();
    age = Math.floor(age/60000) - 1;
    //console.log('age', Math.floor(age/60000), age);
    span.textContent = result.noOfClients + ' (' + age + ' minutes ago)';
  }

  result = getNoOfClient(data);

  if (result.noOfClients > 0) {
    div = document.createElement("div");
    div.classList.add('insights-live');
    span = document.createElement("span");
    updateUI(result);
    div.append('Current viewers:', span);

    container = document.getElementById('content');
    if (!container) {
      container = document.getElementById('main');
    }
    container.prepend(div);

    setInterval(function(){
      fetchVpid(data.vpid, function(data){
        result = getNoOfClient(data);
        updateUI(result);
      });
    }, 10000);
  }
}

function renderVpid(data) {
  setupContainerElement();
  if (isIPlayer) {
    renderVpidIPlayer(data);
  } else {
    //console.log('renderVpid', data);
    containerElement.append('VPID: ' + data.vpid);
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  //console.log('content.js.onMessage', request);
  if (request && request.vpid && request.vpid != vpid) {
    vpid = request.vpid;
    //console.log('content.js.onMessage - vpid', vpid);
    fetchVpid(vpid, renderVpid);
  }
});
