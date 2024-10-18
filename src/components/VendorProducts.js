import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import VendorLayout from "../layouts/Vendorlayout";
import axios from "axios";
import tick from "../images/tick.png";
import cross from "../images/cross.png";
import Swal from "sweetalert2";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const vendorId = "67024168be53270045c37650";

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productType = queryParams.get("type");

  useEffect(() => {
    fetchProducts();
  }, [productType, vendorId]);

  const fetchProducts = () => {
    axios
      .get(`https://localhost:7022/api/Product/productsByVendor/${vendorId}`)
      .then((response) => {
        let filteredProducts = response.data;
        if (productType === "pending") {
          filteredProducts = filteredProducts.filter(product => product.status === "Pending");
        } else if (productType === "reject") {
          filteredProducts = filteredProducts.filter(product => product.status === "Reject");
        } else if (productType === "approved") {
          filteredProducts = filteredProducts.filter(product => product.status === "Approve");
        }
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const approveProduct = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to Approve this Product!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`https://localhost:7022/api/Product/approveProduct/${id}`);
        Swal.fire({
          title: "Approved!",
          text: "The product has been approved.",
          icon: "success",
        });
        fetchProducts();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There was an error approving the product.",
          icon: "error",
        });
        console.error("Error approving product:", error);
      }
    }
  };

  const rejectProduct = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to Reject this Product!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`https://localhost:7022/api/Product/rejectProduct/${id}`);
        Swal.fire({
          title: "Rejected!",
          text: "The product has been Rejected.",
          icon: "success",
        });
        fetchProducts();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There was an error rejecting the product.",
          icon: "error",
        });
        console.error("Error rejecting product:", error);
      }
    }
  };

  return (
      <VendorLayout>
      <div>
        <h4 className="pb-3 pt-2" style={{ textAlign: "left" }}>
          {productType === "all"
            ? "ALL PRODUCTS"
            : productType === "pending"
            ? "PENDING PRODUCTS"
            : productType === "approved"
            ? "APPROVED PRODUCTS"
            : productType === "reject"
            ? "REJECTED PRODUCTS"
            : "ALL PRODUCTS"}
        </h4>
        <input
          type="text"
          placeholder="Search Products"
          className="form-control mb-3"
          style={{ width: "350px", float: "right" }}
        />
        <table
          className="table table-hover table-striped"
          style={{
            width: "100%",
            margin: "0 auto",
            borderCollapse: "separate",
            borderSpacing: "0 15px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <thead style={{ backgroundColor: "#f8f9fa", textAlign: "center" }}>
            <tr>
              <th style={{ padding: "15px", fontWeight: "600", color: "#4d4d4d" }}>Product Name</th>
              <th style={{ padding: "15px", fontWeight: "600", color: "#4d4d4d" }}>Product Description</th>
              <th style={{ padding: "15px", fontWeight: "600", color: "#4d4d4d" }}>Product Category</th>
              <th style={{ padding: "15px", fontWeight: "600", color: "#4d4d4d" }}>Unit Price ($)</th>
              <th style={{ padding: "15px", fontWeight: "600", color: "#4d4d4d" }}>Status</th>
              <th style={{ padding: "15px", fontWeight: "600", color: "#4d4d4d" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#fdfdfd" : "#ffffff",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                }}
              >
                <td style={{ padding: "12px", textAlign: "center" }}>{product.productName}</td>
                <td style={{ padding: "12px", textAlign: "center", fontSize: "15px" }}>{product.productDescription}</td>
                <td style={{ padding: "12px", textAlign: "center" }}>{product.productCategory}</td>
                <td style={{ padding: "12px", textAlign: "center" }}>${product.unitPrice}</td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: product.status === "Approve" ? "green" : "red",
                  }}
                >
                  {product.status}
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  {product.status === "Pending" && (
                    <>
                      <img
                        src={tick}
                        alt="Approve"
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                          marginRight: "10px",
                        }}
                        onClick={() => approveProduct(product.id)}
                      />
                      <img
                        src={cross}
                        alt="Reject"
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => rejectProduct(product.id)}
                      />
                    </>
                  )}
                  {product.status === "Approve" && (
                    <img
                      src={cross}
                      alt="Reject"
                      style={{
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                      onClick={() => rejectProduct(product.id)}
                    />
                  )}
                  {product.status === "Reject" && (
                    <img
                      src={tick}
                      alt="Approve"
                      style={{
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                      onClick={() => approveProduct(product.id)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </VendorLayout>
  );
};

export default VendorProducts;