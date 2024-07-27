import { useEffect, useState } from "react";
import "./leaderboard.css";
import { Score } from "../../tools/fetch";

import { top_10, last_10 } from "../sorts/sorts";

export const Leaderboard = ({
  scoresProp,
  setFilter,
  filter,
}: {
  scoresProp: Score[];
  setFilter: (filter: string) => void;
  filter: string;
}) => {
  const [scores, setScores] = useState<Score[]>(scoresProp);

  const displayedScores = scores.slice(0, 10);

  useEffect(() => {
    setScores(scoresProp);
  }, [scoresProp]);

  return (
    <div className="leaderboard">
      <h4>Leaderboard</h4>
      <div className="leaderboard-filter">
        <h4
          onClick={() => {
            last_10({ scores, setScores }), setFilter("last_10");
          }}
          className={filter === "last_10" ? "active" : ""}
        >
          Last 10
        </h4>
        <h4
          onClick={() => {
            top_10({ scores, setScores }), setFilter("top_10");
          }}
          className={filter === "top_10" ? "active" : ""}
        >
          Top 10
        </h4>
      </div>
      {scores.length === 0 ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <table className={"leaderboard-table"}>
          <>
            <thead>
              <tr>
                <th>Date</th>
                <th>Username</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {displayedScores.map((player, index) => (
                <tr key={index}>
                  <td>{player.date}</td>
                  <td>
                    {player.username}#{player.id.slice(-4).toUpperCase()}
                  </td>
                  <td>{player.time / 1000}s</td>
                </tr>
              ))}
            </tbody>
          </>
        </table>
      )}
    </div>
  );
};
