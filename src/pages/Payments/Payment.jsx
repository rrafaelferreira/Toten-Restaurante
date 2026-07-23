import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Shop/Context/CartContext";
import "./Payment.css";

function Payment() {
  const { totalValue, clearCart, user } = useCart();
  const navigate = useNavigate();

  const [metodoPagamento, setMetodoPagamento] = useState("pix");
  const [statusPagamento, setStatusPagamento] = useState("pendente"); // "pendente" | "sucesso"

  const nomeCliente = user?.nome || localStorage.getItem("nome_usuario") || "Cliente";

  const handleConfirmarPagamento = () => {
    // Simula a confirmação do pagamento
    setStatusPagamento("sucesso");

    // Limpa o carrinho após o sucesso
    if (clearCart) {
      clearCart();
    }

    // Após 4 segundos, volta para a tela inicial de escolha do tipo de pedido
    setTimeout(() => {
      navigate("/");
    }, 4000);
  };

  return (
    <div className="payment-page">
      <h1 className="title-payment">FORMA DE PAGAMENTO</h1>

      {statusPagamento === "pendente" ? (
        <div className="payment-container">
          <div className="summary-box">
            <p className="client-info">👤 Cliente: <strong>{nomeCliente}</strong></p>
            <h2 className="total-pay">
              Total a pagar: <span>R$ {totalValue.toFixed(2).replace(".", ",")}</span>
            </h2>
          </div>

          <div className="methods-group">
            <h3>Selecione como deseja pagar:</h3>
            
            <div className="options-grid">
              <button
                className={`method-btn ${metodoPagamento === "pix" ? "active" : ""}`}
                onClick={() => setMetodoPagamento("pix")}
              >
                📱 Pix
              </button>

              <button
                className={`method-btn ${metodoPagamento === "credito" ? "active" : ""}`}
                onClick={() => setMetodoPagamento("credito")}
              >
                💳 Cartão de Crédito
              </button>

              <button
                className={`method-btn ${metodoPagamento === "debito" ? "active" : ""}`}
                onClick={() => setMetodoPagamento("debito")}
              >
                💳 Cartão de Débito
              </button>
            </div>
          </div>

          {/* Área Dinâmica conforme a escolha */}
          <div className="payment-details">
            {metodoPagamento === "pix" && (
              <div className="pix-box">
                <p>Escaneie o QR Code abaixo no app do seu banco:</p>
                <div className="qr-code-placeholder">
                  {/* Simulação visual de QR Code */}
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=toten-restaurante-pagamento-${totalValue}`} 
                    alt="QR Code Pix" 
                  />
                </div>
                <small>Aprovação instantânea</small>
              </div>
            )}

            {(metodoPagamento === "credito" || metodoPagamento === "debito") && (
              <div className="card-box">
                <p>Siga as instruções na máquina de cartão ao lado do toten 💳</p>
                <div className="maquininha-animation">
                  Aguardando aprovação do cartão...
                </div>
              </div>
            )}
          </div>

          <div className="payment-actions">
            <button className="btn-voltar-cart" onClick={() => navigate("/cart")}>
              Voltar ao Carrinho
            </button>
            <button className="btn-confirm-pay" onClick={handleConfirmarPagamento}>
              Confirmar Pagamento
            </button>
          </div>
        </div>
      ) : (
        /* Tela de Sucesso após pagar */
        <div className="success-box">
          <div className="success-icon">✅</div>
          <h2>PEDIDO REALIZADO COM SUCESSO!</h2>
          <p>Obrigado, <strong>{nomeCliente}</strong>!</p>
          <p>Seu pedido já foi enviado para a cozinha.</p>
          <small>Redirecionando para a tela inicial...</small>
        </div>
      )}
    </div>
  );
}

export default Payment;