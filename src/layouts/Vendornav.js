import React, { useEffect, useState } from "react";

const Vendornav = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      console.log(user); // Access user properties like user.name, user.email, etc.

      setUserName(user.name);
    } else {
      console.error("No user data found in localStorage.");
    }
  }, []);

  return (
    <div>
      {" "}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a
          className="navbar-brand"
          href="#"
          style={{ color: "white", margin: "10px" }}
        >
          Vendor Portal /
        </a>

        <span className="navbar-text"> Welcome, {userName}</span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarText"
        ></div>
      </nav>
    </div>
  );
};

export default Vendornav;
