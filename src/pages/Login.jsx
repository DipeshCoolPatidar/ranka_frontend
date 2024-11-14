import React, { useState, useEffect } from 'react'; 
import { TextField, Button, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [login, setLogin] = useState(''); // This will hold either email or username
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsLoading(true); // Disable form submission while loading

    try {
      // Make POST request with login (email/username) and password
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
        login,  // Send the unified login field (email or username)
        password,
      });

      const { token, roles } = response.data;

      // Store the token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', roles[0]); // Assuming there's only one role

      // Redirect based on role
      if (roles.includes('Admin')) {
        navigate('/admin-panel', { replace: true });  // Prevent navigation loop with replace
      } else if (roles.includes('Staff')) {
        navigate('/home', { replace: true });
      } else {
        setError('Unknown role');
      }

    } catch (err) {
      // Handle different types of errors
      if (err.response) {
        if (err.response.status === 401) {
          setError('Invalid username/email or password');
        } else if (err.response.status === 500) {
          setError('Server error, please try again later');
        } else {
          setError('An unexpected error occurred');
        }
      } else if (err.request) {
        setError('Network error, please check your connection');
      } else {
        setError('An error occurred, please try again');
      }
    } finally {
      setIsLoading(false); // Re-enable form submission
    }
  };

  // Don't cause excessive rerenders by using navigate with conditions
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      // Navigate based on role
      if (role === 'Admin') {
        navigate('/admin-panel', { replace: true });
      } else if (role === 'Staff') {
        navigate('/home', { replace: true });
      }
    }
  }, [navigate]); // Only run once on mount or when navigate function changes

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 lg:px-12">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center mb-6 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-wide">Welcome Back</h1>
            <p className="text-lg text-gray-600">Sign in to your premium account</p>
          </div>

          {/* Email/Username and Password Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email or Username"
              variant="outlined"
              className="mb-4"
              value={login}
              onChange={(e) => setLogin(e.target.value)} // Set the login state (email or username)
              inputProps={{ style: { fontSize: '16px' } }}
            />
            <div className="relative mb-4">
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Set the password state
                inputProps={{ style: { fontSize: '16px' } }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-4">
              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading} // Disable the button while loading
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-2 text-lg font-semibold tracking-wider"
              style={{ transition: 'all 0.2s ease-in-out' }}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}
          </form>
        </div>
      </div>

      {/* Right Side: Image with Animation */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 items-center justify-center p-8 animate-slide-in-right">
        <div className="text-center relative">
          <img
            src="https://plus.unsplash.com/premium_photo-1661443554105-0b1bdc879493?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Premium Nature"
            className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
