import { useParams, Link } from "react-router";
import { api } from "../services/api";
import { useState, useEffect } from "react";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    api
      .get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
        if (err.response && err.response.status === 404) {
          setError("Post não encontrado.");
        } else if (err.response && err.response.status === 403) {
          setError("Você não tem permissão para ver este rascunho.");
        } else {
          setError("Falha ao carregar o post.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-bg text-text-secondary">Carregando post...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-bg text-red-500 text-center p-4">
        <h2 className="text-2xl mb-4">{error}</h2>
        <Link to="/" className="text-primary hover:underline">
          Voltar para a Home
        </Link>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="bg-bg text-text font-sans min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <article>
          <header className="mb-8 border-b border-border pb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text leading-tight mb-4">{post.title}</h1>
            <div className="flex items-center text-sm text-text-secondary">
              <span>{post.author_username}</span>
              <span className="mx-2">&bull;</span>
              <span>{formatDate(post.created_at)}</span>
              {post.status === "draft" && (
                <>
                  <span className="mx-2">&bull;</span>
                  <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs font-semibold rounded-full">Rascunho</span>
                </>
              )}
            </div>
          </header>
          <div className="prose prose-invert prose-lg max-w-none text-text-secondary leading-relaxed whitespace-pre-wrap">{post.content}</div>
        </article>
      </main>
    </div>
  );
}
