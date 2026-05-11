import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Adicionar ao carrinho
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Verifica se o item já existe no carrinho pelo ID
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Se já existe, aumenta a quantidade
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Se é novo, adiciona ao array com quantidade 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remover item completamente (ou diminuir quantidade)
  const removeFromCart = (id) => {
    setCartItems((prevItems) => 
      prevItems.filter(item => item.id !== id)
    );
  };

  // Limpar todo o carrinho (Usar ao voltar para a Home ou finalizar pedido)
  const clearCart = () => {
    setCartItems([]);
  };

  // Cálculo do valor total
  const totalValue = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalValue }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para facilitar o uso nos componentes
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};