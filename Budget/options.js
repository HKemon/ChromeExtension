$(function () {
    chrome.storage.sync.get('limit', function (budget) {
        $('#limit').val(budget.limit);
    });

    $('#saveLimit').click(function () {
        let limit = $('#limit').val();
        if (limit) {
            chrome.storage.sync.set({'limit': limit}, function (budget) {
                close();
            });
        }
    });

    $('#resetTotal').click(function () {
        chrome.storage.sync.set({'total': 0});
    })
});