import React from "react";
import "./leaderboard.css";

const players = [
  { date: "2024-07-15", user: "Riley#2345", score: "12 seconds" },
  { date: "2024-07-20", user: "Alex#1234", score: "15 seconds" },
  { date: "2024-07-11", user: "Avery#8901", score: "16 seconds" },
  { date: "2024-07-18", user: "Taylor#9012", score: "18 seconds" },
  { date: "2024-07-17", user: "Morgan#3456", score: "20 seconds" },
  { date: "2024-07-19", user: "Jordan#5678", score: "22 seconds" },
  { date: "2024-07-12", user: "Quinn#4567", score: "14 seconds" },
  { date: "2024-07-14", user: "Jamie#6789", score: "25 seconds" },
  { date: "2024-07-13", user: "Cameron#0123", score: "28 seconds" },
  { date: "2024-07-16", user: "Casey#7890", score: "30 seconds" },
];

export const Leaderboard = () => {
  return (
    <div className="leaderboard">
      <h4>Leaderboard</h4>
      <div className="leaderboard-filter">
        <h4>Top 10</h4>
        <h4>Last 10</h4>
      </div>
      <div className="leaderboard-list">
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {player.date} | {player.user} | {player.score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
