var urlPatterns = [
    "*://*.technologyreview.com/*",
    "*://*.nytimes.com/*",
    "*://*.washingtonpost.com/*",
    "*://*.medium.com/*",
];

var urlPatternsNames = [
    "technologyreview",
    "nytimes",
    "washingtonpost",
    "medium"
];

function removeAllCookies(currTabDomain) {

    if (!chrome.cookies) {
        chrome.cookies = chrome.experimental.cookies;
    }

    var removeCookie = function(cookie) {
        var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
        chrome.cookies.remove({
            url,
            "name": cookie.name
        });
    };

    chrome.cookies.getAll({
        domain: currTabDomain
    }, function(allCookies) {
        var count = allCookies.length;
        // console.log(count);
        for (var i = 0; i < count; i++) {
            // console.log(allCookies[i]);
            removeCookie(allCookies[i]);
        }
    });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action.localeCompare("BlockCookies") === 0) {
        let currTabURL = sender.url || "invalid";
        let localurlPattern;

        for (let i = 0; i < urlPatterns.length; i++) {
            if (currTabURL.includes(urlPatternsNames[i])) {
                localurlPattern = urlPatterns[i];
                break;
            }
        }

        chrome.contentSettings.cookies.clear({}, function() {
            chrome.contentSettings.cookies.set({
                "primaryPattern": localurlPattern || 'http://www.example.com/*',
                "setting": "block"
            });
        });
    } else if (msg.action.localeCompare("ClearCookies") === 0) {
        let currTabURL = sender.url || "invalid";
        let localurlPattern;

        for (let i = 0; i < urlPatternsNames.length; i++) {
            if (currTabURL.includes(urlPatternsNames[i])) {
                localurlPattern = urlPatternsNames[i];
                break;
            }
        }
        let currTabDomain = "." + localurlPattern + ".com";
        removeAllCookies(currTabDomain);
        // originName = "https://www." + localurlPattern + ".com"
        // chrome.browsingData.remove({
        //     "origins": [originName]
        // }, {
        //         "appcache": true,
        //         "cache": true,
        //         "cacheStorage": true,
        //         "cookies": true,
        //         "fileSystems": true,
        //         "indexedDB": true,
        //         "localStorage": true,
        //         "pluginData": true,
        //         "serviceWorkers": true,
        //         "webSQL": true
        //     }, function () {
        //         console.log("Cleared");
        //     });
    }
    return true;
});

chrome.webRequest.onBeforeRequest.addListener(
    function() {
        return {
            cancel: true
        };
    }, {
        urls: ["*://meter-svc.nytimes.com/*"],
        // types: ["script"]
    },
    ["blocking"]
);