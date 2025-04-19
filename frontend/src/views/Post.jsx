import { useParams } from "react-router";
import { api } from "../services/api";
import { useState, useEffect } from "react";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching post:", error);
        setError("Failed to load post");
        setIsLoading(false);
      });
  });

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>PostDetail</h1>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}
