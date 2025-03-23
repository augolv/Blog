import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Login from "./views/Login";
import Post from "./views/Post";
import CreatePost from "./views/CreatePost";

export default function App() {
  return (
    <BrowserRouter>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/new" element={<CreatePost />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
