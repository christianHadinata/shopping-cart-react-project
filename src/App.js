import "./App.css";
import { Routes, Route } from "react-router";
import Navbar from "../../5-shopping-cart/src/components/Navbar";
import Home from "../../5-shopping-cart/src/pages/Home";
import ShoppingCart from "../../5-shopping-cart/src/pages/ShoppingCart";

function App() {
  return (
    <div>
      <Navbar />
      <div className="pt-8">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
