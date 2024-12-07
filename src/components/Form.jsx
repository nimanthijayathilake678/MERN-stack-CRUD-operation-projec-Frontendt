import React from "react";
import { MdClose } from "react-icons/md";
import "../App.css";

const Form = ({ handleSubmit, toggleForm, handleOnChange, formData }) => {
  return (
    <div className="addContainer">
      <form className="form" onSubmit={handleSubmit}>
        <div className="close-btn" onClick={toggleForm}>
          <MdClose />
        </div>
        <h2>{formData.id ? "Edit User" : "Add Student"}</h2>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleOnChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleOnChange}
          required
        />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          placeholder="Enter your age"
          value={formData.age}
          onChange={handleOnChange}
          required
        />
        <button className="btn btn-submit" type="submit">
          {formData.id ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
