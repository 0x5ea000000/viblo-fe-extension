var s = document.createElement("script");
s.src = chrome.runtime.getURL("script.js");
s.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);


var v = document.createElement("script");
v.src = chrome.runtime.getURL('fe-question-full-vi.js');
v.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(v);


var e = document.createElement("script");
e.src = chrome.runtime.getURL('fe-question-full-en.js');
e.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(e);
