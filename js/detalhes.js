const detalhesFilme = document.querySelector("#detalhesFilme");

const filme = JSON.parse(localStorage.getItem("filmeSelecionado"));

if(filme){
    detalhesFilme.inner=`
    <div class="detalhes-card">
        <img src="${filme.imagem}" alt="${filme.titulo}">

        <div class="detalhes-info">
        <h2>${filme.titulo}</h2>
        <P><strong>Gênero:</strong> ${filme.genero}</p>
                <p><strong>Classificação:</strong> ${filme.classificacao}</p>
                <p><strong>Duração:</strong> ${filme.duracao}</p>
                <p><strong>Sinopse:</strong> ${filme.sinopse}</p>

                <button>Adicionar ao carrinho</button>
            </div>
        </div>
    `;
} else {
    detalhesFilme.innerHTML = "<p>Nenhum filme selecionado.</p>";
}