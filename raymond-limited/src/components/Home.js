import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';

import heroImage from '../assets/textiles images.jpg';
import product1 from '../assets/cotton towels.webp';
import product2 from '../assets/satin3.jpg';
import product3 from '../assets/denim.webp';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-content">
          <h1 style={{ color: 'orange' }}> Welcome to Our Textile Store</h1>
          <p style={{ color: 'orange' }}> Discover the finest fabrics and accessories</p>
          <div className="auth-buttons">
            <Link to="/signup" className="cta-button">Sign Up</Link>
            <Link to="/login" className="cta-button">Login</Link>
          </div>
        </div>
      </section>

      {/* Product Highlights */}
      <section className="products-section">
        <h2 style={{ color: 'orange' }}> Featured Products</h2>
        <div className="product-cards">
          <div className="product-card">
            <img src={product1} alt="Product 1" />
            <Link to="./Product">
              <h3>Cotton</h3>
            </Link>
            <p style={{ color: 'black' }}>High-quality fabric</p>
          </div>
          <div className="product-card">
            <img src={product2} alt="Product 2" />
            <Link to="./Product">
              <h3>Satin</h3>
            </Link>
            <p style={{ color: 'black' }}>Elegant apparel</p>
          </div>
          <div className="product-card">
            <img src={product3} alt="Product 3" />
            <Link to="./Product">
              <h3>Chiffon</h3>
            </Link>
            <p style={{ color: 'black' }}>Stylish accessories</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2 style={{ color: 'orange' }}> About Us</h2>
        <p>We are dedicated to providing the highest quality textiles</p>
        <p>and apparel. Our mission is to bring elegance and style to your</p>
        <p>wardrobe.</p>
        <Link to="/about" className="about-link">Learn More About Us</Link>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 style={{ color: 'orange' }}> Customer Reviews</h2>
        <div className="testimonial">
          <p style={{ color: 'black' }}>"Great quality and amazing customer service!" - Mbabazi Angel</p>
        </div>
        <div className="testimonial">
          <p style={{ color: 'black' }}> "The best fabrics I've ever used!" - Businge Ashely</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-nav">
          <p><b style={{ color: 'orange' }}> For More Information</b></p>
          <a href="https://www.facebook.com/share/F9Gi8GCcT4YA2uiR/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="fa-icon" />
          </a>
          <a href="https://www.instagram.com/raymond_investment_limited?igsh=a3VzbHhibXhoenRx&utm_source=qr" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="fa-icon" />
          </a>
          <a href="https://wa.me/message/A4DYG2RT44DLJ1" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} className="fa-icon" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;












