import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { api } from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      name: name,
      email: email,
      password: password,
      username: username,
    };
    api
      .post("/auth/register", user)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error("Register error:", err);
        setError("Review your data. Please try again.");
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nameInput">Name:</label>
          <input id="nameInput" type="text" value={name} placeholder="Enter your name" onChange={handleName} />
        </div>
        <div>
          <label htmlFor="usernameInput">Username:</label>
          <input id="usernameInput" type="text" value={username} placeholder="Enter your username" onChange={handleUsername} />
        </div>
        <div>
          <label htmlFor="emailInput">Email:</label>
          <input id="emailInput" type="email" value={email} placeholder="Enter your email" onChange={handleEmail} />
        </div>
        <div>
          <label htmlFor="passwordInput">Password:</label>
          <input id="passwordInput" type="password" value={password} placeholder="Enter your password" onChange={handlePassword} />
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Already have an account? <Link to={"/login"}>Login here</Link>
      </p>
    </div>
  );
}
