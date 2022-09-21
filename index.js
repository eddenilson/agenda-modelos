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