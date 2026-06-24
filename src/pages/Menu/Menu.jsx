import { useState, useEffect } from "react"; // Adicionado useEffect aqui
import { useNavigate, useLocation } from "react-router-dom"; // Adicionado useLocation aqui
import { useCart } from "../../Shop/Context/CartContext";

import ProductSection from "../../components/ProductSection/ProductsSection";
import CarouselStructure from "../../components/carousel/CarouselStructure";
import Button from "../../components/button/Button";

import Register from "../../components/formularios/register/registers";
import Login from "../../components/formularios/login/logins";

import "./menu.css";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("hamburgers");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tipoFormulario, setTipoFormulario] = useState("cadastro");
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.abrirModalCadastro) {
      setTipoFormulario("cadastro");
      setMostrarFormulario(true);

      // Limpa o estado no histórico para o modal não reabrir se o usuário atualizar a página manualmente
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // NOVA FUNÇÃO: Envia o ID do produto e o CPF do localStorage para a API do carrinho
  async function adicionarAoCarrinhoApi(idProduto) {
    const cpfUsuario = localStorage.getItem("cpf_usuario");

    if (!cpfUsuario) {
      alert("Por favor, faça seu cadastro ou login clicando no ícone de usuário antes de adicionar itens ao carrinho.");
      setTipoFormulario("cadastro");
      setMostrarFormulario(true); // Abre o modal de cadastro automaticamente
      return;
    }

    try {
      const resposta = await fetch("https://pedidos-totem.onrender.com/carrinho", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idProduto: idProduto,
          cpf: cpfUsuario
        }),
      });

      if (resposta.ok) {
        console.log(`Produto ${idProduto} adicionado ao carrinho com sucesso na API.`);
      } else {
        console.error("Erro ao adicionar produto na API do carrinho.");
      }
    } catch (erro) {
      console.error("Falha na comunicação com o servidor:", erro);
    }
  }

  return (
    <div className="menu-page">
      {/* USER */}
      <div
        className={`floating-user ${mostrarFormulario ? "ativo" : ""}`}
        onClick={() => {
          setMostrarFormulario(true);
          setTipoFormulario("cadastro");
        }}
      >
        👤
      </div>

      {/* CARRINHO */}
      <div
        className="floating-cart"
        onClick={() => navigate("/cart")}
      >
        <div className="cart-icon">
          🛒
          {totalItems > 0 && (
            <span className="cart-badge">
              {totalItems}
            </span>
          )}
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="conteudo-menu">
        <div className="bg-secao-produtos">
          <CarouselStructure
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* PASSO ADICIONAL: Repassando a função de POST para dentro do container de produtos */}
          <ProductSection
            selectedCategory={selectedCategory}
            onAdicionarAoCarrinho={adicionarAoCarrinhoApi}
          />
        </div>

        {!mostrarFormulario && (
          <div className="menu-buttons">
            <Button
              text="Voltar"
              type="back"
              onClick={() =>
                navigate("/order-type", { replace: true })
              }
            />
          </div>
        )}
      </div>

      {/* MODAL */}
      {mostrarFormulario && (
        <div
          className="modal-overlay"
          onClick={() => setMostrarFormulario(false)}
        >
          <div
            className="modal-form-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* FECHAR */}
            <button
              className="close-modal-btn"
              onClick={() => setMostrarFormulario(false)}
            >
              ✕
            </button>

            {/* TROCA FORMULÁRIO */}
            {tipoFormulario === "cadastro" ? (
              <Register
                trocarParaLogin={() =>
                  setTipoFormulario("login")
                }
              />
            ) : (
              <Login
                trocarParaCadastro={() =>
                  setTipoFormulario("cadastro")
                }
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;