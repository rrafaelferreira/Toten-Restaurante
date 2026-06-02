import React from "react";
import { useCart } from "../../../Shop/Context/CartContext";
import "./ProductCard.css";

// Recebe a prop de integração onAdicionarAoCarrinho
function ProductCard({ product, onAdicionarAoCarrinho }) {
  const { addToCart, removeFromCart, cartItems } = useCart();

  const isNoCarrinho = cartItems.some(
    (item) => item.nomeProduto === product.nomeProduto
  );

  const handleCartAction = () => {
    if (isNoCarrinho) {
      removeFromCart(product.nomeProduto);
    } else {
      // 1. Faz o comportamento local do contexto
      addToCart(product);
      
      // 2. Faz a integração com a API enviando o ID correto do produto
      // Usamos product.idProduto ou product.id dependendo de como sua API retorna o identificador
      const idDoProduto = product.idProduto || product.id;
      if (onAdicionarAoCarrinho && idDoProduto) {
        onAdicionarAoCarrinho(idDoProduto);
      }
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
          R$ {product.preco ? product.preco.toFixed(2).replace(".", ",") : "0,00"}
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