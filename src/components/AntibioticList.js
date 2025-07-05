/**
 * AntibioticList Component
 * Displays antibiotics for a selected pathogen with effectiveness indicators
 * Sophomore-level React component with simple functionality
 */

import React from 'react';
import { Pill, Target, AlertCircle, CheckCircle, XCircle, MinusCircle } from 'lucide-react';

const AntibioticList = ({ 
  pathogen, 
  antibiotics, 
  onSelectAntibiotic,
  selectedAntibiotic 
}) => {
  if (!pathogen || !antibiotics || antibiotics.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-gray-500">
        <Pill className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p>Select a pathogen to view antibiotics</p>
      </div>
    );
  }

  // Get effectiveness color and icon
  const getEffectivenessDisplay = (effectiveness) => {
    switch (effectiveness) {
      case 'high':
        return {
          color: 'text-green-600 bg-green-100 border-green-200',
          icon: <CheckCircle className="w-4 h-4" />,
          label: 'High Effectiveness'
        };
      case 'medium':
        return {
          color: 'text-yellow-600 bg-yellow-100 border-yellow-200',
          icon: <MinusCircle className="w-4 h-4" />,
          label: 'Medium Effectiveness'
        };
      case 'low':
        return {
          color: 'text-orange-600 bg-orange-100 border-orange-200',
          icon: <AlertCircle className="w-4 h-4" />,
          label: 'Low Effectiveness'
        };
      case 'resistant':
        return {
          color: 'text-red-600 bg-red-100 border-red-200',
          icon: <XCircle className="w-4 h-4" />,
          label: 'Resistant'
        };
      default:
        return {
          color: 'text-gray-600 bg-gray-100 border-gray-200',
          icon: <MinusCircle className="w-4 h-4" />,
          label: 'Unknown'
        };
    }
  };

  // Group antibiotics by effectiveness
  const groupedAntibiotics = antibiotics.reduce((groups, antibiotic) => {
    const effectiveness = antibiotic.effectiveness;
    if (!groups[effectiveness]) {
      groups[effectiveness] = [];
    }
    groups[effectiveness].push(antibiotic);
    return groups;
  }, {});

  // Order groups by effectiveness
  const effectivenessOrder = ['high', 'medium', 'low', 'resistant'];
  const orderedGroups = effectivenessOrder.filter(key => groupedAntibiotics[key]);

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-100 rounded-lg">
            <Pill className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Antibiotics for {pathogen.commonName}
            </h2>
            <p className="text-sm text-gray-600">
              {antibiotics.length} treatment option{antibiotics.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Effectiveness Legend */}
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle className="w-3 h-3" />
            <span>High</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-600">
            <MinusCircle className="w-3 h-3" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1 text-orange-600">
            <AlertCircle className="w-3 h-3" />
            <span>Low</span>
          </div>
          <div className="flex items-center gap-1 text-red-600">
            <XCircle className="w-3 h-3" />
            <span>Resistant</span>
          </div>
        </div>
      </div>

      {/* Antibiotic Groups */}
      <div className="max-h-96 overflow-y-auto">
        {orderedGroups.map((effectiveness) => {
          const display = getEffectivenessDisplay(effectiveness);
          const groupAntibiotics = groupedAntibiotics[effectiveness];

          return (
            <div key={effectiveness} className="border-b last:border-b-0">
              {/* Group Header */}
              <div className="p-3 bg-gray-50 border-b">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${display.color}`}>
                    {display.icon}
                    {display.label}
                  </span>
                  <span className="text-xs text-gray-500">
                    {groupAntibiotics.length} antibiotic{groupAntibiotics.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Antibiotics in Group */}
              <div className="space-y-1 p-2">
                {groupAntibiotics.map((antibiotic, index) => (
                  <div
                    key={`${antibiotic.antibioticId}-${index}`}
                    onClick={() => onSelectAntibiotic && onSelectAntibiotic(antibiotic)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedAntibiotic?.antibioticId === antibiotic.antibioticId
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 text-sm">
                            {antibiotic.name}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${display.color}`}>
                            {display.icon}
                          </span>
                        </div>
                        
                        {antibiotic.notes && (
                          <p className="text-xs text-gray-600 mb-2">
                            {antibiotic.notes}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Effectiveness: {effectiveness}</span>
                          <span>ID: #{antibiotic.antibioticId}</span>
                        </div>
                      </div>

                      {selectedAntibiotic?.antibioticId === antibiotic.antibioticId && (
                        <div className="text-blue-600">
                          <Target className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t rounded-b-lg">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>
            Total: {antibiotics.length} antibiotic{antibiotics.length !== 1 ? 's' : ''}
          </span>
          <span>
            Effective: {antibiotics.filter(ab => ab.effectiveness === 'high' || ab.effectiveness === 'medium').length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AntibioticList;