/**
 * AntibioticExplorer Component
 * Provides comprehensive antibiotic exploration functionality
 * Allows users to search, filter, and explore antibiotics and their associated conditions
 */

import React, { memo } from 'react';
import { Search, Pill, Target, BookOpen, ArrowRight, TrendingUp, Shield, Users } from 'lucide-react';

const AntibioticExplorer = ({ 
  antibioticData, 
  onSelectCondition 
}) => {
  const {
    antibiotics,
    selectedAntibiotic,
    selectedAntibioticConditions,
    drugClassStats,
    availableDrugClasses,
    antibioticStats,
    filteredStats,
    searchQuery,
    drugClassFilter,
    sortBy,
    searchAntibiotics,
    filterByDrugClass,
    setSortOrder,
    selectAntibiotic,
    clearSelection,
    clearFilters,
    findAlternativeAntibiotics,
    findCombinationTherapies,
    getResistanceInfo,
    isLoading
  } = antibioticData;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading antibiotic data...</div>
      </div>
    );
  }

  const getDrugClassColor = (drugClass) => {
    const colors = {
      'Penicillins': 'text-blue-600 bg-blue-100',
      'Cephalosporins': 'text-green-600 bg-green-100',
      'Glycopeptides': 'text-purple-600 bg-purple-100',
      'Fluoroquinolones': 'text-orange-600 bg-orange-100',
      'Macrolides': 'text-pink-600 bg-pink-100',
      'Aminoglycosides': 'text-indigo-600 bg-indigo-100',
      'Lincosamides': 'text-teal-600 bg-teal-100',
      'Oxazolidinones': 'text-red-600 bg-red-100'
    };
    return colors[drugClass] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Pill className="text-blue-600" size={24} />
          <h1 className="text-2xl font-bold text-gray-900">Antibiotic Explorer</h1>
        </div>
        <p className="text-gray-600">
          Explore antimicrobial agents and discover their clinical applications and treatment contexts.
        </p>
        
        {/* Statistics */}
        {antibioticStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">{antibioticStats.total}</div>
              <div className="text-sm text-gray-600">Total Antibiotics</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">{antibioticStats.drugClassCount}</div>
              <div className="text-sm text-gray-600">Drug Classes</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-xl font-bold text-purple-600">{antibioticStats.avgConditions}</div>
              <div className="text-sm text-gray-600">Avg Conditions</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-xl font-bold text-orange-600">{antibioticStats.maxConditions}</div>
              <div className="text-sm text-gray-600">Max Conditions</div>
            </div>
          </div>
        )}

        {/* Top Antibiotics */}
        {antibioticStats?.topAntibiotics && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Most Frequently Used:</h3>
            <div className="flex flex-wrap gap-2">
              {antibioticStats.topAntibiotics.map((antibiotic, index) => (
                <button
                  key={index}
                  onClick={() => selectAntibiotic(antibiotic)}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${getDrugClassColor(antibiotic.class)} hover:opacity-80`}
                >
                  {antibiotic.name} ({antibiotic.count})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Search and Filter Panel */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Search size={20} className="text-gray-600" />
            <h2 className="text-lg font-semibold">Search & Filter</h2>
          </div>

          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search antibiotics..."
              value={searchQuery}
              onChange={(e) => searchAntibiotics(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Drug Class
              </label>
              <select
                value={drugClassFilter}
                onChange={(e) => filterByDrugClass(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Classes</option>
                {availableDrugClasses.map(drugClass => (
                  <option key={drugClass} value={drugClass}>{drugClass}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Name (A-Z)</option>
                <option value="count">Usage Count</option>
                <option value="conditions">Condition Count</option>
                <option value="class">Drug Class</option>
              </select>
            </div>

            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>

          {/* Drug Class Statistics */}
          {drugClassStats.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Drug Classes</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {drugClassStats.slice(0, 8).map((stat, index) => (
                  <div
                    key={index}
                    onClick={() => filterByDrugClass(stat.drugClass)}
                    className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDrugClassColor(stat.drugClass)}`}>
                      {stat.drugClass}
                    </span>
                    <div className="text-sm text-gray-600">
                      {stat.antibiotics} drugs, {stat.conditions} conditions
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Antibiotic List */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Antibiotics</h2>
            <span className="text-sm text-gray-600">{antibiotics.length} found</span>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {antibiotics.map((antibiotic, index) => (
              <div
                key={index}
                onClick={() => selectAntibiotic(antibiotic)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedAntibiotic?.name === antibiotic.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{antibiotic.name}</div>
                    <div className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getDrugClassColor(antibiotic.class)}`}>
                      {antibiotic.class}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{antibiotic.conditions.length}</div>
                    <div className="text-xs text-gray-500">conditions</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Antibiotic Details */}
      {selectedAntibiotic && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">{selectedAntibiotic.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDrugClassColor(selectedAntibiotic.class)}`}>
                  {selectedAntibiotic.class}
                </span>
                <span className="text-sm text-gray-600">{selectedAntibiotic.count} uses</span>
              </div>
            </div>
            <button
              onClick={clearSelection}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Resistance Information */}
          {(() => {
            const resistanceInfo = getResistanceInfo(selectedAntibiotic);
            return resistanceInfo && (
              <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={16} className="text-yellow-600" />
                  <h4 className="font-medium text-yellow-800">Resistance Considerations</h4>
                </div>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {resistanceInfo.map((info, index) => (
                    <li key={index}>• {info}</li>
                  ))}
                </ul>
              </div>
            );
          })()}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Associated Conditions */}
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <Target size={18} className="text-green-600" />
                Clinical Applications ({selectedAntibioticConditions.length})
              </h3>
              <div className="space-y-2">
                {selectedAntibioticConditions.map((condition, index) => (
                  <div
                    key={index}
                    onClick={() => onSelectCondition(condition)}
                    className="p-3 border rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium text-gray-900">{condition.name}</div>
                        <div className="text-sm text-gray-600">{condition.category}</div>
                      </div>
                      <ArrowRight size={16} className="text-gray-400" />
                    </div>
                    
                    {/* Show relevant therapy contexts */}
                    {condition.relevantTherapies && Object.keys(condition.relevantTherapies).length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-500 mb-1">Therapy contexts:</div>
                        {Object.entries(condition.relevantTherapies).map(([context, therapy], idx) => (
                          <div key={idx} className="text-xs bg-gray-100 rounded px-2 py-1 mb-1">
                            <span className="font-medium">{context}:</span> {therapy.length > 100 ? therapy.substring(0, 100) + '...' : therapy}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative Antibiotics */}
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <Users size={18} className="text-purple-600" />
                Alternative Options
              </h3>
              
              {(() => {
                const alternatives = findAlternativeAntibiotics(selectedAntibiotic);
                return (
                  <div className="space-y-2">
                    {alternatives.slice(0, 6).map((alternative, index) => (
                      <div
                        key={index}
                        onClick={() => selectAntibiotic(alternative)}
                        className="p-3 border rounded-lg cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{alternative.name}</div>
                            <div className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getDrugClassColor(alternative.class)}`}>
                              {alternative.class}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">{alternative.conditions.length}</div>
                            <div className="text-xs text-gray-500">shared</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Combination Therapies */}
          {(() => {
            const combinations = findCombinationTherapies(selectedAntibiotic);
            return combinations.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <TrendingUp size={18} className="text-orange-600" />
                  Combination Therapies
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {combinations.map((combo, index) => (
                    <div key={index} className="p-3 border rounded-lg bg-orange-50">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">{selectedAntibiotic.name}</span>
                        <span className="text-gray-500">+</span>
                        <span className="font-medium text-gray-900">{combo.antibiotic.name}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {combo.contexts.length} context{combo.contexts.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default memo(AntibioticExplorer);