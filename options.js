
var storage = chrome.storage.local;

var cssFlags, isEnabled;

var DEFAULT_CSS_FLAGS = {
  "flagThumbsUp": true,
  "flagAllStickers": false
}

function flagToogle(e) {
  cssFlags[e.target.id] = e.target.checked;
  saveChanges();
}

function enableToogle(e){
  isEnabled = e.target.checked
  saveChanges();
}

loadSettings();

function saveChanges() {
  storage.set({'isEnabled': isEnabled, 'cssFlags': cssFlags}, function() {
  });
}

function loadSettings() {
  storage.get({'isEnabled': true, 'cssFlags': DEFAULT_CSS_FLAGS}, function(items) {

    isEnabled = items.isEnabled;
    document.querySelector('#isEnabled').checked = isEnabled;
    document.querySelector('#isEnabled').addEventListener('change', enableToogle);

    cssFlags = items.cssFlags;
    for (flag in cssFlags){
      var el = document.querySelector('#'+flag);
      el.checked = cssFlags[flag];
      el.addEventListener('change', flagToogle);
    }
  });
}
