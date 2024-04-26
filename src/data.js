const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokemonIDs = [];
const pokemons = [];

class Pokemon {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}

function initpokemonIDsArray() {
  while (pokemonIDs.length < 12) {
    const id = Math.floor(Math.random() * 1025);
    if (!pokemonIDs.includes(id)) {
      pokemonIDs.push(id);
    }
  }
}

export async function fetchCharacters() {
  try {
    initpokemonIDsArray();
    console.log(pokemonIDs);
    for (const id of pokemonIDs) {
      const response = await fetch(`${baseUrl}${id}`);
      const data = await response.json();
      const name = data.name;
      const url = data.sprites.front_default;
      const pokemon = new Pokemon(name, url);
      if (!pokemons.includes(pokemon)) pokemons.push(pokemon);
    }

    console.log(pokemons);
    console.log(pokemons.length);
    return pokemons;
  } catch (e) {
    console.log(e);
  }
}
//fetchCharacters();
