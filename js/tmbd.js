const secaoTMDB = document.querySelector(".tmdb-filmes");

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTZkMmI2NDBlNGJjNmI2NzgzODY3NmVlMWVmNTQ1MyIsIm5iZiI6MTc4MDQzODc2NS40MDEsInN1YiI6IjZhMWY1NmVkYmNiZDM3ODcxNzFlNzUyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lMRfGJz4c1OJYmMQVFCogyBZ58ZXMLG_9pXGT5j9Os8";

async function carregarFilmesTMDB() {
    const resposta = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&region=BR",
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        }
    );

    const dados = await resposta.json();

    console.log(dados);

    dados.results.slice(0, 8).forEach(filme => {
        const poster = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;

        const sinopseCurta = filme.overview.length > 120
            ? filme.overview.substring(0, 120) + "..."
            : filme.overview;

        secaoTMDB.innerHTML += `
            <div class="card-filme">

                <img src="${poster}" alt="${filme.title}">

                <div class="info-filme">

                    <h3>${filme.title}</h3>

                    <p>${filme.release_date}</p>

                    <p>${sinopseCurta}</p>

                    <button onclick="abrirDetalhesTMDB(${filme.id})" class="btn-detalhes"> Ver detalhes </button>

                </div>

            </div>
        `;
    });
}

carregarFilmesTMDB();

const btnVoltar = document.querySelector("#btnVoltarTMDB");
const btnAvancar = document.querySelector("#btnAvancarTMDB");

btnAvancar.addEventListener("click", () => {
    secaoTMDB.scrollLeft += 350;
});

btnVoltar.addEventListener("click", () => {
    secaoTMDB.scrollLeft -= 350;
});

function abrirDetalhesTMDB(id) {
    localStorage.setItem("filmeSelecionadoId", id);
    window.location.href = "detalhes.html";
}