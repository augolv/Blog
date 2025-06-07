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
    return <div className="text-center p-4 text-lg">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4 text-lg">{error}</div>;
  }

  return (
    <div className="bg-bg text-text font-sans p-4 md:p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10 text-center">Blog Posts</h1>
        {posts.length > 0 ? (
          <div className="posts-list space-y-8 md:space-y-10">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-lg text-center">No posts available.</p>
        )}
        {totalPages > 0 && (
          <div className="pagination-controls flex justify-center items-center space-x-2 sm:space-x-4 mt-8 md:mt-10">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm bg-primary text-white rounded disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-primary-hover transition-colors sm:px-4 sm:py-2"
            >
              Anterior
            </button>
            <span className="text-sm text-text-secondary sm:text-base">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm bg-primary text-white rounded disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-primary-hover transition-colors sm:px-4 sm:py-2"
            >
              Próximo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
