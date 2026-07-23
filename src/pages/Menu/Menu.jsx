import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../Shop/Context/CartContext";

import ProductSection from "../../components/ProductSection/ProductsSection";
import CarouselStructure from "../../components/carousel/CarouselStructure";
import Button from "../../components/button/Button";

import Register from "../../components/formularios/register/registers";
import Login from "../../components/formularios/login/logins";

// Importação da imagem de fundo para o Vite resolver o caminho corretamente
import bgMenu from "../../assets/images/global/bg-menu.jpg";

import "./menu.css";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("hamburgers");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tipoFormulario, setTipoFormulario] = useState("cadastro");
  
  // Estado para armazenar quem está logado
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Ao carregar o componente, verifica se há sessão gravada no localStorage
  useEffect(() => {
    const cpf = localStorage.getItem("cpf_usuario");
    const nome = localStorage.getItem("nome_usuario");

    if (cpf) {
      setUsuarioLogado({ nome: nome || "Cliente", cpf });
    }

    if (location.state?.abrirModalCadastro && !cpf) {
      setTipoFormulario("cadastro");
      setMostrarFormulario(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Função disparada quando o cadastro ou login é finalizado com sucesso
  const handleSucessoAutenticacao = (dadosUsuario) => {
    setUsuarioLogado(dadosUsuario);
    setMostrarFormulario(false);
  };

  // Função para deslogar
  const handleLogout = () => {
    localStorage.removeItem("cpf_usuario");
    localStorage.removeItem("nome_usuario");
    localStorage.removeItem("token_usuario");
    setUsuarioLogado(null);
    setMostrarFormulario(false);
  };

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  async function adicionarAoCarrinhoApi(idProduto) {
    const cpfUsuario = localStorage.getItem("cpf_usuario");

    if (!cpfUsuario) {
      alert("Por favor, faça seu cadastro ou login clicando no ícone de usuário antes de adicionar itens ao carrinho.");
      setTipoFormulario("cadastro");
      setMostrarFormulario(true);
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
    <div className="menu-page" style={{ "--bg-image": `url(${bgMenu})` }}>
      {/* ÍCONE DO USUÁRIO - Mantido limpo para preservar o alinhamento circular */}
      <div
        className={`floating-user ${mostrarFormulario ? "ativo" : ""} ${usuarioLogado ? "logado" : ""}`}
        onClick={() => setMostrarFormulario(true)}
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
            {/* BOTÃO FECHAR */}
            <button
              className="close-modal-btn"
              onClick={() => setMostrarFormulario(false)}
            >
              ✕
            </button>

            {/* SE JÁ ESTIVER LOGADO: Exibe os dados do Usuário */}
            {usuarioLogado ? (
              <div className="user-logged-info" style={{ textAlign: "center", padding: "20px", color: "#fff" }}>
                <h2>Conta Conectada</h2>
                <p style={{ margin: "15px 0 5px", fontSize: "1.1rem" }}>
                  <strong>Usuário:</strong> {usuarioLogado.nome}
                </p>
                <p style={{ marginBottom: "20px", opacity: 0.8 }}>
                  <strong>CPF:</strong> {usuarioLogado.cpf}
                </p>
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                  onClick={handleLogout}
                >
                  Sair da Conta
                </button>
              </div>
            ) : (
              /* SE NÃO ESTIVER LOGADO: Exibe os formulários */
              <>
                {tipoFormulario === "cadastro" ? (
                  <Register
                    trocarParaLogin={() => setTipoFormulario("login")}
                    onCadastroSucesso={handleSucessoAutenticacao}
                  />
                ) : (
                  <Login
                    trocarParaCadastro={() => setTipoFormulario("cadastro")}
                    onLoginSucesso={handleSucessoAutenticacao}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;


// import { useState, useEffect } from "react"; // Adicionado useEffect aqui
// import { useNavigate, useLocation } from "react-router-dom"; // Adicionado useLocation aqui
// import { useCart } from "../../Shop/Context/CartContext";

// import ProductSection from "../../components/ProductSection/ProductsSection";
// import CarouselStructure from "../../components/carousel/CarouselStructure";
// import Button from "../../components/button/Button";

// import Register from "../../components/formularios/register/registers";
// import Login from "../../components/formularios/login/logins";

// import "./menu.css";

// function Menu() {
//   const [selectedCategory, setSelectedCategory] = useState("hamburgers");
//   const [mostrarFormulario, setMostrarFormulario] = useState(false);
//   const [tipoFormulario, setTipoFormulario] = useState("cadastro");
//   const { cartItems } = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (location.state?.abrirModalCadastro) {
//       setTipoFormulario("cadastro");
//       setMostrarFormulario(true);

//       // Limpa o estado no histórico para o modal não reabrir se o usuário atualizar a página manualmente
//       window.history.replaceState({}, document.title);
//     }
//   }, [location]);

//   const totalItems = cartItems.reduce(
//     (acc, item) => acc + item.quantity,
//     0
//   );

//   // NOVA FUNÇÃO: Envia o ID do produto e o CPF do localStorage para a API do carrinho
//   async function adicionarAoCarrinhoApi(idProduto) {
//     const cpfUsuario = localStorage.getItem("cpf_usuario");

//     if (!cpfUsuario) {
//       alert("Por favor, faça seu cadastro ou login clicando no ícone de usuário antes de adicionar itens ao carrinho.");
//       setTipoFormulario("cadastro");
//       setMostrarFormulario(true); // Abre o modal de cadastro automaticamente
//       return;
//     }

//     try {
//       const resposta = await fetch("https://pedidos-totem.onrender.com/carrinho", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           idProduto: idProduto,
//           cpf: cpfUsuario
//         }),
//       });

//       if (resposta.ok) {
//         console.log(`Produto ${idProduto} adicionado ao carrinho com sucesso na API.`);
//       } else {
//         console.error("Erro ao adicionar produto na API do carrinho.");
//       }
//     } catch (erro) {
//       console.error("Falha na comunicação com o servidor:", erro);
//     }
//   }

//   return (
//     <div className="menu-page">
//       {/* USER */}
//       <div
//         className={`floating-user ${mostrarFormulario ? "ativo" : ""}`}
//         onClick={() => {
//           setMostrarFormulario(true);
//           setTipoFormulario("cadastro");
//         }}
//       >
//         👤
//       </div>

//       {/* CARRINHO */}
//       <div
//         className="floating-cart"
//         onClick={() => navigate("/cart")}
//       >
//         <div className="cart-icon">
//           🛒
//           {totalItems > 0 && (
//             <span className="cart-badge">
//               {totalItems}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* CONTEÚDO */}
//       <div className="conteudo-menu">
//         <div className="bg-secao-produtos">
//           <CarouselStructure
//             selectedCategory={selectedCategory}
//             setSelectedCategory={setSelectedCategory}
//           />

//           {/* PASSO ADICIONAL: Repassando a função de POST para dentro do container de produtos */}
//           <ProductSection
//             selectedCategory={selectedCategory}
//             onAdicionarAoCarrinho={adicionarAoCarrinhoApi}
//           />
//         </div>

//         {!mostrarFormulario && (
//           <div className="menu-buttons">
//             <Button
//               text="Voltar"
//               type="back"
//               onClick={() =>
//                 navigate("/order-type", { replace: true })
//               }
//             />
//           </div>
//         )}
//       </div>

//       {/* MODAL */}
//       {mostrarFormulario && (
//         <div
//           className="modal-overlay"
//           onClick={() => setMostrarFormulario(false)}
//         >
//           <div
//             className="modal-form-box"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* FECHAR */}
//             <button
//               className="close-modal-btn"
//               onClick={() => setMostrarFormulario(false)}
//             >
//               ✕
//             </button>

//             {/* TROCA FORMULÁRIO */}
//             {tipoFormulario === "cadastro" ? (
//               <Register
//                 trocarParaLogin={() =>
//                   setTipoFormulario("login")
//                 }
//               />
//             ) : (
//               <Login
//                 trocarParaCadastro={() =>
//                   setTipoFormulario("cadastro")
//                 }
//               />
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Menu;