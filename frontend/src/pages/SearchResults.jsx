import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products', {
          params: { search: query },
        });
        const productList = data.products || data || [];
        setProducts(productList);
      } catch (err) {
        console.error('Failed to fetch search results:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-[#eaeded]">
      {/* Results header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-[1500px] mx-auto">
          {query ? (
            <div>
              <p className="text-sm text-gray-600">
                Showing results for:{' '}
                <span className="text-amazon-orange font-semibold">
                  &quot;{query}&quot;
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {products.length} result{products.length !== 1 ? 's' : ''}{' '}
                found
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              Enter a search term to find products.
            </p>
          )}
        </div>
      </div>

      {/* Results content */}
      <div className="max-w-[1500px] mx-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-amazon-orange border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500 text-sm">
                Searching for &quot;{query}&quot;...
              </p>
            </div>
          </div>
        ) : !query.trim() ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Start Searching
            </h2>
            <p className="text-gray-500 mb-4">
              Use the search bar above to find products on Amazon.in
            </p>
            <Link
              to="/"
              className="inline-block bg-amazon-yellow hover:bg-amazon-orange text-amazon font-bold py-2 px-8 rounded-full transition-colors duration-200"
            >
              Go to Home
            </Link>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No results found for &quot;{query}&quot;
            </h2>
            <div className="text-gray-500 text-sm max-w-md mx-auto mt-4">
              <p className="font-medium mb-2">Suggestions:</p>
              <ul className="text-left list-disc list-inside space-y-1">
                <li>Check the spelling of your search term</li>
                <li>Try using more general keywords</li>
                <li>Try searching for a related term</li>
                <li>
                  Browse our{' '}
                  <Link
                    to="/products"
                    className="text-amazon-blue hover:text-amazon-orange hover:underline"
                  >
                    product categories
                  </Link>
                </li>
              </ul>
            </div>
            <Link
              to="/"
              className="inline-block mt-6 bg-amazon-yellow hover:bg-amazon-orange text-amazon font-bold py-2 px-8 rounded-full transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
