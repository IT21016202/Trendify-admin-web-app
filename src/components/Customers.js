import React, { useEffect, useState } from "react";
import Adminlayout from "../layouts/Adminlayout";
import axios from "axios";
import Layout from "../layouts/Layout";

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
    // Make API call to activate the customer
    axios
      .post(`https://localhost:7022/api/Customer/${customerId}/activate`)
      .then((response) => {
        getCustomers();
      })
      .catch((error) => {
        console.error("There was an error activating the customer!", error);
      });
  };

  const handleDeactivate = (customerId) => {
    axios
      .post(`https://localhost:7022/api/Customer/deactivate/${customerId}`)
      .then((response) => {
        getCustomers();
      })
      .catch((error) => {
        console.error("There was an error deactivating the customer!", error);
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
              style={{ width: "80%", margin: "0 auto" }}
            >
              <thead>
                <tr>
                  <th scope="col" style={{ width: "10%" }}>
                    Id
                  </th>
                  <th scope="col" style={{ width: "30%" }}>
                    Customer Name
                  </th>
                  <th scope="col" style={{ width: "30%" }}>
                    Email
                  </th>{" "}
                  <th scope="col" style={{ width: "30%" }}>
                    Account Status
                  </th>
                  <th scope="col" style={{ width: "40%" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map(
                  (
                    customer,
                    index // Map through customer data
                  ) => (
                    <tr key={customer.id}>
                      <td style={{ textAlign: "center" }}>{customer.id}</td>
                      <td style={{ textAlign: "center" }}>
                        {customer.customerName}
                      </td>
                      <td style={{ textAlign: "center" }}>{customer.email}</td>
                      <td style={{ textAlign: "center" }}>
                        <span
                          style={{
                            color:
                              customer.status === "Active" ? "green" : "red",
                          }}
                        >
                          {customer.status}
                        </span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {customer.status === "Active" ? (
                          <button
                            className="btn btn-warning"
                            onClick={() => handleDeactivate(customer.id)}
                          >
                            Deactivate
                          </button>
                        ) : (
                          <button
                            className="btn btn-success"
                            onClick={() => handleActivate(customer.id)}
                          >
                            Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </center>
      </div>
    </Layout>
  );
};

export default Customers;
