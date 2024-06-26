function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

var id = GetURLParameter("id");

$(document).ready(function(){

    // Carregar estilos musicais no dropdown
    $.ajax({
        url: "http://localhost:8080/api/estilo-musical",
        type: "GET",
        dataType: "JSON",
        success: function(result) {
            var options = "<option value='' disabled selected>Selecione um estilo musical</option>";
            $.each(result, function(index, estilo) {
                options += `<option value="${estilo.id}">${estilo.nome}</option>`;
            });
            $("#input-estiloMusical").html(options);

            // Carregar dados da banda para edição
            var id = GetURLParameter("id");
            if (id) {
                $.ajax({
                    url: `http://localhost:8080/api/banda/${id}`,
                    type: "GET",
                    dataType: "JSON",
                    success: function(data) {
                        $("#input-nome").val(data.nome);
                        $("#input-estiloMusical").val(data.estiloMusical.id);
                        $("#input-quantidadeMusicas").val(data.quantidadeMusicas);
                        $("#input-dataCriacao").val(data.dataCriacao.split('T')[0]);
                        if (data.dataDissolucao) {
                            $("#input-dataDissolucao").val(data.dataDissolucao.split('T')[0]);
                        }
                        $("#input-paisOrigem").val(data.paisOrigem);
                        $("#input-registroBanda").val(data.registroBanda);
                        $("#input-quantidadeIntegrantes").val(data.quantidadeIntegrantes);
                        $("#input-singleDestaque").val(data.singleDestaque);
                        $("#input-albumDestaque").val(data.albumDestaque);
                    },
                    error: function(error) {
                        console.error("Erro ao carregar dados da banda:", error);
                    }
                });
            }
        },
        error: function(error) {
            console.error("Erro ao carregar estilos musicais:", error);
        }
    });

    $("#bandaForm").on("submit", function(event) {
        event.preventDefault();

        var dataCriacao = new Date($("#input-dataCriacao").val());
        var dataDissolucao = $("#input-dataDissolucao").val() ? new Date($("#input-dataDissolucao").val()) : null;
        var registroBanda = $("#input-registroBanda").val();
        var dataAtual = new Date();

        if (dataDissolucao && (dataDissolucao < dataCriacao || dataDissolucao > dataAtual)) {
            alert("A data de dissolução não pode ser menor que a data de criação ou maior que a data atual.");
            return;
        }

        if (!/^[A-Za-z]{2}[0-9]{3}$/.test(registroBanda)) {
            alert("O registro da banda deve ter os primeiros dois caracteres como letras e os três últimos como números.");
            return;
        }

        var formData = {
            nome: $("#input-nome").val(),
            estiloMusical: { id: $("#input-estiloMusical").val() },
            quantidadeMusicas: $("#input-quantidadeMusicas").val(),
            dataCriacao: dataCriacao.toISOString(),
            dataDissolucao: dataDissolucao ? dataDissolucao.toISOString() : null,
            paisOrigem: $("#input-paisOrigem").val(),
            registroBanda: registroBanda,
            quantidadeIntegrantes: $("#input-quantidadeIntegrantes").val(),
            singleDestaque: $("#input-singleDestaque").val(),
            albumDestaque: $("#input-albumDestaque").val()
        };

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url: "http://localhost:8080/api/banda/" + id,
            type: "PUT",
            dataType: "json",
            data: JSON.stringify(formData),
            success: function(data) {
                console.log("Banda atualizada com sucesso!", data);
                alert("Banda atualizada com sucesso!");
                window.location.href = `ver-banda.html?id=${id}`;
            },
            error: function(error) {
                console.error("Erro ao atualizar a banda:", error);
                alert("Erro ao atualizar a banda!");
            }
        });
    });

    // Extrair o ID da banda da URL atual
    var urlParams = new URLSearchParams(window.location.search);
    var idBanda = urlParams.get('id');

    if (idBanda) {
        // URL da página de listagem com o parâmetro `id`
        var urlListarBandas = `ver-banda.html?id=${idBanda}`;
        
        // Atribuir o URL correto ao botão "Voltar"
        $("#voltarBtn").attr("href", urlListarBandas);
    } else {
        console.error("ID da banda não encontrado na URL.");
        // Caso não encontre o ID da banda na URL, pode-se redirecionar para uma página de erro ou fazer outra ação.
    }
});
