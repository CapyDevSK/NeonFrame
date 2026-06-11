const detalhesFilme = document.querySelector("#detalhesFilme");
const postsAPI = document.querySelector(".posts-api");

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTZkMmI2NDBlNGJjNmI2NzgzODY3NmVlMWVmNTQ1MyIsIm5iZiI6MTc4MDQzODc2NS40MDEsInN1YiI6IjZhMWY1NmVkYmNiZDM3ODcxNzFlNzUyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lMRfGJz4c1OJYmMQVFCogyBZ58ZXMLG_9pXGT5j9Os8";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const filmeId = localStorage.getItem("filmeSelecionadoId");

async function carregarDetalhes() {
    try {
        if (!filmeId) {
            detalhesFilme.innerHTML = "<p>Nenhum filme selecionado.</p>";
            return;
        }

        const resposta = await fetch(
            `https://api.themoviedb.org/3/movie/${filmeId}?language=pt-BR`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro ao buscar detalhes do filme.");
        }

        const filme = await resposta.json();

        localStorage.setItem("filmeSelecionado", JSON.stringify(filme));

        const poster = filme.poster_path
            ? `${IMG_URL}${filme.poster_path}`
            : "img/sem-poster.png";

        detalhesFilme.innerHTML = `
            <div class="detalhes-card">
                <img src="${poster}" alt="${filme.title}">

                <div class="detalhes-info">
                    <h2>${filme.title}</h2>

                    <p><strong>Lançamento:</strong> ${filme.release_date || "Data não informada"}</p>
                    <p><strong>Duração:</strong> ${filme.runtime || "Não informada"} min</p>
                    <p><strong>Avaliação:</strong> ⭐ ${filme.vote_average ? filme.vote_average.toFixed(1) : "Sem avaliação"}</p>
                    <p><strong>Sinopse:</strong> ${filme.overview || "Sinopse não disponível."}</p>

                    <button class="btn-carrinho" onclick="adicionarAoCarrinho()">
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        `;
    } catch (erro) {
        console.error(erro);
        detalhesFilme.innerHTML = "<p>Erro ao carregar detalhes do filme.</p>";
    }
}

function carregarPosts() {
    const posts = [
        {
            title: "A magia da tela grande",
            body: "O cinema transforma histórias em experiências com som, imagem e emoção."
        },
        {
            title: "Lançamentos em destaque",
            body: "Acompanhar estreias é uma das melhores partes da experiência cinematográfica."
        },
        {
            title: "Cinema também é tecnologia",
            body: "Sistemas digitais facilitam a escolha de filmes e a compra de ingressos."
        },
        {
            title: "Pipoca, filme e emoção",
            body: "A experiência vai além da tela: envolve ambiente, comida e boas histórias."
        }
    ];

    postsAPI.innerHTML = "";

    posts.forEach(post => {
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
        const poster = filme.poster_path
            ? `${IMG_URL}${filme.poster_path}`
            : "img/sem-poster.png";

        carrinho.push({
            id: filme.id,
            titulo: filme.title,
            imagem: poster,
            preco: 29.90,
            quantidade: 1
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    window.location.href = "carrinho.html";
}

carregarDetalhes();
carregarPosts();