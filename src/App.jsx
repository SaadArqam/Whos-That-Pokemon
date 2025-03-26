import { useState,useEffect } from "react";

function WhosThatPokemon() {

  const [pokemon, setPokemon] = useState(null);

  const [guess, setGuess] = useState("");

  const[message,setMessage]=useState("")
  
  const [reveal, setReveal] = useState(false);


  async function fetchPokemon() {
  let id=Math.floor(Math.random()*1025)+1
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  let data = await response.json()
    setPokemon(data)
    setGuess("")
    setMessage("")
    setReveal(false)
  }

  useEffect(() => { fetchPokemon(); }, []);

  const checkGuess = () => {
    if (guess.toLowerCase()===pokemon.name) {
      setMessage("Yay you guessed it correct!! 🥳🥳🥳🥳")
      setReveal(true)
    }
    else {
      setMessage("NO try again 😭😭😭")
    }
  }

  

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>Who's That Pokémon</h1>
      {pokemon && (
                <>
                    <img src={pokemon.sprites.front_default} alt="Guess the Pokémon" style={{width: "200px", filter: reveal ? "none" : "brightness(0%)" }} />
                    <div>
                        <input value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="Enter Pokémon name..." />
                        <button onClick={checkGuess}>Guess</button>
                    </div>
                    <p>{message}</p>
                    <button onClick={fetchPokemon}>Next Pokémon</button>
                </>
            )}
      </div>
      
    </>
    );
}

export default WhosThatPokemon;

