import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    await login(email, password);
  };

  return (
    <div className="container my-5" style={{ minHeight: "60vh", maxWidth: "450px" }}>
      <h2 className="mb-4 text-center fw-bold">🔐 Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label fw-semibold">Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-dark w-100">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
