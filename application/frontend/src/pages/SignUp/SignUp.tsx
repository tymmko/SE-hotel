import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../actions/auth.actions';
import { AppDispatch, RootState } from '../../app/store';
import { Icon } from '../../components';
import './styles.m.less';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.authReducer);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(register({ username, email, password }));
    if (register.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className="signup-page">
      <div className="decorative-section">
        <div className="shape shape-cross" />
        <div className="shape shape-heart" />
        <div className="shape shape-triangle" />
        <div className="shape shape-star" />
        <div className="shape shape-yellow-triangle" />
        <div className="shape shape-starburst" />
      </div>
      <div className="form-section">
        <div className="signup-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <div className="password-input">
                <input
                  type="password"
                  id="password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Icon name="eye" className="eye-icon" />
              </div>
            </div>
            <button type="submit" className="enter-button">Sign Up</button>
            {error && <p className="error">{error}</p>}
          </form>
          <p>Already have an account? <Link to="/login">Log In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;