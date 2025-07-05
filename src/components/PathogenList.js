/**
 * PathogenList Component
 * Simple list component for displaying pathogens
 * Sophomore-level React component with basic functionality
 */

import React from 'react';
import { Search, Filter, Microscope } from 'lucide-react';

const PathogenList = ({ 
  pathogens, 
  onSelectPathogen, 
  selectedPathogen,
  searchTerm,
  onSearch,
  gramFilter,
  onGramFilter,
  severityFilter,
  onSeverityFilter
}) => {
  // Handle search input change
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  // Handle gram filter change
  const handleGramFilterChange = (event) => {
    onGramFilter(event.target.value);
  };

  // Handle severity filter change
  const handleSeverityFilterChange = (event) => {
    onSeverityFilter(event.target.value);
  };

  // Get display color for gram status
  const getGramColor = (gramStatus) => {
    switch (gramStatus) {
      case 'positive':
        return 'text-purple-600 bg-purple-100';
      case 'negative':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Get display color for severity
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <Microscope className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Pathogens ({pathogens.length})
          </h2>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search pathogens..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={gramFilter}
              onChange={handleGramFilterChange}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Gram Status</option>
              <option value="positive">Gram Positive</option>
              <option value="negative">Gram Negative</option>
            </select>
          </div>

          <select
            value={severityFilter}
            onChange={handleSeverityFilterChange}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Severity</option>
            <option value="high">High Severity</option>
            <option value="medium">Medium Severity</option>
            <option value="low">Low Severity</option>
          </select>
        </div>
      </div>

      {/* Pathogen List */}
      <div className="max-h-96 overflow-y-auto">
        {pathogens.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Microscope className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No pathogens found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {pathogens.map((pathogen) => (
              <div
                key={pathogen.id}
                onClick={() => onSelectPathogen(pathogen)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedPathogen?.id === pathogen.id
                    ? 'bg-blue-50 border-2 border-blue-200'
                    : 'hover:bg-gray-50 border-2 border-transparent'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {pathogen.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGramColor(pathogen.gramStatus)}`}>
                        {pathogen.gramStatus === 'positive' ? 'Gram +' : 'Gram -'}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2">
                      {pathogen.commonName}
                    </p>
                    
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {pathogen.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-400">Shape:</span>
                      <span className="text-xs text-gray-600">{pathogen.shape}</span>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(pathogen.severity)}`}>
                        {pathogen.severity}
                      </span>
                    </div>
                  </div>

                  {selectedPathogen?.id === pathogen.id && (
                    <div className="text-blue-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer with count */}
      {pathogens.length > 0 && (
        <div className="p-3 border-t bg-gray-50 text-xs text-gray-500 text-center">
          Showing {pathogens.length} pathogen{pathogens.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default PathogenList;