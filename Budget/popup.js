$(function () {

    chrome.storage.sync.get(['total', 'limit'], function (budget) {
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });

    $('#spendAmount').click(function () {
        chrome.storage.sync.get(['total', 'limit'], function (budget) {
            let newTotal = 0;
            if (budget.total) {
                newTotal += parseInt(budget.total);
            }

            let amount = $('#amounts').val();
            if (amount) {
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total': newTotal}, function () {
                if ((amount && newTotal) >= budget.limit) {
                    let notiOptions = {
                        type: 'basic',
                        iconUrl: 'get_started48.png',
                        title: 'Limit reached!',
                        message: "You have crossed the limit!"
                    };
                    chrome.notifications.create('limitNoti',notiOptions);
                }
            });

            $('#total').text(newTotal);
            $('#amounts').val('');
        })
    })
});