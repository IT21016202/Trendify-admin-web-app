import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Orders from "./components/Orders";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Vendors from "./components/Vendors";
import Customers from "./components/Customers";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/vendors" element={<Vendors />} />
          <Route path="/admin/customers" element={<Customers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
