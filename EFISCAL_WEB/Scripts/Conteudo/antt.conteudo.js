
(function () {
    "use strict";

    antt.conteudo = {
        $dropDownEmptyValue: "<option value=''>---Selecione---</option>",
        Init: function () {
            $('#exclusao-conteudo').submit(function () {
                antt.conteudo.excluirConteudo(this.action, this.method);
                return false;
            });
        },
        InitForm: function () {
            $("#Imagem").change(function () {
                if (this.files && this.files[0]) {
                    var reader = new FileReader();

                    // Somente arquivos do formato PDF permitidos
                    if (this.files[0].type !== "image/png" && this.files[0].type !== "image/jpeg") {
                        toastr.error('Tipo de arquivo não permitido! Imagem só pode ser dos tipos: JPG ou PNG');
                        return;
                    }

                    //2MB por arquivo
                    if (this.files[0].size > 2000000) {
                        toastr.error('Não é possível inserir arquivo com tamanho superior a 2MB.');
                        return;
                    }

                    reader.onload = function (e) {
                        $('#image-preview').attr('src', e.target.result);
                    }

                    reader.readAsDataURL(this.files[0]);
                    antt.conteudo.validarImagemObrigatoria();
                }
            });

            $(document).on('change', '#Anexo', function () {
                antt.conteudo.montarTableAnexo($(this).val());
            });

            $('form').submit(function () {
                antt.conteudo.validarImagemObrigatoria();
            });
        },
        desabilitarTopicos: function () {
            var $selectTopico = $('#CodigoTopico');
            $selectTopico.empty();
            $selectTopico.append(antt.conteudo.$dropDownEmptyValue);
        },

        desabilitarAssuntos: function () {
            var $selectAssunto = $('#CodigoAssunto');
            $selectAssunto.empty();
            $selectAssunto.append(antt.conteudo.$dropDownEmptyValue);
        },

        preencherTopicos: function (topicos) {
            var $selectTopico = $('#CodigoTopico');
            $selectTopico.empty();

            if (topicos.length > 0)
                $selectTopico.append(antt.conteudo.$dropDownEmptyValue);

            $.each(topicos, function (index, item) {
                $selectTopico.append($('<option>', {
                    value: item.Value,
                    text: item.Text
                }));
            });
        },

        montarTableAnexo: function (anexo) {
            if (anexo === '') return;

            var tbl = $('#datatableAnexo');

            var off = $('#ckoff').is(":checked");

            var myFile = $('#Anexo').prop('files')[0];

            var hasOfflineInTable = $.grep($('#datatableAnexo tr'), function (e, i) { return $(e).find("td").eq(2).html() === "Sim" }).length;

            if (off == true && hasOfflineInTable == 1) {
                toastr.error('Um arquivo off-line por conteúdo!');
                return;
            }

            //Somente arquivos do formato PDF permitidos
            if (myFile.type !== "application/pdf") {
                toastr.error('Tipo de arquivo não permitido! Anexo só pode ser do tipo: pdf');
                return;
            }

            //1MB por arquivo
            if (myFile.size > 1000000) {
                toastr.error('Não é possível inserir arquivo com tamanho superior a 1MB.');
                return;
            }

            var rowCount = $('#datatableAnexo tr').length;
            if (rowCount < 4) {
                var anexodata = new FormData();
                anexodata.append("anexo", myFile);
                anexodata.append("offline", off);
                anexodata.append("extensao", myFile.type);
                anexodata.append("tamanhoBytes", myFile.size);
                $.ajax({
                    data: anexodata,
                    type: "post",
                    contentType: "multipart/form-data",
                    cache: false,
                    processData: false,
                    contentType: false,
                    url: antt.conteudo.guardarArquivos,
                    beforeSend: function () {
                        BlockUI();
                    },
                    success: function (data) {
                        if (data.success) {
                            var filename = anexo.replace(/^.*\\/, "");

                            var newRowContent = '<tr data-val=' + filename + '><td style="display:none">0</td><td>' + filename + '</td>' + '<td id=' + 'stt' + '>' + (off == false ? "Não" : "Sim") + '</td>' + "<td>  <i style='cursor: pointer;' class='fa fa-trash' onclick='antt.conteudo.deletarRow(this)'> </i> </button>    </td> </tr>"

                            $('#datatableAnexo tr').each(function () {
                                var customerId = $(this).find("td").eq(2).html();
                                if (customerId !== undefined && customerId == "Sim") {
                                    off = false;
                                    newRowContent = ' <tr data-val=' + filename + '><td style="display:none">0</td><td>' + filename + '</td>' + '<td id=' + 'stt' + '>' + (off == false ? "Não" : "Sim") + '</td>' + "<td>  <i style='cursor: pointer;' class='fa fa-trash' onclick='antt.conteudo.deletarRow(this)'> </i> </button>    </td> </tr>"
                                }
                            });

                            $("#datatableAnexo tbody").append(newRowContent);
                            tbl.show();

                            antt.conteudo.dasabilitarHabilitarCheckbox();
                        } else {
                            exibirMensagemErro(data);
                        }

                        UnBlockUI();
                    },
                    complete: function () {
                        UnBlockUI();
                    }
                });
            }

            antt.conteudo.dasabilitarHabilitarCheckbox();
        },

        preencherAssuntos: function (assuntos) {
            var $selectAssunto = $('#CodigoAssunto');
            $selectAssunto.empty();

            if (assuntos.length > 0)
                $selectAssunto.append(antt.conteudo.$dropDownEmptyValue);

            $.each(assuntos, function (index, item) {
                $selectAssunto.append($('<option>', {
                    value: item.Value,
                    text: item.Text
                }));
            });
        },

        listarTopicos: function (codigoTema) {

            if (StringIsNullOrWhiteSpace(codigoTema))
                return;

            $.ajax({
                data: { codigoTema: codigoTema },
                type: "post",
                cache: false,
                url: antt.conteudo.urlListarTopicos,
                beforeSend: function () {
                    BlockUI();
                },
                success: function (data) {
                    if (data.success) {
                        antt.conteudo.preencherTopicos(data.topicos);
                    } else {
                        exibirMensagemErro(data);
                        antt.conteudo.desabilitarTopicos();
                    }

                    antt.conteudo.desabilitarAssuntos();
                    UnBlockUI();
                },
                complete: function () {
                    UnBlockUI();
                }
            });
        },

        listarAssuntos: function (codigoTopico) {

            if (StringIsNullOrWhiteSpace(codigoTopico))
                return;

            $.ajax({
                data: { codigoTopico: codigoTopico },
                type: "post",
                cache: false,
                url: antt.conteudo.urlListarAssuntos,
                beforeSend: function () {
                    BlockUI();
                },
                success: function (data) {
                    if (data.success) {
                        antt.conteudo.preencherAssuntos(data.assuntos);
                    } else {
                        exibirMensagemErro(data);
                        antt.conteudo.desabilitarAssuntos();
                    }

                    UnBlockUI();
                },
                complete: function () {
                    UnBlockUI();
                }
            });
        },

        exibirModalExclusao: function (id) {
            $('#excluiRegistroBox').modal('toggle');
            $('#codigo-excluir').val(id);
        },


        limparCampos: function () {
            $('#CodigoTema').val("");
            $('#CodigoTopico').val("");
            $('#CodigoAssunto').val("");
            $('#TipoConteudo').val("");
            $('#StatusConteudo').val("");
            $("#lista-conteudos").html("");
            $.ajax({
                type: "post",
                cache: false,
                url: antt.conteudo.urlLimpar,
                beforeSend: function () {
                    BlockUI();
                },
                complete: function () {
                    UnBlockUI();
                }
            });
        },

        excluirConteudo: function (url, type) {
            $.ajax({
                url: url,
                data: { codigo: $('#codigo-excluir').val() },
                type: type,
                cache: false,
                beforeSend: function () {
                    BlockUI();
                },
                success: function (data) {
                    if (data.success) {
                        Mensagem(data.SuccessMessage, "Sucesso!");
                        $(location).attr('href', $.UrlRootPath + antt.formulario.Options.BaseUrl + '?voltar=1');
                    } else {
                        Mensagem(data.ErrorMessage, "Erro!");
                    }
                    UnBlockUI();
                },
                complete: function () {
                    UnBlockUI();
                }
            });

            $('#excluiRegistroBox').modal('toggle')
            $('#codigo-excluir').val('');
        },
        dasabilitarHabilitarCheckbox: function () {
            var hasOfflineInTable = $.grep($('#datatableAnexo tr'), function (e, i) { return $(e).find("td").eq(2).html() === "Sim" }).length;

            $("#ckoff").prop('checked', false);

            if (hasOfflineInTable == 1) {
                $('#ckoff').attr('disabled', 'disabled');
            } else {
                $('#ckoff').removeAttr('disabled');
            }
        },
        validarImagemObrigatoria: function () {
            if (!$("#Imagem").valid()) {
                $('#btnImagem').addClass('has-error');
            } else {
                $('#btnImagem').removeClass('has-error');
            }
        },
        deletarRow: function (row) {
            var nomeFile = $(row).closest('tr').data("val");
            $(row).closest('tr').remove();
            $.ajax({
                data: { nomeArquivo: nomeFile },
                type: "post",
                cache: false,
                url: antt.conteudo.removerArquivos,
                beforeSend: function () {
                    BlockUI();
                },
                success: function (data) {
                    if (data.success) {
                    } else {
                        exibirMensagemErro(data);
                    }

                    UnBlockUI();
                },
                complete: function () {
                    UnBlockUI();
                }
            });

            if ($('#datatableAnexo tbody tr').length == 0) {
                $('#datatableAnexo').attr('style', 'display:none');
            };

            antt.conteudo.dasabilitarHabilitarCheckbox();
        }
    }
})();