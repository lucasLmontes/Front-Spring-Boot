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

function formatDate(date){
    var d = new Date(date),
        month = "" + (d.getUTCMonth() + 1),
        day = "" + d.getUTCDate(),
        year = "" + d.getUTCFullYear();
    
    if (month.length < 2)
        month = "0" + month;
    if (day.length < 2)
        day = "0" + day;

    return [year, month, day].join("-");
}

$(document).ready(function(){

    $.ajax({
        url: `http://localhost:8080/api/banda/` + id,
        type: "GET",
        dataType: "JSON",
        success: function(data){
            $("#get-nome").text(data.nome);
            $("#get-estilo").text(data.estiloMusical.nome);
            $("#get-quantidadeMusicas").text(data.quantidadeMusicas);
            $("#get-dataCriacao").text(formatDate(data.dataCriacao));
            if (data.dataDissolucao) {
                $("#get-dataDissolucao").text(formatDate(data.dataDissolucao));
            } else {
                $("#get-dataDissolucao").text("Ativa");
            }
            $("#get-paisOrigem").text(data.paisOrigem);
            $("#get-registroBanda").text(data.registroBanda);
            $("#get-quantidadeIntegrantes").text(data.quantidadeIntegrantes);
            $("#get-singleDestaque").text(data.singleDestaque);
            $("#get-albumDestaque").text(data.albumDestaque);
            $("#get-atividadeBanda").text(data.atividadeBanda ? "Em atividade" : "Encerrou atividade");
        },
        error: function(error){
            console.error("Erro ao carregar dados da banda:", error);
        }
    });
});
