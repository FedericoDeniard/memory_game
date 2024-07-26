import { useEffect, useState } from "react";
import "./leaderboard.css";
import { Score } from "../../tools/fetch";

export const Leaderboard = ({ scoresProp }: { scoresProp: Score[] }) => {
  const [scores, setScores] = useState<Score[]>(scoresProp);

  useEffect(() => {
    setScores(scoresProp);
  }, [scoresProp]);

  return (
    <div className="leaderboard">
      <h4>Leaderboard</h4>
      <div className="leaderboard-filter">
        <h4>Top 10</h4>
        <h4>Last 10</h4>
      </div>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Username</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((player, index) => (
            <tr key={index}>
              <td>{player.date}</td>
              <td>
                {player.username}#{player.id.slice(-4).toUpperCase()}
              </td>
              <td>{player.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
