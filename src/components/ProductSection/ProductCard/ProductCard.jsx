import React from "react";
import { useCart } from "../../../Shop/Context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart, removeFromCart, cartItems } = useCart();

  const isNoCarrinho = cartItems.some(
    (item) => item.nomeProduto === product.nomeProduto
  );

  const handleCartAction = () => {
    if (isNoCarrinho) {
      removeFromCart(product.nomeProduto);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className={`product-card ${isNoCarrinho ? "selected-anim" : ""}`}>
      <div className="image-container">
        <img
          src={product.imagem || "/placeholder.png"}
          alt={product.nomeProduto}
        />
      </div>

      <div className="product-info">
        <h3>{product.nomeProduto}</h3>

        <p className="price">
          R$ {product.preco.toFixed(2).replace(".", ",")}
        </p>

        <button
          className={`add-button ${isNoCarrinho ? "btn-remove" : ""}`}
          onClick={handleCartAction}
        >
          {isNoCarrinho ? "remover" : "adicionar"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;