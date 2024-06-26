$(document).ready(function(){
    // Carregar estilos musicais no dropdown
    $.ajax({
        url: "http://localhost:8080/api/estilo-musical",
        type: "GET",
        dataType: "JSON",
        success: function(result){
            var options = "<option value='' disabled selected>Selecione um estilo musical</option>";
            $.each(result, function(index, estilo){
                options += `<option value="${estilo.id}">${estilo.nome}</option>`;
            });
            $("#input-estiloMusical").html(options);
        },
        error: function(error){
            console.error("Erro ao carregar estilos musicais:", error);
        }
    });

    $("#bandaForm").on("submit", function(event){
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
        console.log(JSON.stringify(formData));

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url: "http://localhost:8080/api/banda",
            type: "POST",
            dataType: "JSON",
            data: JSON.stringify(formData),
            success: function(data){
                console.log("Banda inserida com sucesso!", data);
                alert("Banda inserida com sucesso!");
                window.location.href = "listar-bandas.html";
            },
            error: function(error){
                console.error("Erro ao inserir a banda:", error);
                alert("Erro ao inserir a banda!");
            }
        });
    });
});
