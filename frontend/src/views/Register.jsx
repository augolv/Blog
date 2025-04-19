import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { api } from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      name: name,
      email: email,
      password: password,
    };
    api
      .post("/auth/register", user)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Register error:", error);
        setError("Email already registered. Please try again.");
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" placeholder="Enter your name" onChange={handleName} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" onChange={handleEmail} />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" placeholder="Enter your password" onChange={handlePassword} />
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
