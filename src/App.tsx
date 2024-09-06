import { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./components/board/board";
import { Leaderboard } from "./components/leaderboard/leaderboard";
import { Score } from "./tools/fetch";
import { get_scores } from "./tools/fetch";
import { UserForm } from "./components/inputName/name";

import { BASE_URL } from "./tools/fetch";

import logOutSVG from "/assets/icons/log-out.svg";

function App() {
  const [username, setUsername] = useState<string>("");


  const [lastScores, setLastScores] = useState<Score[]>([]);
  const [topScores, setTopScores] = useState<Score[]>([]);

  const [filter, setFilter] = useState<string>("last_10");

  const [logChecked, setLogChecked] = useState<boolean>(false);


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
    setLogChecked(true);
  };

  checkIsLoggedIn();
}, []); 

const logOut = async () => {
  await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    }
  }).then(() => {
    setUsername("");
  });
}

  return (
<>
    {!logChecked ? (
      <div className="main-loader-container">
      <div className="loader-container">
          <div className="loader"></div>
        </div>
        </div>
    ) : (
      <>
        {username === "" ? (
          <UserForm setUsername={setUsername} />
        ) : (
          <>
            <div>
              <h1>Memory Card Game</h1>
              <h4>By Federico Deniard</h4>
              <img
                className="logout"
                src={logOutSVG}
                onClick={() => logOut()}
                alt="Logout"
              />
            </div>
            <div className="game">
              <Board
                cardAmount={window.location.hostname === "localhost" ? 1 : 6}
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
    )}
  </>
  );
}

export default App;
