var bd = openDatabase("myA", "1.0", "Minha agenda", 4080);
var listaDias = [];
let corMarcada = "rgb(69, 191, 24)";

let corDesmarcada = "rgb(12, 163, 218)";
listaPeriodosBd = [
    "segundaManha",
    "segundaTarde",
    "segundaNoite",
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
listaServicosBd = [
    "Escova",
    "Hidratação",
    "Colorir",
    "Corte",
    "Colorimetria",
    "Maquiagem",
    "Depilação",
    "Manicure",
];
listaServicosId = [
    "botaoEscova",
    "botaoHidratação",
    "botaoColorir",
    "botaoCorte",
    "botaoColorimetria",
    "botaoMaquiagem",
    "botaoDepilação",
    "botaoManicure",
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
        document.getElementById(id).style.backgroundColor = "rgb(52, 27, 217)";
    } else {
        document.getElementById(id).style.backgroundColor = "#45bf18";
    }

    atualizaListaDias(nDia, nPeriodo);
    return listaDias;
}

function atualizaListaDias(nDia, nPeriodo) {
    listaDias[nDia][nPeriodo] = !listaDias[nDia][nPeriodo];
}

function atualizaListaServiços(nServiço, listaServiços) {
    listaServiços[nServiço] = !listaServiços[nServiço];
}

function mudaStatusServiços(id, nServiço) {
    const servicoBox = document.getElementById(id);
    if (!listaServiços[nServiço]) {
        listaServiços[nServiço] = true;
        servicoBox.style.backgroundColor = corMarcada;
    } else {
        servicoBox.style.backgroundColor = corDesmarcada;
        listaServiços[nServiço] = false;
    }
    console.log(listaServiços);
}

function preenchaSemana(periodoBD, periodoId) {
    console.log(periodoBD, periodoId);
    const periodoBox = document.getElementById(periodoId);
    if (periodoBD == "false") {
        periodoBox.style.backgroundColor = "rgb(52, 27, 217)";
    } else {
        periodoBox.style.backgroundColor = "#45bf18";
    }
}
function preenchaServico(servicoBD, servicoId) {
    console.log(servicoBD, servicoId);
    const servicoBox = document.getElementById(servicoId);
    if (servicoBD == "false") {
        servicoBox.style.backgroundColor = corDesmarcada;
    } else {
        servicoBox.style.backgroundColor = corMarcada;
    }
}

function avançaCadastro() {
    window.location = "Cadastro.html";
}

function avançaLoginPagina() {
    window.location = "loginPagina.html";
}
