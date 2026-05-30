const inputTitulo = document.querySelector("#titulo");
const inputGenero = document.querySelector("#genero");
const inputClassificacao = document.querySelector("#classificacao");
const inputDuracao = document.querySelector("#duracao");
const inputSinopse = document.querySelector("#sinopse");
const inputImagem = document.querySelector("#imagemFilme");
const btnCadastrar = document.querySelector("#btnCadastrar");
const secaoCartaz = document.querySelector(".cartaz");

let filmes = JSON.parse(localStorage.getItem("filmes")) || [];
let indiceEditando = null;

function salvarFilmes() {
    localStorage.setItem("filmes", JSON.stringify(filmes));
}

function limparCampos() {
    inputTitulo.value = "";
    inputGenero.value = "";
    inputClassificacao.value = "";
    inputDuracao.value = "";
    inputSinopse.value = "";
    inputImagem.value = "";
    indiceEditando = null;
    btnCadastrar.textContent = "Cadastrar filme";
}

function renderizarFilmes() {
    secaoCartaz.innerHTML = "";

    filmes.forEach((filme, index) => {
        const sinopseCurta = filme.sinopse && filme.sinopse.length > 120 
        ? filme.sinopse.substring(0, 120) + "..." 
        : filme.sinopse || "";

        secaoCartaz.innerHTML += `
            <div class="card-filme">
                <img src="${filme.imagem}" alt="${filme.titulo}">

                <div class="info-filme">
                    <h3>${filme.titulo}</h3>
                    <p>${filme.genero}</p>
                    <p>${filme.classificacao}</p>
                    <p>${filme.duracao}</p>
                    <p>${sinopseCurta}</p>

                    <button onclick="editarFilme(${index})">Editar</button>
                    <button onclick="excluirFilme(${index})">Excluir</button>
                </div>
            </div>
        `;
    });
}

btnCadastrar.addEventListener("click", function () {
    const titulo = inputTitulo.value;
    const genero = inputGenero.value;
    const classificacao = inputClassificacao.value;
    const duracao = inputDuracao.value;
    const sinopse = inputSinopse.value;
    const arquivo = inputImagem.files[0];

    if (!titulo || !genero || !classificacao || !duracao || !sinopse) {
        alert("Preencha todos os campos!");
        return;
    }

    if (indiceEditando !== null) {
        filmes[indiceEditando].titulo = titulo;
        filmes[indiceEditando].genero = genero;
        filmes[indiceEditando].classificacao = classificacao;
        filmes[indiceEditando].duracao = duracao;
        filmes[indiceEditando].sinopse = sinopse;

        if (arquivo) {
            const leitor = new FileReader();

            leitor.onload = function () {
                filmes[indiceEditando].imagem = leitor.result;
                salvarFilmes();
                renderizarFilmes();
                limparCampos();
            };

            leitor.readAsDataURL(arquivo);
        } else {
            salvarFilmes();
            renderizarFilmes();
            limparCampos();
        }

        return;
    }

    if (!arquivo) {
        alert("Selecione uma imagem!");
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function () {
        const novoFilme = {
            titulo,
            genero,
            classificacao,
            duracao,
            sinopse,
            imagem: leitor.result
        };

        filmes.push(novoFilme);
        salvarFilmes();
        renderizarFilmes();
        limparCampos();
    };

    leitor.readAsDataURL(arquivo);
});

function editarFilme(index) {
    const filme = filmes[index];

    inputTitulo.value = filme.titulo;
    inputGenero.value = filme.genero;
    inputClassificacao.value = filme.classificacao;
    inputDuracao.value = filme.duracao;
    inputSinopse.value = filme.sinopse;

    indiceEditando = index;
    btnCadastrar.textContent = "Salvar alterações";
}

function excluirFilme(index) {
    filmes.splice(index, 1);
    salvarFilmes();
    renderizarFilmes();
}

renderizarFilmes();