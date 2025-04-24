// components/ProductCard.jsx
import { motion } from 'framer-motion';
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      className="relative w-[320px] h-[560px] bg-white rounded-[2rem] shadow-xl overflow-hidden"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative h-[70%] overflow-hidden">
        <motion.img 
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      
      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800 capitalize line-clamp-1">
            {product.name}
          </h3>
          <span className="text-sm font-medium text-gray-500">
            {product.brand}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold text-emerald-600">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <motion.div 
              className="flex items-baseline gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm line-through text-gray-400">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                {product.discountPercentage}% OFF
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProductCard);