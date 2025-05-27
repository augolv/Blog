import PostCard from "../components/PostCard";
import { api } from "../services/api";
import { useState, useEffect } from "react";

const POSTS_PER_PAGE = 10;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    api
      .get(`/posts?page=${currentPage}&limit=${POSTS_PER_PAGE}`)
      .then((res) => {
        setPosts(res.data.posts);

        setTotalPages(Math.ceil(res.data.total / POSTS_PER_PAGE));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts");
        setIsLoading(false);
      });
  }, [currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="bg-bg text-text font-sans p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
      {posts.length > 0 ? (
        <div className="posts-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center">No posts available.</p>
      )}
      {totalPages > 0 && (
        <div className="pagination-controls flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-400 hover:bg-primary-hover transition-colors"
          >
            Previous
          </button>
          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-400 hover:bg-primary-hover transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
