import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { api } from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const user = {
      name: name,
      email: email,
      password: password,
      username: username,
    };
    api
      .post("/auth/register", user)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error("Register error:", err);
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("Erro ao registrar. Verifique seus dados e tente novamente.");
        }
        setIsSubmitting(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg p-4">
      <div className="w-full max-w-md bg-surface p-6 sm:p-8 rounded-xl border border-border shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-text">Criar Conta</h1>
          <p className="text-text-secondary mt-2">Junte-se ao nosso blog</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nameInput" className="block text-sm font-medium mb-1 text-text-secondary">
              Nome Completo
            </label>
            <input
              id="nameInput"
              type="text"
              value={name}
              onChange={handleName}
              placeholder="Seu nome completo"
              required
              className="w-full bg-bg border border-border rounded-md p-2.5 text-text focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>
          <div>
            <label htmlFor="usernameInput" className="block text-sm font-medium mb-1 text-text-secondary">
              Nome de Usuário
            </label>
            <input
              id="usernameInput"
              type="text"
              value={username}
              onChange={handleUsername}
              placeholder="seu_usuario"
              required
              className="w-full bg-bg border border-border rounded-md p-2.5 text-text focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>
          <div>
            <label htmlFor="emailInput" className="block text-sm font-medium mb-1 text-text-secondary">
              Email
            </label>
            <input
              id="emailInput"
              type="email"
              value={email}
              onChange={handleEmail}
              placeholder="seu@email.com"
              required
              className="w-full bg-bg border border-border rounded-md p-2.5 text-text focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>
          <div>
            <label htmlFor="passwordInput" className="block text-sm font-medium mb-1 text-text-secondary">
              Senha
            </label>
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={handlePassword}
              placeholder="••••••••"
              required
              className="w-full bg-bg border border-border rounded-md p-2.5 text-text focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>
          {error && <div className="text-center text-red-400 text-sm">{error}</div>}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-wait"
            >
              {isSubmitting ? "Registrando..." : "Registrar"}
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-text-secondary">
            Já tem uma conta?{" "}
            <Link to={"/login"} className="font-semibold text-primary hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
