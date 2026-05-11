import "./ShoppingCart.css";
import { useCart } from "../../Shop/Context/CartContext";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";

function ShoppingCart() {
  const { cartItems, removeFromCart, totalValue } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <h1>Seu Carrinho</h1>

      <div className="cart-list">
        {cartItems.length === 0 ? (
          <p className="empty-msg">O carrinho está vazio.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-details">
                <h3>
                  {item.name} x{item.quantity}
                </h3>
                <p>R$ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remover
              </button>
            </div>
          ))
        )}
      </div>

      <div className="cart-total">
        <h2>Total: R$ {totalValue.toFixed(2)}</h2>
      </div>

      <div className="cart-buttons">
        <Button
          text="Voltar ao Menu"
          type="back"
          onClick={() => navigate("/menu")}
        />
        <Button
          text="Finalizar Pedido"
          onClick={() => navigate("/checkout")}
          disabled={cartItems.length === 0}
        />
      </div>
    </div>
  );
}

export default ShoppingCart;
