let currentyPage = 0
let limit = 1
const pokemonStatus = document.getElementById("pokemonStatus")
const MAX_POKEMON = 1

function createListOfTypes(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type ${typeSlot.type.name}">${typeSlot.type.name}</li>`)
}

function createResumeStatus(pokemon) {
    pokemon.height /= 10
    pokemon.weight /= 10

    return `
            <div class="content-status ${pokemon.types[0].type.name}">
                <section class="start-pokemon">
                    <div class="button-status">
                        <a href="index.html"><i class="fa-solid fa-arrow-left"></i></a>
                        <span>${pokemon.name}</span>
                    </div>
                    <span class="status-number">#${pokemon.id}</span>
                </section>
                <div class="image-status">
                    <div class="pokebola">
                        <img src="./assets/image/Pokeball-PNG-Free-Download.png" alt="">
                    </div>
                    <img src="${pokemon.sprites.other["official-artwork"].front_default}"
                        alt="">
                </div>
                <section class="container-status">
                    <div class="type-status">
                        <div class="types">
                            ${createListOfTypes(pokemon.types).join(" ")}
                        </div>
                        <div class="about">
                        <div class="weight-about">
                            <i class="fa-solid fa-weight-hanging"></i>
                            <span>${pokemon.weight} KG</span>
                            <p>Weight</p>
                        </div>
                        <div class="line"></div>
                        <div class="height-about">
                            <i class="fa-solid fa-ruler-vertical"></i>
                            <span>${pokemon.height} m</span>
                            <p>Height</p>
                        </div>
                        <div class="line"></div>
                        <div class="moves-about">
                            <span>${pokemon.abilities[0].ability.name}</span>
                            <p>moves</p>
                        </div>
                    </div>
                    <h4>Status</h4>
                    <div>
                        <ol class="base-status">
                            <li class="status-pokemon">
                                <span>HP</span>
                                <span>ATK</span>
                                <span>DEF</span>
                                <span>SATK</span>
                                <span>SDEF</span>
                                <span>SPD</span>
                            </li>
                            <li class="line-status"></li>
                            <li class="status-row">
                                <span>${pokemon.stats[0].base_stat}</span>
                                <span>${pokemon.stats[1].base_stat}</span>
                                <span>${pokemon.stats[2].base_stat}</span>
                                <span>${pokemon.stats[3].base_stat}</span>
                                <span>${pokemon.stats[4].base_stat}</span>
                                <span>${pokemon.stats[5].base_stat}</span>
                            </li>
                            <li class="status-bar">
                                <span class="bar ${pokemon.types[0].type.name}"></span>
                                <span class="bar ${pokemon.types[0].type.name}"></span>
                                <span class="bar ${pokemon.types[0].type.name}"></span>
                                <span class="bar ${pokemon.types[0].type.name}"></span>
                                <span class="bar ${pokemon.types[0].type.name}"></span>
                                <span class="bar ${pokemon.types[0].type.name}"></span>
                            </li>
                        </ol>
                    </div>        
                </div>
            </section>
        </div>
    `
}

function getPokemonIdOnUrl() {
    const url = new URL(window.location);
    const pokemonId = parseInt(url.searchParams.get("pokemon")) - 1
    currentyPage = pokemonId

    return currentyPage
}

function startApi(offset, limit = 1) {
    pokeApi.getPokemons(offset, limit = 1).then((pokemons = []) => {
        pokemonStatus.innerHTML = pokemons.map((createResumeStatus)).join(" ")
    })
}

document.querySelector(".button-previous").addEventListener("click", () => {
    if (currentyPage > 0) {
        currentyPage -= 1
    }
    startApi(currentyPage * MAX_POKEMON)
})

document.querySelector(".button-next").addEventListener("click", () => {
    currentyPage += 1
    startApi(currentyPage * MAX_POKEMON)
})

startApi(getPokemonIdOnUrl())