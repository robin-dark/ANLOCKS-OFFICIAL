import React from 'react';
import { ANLOCKS_PRODUCTS } from '../constants';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Products: React.FC = () => {
  return (
    <section id="products" className="py-24 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-orange-600 font-bold tracking-wider text-sm uppercase">Our Collection</span>
          <h2 className="text-4xl font-serif font-bold text-gray-900 mt-2 mb-4">Crafted for Your Palate</h2>
          <p className="text-gray-600">
            From spicy pickles to aromatic blends, every Anlocks jar is packed with love and tradition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ANLOCKS_PRODUCTS.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                  {product.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    <Star className="w-4 h-4 fill-current" />
                    <span>4.9</span>
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-2xl font-serif font-bold text-gray-900">{product.price}</span>
                  <button className="p-3 bg-gray-100 rounded-full hover:bg-orange-600 hover:text-white transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="inline-block border-b-2 border-orange-500 text-gray-900 font-bold hover:text-orange-600 pb-1">
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;