import React from "react";
import { useCart } from "../../../Shop/Context/CartContext"; 
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart, removeFromCart, cartItems } = useCart();

  // Verifica se este produto já está no carrinho para ativar a borda
  const isNoCarrinho = cartItems.some((item) => item.id === product.id);

  const handleCartAction = () => {
    if (isNoCarrinho) {
      removeFromCart(product.id); // Remove se já estiver lá
    } else {
      addToCart(product); // Adiciona se for o primeiro clique
    }
  };

  return (
    <div className={`product-card ${isNoCarrinho ? "selected-anim" : ""}`}>
      <div className="image-container">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">R$ {product.price.toFixed(2).replace(".", ",")}</p>
        
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