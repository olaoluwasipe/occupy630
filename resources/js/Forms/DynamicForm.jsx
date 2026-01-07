import React, { useState } from "react";
import useCustomFields from "./hooks/useCustomFields";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import Checkbox from "@/Components/Checkbox";

const DynamicForm = ({ location, onSubmit }) => {
  const { fields, loading } = useCustomFields(location);
  const [formData, setFormData] = useState({});

  if (loading) return <p>Loading...</p>;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    // <form onSubmit={handleSubmit}>
    <>
      {fields.map((field) => (
        <div key={field.id} className="form-group">
        <InputLabel htmlFor={field.name} value={field.name.toUpperCase()} />
          <label htmlFor={field.name}>{field.name.toUpperCase()}</label>
          {field.type === "text" && (
            <TextInput
              type="text"
              name={field.name}
              id={field.name}
              onChange={handleChange}
              required={field.is_required}
            />
          )}
          {field.type === "dropdown" && (
            <SelectInput
              name={field.name}
              id={field.name}
              onChange={handleChange}
              required={field.is_required}
            >
              <option value="">Select {field.name}</option>
              {field.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </SelectInput>
          )}
          {field.type === "checkbox" && (
            <Checkbox
              type="checkbox"
              name={field.name}
              id={field.name}
              onChange={handleChange}
              required={field.is_required}
            />
          )}
        </div>
      ))}
    </>

  );
};

export default DynamicForm;
