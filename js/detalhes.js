const detalhesFilme = document.querySelector("#detalhesFilme");
const postsAPI = document.querySelector(".posts-api");

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTZkMmI2NDBlNGJjNmI2NzgzODY3NmVlMWVmNTQ1MyIsIm5iZiI6MTc4MDQzODc2NS40MDEsInN1YiI6IjZhMWY1NmVkYmNiZDM3ODcxNzFlNzUyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lMRfGJz4c1OJYmMQVFCogyBZ58ZXMLG_9pXGT5j9Os8";
const filmeId = localStorage.getItem("filmeSelecionadoId");

async function carregarDetalhes() {
    const resposta = await fetch(
        `https://api.themoviedb.org/3/movie/${filmeId}?language=pt-BR`,
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        }
    );

    const filme = await resposta.json();

    localStorage.setItem("filmeSelecionado", JSON.stringify(filme));

    detalhesFilme.innerHTML = `
        <div class="detalhes-card">
            <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" alt="${filme.title}">

            <div class="detalhes-info">
                <h2>${filme.title}</h2>

                <p><strong>Lançamento:</strong> ${filme.release_date}</p>
                <p><strong>Duração:</strong> ${filme.runtime} min</p>
                <p><strong>Avaliação:</strong> ⭐ ${filme.vote_average.toFixed(1)}</p>
                <p><strong>Sinopse:</strong> ${filme.overview || "Sinopse não disponível."}</p>

                <button class="btn-carrinho" onclick="adicionarAoCarrinho()">
                    Adicionar ao carrinho
                </button>
            </div>
        </div>
    `;
}

async function carregarPosts() {
    const resposta = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await resposta.json();

    posts.slice(0, 4).forEach(post => {
        postsAPI.innerHTML += `
            <div class="post-card">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `;
    });
}

function adicionarAoCarrinho() {
    const filme = JSON.parse(localStorage.getItem("filmeSelecionado"));

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const itemExistente = carrinho.find(item => item.id === filme.id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            id: filme.id,
            titulo: filme.title,
            imagem: `https://image.tmdb.org/t/p/w500${filme.poster_path}`,
            preco: 29.90,
            quantidade: 1
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    window.location.href = "carrinho.html";
}

carregarDetalhes();
carregarPosts();