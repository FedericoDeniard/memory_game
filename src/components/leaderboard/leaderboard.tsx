import { useEffect, useState } from "react";
import "./leaderboard.css";
import { get_scores, Score } from "../../tools/fetch";

export const Leaderboard = () => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    get_scores("http://localhost:5000/leaderboard")
      .then((data) => {
        setScores(data);
      })
      .catch((error) => {
        console.error("Error fetching scores:", error);
      });
  }, []);

  return (
    <div className="leaderboard">
      <h4>Leaderboard</h4>
      <div className="leaderboard-filter">
        <h4>Top 10</h4>
        <h4>Last 10</h4>
      </div>
      <div className="leaderboard-list">
        <ul>
          {scores.map((player, index) => (
            <li key={index}>
              {player.date} | {player.username} | {player.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
