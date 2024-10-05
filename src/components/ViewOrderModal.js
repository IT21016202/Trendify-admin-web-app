import React, {useEffect, useState} from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const ViewOrderModal = ({ show, handleClose, order }) => {
  
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

    useEffect(() => {
        if (order) {
            fetch(`https://localhost:7022/api/customer/${order.userId}`)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                    setCustomerName(data.customerName);
                    setCustomerEmail(data.email);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }, [order]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {order ? (
          <div>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Customer ID:</strong> {order.userId}</p>
            <p><strong>Customer Name:</strong> {customerName}</p>
            <p><strong>Customer Email:</strong> {customerEmail}</p>
            {/* Mobile */}
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total Price:</strong> ${order.orderTotal}</p>
            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>

            <h6><strong>Ordered Products:</strong></h6>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product ID / Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems && order.orderItems.length > 0 ? (
                  order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.productName} - {item.productId}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No products in the order.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        ) : (
          <p>No order selected.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewOrderModal;
