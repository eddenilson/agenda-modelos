desautorizarCookie();

function autorizarIntrutor() {
    const login = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    if (login == "instrutorA" && senha == "senac11") {
        autorizarCookie();
    } else {
        loginNegado()
    }
}


function autorizarCookie() {
    document.cookie = "authorizationInstrutor=true; SameSite=None; Secure";
    redirect();
}
function loginNegado() {
    const erroDiv = document.getElementById("erro")
    erroDiv.innerText = "Informações inválidas!"
    erroDiv.style.color = "red"
    erroDiv.style.textAlign = "center"
}
function desautorizarCookie() {
    let authorization = document.cookie
        .split(`; `)
        .find((cookie) => cookie.startsWith("authorizationInstrutor="))
        ?.split("=")[1];
    if (authorization != "true") {
        document.cookie = "authorizationInstrutor=false; SameSite=None; Secure";
    }
    redirect();
}

function redirect() {
    let authorization = document.cookie
        .split(`; `)
        .find((cookie) => cookie.startsWith("authorizationInstrutor="))
        ?.split("=")[1];
    let currentLocation = document.getElementById("id").innerHTML;
    if (authorization == "true" && currentLocation == "login") {
        redirectPesquisa();
    } else if (authorization == "false" && currentLocation == "pesquisa") {
        redirectLogin();
    }
}

function redirectPesquisa() {
    window.location = "pesquisaBD.html";
}

function redirectLogin() {
    window.location = "loginPagina.html";
}
function logout() {
    document.cookie = "authorizationInstrutor=false; SameSite=None; Secure";
    redirectLogin();
}
