import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/posts/new">New Post</Link>
        </li>
      </ul>
    </nav>
  );
}
