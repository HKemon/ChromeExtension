$(function () {

    chrome.storage.sync.get('total', function (budget) {
        $('#total').text(budget.total);
    });

    $('#spendAmount').click(function () {
        chrome.storage.sync.get('total', function (budget) {
            let newTotal = 0;
            if (budget.total) {
                newTotal += parseInt(budget.total);
            }

            let amount = $('#amounts').val();
            if (amount) {
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total': newTotal});

            $('#total').text(newTotal);
            $('#amounts').val('');
        })
    })
});