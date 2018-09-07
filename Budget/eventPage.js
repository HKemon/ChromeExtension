let contextMenuItem = {
    "id": "spendMoney",
    "title": "Spend Money",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == 'spendMoney' && clickData.selectionText){
        if (isInt(clickData.selectionText)){
            chrome.storage.sync.get(['total','limit'],function (budget) {
                let newTotal = 0;
                if (budget.total){
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total' : newTotal},function () {
                    if (newTotal >= budget.limit){
                        let notiOptions = {
                            type: 'basic',
                            iconUrl: 'get_started48.png',
                            title: 'Limit reached!',
                            message: "You have crossed the limit!"
                        };
                        chrome.notifications.create(notiOptions);
                    }
                });
            });
        }
    }
});

chrome.storage.onChanged.addListener(function (changes, storageName) {
    chrome.browserAction.setBadgeText({"text" : changes.total.newValue.toString()});
});