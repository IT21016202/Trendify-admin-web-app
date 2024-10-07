import React, { useEffect, useState } from "react";
import Adminlayout from "../layouts/Adminlayout";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import Layout from "../layouts/Layout";

const Vendors = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [vendorName, setVendorName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorPhone, setVendorPhone] = useState("");
  const [vendorPassword, setVendorPassword] = useState("");
  const [vendorCPassword, setVendorCPassword] = useState("");

  const BASE_URL = "https://localhost:7022/api/Vendor"; // Replace with your actual API URL

  // Function to fetch customer data
  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching customer data:", error);
      throw error;
    }
  };

  const getCustomers = async () => {
    try {
      const data = await fetchCustomerData();
      setCustomers(data); // Assuming the data is in the format you need
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch customers on component mount
  useEffect(() => {
    getCustomers();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClose = () => {
    setVendorName(""); // Clear vendor name
    setVendorEmail(""); // Clear vendor email
    setVendorPhone(""); // Clear vendor phone number
    setVendorPassword("");
    setVendorCPassword("");
    setShowModal(false);
  };

  const handleShow = () => setShowModal(true); // Function to show the modal

  const createVendor = async (e) => {
    e.preventDefault();

    const vendorData = {
      Name: vendorName,
      Email: vendorEmail,
      PhoneNumber: vendorPhone,
      Password: vendorPassword,
      ConfirmPassword: vendorCPassword,
    };

    try {
      const response = await axios.post(
        "https://localhost:7022/api/vendor",
        vendorData
      );
      console.log("Vendor created successfully:", response.data);
      getCustomers();
      handleClose(); // Close the modal on success

      if (response.status === 201) {
        toast.success("Registration Successfull", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });

        setVendorName(""); // Clear vendor name
        setVendorEmail(""); // Clear vendor email
        setVendorPhone(""); // Clear vendor phone number
        setVendorPassword("");
      } else {
        toast("Registration Successfull");
        console.log(
          "Redirect not performed: either the user is admin or status is not 201.",
          response
        );
      }
    } catch (err) {
      console.error("There was an error creating the vendor:", err);
      setError("Failed to create vendor. Please try again."); // Set error message
    }
  };
  return (
    <Layout>
      <div>
        <Adminlayout />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              margin: 0,
              textAlign: "center",
              flexGrow: 1, // Use flexGrow to allow it to expand
              display: "flex",
              justifyContent: "center", // Center the text within the flex item
            }}
          >
            Vendors
          </h1>
          <button
            onClick={handleShow}
            className="btn btn-primary"
            style={{ marginRight: "20px" }} // Adjust margin as needed
          >
            Add Vendor
          </button>
        </div>

        {/* Modal */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Vendor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <div className="alert alert-danger">{error}</div>}{" "}
            {/* Show error message if any */}
            <form>
              <div className="mb-3">
                <label htmlFor="vendorName" className="form-label">
                  Vendor Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="vendorName"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)} // Update state on input change
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="vendorEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="vendorEmail"
                  value={vendorEmail}
                  onChange={(e) => setVendorEmail(e.target.value)} // Update state on input change
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="vendorPhone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="vendorPhone"
                  value={vendorPhone}
                  onChange={(e) => setVendorPhone(e.target.value)} // Update state on input change
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="vendorPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="vendorPassword"
                  value={vendorPassword}
                  onChange={(e) => setVendorPassword(e.target.value)} // Update state on input change
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="vendorPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="vendorCPassword"
                  value={vendorCPassword}
                  onChange={(e) => setVendorCPassword(e.target.value)} // Update state on input change
                  required
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                createVendor(e);
              }}
            >
              Save Vendor
            </button>
          </Modal.Footer>
        </Modal>
        <center>
          <div style={{ overflowX: "auto" }}>
            <table
              className="table table-bordered mx-4"
              style={{
                width: "80%",
                margin: "0 auto",
                borderCollapse: "collapse",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              <thead style={{ backgroundColor: "#f4f4f9" }}>
                <tr>
                  <th
                    scope="col"
                    style={{
                      width: "10%",
                      padding: "12px",
                      textAlign: "center",
                      fontWeight: "600",
                      borderBottom: "2px solid #ddd",
                      color: "#333",
                    }}
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    style={{
                      width: "30%",
                      padding: "12px",
                      textAlign: "center",
                      fontWeight: "600",
                      borderBottom: "2px solid #ddd",
                      color: "#333",
                    }}
                  >
                    Vendor Name
                  </th>
                  <th
                    scope="col"
                    style={{
                      width: "30%",
                      padding: "12px",
                      textAlign: "center",
                      fontWeight: "600",
                      borderBottom: "2px solid #ddd",
                      color: "#333",
                    }}
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    style={{
                      width: "30%",
                      padding: "12px",
                      textAlign: "center",
                      fontWeight: "600",
                      borderBottom: "2px solid #ddd",
                      color: "#333",
                    }}
                  >
                    Phone Number
                  </th>
                  <th
                    scope="col"
                    style={{
                      width: "30%",
                      padding: "12px",
                      textAlign: "center",
                      fontWeight: "600",
                      borderBottom: "2px solid #ddd",
                      color: "#333",
                    }}
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers
                  .filter((customer) => customer.userType === "Vendor")
                  .map((customer, index) => (
                    <tr
                      key={customer.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                        transition: "background-color 0.3s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#e0f7fa")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          index % 2 === 0 ? "#f9f9f9" : "#fff")
                      }
                    >
                      <td
                        style={{
                          textAlign: "center",
                          padding: "10px",
                          border: "1px solid #ddd",
                        }}
                      >
                        {customer.id}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "10px",
                          border: "1px solid #ddd",
                        }}
                      >
                        {customer.name}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "10px",
                          border: "1px solid #ddd",
                        }}
                      >
                        {customer.email}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "10px",
                          border: "1px solid #ddd",
                        }}
                      >
                        {customer.phoneNumber}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "10px",
                          border: "1px solid #ddd",
                        }}
                      >
                        {customer.description}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </center>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default Vendors;
