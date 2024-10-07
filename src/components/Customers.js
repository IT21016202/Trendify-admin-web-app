import React, { useEffect, useState } from "react";
import Adminlayout from "../layouts/Adminlayout";
import axios from "axios";
import Layout from "../layouts/Layout";
import Swal from "sweetalert2";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "https://localhost:7022/api/Customer"; // Replace with your actual API URL

  // Function to fetch customer data
  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getAllcustomers`);
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleActivate = (customerId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Active it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`https://localhost:7022/api/Customer/activate/${customerId}`)
          .then((response) => {
            Swal.fire({
              title: "Account Activated!",
              text: "User Account activate successfully",
              icon: "success",
            });

            getCustomers();
          })
          .catch((error) => {
            console.error("There was an error activating the customer!", error);
          });
      }
    });
  };

  const handleDeactivate = (customerId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deactive it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`https://localhost:7022/api/Customer/deactivate/${customerId}`)
          .then((response) => {
            Swal.fire({
              title: "Account Deactivated!",
              text: "User Account deactivate successfully",
              icon: "success",
            });
            getCustomers();
          })
          .catch((error) => {
            console.error(
              "There was an error deactivating the customer!",
              error
            );
          });
      }
    });
  };

  return (
    <Layout>
      <div>
        <Adminlayout />
        <h1 style={{ fontSize: "2rem", margin: "20px 0" }}>Customers</h1>
        <center>
          <div style={{ overflowX: "auto" }}>
            <table
              className="table table-bordered mx-4"
              style={{
                width: "80%",
                margin: "0 auto",
                borderCollapse: "collapse",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <thead style={{ backgroundColor: "#f5f5f5" }}>
                <tr>
                  <th
                    scope="col"
                    style={{
                      width: "10%",
                      padding: "12px",
                      textAlign: "center",
                      fontWeight: "bold",
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
                      fontWeight: "bold",
                      borderBottom: "2px solid #ddd",
                      color: "#333",
                    }}
                  >
                    Customer Name
                  </th>
                  <th
                    scope="col"
                    style={{
                      width: "30%",
                      padding: "12px",
                      textAlign: "center",
                      fontWeight: "bold",
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
                      fontWeight: "bold",
                      borderBottom: "2px solid #ddd",
                      color: "#333",
                    }}
                  >
                    Account Status
                  </th>
                  <th
                    scope="col"
                    style={{
                      width: "40%",
                      padding: "12px",
                      textAlign: "center",
                      fontWeight: "bold",
                      borderBottom: "2px solid #ddd",
                      color: "#333",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr
                    key={customer.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                      transition: "background-color 0.3s",
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
                      {customer.customerName}
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
                        fontWeight: "bold",
                      }}
                    >
                      <span
                        style={{
                          color: customer.status === "Active" ? "green" : "red",
                        }}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                        border: "1px solid #ddd",
                      }}
                    >
                      {customer.status === "Active" ? (
                        <button
                          className="btn btn-warning"
                          style={{
                            padding: "8px 16px",
                            fontWeight: "bold",
                            backgroundColor: "#ffc107",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            color: "#fff",
                          }}
                          onClick={() => handleDeactivate(customer.id)}
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          className="btn btn-success"
                          style={{
                            padding: "8px 16px",
                            fontWeight: "bold",
                            backgroundColor: "#28a745",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            color: "#fff",
                          }}
                          onClick={() => handleActivate(customer.id)}
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </center>
      </div>
    </Layout>
  );
};

export default Customers;
