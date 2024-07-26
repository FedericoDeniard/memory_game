import { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./components/board/board";
import { Leaderboard } from "./components/leaderboard/leaderboard";
import { Score } from "./tools/fetch";
import { get_scores } from "./tools/fetch";
import { InputName } from "./components/inputName/name";

function App() {
  const [scores, setScores] = useState<Score[]>([]);
  const [username, setUsername] = useState<string>("");
  const uuid = crypto.randomUUID();

  useEffect(() => {
    updateScores();
  }, []);
  const updateScores = () => {
    get_scores("http://localhost:5000/leaderboard")
      .then((data) => {
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
            <Leaderboard scoresProp={scores} />
          </div>
        </>
      )}
    </>
  );
}

export default App;
