import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { api } from "../services/api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", { state: { from: "/posts/new" } });
    }
  }, [token, navigate]);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleContent = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const post = { title, content };
    api
      .post("/posts", post, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        alert("Post created successfully!");
        setTitle("");
        setContent("");
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        alert("Failed to create post. Please try again.");
      });
  };
  return (
    <div>
      <h1>CreatePost</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} placeholder="Enter post title" onChange={handleTitle} />
        </div>
        <div>
          <label>Content:</label>
          <textarea placeholder="Enter post content" value={content} onChange={handleContent}></textarea>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
