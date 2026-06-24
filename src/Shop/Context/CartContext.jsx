import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [orderType, setOrderType] = useState(""); 
  
  // --- NOVO: Estado de Autenticação Global ---
  // Se for null, o usuário não está logado. Se tiver um objeto, está logado.
  const [user, setUser] = useState(null);

  // Funções para suas telas de Login/Cadastro usarem depois:
  const loginUser = (userData) => setUser(userData); // Ex: loginUser({ nome: "Pedro" })
  const logoutUser = () => setUser(null);

  // Adicionar ao carrinho
  const addToCart = (product) => {
    const productId = product.idProduto || product.id;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => (item.idProduto || item.id) === productId
      );
      if (existingItem) {
        return prevItems.map((item) =>
          (item.idProduto || item.id) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, id: productId, quantity: 1 }];
    });
  };

  // Remover item completamente
  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.idProduto !== id && item.id !== id)
    );
  };

  // Atualizar quantidade
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        (item.idProduto || item.id) === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Limpar carrinho e resetar o tipo de pedido
  const clearCart = () => {
    setCartItems([]);
    setOrderType(""); 
  };

  // Valor total
  const totalValue = cartItems.reduce((acc, item) => {
    const precoItem = item.preco || item.price || 0;
    return acc + precoItem * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orderType,       
        setOrderType,    
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalValue,
        // --- Exportando os novos estados e funções ---
        user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};





// import { createContext, useState, useContext } from "react";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);
//   const [orderType, setOrderType] = useState(""); // Estado para armazenar "Comer no Local" ou "Para Viagem"

//   // Adicionar ao carrinho
//   const addToCart = (product) => {
//     // Garante uma identificação única id, usando o idProduto da API ou o id comum
//     const productId = product.idProduto || product.id;

//     setCartItems((prevItems) => {
//       // Verifica se o item já existe comparando as duas possibilidades de ID
//       const existingItem = prevItems.find(
//         (item) => (item.idProduto || item.id) === productId
//       );

//       // Se já existir, aumenta a quantidade
//       if (existingItem) {
//         return prevItems.map((item) =>
//           (item.idProduto || item.id) === productId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }

//       // Se for novo item, adiciona ao array garantindo a propriedade 'id' padronizada
//       return [...prevItems, { ...product, id: productId, quantity: 1 }];
//     });
//   };

//   // Remover item completamente
//   const removeFromCart = (id) => {
//     setCartItems((prevItems) =>
//       // Filtra removendo o item caso o id bata com 'idProduto' ou 'id'
//       prevItems.filter((item) => item.idProduto !== id && item.id !== id)
//     );
//   };

//   // Atualizar quantidade
//   const updateQuantity = (id, newQuantity) => {
//     // Remove o item se quantidade <= 0
//     if (newQuantity <= 0) {
//       removeFromCart(id);
//       return;
//     }

//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         (item.idProduto || item.id) === id
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   // Limpar carrinho e resetar o tipo de pedido
//   const clearCart = () => {
//     setCartItems([]);
//     setOrderType(""); // Reseta a opção quando o carrinho for limpo
//   };

//   // Valor total (Corrigido para aceitar tanto 'price' quanto 'preco', prevenindo NaN se vier em português da API)
//   const totalValue = cartItems.reduce((acc, item) => {
//     const precoItem = item.preco || item.price || 0;
//     return acc + precoItem * item.quantity;
//   }, 0);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         orderType,       // Exporta o estado da escolha do pedido
//         setOrderType,    // Exporta a função para alterar a escolha
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         totalValue,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// // Hook personalizado
// export const useCart = () => {
//   const context = useContext(CartContext);

//   if (!context) {
//     throw new Error(
//       "useCart deve ser usado dentro de um CartProvider"
//     );
//   }

//   return context;
// };