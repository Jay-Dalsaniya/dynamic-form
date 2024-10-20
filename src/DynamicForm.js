// src/DynamicForm.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Input type options
const inputTypes = [
  { label: "Text", value: "text" },
  { label: "Email", value: "email" },
  { label: "Number", value: "number" },
  { label: "Select", value: "select" },
  { label: "Checkbox", value: "checkbox" },
];

const DynamicForm = ({ onSubmit }) => {
  const [inputFields, setInputFields] = useState([
    { type: "text", value: "", options: [] },
  ]);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleAddField = () => {
    setInputFields([...inputFields, { type: "text", value: "", options: [] }]);
  };

  const handleRemoveField = (index) => {
    const newInputFields = inputFields.filter((_, i) => i !== index);
    setInputFields(newInputFields);
    const newFormErrors = { ...formErrors };
    delete newFormErrors[index];
    setFormErrors(newFormErrors);
  };

  const handleChange = (index, event) => {
    const newInputFields = inputFields.map((inputField, i) => {
      if (i === index) {
        return { ...inputField, value: event.target.value };
      }
      return inputField;
    });
    setInputFields(newInputFields);
  };

  const handleTypeChange = (index, event) => {
    const newInputFields = inputFields.map((inputField, i) => {
      if (i === index) {
        return {
          ...inputField,
          type: event.target.value,
          value: "",
          options: [],
        };
      }
      return inputField;
    });
    setInputFields(newInputFields);
  };

  const handleOptionsChange = (index, event) => {
    const newInputFields = [...inputFields];
    newInputFields[index].options = event.target.value
      .split(",")
      .map((option) => option.trim());
    setInputFields(newInputFields);
  };

  const validateFields = () => {
    let errors = {};
    inputFields.forEach((field, index) => {
      if (field.type !== "checkbox" && !field.value) {
        errors[index] = "This field is required.";
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateFields()) {
      onSubmit(inputFields);
      navigate("/view");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      {inputFields.map((inputField, index) => (
        <div
          key={index}
          style={{
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <select
            value={inputField.type}
            onChange={(event) => handleTypeChange(index, event)}
            style={{ marginRight: "10px" }}
          >
            {inputTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {inputField.type !== "select" && inputField.type !== "checkbox" && (
            <input
              type={inputField.type}
              value={inputField.value}
              onChange={(event) => handleChange(index, event)}
              placeholder={`Field ${index + 1}`}
              style={{ marginRight: "10px" }}
            />
          )}
          {inputField.type === "select" && (
            <input
              type="text"
              onChange={(event) => handleOptionsChange(index, event)}
              placeholder="Comma-separated options (e.g., option1, option2)"
              style={{ marginRight: "10px" }}
            />
          )}
          {inputField.type === "checkbox" && (
            <input
              type="checkbox"
              checked={inputField.value === "true"}
              onChange={() =>
                handleChange(index, {
                  target: {
                    value: inputField.value === "true" ? "false" : "true",
                  },
                })
              }
            />
          )}
          <button
            type="button"
            onClick={() => handleRemoveField(index)}
            style={{ marginLeft: "10px" }}
          >
            Remove
          </button>
          {formErrors[index] && (
            <span style={{ color: "red", marginLeft: "10px" }}>
              {formErrors[index]}
            </span>
          )}
        </div>
      ))}
      <button type="button" onClick={handleAddField}>
        Add Field
      </button>
      <button type="submit" style={{ marginLeft: "10px" }}>
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
