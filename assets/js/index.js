
//sistema de login:

if (!localStorage.getItem("usuario")) {
  localStorage.setItem("usuario", JSON.stringify({
    usuario: "Joaozinho",
    senha: "Senha123"
  }));
} // salva um usuário de exemplo no localStorage


if (localStorage.getItem("logado") === "true") {
    window.location.href = "catalogo.html"; // redireciona para a página principal se já estiver logado
}

const form = document.getElementById("inputsLogin");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // impede recarregar a página

    const usuarioDigitado = document.getElementById("usuarioInput").value;
    const senhaDigitada = document.getElementById("senhaInput").value;

    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    if (
        usuarioDigitado === usuarioSalvo.usuario &&
        senhaDigitada === usuarioSalvo.senha
    ) {
        alert("Login realizado com sucesso!");
        
        // salvar sessão
        localStorage.setItem("logado", "true");

        // redirecionar
        window.location.href = "catalogo.html";
    } else {
        alert("Usuário ou senha incorretos!");
    }
});
