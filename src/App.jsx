import { useState,useEffect } from "react";

function whosThatPokemon() {

  const [pokemon, setPokemon] = useState(null);

  const [guess, setGuess] = useState("");
  
  const [reveal, setReveal] = useState(false);
  
  async function fetchPokemon() {
  let id=Math.floor(Math.random()*1025)+1
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  let data = await response.json()
    setPokemon(data)
    setGuess("")
    setReveal(false)
}

  return (
    <>
      <h1>Who's That Pokemon</h1>
      <img src={pokemon.sprite} />

    </>
    );
}

export default whosThatPokemon;

