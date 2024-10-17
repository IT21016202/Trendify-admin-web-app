import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert
import { FaUserCircle } from "react-icons/fa"; // Import FontAwesome User Icon
import { Navbar, Nav, NavDropdown } from "react-bootstrap"; // Import Bootstrap components

const Vendornav = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      console.log(user); // Access user properties like user.name, user.email, etc.
      setUserName(user.name);
    } else {
      console.error("No user data found in localStorage.");
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Show SweetAlert2 confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, remove user data and redirect
        localStorage.removeItem("userData");
        Swal.fire("Logged Out!", "You have been logged out.", "success");

        // Redirect to login page
        navigate("/login");
      }
    });
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#" style={{ margin: "10px" }}>
          Vendor Portal /
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown
              title={
                <>
                  <FaUserCircle size={24} style={{ marginRight: "8px" }} />
                  {userName}
                </>
              }
              id="userProfileDropdown"
            >
              <NavDropdown.Item onClick={() => navigate("/profile")}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="text-danger" onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Vendornav;
