// Event listener for extension installation
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        // Open options/index.html file in a new tab
        chrome.tabs.create({ url: "options/index.html?justInstalled=true" });
    }
});

// Event listener for extension icon click
chrome.action.onClicked.addListener(function () {
    // Open options/index.html file in a new tab
    chrome.tabs.create({ url: "options/index.html" });
});
