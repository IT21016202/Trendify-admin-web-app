import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../css/layout.css";

const Adminlayout = ({ children }) => {
  // State to manage the open/close of child nav links
  const [openSubNav, setOpenSubNav] = useState({});
  const location = useLocation();

  // Check the location path and set the initial openSubNav state
  useEffect(() => {
    if (location.pathname.startsWith("/orders")) {
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a
        className="navbar-brand"
        href="#"
        style={{ color: "white", margin: "10px" }}
      >
        Admin Portal
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-center"
        id="navbarText"
      >
        <ul className="navbar-nav">
          <li className="nav-item active mx-3">
            {" "}
            {/* Add mx-3 for horizontal margin */}
            <a className="nav-link" href="/admin" style={{ color: "white" }}>
              Home
            </a>
          </li>
          <li className="nav-item mx-3">
            {" "}
            {/* Add mx-3 for horizontal margin */}
            <a
              className="nav-link"
              href="/admin/vendors"
              style={{ color: "white" }}
            >
              Vendors
            </a>
          </li>
          <li className="nav-item mx-3">
            {" "}
            {/* Add mx-3 for horizontal margin */}
            <a
              className="nav-link"
              href="/admin/customers"
              style={{ color: "white" }}
            >
              Customers
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Adminlayout;
