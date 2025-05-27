import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { api } from "../services/api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: "/posts/new" } });
    }
  }, [navigate]);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleContent = (event) => {
    setContent(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const post = { title, content, status };
    api
      .post("/posts", post)
      .then((res) => {
        alert("Post created successfully!");
        setTitle("");
        setContent("");
        setStatus("draft");
        navigate(`/`);
        console.log(res);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        alert("Failed to create post. Please try again.");
      });
  };
  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleInput">Title:</label>
          <input id="titleInput" type="text" value={title} placeholder="Enter post title" onChange={handleTitle} />
        </div>
        <div>
          <label htmlFor="contentInput">Content:</label>
          <textarea id="contentInput" placeholder="Enter post content" value={content} onChange={handleContent}></textarea>
        </div>
        <div>
          <label htmlFor="statusSelect">Status:</label>
          <select id="statusSelect" value={status} onChange={handleStatusChange}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
