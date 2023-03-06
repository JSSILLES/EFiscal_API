function apply_datepicker(elm, options) {
	elm.datetimepicker(options);
}

function apply_rangeDate(elm, options) {
	elm.datetimepicker(options);

	if (elm.hasClass('initialDate')) {
		elm.on('change.datetimepicker', function (e) {
			var data = moment(e.currentTarget.value, "DD/MM/YYYY");

			if (data.isValid())
				$('input.finalDate').parent().datetimepicker('minDate', moment(e.currentTarget.value, "DD/MM/YYYY"));
			else
				$('input.finalDate').parent().datetimepicker('minDate', new Date('1900', '01', '01'));
		});
	}
}

$(document).ready(function ($) {

	// DEFAULT OPTIONS
	var options = {
		format: 'L LT',
		language: 'pt-BR',
		widgetPositioning: {
			vertical: 'bottom'
		}
	}

	// SIMPLE DATE
	$('.datepicker').each(function (index, el) {
		apply_datepicker($(el), options);
	});

	// RANGE DATE
	$('.dateRange').each(function (index, el) {
		apply_rangeDate($(el), options);
	});

	// DATE ONLY
    var options_dateOnly = {
        format: 'L',
        widgetPositioning: {
            vertical: 'bottom'
        }
    };

	$('.dateOnly').each(function (index, el) {
		apply_datepicker($(el), options_dateOnly);

		if ($(el).find('.dateMaxToday').length > 0 || $(el).find('*[data-val-datethantoday]').length > 0) {
			$(el).datetimepicker('maxDate', moment());
		}

		if ($(el).find('.dateMinToday').length > 0 || $(el).find('*[data-val-datelesstoday]').length > 0) {
			$(el).datetimepicker('minDate', moment());
		}
	});

	// RANGE DATE
	$('.dateOnly_Range').each(function (index, el) {
		apply_rangeDate($(el), options_dateOnly);
	});
});