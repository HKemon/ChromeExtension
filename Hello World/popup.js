$(function () {
    $('#lol').on('keyup',function () {
        $('#rer').text('Hello '.$('#lol').val());
    });
});