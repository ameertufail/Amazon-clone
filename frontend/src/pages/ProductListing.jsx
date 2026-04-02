import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import {
  FaStar,
  FaTh,
  FaList,
  FaFilter,
  FaTimes,
} from 'react-icons/fa';

const priceRanges = [
  { label: 'Under \u20B9500', min: 0, max: 500 },
  { label: '\u20B9500 - \u20B91,000', min: 500, max: 1000 },
  { label: '\u20B91,000 - \u20B95,000', min: 1000, max: 5000 },
  { label: '\u20B95,000 - \u20B910,000', min: 5000, max: 10000 },
  { label: 'Over \u20B910,000', min: 10000, max: Infinity },
];

const categoryOptions = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Mobiles',
  'Beauty',
  'Books',
  'Sports',
  'Computers',
];

const ratingOptions = [4, 3, 2, 1];

const sortOptions = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Avg. Customer Reviews', value: 'rating' },
  { label: 'Newest Arrivals', value: 'newest' },
];

const ProductListing = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCategories, setSelectedCategories] = useState(
    categoryParam ? [categoryParam] : []
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [primeOnly, setPrimeOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [categoryParam]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = {};
        if (searchQuery) params.search = searchQuery;
        // Always fetch all products - category filtering is done client-side
        const { data } = await axios.get('/api/products', { params });
        const productList = data.products || data || [];
        setProducts(productList);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchQuery]);

  const handleCategoryToggle = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredAndSorted = useMemo(() => {
    let result = [...products];

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.some(
          (cat) =>
            (p.category || '').toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    // Filter by price range
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter(
        (p) => p.price >= range.min && p.price < (range.max === Infinity ? 999999999 : range.max + 1)
      );
    }

    // Filter by Prime
    if (primeOnly) {
      result = result.filter((p) => p.isPrime);
    }

    // Filter by minimum rating
    if (minRating > 0) {
      result = result.filter((p) => {
        const rate = p.rating?.rate ?? p.rating ?? 0;
        return rate >= minRating;
      });
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'rating':
        result.sort(
          (a, b) =>
            (b.rating?.rate ?? b.rating ?? 0) -
            (a.rating?.rate ?? a.rating ?? 0)
        );
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        break;
      default:
        break;
    }

    return result;
  }, [products, selectedCategories, selectedPriceRange, primeOnly, minRating, sortBy]);

  const clearFilters = () => {
    setSelectedCategories(categoryParam ? [categoryParam] : []);
    setSelectedPriceRange(null);
    setPrimeOnly(false);
    setMinRating(0);
    setSortBy('relevance');
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-bold text-sm text-gray-900 mb-2">Category</h3>
        <div className="space-y-1">
          {categoryOptions.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-amazon-orange"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryToggle(cat)}
                className="rounded border-gray-300 text-amazon-orange focus:ring-amazon-orange"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="font-bold text-sm text-gray-900 mb-2">Price</h3>
        <div className="space-y-1">
          {priceRanges.map((range, idx) => (
            <label
              key={range.label}
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-amazon-orange"
            >
              <input
                type="radio"
                name="priceRange"
                checked={selectedPriceRange === idx}
                onChange={() =>
                  setSelectedPriceRange(selectedPriceRange === idx ? null : idx)
                }
                className="text-amazon-orange focus:ring-amazon-orange"
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>

      {/* Prime Filter */}
      <div>
        <h3 className="font-bold text-sm text-gray-900 mb-2">Prime</h3>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-amazon-orange">
          <input
            type="checkbox"
            checked={primeOnly}
            onChange={() => setPrimeOnly(!primeOnly)}
            className="rounded border-gray-300 text-amazon-orange focus:ring-amazon-orange"
          />
          <span className="font-bold text-amazon-blue">&#10003; prime</span>
        </label>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-bold text-sm text-gray-900 mb-2">
          Customer Reviews
        </h3>
        <div className="space-y-1">
          {ratingOptions.map((rating) => (
            <button
              key={rating}
              onClick={() =>
                setMinRating(minRating === rating ? 0 : rating)
              }
              className={`flex items-center gap-1 text-sm py-1 w-full text-left hover:text-amazon-orange ${
                minRating === rating ? 'font-bold text-amazon-orange' : 'text-gray-700'
              }`}
            >
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-xs ${
                      star <= rating ? 'text-amazon-orange' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span>& Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline"
      >
        Clear all filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#eaeded]">
      {/* Top Results Bar */}
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-[1500px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-1 text-sm border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-50"
            >
              <FaFilter className="text-xs" />
              Filters
            </button>

            <p className="text-sm text-gray-600">
              {searchQuery && (
                <span>
                  Results for &quot;<strong>{searchQuery}</strong>&quot;
                  {' \u2014 '}
                </span>
              )}
              {categoryParam && (
                <span>
                  Category: <strong>{categoryParam}</strong>
                  {' \u2014 '}
                </span>
              )}
              <span className="text-gray-900 font-medium">
                {filteredAndSorted.length} results
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center border border-gray-300 rounded overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                aria-label="Grid view"
              >
                <FaTh />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                aria-label="List view"
              >
                <FaList />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1.5 bg-gray-50 hover:bg-gray-100 outline-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  Sort by: {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-56 xl:w-64 shrink-0 p-4 bg-white border-r min-h-screen">
          <FilterSidebar />
        </aside>

        {/* Mobile Filter Overlay */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowMobileFilters(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-white overflow-y-auto shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-bold text-lg">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>
              <div className="p-4">
                <FilterSidebar />
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1 p-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-amazon-orange border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-500 text-sm">Loading products...</p>
              </div>
            </div>
          ) : filteredAndSorted.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                No products found
              </h2>
              <p className="text-gray-500">
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-amazon-blue hover:text-amazon-orange hover:underline text-sm"
              >
                Clear all filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredAndSorted.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSorted.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded shadow-sm overflow-hidden"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
