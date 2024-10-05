import './App.css';
import { BrowserRouter, Routes, Route, Navigate, RouterProvider } from "react-router-dom";

import AllOrders from './components/AllOrders';
import Layout from './layouts/Layout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/orders" element={<AllOrders />} />
        </Routes>
      </Layout>  
      </BrowserRouter>
    </div>
  );
}

export default App;
