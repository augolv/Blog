import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { api } from "../services/api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("O título e o conteúdo não podem estar vazios.");
      setIsSubmitting(false);
      return;
    }

    const post = { title, content, status };
    api
      .post("/posts", post)
      .then((res) => {
        const newPostId = res.data.post?.id;
        if (newPostId) {
          navigate(`/posts/${newPostId}`);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Error creating post:", err);
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("Falha ao criar o post. Tente novamente.");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="bg-bg text-text font-sans p-4 md:p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text">Criar Nova Postagem</h1>
          <p className="text-text-secondary mt-2">Compartilhe suas ideias com o mundo.</p>
        </header>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="titleInput" className="block text-sm font-medium mb-2 text-text-secondary">
              Título
            </label>
            <input
              id="titleInput"
              type="text"
              value={title}
              onChange={handleTitle}
              placeholder="O Título do seu Post"
              className="w-full bg-surface border border-border rounded-md p-3 text-text text-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>
          <div>
            <label htmlFor="contentInput" className="block text-sm font-medium mb-2 text-text-secondary">
              Conteúdo
            </label>
            <textarea
              id="contentInput"
              placeholder="Comece a escrever aqui..."
              value={content}
              onChange={handleContent}
              rows={12}
              className="w-full bg-surface border border-border rounded-md p-3 text-text leading-relaxed focus:ring-2 focus:ring-primary focus:border-primary transition"
            ></textarea>
          </div>
          <div>
            <label htmlFor="statusSelect" className="block text-sm font-medium mb-2 text-text-secondary">
              Status
            </label>
            <select
              id="statusSelect"
              value={status}
              onChange={handleStatusChange}
              className="w-full sm:w-auto bg-surface border border-border rounded-md p-3 text-text focus:ring-2 focus:ring-primary focus:border-primary transition"
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
            </select>
          </div>
          {error && <div className="text-center text-red-400 text-sm p-3 bg-red-900/20 rounded-md">{error}</div>}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-wait"
            >
              {isSubmitting ? "Publicando..." : "Publicar Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
