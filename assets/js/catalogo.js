
//Lista de produtos:

const produtos = [
  {
    nome: "Tiranossauro Raper",
    preco: "R$ 3.500,00",
    descricao: "Ideal para quem quer curtir um som",
    imagem: "assets/imgs/AuraRex.png",
    alt: "TrexDescolado",
    botaoId: "buttonTrex"
  },
  {
    nome: "Triceratops Descolado",
    preco: "R$ 2.750,00",
    descricao: "Segurança, estabilidade e respeito",
    imagem: "assets/imgs/TriceraTOPPPP.png",
    alt: "Triceratops Maneiro",
    botaoId: "buttonTriceratops"
  },
  {
    nome: "Peterodactilo da Curtição",
    preco: "R$ 3.000,00",
    descricao: "Para aquela resenha maneira",
    imagem: "assets/imgs/Pterozenha.png",
    alt: "Pterossauto da Resenha",
    botaoId: "buttonPterodactilo"
  },
  {
    nome: "Estegossauro Profissa",
    preco: "R$ 4.000,00",
    descricao: "Para quem quer ser um verdadeiro profissional",
    imagem: "assets/imgs/Estegomarra.png",
    alt: "Estegossauro Profissional",
    botaoId: "buttonEstegossauro"
  }
];

//Criador de produtos:

function criarProduto(produto) {
  const divProduto = document.createElement("div");
  divProduto.className = "Dino";

  divProduto.innerHTML = `
    <img class="fotoDino" src="${produto.imagem}" alt="${produto.alt}" width="200">
    <div class="Descrição">
      <p class="NomeDoProduto">${produto.nome}</p>
      <p class="PreçoDoProduto">${produto.preco}</p>
      <p class="DescriçãoDoProduto">${produto.descricao}</p>
      <button type="button" id="${produto.botaoId}">Adicionar ao carrinho</button>
    </div>
  `;

  return divProduto;
}

const lista = document.getElementById("listaProdutos");
produtos.forEach(produto => {
  lista.appendChild(criarProduto(produto));
});

//botão que faz o carrinho aparecer e desaparecer:
const carrinhoButton = document.getElementById('carrinhoButton');
const subaba = document.getElementById('subaba');
carrinhoButton.addEventListener('click', () => {
  if (subaba.style.display === 'none' || subaba.style.display === '') {
    subaba.style.display = 'block';
  } else {
    subaba.style.display = 'none';
  }
});


//carrinho de compras:
const carrinho = document.getElementById('listacarrinho');
let totalCarrinho = 0;

// objeto para guardar quantidades
const quantidades = {};

function adicionarAoCarrinho(produto) {
  // inicializa quantidade se não existir
  if (!quantidades[produto.nome]) {
    quantidades[produto.nome] = 0;
  }
  quantidades[produto.nome]++;

  // procura item no carrinho
  let item = carrinho.querySelector(`li[data-produto="${produto.nome}"]`);

  if (!item) {
    item = document.createElement('li');
    item.dataset.produto = produto.nome;
    item.textContent = `${produto.nome} - ${produto.preco} - x${quantidades[produto.nome]}`;

    const buttonRemover = document.createElement('button');
    buttonRemover.textContent = 'Remover';

    buttonRemover.addEventListener('click', () => {
      if (quantidades[produto.nome] > 0) {
        quantidades[produto.nome]--;
        totalCarrinho -= parseFloat(produto.preco.replace(/[^\d,]/g, '').replace(',', '.'));

        if (quantidades[produto.nome] === 0) {
          carrinho.removeChild(item);
        } else {
          item.firstChild.textContent = `${produto.nome} - ${produto.preco} - x${quantidades[produto.nome]}`;
        }

        document.getElementById('totalCarrinho').textContent = `Total: R$ ${totalCarrinho.toFixed(2)}`;
      }
    });

    item.appendChild(buttonRemover);
    carrinho.appendChild(item);
  } else {
    item.firstChild.textContent = `${produto.nome} - ${produto.preco} - x${quantidades[produto.nome]}`;
  }

  // soma ao total do carrinho
  totalCarrinho += parseFloat(produto.preco.replace(/[^\d,]/g, '').replace(',', '.'));
  document.getElementById('totalCarrinho').textContent = `Total: R$ ${totalCarrinho.toFixed(2)}`;
}

// vincula os botões automaticamente
produtos.forEach(produto => {
  const botao = document.getElementById(produto.botaoId);
  botao.addEventListener('click', () => adicionarAoCarrinho(produto));
});

//botão para fechar o carrinho:
const fecharCarrinho = document.getElementById('fecharCarrinho');
fecharCarrinho.addEventListener('click', () => {
  subaba.style.display = 'none';
});
//verifica se o usuário está logado, se não estiver, redireciona para a página de login:
if (localStorage.getItem("logado") !== "true") {
    window.location.href = "index.html";
}

//função de logout:
function logout() {
    localStorage.setItem("logado", "false"); // limpa a sessão
    alert("Logout realizado com sucesso!");
    window.location.href = "index.html"; // redireciona para a página de login
}

//define nome do usuário logado:
const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
document.getElementById("nomeUsuario").textContent = usuarioSalvo.usuario;