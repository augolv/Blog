import { Link } from "react-router";

export default function Register() {
  return (
    <div>
      <h1>Register</h1>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" placeholder="Enter your name" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to={"/login"}>Login here</Link>
      </p>
    </div>
  );
}
