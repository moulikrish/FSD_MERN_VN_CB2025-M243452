import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Uitem from "./components/Uitem";
import OrderItem from "./components/OrderItem";

<Router>
  <Routes>
    <Route path="/products" element={<Products />} />
    <Route path="/uitem/:id" element={<Uitem />} />
    <Route path="/orderitem/:id" element={<OrderItem />} />
  </Routes>
</Router>
