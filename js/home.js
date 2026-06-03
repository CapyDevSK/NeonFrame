const secaoCartaz = document.querySelector(".cartaz");
const filmesSalvos = JSON.parse(localStorage.getItem("filmes")) || [];
filmesSalvos.forEach((filme, index) => {
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

                <button onclick="salvarFilme(${index})" class="bnt-detalhes">Ver detalhes</button>
            </div>
        </div>
    `;
});
function salvarFilme(index) {
    localStorage.setItem("filmeSelecionado", JSON.stringify(filmesSalvos[index]));

    window.location.href = "detalhes.html";
}