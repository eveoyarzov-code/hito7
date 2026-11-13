import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext"; 

const Navbar = () => {
  const { totalCart } = useContext(CartContext);
  const { token, logout } = useContext(UserContext); 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 justify-content-between">
      <div className="d-flex align-items-center">
        <Link to="/" className="navbar-brand text-white fw-bold me-4">
          🍕 Pizzería Mamma Mía!
        </Link>

        <div className="d-flex gap-2">
          
          <Link to="/" className="btn btn-outline-light btn-sm">
            🏠 Home
          </Link>

          {token ? (
            <>
              <Link to="/profile" className="btn btn-outline-light btn-sm">
                👤 Profile
              </Link>
              <button onClick={logout} className="btn btn-outline-danger btn-sm">
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light btn-sm">
                🔐 Login
              </Link>
              <Link to="/register" className="btn btn-outline-light btn-sm">
                🔐 Register
              </Link>
            </>
          )}
        </div>
      </div>

     
      <Link to="/cart" className="btn btn-outline-info btn-sm text-info fw-semibold">
        🛒 Total: ${totalCart.toLocaleString()}
      </Link>
    </nav>
  );
};

export default Navbar;
