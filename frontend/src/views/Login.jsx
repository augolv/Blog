import { useState } from "react";
import { Link } from "react-router";
import { api } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    api
      .post("/auth/login", user)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" onChange={handleEmail} />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" placeholder="Enter your password" onChange={handlePassword} />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to={"/register"}>Register here</Link>
      </p>
    </div>
  );
}
