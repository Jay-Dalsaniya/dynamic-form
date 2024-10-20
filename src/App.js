// src/App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewData from "./ViewData";
import AddData from "./AddData"; // Import the AddData component
import Navbar from "./Navbar"; // Import the Navbar component
import "./styles.css";

const App = () => {
  const [submittedData, setSubmittedData] = useState([]);

  // Define the handleSubmitData function
  const handleSubmitData = (data) => {
    setSubmittedData((prev) => [...prev, ...data]);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/add-data"
            element={<AddData handleSubmitData={handleSubmitData} />}
          />
          <Route
            path="/view-data"
            element={
              <ViewData
                submittedData={submittedData}
                setSubmittedData={setSubmittedData}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => (
  <div style={styles.container}>
    <h2>Welcome to the App</h2>
    <p style={styles.description}>
      This application allows you to dynamically add, view, update, and delete
      data entries with various input types.
    </p>
    <p style={styles.featuresTitle}>Features:</p>
    <ul style={styles.featuresList}>
      <li>
        Add multiple input fields with different types (text, email, number,
        select, checkbox).
      </li>
      <li>View submitted data in a structured format.</li>
      <li>Update existing entries to keep your data up to date.</li>
      <li>Delete entries that you no longer need.</li>
    </ul>
    <p style={styles.callToAction}>
      Start by adding your data through the form in the navigation bar above!
    </p>
  </div>
);

// Styles for the Home component
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    margin: "20px auto",
    maxWidth: "600px",
  },
  description: {
    fontSize: "18px",
    marginBottom: "15px",
  },
  featuresTitle: {
    fontSize: "20px",
    margin: "15px 0",
  },
  featuresList: {
    listStyleType: "none",
    padding: 0,
    textAlign: "left",
  },
  callToAction: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "20px",
  },
};

export default App;
