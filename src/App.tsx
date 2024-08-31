import { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./components/board/board";
import { Leaderboard } from "./components/leaderboard/leaderboard";
import { Score } from "./tools/fetch";
import { get_scores } from "./tools/fetch";
import { InputName } from "./components/inputName/name";
import { top_10, last_10 } from "./components/sorts/sorts";

function App() {
  const [scores, setScores] = useState<Score[]>([]);
  const [username, setUsername] = useState<string>("");
  const [uuid, setUuid] = useState<string>("");

  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    setUuid(crypto.randomUUID());
  }, []);

  useEffect(() => {
    updateScores();
  }, []);
  const updateScores = () => {
    get_scores("https://api-memory-game-1.onrender.com/leaderboard")
      .then((data) => {
        if (filter === "last_10") {
          last_10({ scores, setScores });
        } else if (filter === "top_10") {
          top_10({ scores, setScores });
        }

        setScores(data);
      })
      .catch((error) => {
        console.error("Error fetching scores:", error);
      });
  };

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
              scoresProp={scores}
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
