import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
  updateLocalCartItem,
  removeFromLocalCart,
} from '../store/cartSlice';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const Cart = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { items, loading } = useSelector((state) => state.cart);

  const isLoggedIn = !!(user && token);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCart());
    }
  }, [dispatch, isLoggedIn]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    if (isLoggedIn) {
      dispatch(updateCartItem({ productId, quantity: newQuantity }));
    } else {
      dispatch(updateLocalCartItem({ productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId) => {
    if (isLoggedIn) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(removeFromLocalCart(productId));
    }
  };

  const getProduct = (item) => item.productId || item.product || {};
  const getProductId = (item) => getProduct(item)._id || item.productId;
  const getProductImage = (item) => {
    const p = getProduct(item);
    return p.image || (p.images && p.images[0]) || '';
  };
  const getProductTitle = (item) => {
    const p = getProduct(item);
    return p.title || p.name || 'Product';
  };
  const getProductPrice = (item) => {
    const p = getProduct(item);
    return p.price || 0;
  };

  const subtotal = items.reduce(
    (sum, item) => sum + getProductPrice(item) * (item.quantity || 1),
    0
  );
  const totalItems = items.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  if (!loading && items.length === 0) {
    return (
      <div className="min-h-screen bg-[#eaeded] flex items-center justify-center p-4">
        <div className="bg-white rounded shadow-sm p-8 sm:p-12 text-center max-w-lg w-full">
          <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your Amazon Cart is empty
          </h1>
          <p className="text-gray-500 mb-6">
            Your shopping cart is waiting. Give it purpose -- fill it with
            groceries, clothing, household supplies, electronics, and more.
          </p>
          <Link
            to="/"
            className="inline-block bg-amazon-yellow hover:bg-amazon-orange text-amazon font-bold py-2 px-8 rounded-full transition-colors duration-200"
          >
            Continue Shopping
          </Link>
          {!isLoggedIn && (
            <div className="mt-4">
              <Link
                to="/signin"
                className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline"
              >
                Sign in to see your saved items
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaeded]">
      <div className="max-w-[1200px] mx-auto p-4 flex flex-col lg:flex-row gap-4">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-white rounded shadow-sm p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-500 mb-4 text-right">Price</p>
            <hr className="mb-4" />

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-amazon-orange border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const productId = getProductId(item);
                  const productImage = getProductImage(item);
                  const productTitle = getProductTitle(item);
                  const productPrice = getProductPrice(item);
                  const product = getProduct(item);
                  const quantity = item.quantity || 1;
                  const itemSubtotal = productPrice * quantity;

                  return (
                    <div key={productId}>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <Link
                          to={`/product/${productId}`}
                          className="w-full sm:w-44 h-44 shrink-0 flex items-center justify-center"
                        >
                          {productImage ? (
                            <img
                              src={productImage}
                              alt={productTitle}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded">
                              <span className="text-gray-400 text-sm">
                                No Image
                              </span>
                            </div>
                          )}
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between gap-4">
                            <div className="flex-1">
                              <Link
                                to={`/product/${productId}`}
                                className="text-base sm:text-lg font-medium text-gray-900 hover:text-amazon-orange line-clamp-2"
                              >
                                {productTitle}
                              </Link>

                              {product.isPrime && (
                                <p className="text-xs mt-1">
                                  <span className="font-bold text-amazon-blue">
                                    &#10003; prime
                                  </span>
                                  <span className="text-gray-600 ml-2">
                                    FREE Delivery
                                  </span>
                                </p>
                              )}

                              <p className="text-xs text-green-700 mt-1 font-medium">
                                In Stock
                              </p>
                            </div>

                            <p className="text-lg font-bold text-gray-900 whitespace-nowrap">
                              &#8377;{itemSubtotal.toLocaleString('en-IN')}
                            </p>
                          </div>

                          {/* Quantity & Delete */}
                          <div className="flex items-center gap-4 mt-3">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    productId,
                                    quantity - 1
                                  )
                                }
                                disabled={quantity <= 1}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                &minus;
                              </button>
                              <span className="px-4 py-1 text-sm font-medium bg-white border-x border-gray-300 min-w-[40px] text-center">
                                {quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    productId,
                                    quantity + 1
                                  )
                                }
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                              >
                                +
                              </button>
                            </div>

                            <span className="text-gray-300">|</span>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleRemoveItem(productId)}
                              className="flex items-center gap-1 text-sm text-amazon-blue hover:text-red-600 hover:underline transition-colors"
                            >
                              <FaTrash className="text-xs" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      <hr className="mt-4" />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Subtotal at bottom of items */}
            {items.length > 0 && (
              <div className="text-right mt-4 text-lg">
                Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''}):{' '}
                <span className="font-bold">
                  &#8377;{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        {items.length > 0 && (
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded shadow-sm p-4 sticky top-[120px]">
              {/* Free delivery message */}
              <div className="flex items-start gap-2 mb-3">
                <span className="text-green-600 text-sm">&#10003;</span>
                <p className="text-xs text-gray-600">
                  Your order is eligible for{' '}
                  <span className="font-bold">FREE Delivery</span>. Select
                  this option at checkout.
                </p>
              </div>

              <p className="text-lg mb-4">
                Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''}):{' '}
                <span className="font-bold">
                  &#8377;{subtotal.toLocaleString('en-IN')}
                </span>
              </p>

              <button className="w-full bg-amazon-yellow hover:bg-amazon-orange text-amazon font-medium text-sm py-2 rounded-full transition-colors duration-200 shadow-sm mb-3">
                Proceed to Buy
              </button>

              <hr className="my-3" />

              <p className="text-xs text-gray-500">
                EMI Available on select cards.{' '}
                <span className="text-amazon-blue cursor-pointer hover:underline">
                  Details
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
