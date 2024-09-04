import "./leaderboard.css";
import { Score } from "../../tools/fetch";

export const Leaderboard = ({
  lastScoresProp,
  topScoresProp,
  setFilter,
  filter,
}: {
  lastScoresProp: Score[];
  topScoresProp: Score[];
  setFilter: (filter: string) => void;
  filter: string;
}) => {
  let lastScores = lastScoresProp;
  let topScores = topScoresProp;

  return (
    <div className="leaderboard">
      <h4>Leaderboard</h4>
      <div className="leaderboard-filter">
        <h4
          onClick={() => {
            setFilter("last_10");
          }}
          className={filter === "last_10" ? "active" : ""}
        >
          Last 10
        </h4>
        <h4
          onClick={() => {
            setFilter("top_10");
          }}
          className={filter === "top_10" ? "active" : ""}
        >
          Top 10
        </h4>
      </div>
      {topScores.length === 0 || lastScores.length === 0 ? (
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
              {filter === "last_10"
                ? lastScores.map((player, index) => {
                    const date = new Date(player.date);
                    const formattedDate = date.toLocaleString();
                    return (
                      <tr key={index}>
                        <td>{formattedDate}</td>
                        <td>
                          {player.username}#{player.id}
                        </td>
                        <td>{player.time / 1000}s</td>
                      </tr>
                    );
                  })
                : topScores.map((player, index) => {
                    const date = new Date(player.date);
                    const formattedDate = date.toLocaleString();
                    return (
                      <tr key={index}>
                        <td>{formattedDate}</td>
                        <td>
                          {player.username}#{player.id}
                        </td>
                        <td>{player.time / 1000}s</td>
                      </tr>
                    );
                  })}
            </tbody>
          </>
        </table>
      )}
    </div>
  );
};
