import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Shop/Context/CartContext";

import ProductSection from "../../components/ProductSection/ProductsSection";
import CarouselStructure from "../../components/carousel/CarouselStructure";
import Button from "../../components/button/Button";

import "./menu.css";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("hamburgers");
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="menu-page">
      {/* Carrinho Flutuante */}
      <div className="floating-cart" onClick={() => navigate("/cart")}>
        <div className="cart-icon">
          🛒
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </div>
      </div>

      <div className="bg-secao-produtos">
        <CarouselStructure
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <ProductSection selectedCategory={selectedCategory} />
      </div>

      {/* Container do Botão Voltar */}
      <div className="menu-buttons">
        <Button 
          text="Voltar" 
          type="back" 
          onClick={() => navigate("/order-type", { replace: true })} 
        />
      </div>
    </div>
  );
}

export default Menu;