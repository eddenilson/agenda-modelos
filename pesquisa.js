function peaquisarDiasServiços() {
    bd.transaction(function (pesquisar) {
        pesquisar.executeSql(
            "SELECT * FROM clientes",
            [],
            function (selecionarClientes, resultados) {
                for (let i = 0; i < resultados.rows.length; i++) {
                    let item = resultados.rows.item(i);
                    document.getElementById(
                        "resposta-ocorrencias"
                    ).innerHTML += `nome: ${item.nome}, telefone: ${item.telefone}, email: ${item.email}\n`;
                }
            }
        );
    });
}
