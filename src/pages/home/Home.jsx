import "./home.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="content">
        <h1 className="iniciotext">Bateu a fome?</h1>
        <p className="subtitle">Toque abaixo para montar seu pedido</p>
      </div>

      <div className="start-button">
        <Button
          text="Clique para Iniciar"
          onClick={() => navigate("/order-type")}
        />
      </div>
    </div>
  );
}

export default Home;
