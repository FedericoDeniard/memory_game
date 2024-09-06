import { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./components/board/board";
import { Leaderboard } from "./components/leaderboard/leaderboard";
import { Score } from "./tools/fetch";
import { get_scores } from "./tools/fetch";
import { UserForm } from "./components/inputName/name";

import { BASE_URL } from "./tools/fetch";

function App() {
  const [username, setUsername] = useState<string>("");


  const [lastScores, setLastScores] = useState<Score[]>([]);
  const [topScores, setTopScores] = useState<Score[]>([]);

  const [filter, setFilter] = useState<string>("last_10");



  const updateScores = async () => {
    const lastScoresFetch = await get_scores(
      `${BASE_URL}/last-leaderboard`
    );
    setLastScores(lastScoresFetch);
    const topScoresFetch = await get_scores(
    `${BASE_URL}/top-leaderboard`
    );
    setTopScores(topScoresFetch);
  };

  useEffect(() => {
      updateScores();
  }, []);


useEffect(() => {
  const checkIsLoggedIn = async () => {
    try {
      const isLoggedIn = await fetch(`${BASE_URL}/refresh-login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (isLoggedIn.ok) {
        const userData = await isLoggedIn.json();
        console.log('Response status:', userData.username);
        setUsername(userData.username);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  checkIsLoggedIn();
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
              cardAmount={1}
              updateScores={updateScores}
              username={username}
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
