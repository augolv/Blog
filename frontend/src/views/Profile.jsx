import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../services/api";
import PostCard from "../components/PostCard";
import { getCurrentUser } from "../utils/auth.js";

const POSTS_PER_PAGE_PROFILE = 6;

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [error, setError] = useState("");

  const [editBio, setEditBio] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editPicture, setEditPicture] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const [currentPostsPage, setCurrentPostsPage] = useState(1);
  const [totalPostsPages, setTotalPostsPages] = useState(0);

  useEffect(() => {
    setIsLoadingProfile(true);
    setError("");
    const loggedInUser = getCurrentUser();

    api
      .get(`/users/${username}`)
      .then((res) => {
        setProfile(res.data);
        setEditBio(res.data.bio || "");
        setEditUsername(res.data.username);
        if (loggedInUser && res.data && loggedInUser.id === res.data.id) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
      })
      .catch(() => {
        setError("Perfil não encontrado");
        setIsOwner(false);
      })
      .finally(() => {
        setIsLoadingProfile(false);
      });
  }, [username]);

  useEffect(() => {
    if (!profile) return;

    setIsLoadingPosts(true);
    api
      .get(`/posts?author=${username}&status=all&page=${currentPostsPage}&limit=${POSTS_PER_PAGE_PROFILE}`)
      .then((res) => {
        setPosts(res.data.posts || []);
        setTotalPostsPages(Math.ceil(res.data.total / POSTS_PER_PAGE_PROFILE));
      })
      .catch(() => {
        setPosts([]);
      })
      .finally(() => {
        setIsLoadingPosts(false);
      });
  }, [profile, username, currentPostsPage]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!profile || !profile.id) {
      setError("ID do perfil não encontrado para atualização.");
      return;
    }
    try {
      const form = new FormData();
      form.append("username", editUsername);
      form.append("bio", editBio);
      if (editPicture) form.append("profile_picture", editPicture);

      await api.put(`/users/${profile.id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      window.location.reload();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Erro ao atualizar perfil: ${err.response.data.message}`);
      } else {
        setError("Erro ao atualizar perfil");
      }
      console.error("Erro ao atualizar perfil", err);
    }
  };

  const handlePreviousPostsPage = () => {
    setCurrentPostsPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPostsPage = () => {
    setCurrentPostsPage((prevPage) => Math.min(prevPage + 1, totalPostsPages));
  };

  if (isLoadingProfile) return <div className="flex justify-center items-center h-screen bg-bg text-text-secondary">Carregando perfil...</div>;
  if (error && !profile)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-bg text-red-500 text-center p-4">
        <h2 className="text-2xl mb-4">{error}</h2>
      </div>
    );
  if (!profile) return <div className="text-center text-lg">Perfil não encontrado.</div>;

  return (
    <div className="bg-bg text-text font-sans p-4 md:p-6 min-h-screen">
      <div className="container mx-auto max-w-4xl space-y-8 md:space-y-10">
        <header className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-center sm:space-x-6">
          <img
            src={profile.profile_picture || "/default-avatar.png"}
            alt="Avatar"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-border"
          />
          <div className="mt-4 sm:mt-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-text">{profile.username}</h1>
            {profile.bio && <p className="text-text-secondary mt-1 max-w-lg">{profile.bio}</p>}
          </div>
        </header>

        {error && <div className="text-center text-red-500 p-2 bg-red-900/20 border border-red-500/50 rounded">{error}</div>}

        {isOwner && (
          <form onSubmit={handleUpdate} className="bg-surface p-6 rounded-xl border border-border space-y-4">
            <h2 className="text-xl font-semibold text-text mb-3">Editar Perfil</h2>
            <div>
              <label htmlFor="editUsernameInput" className="block text-sm mb-1 text-text-secondary">
                Username
              </label>
              <input
                id="editUsernameInput"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                className="w-full bg-bg border border-border rounded p-2 text-text focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>
            <div>
              <label htmlFor="editBioInput" className="block text-sm mb-1 text-text-secondary">
                Bio
              </label>
              <textarea
                id="editBioInput"
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                rows={3}
                className="w-full bg-bg border border-border rounded p-2 text-text focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>
            <div>
              <label htmlFor="editPictureInput" className="block text-sm mb-1 text-text-secondary">
                Foto de Perfil
              </label>
              <input
                id="editPictureInput"
                type="file"
                accept="image/*"
                onChange={(e) => setEditPicture(e.target.files[0])}
                className="block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover file:cursor-pointer"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary text-white rounded hover:bg-primary-hover font-semibold transition-colors disabled:opacity-50"
            >
              Salvar Alterações
            </button>
          </form>
        )}

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-text">Postagens de {profile.username}</h2>
          {isLoadingPosts ? (
            <p className="text-center text-text-secondary">Carregando posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-text-secondary">Nenhum post encontrado para este usuário.</p>
          ) : (
            <div className="space-y-8 md:space-y-10">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} isOwner={isOwner} />
              ))}
            </div>
          )}
          {totalPostsPages > 1 && (
            <div className="pagination-controls flex justify-center items-center space-x-2 sm:space-x-4 mt-8 md:mt-10">
              <button
                onClick={handlePreviousPostsPage}
                disabled={currentPostsPage === 1}
                className="px-3 py-1.5 text-sm bg-primary text-white rounded disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-primary-hover transition-colors sm:px-4 sm:py-2"
              >
                Anterior
              </button>
              <span className="text-sm text-text-secondary sm:text-base">
                Página {currentPostsPage} de {totalPostsPages}
              </span>
              <button
                onClick={handleNextPostsPage}
                disabled={currentPostsPage === totalPostsPages}
                className="px-3 py-1.5 text-sm bg-primary text-white rounded disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-primary-hover transition-colors sm:px-4 sm:py-2"
              >
                Próxima
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
