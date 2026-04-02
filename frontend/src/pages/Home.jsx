import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Banner from '../components/Banner';
import CategoryTiles from '../components/CategoryTiles';
import ProductCard from '../components/ProductCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ScrollableRow = ({ title, products }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-r p-2 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Scroll left"
        >
          <FaChevronLeft className="text-gray-700 text-lg" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product._id} className="min-w-[200px] max-w-[220px] flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-l p-2 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Scroll right"
        >
          <FaChevronRight className="text-gray-700 text-lg" />
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products');
        const productList = data.products || data || [];
        setProducts(productList);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const todaysDeals = products.slice(0, 8);
  const bestSellers = products.slice(8, 16);

  return (
    <div className="min-h-screen">
      {/* Banner Carousel */}
      <Banner />

      {/* Category Tiles */}
      <CategoryTiles />

      {/* Product Sections */}
      <div className="px-3 sm:px-6 lg:px-10 py-4 space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-amazon-orange border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500 text-sm">Loading products...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Today's Deals */}
            {todaysDeals.length > 0 && (
              <ScrollableRow title="Today's Deals" products={todaysDeals} />
            )}

            {/* Best Sellers */}
            {bestSellers.length > 0 && (
              <ScrollableRow title="Best Sellers" products={bestSellers} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
