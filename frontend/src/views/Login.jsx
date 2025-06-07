import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { api } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const userPayLoad = {
      email: email,
      password: password,
    };

    api
      .post("/auth/login", userPayLoad)
      .then((res) => {
        localStorage.setItem("token", res.data.token);

        if (res.data.user) {
          localStorage.setItem("currentUser", JSON.stringify(res.data.user));
        }

        window.dispatchEvent(new Event("authChange"));
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("Login error:", err);
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("E-mail ou senha inválidos. Tente novamente.");
        }
        setIsSubmitting(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg p-4">
      <div className="w-full max-w-md bg-surface p-6 sm:p-8 rounded-xl border border-border shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-text">Login</h1>
          <p className="text-text-secondary mt-2">Acesse sua conta para continuar</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-text-secondary">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmail}
              placeholder="seu@email.com"
              required
              className="w-full bg-bg border border-border rounded-md p-2.5 text-text focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-text-secondary">
              Senha
            </label>
            <input
              id="password"
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
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-text-secondary">
            Não tem uma conta?{" "}
            <Link to={"/register"} className="font-semibold text-primary hover:underline">
              Se cadastre aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
