import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { email, logout, getProfile } = useContext(UserContext);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="container my-5 text-center" style={{ minHeight: "60vh" }}>
      <div className="card mx-auto p-4 shadow" style={{ maxWidth: "420px" }}>
        <h2 className="mb-4 fw-bold">👤 Perfil de Usuario</h2>
        <p className="fs-5 text-muted mb-4">
          <strong>Email:</strong> {email || "Cargando..."}
        </p>
        <button onClick={logout} className="btn btn-danger w-100">
          Cerrar Sesión 🚪
        </button>
      </div>
    </div>
  );
};

export default Profile;
