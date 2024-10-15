import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Adminlayout from "../layouts/Adminlayout";
import "../css/Admininventory.css"; // Import your custom CSS
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import alert from "../images/alert.png";
import { Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

const handleDeleteCategory = () => {};

const Admininventory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [product, setProduct] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [vendorId, setVendorId] = useState("");
  const [productId, setProductId] = useState("");

  ChartJS.register(ArcElement, Tooltip, Legend, Title);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName) return;

    try {
      const response = await fetch(
        "https://localhost:7022/api/Inventory/addCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ CategoryName: newCategoryName }),
        }
      );

      if (response.ok) {
        const createdCategory = await response.json();
        setCategories([...categories, createdCategory]);
        setNewCategoryName("");

        fetchCategories();
      } else {
        console.error("Error creating category:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://localhost:7022/api/Inventory/getCategories"
      );
      const data = await response.json();
      setCategories(data);

      console.log(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCategoryCounts = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7022/api/Inventory/countByCategory"
      ); // Adjust the URL based on your API route

      // Check if the response status is in the range of 200-299
      if (response.status >= 200 && response.status < 300) {
        const data = response.data; // Axios automatically parses JSON

        console.log(data); // Log the data
        setCategoryCounts(data); // Update the state with the data
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error(error.message); // Log any errors
    } finally {
    }
  };

  // Fetch existing categories from the backend
  useEffect(() => {
    fetchCategories();
    fetchCategoryCounts();
    fetchProducts();
  }, []);

  const chartData = {
    labels: categoryCounts.map((category) => category.categoryName),
    datasets: [
      {
        data: categoryCounts.map((category) => category.productCount),
        backgroundColor: [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
        ],
        hoverBackgroundColor: [
          "#FF6384", // Dark Red
          "#36A2EB", // Dark Blue
          "#FFCE56", // Dark Yellow
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const fetchProducts = () => {
    axios
      .get("https://localhost:7022/api/Product/getAllProducts")
      .then((response) => {
        const data = response.data;

        // Filter products that have status 'approved'
        const approvedProducts = data.filter(
          (product) => product.status === "Approve"
        );

        setProduct(approvedProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const notifyVendor = (vendorId, productId) => {
    console.log(vendorId, productId);

    setProductId(productId);
    setVendorId(vendorId);

    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => setShowModal(true);

  const sendMessage = () => {
    const messageData = {
      vendorId,
      productId,
      message,
    };

    axios
      .post("https://localhost:7022/api/Notification", messageData)
      .then((response) => {
        console.log(response);
        setMessage("");
        setShowModal(false);

        toast.success("Send Message to Vendor", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <Adminlayout />
      <div className="inventory-container">
        <div className="category-box">
          <h3>Categories</h3>
          <form>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New Category Name"
              required
              style={{
                padding: "10px", // Add padding for better spacing
                margin: "5px", // Add margin for spacing from other elements
                border: "1px solid #ccc", // Light gray border
                borderRadius: "5px", // Rounded corners
                fontSize: "16px", // Larger font size
                width: "calc(100% - 22px)", // Full width minus padding/border
                boxSizing: "border-box", // Include padding in the total width
                transition: "border-color 0.3s", // Smooth transition for border color
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#4CAF50"; // Change border color on focus
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#ccc"; // Revert border color when not focused
              }}
            />
            <button
              type="button"
              style={{
                margin: "5px",
                border: "none",
                padding: "10px 20px",
                backgroundColor: "#4CAF50", // Green background
                color: "white", // White text
                fontSize: "16px", // Larger text
                borderRadius: "5px", // Rounded corners
                cursor: "pointer", // Pointer cursor on hover
                transition: "background-color 0.3s, transform 0.2s", // Smooth transitions
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#45a049"; // Darker green on hover
                e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#4CAF50"; // Revert to original color
                e.currentTarget.style.transform = "scale(1)"; // Revert to original size
              }}
              onClick={(e) => handleCreateCategory(e)}
            >
              Add Category
            </button>
          </form>

          <table
            style={{
              width: "100%", // Full width for the table
              borderCollapse: "collapse", // Remove gaps between borders
              margin: "10px 0", // Margin for spacing
              backgroundColor: "#f9f9f9", // Light background for the table
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "10px", // Padding inside header cells
                    borderBottom: "1px solid #ddd", // Divider under header
                    textAlign: "left", // Left align text
                    color: "#333", // Dark text color
                  }}
                >
                  Category Name
                </th>
                <th
                  style={{
                    padding: "10px", // Padding inside header cells
                    borderBottom: "1px solid #ddd", // Divider under header
                    textAlign: "right", // Right align text
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  style={{
                    transition: "background-color 0.3s", // Smooth transition
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f1f1f1")
                  } // Change background color on hover
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  } // Revert background color
                >
                  <td
                    style={{
                      padding: "10px", // Padding inside each cell
                      borderBottom: "1px solid #ddd", // Divider between rows
                      color: "#333", // Dark text color
                    }}
                  >
                    {category.categoryName}
                  </td>
                  <td
                    style={{
                      padding: "10px", // Padding inside each cell
                      borderBottom: "1px solid #ddd", // Divider between rows
                      textAlign: "right", // Right align actions
                    }}
                  >
                    <button
                      onClick={() => handleDeleteCategory(category.id)} // Call delete function
                      style={{
                        border: "none",
                        padding: "5px 10px",
                        backgroundColor: "#e74c3c", // Red background for delete button
                        color: "white", // White text
                        fontSize: "14px", // Smaller font size
                        borderRadius: "5px", // Rounded corners
                        cursor: "pointer", // Pointer cursor on hover
                        transition: "background-color 0.3s, transform 0.2s", // Smooth transitions
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#c0392b"; // Darker red on hover
                        e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "#e74c3c"; // Revert to original color
                        e.currentTarget.style.transform = "scale(1)"; // Revert to original size
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="chart-container"
          style={{ width: "300px", height: "300px", margin: "0 auto" }}
        >
          <h2>Product Count by Category</h2>
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notify Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}{" "}
          {/* Show error message if any */}
          <form>
            <div className="mb-3">
              <label htmlFor="vendorName" className="form-label">
                Add Message
              </label>
              <input
                type="text"
                className="form-control"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)} // Update state on input change
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
              sendMessage(e);
            }}
          >
            Send
          </button>
        </Modal.Footer>
      </Modal>
      <div>
        <center>
          <table
            style={{
              width: "80%", // Full width for the table
              borderCollapse: "collapse", // Collapse borders
              margin: "20px 0", // Add spacing between elements
              fontFamily: "'Arial', sans-serif", // Clean, readable font
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#4CAF50", // Green header background
                  color: "white", // White text color
                  textAlign: "left", // Left align text
                }}
              >
                <th
                  style={{
                    padding: "8px 10px",
                    fontSize: "15px",
                  }}
                >
                  Product Name
                </th>
                <th
                  style={{
                    padding: "8px 10px",
                    fontSize: "15px",
                  }}
                >
                  Category
                </th>
                <th
                  style={{
                    padding: "8px 10px",
                    fontSize: "15px",
                  }}
                >
                  Quantity
                </th>
                <th
                  style={{
                    padding: "8px 10px",
                    fontSize: "15px",
                  }}
                >
                  Vendor Name
                </th>
                <th
                  style={{
                    padding: "8px 10px",
                    fontSize: "15px",
                  }}
                >
                  Alert Vendor
                </th>
              </tr>
            </thead>
            <tbody>
              {product.map((product) => (
                <tr
                  key={product.id}
                  style={{
                    backgroundColor: "#f9f9f9", // Alternating row color
                    transition: "background-color 0.3s", // Smooth hover effect
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f1f1f1")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f9f9f9")
                  }
                >
                  <td
                    style={{
                      padding: "8px 10px", // Padding inside cells
                      borderBottom: "1px solid #ddd", // Border between rows
                      color: "#333", // Darker text for readability
                    }}
                  >
                    {product.productName}
                  </td>
                  <td
                    style={{
                      padding: "12px 15px",
                      borderBottom: "1px solid #ddd",
                      color: "#333",
                    }}
                  >
                    {product.productCategory}
                  </td>
                  <td
                    style={{
                      padding: "12px 15px",
                      borderBottom: "1px solid #ddd",
                      fontWeight: "bolder",
                      color:
                        product.productQuantity <= 10
                          ? "red"
                          : product.productQuantity < 20
                          ? "yellow"
                          : "green", // Set color based on quantity
                    }}
                  >
                    {product.productQuantity}
                  </td>
                  <td
                    style={{
                      padding: "12px 15px",
                      borderBottom: "1px solid #ddd",
                      color: "#333",
                    }}
                  >
                    {product.vendorName}
                  </td>

                  <td
                    style={{
                      padding: "12px 15px",
                      borderBottom: "1px solid #ddd",
                      color: "#333",
                    }}
                  >
                    <img
                      src={alert}
                      alt=""
                      srcset=""
                      style={{
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                      onClick={() => notifyVendor(product.vendorId, product.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </center>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default Admininventory;
