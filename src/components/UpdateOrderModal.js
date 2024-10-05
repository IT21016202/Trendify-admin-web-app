import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const UpdateOrderModal = ({ show, handleClose, order, onUpdate }) => {
  const [status, setStatus] = useState(order ? order.status : '');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const updatedOrder = {
      ...order,
      status: status,
    };

    axios.put(`https://localhost:7022/api/order/${order.id}`, updatedOrder)
      .then(response => {
        onUpdate(response.data); // Update parent component with the new order
        handleClose(); // Close the modal
        alert('' + response.data.status + ' order successfully');
      })
      .catch(error => {
        //console.log(error.response.data);
        alert(error.response.data);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formOrderStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select status</option>
              <option value="Processing">Processing</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Order
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateOrderModal;
