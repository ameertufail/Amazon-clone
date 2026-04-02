import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { addToLocalCart } from '../store/cartSlice';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const renderStars = (rate = 0) => {
  const stars = [];
  const fullStars = Math.floor(rate);
  const hasHalf = rate - fullStars >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-amazon-orange" />);
  }
  if (hasHalf) {
    stars.push(<FaStarHalfAlt key="half" className="text-amazon-orange" />);
  }
  const remaining = 5 - stars.length;
  for (let i = 0; i < remaining; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-amazon-orange" />);
  }
  return stars;
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const {
    _id,
    title,
    name,
    image,
    images,
    price,
    mrp,
    rating,
    isPrime,
    numReviews,
  } = product;

  const displayTitle = title || name || 'Product';
  const displayImage = image || (images && images[0]) || '';
  const rateValue = rating?.rate ?? rating ?? 0;
  const rateCount = rating?.count ?? numReviews ?? 0;
  const discountPercent =
    mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (user && token) {
      dispatch(addToCart({ productId: _id, quantity: 1 }));
    } else {
      dispatch(addToLocalCart({ product, quantity: 1 }));
    }
  };

  return (
    <Link
      to={`/product/${_id}`}
      className="bg-white p-4 rounded shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col group"
    >
      {/* Product Image */}
      <div className="relative w-full h-40 sm:h-48 mb-3 flex items-center justify-center overflow-hidden">
        {displayImage ? (
          <img
            src={displayImage}
            alt={displayTitle}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
      </div>

      {/* Product Title */}
      <h3 className="text-sm text-gray-800 font-medium mb-1 line-clamp-2 group-hover:text-amazon-blue">
        {displayTitle}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-1">
        <div className="flex items-center text-sm">{renderStars(rateValue)}</div>
        {rateCount > 0 && (
          <span className="text-xs text-amazon-blue ml-1">{rateCount.toLocaleString()}</span>
        )}
      </div>

      {/* Price */}
      <div className="mb-1">
        <div className="flex items-baseline gap-1">
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            &#8377;{price?.toLocaleString('en-IN')}
          </span>
          {mrp && mrp > price && (
            <>
              <span className="text-xs text-gray-500">M.R.P.: </span>
              <span className="text-xs text-gray-500 line-through">
                &#8377;{mrp.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-red-600 font-medium">
                ({discountPercent}% off)
              </span>
            </>
          )}
        </div>
      </div>

      {/* Prime Badge */}
      {isPrime && (
        <div className="flex items-center gap-1 mb-1">
          <span className="text-xs font-bold text-amazon-blue">
            &#10003; prime
          </span>
        </div>
      )}

      {/* Free Delivery */}
      {isPrime && (
        <p className="text-xs text-gray-700 mb-2">
          FREE Delivery by Amazon
        </p>
      )}

      {/* Add to Cart Button */}
      <div className="mt-auto pt-2">
        <button
          onClick={handleAddToCart}
          className="w-full bg-amazon-yellow hover:bg-amazon-orange text-amazon text-sm font-medium py-2 rounded-full transition-colors duration-200 shadow-sm hover:shadow"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
