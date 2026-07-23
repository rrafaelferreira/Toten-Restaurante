import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./Shop/Context/CartContext";

// Importação das páginas
import Home from "./pages/home/Home";
import OrderType from "./pages/OrderType/OrderType";
import Menu from "./pages/Menu/Menu"; 
import ShoppingCart from "./pages/Cart/ShoppingCart";
import Payment from "./pages/Payments/payment";

// --- NOVO: Importando suas telas prontas de Login e Cadastro ---
import Logins from "./components/formularios/login/logins";
import Registers from "./components/formularios/register/registers";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order-type" element={<OrderType />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/login" element={<Logins />} />
        <Route path="/register" element={<Registers />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </CartProvider>
  );
}

export default App;