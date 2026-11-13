import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 

const Pizza = () => {
  const { id } = useParams(); 
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    const getPizzaDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
        const data = await response.json();
        setPizza(data);
      } catch (error) {
        console.error("Error al obtener el detalle de la pizza:", error);
      }
    };

    getPizzaDetail();
  }, [id]); 

  if (!pizza) {
    return <p className="text-center mt-5">Cargando los detalles de la pizza...</p>;
  }

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow" style={{ width: "28rem" }}>
        <img 
          src={pizza.img} 
          className="card-img-top" 
          alt={pizza.name}
         
        />
        <div className="card-body">
          <h2 className="card-title text-capitalize fw-bold">{pizza.name}</h2>
          <p className="card-text text-muted">{pizza.desc}</p>
          <hr />
          <p className="fw-semibold text-center mb-1">🍕 Ingredientes:</p>
          <ul className="text-center list-unstyled mb-3">
            {pizza.ingredients?.map((ingredient, index) => (
              <li key={index} className="text-capitalize small">👉 {ingredient}</li>
            ))}
          </ul>
          <hr />
          <div className="d-flex justify-content-around align-items-center">
            <span className="fs-4 fw-bold text-dark">
              Precio: ${pizza.price?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
