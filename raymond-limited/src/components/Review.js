import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Review.css'; // Ensure you have your CSS file imported

const Review = ({ productId }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    rating: '',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Get JWT token from localStorage or wherever you store it after login
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyMTkxMTEwOSwianRpIjoiYWIzOGMyZDktM2Y0MS00OGZjLTg4MTAtNWI5N2FiMGZmMjNkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzIxOTExMTA5LCJjc3JmIjoiY2VlZDhlNDEtNDQ1Yi00MGQ4LWI1ZjYtMDk5M2UxODUyNWU2IiwiZXhwIjoxNzIxOTEyMDA5fQ.yyEH_s69Iu5bHX88Fdf3gs-QYT6voisf3EA8BvM2X_o"

      const response = await axios.post(
        'http://localhost:5000/api/v1/reviews/create',
        {
          rating: parseInt(formData.rating), // Convert rating to integer
          comment: formData.comment,
          productId: parseInt(productId) // Assuming productId is passed from parent component
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Include the JWT token in the Authorization header
          }
        }
      );

      console.log(response.data); // Log the response from the server

      // Handle success, e.g., show a success message or redirect
      alert('Review submitted successfully!');
      setFormData({
        rating: '',
        comment: ''
      });

      // Redirect to home page after successful review submission
      navigate('/');

    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle error states, e.g., show error message to the user
      alert('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="review-background">
    <div className="review-container">
      <h2 style={{ color: 'teal' }}> Write a Review</h2>
      <form className="review-form" onSubmit={handleSubmit}>
        <label htmlFor="rating">Rating (1-5):</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="1"
          max="5"
          required
        />

        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows="4"
          required
        />

        <button type="submit">Submit Review</button>
      </form>
    </div>
    </div>
  );
};

export default Review;
