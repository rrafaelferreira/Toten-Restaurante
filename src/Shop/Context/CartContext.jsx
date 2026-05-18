import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [orderType, setOrderType] = useState(""); // Estado para armazenar "Comer no Local" ou "Para Viagem"

  // Adicionar au carrinho
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Verifica se o item já existe
      const existingItem = prevItems.find(
        (item) => item.id === product.id
      );

      // Se já existir, aumenta a quantidade
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Se for novo item
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remover item completamente
  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  // Atualizar quantidade
  const updateQuantity = (id, newQuantity) => {
    // Remove o item se quantidade <= 0
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Limpar carrinho e resetar o tipo de pedido
  const clearCart = () => {
    setCartItems([]);
    setOrderType(""); // Reseta a opção quando o carrinho for limpo
  };

  // Valor total
  const totalValue = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orderType,       // Exporta o estado da escolha do pedido
        setOrderType,    // Exporta a função para alterar a escolha
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalValue,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart deve ser usado dentro de um CartProvider"
    );
  }

  return context;
};