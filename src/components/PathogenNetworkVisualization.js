/**
 * PathogenNetworkVisualization Component
 * Simplified version for Visualizations tab
 * Interactive network visualization showing pathogen relationships
 */

import React, { useState, useRef, useEffect } from 'react';
import { Network, Filter, RotateCcw } from 'lucide-react';

const PathogenNetworkVisualization = ({
  network,
  selectedPathogen,
  onSelectPathogen,
  onShowPathDetails,
  className = ''
}) => {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [connectionFilter, setConnectionFilter] = useState('all');
  const [showLabels, setShowLabels] = useState(true);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.max(600, rect.width),
          height: Math.max(400, 600)
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate mock network data if none provided
  const networkData = network || {
    nodes: [
      { id: 'S. aureus', gramStatus: 'Positive', connections: 5, centralityScore: 0.8 },
      { id: 'E. coli', gramStatus: 'Negative', connections: 6, centralityScore: 0.9 },
      { id: 'S. pneumoniae', gramStatus: 'Positive', connections: 4, centralityScore: 0.7 },
      { id: 'P. aeruginosa', gramStatus: 'Negative', connections: 3, centralityScore: 0.6 },
      { id: 'C. difficile', gramStatus: 'Positive', connections: 2, centralityScore: 0.4 }
    ],
    edges: [
      { source: 'S. aureus', target: 'S. pneumoniae', weight: 0.7, type: 'strong' },
      { source: 'E. coli', target: 'P. aeruginosa', weight: 0.6, type: 'medium' },
      { source: 'S. aureus', target: 'E. coli', weight: 0.3, type: 'weak' }
    ]
  };

  // Position nodes in a circle
  const getNodePosition = (index, total) => {
    const angle = (index / total) * 2 * Math.PI;
    const radius = Math.min(dimensions.width, dimensions.height) * 0.3;
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  // Get node style based on gram status
  const getNodeStyle = (node) => {
    const isSelected = selectedPathogen && selectedPathogen.id === node.id;
    const isHovered = hoveredNode && hoveredNode.id === node.id;
    
    const baseColors = {
      'Positive': '#a855f7', // purple
      'Negative': '#ef4444', // red
      'Unknown': '#10b981'   // green
    };
    
    return {
      fill: baseColors[node.gramStatus] || baseColors.Unknown,
      stroke: isSelected ? '#1f2937' : '#ffffff',
      strokeWidth: isSelected ? 3 : 2,
      opacity: isHovered ? 0.9 : 0.8
    };
  };

  // Get node radius based on connections
  const getNodeRadius = (node) => {
    return Math.max(8, Math.min(20, 8 + (node.connections || 0) * 2));
  };

  // Filter edges based on current filter
  const getFilteredEdges = () => {
    if (connectionFilter === 'all') return networkData.edges;
    return networkData.edges.filter(edge => edge.type === connectionFilter);
  };

  // Handle node click
  const handleNodeClick = (node) => {
    if (onSelectPathogen) {
      onSelectPathogen(node);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${className}`}>
      {/* Header with controls */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Network className="text-blue-600" size={20} />
            <h3 className="text-lg font-semibold">Pathogen Network</h3>
            <span className="text-sm text-gray-500">
              ({networkData.nodes.length} pathogens, {getFilteredEdges().length} connections)
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-600" />
            <select
              value={connectionFilter}
              onChange={(e) => setConnectionFilter(e.target.value)}
              className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Connections</option>
              <option value="strong">Strong Only</option>
              <option value="medium">Medium Only</option>
              <option value="weak">Weak Only</option>
            </select>
          </div>

          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="rounded"
            />
            Show Labels
          </label>
        </div>
      </div>

      {/* Visualization */}
      <div className="p-4">
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="border rounded-lg bg-gray-50"
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Edges */}
          <g className="edges">
            {getFilteredEdges().map((edge, index) => {
              const sourceIndex = networkData.nodes.findIndex(n => n.id === edge.source);
              const targetIndex = networkData.nodes.findIndex(n => n.id === edge.target);
              
              if (sourceIndex === -1 || targetIndex === -1) return null;
              
              const sourcePos = getNodePosition(sourceIndex, networkData.nodes.length);
              const targetPos = getNodePosition(targetIndex, networkData.nodes.length);
              
              const strokeColors = {
                strong: '#059669',
                medium: '#f59e0b', 
                weak: '#6b7280'
              };
              
              return (
                <line
                  key={index}
                  x1={sourcePos.x}
                  y1={sourcePos.y}
                  x2={targetPos.x}
                  y2={targetPos.y}
                  stroke={strokeColors[edge.type] || '#6b7280'}
                  strokeWidth={edge.type === 'strong' ? 3 : edge.type === 'medium' ? 2 : 1}
                  opacity={0.6}
                  className="transition-all duration-200"
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g className="nodes">
            {networkData.nodes.map((node, index) => {
              const pos = getNodePosition(index, networkData.nodes.length);
              const style = getNodeStyle(node);
              const radius = getNodeRadius(node);
              const isSelected = selectedPathogen && selectedPathogen.id === node.id;
              const isHovered = hoveredNode && hoveredNode.id === node.id;
              
              return (
                <g key={node.id}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={radius}
                    fill={style.fill}
                    stroke={style.stroke}
                    strokeWidth={style.strokeWidth}
                    opacity={style.opacity}
                    className={`cursor-pointer transition-all duration-200 hover:scale-110 ${
                      isSelected ? 'animate-pulse' : ''
                    }`}
                    onClick={() => handleNodeClick(node)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                  />
                  
                  {/* Node labels */}
                  {showLabels && (
                    <text
                      x={pos.x}
                      y={pos.y + radius + 12}
                      textAnchor="middle"
                      className="fill-gray-700 text-xs font-medium pointer-events-none"
                      style={{ fontSize: '11px' }}
                    >
                      {node.id}
                    </text>
                  )}

                  {/* Connection count indicator */}
                  {node.connections > 3 && (
                    <circle
                      cx={pos.x + radius - 4}
                      cy={pos.y - radius + 4}
                      r="6"
                      fill="#3b82f6"
                      className="pointer-events-none"
                    />
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Hover tooltip */}
        {hoveredNode && (
          <div className="absolute bg-white border rounded-lg shadow-lg p-3 pointer-events-none z-10"
               style={{
                 left: 20,
                 top: 20
               }}>
            <div className="font-medium text-gray-900">{hoveredNode.id}</div>
            <div className="text-sm text-gray-600">
              Gram {hoveredNode.gramStatus} • {hoveredNode.connections} connections
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Centrality: {((hoveredNode.centralityScore || 0) * 100).toFixed(1)}%
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="p-4 border-t bg-gray-50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Gram Positive</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Gram Negative</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Unknown/Other</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-green-600"></div>
            <span>Strong (>60%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathogenNetworkVisualization;