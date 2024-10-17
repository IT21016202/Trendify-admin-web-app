import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const UpdateOrderModal = ({ show, handleClose, order, onUpdate }) => {
  //const [status, setStatus] = useState(order ? order.status : '');
  const [shippingAddress, setShippingAddress] = useState(
    order ? order.shippingAddress : ""
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedOrder = {
      ...order,
      //status: status,
      shippingAddress: shippingAddress,
    };

    axios
      .put(`https://localhost:7022/api/order/${order.id}`, updatedOrder)
      .then((response) => {
        onUpdate(response.data); // Update parent component with the new order
        handleClose(); // Close the modal
        alert("Order Updated successfully");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status && error.response.status === 400) {
          alert(error.response.data);
        }
        handleClose(); // Close the modal
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
            <Form.Label>Shipping Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new shipping address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />

            {/* <Form.Label>Status</Form.Label>
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
            </Form.Select> */}
          </Form.Group>

          <Button variant="primary" type="submit" style={{ marginTop: "10px" }}>
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateOrderModal;
