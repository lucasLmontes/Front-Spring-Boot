$(document).ready(function(){
    $("#estiloMusicalForm").on("submit", function(event){
        event.preventDefault();

        var formData =  {
            nome: $("#input-nome").val(),
            descricao: $("#input-descricao").val(),
            figuraImportante: $("#input-figuraImportante").val(),
            instrumentoPrincipal: $("#input-instrumentoPrincipal").val(),
            paisOrigem: $("#input-paisOrigem").val(),
            paisMaiorPopularidade: $("#input-paisMaiorPopularidade").val(),
            anoSurgimento: new Date($("#input-anoSurgimento").val()).toISOString()
        };
        console.log(JSON.stringify(formData));
        //Debug dos dados antes de enviar eles via ajax.

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url: "http://localhost:8080/api/estilo-musical",
            type: "POST",
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function(data){
                console.log("Estilo musical inserido com sucesso!", data);
                alert("Estilo musical inserido com sucesso!");
                window.location.href = "ver-estilo.html?id=" + data.id;
                // Redirecionamento após inserir novo estilo
            },
            error: function(error){
                console.error("Erro ao inserir o estilo musical:", error);
                alert("Erro ao inserir o estilo musical!");
            }
        });
    });
});


