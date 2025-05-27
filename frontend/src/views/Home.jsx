import PostCard from "../components/PostCard";
import { api } from "../services/api";
import { useState, useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/posts")
      .then((res) => {
        setPosts(res.data.posts);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-bg text-text font-sans p-4">
      <h1>Blog Posts</h1>
      <div className="posts-list">{posts.length > 0 ? posts.map((post) => <PostCard key={post.id} post={post} />) : <p>No posts available.</p>}</div>
    </div>
  );
}
