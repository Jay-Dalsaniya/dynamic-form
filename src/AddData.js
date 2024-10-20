// src/AddData.js

import React, { useState } from "react";

const AddData = ({ handleSubmitData }) => {
  const [formFields, setFormFields] = useState([
    { id: Date.now(), type: "text", value: "" },
  ]);

  const addField = () => {
    setFormFields([...formFields, { id: Date.now(), type: "text", value: "" }]);
  };

  const handleFieldChange = (id, e) => {
    const { value } = e.target;
    setFormFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  const handleFieldTypeChange = (id, e) => {
    const { value } = e.target;
    setFormFields((prevFields) =>
      prevFields.map(
        (field) =>
          field.id === id ? { ...field, type: value, value: "" } : field // Reset value when changing type
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields
    const isValid = formFields.every((field) => {
      if (field.type === "email" && !/\S+@\S+\.\S+/.test(field.value)) {
        alert(`Invalid email value.`);
        return false;
      }
      return true;
    });

    if (isValid) {
      handleSubmitData(formFields);
      setFormFields([{ id: Date.now(), type: "text", value: "" }]); // Reset form fields
    }
  };

  return (
    <div>
      <h2>Add Data</h2>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.id} style={{ marginBottom: "10px" }}>
            <select
              value={field.type}
              onChange={(e) => handleFieldTypeChange(field.id, e)}
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
              <option value="select">Select</option>
              <option value="checkbox">Checkbox</option>
            </select>
            {field.type === "select" && (
              <input
                type="text"
                placeholder="Options (comma separated)"
                onChange={(e) =>
                  handleFieldChange(field.id, {
                    target: { value: e.target.value },
                  })
                }
              />
            )}
            {field.type === "checkbox" && (
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) =>
                  handleFieldChange(field.id, {
                    target: { value: e.target.checked },
                  })
                }
              />
            )}
            <input
              type={field.type}
              placeholder="Value"
              value={field.value}
              onChange={(e) => handleFieldChange(field.id, e)}
            />
          </div>
        ))}
        <button type="button" onClick={addField}>
          Add Field
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddData;
