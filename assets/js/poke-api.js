let isRequesting = false

const pokeApi = {
    getPokemons: async (offset = 0, limit = 12) => {
        if (isRequesting) return
        isRequesting = true;
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        try {
            const response = await fetch(url)
            if (response.status !== 200) throw new Error("Não foi possivel encontrar o pokemon solicitado!")
            const jsonBody = await response.json()
            const pokemonsRequest = jsonBody.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json()))
            const pokemonData = await Promise.all(pokemonsRequest)
            return pokemonData
        }
        catch (err) {
            return console.error(err);
        }
        finally {
            isRequesting = false;
        }
    }
}
