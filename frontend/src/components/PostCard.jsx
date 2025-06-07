import { Link } from "react-router";

export default function PostCard({ post, isOwner = false }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="bg-surface border border-border rounded-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <header className="mb-3">
        <h2 className="text-2xl md:text-3xl font-bold text-text hover:text-primary transition-colors">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h2>
        <div className="text-xs text-text-secondary mt-2 flex items-center flex-wrap gap-x-2">
          <span>{formatDate(post.created_at)}</span>
          {post.author_username && (
            <>
              <span className="hidden sm:inline">&bull;</span>
              <span>{post.author_username}</span>
            </>
          )}
          {post.status === "draft" && (
            <>
              <span className="hidden sm:inline">&bull;</span>
              <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs font-semibold rounded-full">Rascunho</span>
            </>
          )}
        </div>
      </header>
      <div className="text-text-secondary leading-relaxed mb-5">
        <p>
          {post.content ? `${post.content.substring(0, 200)}${post.content.length > 200 ? "..." : ""}` : "Este post não possui um resumo disponível."}
        </p>
      </div>
      <footer className="mt-auto flex items-center justify-between">
        <Link
          to={`/posts/${post.id}`}
          className="inline-flex items-center text-primary hover:text-primary-hover font-semibold transition-colors group text-sm"
        >
          Ler post completo
          <span className="ml-1.5 transition-transform duration-200 ease-in-out group-hover:translate-x-1">&rarr;</span>
        </Link>

        {isOwner && post.status === "draft" && (
          <Link to={`/posts/edit/${post.id}`} className="inline-flex items-center text-accent hover:underline font-semibold text-sm">
            Editar
          </Link>
        )}
      </footer>
    </article>
  );
}
