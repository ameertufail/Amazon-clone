import React from 'react';
import { Link } from 'react-router-dom';

const footerSections = [
  {
    title: 'Get to Know Us',
    links: ['About Us', 'Careers', 'Press Releases', 'Amazon Science'],
  },
  {
    title: 'Connect with Us',
    links: ['Facebook', 'Twitter', 'Instagram'],
  },
  {
    title: 'Make Money with Us',
    links: [
      'Sell on Amazon',
      'Sell under Amazon Accelerator',
      'Protect and Build Your Brand',
      'Amazon Global Selling',
      'Become an Affiliate',
      'Fulfilment by Amazon',
    ],
  },
  {
    title: 'Let Us Help You',
    links: [
      'COVID-19 and Amazon',
      'Your Account',
      'Returns Centre',
      '100% Purchase Protection',
      'Amazon App Download',
      'Help',
    ],
  },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="w-full bg-amazon-light hover:bg-[#37475a] text-white text-sm py-3 text-center transition-colors duration-200"
      >
        Back to top
      </button>

      {/* Main Footer Links */}
      <div className="bg-amazon-light text-white">
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-base font-bold mb-3">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <span className="text-sm text-gray-300 hover:text-white hover:underline cursor-pointer transition-colors">
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600" />
      </div>

      {/* Bottom Bar */}
      <div className="bg-amazon text-white">
        <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="text-xl font-extrabold tracking-tight">
            amazon<span className="text-amazon-orange">.in</span>
          </Link>
          <p className="text-xs text-gray-400">
            &copy; 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
