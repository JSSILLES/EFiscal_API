// VALIDAR FORM
$(document).ready(function () {

    // MENSAGEM DE VALIDAÇÃO
    //$.validator.messages.required = $.MSG_E003;
    $.validator.messages.email = '* Informe um formato de e-mail válido';
    $.validator.messages.equalTo = '* Os valores informados são diferentes';
    $.validator.messages.max = '* Valor máximo excedido';

    InitValidationToastrUnbind();
});

function InitValidationToastrUnbind() {
    var validator = $(".validateForm").validate();

    if (validator)
        validator.destroy();

    InitValidationToastr();
}

function InitValidationToastr() {
    // VALIDATE FORM
    $('.validateForm').each(function () {
        validateForm($('.validateForm'));

        InitFormValidation($('.validateForm'));

        $('.validateForm').bind('invalid-form.validate', function (form, validator) {
            showErrorMessagesOnValidate(validator.errorList);
        });
    });
}

function InitFormValidation($form) {
    //inicia validação client side do formulario
    $form.removeData('validator');
    $form.removeData('unobtrusiveValidation');
    $.validator.unobtrusive.parse($form);
}

// VALIDATE FORM
function validateForm(jThis) {
    jThis.validate({
        invalidHandler: function (event, validator) {
            if (!StringIsNullOrWhiteSpace(validator.errorList[0].message) && !mensagemJaFoiExibida(validator.errorList[0].message) && !validacaoSemMensagem(validator.errorList[0].message))
                toastr.warning(validator.errorList[0].message);
        },
        errorPlacement: function (error, element) {
            error.prependTo(element.parent());
        },
        showErrors: function (errorMap, errorList) {
            showErrorMessages(errorList);
            this.defaultShowErrors();
        },
    });
}

function showErrorMessagesOnValidate(errors) {
    if (!errors)
        return;
    var toastrObj = {
        ToastMessages: []
    };

    errors.forEach(function (item) {
        var exist = $.grep(toastrObj.ToastMessages, function (e) { return e.Message == item.message }).length;

        if (!StringIsNullOrWhiteSpace(item.message) && !exist && !validacaoSemMensagem(item.message)) {
            var label = $(item.element.labels[0]).text();
            var msg = {
                Title: label,
                Message: item.message,
                Type: "Warning"
            };
            toastrObj.ToastMessages.push(msg);
        }
    });
    displayMessages(toastrObj);
}

function displayMessages(toastrObj) {
    $.each(toastrObj.ToastMessages, function (idx, msg) {
        if (!mensagemJaFoiExibida(msg.Message))
            toastr[msg.Type.toLowerCase()](msg.Message);
    });
}


function showErrorMessages(errors) {

    if (!errors)
        return;

    var toastrObj = {
        ToastMessages: []
    };
    errors.forEach(function (item) {
        var exist = $.grep(toastrObj.ToastMessages, function (e) { return e.Message == item.message }).length;

        if (!StringIsNullOrWhiteSpace(item.message) && !exist && !validacaoSemMensagem(item.message)) {
            var msg = {
                Title: item.property,
                Message: item.message,
                Type: "Warning"
            };
            toastrObj.ToastMessages.push(msg);

        }
    });
    displayMessages(toastrObj);
}

function removeValidationClass($form) {
    $form.find('.error').removeClass('error');
    $form.find('.input-validation-error').removeClass('input-validation-error');
    $('.select2-container').css('border', 'none');
}

function mensagemJaFoiExibida(msg) {
    var mensagensExibidas = $('#toast-container .toast .toast-message');
    return $.grep(mensagensExibidas, function (e) { return $(e).html() == msg }).length > 0;
}

function validacaoSemMensagem(msg) {
    return msg.indexOf('Warning:') >= 0;
}