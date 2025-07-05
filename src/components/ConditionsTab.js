/**
 * ConditionsTab Component
 * Displays searchable list of medical conditions
 * 
 * Props:
 * - filteredConditions: array - conditions filtered by search term
 * - setSelectedCondition: function - function to select a condition for the modal
 * - searchTerm: string - current search term
 * - setSearchTerm: function - function to update search term
 */

import React, { memo } from 'react';
import { Search } from 'lucide-react';

const ConditionsTab = ({ 
  filteredConditions, 
  setSelectedCondition, 
  searchTerm, 
  setSearchTerm 
}) => {
  return (
    <div>
      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search conditions, pathogens, or treatments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
          aria-label="Search medical conditions"
        />
      </div>

      {/* Conditions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(filteredConditions || []).map((condition) => (
          <div
            key={condition.id}
            className="bg-white rounded-xl p-6 shadow-sm border cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all"
            onClick={() => setSelectedCondition(condition)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedCondition(condition);
              }
            }}
            aria-label={`View details for ${condition.name}`}
          >
            {/* Category Badge */}
            <div className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full mb-3">
              {condition.category}
            </div>
            
            {/* Condition Name */}
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              {condition.name}
            </h3>
            
            {/* Common Pathogens Preview */}
            <div className="text-sm text-gray-600">
              <strong>Common Pathogens:</strong><br />
              {(condition.commonPathogens || []).slice(0, 3).join(', ')}
              {(condition.commonPathogens || []).length > 3 && '...'}
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {(filteredConditions || []).length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <Search size={48} className="mx-auto mb-4" />
          <p>No conditions found matching your search.</p>
          <p className="text-sm mt-2">Try searching for a different term or browse all conditions.</p>
        </div>
      )}
    </div>
  );
};

export default ConditionsTab;