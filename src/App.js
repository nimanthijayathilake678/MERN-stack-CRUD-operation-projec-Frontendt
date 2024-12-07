import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import "./App.css";
import axios from "axios";
import Form from "./components/Form";

axios.defaults.baseURL = "http://localhost:8080/";

function App() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    age: "",
    id: "",
  });
  const [dataList, setDataList] = useState([]);
  const [editDataSection, setEditDataSection] = useState(false);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
    setEditDataSection(false); // Close the edit form if open
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const AddData = await axios.post("/create", formData);
      if (AddData.data.success) {
        alert(AddData.data.message);
        getFormData(); // Refresh the table after adding data
        setFormVisible(false);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateData = await axios.put(`/update/${formDataEdit.id}`, {
        name: formDataEdit.name,
        email: formDataEdit.email,
        age: formDataEdit.age,
      });
      if (updateData.data.success) {
        alert(updateData.data.message);
        getFormData(); // Refresh the table after updating data
        setEditDataSection(false);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const getFormData = async () => {
    try {
      const data = await axios.get("/");
      if (data.data.success) {
        setDataList(data.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteData = await axios.delete(`/delete/${id}`);
      if (deleteData.data.success) {
        alert(deleteData.data.message);
        getFormData(); // Refresh the table after deletion
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (el) => {
    setFormDataEdit({
      name: el.name,
      email: el.email,
      age: el.age,
      id: el._id,
    });
    setEditDataSection(true);
    setFormVisible(false); // Close the add form if open
  };

  useEffect(() => {
    getFormData();
  }, []);

  return (
    <div className="container">
      <h2>Student List</h2>

      {/* Form for adding new or editing data */}
      {isFormVisible && (
        <Form
          handleSubmit={handleSubmit}
          toggleForm={toggleForm}
          handleOnChange={handleOnChange}
          formData={formData}
        />
      )}
      {editDataSection && (
        <Form
          handleSubmit={handleUpdate}
          toggleForm={() => setEditDataSection(false)}
          handleOnChange={handleEditOnChange}
          formData={formDataEdit}
        />
      )}

      <div
        className="tableContainer"
        style={{ display: isFormVisible ? "none" : "block" }} // Hide table when form is visible
      >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((el) => (
                <tr key={el._id}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.age}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEdit(el)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(el._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Button to toggle form visibility */}
      <div className="button-container">
        {!isFormVisible && (
          <button className="btn btn-add" onClick={toggleForm}>
            Add New Student
          </button>
        )}
        {isFormVisible && (
          <button className="btn btn-close" onClick={toggleForm}>
            Return
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
