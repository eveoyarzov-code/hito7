
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const Cart = () => {
  const { cart, increaseCount, decreaseCount, totalCart } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const [successMessage, setSuccessMessage] = useState("");

  
  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cart: cart,
        }),
      });

      if (response.ok) {
        setSuccessMessage("¡Compra realizada con éxito! 🍕🎉 Gracias por preferir Pizzería Mamma Mía.");
      } else {
        alert("Hubo un problema al procesar tu compra. Verifica tu sesión.");
      }
    } catch (error) {
      console.error("Error en el checkout:", error);
      alert("Error de conexión con el servidor al procesar el pago.");
    }
  };

  return (
    <div className="container my-5" style={{ minHeight: "60vh" }}>
      <h2 className="mb-4 text-center fw-bold">🛒 Tu Carrito de Compras</h2>

      
      {successMessage && (
        <div className="alert alert-success text-center mx-auto mb-4" style={{ maxWidth: "600px" }}>
          {successMessage}
        </div>
      )}

      {!cart || cart.length === 0 ? (
        <p className="text-center text-muted fs-5">Tu carrito está actualmente vacío.</p>
      ) : (
        <div className="mx-auto" style={{ maxWidth: "600px" }}>
          {cart.map((item) => (
            <div key={item.id} className="d-flex align-items-center justify-content-between p-3 mb-3 border rounded shadow-sm bg-white">
              <div className="d-flex align-items-center gap-3">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  style={{ width: "60px", height: "60px", objectFit: "cover" }} 
                  className="rounded"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://unsplash.com";
                  }}
                />
                <h5 className="text-capitalize mb-0 fw-semibold">{item.name}</h5>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="fw-bold me-3">${(item.price * item.count).toLocaleString()}</span>
                <button className="btn btn-outline-danger btn-sm px-2" onClick={() => decreaseCount(item.id)}>-</button>
                <span className="badge bg-light text-dark border px-3 py-2">{item.count}</span>
                <button className="btn btn-outline-primary btn-sm px-2" onClick={() => increaseCount(item.id)}>+</button>
              </div>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h3 className="fw-bold">Total: ${totalCart.toLocaleString()}</h3>
            <button 
              className="btn btn-dark px-4 py-2" 
              disabled={!token}
              onClick={handleCheckout}
            >
              Pagar 💳
            </button>
          </div>
          {!token && (
            <p className="text-danger text-end small mt-2">
              Debes iniciar sesión para poder realizar el pago.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
