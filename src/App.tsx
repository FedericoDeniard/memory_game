import { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./components/board/board";
import { Leaderboard } from "./components/leaderboard/leaderboard";
import { Score } from "./tools/fetch";
import { get_scores } from "./tools/fetch";
import { UserForm } from "./components/inputName/name";

function App() {
  const [username, setUsername] = useState<string>("");


  const [lastScores, setLastScores] = useState<Score[]>([]);
  const [topScores, setTopScores] = useState<Score[]>([]);

  const [filter, setFilter] = useState<string>("last_10");



  const updateScores = async () => {
    const lastScoresFetch = await get_scores(
      "http://localhost:3000/last-leaderboard"
    );
    setLastScores(lastScoresFetch);
    const topScoresFetch = await get_scores(
      "http://localhost:3000/top-leaderboard"
    );
    setTopScores(topScoresFetch);
  };

  useEffect(() => {
      updateScores();
  }, []);

  return (
    <>
      {username === "" ? (
        <UserForm setUsername={setUsername}  />
      ) : (
        <>
          <div>
            <h1>Memory Card Game</h1>
            <h4>By Federico Deniard</h4>
          </div>
          <div className="game">
            <Board
              cardAmount={6}
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
