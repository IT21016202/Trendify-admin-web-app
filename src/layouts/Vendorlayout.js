// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Nav } from "react-bootstrap";
// import { Link, useLocation } from "react-router-dom";
// import "../css/layout.css";

// const Vendorlayout = ({ children }) => {
//   // State to manage the open/close of child nav links
//   const [openSubNav, setOpenSubNav] = useState({
//     order: false,
//     product: false,
//   });
//   const location = useLocation();

//   // Check the location path and set the initial openSubNav state
//   useEffect(() => {
//     if (location.pathname.startsWith("/orders")) {
//       setOpenSubNav({ order: true, product: false });
//     } else if (location.pathname.startsWith("/products")) {
//       setOpenSubNav({ order: false, product: true });
//     } else {
//       setOpenSubNav({ order: false, product: false });
//     }
//   }, [location.pathname]);

//   // Function to toggle the open/close of child nav links
//   const toggleSubNav = (key) => {
//     setOpenSubNav((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   return (
//     <Container fluid>

//       <Row>
//         {/* Sidebar */}
//         <Col md={2} className="bg-dark vh-100">
//           <Nav className="flex-column p-3 pt-4" style={{ textAlign: "left" }}>
//             {/* Orders Navigation */}
//             <Nav.Item>
//               <Nav.Link
//                 as={Link}
//                 to="#"
//                 className="text-white"
//                 style={{ fontSize: "18px", fontWeight: "bold" }}
//                 onClick={() => toggleSubNav("order")}
//               >
//                 Orders
//               </Nav.Link>
//               {openSubNav.order && (
//                 <Nav className="flex-column ms-3">
//                   <Nav.Item>
//                     <Nav.Link
//                       as={Link}
//                       to="/orders?type=all"
//                       className={`text-white ${
//                         location.search === "?type=all" ? "active" : ""
//                       }`}
//                     >
//                       All Orders
//                     </Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item>
//                     <Nav.Link
//                       as={Link}
//                       to="/orders?type=processing"
//                       className={`text-white ${
//                         location.search === "?type=processing" ? "active" : ""
//                       }`}
//                     >
//                       Processing
//                     </Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item>
//                     <Nav.Link
//                       as={Link}
//                       to="/orders?type=dispatched"
//                       className={`text-white ${
//                         location.search === "?type=dispatched" ? "active" : ""
//                       }`}
//                     >
//                       Dispatched
//                     </Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item>
//                     <Nav.Link
//                       as={Link}
//                       to="/orders?type=delivered"
//                       className={`text-white ${
//                         location.search === "?type=delivered" ? "active" : ""
//                       }`}
//                     >
//                       Delivered
//                     </Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item>
//                     <Nav.Link
//                       as={Link}
//                       to="/orders?type=cancelled"
//                       className={`text-white ${
//                         location.search === "?type=cancelled" ? "active" : ""
//                       }`}
//                     >
//                       Cancelled
//                     </Nav.Link>
//                   </Nav.Item>
//                 </Nav>
//               )}
//             </Nav.Item>

//             {/* Home Navigation */}
//             <Nav.Item>
//               <Nav.Link
//                 as={Link}
//                 to="#"
//                 className={`text-white ${
//                   location.pathname === "/" ? "active" : ""
//                 }`}
//               >
//                 Home
//               </Nav.Link>
//             </Nav.Item>

//             <Nav.Item>
//               <Nav.Link
//                 as={Link}
//                 to="/vendor"
//                 className={`text-white ${
//                   location.pathname === "/admin" ? "active" : ""
//                 }`}
//               >
//                 Products
//               </Nav.Link>
//             </Nav.Item>

//             {/* Notifications Navigation */}
//             <Nav.Item>
//               <Nav.Link
//                 as={Link}
//                 to="/vendor/notifications"
//                 className={`text-white ${
//                   location.pathname === "/vendor/notifications" ? "active" : ""
//                 }`}
//               >
//                 Notifications
//               </Nav.Link>
//             </Nav.Item>

//             {/* Products Navigation */}
//           </Nav>
//         </Col>

//         {/* Main Content */}
//         <Col md={10} className="p-4">
//           {children}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Vendorlayout;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/layout.css";

const Vendorlayout = ({ children }) => {
  const [openSubNav, setOpenSubNav] = useState({
    vendorOrder: false,
    product: false,
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      if (user.userType !== "Vendor") {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (location.pathname.startsWith("/vendor-orders")) {
      setOpenSubNav({ vendorOrder: true, product: false });
    } else if (location.pathname.startsWith("/products")) {
      setOpenSubNav({ vendorOrder: false, product: true });
    } else {
      setOpenSubNav({ vendorOrder: false, product: false });
    }
  }, [location.pathname]);

  const toggleSubNav = (key) => {
    setOpenSubNav((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-dark vh-100">
          <Nav className="flex-column p-3 pt-4" style={{ textAlign: "left" }}>
            <Nav.Item>
              <Nav.Link
                onClick={() => handleNavigation("/vendor")}
                className="text-white"
              >
                Vendor Products
              </Nav.Link>
            </Nav.Item>

            {/* Vendor Orders Navigation */}
            <Nav.Item>
              <Nav.Link
                onClick={() => toggleSubNav("vendorOrder")}
                className="text-white"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                Vendor Orders
              </Nav.Link>
              {openSubNav.vendorOrder && (
                <Nav className="flex-column ms-3">
                  <Nav.Item>
                    <Nav.Link
                      onClick={() =>
                        handleNavigation("/vendor-orders?type=all")
                      }
                      className="text-white"
                    >
                      All Orders
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() =>
                        handleNavigation("/vendor-orders?type=processing")
                      }
                      className="text-white"
                    >
                      Processing
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() =>
                        handleNavigation("/vendor-orders?type=dispatched")
                      }
                      className="text-white"
                    >
                      Dispatched
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() =>
                        handleNavigation("/vendor-orders?type=delivered")
                      }
                      className="text-white"
                    >
                      Delivered
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() =>
                        handleNavigation("/vendor-orders?type=cancelled")
                      }
                      className="text-white"
                    >
                      Cancelled
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              )}
            </Nav.Item>

            {/* <Nav.Item>
              <Nav.Link
                onClick={() => toggleSubNav("product")}
                className="text-white"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                Products
              </Nav.Link>
              {openSubNav.product && (
                <Nav className="flex-column ms-3">
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => handleNavigation("/vendor/products")}
                      className="text-white"
                    >
                      View Products
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              )}
            </Nav.Item> */}

            <Nav.Item>
              <Nav.Link
                onClick={() => handleNavigation("/vendor/notifications")}
                className="text-white"
              >
                Notifications
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={10} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default Vendorlayout;
