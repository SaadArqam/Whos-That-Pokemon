import { useState, useEffect } from "react";

function WhosThatPokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [reveal, setReveal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(true);

  async function fetchPokemon() {
    let id = Math.floor(Math.random() * 1025) + 1;
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let data = await response.json();
    setPokemon(data);
    setGuess("");
    setMessage("");
    setReveal(false);
    setTimeLeft(15);
    setTimerActive(true);
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setReveal(true);
      setTimerActive(false);
      return;
    }
    if (!timerActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, timerActive, pokemon]);

  const checkGuess = () => {
    if (guess.toLowerCase().trim() === pokemon.name) {
      setMessage("Yay you guessed it correct!! 🥳🥳🥳🥳");
      setReveal(true);
      setTimerActive(false);
    } else {
      setMessage("No, try again 😭😭😭");
    }
  };

  return (
    <>
      <h1>Who's That Pokémon?</h1>
      <div style={{ textAlign: "center", marginTop: "20px" ,backgroundColor:"white", border:"5px solid black",width:"80vh",padding:"20px"}}>
        <h2 style={{display:"flex",justifyContent:"flex-end",marginRight:"15px"}}>Time Left: {timeLeft} sec</h2>
        {pokemon && (
          <>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt="Guess the Pokémon" style={{ width: "400px", filter: reveal ? "none" : "brightness(0%)" }}/>
            <div>
              <input value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="Enter Pokémon name..." disabled={reveal}/>
              <button className="button-50" onClick={checkGuess} disabled={reveal}>Guess</button>
            </div>
            <h2>{message}</h2>
            <button className="button-50" onClick={() => { setReveal(true); setTimerActive(false); }}>I don't know!</button>
            <button className="button-50" onClick={fetchPokemon}>Next</button>
            {reveal && <h1>It's {pokemon.name}!</h1>}
          </>
        )}
      </div>
    </>
  );
}

export default WhosThatPokemon;
