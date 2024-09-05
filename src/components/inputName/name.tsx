import "./name.css";
import { useState, KeyboardEvent, useEffect } from "react";
import { BASE_URL } from "../../tools/fetch";

export const UserForm = ({
  setUsername,
}: {
  setUsername: (name: string) => void;
}) => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const [guessUsername, setGuessUsername] = useState("");

  const handleKeyDownLogin = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      await login(loginUsername,loginPassword);
    }
  };

  const handleKeyDownRegister = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      await register();
    }
  }

const login = async (username: string, password: string) => {      
  const fetchUser = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      credentials: "include",})
      if (fetchUser.ok) {
        const userData = await fetchUser.json();
        setUsername(userData.username);
      }
}

const register = async () => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: registerUsername, password: registerPassword }),
    });


    if (response.ok) {
      setLoginUsername(registerUsername);
      setLoginPassword(registerPassword);
      await login(registerUsername, registerPassword);
    } else {
      const errorText = await response.text(); // Obtener el mensaje de error
      console.error('Failed to register:', errorText);
      alert("Failed to register");
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
}

const guess = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key === "Enter"){
  setUsername(guessUsername);}
}

const checkLoginForm = () => {
  const isUsernameValid = loginUsername.length >= 4 && loginUsername.length <= 10;
  const isPasswordValid = loginPassword.length >= 6;
  return !(isUsernameValid && isPasswordValid);
}

const checkRegisterForm = () => {
  const isUsernameValid = registerUsername.length >= 4 && registerUsername.length <= 10;
  const isPasswordValid = registerPassword.length >= 6;
  const isConfirmPasswordValid = registerConfirmPassword === registerPassword;
  return !(isUsernameValid && isPasswordValid && isConfirmPasswordValid);
}

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
        setUsername(userData.username);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  checkIsLoggedIn();
}, []); 


  return (
    <div className="container">
  <div className="user">
    <div className="user-input">
      <h1>Login</h1>
      <input
        className="user-input-input"
        type="text"
        placeholder="Username"
        minLength={3}
        maxLength={10}
        pattern="[A-Za-z0-9]*"
        onChange={(event) => setLoginUsername(event.target.value)}
        onKeyDown={handleKeyDownLogin}
      />
      <input
      className="user-input-input"
      type="password"
      placeholder="Password"
      minLength={6}
      pattern="[A-Za-z0-9]*"
      onChange={(event) => setLoginPassword(event.target.value)}
      onKeyDown={handleKeyDownLogin}
      ></input>
      <button
        className="user-input-button"
        disabled={checkLoginForm()}
        type="submit"
        onClick={() => login(loginUsername,loginPassword)}
      >
        Submit
      </button> </div>
      {/* ------------------- Register ------------------- */}
      <div className="user-input">
      <h1>Register</h1>
      <input
        className="user-input-input"
        type="text"
        placeholder="Username"
        minLength={3}
        maxLength={10}
        pattern="[A-Za-z0-9]*"
        onChange={(event) => setRegisterUsername(event.target.value)}
        onKeyDown={handleKeyDownRegister}
      />
      <input
      className="user-input-input"
      type="password"
      placeholder="Password"
      minLength={6}
      pattern="[A-Za-z0-9]*"
      onChange={(event) => setRegisterPassword(event.target.value)}
      onKeyDown={handleKeyDownRegister}
      ></input>      <input
      className="user-input-input"
      type="password"
      placeholder="Confirm your password"
      minLength={6}
      pattern="[A-Za-z0-9]*"
      onChange={(event) => setRegisterConfirmPassword(event.target.value)}
      onKeyDown={handleKeyDownRegister}
      ></input>
      <button
        className="user-input-button"
        disabled={checkRegisterForm()}
        type="submit"
        onClick={register}
      >
        Submit
      </button>
    </div></div>
    <div className="user-guess">
      <h1>Play as guess</h1>
      <input
        className="user-input-input"
        type="text"
        placeholder="Username"
        minLength={3}
        maxLength={10}
        pattern="[A-Za-z0-9]*"
        onChange={(event) => setGuessUsername(event.target.value)}
        onKeyDown={guess}
      />
      </div>
      </div>
    
  );
};
