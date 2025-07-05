import React from 'react';
import { Loader } from 'lucide-react';

/**
 * LoadingSpinner Component
 * Provides a consistent loading indicator for lazy-loaded components
 */
const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader className="w-8 h-8 text-blue-600 animate-spin mb-4" role="img" aria-label="Loading" />
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  );
};

export default LoadingSpinner;