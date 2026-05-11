import "./orderType.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";

function OrderType() {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  // Função para navegar apenas se houver seleção
  const handleNext = () => {
    if (selected) {
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
        <Button text="Voltar" type="back" onClick={() => navigate(-1)} />
        <Button
          text="Próximo"
          onClick={handleNext}
          // O botão será desabilitado se 'selected' for uma string vazia
          disabled={!selected}
        />
      </div>
    </div>
  );
}

export default OrderType;

// import "./orderType.css";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../../components/button/button";
// function OrderType() {

//   const [selected, setSelected] = useState("");
//   const navigate = useNavigate();

//   return (
//     <div className="order-container">
//       <h1>Como deseja seu pedido?</h1>
//       <div className="options">
//         <div
//           className={`option ${selected === "local" ? "active" : ""}`}
//           onClick={() => setSelected("local")}
//         >
//           Comer no Local
//         </div>
//         <div
//           className={`option ${selected === "viagem" ? "active" : ""}`}
//           onClick={() => setSelected("viagem")}
//         >
//           Para Viagem
//         </div>
//       </div>
//       <div className="buttons-container">
//         <Button
//           text="Voltar"
//           type="back"
//           onClick={() => navigate(-1)}
//         />
//         <Button
//           text="Próximo"
//           onClick={() => navigate("/menu")}
//         />
//       </div>
//     </div>
//   );
// }

// export default OrderType;
