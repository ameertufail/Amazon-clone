import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import {
  FaMapMarkerAlt,
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaChevronDown,
} from 'react-icons/fa';

const categories = [
  'All',
  'Electronics',
  'Fashion',
  'Books',
  'Mobiles',
  'Home',
  'Beauty',
  'Sports',
];

const bottomNavLinks = [
  'Today\'s Deals',
  'Customer Service',
  'Gift Cards',
  'Sell',
];

const quickCategories = [
  'Amazon miniTV',
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Mobiles',
  'Beauty',
  'Books',
  'Computers',
  'Sports',
];

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const cartCount = items.reduce((total, item) => total + (item.quantity || 1), 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-amazon text-white">
        <div className="flex items-center px-2 py-2 gap-2 max-w-[1500px] mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded shrink-0"
          >
            <span className="text-xl font-extrabold tracking-tight">
              amazon
              <span className="text-amazon-orange">.in</span>
            </span>
          </Link>

          {/* Location Picker */}
          <div className="hidden md:flex items-center px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer shrink-0">
            <FaMapMarkerAlt className="text-white mr-1" />
            <div className="leading-tight">
              <p className="text-xs text-gray-300">Deliver to</p>
              <p className="text-sm font-bold">India</p>
            </div>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex flex-1 items-center h-10 rounded-md overflow-hidden"
          >
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-full px-2 bg-gray-200 text-gray-700 text-xs border-r border-gray-300 rounded-l-md outline-none cursor-pointer hidden sm:block"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Amazon.in"
              className="flex-1 h-full px-3 text-sm text-gray-900 outline-none"
            />
            <button
              type="submit"
              className="h-full px-4 bg-amazon-orange hover:bg-amazon-yellow transition-colors"
              aria-label="Search"
            >
              <FaSearch className="text-amazon text-lg" />
            </button>
          </form>

          {/* Account */}
          <div className="hidden lg:block">
            {user ? (
              <div className="relative group px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer">
                <p className="text-xs text-gray-300">Hello, {user.name?.split(' ')[0]}</p>
                <p className="text-sm font-bold flex items-center">
                  Account & Lists <FaChevronDown className="ml-1 text-xs" />
                </p>
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-0 w-48 bg-white text-gray-800 rounded shadow-lg border hidden group-hover:block z-50">
                  <div className="py-2">
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Your Account
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Your Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/signin"
                className="px-2 py-1 border border-transparent hover:border-white rounded block"
              >
                <p className="text-xs text-gray-300">Hello, Sign in</p>
                <p className="text-sm font-bold flex items-center">
                  Account & Lists <FaChevronDown className="ml-1 text-xs" />
                </p>
              </Link>
            )}
          </div>

          {/* Returns & Orders */}
          <Link
            to="/"
            className="hidden lg:block px-2 py-1 border border-transparent hover:border-white rounded"
          >
            <p className="text-xs text-gray-300">Returns</p>
            <p className="text-sm font-bold">& Orders</p>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded relative"
          >
            <div className="relative">
              <FaShoppingCart className="text-2xl" />
              <span className="absolute -top-2 -right-2 bg-amazon-orange text-amazon text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <span className="hidden sm:inline text-sm font-bold ml-1">Cart</span>
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-amazon-light text-white text-sm">
        <div className="flex items-center px-2 py-1 gap-1 max-w-[1500px] mx-auto overflow-x-auto scrollbar-hide">
          {/* All Menu */}
          <button className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded font-bold shrink-0">
            <FaBars className="mr-1" />
            All
          </button>

          {/* Static Links */}
          {bottomNavLinks.map((link) => (
            <span
              key={link}
              className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer whitespace-nowrap shrink-0"
            >
              {link}
            </span>
          ))}

          {/* Category Quick Links */}
          {quickCategories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="px-2 py-1 border border-transparent hover:border-white rounded whitespace-nowrap shrink-0"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
