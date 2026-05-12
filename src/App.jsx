import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Shop/Context/CartContext";

// Importação das páginas com os nomes exatos dos ficheiros
import Home from "./pages/home/Home";
import OrderType from "./pages/OrderType/OrderType";
import Menu from "./pages/Menu/Menu";
import ShoppingCart from "./pages/Cart/ShoppingCart";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order-type" element={<OrderType />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;