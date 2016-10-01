"use strict";
var headers=[];
var currentHeader={};

function changeHeader(index){
  currentHeader=headers[index];
  if(currentHeader){
    chrome.browserAction.setTitle({title: currentHeader.server});
    chrome.browserAction.setBadgeText({text: currentHeader.server});
  }else{
    currentHeader={};
  }
}

chrome.webRequest.onCompleted.addListener(
  function(e){
    if(e.url.startsWith("chrome-extension://"))return;
   var header=e.statusLine;
    var server="";
    for (var i = 0; i < e.responseHeaders.length; i++) {
      header+="\n"+e.responseHeaders[i].name+": "+e.responseHeaders[i].value;
      if (e.responseHeaders[i].name.toLowerCase()=="server") {
        server=e.responseHeaders[i].value;
      };
    };
    headers[e.tabId]={"header":header,"server":server,"ip":e.ip,"url":e.url};
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      if(tabs[0].id==e.tabId){
        changeHeader(e.tabId);
      }
    });
  },
  {
  urls: ["<all_urls>"],
  types: ["main_frame"]
  },
  ["responseHeaders"]
);

 chrome.tabs.onActivated.addListener(function(tab){
  changeHeader(tab.tabId);
 }) 
