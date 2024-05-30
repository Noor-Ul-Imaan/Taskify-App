import React, { useState } from "react";
import axios from "axios";

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    role: "",
    level: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/create/create-user",
        formData
      );
      console.log(response);
      alert("User created successfully");
    } catch (error) {
      console.log(error);
      alert("Error creating user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastname"
        placeholder="Lastname"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="level"
        placeholder="Level"
        onChange={handleChange}
        required
      />
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;
