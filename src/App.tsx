import { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./components/board/board";
import { Leaderboard } from "./components/leaderboard/leaderboard";
import { Score } from "./tools/fetch";
import { get_scores } from "./tools/fetch";
import { InputName } from "./components/inputName/name";
import { getUUID } from "./tools/localStorage";

function App() {
  const [username, setUsername] = useState<string>("");
  const [uuid, setUuid] = useState<string>("");

  let [lastScores, setLastScores] = useState<Score[]>([]);
  let [topScores, setTopScores] = useState<Score[]>([]);

  const [filter, setFilter] = useState<string>("last_10");

  useEffect(() => {
    setUuid(getUUID());
  }, []);

  const updateScores = async () => {
    let lastScoresFetch = await get_scores(
      "https://api-memory-game-1.onrender.com/last-leaderboard"
    );
    setLastScores(lastScoresFetch);
    let topScoresFetch = await get_scores(
      "https://api-memory-game-1.onrender.com/top-leaderboard"
    );
    setTopScores(topScoresFetch);
  };

  useEffect(() => {
    updateScores();
  }, []);

  return (
    <>
      {username === "" ? (
        <InputName setUsername={setUsername} />
      ) : (
        <>
          <div>
            <h1>Memory Card Game</h1>
            <h4>By Federico Deniard</h4>
          </div>
          <div className="game">
            <Board
              cardAmount={6}
              usernameProp={username}
              uuidProp={uuid}
              updateScores={updateScores}
            />
          </div>
          <div className="leaderboard-container">
            <Leaderboard
              lastScoresProp={lastScores}
              topScoresProp={topScores}
              setFilter={setFilter}
              filter={filter}
            />
          </div>
        </>
      )}
    </>
  );
}

export default App;
