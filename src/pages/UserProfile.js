import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Vendorlayout from "../layouts/Vendorlayout";
import Vendornav from "../layouts/Vendornav";


const UserProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Fetch user data from localStorage or an API
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUser(userData);
    } else {
      console.error("No user data found.");
    }
  }, []);

  return (
    <Vendorlayout>
        <Vendornav />
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg p-3 mb-5 bg-white rounded">
            <Card.Body className="text-center">
              <div className="profile-image mb-3">
                <img
                  src="https://via.placeholder.com/150"
                  alt="User Avatar"
                  className="rounded-circle"
                  style={{ width: "150px", height: "150px" }}
                />
              </div>

              <h3 className="mb-3">{user.name}</h3>
              <p className="text-muted">{user.email}</p>
              <p className="text-muted">Phone: {user.phoneNumber}</p>
              <p className="text-muted">Description: {user.description}</p>

              <Button variant="primary" className="mt-3">
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <style>
        /* Add this CSS to your global styles or component-specific CSS file */
        {`.profile-image img {
            border: 5px solid #007bff;
            }

            .card {
            transition: transform 0.3s;
            }

            .card:hover {
            transform: scale(1.05);
            }

            .btn-primary {
            background-color: #007bff;
            border-color: #007bff;
            }

            .btn-primary:hover {
            background-color: #0056b3;
            border-color: #004085;
        }`}
      </style>
    </Container>
    </Vendorlayout>
  );
};

export default UserProfile;
