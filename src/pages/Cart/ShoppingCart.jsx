import { useState } from "react";
import "./ShoppingCart.css";
import { useCart } from "../../Shop/Context/CartContext"; 
import { useNavigate } from "react-router-dom";

import Register from "../../components/formularios/register/registers";
import Login from "../../components/formularios/login/logins";

function ShoppingCart() {
  const { 
    cartItems, 
    orderType, 
    removeFromCart, 
    updateQuantity, 
    totalValue,
    user,
    loginUser // <- Capturando a função para fazer o login no Context
  } = useCart();
  
  const navigate = useNavigate();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tipoFormulario, setTipoFormulario] = useState("cadastro");

  const handleFinalizarPedido = () => {
    if (!user) {
      setTipoFormulario("cadastro");
      setMostrarFormulario(true);
    } else {
      alert(`Pedido Finalizado com sucesso para ${user.nome}! Tipo: ${orderType}`);
    }
  };

  // Função disparada pelo formulário de cadastro após o sucesso
  const handleCadastroSucesso = (dadosUsuario) => {
    loginUser({ nome: dadosUsuario.nome, cpf: dadosUsuario.cpf }); // Atualiza o Contexto global na hora
    setMostrarFormulario(false); // Fecha o modal
  };

  return (
    <div className="cart-page">
      <h1 className="title-resumo">RESUMO DO PEDIDO</h1>

      {/* Identificação visual do Usuário Logado */}
      {user ? (
        <div className="user-logged-badge">
          👤 Modo Autoatendimento: <strong>{user.nome}</strong> ativo
        </div>
      ) : (
        <div className="user-not-logged-badge">
          ⚠️ Identifique-se para finalizar o pedido.
        </div>
      )}

      {orderType && (
        <div className="order-type-badge">
          Tipo de pedido: <span>{orderType}</span>
        </div>
      )}

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
              {cartItems.map((item) => {
                const idAtual = item.idProduto || item.id;
                const nomeAtual = item.nomeProduto || item.name;
                const precoAtual = item.preco || item.price || 0;

                return (
                  <div key={idAtual} className="item-row">
                    <div className="controls">
                      <button 
                        className="btn-qty" 
                        onClick={() => updateQuantity(idAtual, item.quantity - 1)}
                      >
                        -
                      </button>
                      
                      <span className="qty-val">{item.quantity}x</span>
                      
                      <button 
                        className="btn-qty" 
                        onClick={() => updateQuantity(idAtual, item.quantity + 1)}
                      >
                        +
                      </button>
                      
                      <span className="name-prod">{nomeAtual}</span>
                    </div>
                    
                    <div className="price-info">
                      <span>R$ {(precoAtual * item.quantity).toFixed(2).replace(".", ",")}</span>
                      <button 
                        className="btn-del" 
                        onClick={() => removeFromCart(idAtual)}
                      >
                        remover
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="footer-cart">
              <h2 className="total-display">
                Total: R$ {totalValue.toFixed(2).replace(".", ",")}
              </h2>
              <div className="group-btns">
                <button className="btn-voltar-simples" onClick={() => navigate("/menu")}>
                  Voltar ao menu
                </button>
                <button 
                  className="btn-checkout" 
                  onClick={handleFinalizarPedido}
                >
                  Finalizar Pedido
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {mostrarFormulario && (
        <div
          className="modal-overlay"
          onClick={() => setMostrarFormulario(false)}
        >
          <div
            className="modal-form-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal-btn"
              onClick={() => setMostrarFormulario(false)}
            >
              ✕
            </button>

            {tipoFormulario === "cadastro" ? (
              <Register
                trocarParaLogin={() => setTipoFormulario("login")}
                onCadastroSucesso={handleCadastroSucesso} // Conectando a função ao Modal de cadastro
              />
            ) : (
              <Login
                trocarParaCadastro={() => setTipoFormulario("cadastro")}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;