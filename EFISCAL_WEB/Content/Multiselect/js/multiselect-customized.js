$(document).ready(function () {
    $('.multiselect').multiselect({

        includeSelectAllOption: true,
        buttonClass: 'col btn btn-white',
        nonSelectedText: 'Selecione',
        nSelectedText: '- Opções selecionadas',
        allSelectedText: 'Todas as opções selecionadas',
        selectAllText: 'Selecionar tudo'
    });

    $('.multiselect').parent().removeClass('btn-group');
});