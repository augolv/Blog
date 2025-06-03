import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        console.warn("Token expirado ou inválido. Deslogando...");

        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        window.dispatchEvent(new Event("authChange"));

        if (window.location.pathname !== "/login") {
          alert("Sua sessão expirou. Por favor, faça login novamente.");
          window.location.href = "/login";
        }
      }
    } else if (error.request) {
      console.error("Error no request (sem resposta do servidor):", error.request);
    } else {
      console.error("Error na configuração da requisição:", error.message);
    }
    return Promise.reject(error);
  }
);
