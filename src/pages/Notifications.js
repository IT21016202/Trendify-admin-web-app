import React, { useEffect, useState } from "react";
import axios from "axios";
import Vendorlayout from "../layouts/Vendorlayout";
import Vendornav from "../layouts/Vendornav";


const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const vendorId = "67024168be53270045c37650"; // Example vendor ID
  const API_URL = `https://localhost:7022/api/Notification/getbyvendor/${vendorId}`;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setNotifications(response.data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [API_URL]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <Vendorlayout>
      <Vendornav />
      <div className="notifications-container">
        <h2 className="notifications-title">Notifications</h2>
        {notifications.length > 0 ? (
          <ul className="notifications-list">
            {notifications.map((notification) => (
              <li key={notification.id} className="notification-card">
                <strong>{notification.message}</strong>
                <p>Product ID: {notification.productId}</p>
                <p>Vendor ID: {notification.vendorId}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
      <style>
        {`.notifications-container {
  padding: 20px;
  background-color: #f8f9fa; /* Light background */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.notifications-title {
  font-size: 24px;
  margin-bottom: 15px;
  color: #333; /* Dark text */
}

.notifications-list {
  list-style-type: none;
  padding: 0;
}

.notification-card {
  background-color: #fff; /* White card background */
  border: 1px solid #dee2e6; /* Light border */
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 10px;
  transition: box-shadow 0.3s; /* Smooth shadow transition */
}

.notification-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Shadow effect on hover */
}

.loading-spinner {
  text-align: center;
  font-size: 20px;
  color: #007bff; /* Blue color for loading */
}

.error-message {
  color: red;
  text-align: center;
  font-size: 18px;
}
`}
      </style>
    </Vendorlayout>
  );
};

export default Notifications;
