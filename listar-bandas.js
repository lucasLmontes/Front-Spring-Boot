$(document).ready(function(){
    $.ajax({
        url: "http://localhost:8080/api/banda",
        type: "GET",
        dataType: "json",
        success: function(result){
            console.log(result);
            var html = "";
            $.each(result, function(index, data){
                html += `<tr class="banda-item" data-id="${data.id}">`;
                html += `<td>${data.nome}</td>`;
                html += `<td>${data.estiloMusical.nome}</td>`;
                html += "</tr>";
            });
            $("#listar-bandas").html(html);

            // Adicionar evento de clique para redirecionar para ver-banda.html
            $(".banda-item").click(function() {
                var bandaId = $(this).attr("data-id");
                window.location.href = `ver-banda.html?id=${bandaId}`;
            });
        },
        error: function(error){
            console.error("Erro ao listar as bandas:", error);
            alert("Erro ao listar as bandas");
        }
    });
});
