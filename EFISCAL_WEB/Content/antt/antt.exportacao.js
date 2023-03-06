antt = antt || {};
antt.exportacao = {
    Options: {
        tipo: '',
        BaseUrl: '',
        FormId: ''
    },
    Init: function (options) {
        var self = antt.exportacao;

        options = options || {};
        self.Options.BaseUrl = options.baseUrl || $.CurrentController;
        self.Options.FormId = options.formID || 'form-consulta';
        if ($("#modal_demand").length > 0) {

            // $('#modal_demand').on('shown.bs.modal', function () {

            //    var options = $('.btn-imprimir').attr('data-options');

            //    if (options) {
            //        if (options.toLowerCase().indexOf('pdf') == -1) {
            //            $('input[name=radioExportar][value="pdf"]').parent().hide();
            //        }

            //        if (options.toLowerCase().indexOf('excel') == -1) {
            //            $('input[name=radioExportar][value="excel"]').parent().hide();
            //        }
            //    }
            //    $('input[name=radioExportar]').prop('checked', false);
            //})

            $('#modal_demand').on('shown.bs.modal', function () {

                var options = $('.btn-imprimir').attr('data-options');

                if (options) {
                    if (options.toLowerCase().indexOf('pdf') >= 0) {
                        $('#radioExportarPDF').prop('checked', true);
                        $('#radioExportarXLS').prop('checked', false);
                    } else if (options.toLowerCase().indexOf('excel') >= 0) {
                        $('#radioExportarPDF').prop('checked', false);
                        $('#radioExportarXLS').prop('checked', true);
                    }

                    self.Options.tipo = $('input[name=radioExportar]:checked', '#myFormExportar').val();
                    self.Exportar(function () { $('#modal_demand').modal('hide'); });

                    $('#modal_demand').modal('hide');
                } else {
                    $('input[name=radioExportar]').prop('checked', false);
                }
            })

            $(document).on("click", '#btnExportar', function () {
                self.Options.tipo = $('input[name=radioExportar]:checked', '#myFormExportar').val();
                self.Exportar(function () { $('#modal_demand').modal('hide'); });
            });
        };
    },
    Exportar: function (callback) {
        var self = antt.exportacao;
        var convertData = $('.btn-imprimir').attr("data-convertDataFormatoAmericano");

        var queryString = self.SerializarAmplify(amplify.store(antt.formulario.Options.FormName), convertData);
        switch (self.Options.tipo) {
            case "pdf":
                var data_url = $('.btn-imprimir').attr('data-href-pdf');
                if (data_url != undefined) {
                    window.open(data_url);
                }
                else {
                    window.open($.UrlRootPath + self.Options.BaseUrl + "/ExportarPDF?" + queryString, '_blank');
                }
                break;
            case "excel":
                var data_url = $('.btn-imprimir').attr('data-href-excel');
                if (data_url != undefined) {
                    window.open(data_url);
                }
                else {
                    window.open($.UrlRootPath + self.Options.BaseUrl + "/ExportarExcel?" + queryString, '_blank');
                }
                break;
            default:
                break;
        }

        if (!self.Options.tipo) {
            Mensagem($.MSG_E010, "Erro");
        }
        else {
            callback();
        }
    },
    ExportarExcel: function (amplifyStore) {
        var queryString;
        var self = antt.exportacao;
        if (amplifyStore == undefined) {
            var queryString = self.FormatDateArray($("#" + self.Options.FormId).serializeArray());
        } else {
            queryString = self.FormatDateArray(amplify.store(amplifyStore));
        }
        window.open($.UrlRootPath + self.Options.BaseUrl + "/ExportarExcel?" + queryString, '_blank');
    },
    ExportarPDF: function (amplifyStore) {
        var self = antt.exportacao;
        var queryString = self.FormatDateArray(amplify.store(amplifyStore));
        window.open($.UrlRootPath + self.Options.BaseUrl + "/ExportarPDF?" + queryString, '_blank');
    },
    ShowDialog: function () {
        var self = antt.exportacao;

        $('#cboExportar').val('');
        self.Options.tipo = '';
        self.DialogExportar.dialog("open");
    },
    FormatDateArray: function (queryStringArray) {
        var self = antt.exportacao;
        var queryString;
        $.each(queryStringArray, function (index, value) {
            var nome = value.name;
            var valor = value.value;
            if (value.name.indexOf("Data") >= 0 && value.name != "") {
                valor = self.FormatDate(valor);
            }
            if (queryString != undefined) {
                queryString = queryString + nome + "=" + valor + "&";

            }
            else {
                queryString = nome + "=" + valor + "&";
            }

        });
        return queryString;
    },
    FormatDate: function (valor) {
        var dia = valor.substr(0, 2);
        var mes = valor.substr(3, 2);
        var ano = valor.substr(6, 4);
        valor = mes + "/" + dia + "/" + ano;
        return valor;
    },
    SerializarAmplify: function (data, convertData) {
        var self = antt.exportacao;
        var _queryAmplify;

        for (var i = 0; i < data.length; i++) {
            var name = data[i].name;
            var value = data[i].value;

            if (name.indexOf("Data") >= 0 && name != "" && convertData === "true") {
                value = self.FormatDate(value);
            }

            if (_queryAmplify == undefined) {
                _queryAmplify = "&" + name + "=" + value;
            }
            else {
                _queryAmplify = _queryAmplify + "&" + name + "=" + value;
            }

        }
        return _queryAmplify;
    }
};

$(document).ready(function () {
    //inicia exportacao
    antt.exportacao.Init();
});