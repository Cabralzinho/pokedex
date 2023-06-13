let currentyPage = 0
const pokemonList = document.getElementById("pokemonsList")
const MAX_POKEMON = 12

function createListOfTypes(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type ${typeSlot.type.name}">${typeSlot.type.name}</li>`)
}

function createPlaceHolderCard() {
    const randomDelay = Math.round(Math.random() * 1.5 * 100) / 100;
    return `
        <li class="placeholder-pokecard" style="animation-delay: -${randomDelay}s">
            <div class="placeholder-spans">
                <div class="placeholder-number"></div>
                <div class="placeholder-name"></div>
                <div id="placeholder-types-image">
                    <div class="placeholder-types" id="first-type"></div>
                    <div class="placeholder-types"></div>
                    <div class="placeholder-image"></div>
                </div>
            </div>
        </li>
    `
}

function createPokemonCard(pokemon) {
    return `
        <a id="link-status" href="poke-status.html?pokemon=${pokemon.id}">
            <li class="pokemon ${pokemon.types[0].type.name}">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${createListOfTypes(pokemon.types).join(" ")}
                    </ol>
                    <img src="${pokemon.sprites.other["official-artwork"].front_default}"
                        alt="${pokemon.name}" />
                </div>
            </li>
        </a>
    `
}

function startApi(offset) {
    pokemonList.innerHTML = new Array(MAX_POKEMON).fill().map(() => createPlaceHolderCard()).join(" ")

    pokeApi.getPokemons(offset).then((pokemons = []) => {
        pokemonList.innerHTML = pokemons.map((createPokemonCard)).join(" ")
    })
}

document.querySelector(".previous-button").addEventListener("click", () => {
    if (currentyPage > 0) {
        currentyPage -= 1
    }
    startApi(currentyPage * MAX_POKEMON)
})

document.querySelector(".next-button").addEventListener("click", () => {
    currentyPage += 1
    startApi(currentyPage * MAX_POKEMON)
})

startApi()