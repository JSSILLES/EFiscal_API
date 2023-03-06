antt = antt || {};
antt.formulario = {
    Options: {
        FormId: 'form-consulta',
        BaseUrl: '',
        FormName: '',
        SubmitFormOnReturnCustomized: false
    },

    Init: function (options) {
        var self = antt.formulario;

        options = options || {}
        self.Options.BaseUrl = options.baseUrl || $.CurrentController;
        self.Options.FormId = options.formID || self.Options.FormId;
        self.Options.FormName = options.formName || self.Options.FormName;

        $('.btn-resetform').on('click', function () {
            self.ResetForm();
        });

        $('.btn-consultar').on('click', function () {
            //ao executar a consulta pelo botao, o sistema deve zerar o status
            //de paginacao e guardar o status da consulta
            //o status da paginacão será guardado quando o usuario paginar ou ordenar
            self.LimparStatusPaginacao();
            self.GuardarStatus();
        });

        //se houver query de voltar, carrega o status do formulario e chama botao de consulta
        var query = getUrlVars()["voltar"];
        if (query) {
            self.RestaurarStatus();

            if (!self.Options.SubmitFormOnReturnCustomized)
                self.SubmitForm();
        }
    },

    SubmitForm: function () {
        var self = antt.formulario;
        $("#" + self.Options.FormId).submit();
    },

    ResetForm: function () {
        var self = antt.formulario;

        document.getElementById(self.Options.FormId).reset();

        var form = $("#" + self.Options.FormId);
        form.find('input:text, input:password, input:file, select, textarea').val('');
        form.find('input:radio, input:checkbox').iCheck('uncheck').iCheck('update');
        form.find('textarea').change();

        $('.field-validation-error, .field-validation-valid').each(function (index, item) {
            $(item).html('');
        });

        if ($('.select2').length > 0) {
            $('.select2').each(function (index, item) {
                $(item).val(null).trigger('change');
            });

        }
    },

    GuardarStatus: function () {
        var self = antt.formulario;

        var form = $("#" + self.Options.FormId);
        var data = form.serializeArray();

        amplify.store(self.Options.FormName, data);
    },

    RestaurarStatus: function () {
        var self = antt.formulario;

        var data = amplify.store(self.Options.FormName);

        if (data) {
            $.each(data, function (index, obj) {
                var $el = $('[name="' + obj.name + '"]'),
                    type = $el.attr('type');

                switch (type) {
                    case 'checkbox':
                        if (obj.value.toUpperCase() == 'TRUE') {
                            $el.attr('checked', 'checked');
                        }
                        break;
                    case 'radio':
                        $el.filter('[value="' + obj.value + '"]').attr('checked', 'checked');
                        renderizaControles();
                        break;
                    default:
                        if (!$el.is("select") && !$el.hasClass("multiselect")) {
                            $el.val(obj.value);
                            if ($el.hasClass('dependent-control')) {
                                var $parentControl = $("#" + $el.attr("parent-control"));
                                if ($parentControl)
                                    $parentControl.attr('temp-value-child', obj.value);
                            }
                        } else {
                            $el.val(obj.value);
                        }
                }
            });
        }

        self.CarregarControlesDependentes();
    },

    CarregarControlesDependentes: function () {
        $(".dependent-control").each(function () {
            var $value = $("#" + $(this).attr("parent-control")).attr("temp-value-child");
            if ($value) {
                var fnName = $(this).attr('data-source-function');
                if (fnName) {
                    var fn = window[fnName];
                    if (typeof fn === "function") fn($value);
                }
            }
        });
    },

    LimparStatusPaginacao: function () {
        $("[data-default]").each(function (index, obj) {
            $(obj).val($(obj).attr('data-default'));
        });
    }
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var pageInitialized = false;
$(document).ready(function () {

    if (pageInitialized) return;
    //inicia ferramentas de form
    antt.formulario.Init();

    pageInitialized = true;
});