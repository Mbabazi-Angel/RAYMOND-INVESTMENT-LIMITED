import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyMjQzNDcwMSwianRpIjoiNDAxNDFkZTYtMTI3OC00MzJlLTgzMGYtMDgyOGVlMGExNjZkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzIyNDM0NzAxLCJjc3JmIjoiYTg4YzljODAtMTNlMS00NWFjLTk2YTgtNzQzZWNmOGEyYjE5IiwiZXhwIjoxNzIyNDM1NjAxfQ.WXdSU7nfkgfxrhwbWWIVwaS9wt6K_Dl70omdvuavC0I';
        const response = await axios.get('http://127.0.0.1:5000/api/v1/reviews/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Check if the response data is an array
        if (Array.isArray(response.data)) {
          setReviews(response.data);
        } else if (response.data.reviews && Array.isArray(response.data.reviews)) {
          setReviews(response.data.reviews);
        } else if (response.data.data && Array.isArray(response.data.data)) {
          setReviews(response.data.data);
        } else {
          // If the response data is not an array, log the response for debugging
          console.error('Unexpected response format:', response.data);
          setError(new Error('Unexpected response format'));
        }
      } catch (error) {
        console.error('Error fetching reviews:', error); // Log the error
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error fetching reviews: {error.message}</p>;

  return (
    <div>
      <h2>Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>User ID</th>
            <th>Product ID</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.rating}</td>
              <td>{review.comment}</td>
              <td>{review.user_id}</td>
              <td>{review.product_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reviews;



