$(document).ready(onInit);

function onInit(){
    $.ajax({
        url: "http://localhost:8080/api/estilo-musical",
        type: "GET",
        dataType: "JSON",
        success: function(result){
            console.log(result)
            var html="";
            $.each(result, function(index, data){
                html += `<a href="ver-estilo.html?id=${data.id}" class="box">`;
                html += data.nome + `</a>`;
            });
            $("#retorna-estilos").html(html); //Atualiza o conteúdo HTML uma vez, após o loop
        },
        error: function(error){
            console.error("Erro ao obter o estilo musical:", error);
        }
    });
}

/**Usa o método "on()" para capturar cliques de elementos da classe "box" dentro de "#retornar-estilos" e
 * redireciona para a página definida pelo "window.location.href" */
$("#retorna-estilos").on("click", ".box", function(event){
    window.location.href = $(this).attr("href");
})
