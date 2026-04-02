import React from 'react';
import Slider from 'react-slick';

const bannerSlides = [
  {
    id: 1,
    gradient: 'linear-gradient(135deg, #232f3e 0%, #007185 50%, #004f63 100%)',
    title: 'Great Indian Festival',
    subtitle: 'Up to 80% off on Electronics, Fashion & more',
    accent: '#febd69',
  },
  {
    id: 2,
    gradient: 'linear-gradient(135deg, #f3a847 0%, #febd69 50%, #f5c87a 100%)',
    title: 'Deals of the Day',
    subtitle: 'Top offers on Smartphones, Laptops & Accessories',
    accent: '#131921',
  },
  {
    id: 3,
    gradient: 'linear-gradient(135deg, #004f63 0%, #007185 50%, #00a8b5 100%)',
    title: 'Fashion & Beauty',
    subtitle: 'New arrivals at unbeatable prices',
    accent: '#febd69',
  },
  {
    id: 4,
    gradient: 'linear-gradient(135deg, #131921 0%, #232f3e 50%, #37475a 100%)',
    title: 'Home & Kitchen Essentials',
    subtitle: 'Refresh your home with top brands',
    accent: '#f3a847',
  },
  {
    id: 5,
    gradient: 'linear-gradient(135deg, #007185 0%, #00a8b5 40%, #e7f4f5 100%)',
    title: 'Prime Exclusive Deals',
    subtitle: 'Members save extra on every order',
    accent: '#131921',
  },
];

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: false,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {bannerSlides.map((slide) => (
          <div key={slide.id}>
            <div
              className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center cursor-pointer"
              style={{ background: slide.gradient }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h2
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 drop-shadow-lg"
                  style={{ color: slide.accent }}
                >
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white drop-shadow-md max-w-2xl">
                  {slide.subtitle}
                </p>
                <button
                  className="mt-4 sm:mt-6 px-6 py-2 sm:px-8 sm:py-3 bg-amazon-yellow text-amazon font-bold rounded-md text-sm sm:text-base hover:bg-amazon-orange transition-colors"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Bottom gradient fade overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(234,237,237,0) 0%, rgba(234,237,237,1) 100%)',
        }}
      />
    </div>
  );
};

export default Banner;
