$(document).ready(function() {
    applySelect($('body'));
});

function applySelect(container){
    container.find('.select2').each(function () {
        var jThis = $(this);
        jThis.select2({
            minimumResultsForSearch: 3,
            placeholder: jThis.data('placeholder') ? jThis.data('placeholder') : false
        }).on('change', function (e) {
            $(e.currentTarget).removeClass('error');
        });
    });
}