import React from 'react';
import { Icon } from '../../components'; // Adjust path based on your structure
import './styles.m.less';

const Login: React.FC = () => {
  return (
    <div className="login-page">
      {/* Decorative Left Section */}
      <div className="decorative-section">
        <div className="shape shape-cross" />
        <div className="shape shape-heart" />
        <div className="shape shape-triangle" />
        <div className="shape shape-star" />
        <div className="shape shape-yellow-triangle" />
        <div className="shape shape-starburst" />
      </div>
      {/* Login Form Section */}
      <div className="form-section">
        <div className="login-form">
          <h2>Log In</h2>
          <div className="form-group">
            <label htmlFor="username">username:</label>
            <input type="text" id="username" className="input-field" />
          </div>
          <div className="form-group">
            <label htmlFor="password">password:</label>
            <div className="password-input">
              <input type="password" id="password" className="input-field" />
              <Icon name="eye" className="eye-icon" />
            </div>
          </div>
          <button className="enter-button">Enter</button>
        </div>
      </div>
    </div>
  );
};

export default Login;