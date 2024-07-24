import "./App.css";
import { Board } from "./components/board/board";
import { Leaderboard } from "./components/leaderboard/leaderboard";

function App() {
  return (
    <>
      <div>
        <h1>Memory Card Game</h1>
        <h4>By Federico Deniard</h4>
      </div>
      <div className="game">
        <Board cardAmount={6} />
      </div>
      <div className="leadearboard-container">
        <Leaderboard />
      </div>
    </>
  );
}

export default App;
