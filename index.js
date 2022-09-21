var bd = openDatabase("myA", "1.0", "Minha agenda", 4080);

bd.transaction(function(criar){
    criar.executeSql("CREATE TABLE clientes (nome TEXT,telefone TEXT, email TEXT)");
});

function salvarCliente(){
    window.location.reload(false);
    console.log("11")
    const nome = document.getElementById("nomeUsuario").value;
    const telefone = document.getElementById("telefoneUsuario").value;
    const email = document.getElementById("emailUsuario").value;

    bd.transaction(function(inserir){
        inserir.executeSql("INSERT INTO clientes (nome, telefone, email) VALUES(?, ?, ?)", [nome, telefone, email]);
    });
    console.log(nome, telefone, email)
};



var listaDias = [];
for(let dias=0; dias<6; dias++){
    listaDias.push([false,false,false])
};
console.log(listaDias);

function mudaStatusDia(id, nDia, nPeriodo){
    if(listaDias[nDia][nPeriodo]){
        document.getElementById(id).style.backgroundColor = "white";
    }else{
        document.getElementById(id).style.backgroundColor = "green";

    }

    atualizaListaDias(nDia, nPeriodo);
    console.log(listaDias);
};

function atualizaListaDias(nDia, nPeriodo){
    listaDias[nDia][nPeriodo]=!listaDias[nDia][nPeriodo];
};