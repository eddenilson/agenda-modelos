var bd = openDatabase("myA", "1.0", "Minha agenda", 4080);
var listaDias = [];
listaPeriodoBd = [
    "segundaManha",
    "segundaTarde",
    "segundaNoite ",
    "terçaManha",
    "terçaTarde",
    "terçaNoite",
    "quartaManha",
    "quartaTarde",
    "quartaNoite",
    "quintaManha",
    "quintaTarde",
    "quintaNoite",
    "sextaManha",
    "sextaTarde",
    "sextaNoite",
    "sabadoManha",
];
listaPeriodosId = [
    "seg-m",
    "seg-t",
    "seg-n",
    "ter-m",
    "ter-t",
    "ter-n",
    "qua-m",
    "qua-t",
    "qua-n",
    "qui-m",
    "qui-t",
    "qui-n",
    "sex-m",
    "sex-t",
    "sex-n",
    "sab-m",
];

var listaServiços = [];
bd.transaction(function (criar) {
    criar.executeSql(
        "CREATE TABLE clientes (nome TEXT,telefone TEXT, email TEXT, segundaManha BIT, segundaTarde BIT, segundaNoite BIT, terçaManha BIT, terçaTarde BIT, terçaNoite BIT, quartaManha Bit, quartaTarde BIT, quartaNoite BIT, quintaManha BIT, quintaTarde BIT, quintaNoite BIT, sextaManha BIT, sextaTarde BIT, sextaNoite BIT, sabadoManha BIT, Escova BIT, Hidratação BIT, Colorir BIT, Corte BIT, Colorimetria BIT, Maquiagem BIT, Depilação BIT, Manicure BIT)"
    );
});

for (let dias = 0; dias < 6; dias++) {
    listaDias.push([false, false, false]);
}

for (let nServiço = 0; nServiço < 8; nServiço++) {
    listaServiços.push(false);
}

function upArrayInfos(nome, telefone, email) {
    let arrayInfos = [nome, telefone, email];
    for (let dias = 0; dias < 5; dias++) {
        for (let periodos = 0; periodos < 3; periodos++) {
            arrayInfos.push(listaDias[dias][periodos]);
        }
    }
    arrayInfos.push(listaDias[5][0]);
    for (let nServiço = 0; nServiço < 8; nServiço++) {
        arrayInfos.push(listaServiços[nServiço]);
    }
    return arrayInfos;
}

function salvarCliente() {
    window.location.reload(false);
    const nome = document.getElementById("nomeUsuario").value;
    const telefone = document.getElementById("telefoneUsuario").value;
    const email = document.getElementById("emailUsuario").value;
    let arrayInfos = upArrayInfos(nome, telefone, email);
    bd.transaction(function (inserir) {
        inserir.executeSql(
            "INSERT INTO clientes (nome, telefone, email, segundaManha, segundaTarde, segundaNoite , terçaManha, terçaTarde, terçaNoite, quartaManha, quartaTarde, quartaNoite, quintaManha, quintaTarde, quintaNoite, sextaManha, sextaTarde, sextaNoite, sabadoManha, Escova, Hidratação, Colorir, Corte, Colorimetria, Maquiagem, Depilação, Manicure) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            arrayInfos
        );
    });
    window.location.reload(false);
}

function mudaStatusDia(id, nDia, nPeriodo) {
    if (listaDias[nDia][nPeriodo]) {
        document.getElementById(id).style.backgroundColor = "rgb(133, 99, 228)";
    } else {
        document.getElementById(id).style.backgroundColor = "#76ec4b";
    }

    atualizaListaDias(nDia, nPeriodo);
    return listaDias;
}

function atualizaListaDias(nDia, nPeriodo) {
    listaDias[nDia][nPeriodo] = !listaDias[nDia][nPeriodo];
}

function mudaStatusServiços(id, nServiço) {
    const servicoBox = document.getElementById(id);
    if (!listaServiços[nServiço]) {
        listaServiços[nServiço] = true;
        servicoBox.style.backgroundColor = "#76ec4b";
    } else {
        servicoBox.style.backgroundColor = "rgb(133, 99, 228)";
        listaServiços[nServiço] = false;
    }
    console.log(listaServiços);
}

function preenchaSemana(periodoBD, periodoId) {
    const periodoBox = document.getElementById(periodoId);
    if (periodoBD == "false") {
        periodoBox.style.backgroundColor = "red";
        console.log("red");
    } else {
        periodoBox.style.backgroundColor = "green";
        console.log("green");
    }
}

function PesquisaBD() {
    let nome = document.getElementById("bd").value;
    bd.transaction(function (ler) {
        ler.executeSql(
            `SELECT * FROM clientes WHERE nome = "${nome}"`,
            `SELECT * FROM clientes WHERE nome = "${nome}"`,
            [],
            function (ler, results) {
                var len = results.rows.length,
                    i;
                msg = "<p>Found rows: " + len + "<p/>";
                document.getElementById("resposta").innerHTML += msg;

                for (let i = 0; i < len; i++) {
                    document.getElementById("resposta").innerHTML =
                        results.rows.item(i).nome +
                        " " +
                        results.rows.item(i).telefone +
                        " " +
                        results.rows.item(i).email;

                    for (let j = 0; j < 16; j++) {
                        preenchaSemana(
                            results.rows.item(i)[listaPeriodoBd[j]],
                            listaPeriodosId[j]
                        );
                    }
                    preenchaSemana(results.rows.item(i).segundaManha);
                }
            },
            null
        );
    });
}
