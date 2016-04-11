
var stickerMap = {
  "flagThumbsUp": 'div[aria-label="  sticker"]._576q { zoom: 0.4; }',
  "flagAllStickers": 'div[aria-label="  sticker"]{ zoom: 0.25; }'
};

var DEFAULT_CSS_FLAGS = {
  "flagThumbsUp": true,
  "flagAllStickers": false
}

var tabsProcessed = {};

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({url: "options.html"});
});

chrome.webNavigation.onCompleted.addListener(function(e) {

      if (tabsProcessed[e.tabId]) {
        return;
      }

      chrome.storage.local.get({'isEnabled': true, 'cssFlags': DEFAULT_CSS_FLAGS}, function(items) {

        if (!items.isEnabled) {
          return;
        }

        var cssToApply = "";

        for (flag in items.cssFlags){
          if (items.cssFlags[flag]) {
            cssToApply += stickerMap[flag]
          }
        }

        if (cssToApply.length === 0) {
          return;
        }

        tabsProcessed[e.tabId] = true;
        chrome.tabs.insertCSS(e.tabId, {
            code: cssToApply
          }, function() {
            if (chrome.runtime.lastError) {
              console.log("Inject CSS ERROR");
            } else {
            }
        });

      });

  }, {url: [{hostContains: 'facebook.com'}]});
