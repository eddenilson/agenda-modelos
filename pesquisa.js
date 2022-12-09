function PesquisaBD() {
    let nome = document.getElementById("bd").value;
    bd.transaction(function (ler) {
        ler.executeSql(
            `SELECT * FROM clientes WHERE nome = "${nome}"`,
            [],
            function (ler, results) {
                var len = results.rows.length,
                    i;
                msg = "<p>Found rows: " + len + "<p/>";
                document.getElementById("resposta").innerHTML += msg;

                for (let i = 0; i < len; i++) {
                    exibeInfos(
                        results.rows.item(i).nome,
                        results.rows.item(i).telefone,
                        results.rows.item(i).email
                    );

                    for (let j = 0; j < 16; j++) {
                        preenchaSemana(
                            results.rows.item(i)[listaPeriodosBd[j]],
                            listaPeriodosId[j] + "-exibe"
                        );
                    }
                    for (let m = 0; m < 8; m++) {
                        preenchaServico(
                            results.rows.item(i)[listaServicosBd[m]],
                            listaServicosId[m] + "-exibe"
                        );
                    }
                }
            },
            null
        );
    });
}

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
                        ).innerHTML += `<p onclick="exibePessoaSelecionada('${item.nome}', '${item.telefone}', '${item.email}')">nome: ${item.nome}, telefone: ${item.telefone}, email: ${item.email}</p>`;
                    }
                }
            }
        );
    });
}
function PesquisaBDCompleto(nome, telefone, email) {
    bd.transaction(function (ler) {
        ler.executeSql(
            `SELECT * FROM clientes WHERE nome = "${nome}" AND telefone = "${telefone}" AND email = "${email}" `,
            [],
            function (ler, results) {
                var len = results.rows.length,
                    i;
                msg = "<p>Found rows: " + len + "<p/>";
                document.getElementById("resposta").innerHTML += msg;
                exibeInfos(
                    results.rows.item(i).nome,
                    results.rows.item(i).telefone,
                    results.rows.item(i).email
                );
                for (let i = 0; i < len; i++) {
                    for (let j = 0; j < 16; j++) {
                        preenchaSemana(
                            results.rows.item(i)[listaPeriodosBd[j]],
                            listaPeriodosId[j] + "-exibe"
                        );
                    }
                    for (let m = 0; m < 8; m++) {
                        preenchaServico(
                            results.rows.item(i)[listaServicosBd[m]],
                            listaServicosId[m] + "-exibe"
                        );
                    }
                }
            },
            null
        );
    });
}
function exibeInfos(nome, telefone, email) {
    document.getElementById(
        "resposta"
    ).innerHTML = `Nome: ${nome}; Telefone: ${telefone}; E-mail: ${email}`;
}

function exibePessoaSelecionada(nome, telefone, email) {
    PesquisaBDCompleto(nome, telefone, email);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}
