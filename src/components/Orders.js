import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation  } from 'react-router-dom'; 

import Layout from '../layouts/Layout';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const orderType = queryParams.get('type'); // Get 'type' parameter

  useEffect(() => {
      axios.get('https://localhost:7022/api/order')
      .then((response) => {
        if (orderType === 'all'){
          setOrders(response.data);
        }else if (orderType === 'processing'){  
          setOrders(response.data.filter(order => order.status === 'Processing'));
        }else if (orderType === 'dispatched'){
          setOrders(response.data.filter(order => order.status === 'Dispatched'));
        }else if (orderType === 'delivered'){
          setOrders(response.data.filter(order => order.status === 'Delivered'));
        }else if (orderType === 'cancelled'){
          setOrders(response.data.filter(order => order.status === 'Cancelled'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [orderType]);

  return (
    <Layout>
      <div>
        <h4 className="pb-3 pt-2" style={{textAlign: "left"}}>
          {orderType === 'all' ? 'ALL ORDERS' : orderType === 'processing' ? 'PROCESSING ORDERS' : orderType === 'dispatched' ? 'DISPATCHED ORDERS' : orderType === 'delivered' ? 'DELIVERED ORDERS' : orderType === 'cancelled' ? 'CANCELLED ORDERS' : 'ALL ORDERS'}
        </h4>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer ID</th>
              <th>Products</th>
              <th>Quantity</th>
              <th>Price ($)</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => {
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
                    <button className="btn btn-info btn-sm" style={{marginRight: '5px'}}>View</button>
                    <button className="btn btn-warning btn-sm" style={{marginRight: '5px'}}>Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
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