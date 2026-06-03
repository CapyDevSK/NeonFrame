const carrinhoContainer = document.querySelector(".carrinho-container");
const totalCarrinho = document.querySelector("#totalCarrinho");

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function renderizarCarrinho() {

    carrinhoContainer.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, index) => {

        total += item.preco * item.quantidade;

        carrinhoContainer.innerHTML += `
            <div class="item-carrinho">

                <img src="${item.imagem}" alt="${item.titulo}">

                <div class="info-carrinho">

                    <h3>${item.titulo}</h3>

                    <p>Preço: R$ ${item.preco.toFixed(2)}</p>

                    <div class="quantidade">

                        <button onclick="diminuirQuantidade(${index})">-</button>

                        <span>${item.quantidade}</span>

                        <button onclick="aumentarQuantidade(${index})">+</button>

                    </div>

                    <button class="btn-remover" onclick="removerItem(${index})">
                        Remover
                    </button>

                </div>

            </div>
        `;
    });

    totalCarrinho.innerHTML = `
        Total: R$ ${total.toFixed(2)}
    `;

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function aumentarQuantidade(index) {
    carrinho[index].quantidade++;

    renderizarCarrinho();
}

function diminuirQuantidade(index) {

    if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade--;
    }

    renderizarCarrinho();
}

function removerItem(index) {

    carrinho.splice(index, 1);

    renderizarCarrinho();
}

renderizarCarrinho();