import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Adminlayout from "../layouts/Adminlayout";
import axios from "axios";
import tick from "../images/tick.png";
import cross from "../images/cross.png";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

const Adminproducts = () => {
  const [products, setProducts] = useState([]);

  const location = useLocation();
  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const productType = queryParams.get("type");

  useEffect(() => {
    console.log(productType);

    axios
      .get("https://localhost:7022/api/Product/getAllProducts")
      .then((response) => {
        if (productType === "all") {
          setProducts(response.data);
        } else if (productType === "pending") {
          setProducts(
            response.data.filter((order) => order.status === "Pending")
          );
        } else if (productType === "reject") {
          setProducts(
            response.data.filter((order) => order.status === "Reject")
          );
        } else if (productType === "approved") {
          setProducts(
            response.data.filter((order) => order.status === "Approve")
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productType]);

  //   const fetchProducts = async () => {
  //     const response = await axios("");

  //     // const products = response.data; // Assuming the product data is in response.data

  //     // // Filter products based on their status
  //     // const pending = products.filter((product) => product.status === "Pending");
  //     // const approved = products.filter((product) => product.status === "Approve");
  //     // const rejected = products.filter((product) => product.status === "Reject");

  //     // // Set the state for each category
  //     // setPendingProducts(pending);
  //     // setApproveProducts(approved);
  //     // setRejectProducts(rejected);
  //   };

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
        const response = await axios.put(
          `https://localhost:7022/api/Product/approveProduct/${id}`
        );

        console.log(response);

        Swal.fire({
          title: "Approved!",
          text: "The product has been approved.",
          icon: "success",
        });

        // fetchProducts();
      } catch (error) {
        // Handle error
        Swal.fire({
          title: "Error!",
          text: "There was an error approving the product.",
          icon: "error",
        });
        console.error("Error approving product:", error);
      }
    }

    console.log("Approve product", id);
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
        const response = await axios.put(
          `https://localhost:7022/api/Product/rejectProduct/${id}`
        );

        console.log(response);

        Swal.fire({
          title: "Reject!",
          text: "The product has been Rejected.",
          icon: "success",
        });

        // fetchProducts();
      } catch (error) {
        // Handle error
        Swal.fire({
          title: "Error!",
          text: "There was an error rejecting the product.",
          icon: "error",
        });
        console.error("Error approving product:", error);
      }
    }
  };

  return (
    <Layout>
      <Adminlayout />

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
            : productType === "cancelled"
            ? "CANCELLED ORDERS"
            : "ALL ORDERS"}
        </h4>
        <input
          type="text"
          placeholder="Search Products"
          //   value={filter}
          //   onChange={handleFilterChange}
          className="form-control mb-3"
          style={{ width: "350px", float: "right" }}
        />
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Product Category</th>
              <th>Unit Price ($)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => {
              return (
                <tr key={product.id}>
                  <td>{product.vendorName}</td>
                  <td>{product.productName}</td>
                  <td>{product.productDescription}</td>
                  <td>{product.productCategory}</td>
                  <td>{product.unitPrice}</td>
                  <td>{product.status}</td>

                  <td>
                    {productType === "pending" ? (
                      <>
                        <img
                          src={tick}
                          alt=""
                          srcset=""
                          style={{ width: "30px", height: "30px" }}
                          onClick={() => approveProduct(product.id)}
                        />

                        <img
                          src={cross}
                          alt=""
                          srcset=""
                          style={{ width: "30px", height: "30px" }}
                          onClick={() => rejectProduct(product.id)}
                        />
                      </>
                    ) : productType === "approved" ? (
                      <img
                        src={cross}
                        alt=""
                        srcset=""
                        style={{ width: "30px", height: "30px" }}
                        onClick={() => rejectProduct(product.id)}
                      />
                    ) : productType === "reject" ? (
                      <img
                        src={tick}
                        alt=""
                        srcset=""
                        style={{ width: "30px", height: "30px" }}
                        onClick={() => approveProduct(product.id)}
                      />
                    ) : productType === "all" ? (
                      product.status === "Approve" ? (
                        <img
                          src={cross}
                          alt=""
                          srcset=""
                          style={{ width: "30px", height: "30px" }}
                          onClick={() => rejectProduct(product.id)}
                        />
                      ) : product.status === "Reject" ? (
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
                      ) : (
                        <>
                          <img
                            src={tick}
                            alt=""
                            srcset=""
                            style={{ width: "30px", height: "30px" }}
                            onClick={() => approveProduct(product.id)}
                          />
                          <img
                            src={cross}
                            alt=""
                            srcset=""
                            style={{ width: "30px", height: "30px" }}
                            onClick={() => rejectProduct(product.id)}
                          />
                        </>
                      )
                    ) : (
                      <Button variant="secondary" disabled>
                        No Actions
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <h1 style={{ fontSize: "2rem", margin: "20px 0" }}>All Products</h1>

      <center>
        <div style={{ overflowX: "auto" }}>
          <h6
            style={{
              color: "Green",
              backgroundColor: "black",
              padding: "5px",
              fontWeight: "bold",
            }}
          >
            Pending Products
          </h6>
          <table
            className="table table-bordered mx-4"
            style={{
              width: "80%",
              margin: "20px auto",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#fff",
              border: "1px solid #e0e0e0",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f8f9fa",
                  borderBottom: "2px solid #dee2e6",
                  fontWeight: "bold",
                }}
              >
                <th
                  scope="col"
                  style={{ padding: "12px", textAlign: "center", width: "20%" }}
                >
                  Vendor Name
                </th>
                <th
                  scope="col"
                  style={{ padding: "12px", textAlign: "center", width: "20%" }}
                >
                  Product Name
                </th>
                <th
                  scope="col"
                  style={{ padding: "12px", textAlign: "center", width: "20%" }}
                >
                  Product Description
                </th>
                <th
                  scope="col"
                  style={{ padding: "12px", textAlign: "center", width: "20%" }}
                >
                  Product Category
                </th>{" "}
                <th
                  scope="col"
                  style={{ padding: "12px", textAlign: "center", width: "20%" }}
                >
                  Unit Price
                </th>
                <th
                  scope="col"
                  style={{ padding: "12px", textAlign: "center", width: "20%" }}
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  style={{ padding: "12px", textAlign: "center", width: "50%" }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingProducts && pendingProducts.length > 0 ? (
                pendingProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    style={{
                      borderBottom: "1px solid #e0e0e0",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f1f1f1")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <td style={{ textAlign: "center" }}>
                      {product.vendorName}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {product.productName}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {product.productDescription}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {product.productCategory}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      Rs {product.unitPrice}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span
                        style={{
                          color:
                            product.productQuantity <= 10
                              ? "red"
                              : product.productQuantity < 20
                              ? "yellow"
                              : "green",
                          fontWeight: "bold",
                        }}
                      >
                        {product.productQuantity}
                      </span>
                    </td>
                    <td style={{ textAlign: "center" }}>
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
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    style={{ textAlign: "center", padding: "10px" }}
                  >
                    No data for this table
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ overflowX: "auto", marginTop: "30px" }}>
          <h6
            style={{
              color: "Yellow",
              backgroundColor: "black",
              padding: "5px",
            }}
          >
            Approved Products
          </h6>
          <table
            className="table table-bordered mx-4"
            style={{
              width: "80%",
              margin: "20px auto",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#fff",
              border: "1px solid #e0e0e0",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f8f9fa",
                  borderBottom: "2px solid #dee2e6",
                  fontWeight: "bold",
                }}
              >
                <th
                  scope="col"
                  style={{ padding: "12px", textAlign: "center", width: "20%" }}
                >
                  Vendor Name
                </th>
                <th
                  scope="col"
                  style={{ padding: "12px", textAlign: "center", width: "20%" }}
                >
                  Product Name
                </th>
                <th
                  scope="col"
                  style={{ padding: "12px", textAlign: "center", width: "20%" }}
                >
                  Product Description
                </th>
                <th
                  scope="col"
                  style={{ padding: "12px", textAlign: "center", width: "20%" }}
                >
                  Product Category
                </th>{" "}
                <th
                  scope="col"
                  style={{ padding: "12px", textAlign: "center", width: "20%" }}
                >
                  Unit Price
                </th>
                <th
                  scope="col"
                  style={{ padding: "12px", textAlign: "center", width: "20%" }}
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  style={{ padding: "12px", textAlign: "center", width: "20%" }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {ApproveProducts.map(
                (
                  product,
                  index // Map through customer data
                ) => (
                  <tr
                    key={product.id}
                    style={{
                      borderBottom: "1px solid #e0e0e0",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f1f1f1")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <td style={{ textAlign: "center" }}>
                      {product.vendorName}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {product.productName}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {product.productDescription}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {product.productCategory}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      Rs {product.unitPrice}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span
                        style={{
                          color:
                            product.productQuantity <= 10
                              ? "red"
                              : product.productQuantity < 20
                              ? "yellow"
                              : "green",

                          fontWeight: "bold",
                        }}
                      >
                        {product.productQuantity}
                      </span>
                    </td>
                    <td style={{ textAlign: "center" }}>
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
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div> */}
      {/* </center> */}
    </Layout>
  );
};

export default Adminproducts;
