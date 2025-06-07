import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Post from "./views/Post";
import CreatePost from "./views/CreatePost";
import EditPost from "./views/EditPost";
import Profile from "./views/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/new" element={<CreatePost />} />
          <Route path="/posts/edit/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
