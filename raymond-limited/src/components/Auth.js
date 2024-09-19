import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Auth.css';
import axios from 'axios';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        contact: '',
        email: '',
        password: '',
        confirmPassword: '', // Note: confirmPassword is camelCase here
        address: ''
    });

    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        // Validate if all required fields are filled
        for (const field in formData) {
            if (!formData[field]) {
                alert(`${field.replace('_', ' ')} is required`);
                return;
            }
        }

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/v1/auth/register', {
                first_name: formData.first_name,
                last_name: formData.last_name,
                contact: formData.contact,
                email: formData.email,
                password: formData.password,
                confirm_password: formData.confirmPassword, // change to match the backend's expected field name
                address: formData.address
            });
            console.log(response.data); // Handle success response
            alert('Sign up successful!');
            setFormData({
                first_name: '',
                last_name: '',
                contact: '',
                email: '',
                password: '',
                confirmPassword: '',
                address: ''
            });
            navigate('/login'); // Redirect to login page after successful sign-up
        } catch (error) {
            console.error('Error:', error); // Handle error response
            if (error.response && error.response.data) {
                alert('Sign up failed: ' + error.response.data.error);
            } else {
                alert('Sign up failed. Please try again.');
            }
        }
    };

    return (
        <div className="auth-background">
        <div className="sign-up-form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="first_name">First Name:</label>
                    <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Contact:</label>
                    <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
        </div>
    );
};

export default SignUpForm;



