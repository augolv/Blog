import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../services/api";
import PostCard from "../components/PostCard";
import { getCurrentUser } from "../utils/auth.js";

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const [editBio, setEditBio] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editPicture, setEditPicture] = useState(null);

  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
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
      });

    api
      .get(`/posts?author=${username}`)
      .then((res) => setPosts(res.data.posts || res.data))
      .catch(() => setPosts([]));
  }, [username]);

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
      setError("Erro ao atualizar perfil");
      console.error("Erro ao atualizar perfil", err);
    }
  };

  if (error && !profile) return <div className="text-center text-red-500">{error}</div>;
  if (!profile) return <div className="text-center">Carregando...</div>;

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Header (código existente) ... */}
      <div className="flex items-center space-x-6">
        <img
          src={profile.profile_picture || "/default-avatar.png"}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover border border-border"
        />
        <div>
          <h1 className="text-h1 font-bold">{profile.username}</h1>
          {profile.bio && <p className="text-text-secondary">{profile.bio}</p>}
        </div>
      </div>

      {/* Exibir erro de atualização do perfil, se houver */}
      {error && <div className="text-center text-red-500 p-2">{error}</div>}

      {/* Formulário de Edição (renderização condicional com 'isOwner') */}
      {isOwner && (
        <form onSubmit={handleUpdate} className="bg-surface p-6 rounded-xl border border-border space-y-4">
          <h2 className="text-h2 font-semibold">Editar Perfil</h2>
          <div>
            <label htmlFor="editUsernameInput" className="block text-sm mb-1">
              Username
            </label>
            <input id="editUsernameInput" value={editUsername} onChange={(e) => setEditUsername(e.target.value)} className="input" />
          </div>
          <div>
            <label htmlFor="editBioInput" className="block text-sm mb-1">
              Bio
            </label>
            <textarea id="editBioInput" value={editBio} onChange={(e) => setEditBio(e.target.value)} rows={3} className="input" />
          </div>
          <div>
            <label htmlFor="editPictureInput" className="block text-sm mb-1">
              Foto de Perfil
            </label>
            <input id="editPictureInput" type="file" accept="image/*" onChange={(e) => setEditPicture(e.target.files[0])} className="block" />
          </div>
          <button type="submit" className="btn btn-primary">
            Salvar Alterações
          </button>
        </form>
      )}

      <div>
        <h2 className="text-h2 font-semibold mb-4">Postagens</h2>
        {posts.length === 0 ? (
          <p className="text-text-secondary">Nenhum post encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
