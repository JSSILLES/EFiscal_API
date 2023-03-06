var antt = {};

function Data() {
    var now = new Date();
    var dia = now.getDate();
    var mes = (now.getMonth() + 1);

    if (dia < 10) { dia = "0" + dia; }
    if (mes < 10) { mes = "0" + mes; }

    return dia + "/" + mes + "/" + now.getFullYear();
}

function NumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function GetNumbers(x) {
    return x.replace(/\D/g, '');
}

function NumberToMoney(x) {
    return x.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

//Objeto para guardar os arrays DropdownLists estáticas
$.DropdownLists = {};

//String javascript que representa a Min Date
if (typeof moment !== "undefined") {
    $.MinDate = moment("/Date(-62135589600000)/").toDate().toString();
}
$.ApplicationRootUrl = "";
$.UrlRoot = "";

///Método que aplica herança nos viewmodels
$.ExtendViewModelBase = function (self) {
    var base = {};
    base = {};
    for (propName in self) {
        var propValue = self[propName];
        base[propName] = propValue;
    }

    self.base = base;

    return self;
};

$.ApplyBindingsContentContainer = function (viewmodel) {

    $.ContentViewModel = viewmodel || $.ContentViewModel;

    ko.applyBindings($.ContentViewModel);
};

function loadConfiguration() {
    FormatFields();
}

function FormatFields() {
    $('.numeric').numericInput({ allowFloat: false, allowNegative: false, min: 0 });
    $('.cnpj').mask('00.000.000/0000-00', { placeholder: '__.___.___/____-__', clearIfNotMatch: true });
    $('.cpf').mask('000.000.000-00', { placeholder: '___.___.___.__', clearIfNotMatch: true });
    $('.rg').mask('0.000.000', { placeholder: '_.___.___' });
    $('.ano').mask('Z000', {
        clearIfNotMatch: true,
        placeholder: '____',
        translation: {
            Z: { pattern: /[1-2]/ }
        }
    });
    $('.placa').mask('SSS-0000', {
        placeholder: '___-____',
        clearIfNotMatch: true,
        translation: {
            S: { pattern: /[A-Za-z]/, recursive: true },
        }
    });
    $('.renavam').mask('00000000000');
    $('.only-number').mask('#', {
        maxlength: false,
        translation: {
            S: { pattern: /[0-9]/, recursive: true },
        }
    });
    $('.only-digits').mask('S', {
        'translation': {
            S: { pattern: /[A-Za-z]/, recursive: true },
        },
        maxlength: false
    });
    $('.chassi').mask('SSSSSSSSSSSSSSSSS', {
        placeholder: '_________________',
        clearIfNotMatch: true,
        translation: {
            S: { pattern: /[A-Za-z0-9]/, recursive: true },
        }
    });

    $('.money').mask("000.000.000.000,00", { reverse: true });
    $('.cep').mask('00.000-000', { clearIfNotMatch: true });
    $('.phone').mask('(00) 00000-0000', { placeholder: '(__)  _____-____', clearIfNotMatch: true });
    $('.telefone').mask('(00) 0000-0000', { placeholder: '(__)  ____-____', clearIfNotMatch: true });
    $('.celular').mask('(00) 00000-0000', { placeholder: '(__)  _____-____', clearIfNotMatch: true });
    $('.datetimepicker-input').mask('00/00/0000', { placeholder: '__/__/____', clearIfNotMatch: true });
    $('.tonelada').mask("#00,00", { reverse: true });
    $('.numero-processo').mask('00000.000000/0000-00', { placeholder: '_____.______/____-__', clearIfNotMatch: true });

    $('.ipAddress').mask('099.099.099.099', { placeholder: '___.___.___.___' });
    $('.decimalNumber').mask('0,00', { reverse: false });
    $('.percent').mask('#.##0,00%', { reverse: true });
    //$('.sicad-key').maskMoney({
    //    prefix: 'SICAD-',
    //    thousands: '',
    //    decimal: '',
    //    allowNegative: false,
    //    precision: 0,
    //    allowEmpty: true
    //});
    var options = {
        onKeyPress: function (cpf, ev, el, op) {
            var masks = ['000.000.000-000000', '00.000.000/0000-00'],
                mask = (cpf.length > 14) ? masks[1] : masks[0];
            el.mask(mask, op);
        },
        placeholder: '___.___.___-__'
    }

    // O SELECT É APLICADO NO ARQUIVO ASSETS/JS/APPLY-SELECT 

    // SELECT
    //if ($('.select2').length > 0) {
    //    $('.select2').each(function (index, el) {
    //        var jThis = $(this),
    //            option = jThis.hasClass('no-search') ? { minimumResultsForSearch: Infinity } : false;

    //        $(this).select2(option);
    //        $(this).on('change', function () {
    //            $(this).trigger('blur');
    //        });
    //    });
    //}

    if ($('.cpfcnpj').val() != undefined) {
        if ($('.cpfcnpj').val().length > 11) {
            $('.cpfcnpj').mask('00.000.000/0000-00', options);
        }
        else {
            $('.cpfcnpj').mask('000.000.000-000000', options);
        }
    }

    // AUTOCOMPLETE
    if ($('.typeahead').length > 0) {
        $('.typeahead').each(function () {
            var self = $(this);
            var minLength = 3;

            if (self.data('min')) {
                minLength = self.data('min');
            }

            self.typeahead({
                minLength: minLength,
                source: function (query, process) {
                    var items = [];
                    obj = {};

                    return $.post(self.data('url'), { query: query }, function (data) {
                        $.each(data, function (i, item) {
                            obj[item.Text] = item;
                            items.push(item.Text);
                        });
                        process(items);
                    });
                },
                updater: function (item) {
                    var selectedValue = obj[item].Value;
                    $('#' + self.data('value-field-id')).val(selectedValue);
                    return item;
                }
            });

            self.blur(function () {
                if ($(this).val() === '') {
                    $('#' + self.data('value-field-id')).val('');
                } else {
                    $('#' + self.data('value-field-id')).removeClass('input-validation-error');
                    $('span[data-valmsg-for="' + self.data('value-field-id') + '"').html('');
                    $(this).removeClass('input-validation-error');
                }
            });
        });
    }

    // TOGGLE CONTENT 
    if ($('.toggleNext').length > 0) {
        $('.toggleNext').click(function () {
            $(this).toggleClass('active');
            $(this).next($(".panel-body")).stop().slideToggle('fast')
        });
    }

    // TOASTR
    if ($('.toastr').length > 0) {
        $('.toastr').click(function () {
            // MSG SUCESSO
            toastr.success('Sucesso! O usuário foi cadastrado no sistema e seu painel já está acessível.');
            // MSG ERRO
            toastr.error('Erro: não foi possível cadastrar o usuário pois o sistema excedeu o limite. ');
            // MSG ALERTA
            toastr.warning('Alerta: existe um usuário cadastrado com o mesmo nome, altere para prosseguir. ');
            // MSG INFORMAÇÃO
            toastr.info('Informação: o usuário ao ser cadastrado receberá em seu e-mail as instruções de acesso.');

        });
    }
};

function RemoveMask(value) {
    return value.replace(/\./g, "").replace(/,/g, "").replace(/\//g, "").replace(/-/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\ /g, "");
}

function isCpf(value) {
    if (StringIsNullOrWhiteSpace(value))
        return false;

    value = RemoveMask(value);

    return value.length == 11;
}

function isCnpj(value) {
    if (StringIsNullOrWhiteSpace(value))
        return false;

    value = RemoveMask(value);

    return value.length == 14;
}

function CnpjIsValidSemDV(val) {
    var valorSemMarcara = RemoveMask(val);

    if (valorSemMarcara.length <= 8) { return true; }

    if (val.match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/) !== null) {
        var val1 = val.substring(0, 2);
        var val2 = val.substring(3, 6);
        var val3 = val.substring(7, 10);
        var val4 = val.substring(11, 15);
        var val5 = val.substring(16, 18);

        var i;
        var number;
        var result = true;

        number = (val1 + val2 + val3 + val4 + val5);

        s = number;

        c = s.substr(0, 12);
        var dv = s.substr(12, 2);
        var d1 = 0;

        for (i = 0; i < 12; i++)
            d1 += c.charAt(11 - i) * (2 + (i % 8));

        if (d1 === 0)
            result = false;

        d1 = 11 - (d1 % 11);

        if (d1 > 9) d1 = 0;

        if (dv.charAt(0) !== d1)
            result = false;

        d1 *= 2;
        for (i = 0; i < 12; i++) {
            d1 += c.charAt(11 - i) * (2 + ((i + 1) % 8));
        }

        d1 = 11 - (d1 % 11);
        if (d1 > 9) d1 = 0;

        if (dv.charAt(1) !== d1)
            result = false;

        return result;
    }
    return false;
}

function CnpjIsValid(val) {

    if (StringIsNullOrWhiteSpace(val))
        return false;

    if (val.match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/) !== null) {
        var val1 = val.substring(0, 2);
        var val2 = val.substring(3, 6);
        var val3 = val.substring(7, 10);
        var val4 = val.substring(11, 15);
        var val5 = val.substring(16, 18);

        var i;
        var number;
        var result = true;

        number = (val1 + val2 + val3 + val4 + val5);

        s = number;

        c = s.substr(0, 12);
        var dv = s.substr(12, 2);
        var d1 = 0;

        for (i = 0; i < 12; i++)
            d1 += c.charAt(11 - i) * (2 + (i % 8));

        if (d1 === 0)
            result = false;

        d1 = 11 - (d1 % 11);

        if (d1 > 9) d1 = 0;

        if (dv.charAt(0) !== d1)
            result = false;

        d1 *= 2;
        for (i = 0; i < 12; i++) {
            d1 += c.charAt(11 - i) * (2 + ((i + 1) % 8));
        }

        d1 = 11 - (d1 % 11);
        if (d1 > 9) d1 = 0;

        if (dv.charAt(1) !== d1)
            result = false;

        return result;
    }
    return false;
}

function CpfIsValid(val) {
    val = MaskCpf(val);

    if (val.match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/) !== null) {
        var val1 = val.substring(0, 3);
        var val2 = val.substring(4, 7);
        var val3 = val.substring(8, 11);
        var val4 = val.substring(12, 14);

        var i;
        var number;
        var result = true;

        number = (val1 + val2 + val3 + val4);

        s = number;
        c = s.substr(0, 9);
        var dv = s.substr(9, 2);
        var d1 = 0;

        for (i = 0; i < 9; i++) {
            d1 += c.charAt(i) * (10 - i);
        }

        if (d1 === 0)
            result = false;

        d1 = 11 - (d1 % 11);
        if (d1 > 9) d1 = 0;

        if (dv.charAt(0) !== d1)
            result = false;

        d1 *= 2;
        for (i = 0; i < 9; i++) {
            d1 += c.charAt(i) * (11 - i);
        }

        d1 = 11 - (d1 % 11);
        if (d1 > 9) d1 = 0;

        if (dv.charAt(1) !== d1)
            result = false;

        return result;
    }

    return false;
}

function MaskCpf(val) {
    if (val.match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/) == null) {

        var val1 = val.substring(0, 3);
        var val2 = val.substring(3, 6);
        var val3 = val.substring(6, 9);
        var val4 = val.substring(9);

        val = val1 + '.' + val2 + '.' + val3 + '-' + val4;
    }

    return val;
}

function CodigoEntidadeSindicalIsValid(valor) {
    valor = RemoveMask(valor);

    return true;
}
//Método jquery valida data no formado dd/mm/aaaa
function DateFormatValidation(data) {
    return data.match(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/);
}

function IsValidDate(stringData) {
    var regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
    if (regex.test(stringData)) {
        return true;
    } else {
        return false;
    }
}

function IsValidHtml(stringData) {
    var regex = /(\<\w*)((\s\/\>)|(.*\<\/\w*\>))/g;

    if (regex.test(stringData))
        return true;
    else
        return false;
}

//bloqueia a tela
function BlockUI(msg) {
    $('#loading_screen').show();
}

//desbloquia a tela
function UnBlockUI() {
    $('#loading_screen').hide();
    $.unblockUI(); // o pdfviewer usa o blockUi, por enquanto
}

function tratarMensagemRetorno(data) {
    try {
        if (data.value === true) {
            toastr.success(data.msg);
            return true;
        }
        else if (data.value === false) {
            ModelInvalidate(data);
            return false;
        } else {
            toastr.error('Ocorreu um erro inesperado.');
            return false;
        }
    }
    catch (exc) {
        toastr.error('Ocorreu um erro inesperado.')
        return false;
    }
}

function Mensagem(message, title, okCallback, keepOpen) {
    if (StringIsNullOrWhiteSpace(message)) { return; }

    if (keepOpen == undefined)
        keepOpen = true;

    message = montarMsg(message);

    var $modal = undefined;

    //verifica se alguma modal esta sendo exibida
    if ($('.modal.show').length > 0) {
        //pega a referencia pra modal atual
        $modal = $('.modal').map(function (a, b) {
            if ($(b).hasClass('show')) {
                return b;
            }
        });
    }

    if (!StringIsNullOrWhiteSpace(title) && title.toLowerCase().includes("sucesso"))
        toastr.success(message, "", {
            onHidden: function () {
                if (okCallback && typeof (okCallback) == "function")
                    okCallback();
            }
        });
    else if (!StringIsNullOrWhiteSpace(title) && title.toLowerCase().includes("erro"))
        toastr.error(message, "", {
            onHidden: function () {
                if (okCallback && typeof (okCallback) == "function")
                    okCallback();
            }
        });
    else
        toastr.warning(message, "", {
            onHidden: function () {
                if (okCallback && typeof (okCallback) == "function")
                    okCallback();
            }
        });

    if (!keepOpen) {
        $($modal).addClass('programmatic');
        $($modal).modal('hide');
    }
};

function Confirm(message, title, simCallback, paramSimCallback, naoCallback, paramNaoCallback, strBotaoSim, strBotaoNao, reopen) {
    strBotaoSim = strBotaoSim || 'Sim';
    strBotaoNao = strBotaoNao || 'Não';

    if (reopen === undefined)
        reopen = false;

    var $modal = undefined;

    //verifica se alguma modal esta sendo exibida
    if ($('.modal.in').length > 0) {
        //pega a referencia pra modal atual
        $modal =
            $('.modal').map(function (a, b) {
                if (($(b).data('bs.modal') || {}).isShown) {
                    return b;
                }
            });

        $($modal).addClass('programmatic');
        $($modal).modal('hide');
    }

    bootbox.confirm({
        title: '' + title,
        closeButton: false,
        message: message,
        buttons: {
            confirm: {
                label: '' + strBotaoSim,
                className: 'btn btn-blue confirm-action'
            },
            cancel: {
                label: ' ' + strBotaoNao,
                className: 'btn btn-white'
            }
        },
        callback: function (result) {
            $('body').removeClass('modal-open');
            if (result) {
                if (simCallback && typeof (simCallback) === "function")
                    simCallback(paramSimCallback);
            }
            else {
                if (naoCallback && typeof (naoCallback) === "function")
                    naoCallback(paramNaoCallback);
            }

            if ($modal !== undefined) {
                if (reopen === true) {
                    $($modal).removeClass('programmatic');
                    $($modal).modal('show');
                }
            }
        }
    });
};

function ConfirmPrompt(message, title, simCallback, paramSimCalback, naoCallback, paramNaoCalback, strBotaoSim, strBotaoNao, reopen) {
    strBotaoSim = strBotaoSim || 'Sim';
    strBotaoNao = strBotaoNao || 'Não';

    if (reopen === undefined)
        reopen = false;

    var $modal = undefined;

    //verifica se alguma modal esta sendo exibida
    if ($('.modal.in').length > 0) {
        //pega a referencia pra modal atual
        $modal =
            $('.modal').map(function (a, b) {
                if (($(b).data('bs.modal') || {}).isShown) {
                    return b;
                }
            });

        $($modal).addClass('programmatic');
        $($modal).modal('hide');
    }

    bootbox.dialog({
        title: ' ' + title,
        message: '<label for="MotivoCancelamento" id="textoModal"> Motivo do Cancelamento:</label><textarea class="form-control" id="MotivoCancelamento" maxlength="1000" name="MotivoCancelamento" title="Informe o motivo do cancelamento"" value=""></textarea>',
        closeButton: false,
        buttons: {
            confirm: {
                label: ' ' + strBotaoSim,
                className: 'btn btn-blue confirm-action',
                callback: simCallback
            },
            cancel: {
                label: ' ' + strBotaoNao,
                className: 'btn btn-white'
            }
        },
        callback: function (result) {
            $('body').removeClass('modal-open');
            if (result) {
                if (simCallback && typeof (simCallback) === "function")
                    simCallback(paramSimCalback);
            }
            else {
                if (naoCallback && typeof (naoCallback) === "function")
                    naoCallback(paramNaoCalback);
            }

            if ($modal !== undefined) {
                if (reopen === true) {
                    $($modal).removeClass('programmatic');
                    $($modal).modal('show');
                }
            }
        }
    });
};

function ModelInvalidate(data) {
    var message = '';
    $.each(data.objeto, function (index, value) {
        message = message + "<div class='row padding-left-15'>"
        message = message + value + "<br />";
        message = message + "</div>"
    });

    Mensagem(message, data.msg);
};

function ModelInvalidateSubmit(data) {
    var message = '';
    $.each(data, function (index, value) {
        message = message + "<div class='row padding-left-15'>"
        message = message + value + "<br />";
        message = message + "</div>"
    });

    Mensagem(message, data.msg);
};

function GetPartialView(urlAction, href) {
    $.get({
        url: urlAction,
        async: true,
        dataType: "html",
        success: function (data) {
            $(href).html(data);
        }
    });
}

function GetModal(urlAction) {
    $.get({
        url: urlAction,
        async: true,
        dataType: "html",
        success: function (data) {
            $("#modalSpace").empty();
            $("#modalSpace").html(data);
            $("#anttModal").modal();
        }
    });
}

function exibirMensagemSucesso(data, url, id) {
    if (data.success) {
        $('#anttModal').modal('hide');
        Mensagem(data.SuccessMessage, "Sucesso", function () {
            BlockUI("Carregando...");
            GetPartialView(url, id);
            UnBlockUI();
        });
    } else {
        ParsUnob();
        Mensagem(data.ErrorMessage, "Erro");
    }
}

function ParsUnob() {
    $.validator.unobtrusive.parse("form");
}

function exibirMensagemErro(data) {
    Mensagem(data.ErrorMessage);
}

function montarMsg(message) {
    if (message.indexOf('|') > -1) {
        var messages = message.split('|');
        var msg = "";
        $.each(messages, function (i, item) {
            msg += item + "</br>";
        });

        message = msg;
    }

    return message;
}

function BuscarModal(urlAction) {
    if (urlAction !== '' && urlAction !== undefined) {
        GetModal(urlAction);
    }
    else
        console.error("A propriedade data-action não foi especificada.");
}

function openModal(element, action) {
    $this = $(element);
    var url = action || $this.data('action');

    $.ajax({
        url: url,
        method: 'get',
        async: true,
        beforeSend: function () {
            BlockUI();
        }
    })
        .always(function () {
            UnBlockUI();
        })
        .done(function (data) {
            if (data.success != undefined && data.success == false) {
                Mensagem(data.ErrorMessage, "Erro!", null, true);
                return;
            }

            //pega ou cria container da modal
            var $container = document.getElementById('modalContainer');
            if ($container === null) {
                var div = document.createElement('div');
                div.id = 'modalContainer';
                document.body.appendChild(div);

                $container = div;
            }

            $container.innerHTML = data;

            //exibe modal
            var $modal = $($container.getElementsByClassName('modal'));
            $modal.modal('show');


            $modal.one('shown.bs.modal',
                function () {
                    executeInnerHtmlScript($container);
                }
            );
        });
}

function executeInnerHtmlScript(ele) {
    var codes = ele.getElementsByTagName("script");
    for (var i = 0; i < codes.length; i++) {
        eval(codes[i].text);
    }
}

function initPhoneValidator() {
    $.validator.addMethod("phone", function (value, element) {
        var RegExp = /\(\d{2}\)\s\d{4,5}-?\d{4}/g;
        return RegExp.test(value);
    }, "Número informado é inválido.");
    $.validator.unobtrusive.adapters.addBool("phone");
}

function initSelect2Validator() {
    $.validator.addMethod("select2", function (value, element) {
        if (!element.getAttribute("data-val-required") || value) {
            return true;
        } else {
            return false;
        }
    }, "Campo de preenchimento obrigatório.");
    $.validator.unobtrusive.adapters.addBool("select2");
}

function LimparCampos(form) {
    $form = $('#' + form);

    $form.find('input:text:not([readonly]):not([disabled]), input:password:not([readonly]):not([disabled]), input:file:not([readonly]):not([disabled]), select:not([readonly]):not([disabled]), textarea:not([readonly]):not([disabled])').val('');
    $form.find('textarea').change();

    $form.find('.field-validation-error, .field-validation-valid').each(function (index, item) {
        $(item).html('');
    });

    $form.find('.input-validation-error').removeClass('input-validation-error');

    //limpa select2
    $form.find('select.select2-hidden-accessible:not([disabled])').val([]).trigger('change');
}

function DesbloquearCampos(form) {
    $('#' + form + ' input:not(.alwaysDisabled)').removeAttr('disabled');
    $('#' + form + ' select').removeAttr('disabled');
}

function DesbloquearCampos(form) {
    $('#' + form + ' input').removeAttr('disabled');
    $('#' + form + ' select').removeAttr('disabled');
}

function isJsonDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    return pattern.test(value);
}

function ToJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));

    var dia = dt.getDate();
    var mes = (dt.getMonth() + 1);
    var ano = dt.getFullYear();

    if (dia < 10) {
        dia = "0" + dia;
    }
    if (mes < 10) {
        mes = "0" + mes;
    }

    return dia + "/" + mes + "/" + ano;
}

function GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");

    // If IE, return version number.
    if (Idx > 0)
        return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)), 10);

    // If IE 11 then look for Updated user agent string.
    else if (!!window.MSInputMethodContext && !!document.documentMode)
        return 11;

    else
        return 0; //It is not IE
}

function StringIsNullOrWhiteSpace(input) {
    return typeof input === 'undefined' || input === null
        || (isString(input) && input.replace(/\s/g, '').length < 1);
}

function countChar(val) {
    var count = $(val).data('max');
    var len = val.value.length;
    if (len > count) {
        val.value = val.value.substring(0, count);
    } else {
        $('#charNum').text((count - len) + " caracteres");
    }
};

//padLeft(134, 9, '0'));
function padLeft(nr, n, str) {
    var pad = str.repeat(n);
    if (typeof nr === 'undefined')
        return pad;
    if (padLeft) {
        return (pad + nr).slice(-pad.length);
    } else {
        return (nr + pad).substring(0, pad.length);
    }
}

function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

function toFixedTrunc(number, fixed) {
    if (StringIsNullOrWhiteSpace(number) || isNaN(parseInt(number)))
        return number;

    const v = (typeof number === 'string' ? number : number.toString()).split('.');
    if (fixed <= 0) return v[0];
    let f = v[1] || '';
    if (f.length > fixed) return `${v[0]}.${f.substr(0, fixed)}`;
    while (f.length < fixed) f += '0';
    return `${v[0]}.${f}`;
}

function updateCharCount(idControl, max) {
    var $input = $(idControl);

    if ($input != undefined && $input.val() != undefined) {
        var len = $input.val().length;

        if (len > max) {
            $input.val($input.val().substring(0, max));
            $(idControl + 'CharCount').html(0 + ' caracteres restantes');
        }
        else {
            $(idControl + 'CharCount').html((max - len) + ' caracteres restantes');
        }
    }
}

//Função Limpar Campo.
function RemoveRequired(id) {
    $campo = $('#' + id);

    if ($campo.length > 0) {
        $campo.rules('remove', 'required');
        $campo.removeAttr('data-val-required');
        $campo.removeAttr('required');

        if ($campo.val() == "" || ($campo.val() != "" && $campo.valid())) {
            $campo.removeClass('input-validation-error');
            $campo.removeClass('error');
            $('#' + id + '-error').html('');
        }
    }
}

function IsDataVazia($field) {
    return StringIsNullOrWhiteSpace($field.data('date')) && $field.val() == "";
}

function IsValidEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(email)) {
        return true;
    } else {
        return false;
    }
}

function configurarUploadArquivo(id) {
    $('.upload').change(function () {
        var uploadedfiles = this.files;

        var fromdata = new FormData();

        for (var i = 0; i < uploadedfiles.length; i++) {
            fromdata.append(uploadedfiles[i].name, uploadedfiles[i]);
        }

        fromdata.append('ComponentName', this.id);

        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host + "/";
        if (getUrl.host == "localhost")
            baseUrl = baseUrl + getUrl.pathname.split('/')[1];

        var choice = {};
        choice.url = baseUrl + "/Components/UploadFile.ashx";
        choice.type = "POST";
        choice.data = fromdata;
        choice.contentType = false;
        choice.processData = false;
        choice.error = function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error upload file");
            console.log(XMLHttpRequest.responseText);
        }

        $.ajax(choice);

    });
}

$(document).ajaxStart(function () {
    BlockUI();
});

$(document).ajaxComplete(function () {
    UnBlockUI();
});

$(document).ready(function () {
    //desabilita cache ajax global
    $.ajaxSetup({ cache: false });

    //select2 - tema padrão
    if ($.fn.select2 != undefined)
        $.fn.select2.defaults.set("theme", "bootstrap");

    //jquery-ui - locale padrão
    if ($.datepicker !== undefined)
        $.datepicker.setDefaults($.datepicker.regional['pt-BR']);

    initPhoneValidator();
    initSelect2Validator();

    $(document).on("click", '.tab', function (event) {
        event.preventDefault();
        var loaded = $(this).data("loaded");
        if (!loaded) {
            var urlAction = $(this).data("action");
            if (urlAction !== '' && urlAction !== undefined) {
                var href = $(this).attr('href');
                if (href !== undefined && href !== '') {
                    GetPartialView(urlAction, href);
                    $(this).data('loaded', true);
                }
            }
            else
                console.error("A propriedade data-action não foi especificada.");
        }
    });

    $(document).on("click", '.getModal', function (event) {
        var urlAction = $(this).data("action");
        BuscarModal(urlAction);
    });

    $(document).on('click', '.btnFechar', function () {
        $('#anttModal').modal('hide');
        var url = $(this).data("action");
        Confirm(
            'Os dados informados não foram salvos. Deseja sair mesmo assim?'
            , 'Atenção'
            , function () {
            }
            , null
            , function () {
                $('#anttModal').modal('show');
            })
    });

    $(document).on('click', '.toggle-experiencia', function (event) {
        var btn = $(event.currentTarget);
        var element = this;
        var $root = $(element).closest('.jumbotron');
        var $panel = $root.find('.panel-experiencia');
        var $icone = $root.find('.toggle-experiencia i');
        var $url = $(btn).attr('data-url');

        if (typeof $url === 'string' && $url.indexOf('://') < 0) {
            $url = $.UrlRootPath + $url;
        }

        if (btn.attr('data-loaded') === "false") {//se não tiver carregado
            $.get($url)
                .done(function (data) {
                    $panel.find('div').html(data);
                    btn.attr('data-loaded', "true");
                });
        }

        $panel.slideToggle("slow");//exibe o panel

        $icone.toggleClass('fa-caret-down');
        $icone.toggleClass('fa-caret-right');
    });


    loadConfiguration();

    $(document).on('hide.bs.modal', '.modal.confirma-fechamento', function (e) {
        var $this = $(e.currentTarget);
        if (!$this.hasClass('programmatic')) {
            Confirm($.MSG_A003, 'Fechar', function () {
                $this.addClass('programmatic');
            },
                null,
                function () {
                    $this.removeClass('programmatic');
                    $this.modal('show');
                });
        }
    });

    $(document).on('shown.bs.modal', '.modal', function (e) {
        if ($('.modal.show').length > 0) {
            $(this).removeClass("programmatic");
            $('body').addClass('modal-open');
        }
    });

    $(document).on('hidden.bs.modal', '.modal', function (e) {
        if ($('.modal.show').length > 0) {
            $('body').addClass('modal-open');
        }
    });

    $(document).on('click', '.btn-limpar-formulario', function () {
        $form = $(this).closest('form');
        LimparCampos($form.attr('id'));
    });

    $(document).on('click', '*[data-toggle-modal="true"]', function () {
        openModal(this);
    });

    $.fn.getFormId = function () {
        return $(this).closest('form').attr('id');
    };
    $.fn.preencherCampos = function (result) {
        var $this = $(this);
        $.each(result, function (key, data) {
            var entrada = data;
            if (isJsonDate(data)) {
                entrada = ToJavaScriptDate(data).toString();
            }
            $('#' + $this.attr("id") + ' #' + key).val(entrada).trigger('keyup').trigger('change');
        })
    }
    $.fn.alertModal = function (title, msg, clickOKCallBack, reopen) {
        var $this = $(this);
        $this.addClass('programmatic');
        $this.modal('hide');

        $('section[class=content]').append('<div id="dialogMsg" class="dialogMsg"></div>');

        $('#dialogMsg').dialog({
            open: function () {
                $('#dialogMsg').html('');
                $('#dialogMsg').append('<div><h3>' + msg + '</h3></div>')
            },
            autoOpen: false,
            width: 500,
            resizable: false,
            modal: true,
            title: title,
            buttons: [{
                html: "<i class='fa fa-check'></i>&nbsp; OK",
                "class": "btn btn-primary",
                click: function () {

                    $('#dialogMsg').dialog('close');
                    $('#dialogMsg').remove();
                    if (reopen === true) {
                        $($this).modal('show');
                    }
                    $('#anttModal').removeClass('programmatic');


                    if (clickOKCallBack && typeof clickOKCallBack === "function") {
                        clickOKCallBack();
                    }
                }
            }]
        });

        $('#dialogMsg').dialog('open');
    }
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            var name_array = this.name.split('.');
            var _name = name_array[name_array.length - 1];

            if (o[_name]) {
                if (!o[_name].push) {
                    o[_name] = [o[_name]];
                }
                o[_name].push(this.value || '');
            } else {
                o[_name] = this.value || '';
            }
        });
        return o;
    };

    //v2: busca elementos de forma mais inteligente, preenchendo tipos complexos, como por exemplo "Contato.Nome"
    $.fn.preencherCamposV2 = function (result) {
        var $this = $(this);

        $.each(result, function (key, data) {
            var entrada = data;
            if (isJsonDate(data)) {
                entrada = ToJavaScriptDate(data).toString();
            }
            var elements = $this.find('*[name$="' + key + '"]');
            if (elements.length > 0) {
                $.each(elements, function (index, el) {
                    var name = $(el).attr('name');
                    if (jQuery.inArray(key, name.split('.')) > 0) {
                        $(el).val(entrada).trigger('keyup').trigger('change');
                    }
                });
            }
        })
    }

    //variaveis para gerenciamento de ajax
    xhrPool = [];//adicionar requests executadas
    xhrCancelado = null;//indica se o ajax global foi cancelado
});

function anexoExcedeuTamanhoLimite(files) {
    var maxFileSize = (10 * 1024 * 1024); //10 Mb -> KB -> Bytes 

    if (files != null) {
        for (var i = 0; i < files.length; i++) {
            if (files[i].size > maxFileSize)
                return true;
        }
        return false;
    }
}

//function autoShowModal() {
//    $('.modal[data-show]').removeAttr('data-show').modal('show');
//};

$(function () {
    $('[data-toggle="tooltip"]').tooltip();

    //// auto show modal
    //autoShowModal();
    //$(document).ajaxComplete(function (event, xhr, options) {
    //    autoShowModal();
    //});
});