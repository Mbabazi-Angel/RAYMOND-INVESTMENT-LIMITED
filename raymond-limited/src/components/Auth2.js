import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './Auth.css';


const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate if all required fields are filled
        if (!formData.email || !formData.password) {
            alert('Email and password are required');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/v1/auth/login', formData);
            console.log(response.data); // Handle success response
            alert('Login successful!');
            navigate('/product'); // Redirect to the product page after successful login
        } catch (error) {
            console.error('Error:', error); // Log the complete error response for debugging
            if (error.response) {
                console.error('Error response:', error.response);
                alert('Login failed: ' + (error.response.data.message || error.response.data.error || 'Unknown error'));
            } else {
                alert('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="auth2-background">
        <div className="login-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
        </div>
    );
};

export default LoginForm;






