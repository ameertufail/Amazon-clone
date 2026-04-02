import React from 'react';
import { Link } from 'react-router-dom';

const categoriesData = [
  {
    name: 'Electronics',
    image: null,
    gradient: 'from-blue-100 to-blue-200',
    icon: '🔌',
  },
  {
    name: 'Fashion',
    image: null,
    gradient: 'from-pink-100 to-pink-200',
    icon: '👗',
  },
  {
    name: 'Home & Kitchen',
    image: null,
    gradient: 'from-green-100 to-green-200',
    icon: '🏠',
  },
  {
    name: 'Mobiles',
    image: null,
    gradient: 'from-purple-100 to-purple-200',
    icon: '📱',
  },
  {
    name: 'Beauty',
    image: null,
    gradient: 'from-rose-100 to-rose-200',
    icon: '💄',
  },
  {
    name: 'Books',
    image: null,
    gradient: 'from-amber-100 to-amber-200',
    icon: '📚',
  },
  {
    name: 'Sports',
    image: null,
    gradient: 'from-teal-100 to-teal-200',
    icon: '⚽',
  },
  {
    name: 'Computers',
    image: null,
    gradient: 'from-slate-100 to-slate-200',
    icon: '💻',
  },
];

const CategoryTiles = () => {
  return (
    <div className="relative z-10 -mt-8 sm:-mt-12 md:-mt-20 px-3 sm:px-6 lg:px-10 pb-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categoriesData.map((category) => (
          <Link
            key={category.name}
            to={`/products?category=${encodeURIComponent(category.name)}`}
            className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow duration-200 group"
          >
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
              {category.name}
            </h3>
            <div
              className={`bg-gradient-to-br ${category.gradient} h-32 sm:h-40 rounded flex items-center justify-center mb-3 group-hover:scale-[1.02] transition-transform duration-200`}
            >
              <span className="text-5xl sm:text-6xl">{category.icon}</span>
            </div>
            <p className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline">
              See more
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryTiles;
