import { Link } from "react-router";

export default function PostCard({ post }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="bg-surface rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <header className="mb-3">
        <h2 className="text-2xl lg:text-3xl font-bold text-text mb-1">
          <Link to={`/posts/${post.id}`} className="hover:text-primary transition-colors duration-200">
            {post.title}
          </Link>
        </h2>
        <div className="text-xs text-text-secondary">
          <span>{formatDate(post.created_at)}</span>
          {post.author_username && (
            <>
              <span className="mx-1">&bull;</span>
              <span>{post.author_username}</span>
            </>
          )}
          {post.status === "draft" && (
            <>
              <span className="mx-1">&bull;</span>
              <span className="text-accent font-semibold">Rascunho</span>
            </>
          )}
        </div>
      </header>
      <div className="text-text-secondary leading-relaxed mb-5">
        <p>
          {post.content ? `${post.content.substring(0, 200)}${post.content.length > 200 ? "..." : ""}` : "Este post não possui um resumo disponível."}
        </p>
      </div>
      <footer className="mt-auto">
        <Link
          to={`/posts/${post.id}`}
          className="inline-flex items-center text-primary hover:text-primary-hover font-semibold transition-colors group text-sm"
        >
          Ler post completo
          <span className="ml-1.5 transition-transform duration-200 ease-in-out group-hover:translate-x-1">&rarr;</span>
        </Link>
      </footer>
    </article>
  );
}
