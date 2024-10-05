import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import '../css/layout.css';

const Layout = ({ children }) => {
  // State to manage the open/close of child nav links
  const [openSubNav, setOpenSubNav] = useState({});
  const location = useLocation();

  // Check the location path and set the initial openSubNav state
  useEffect(() => {
    if (location.pathname.startsWith('/orders')) {
      setOpenSubNav({ order: true });
    } else {
      setOpenSubNav({ order: false });
    }
  }, [location.pathname]);

  // Function to toggle the open/close of child nav links
  const toggleSubNav = (key) => {
    setOpenSubNav((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark vh-100">
          <Nav className="flex-column p-3 pt-4" style={{ textAlign: 'left' }}>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="#"
                className="text-white"
                style={{fontSize: '18px', fontWeight: 'bold'}}
                onClick={() => toggleSubNav('order')}
              >
                Orders
              </Nav.Link>
              {openSubNav.order && (
                <Nav className="flex-column ms-3">
                  <Nav.Item>
                    <Nav.Link as={Link} to="/orders?type=all" className={`text-white ${location.search === '?type=all' ? 'active' : ''}`}>All Orders</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/orders?type=processing" className={`text-white ${location.search === '?type=processing' ? 'active' : ''}`}>Processing</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/orders?type=dispatched" className={`text-white ${location.search === '?type=dispatched' ? 'active' : ''}`}>Dispatched</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/orders?type=delivered" className={`text-white ${location.search === '?type=delivered' ? 'active' : ''}`}>Delivered</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/orders?type=cancelled" className={`text-white ${location.search === '?type=cancelled' ? 'active' : ''}`}>Cancelled</Nav.Link>
                  </Nav.Item>
                </Nav>
              )}
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/profile" className="text-white">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/settings" className="text-white">Settings</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
