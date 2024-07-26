import { useEffect, useState } from "react";
import "./leaderboard.css";
import { Score } from "../../tools/fetch";

export const Leaderboard = ({ scoresProp }: { scoresProp: Score[] }) => {
  const [scores, setScores] = useState<Score[]>(scoresProp);

  const displayedScores = scores.slice(0, 10);

  const top_10 = () => {
    const sortedScores = [...scores].sort((a, b) => a.time - b.time);
    setScores(sortedScores);
  };

  const last_10 = () => {
    const sortedScores = [...scores].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
    setScores(sortedScores);
  };

  useEffect(() => {
    setScores(scoresProp);
  }, [scoresProp]);

  return (
    <div className="leaderboard">
      <h4>Leaderboard</h4>
      <div className="leaderboard-filter">
        <h4 onClick={last_10}>Last 10</h4>
        <h4 onClick={top_10}>Top 10</h4>
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
