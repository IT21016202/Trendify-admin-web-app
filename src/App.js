import './App.css';
import { BrowserRouter, Routes, Route, Navigate, RouterProvider } from "react-router-dom";

import AllOrders from './components/AllOrders';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/orders" element={<AllOrders />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
