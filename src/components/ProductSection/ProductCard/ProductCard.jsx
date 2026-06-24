import React from "react";
import { useCart } from "../../../Shop/Context/CartContext";
import { useNavigate } from "react-router-dom"; // Importado para gerir o redirecionamento
import "./ProductCard.css";

// Recebe a prop de integração onAdicionarAoCarrinho
function ProductCard({ product, onAdicionarAoCarrinho }) {
  const { addToCart, removeFromCart, cartItems } = useCart();
  const navigate = useNavigate(); // Inicializa o hook de navegação

  // Verifica se o item já está no carrinho comparando o identificador único
  const isNoCarrinho = cartItems.some(
    (item) => (item.idProduto || item.id) === (product.idProduto || product.id)
  );

  const handleCartAction = () => {
    // 1. ANTES DE TUDO: VALIDAÇÃO DE AUTENTICAÇÃO
    // Recupera o CPF guardado no localStorage
    const cpfUsuario = localStorage.getItem("cpf_usuario");

    // Se o utilizador NÃO estiver logado e a ação for de ADICIONAR, bloqueia IMEDIATAMENTE
    if (!cpfUsuario && !isNoCarrinho) {
      alert("Para adicionar itens ao carrinho, por favor faça o login ou cadastre-se.");
      navigate("/form"); // Redireciona para a pasta de formulários
      return; // O 'return' aqui garante que o código abaixo NÃO SEJA EXECUTADO. 
              // Impede chamadas de API nulas e evita erros de Fetch no console!
    }

    // Descobre qual id está preenchido (idProduto ou id)
    const idDoProduto = product.idProduto || product.id;

    // 2. FLUXO NORMAL DO CARRINHO (Apenas executa se passou na validação acima)
    if (isNoCarrinho) {
      // Passa o ID correto para o contexto para remover do estado global
      removeFromCart(idDoProduto); 
    } else {
      // Adiciona o produto localmente no Contexto
      addToCart(product);
      
      // Faz a integração com a API enviando o ID correto do produto
      // Colocamos um try/catch preventivo aqui para que, se a API falhar (CORS), o app não trave totalmente
      try {
        if (onAdicionarAoCarrinho && idDoProduto) {
          onAdicionarAoCarrinho(idDoProduto);
        }
      } catch (error) {
        console.error("Erro controlado ao tentar comunicar com a API externa:", error);
      }
    }
  };

  return (
    <div className={`product-card ${isNoCarrinho ? "selected-anim" : ""}`}>
      <div className="image-container">
        <img
          src={product.imagem || "/placeholder.png"}
          alt={product.nomeProduto}
        />
      </div>

      <div className="product-info">
        <h3>{product.nomeProduto}</h3>

        <p className="price">
          R$ {product.preco ? product.preco.toFixed(2).replace(".", ",") : "0,00"}
        </p>

        <button
          className={`add-button ${isNoCarrinho ? "btn-remove" : ""}`}
          onClick={handleCartAction}
        >
          {isNoCarrinho ? "remover" : "adicionar"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;