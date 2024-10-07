import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Adminlayout from "../layouts/Adminlayout";
import "../css/Admininventory.css"; // Import your custom CSS
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

const handleDeleteCategory = () => {};

const Admininventory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  ChartJS.register(ArcElement, Tooltip, Legend, Title);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName) return;

    try {
      const response = await fetch("http://localhost:<port>/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category_name: newCategoryName }),
      });

      if (response.ok) {
        const createdCategory = await response.json();
        setCategories([...categories, createdCategory]);
        setNewCategoryName(""); // Clear the input field
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
      // Optional: Any cleanup or final actions can go here
    }
  };

  // Fetch existing categories from the backend
  useEffect(() => {
    fetchCategories();
    fetchCategoryCounts();
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

  return (
    <Layout>
      <Adminlayout />
      <div className="inventory-container">
        <div className="category-box">
          <h3>Categories</h3>
          <form onSubmit={handleCreateCategory}>
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
              type="submit"
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

        {/* Pie Chart Box */}
        {/* Pie Chart Component */}
        <div
          className="chart-container"
          style={{ width: "300px", height: "300px", margin: "0 auto" }}
        >
          <h2>Product Count by Category</h2>
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </Layout>
  );
};

export default Admininventory;
