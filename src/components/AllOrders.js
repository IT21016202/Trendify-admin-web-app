import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; 

import Layout from '../layouts/Layout';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
      axios.get('https://localhost:7022/api/order')
      .then((response) => {
        //console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <div>
        <h1>All Orders</h1>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer ID</th>
              <th>Products</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return (
                <tr key={order.id}>
                  <td>{index+1}</td>
                  <td>{order.userId}</td>
                  <td>N/A</td>
                  <td>N/A</td>
                  <td>{order.orderTotal}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{order.status}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <Link to="/add-order">Add Order</Link> */}
      </div>
      </Layout>
  )
}

export default AllOrders