import "./ShoppingCart.css";
import { useCart } from "../../Shop/Context/CartContext"; // Verifique se este caminho está 100% certo
import { useNavigate } from "react-router-dom";

function ShoppingCart() {
  // Pegamos as funções do contexto. Certifique-se que o nome é 'updateQuantity' no seu CartContext
  const { cartItems, removeFromCart, updateQuantity, totalValue } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <h1 className="title-resumo">RESUMO DO PEDIDO</h1>

      <div className="cart-content-box">
        {cartItems.length === 0 ? (
          <div className="empty-state">
            <p>O seu carrinho está vazio. 🍔</p>
            <button className="btn-voltar-simples" onClick={() => navigate("/menu")}>
              Voltar ao Menu
            </button>
          </div>
        ) : (
          <>
            <div className="items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="item-row">
                  <div className="controls">
                    {/* Botões de quantidade chamando a função do contexto */}
                    <button className="btn-qty" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span className="qty-val">{item.quantity}x</span>
                    <button className="btn-qty" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    <span className="name-prod">{item.name}</span>
                  </div>
                  
                  <div className="price-info">
                    <span>R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</span>
                    <button className="btn-del" onClick={() => removeFromCart(item.id)}>remover</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="footer-cart">
              <h2 className="total-display">Total: R$ {totalValue.toFixed(2).replace(".", ",")}</h2>
              <div className="group-btns">
                {/* Botão de voltar corrigido com navigate */}
                <button className="btn-voltar-simples" onClick={() => navigate("/menu")}>
                  Voltar ao menu
                </button>
                <button className="btn-checkout" onClick={() => alert("Finalizando...")}>
                  Finalizar Pedido
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;