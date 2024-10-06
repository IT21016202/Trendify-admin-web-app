import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/layout.css";

const Adminlayout = ({ children }) => {
  // State to manage the open/close of child nav links

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      console.log(user); // Access user properties like user.name, user.email, etc.

      if (user.userType !== "Admin") {
        navigate("/login");
      }
    } else {
      console.error("No user data found in localStorage.");
    }
  }, []);

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
      ></div>
    </nav>
  );
};

export default Adminlayout;
