// components/CardStack.jsx
import { motion, AnimatePresence, useAnimate } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useState, useCallback } from 'react';
import ProductCard from './ProductCard';

const CardStack = ({ products = [] }) => {
  const [index, setIndex] = useState(0);
  const [scope, animate] = useAnimate();
  const [isDragging, setIsDragging] = useState(false);

  const handleSwipe = useCallback(async (direction) => {
    const currentCard = scope.current;
    if (!currentCard) return;

    const rotation = direction === 'right' ? 15 : direction === 'left' ? -15 : 0;
    const x = direction === 'right' ? 500 : direction === 'left' ? -500 : 0;
    const y = direction === 'up' ? -500 : 0;

    await animate(currentCard, {
      x: [null, x * 1.5],
      y: [null, y * 1.5],
      rotate: [null, rotation],
      opacity: [null, 0.5],
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
    });

    setIndex(prev => (prev + 1) % products.length);
    console.log(`${direction} product: ${products[index].id}`);
  }, [animate, index, products, scope]);

  const handleDragEnd = useCallback((event, info) => {
    setIsDragging(false);
    const velocityThreshold = 500;
    const distanceThreshold = 100;

    if (
      Math.abs(info.velocity.x) > velocityThreshold ||
      Math.abs(info.offset.x) > distanceThreshold
    ) {
      handleSwipe(info.offset.x > 0 ? 'right' : 'left');
    } else if (
      Math.abs(info.velocity.y) > velocityThreshold ||
      info.offset.y < -distanceThreshold
    ) {
      handleSwipe('up');
    }
  }, [handleSwipe]);

  useGSAP(() => {
    gsap.set(scope.current, { x: 0, y: 0, rotate: 0, opacity: 1 });
  }, [index]);

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          ref={scope}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.8}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          className="absolute touch-none cursor-grab active:cursor-grabbing"
          initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
          animate={{ 
            scale: 1,
            opacity: 1,
            rotate: 0,
            transition: { type: 'spring', stiffness: 300, damping: 20 }
          }}
          exit={{ 
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.2 } 
          }}
          whileDrag={{ scale: 1.05 }}
        >
          <ProductCard product={products[index]} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default React.memo(CardStack);