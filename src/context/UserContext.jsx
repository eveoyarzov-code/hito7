import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
 
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

 
  const login = async (userEmail, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setEmail(data.email);
        alert("¡Inicio de sesión exitoso!");
      } else {
        alert(data.error || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error de conexión con el servidor");
    }
  };

  
  const register = async (userEmail, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setEmail(data.email);
        alert("¡Registro exitoso!");
      } else {
        alert(data.error || "Error al registrarse");
      }
    } catch (error) {
      console.error("Error en register:", error);
      alert("Error de conexión con el servidor");
    }
  };

  
  const logout = () => {
    setToken(null);
    setEmail(null);
  };

  
  const getProfile = async () => {
    if (!token) return;
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setEmail(data.email);
      }
    } catch (error) {
      console.error("Error al obtener perfil:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ token, email, login, register, logout, getProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
