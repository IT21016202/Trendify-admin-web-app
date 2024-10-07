import React, { useEffect, useState } from "react";
import Vendornav from "../layouts/Vendornav";
import Layout from "../layouts/Layout";
import { Modal } from "react-bootstrap";
import axios from "axios";
import editImg from "../images/edit.png";
import deleteImg from "../images/delete.png";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Vendorlayout from "../layouts/Vendorlayout";

const Vendor = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    setShowModal(false);
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const handleShow = () => {
    setError("");
    setShowModal(true);
  };

  const createProduct = async (e) => {
    e.preventDefault();

    const productData = {
      productName,
      productDescription,
      productQuantity,
      productCategory,
      unitPrice,
      vendorId: userId,
      vendorName: userName,
      image,
    };

    console.log(productData);

    try {
      const response = await axios.post(
        "https://localhost:7022/api/Product/addProduct",
        productData
      );
      console.log("Product added successfully:", response.data);

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
      }

      getProducts(userId);

      setShowModal(false);
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const fetchProductData = async (id) => {
    try {
      const response = await axios.get(
        `https://localhost:7022/api/Product/productsByVendor/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product data:", error);
      throw error;
    }
  };

  const getProducts = async (id) => {
    try {
      const data = await fetchProductData(id);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch customers on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    var user = "";
    if (storedUserData) {
      user = JSON.parse(storedUserData);
      console.log(user); // Access user properties like user.name, user.email, etc.
      setUserId(user.id);
      setUserName(user.name);
    } else {
      console.error("No user data found in localStorage.");
    }

    getProducts(user.id); // Update this with your vendor page URL
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete the product from the database
        axios
          .delete(`https://localhost:7022/api/Product/deleteProduct/${id}`)
          .then((response) => {
            console.log(response);
            getProducts(userId);

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete product.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleEdit = (id) => {
    navigate(`/vendor/product/edit/${id}`);
  };

  return (
    <Vendorlayout>
      <div>
        <Vendornav />

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
            Products
          </h1>
          <button
            onClick={handleShow}
            className="btn btn-primary"
            style={{ marginRight: "20px" }} // Adjust margin as needed
          >
            Add Product
          </button>
        </div>

        {/* Modal */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <div className="alert alert-danger">{error}</div>}{" "}
            {/* Show error message if any */}
            <form>
              <div className="mb-3">
                <label htmlFor="vendorName" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="vendorName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)} // Update state on input change
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Product Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="productDes"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)} // Update state on input change
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productCategory" className="form-label">
                  Product Category
                </label>
                <select
                  className="form-control"
                  id="productCategory"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)} // Update state on selection change
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>{" "}
                  {/* Placeholder option */}
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Sports & Outdoors">Sports & Outdoors</option>
                  <option value="Toys & Games">Toys & Games</option>
                  {/* Add more options as necessary */}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="vendorPassword" className="form-label">
                  Product Quantity
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productQty"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)} // Update state on input change
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="vendorPassword" className="form-label">
                  Unit Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="unitPrice"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)} // Update state on input change
                  required
                />
              </div>

              {/* Image Upload Field */}
              <div className="mb-3">
                <label htmlFor="imageUpload" className="form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="imageUpload"
                  accept="image/*" // Accept only image files
                  onChange={handleImageChange} // Call the function on file selection
                  required
                />
              </div>

              {image && (
                <div className="mb-3">
                  <img
                    src={image}
                    alt="Preview"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              )}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                createProduct(e);
              }}
            >
              Save Product
            </button>
          </Modal.Footer>
        </Modal>
        <center>
          <div style={{ overflowX: "auto" }}>
            <table
              className="table table-bordered mx-4"
              style={{ width: "80%", margin: "0 auto" }}
            >
              <thead>
                <tr>
                  <th scope="col" style={{ width: "20%" }}>
                    Name
                  </th>
                  <th scope="col" style={{ width: "40%" }}>
                    Description
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Category
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Quantity
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    Unit Price
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Status
                  </th>

                  <th scope="col" style={{ width: "30%" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map(
                  (
                    product,
                    index // Map through filtered customer data
                  ) => (
                    <tr key={product.id}>
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
                        {product.productQuantity}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {product.unitPrice}
                      </td>
                      <td style={{ textAlign: "center" }}>{product.status}</td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          width="30"
                          height="30"
                          src={editImg}
                          alt="filled-trash"
                          style={{ marginRight: "10px" }}
                          onClick={() => handleEdit(product.id)}
                        />
                        <img
                          width="30"
                          height="30"
                          src={deleteImg}
                          alt="edit--v1"
                          onClick={() => handleDelete(product.id)} // Call the delete function on click
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </center>

        <ToastContainer />
      </div>
    </Vendorlayout>
  );
};

export default Vendor;
