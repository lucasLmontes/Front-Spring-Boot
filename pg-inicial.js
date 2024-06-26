$(document).ready(onInit);

function onInit(){
    $.ajax({
        url: "http://localhost:8080/api/estilo-musical/total",
        type: "GET",
        dataType: "JSON",
        success: function(res){
            $("#total-estilos").html(res);
        },
        error: function(error){
            console.error("Erro ao obter o total de estilos musicais", error);
        }
    });
}
