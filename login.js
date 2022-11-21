desautorizarCookie();

function autorizarIntrutor() {
    const login = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    if (login == "instrutorA" && senha == "senac11") {
        autorizarCookie();
    }
}

function autorizarCookie() {
    document.cookie = "authorizationInstrutor=true; SameSite=None; Secure";
    redirect();
    document.location.reload();
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
    if (authorization == "true") {
        window.location = "pesquisaBD.html";
    } else {
        window.location = "loginPagina.html";
    }
}

function logout() {
    document.cookie = "authorizationInstrutor=false; SameSite=None; Secure";
    redirect();
    document.location.reload();
}
