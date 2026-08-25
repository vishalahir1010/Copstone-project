import React, { useState } from "react";

function DynamicForm({ fields, title }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    alert("Sign Up Successful!");
  };

  return (
    <div className="form-container">
      <h2>{title}</h2>

      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div
            className="form-group"
            key={field.name}
          >
            <label>{field.label}</label>

            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
            />
          </div>
        ))}

        <button type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default DynamicForm;