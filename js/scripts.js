$(function () {
    //botão menu lateral****************************************************************
    $('#hamburg').click(function () {
        document.getElementById('lista').style.visibility = 'visible';
    });
    $('.fechar').click(function () {
        document.getElementById('lista').style.visibility = 'hidden';
    });
    //****************************************************************************** */
    // localStorage.removeItem('lista'); 

    // Recupera o json do localStorage
    var jsonlist = window.localStorage.getItem('lista');

    //Verifica se já existe a conteúdo em localStorage caso não se cria o objetos lista
    if (JSON.parse(jsonlist) == null) {
        var lista = {};
    } else {
        // Converte este json para objeto
        var lista = JSON.parse(jsonlist);
    }


    atualizarFinal();
    //função para atualizar a lista de transações***********************************

    function atualizarFinal() {
        //Limpa a lista de transações
        $("#table").html(" ");
        var total = 0;
        //Loop para acessar os valores do objeto lista e adicionalos ao HTML
        $.each(lista, function (index, value) {
            value = parseFloat(value);
            total = total + value;
            $("#table").prepend("<tr><td> " + index + " </td><td>R$ " + value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " </td></tr>");
        });
        $("#table").append("<tr><td>Total</td><td>R$ " + total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td></tr>")
    };
    //********************************************************************************* */

   
    $(".button").click(function () {
        var itemSelecionado = $("#select option:selected").val();
        var number = parseFloat($("#valor").val());

        //confiramar !NaN
        if (isNaN(number) == false) {

            //caso o select seja Compra
            if (itemSelecionado == "Compra") {
                var mercadoria = $("#mercadoria").val()
                number = number * (-1);
                lista["-  " + mercadoria] = number;

                //caso select seja Venda
            } else if (itemSelecionado == "Venda") {
                var mercadoria = $("#mercadoria").val()
                lista["+  " + mercadoria] = number;
            }
        }

        //limpa os inputs
        $("#mercadoria").val("")
        $("#valor").val("")


        // Cria um json e coloca em locaStorage 
        var jsonLista = JSON.stringify(lista);
        window.localStorage.setItem('lista', jsonLista);

        //Atualiza a lista de transações
        atualizarFinal()
    });
    //********************************************************************************* */


    




});