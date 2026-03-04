import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5001/api/users";
const INITIAL_FORM = { firstName: "", lastName: "", dateOfBirth: "" };

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

    useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(API);
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    editingId 
      ? await axios.put(`${API}/${editingId}`, formData)
      : await axios.post(API, formData);
    fetchUsers();
    resetForm();
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth.split('T')[0]
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchUsers();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>User CRUD</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">{editingId ? "Update User" : "Add User"}</button>
        {editingId && (
          <button type="button" onClick={resetForm} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h3>User List</h3>

      {users.map(user => (
        <div key={user._id}>
          <p>
            {user.firstName} {user.lastName} -{" "}
            {new Date(user.dateOfBirth).toLocaleDateString()}
          </p>
          <button onClick={() => handleEdit(user)}>Edit</button>
          <button onClick={() => handleDelete(user._id)} style={{ marginLeft: "10px" }}>
            Delete
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;