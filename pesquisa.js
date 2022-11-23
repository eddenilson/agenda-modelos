function pesquisarDiasServiços() {
    bd.transaction(function (pesquisar) {
        pesquisar.executeSql(
            "SELECT * FROM clientes",
            [],
            function (selecionarClientes, resultados) {
                document.getElementById("resposta-ocorrencias").innerHTML = "";
                for (let i = 0; i < resultados.rows.length; i++) {
                    let item = resultados.rows.item(i);

                    let clienteCorresponde = true;
                    for (let j = 0; j < listaPeriodosId.length; j++) {
                        if (
                            document.getElementById(listaPeriodosId[j]).style
                                .backgroundColor == corMarcada &&
                            item[listaPeriodosBd[j]] == "false"
                        ) {
                            clienteCorresponde = false;
                            break;
                        }
                    }
                    for (let j = 0; j < listaServicosId.length; j++) {
                        if (
                            document.getElementById(listaServicosId[j]).style
                                .backgroundColor == corMarcada &&
                            item[listaServicosBd[j]] == "false"
                        ) {
                            clienteCorresponde = false;
                            break;
                        }
                    }
                    if (clienteCorresponde) {
                        document.getElementById(
                            "resposta-ocorrencias"
                        ).innerHTML += `nome: ${item.nome}, telefone: ${item.telefone}, email: ${item.email}\n`;
                    }
                }
            }
        );
    });
}
