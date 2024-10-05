import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllOrders from './components/AllOrders';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<AllOrders />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
