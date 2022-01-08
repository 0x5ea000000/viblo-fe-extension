var s = document.createElement("script");
s.src = chrome.runtime.getURL("script.js");
s.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

chrome.cookies.getAll({ url: "https://learn.viblo.asia" }, (cookies) => {
  console.log(cookies);
});
