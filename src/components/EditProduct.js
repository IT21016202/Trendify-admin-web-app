import React, { useEffect, useState } from "react";
import Vendornav from "../layouts/Vendornav";
import Layout from "../layouts/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import Swal from "sweetalert2";

const EditProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7022/api/product/${id}`
      );
      const data = response.data;
      setProductName(data.productName);
      setProductDescription(data.productDescription);
      setProductQuantity(data.productQuantity);
      setProductCategory(data.productCategory);
      setUnitPrice(data.unitPrice);
      setVendorId(data.vendorId);
      setImage(data.image);
      setStatus(data.status);
    } catch (err) {
      console.error("Error fetching product data:", err);
    }
  };

  useEffect(() => {
    fetchProductData(); // Call the fetch function
  }, []);

  const updateProduct = async (e) => {
    e.preventDefault();

    const productData = {
      productName,
      productDescription,
      productQuantity,
      productCategory,
      unitPrice,
      vendorId,
      status,
      image,
    };

    try {
      const response = await axios.put(
        `https://localhost:7022/api/Product/updateProduct/${id}`,
        productData
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }

      console.log(response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product update successfull",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/vendor");
    } catch (err) {
      console.error("Error updating product:", err);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product update successfull",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/vendor");
    }
  };

  return (
    <Layout>
      <Vendornav />
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <h2 style={{ fontSize: "1.2rem", margin: "15px 0" }}>Edit Product</h2>

          <form>
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="productName" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="productDescription" className="form-label">
                  Product Description
                </label>
                <textarea
                  className="form-control"
                  id="productDescription"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  required
                  rows="3"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="productCategory" className="form-label">
                  Product Category
                </label>
                <select
                  className="form-select"
                  id="productCategory"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Sports & Outdoors">Sports & Outdoors</option>
                  <option value="Toys & Games">Toys & Games</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="productQty" className="form-label">
                  Product Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="productQty"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="unitPrice" className="form-label">
                  Unit Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="unitPrice"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  required
                  step="0.01"
                />
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={(e) => updateProduct(e)}
            >
              Update Product
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default EditProduct;
