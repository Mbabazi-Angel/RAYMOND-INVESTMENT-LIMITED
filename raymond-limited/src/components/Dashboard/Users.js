import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyMjQzNDc3MSwianRpIjoiNDE5MmI3MTItM2QxMi00OWU4LWJmNDctMDZjYThmMzZjMTI2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzIyNDM0NzcxLCJjc3JmIjoiZjNkYTJlNmUtYWY0Ny00NTNmLWI1MmYtOGZmYWNmYWIxYjc2IiwiZXhwIjoxNzIyNDM1NjcxfQ.-7KCeo5ZM-44EmRQHOc-TfDx2mtgtk79agqHtAFlEOU'; // Replace this with your method of getting the token
        const response = await axios.get('http://127.0.0.1:5000/api/v1/auth/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('API Response:', response.data); // Log the response data

        // Handle different response structures
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else if (response.data.users && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else if (response.data.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          throw new Error('API response is not an array');
        }
      } catch (error) {
        console.error('Error fetching users:', error); // Log the error
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users: {error.message}</p>;

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>first_name</th>
            <th>last_name</th>
            <th>email</th>
            <th>contact</th>
            <th>address</th>
            <th>created_at</th>
            <th>updated_at</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.contact}</td>
              <td>{user.address}</td>
              <td>{user.created_at}</td>
              <td>{user.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

