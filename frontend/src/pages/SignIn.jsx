import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../store/authSlice';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    if (!email) {
      errors.email = 'Enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email address';
    }
    if (!password) {
      errors.password = 'Enter your password';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    dispatch(loginUser({ email, password }));
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

      {/* Sign-in Card */}
      <div className="w-full max-w-[350px] border border-gray-300 rounded-lg p-6 mb-4">
        <h1 className="text-[28px] font-normal mb-4">Sign in</h1>

        {/* Server error */}
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 text-sm rounded p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
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
              className={`w-full px-3 py-1.5 border rounded-sm text-sm outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${
                formErrors.password ? 'border-red-500' : 'border-gray-400'
              }`}
            />
            {formErrors.password && (
              <p className="text-red-600 text-xs mt-1">
                {formErrors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-sm py-1.5 rounded-lg border border-yellow-500 font-medium disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-4">
          By continuing, you agree to Amazon&apos;s{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Conditions of Use
          </span>{' '}
          and{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Privacy Notice
          </span>
          .
        </p>
      </div>

      {/* Divider */}
      <div className="w-full max-w-[350px] flex items-center mb-4">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="px-3 text-xs text-gray-500">New to Amazon?</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* Create account button */}
      <div className="w-full max-w-[350px] mb-8">
        <Link
          to="/signup"
          className="block w-full text-center text-sm py-1.5 rounded-lg border border-gray-400 bg-gray-100 hover:bg-gray-200 font-medium"
        >
          Create your Amazon account
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
