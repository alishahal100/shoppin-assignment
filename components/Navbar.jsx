// components/Navbar.jsx (using shadcn)
import React from 'react';


export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          ❤️
          <span className="text-xl font-bold text-red-600">SwipeCart</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button variant="ghost" className="text-gray-600">
            Likes
          </button>
          <button variant="ghost" className="text-gray-600">
            Cart
          </button>
        </div>
      </div>
    </nav>
  );
};