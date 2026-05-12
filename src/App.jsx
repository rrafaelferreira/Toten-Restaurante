import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./Shop/Context/CartContext";

// Importação das páginas (verifique se os nomes batem com as pastas reais!)
import Home from "./pages/home/Home";
import OrderType from "./pages/OrderType/OrderType";
import Menu from "./pages/Menu/Menu"; 
import ShoppingCart from "./pages/Cart/ShoppingCart";

import "./App.css";

function App() {
  return (
    <CartProvider>
      {/* O <Router> foi removido daqui porque já está no main.jsx */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order-type" element={<OrderType />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
    </CartProvider>
  );
}

export default App;