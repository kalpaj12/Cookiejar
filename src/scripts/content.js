var windowURL = window.location.href;

function sendMessagetoBackground(message) {
    chrome.runtime.sendMessage({
        action: message
    }, function() {});
}

function compareStr(newUrl) {
    return windowURL.includes(newUrl);
}

if (compareStr("medium")) {
    sendMessagetoBackground("BlockCookies");
    window.onload = function() {
        sendMessagetoBackground("ClearCookies");

        var removeElement = document.getElementById("lo-meter-banner-background-color");
        if (removeElement) {
            removeElement.remove();
        }
    };
} else if (compareStr("technologyreview")) {
    sendMessagetoBackground("ClearCookies");
    window.onload = function() {
        sendMessagetoBackground("ClearCookies");
        localStorage.clear();
        sessionStorage.clear();

        // Remove meterBanner
        let meterClass = document.querySelector('[class$="meter"]');
        if (meterClass) {
            let removeElement = document.getElementsByClassName(meterClass.className);
            if (removeElement[0]) {
                removeElement[0].remove();
            }
        }

        // Remove top banner
        removeElement = document.getElementsByClassName("optanon-alert-box-wrapper hide-accept-button ");
        if (removeElement[0]) {
            removeElement[0].remove();
        }
    };
} else if (compareStr("nytimes")) {
    sendMessagetoBackground("ClearCookies");
    window.onload = function() {
        sendMessagetoBackground("ClearCookies");

        let paymentGate1 = document.getElementsByClassName("css-1oqptyt");
        let paymentGate2 = document.getElementsByClassName("css-c9itql-BestInShowHeadline e1jfbhl4");
        let paymentGate3 = document.getElementsByClassName("css-v0hq7s");

        if (paymentGate1.length > 0 || paymentGate2.length > 0 || paymentGate3.length > 0) {
            window.location.reload(true);
        }
    };
} else if (compareStr("washingtonpost")) {
    sendMessagetoBackground("ClearCookies");
    window.onload = function() {
        sendMessagetoBackground("ClearCookies");
        localStorage.clear();
        sessionStorage.clear();

        let removeElement = document.getElementById("i_userMessages");
        if (removeElement) {
            removeElement.remove();
        }
    };
}