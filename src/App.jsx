import { useState, useEffect } from "react";

function WhosThatPokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [reveal, setReveal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  async function fetchPokemon() {
    let id = Math.floor(Math.random() * 1025) + 1;
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let data = await response.json();
    setPokemon(data);
    setGuess("");
    setMessage("");
    setReveal(false);
    setTimeLeft(15);
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setReveal(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, pokemon]);

  const checkGuess = () => {
    if (guess.toLowerCase().trim() === pokemon.name) {
      setMessage("Yay you guessed it correct!! 🥳🥳🥳🥳");
      setReveal(true);
    } else {
      setMessage("NO try again 😭😭😭");
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>Who's That Pokémon?</h1>
        <h2>Time Left: {timeLeft} sec</h2>
        {pokemon && (
          <>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt="Guess the Pokémon"
              style={{ width: "400px", filter: reveal ? "none" : "brightness(0%)" }}
            />
            <div>
              <input
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter Pokémon name..."
              />
              <button onClick={checkGuess} disabled={reveal}>Guess</button>
            </div>
            <h2>{message}</h2>
            <button onClick={() => setReveal(true)}>I don't know!</button>
            <button onClick={fetchPokemon}>Next</button>
            {reveal && <h1>It's {pokemon.name}!</h1>}
          </>
        )}
      </div>
    </>
  );
}

export default WhosThatPokemon;