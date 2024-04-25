import { useState, useEffect } from "react";
import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";
//import { fetchCharacters } from "./data";
import "./App.css";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
let pokemons = [];

class Pokemon {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [deck, setDeck] = useState([]);

  let pokemonIDs = [];

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      initIdArray();
      try {
        for (const id of pokemonIDs) {
          const response = await fetch(`${BASE_URL}${id}`);
          const data = await response.json();
          const name = data.name;
          const url = data.sprites.front_default;
          const pokemon = new Pokemon(name, url);
          if (!pokemons.includes(pokemon)) {
            pokemons.push(pokemon);
          }
          if (!deck.includes(pokemon)) {
            setDeck((oldDeck) => [...oldDeck, pokemon]);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
    console.log(pokemons);

    return () => {
      pokemons = [];
      setDeck(() => []);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   randomizePokemon();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [deck]);

  function initIdArray() {
    while (pokemonIDs.length < 12) {
      const id = Math.floor(Math.random() * 1025);
      if (!pokemonIDs.includes(id)) {
        pokemonIDs.push(id);
      }
    }
  }

  function randomizePokemon() {
    let currentIndex = pokemons.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [pokemons[currentIndex], pokemons[randomIndex]] = [
        pokemons[randomIndex],
        pokemons[currentIndex],
      ];
    }
    let randomizedDeck = pokemons.slice();
    setDeck(randomizedDeck);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Scoreboard
        currentScore={currentScore}
        setCurrentScore={setCurrentScore}
        highScore={highScore}
        setHighScore={setHighScore}
      />
      <div className="grid">
        {/* {pokemons.map((pokemon) => {
          return (
            <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />
          );
        })} */}
        {deck.map((pokemon) => {
          return (
            <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />
          );
        })}
      </div>
      <button onClick={randomizePokemon}>randomize</button>
      <button onClick={() => setDeck(() => [])}>hi</button>
    </div>
  );
}

export default App;
