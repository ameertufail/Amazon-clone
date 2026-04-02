const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  // Electronics
  {
    title: 'boAt Rockerz 450 Bluetooth On Ear Headphones with Mic',
    description:
      'HD immersive sound, 40mm dynamic drivers, Bluetooth v5.0, up to 15 hours playback, soft padded ear cushions, lightweight design.',
    price: 1299,
    mrp: 3990,
    image: 'https://via.placeholder.com/300x300?text=Electronics',
    category: 'Electronics',
    rating: { rate: 4.1, count: 34521 },
    isPrime: true,
    inStock: true,
    brand: 'boAt',
  },
  {
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    description:
      'Industry-leading noise cancellation with Auto NC Optimizer, crystal clear hands-free calling, 30-hour battery life, ultra comfortable.',
    price: 26990,
    mrp: 34990,
    image: 'https://via.placeholder.com/300x300?text=Electronics',
    category: 'Electronics',
    rating: { rate: 4.5, count: 8923 },
    isPrime: true,
    inStock: true,
    brand: 'Sony',
  },
  {
    title: 'Fire-Boltt Phoenix Smart Watch with Bluetooth Calling',
    description:
      '1.3 inch display, SpO2, heart rate monitoring, 120+ sports modes, AI voice assistant, IP67 water resistant.',
    price: 1499,
    mrp: 8999,
    image: 'https://via.placeholder.com/300x300?text=Electronics',
    category: 'Electronics',
    rating: { rate: 3.9, count: 52340 },
    isPrime: false,
    inStock: true,
    brand: 'Fire-Boltt',
  },

  // Fashion
  {
    title: 'Levi\'s Men\'s 511 Slim Fit Jeans',
    description:
      'Slim from hip to ankle, classic 5-pocket styling, mid-rise, comfortable stretch denim, versatile wash for everyday wear.',
    price: 1799,
    mrp: 3999,
    image: 'https://via.placeholder.com/300x300?text=Fashion',
    category: 'Fashion',
    rating: { rate: 4.2, count: 18234 },
    isPrime: true,
    inStock: true,
    brand: "Levi's",
  },
  {
    title: 'Allen Solly Men\'s Regular Fit Polo T-Shirt',
    description:
      'Cotton blend fabric, regular fit, ribbed collar and sleeve hems, embroidered logo, comfortable for all-day wear.',
    price: 849,
    mrp: 1499,
    image: 'https://via.placeholder.com/300x300?text=Fashion',
    category: 'Fashion',
    rating: { rate: 4.0, count: 9876 },
    isPrime: false,
    inStock: true,
    brand: 'Allen Solly',
  },
  {
    title: 'Anubhutee Women\'s Cotton Printed Straight Kurta Set',
    description:
      'Pure cotton fabric, beautiful ethnic print, straight fit kurta with palazzo, ideal for casual and festive occasions.',
    price: 699,
    mrp: 2499,
    image: 'https://via.placeholder.com/300x300?text=Fashion',
    category: 'Fashion',
    rating: { rate: 4.3, count: 14567 },
    isPrime: true,
    inStock: true,
    brand: 'Anubhutee',
  },

  // Home & Kitchen
  {
    title: 'Prestige Iris 750 Watt Mixer Grinder with 3 Stainless Steel Jars',
    description:
      '750W powerful motor, 3 stainless steel jars, super efficient blades, overload protection, 2-year warranty.',
    price: 2849,
    mrp: 4545,
    image: 'https://via.placeholder.com/300x300?text=Home+Kitchen',
    category: 'Home & Kitchen',
    rating: { rate: 4.2, count: 23456 },
    isPrime: true,
    inStock: true,
    brand: 'Prestige',
  },
  {
    title: 'Milton Thermosteel Flip Lid Flask 1000ml',
    description:
      'Double walled vacuum insulated, keeps beverages hot or cold for 24 hours, leak-proof flip lid, food grade stainless steel.',
    price: 699,
    mrp: 1175,
    image: 'https://via.placeholder.com/300x300?text=Home+Kitchen',
    category: 'Home & Kitchen',
    rating: { rate: 4.4, count: 45678 },
    isPrime: true,
    inStock: true,
    brand: 'Milton',
  },
  {
    title: 'Pigeon by Stovekraft Favourite Outer Lid Non Induction Aluminium Pressure Cooker 5 Litre',
    description:
      'Aluminium body, gasket release system, precision weight valve, ISI certified, suitable for gas stove, 5-year warranty.',
    price: 849,
    mrp: 1395,
    image: 'https://via.placeholder.com/300x300?text=Home+Kitchen',
    category: 'Home & Kitchen',
    rating: { rate: 4.1, count: 67890 },
    isPrime: false,
    inStock: true,
    brand: 'Pigeon',
  },

  // Books
  {
    title: 'Atomic Habits by James Clear (Paperback)',
    description:
      'An easy and proven way to build good habits and break bad ones. The #1 New York Times bestseller. Practical strategies for habit formation.',
    price: 399,
    mrp: 799,
    image: 'https://via.placeholder.com/300x300?text=Books',
    category: 'Books',
    rating: { rate: 4.7, count: 98765 },
    isPrime: true,
    inStock: true,
    brand: 'Penguin Random House',
  },
  {
    title: 'The Psychology of Money by Morgan Housel',
    description:
      'Timeless lessons on wealth, greed, and happiness. 19 short stories exploring the strange ways people think about money.',
    price: 299,
    mrp: 399,
    image: 'https://via.placeholder.com/300x300?text=Books',
    category: 'Books',
    rating: { rate: 4.6, count: 54321 },
    isPrime: true,
    inStock: true,
    brand: 'Jaico Publishing House',
  },
  {
    title: 'Rich Dad Poor Dad by Robert T. Kiyosaki',
    description:
      'What the rich teach their kids about money that the poor and middle class do not. 20th anniversary edition.',
    price: 279,
    mrp: 399,
    image: 'https://via.placeholder.com/300x300?text=Books',
    category: 'Books',
    rating: { rate: 4.5, count: 76543 },
    isPrime: false,
    inStock: true,
    brand: 'Plata Publishing',
  },

  // Mobiles
  {
    title: 'Samsung Galaxy M34 5G (Midnight Blue, 6GB, 128GB)',
    description:
      '6000mAh battery, 6GB RAM, 128GB storage, 50MP triple camera, 120Hz sAMOLED display, 5G ready, Exynos 1280.',
    price: 15499,
    mrp: 21999,
    image: 'https://via.placeholder.com/300x300?text=Mobiles',
    category: 'Mobiles',
    rating: { rate: 4.2, count: 34567 },
    isPrime: true,
    inStock: true,
    brand: 'Samsung',
  },
  {
    title: 'Redmi Note 13 Pro 5G (Fusion Purple, 8GB RAM, 256GB Storage)',
    description:
      '200MP camera, 6.67 inch 120Hz AMOLED display, Snapdragon 7s Gen 2, 5100mAh battery, 67W turbo charging.',
    price: 23999,
    mrp: 29999,
    image: 'https://via.placeholder.com/300x300?text=Mobiles',
    category: 'Mobiles',
    rating: { rate: 4.3, count: 28901 },
    isPrime: true,
    inStock: true,
    brand: 'Redmi',
  },
  {
    title: 'iPhone 15 (Blue, 128 GB)',
    description:
      'A16 Bionic chip, 48MP camera system, Dynamic Island, USB-C, Ceramic Shield front, aerospace-grade aluminium.',
    price: 69900,
    mrp: 79900,
    image: 'https://via.placeholder.com/300x300?text=Mobiles',
    category: 'Mobiles',
    rating: { rate: 4.6, count: 12345 },
    isPrime: true,
    inStock: true,
    brand: 'Apple',
  },

  // Computers
  {
    title: 'HP Laptop 15s, 12th Gen Intel Core i5-1235U, 15.6-inch FHD, 8GB DDR4, 512GB SSD',
    description:
      'Intel Core i5-1235U processor, 8GB RAM, 512GB SSD, Intel Iris Xe graphics, Windows 11, micro-edge display, long battery life.',
    price: 52990,
    mrp: 66542,
    image: 'https://via.placeholder.com/300x300?text=Computers',
    category: 'Computers',
    rating: { rate: 4.3, count: 5678 },
    isPrime: true,
    inStock: true,
    brand: 'HP',
  },
  {
    title: 'Logitech MK270r Wireless Keyboard and Mouse Combo',
    description:
      'Full-size keyboard, compact mouse, 2.4GHz wireless, plug and play nano receiver, spill-resistant keyboard, 24-month battery.',
    price: 1595,
    mrp: 2795,
    image: 'https://via.placeholder.com/300x300?text=Computers',
    category: 'Computers',
    rating: { rate: 4.3, count: 43210 },
    isPrime: true,
    inStock: true,
    brand: 'Logitech',
  },

  // Beauty
  {
    title: 'Maybelline New York Fit Me Matte+Poreless Liquid Foundation',
    description:
      'Poreless finish matte foundation, micro-powders control shine, blurs pores, lightweight breathable feel, SPF 22.',
    price: 399,
    mrp: 599,
    image: 'https://via.placeholder.com/300x300?text=Beauty',
    category: 'Beauty',
    rating: { rate: 4.2, count: 87654 },
    isPrime: false,
    inStock: true,
    brand: 'Maybelline',
  },
  {
    title: 'Biotique Bio Green Apple Fresh Daily Purifying Shampoo & Conditioner 650ml',
    description:
      'Green apple extract, fresh daily purifying shampoo, removes excess oil and impurities, suitable for oily hair, SLS free.',
    price: 299,
    mrp: 425,
    image: 'https://via.placeholder.com/300x300?text=Beauty',
    category: 'Beauty',
    rating: { rate: 4.0, count: 32109 },
    isPrime: true,
    inStock: true,
    brand: 'Biotique',
  },

  // Sports
  {
    title: 'Yonex MAVIS 350 Nylon Badminton Shuttlecock (Pack of 6)',
    description:
      'Nylon shuttlecock, durable nylon skirt, natural cork base, medium speed, consistent flight pattern, tournament grade.',
    price: 699,
    mrp: 990,
    image: 'https://via.placeholder.com/300x300?text=Sports',
    category: 'Sports',
    rating: { rate: 4.4, count: 21098 },
    isPrime: true,
    inStock: true,
    brand: 'Yonex',
  },
  {
    title: 'Boldfit Yoga Mat for Women and Men NBR Material with Carrying Strap 6mm',
    description:
      'Extra thick 6mm NBR material, non-slip surface, carrying strap included, tear resistant, suitable for yoga, pilates, gym workouts.',
    price: 399,
    mrp: 1299,
    image: 'https://via.placeholder.com/300x300?text=Sports',
    category: 'Sports',
    rating: { rate: 4.1, count: 15432 },
    isPrime: false,
    inStock: true,
    brand: 'Boldfit',
  },
  {
    title: 'SG RSD Xtreme English Willow Cricket Bat',
    description:
      'English willow, full size SH, thick edge, rounded face, traditional handle, lightweight pickup, ideal for leather ball cricket.',
    price: 4999,
    mrp: 7999,
    image: 'https://via.placeholder.com/300x300?text=Sports',
    category: 'Sports',
    rating: { rate: 4.0, count: 3456 },
    isPrime: true,
    inStock: true,
    brand: 'SG',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');

    // Insert products
    const inserted = await Product.insertMany(products);
    console.log(`${inserted.length} products seeded successfully`);

    await mongoose.disconnect();
    console.log('MongoDB disconnected. Seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
