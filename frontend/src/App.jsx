import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: ""
  });

  const API = "http://localhost:5001/api/users";

  // Fetch users
  const fetchUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API, formData);
    fetchUsers();
    setFormData({ firstName: "", lastName: "", dateOfBirth: "" });
  };

  // Delete
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

        <button type="submit">Add User</button>
      </form>

      <hr />

      <h3>User List</h3>

      {users.map(user => (
        <div key={user._id}>
          <p>
            {user.firstName} {user.lastName} -{" "}
            {new Date(user.dateOfBirth).toLocaleDateString()}
          </p>
          <button onClick={() => handleDelete(user._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;