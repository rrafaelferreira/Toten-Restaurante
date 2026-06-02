import "./ShoppingCart.css";
import { useCart } from "../../Shop/Context/CartContext"; // Verifique se este caminho está 100% certo
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { produtos } from "../../data/Products/Products"; // Importando sua lista de produtos estáticos

function ShoppingCart() {
  const { orderType } = useCart();
  const navigate = useNavigate();
  
  // Estados para gerenciar os itens vindos diretamente do banco de dados da API
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Recupera o CPF limpo que salvamos no localStorage na etapa de Cadastro/Autenticação
  const cpfUsuario = localStorage.getItem("cpf_usuario");

  // Hook para buscar os itens da API ao carregar o componente
  useEffect(() => {
    async function carregarCarrinho() {
      if (!cpfUsuario) {
        setLoading(false);
        return;
      }

      try {
        const resposta = await fetch(`https://pedidos-totem.onrender.com/carrinho?cpf=${cpfUsuario}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (resposta.ok) {
          const itensApi = await resposta.json();

          // Cruzamos o 'idProduto' recebido da API com os detalhes do seu arquivo local 'Products.js'
          const itensDetalhado = itensApi.map(itemApi => {
            const detalheProduto = produtos.find(p => p.id === itemApi.idProduto);
            
            return {
              id: itemApi.idProduto,
              // Se o produto existir no arquivo local, pega as propriedades reais, senão define dados padrão
              name: detalheProduto ? detalheProduto.name : `Produto #${itemApi.idProduto}`,
              price: detalheProduto ? detalheProduto.price : 0,
              quantity: 1 // Como a API lida por registro individual, inicializamos como 1 item por linha inserida
            };
          });

          setCartItems(itensDetalhado);
        }
      } catch (erro) {
        console.error("Erro ao carregar os dados do carrinho da API:", erro);
      } finally {
        setLoading(false);
      }
    }

    carregarCarrinho();
  }, [cpfUsuario]);

  // Calcula o valor total com base nos preços locais cruzados dos produtos ativos do estado
  const totalValue = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Funções de alteração visual locais mantendo a usabilidade da sua interface antiga
  function updateQuantity(id, novaQtd) {
    if (novaQtd < 1) return;
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: novaQtd } : item));
  }

  function removeFromCart(id) {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }

  if (loading) {
    return (
      <div className="cart-page">
        <h1 className="title-resumo">CARREGANDO SEU PEDIDO...</h1>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="title-resumo">RESUMO DO PEDIDO</h1>

      {/* EXIBIÇÃO DO TIPO DE PEDIDO (Comer no Local / Para Viagem) */}
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
              {cartItems.map((item) => (
                <div key={item.id} className="item-row">
                  <div className="controls">
                    {/* Botões de quantidade chamando a função local do componente */}
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
                <button className="btn-checkout" onClick={() => alert(`Pedido Finalizado! Tipo: ${orderType}`)}>
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