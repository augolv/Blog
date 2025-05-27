export const getCurrentUser = () => {
  const userStr = localStorage.getItem("currentUser");
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error("Error parsing currentUser from localStorage", e);
      localStorage.removeItem("currentUser");
      return null;
    }
  }
  return null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const logout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  window.dispatchEvent(new Event("authChange"));
  if (navigate) {
    navigate("/");
  }
};
