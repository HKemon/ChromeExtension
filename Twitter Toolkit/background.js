let contextMenuItem = {
    "id": "twitterToolkit",
    "title": "Twitter Toolkit",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
    chrome.tabs.create({url: "https://twitter.com/intent/tweet?text=" + clickData.selectionText})
});