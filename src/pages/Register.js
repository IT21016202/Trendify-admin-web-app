import React, { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    Name: "",
    Email: "",
    PhoneNumber: "",
    Description: "",
    Password: "",
    ConfirmPassword: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", formValues);

    try {
      const response = await axios.post(
        "https://localhost:7022/api/vendor",
        formValues
      );
      console.log("Response from API:", response.data);
      console.log("Response Status Code:", response.status);

      if (response.status === 201 && formValues.Name !== "admin") {
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

        setTimeout(() => {
          navigate("/vendor"); // Update this with your vendor page URL
        }, 5000);
      } else {
        toast("Registration Successfull");
        console.log(
          "Redirect not performed: either the user is admin or status is not 201.",
          response
        );
      }
    } catch (error) {
      if (error.response) {
        console.error("Error Response Status Code:", error.response.status);
        console.error("Error Response Data:", error.response.data);
      }
      let errorMessage = "An error occurred. Please try again.";

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message; // Extract the error message
      }

      toast.error(errorMessage, {
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
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <section
        className="h-100 gradient-form"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  {/* Right Side (Information) */}
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Why Join Us?</h4>
                      <p className="mb-0 me-2">
                        Become part of our growing vendor community and take
                        your business to the next level. Sign up today and start
                        enjoying exclusive benefits and support!
                      </p>

                      <ul className="mt-3">
                        <li>Expand your reach with our large customer base.</li>
                        <li>
                          Access to powerful tools to manage your products and
                          sales.
                        </li>
                        <li>Get 24/7 support from our dedicated team.</li>
                        <li>Join a growing community of successful vendors.</li>
                      </ul>

                      <div className="d-flex align-items-center">
                        <p className="mb-0 me-2">Already Registered?</p>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          style={{ borderColor: "white", color: "white" }}
                          onClick={() => navigateToLogin()}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Left Side (Form) */}
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          style={{ width: "185px" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1">
                          Join With The Trendify Team
                        </h4>
                      </div>

                      <form onSubmit={handleSubmit}>
                        {/* Name Input */}
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            name="Name"
                            className="form-control"
                            placeholder="Enter your name"
                            value={formValues.Name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        {/* Email Input */}
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            name="Email"
                            className="form-control"
                            placeholder="Enter your email address"
                            value={formValues.Email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        {/* Phone Number Input */}
                        <div className="form-outline mb-4">
                          <input
                            type="tel"
                            name="PhoneNumber"
                            className="form-control"
                            placeholder="Enter your phone number"
                            value={formValues.PhoneNumber}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        {/* Description Input */}
                        <div className="form-outline mb-4">
                          <textarea
                            name="Description"
                            className="form-control"
                            placeholder="Enter a description (optional)"
                            value={formValues.Description}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Password Input */}
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            name="Password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={formValues.Password}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            name="ConfirmPassword"
                            className="form-control"
                            placeholder="Confirm your password"
                            value={formValues.ConfirmPassword}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Register;
