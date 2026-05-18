import "./OrderType.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { useCart } from "../../Shop/Context/CartContext"; // Caminho corrigido que funcionou!

function OrderType() {
  const navigate = useNavigate();
  const { orderType, setOrderType } = useCart(); // Resgatamos o orderType do contexto

  // Iniciamos o estado convertendo o texto de volta para "local" ou "viagem" se já existir
  const [selected, setSelected] = useState(() => {
    if (orderType === "Comer no Local") return "local";
    if (orderType === "Para Viagem") return "viagem";
    return "";
  });

  // Função para salvar a escolha e navegar apenas se houver seleção
  const handleNext = () => {
    if (selected) {
      setOrderType(selected === "local" ? "Comer no Local" : "Para Viagem");
      navigate("/menu");
    }
  };

  return (
    <div className="order-container">
      <h1>Como deseja seu pedido?</h1>
      <div className="options">
        <div
          className={`option ${selected === "local" ? "active" : ""}`}
          onClick={() => setSelected("local")}
        >
          Comer no Local
        </div>
        <div
          className={`option ${selected === "viagem" ? "active" : ""}`}
          onClick={() => setSelected("viagem")}
        >
          Para Viagem
        </div>
      </div>
      <div className="buttons-container">
        <Button text="Voltar" type="back" onClick={() => navigate("/", { replace: true })} />
        <Button
          text="Próximo"
          onClick={handleNext}
          disabled={!selected}
        />
      </div>
    </div>
  );
}

export default OrderType;