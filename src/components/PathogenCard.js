/**
 * PathogenCard Component
 * Basic pathogen display card
 * Sophomore-level React component showing pathogen details
 */

import React from 'react';
import { Microscope, MapPin, AlertTriangle, Info } from 'lucide-react';

const PathogenCard = ({ pathogen, onClose }) => {
  if (!pathogen) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-gray-500">
        <Microscope className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p>Select a pathogen to view details</p>
      </div>
    );
  }

  // Get display color for gram status
  const getGramColor = (gramStatus) => {
    switch (gramStatus) {
      case 'positive':
        return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'negative':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  // Get display color for severity
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-100 border-green-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  // Get severity icon
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      case 'medium':
        return <Info className="w-4 h-4" />;
      case 'low':
        return <Info className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Microscope className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {pathogen.name}
              </h2>
              <p className="text-sm text-gray-600">
                {pathogen.commonName}
              </p>
            </div>
          </div>
          
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ×
            </button>
          )}
        </div>

        {/* Status Badges */}
        <div className="flex gap-2 mt-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getGramColor(pathogen.gramStatus)}`}>
            {pathogen.gramStatus === 'positive' ? 'Gram Positive' : 'Gram Negative'}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-1 ${getSeverityColor(pathogen.severity)}`}>
            {getSeverityIcon(pathogen.severity)}
            {pathogen.severity} severity
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-medium border text-blue-600 bg-blue-100 border-blue-200">
            {pathogen.shape}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Description */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {pathogen.description}
          </p>
        </div>

        {/* Common Sites */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            Common Infection Sites
          </h3>
          <div className="flex flex-wrap gap-2">
            {pathogen.commonSites.map((site, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {site}
              </span>
            ))}
          </div>
        </div>

        {/* Resistance Information */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            Resistance Pattern
          </h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              {pathogen.resistance}
            </p>
          </div>
        </div>

        {/* Basic Properties */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div>
            <span className="text-xs text-gray-500">Gram Status</span>
            <p className="text-sm font-medium text-gray-900 capitalize">
              {pathogen.gramStatus}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Shape</span>
            <p className="text-sm font-medium text-gray-900 capitalize">
              {pathogen.shape}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Severity</span>
            <p className="text-sm font-medium text-gray-900 capitalize">
              {pathogen.severity}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Pathogen ID</span>
            <p className="text-sm font-medium text-gray-900">
              #{pathogen.id}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t rounded-b-lg">
        <p className="text-xs text-gray-500 text-center">
          Clinical information for educational purposes only
        </p>
      </div>
    </div>
  );
};

export default PathogenCard;