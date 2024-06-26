function GetURLParameter(sParam) {
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

    // Carregar dados do estilo musical para edição
    if (id) {
        $.ajax({
            url: "http://localhost:8080/api/estilo-musical/" + id,
            type: "GET",
            dataType: "JSON",
            success: function(data) {
                $("#input-nome").val(data.nome);
                $("#input-descricao").val(data.descricao);
                $("#input-figuraImportante").val(data.figuraImportante);
                $("#input-instrumentoPrincipal").val(data.instrumentoPrincipal);
                $("#input-paisOrigem").val(data.paisOrigem);
                $("#input-paisMaiorPopularidade").val(data.paisMaiorPopularidade);
                $("#input-anoSurgimento").val(new Date(data.anoSurgimento).toLocaleDateString('en-CA'));
            },
            error: function(error) {
                console.error("Erro ao carregar dados do estilo musical para edição:", error);
                // Tratar o erro conforme necessário
            }
        });
    } else {
        console.error("ID do estilo musical não encontrado na URL.");
        // Tratar a situação em que o ID não foi encontrado na URL
    }

    // Ao submeter o formulário de edição
    $("#estiloForm").on("submit", function(event) {
        event.preventDefault();

        var formData = {
            nome: $("#input-nome").val(),
            descricao: $("#input-descricao").val(),
            figuraImportante: $("#input-figuraImportante").val(),
            instrumentoPrincipal: $("#input-instrumentoPrincipal").val(),
            paisOrigem: $("#input-paisOrigem").val(),
            paisMaiorPopularidade: $("#input-paisMaiorPopularidade").val(),
            anoSurgimento: new Date($("#input-anoSurgimento").val()).toISOString()
        };

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url: "http://localhost:8080/api/estilo-musical/" + id,
            type: "PUT",
            dataType: "json",
            data: JSON.stringify(formData),
            success: function(data) {
                console.log("Estilo musical atualizado com sucesso!", data);
                alert("Estilo musical atualizado com sucesso!");
                window.location.href = `ver-estilo.html?id=${id}`;
            },
            error: function(error) {
                console.error("Erro ao atualizar o estilo musical:", error);
                alert("Erro ao atualizar o estilo musical!");
            }
        });
    });

    var urlParams = new URLSearchParams(window.location.search);
    var idEstilo = urlParams.get('id');

    if (idEstilo) {
        // URL da página de listagem com o parâmetro `id`
        var urlListarEstilos = `ver-estilo.html?id=${idEstilo}`;
        
        // Atribuir o URL correto ao botão "Voltar"
        $("#voltarBtn").attr("href", urlListarEstilos);
    } else {
        console.error("ID da banda não encontrado na URL.");
        // Caso não encontre o ID da banda na URL, pode-se redirecionar para uma página de erro ou fazer outra ação.
    }
});
