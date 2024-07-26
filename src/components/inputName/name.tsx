import "./name.css";
import { useState, KeyboardEvent } from "react";

export const InputName = ({
  setUsername,
}: {
  setUsername: (name: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setUsername(inputValue);
    }
  };

  return (
    <div className="user-input">
      <h1>Enter your name</h1>
      <input
        className="user-input-input"
        type="text"
        placeholder="Enter your name"
        minLength={4}
        maxLength={10}
        pattern="[A-Za-z0-9]*"
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="user-input-button"
        disabled={inputValue === ""}
        type="submit"
        onClick={() => setUsername(inputValue)}
      >
        Submit
      </button>
    </div>
  );
};
