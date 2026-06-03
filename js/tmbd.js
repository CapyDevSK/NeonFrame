const secaoTMDB = document.querySelector(".tmdb-filmes");
const secaoDestaque = document.querySelector(".destaque");
const secaoLancamentos = document.querySelector(".lancamentos");

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTZkMmI2NDBlNGJjNmI2NzgzODY3NmVlMWVmNTQ1MyIsIm5iZiI6MTc4MDQzODc2NS40MDEsInN1YiI6IjZhMWY1NmVkYmNiZDM3ODcxNzFlNzUyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lMRfGJz4c1OJYmMQVFCogyBZ58ZXMLG_9pXGT5j9Os8";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

function criarCard(filme, mostrarData = false) {
    const poster = filme.poster_path
        ? `${IMG_URL}${filme.poster_path}`
        : "img/sem-poster.png";

    const sinopseCurta = filme.overview && filme.overview.length > 120
        ? filme.overview.substring(0, 120) + "..."
        : filme.overview || "Sinopse não disponível.";

    return `
        <div class="card-filme">
            <img src="${poster}" alt="${filme.title}">

            <div class="info-filme">
                <h3>${filme.title}</h3>

                ${mostrarData ? `<p>${filme.release_date || "Data não informada"}</p>` : ""}

                <p>${sinopseCurta}</p>

                <button onclick="abrirDetalhesTMDB(${filme.id})" class="btn-detalhes">
                    Ver detalhes
                </button>
            </div>
        </div>
    `;
}

async function buscarFilmes(url, secao, quantidade, mostrarData = false) {
    try {
        const resposta = await fetch(url, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        });

        if (!resposta.ok) {
            throw new Error("Erro ao buscar filmes.");
        }

        const dados = await resposta.json();

        secao.innerHTML = "";

        dados.results.slice(0, quantidade).forEach(filme => {
            secao.innerHTML += criarCard(filme, mostrarData);
        });

    } catch (erro) {
        console.error(erro);

        secao.innerHTML = `
            <p>Não foi possível carregar os filmes.</p>
        `;
    }
}

function abrirDetalhesTMDB(id) {
    localStorage.removeItem("filmeSelecionado");
    localStorage.setItem("filmeSelecionadoId", id);
    window.location.href = "detalhes.html";
}

const btnVoltar = document.querySelector("#btnVoltarTMDB");
const btnAvancar = document.querySelector("#btnAvancarTMDB");

btnAvancar.addEventListener("click", () => {
    secaoTMDB.scrollLeft += 350;
});

btnVoltar.addEventListener("click", () => {
    secaoTMDB.scrollLeft -= 350;
});

buscarFilmes(
    "https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&region=BR",
    secaoTMDB,
    8,
    true
);

buscarFilmes(
    "https://api.themoviedb.org/3/movie/popular?language=pt-BR&region=BR",
    secaoDestaque,
    3,
    false
);

buscarFilmes(
    "https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&region=BR",
    secaoLancamentos,
    3,
    true
);