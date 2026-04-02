import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, clearError } from '../store/authSlice';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const validate = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = 'Enter your name';
    }
    if (!email) {
      errors.email = 'Enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email address';
    }
    if (!password) {
      errors.password = 'Enter a password';
    } else if (password.length < 6) {
      errors.password = 'Passwords must be at least 6 characters';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Type your password again';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-4">
      {/* Logo */}
      <Link to="/" className="mb-4">
        <img
          src="/amazon-logo-dark.png"
          alt="Amazon"
          className="h-10 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <span
          className="text-3xl font-bold text-gray-900 hidden"
          style={{ display: 'none' }}
        >
          amazon.in
        </span>
      </Link>

      {/* Create Account Card */}
      <div className="w-full max-w-[350px] border border-gray-300 rounded-lg p-6 mb-4">
        <h1 className="text-[28px] font-normal mb-4">Create account</h1>

        {/* Server error */}
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 text-sm rounded p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-bold mb-1"
            >
              Your name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First and last name"
              className={`w-full px-3 py-1.5 border rounded-sm text-sm outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${
                formErrors.name ? 'border-red-500' : 'border-gray-400'
              }`}
            />
            {formErrors.name && (
              <p className="text-red-600 text-xs mt-1">{formErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-bold mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-1.5 border rounded-sm text-sm outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${
                formErrors.email ? 'border-red-500' : 'border-gray-400'
              }`}
            />
            {formErrors.email && (
              <p className="text-red-600 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-bold mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className={`w-full px-3 py-1.5 border rounded-sm text-sm outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${
                formErrors.password ? 'border-red-500' : 'border-gray-400'
              }`}
            />
            {formErrors.password && (
              <p className="text-red-600 text-xs mt-1">
                {formErrors.password}
              </p>
            )}
            <p className="text-xs text-gray-600 mt-1">
              Passwords must be at least 6 characters.
            </p>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-bold mb-1"
            >
              Re-enter password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-1.5 border rounded-sm text-sm outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${
                formErrors.confirmPassword
                  ? 'border-red-500'
                  : 'border-gray-400'
              }`}
            />
            {formErrors.confirmPassword && (
              <p className="text-red-600 text-xs mt-1">
                {formErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-sm py-1.5 rounded-lg border border-yellow-500 font-medium disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create your Amazon account'}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-4">
          By creating an account, you agree to Amazon&apos;s{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Conditions of Use
          </span>{' '}
          and{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Privacy Notice
          </span>
          .
        </p>

        <div className="border-t border-gray-300 mt-4 pt-4">
          <p className="text-sm">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="text-blue-600 hover:underline hover:text-orange-600"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
