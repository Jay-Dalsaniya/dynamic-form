// src/ViewData.js

import React from "react";

const ViewData = ({ submittedData, setSubmittedData }) => {
  const handleDelete = (index) => {
    const newData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(newData);
  };

  return (
    <div>
      <h2>Submitted Data</h2>
      {submittedData.length > 0 ? (
        submittedData.map((data, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {Object.entries(data).map(([key, value]) => (
              <div key={key}>
                <strong>{key}: </strong>
                {Array.isArray(value) ? value.join(", ") : value.toString()}
              </div>
            ))}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No data submitted yet.</p>
      )}
    </div>
  );
};

export default ViewData;
