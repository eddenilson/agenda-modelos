let autorizacao = false;
const login = document.getElementById("usuario").value;
const senha = document.getElementById("senha").value;

function autorizarIntrutor() {
    if (!autorizacao) {
        if (login == "instrutorA" && senha == "senac11") {
            autorizacao = true;
        } else {
            document.getElementById("noAutoriza").value = "Senha Incorreta";
        }
    }
}
