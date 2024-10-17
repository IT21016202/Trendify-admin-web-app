// This component displays a list of orders and allows to view, update, cancel or delete an order
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation  } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil, faEye, faBan } from '@fortawesome/free-solid-svg-icons';
import Layout from '../layouts/Layout';
import UpdateOrderModal from "./UpdateOrderModal";
import ViewOrderModal from "./ViewOrderModal";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Handle input change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

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

  // Filter products based on the filter input
  const filteredOrders = orders.filter(order => {
      const userFilter = order.userId.toLowerCase().includes(filter.toLowerCase());
      const dateFilter = order.orderDate.toLowerCase().includes(filter.toLowerCase());
      const priceFilter = order.orderTotal.toString().toLowerCase().includes(filter.toLowerCase());
      return userFilter || dateFilter || priceFilter;
  });

  // Show modal
  const handleShow = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Close modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  // Update order
  const handleUpdate = (updatedOrder) => {
    setOrders(orders.map(order => order.id === updatedOrder.id ? updatedOrder : order));
  };

  // View order
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  //Cancel order
  const handleCancel = (id) => {
    const res = window.confirm('Are you sure you want to cancel this order?');
    if (res) {
      axios.put(`https://localhost:7022/api/order/${id}/cancel`)
        .then(response => {
          //setOrders(orders.map(order => order.id === id ? response.data : order));
          alert('Order cancelled successfully');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  // Delete order
  const handleDelete = (id) => {
    const res = window.confirm('Are you sure you want to delete this order?');
    if (res) {
      axios.delete(`https://localhost:7022/api/order/${id}`)
      .then(response => {
        if(response.status === 200){
          alert('Order deleted successfully');
        }
        setOrders(orders.filter(order => order.id !== id));
      })
      .catch(error => {
        alert('An error occurred. Please try again');
        console.log(error);
      });
    } 
  };

  return (
    <Layout>
      <div>
        <h4 className="pb-3 pt-2" style={{textAlign: "left"}}>
          {orderType === 'all' ? 'ALL ORDERS' : orderType === 'processing' ? 'PROCESSING ORDERS' : orderType === 'dispatched' ? 'DISPATCHED ORDERS' : orderType === 'delivered' ? 'DELIVERED ORDERS' : orderType === 'cancelled' ? 'CANCELLED ORDERS' : 'ALL ORDERS'}
        </h4>
        <input type="text" placeholder="Search Orders" value={filter} onChange={handleFilterChange} className="form-control mb-3" style={{width: '350px', float: 'right'}}/>
        <table className="table table-hover table-striped">
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
            {filteredOrders?.map((order, index) => {
              return (
                <tr key={order.id}>
                  <td>{index+1}</td>
                  <td>{index+1}</td>

                  <td>
                    {order.orderItems && order.orderItems.length > 0 ? (
                      order.orderItems.map((item, index) => (
                        <div key={index}>{item.productName}</div>
                      ))
                    ) : (
                      <div>N/A</div>
                    )}
                  </td>

                  <td>
                    {order.orderItems && order.orderItems.length > 0 ? (
                      order.orderItems.map((item, index) => (
                        <div key={index}>{item.quantity}</div>
                      ))
                    ) : (
                      <div>N/A</div>
                    )}
                  </td>

                  <td>{order.orderTotal}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{order.status}</td>
                  <td>
                    <button className="btn btn-success btn-sm" style={{marginRight: '5px' , color: 'white'}}><FontAwesomeIcon icon={faPencil}/></button>
                    <button className="btn btn-info btn-sm" style={{marginRight: '5px', color: 'white'}} onClick={() => handleViewOrder(order)}><FontAwesomeIcon icon={faEye}/></button>
                    <button className="btn btn-warning btn-sm" style={{marginRight: '5px' , color: 'white'}} onClick={() => handleShow(order)}><FontAwesomeIcon icon={faPencil}/></button>
                    <button className="btn btn-danger btn-sm" style={{marginRight: '5px' , color: 'white'}} onClick={() => handleCancel(order.id)}><FontAwesomeIcon icon={faBan}/></button>
                    <button className="btn btn-danger btn-sm"><FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(order.id)}/></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {selectedOrder && (
          <UpdateOrderModal
            show={showModal}
            handleClose={handleClose}
            order={selectedOrder}
            onUpdate={handleUpdate}
          />
        )}

        {selectedOrder && (
          <ViewOrderModal
            show={showViewModal}
            handleClose={() => setShowViewModal(false)}
            order={selectedOrder}
          />
        )}

      </div>
      </Layout>
  )
}

export default Orders