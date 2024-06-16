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
//Pega o valor do parâmetro de busca na URL e utiliza ele em uma requisição de busca

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
//Define um formato de data simplificado

$(document).ready(function(){

    function listarEstilo(){
        $.ajax({
            url: "http://localhost:8080/api/estilo-musical/" + id,
            type: "GET",
            dataType: "JSON",
            success: function(data){
                $("#get-nome").text(data.nome);
                $("#get-descricao").text(data.descricao);
                $("#get-figuraImportante").text(data.figuraImportante);
                $("#get-instrumentoPrincipal").text(data.instrumentoPrincipal);
                $("#get-paisOrigem").text(data.paisOrigem);
                $("#get-paisMaiorPopularidade").text(data.paisMaiorPopularidade);
                $("#get-anoSurgimento").text(formatDate(new Date(data.anoSurgimento)));
            }
        });
    }

    listarEstilo();
    //Chama a função listarEstilo para buscar e exibir os dados

    function deleteEstilo(id){

        var confirmarDelete = confirm("Deseja excluir esse estilo musical?");
        if (confirmarDelete == true){

            $.ajax({
                url: "http://localhost:8080/api/estilo-musical/" + id,
                type: "DELETE",
                dataType: "JSON",
                success: function(data){
                    console.log("Estilo musical removido com sucesso!", data);
                    window.location.href = "index.html";
                },
                error: function(error){
                    console.log("Erro ao excluir estilo musical!", error);
                }
            });

        }
    }

    document.getElementById("deleteBtn").addEventListener("click", function(){

        deleteEstilo(id);

    });
});
