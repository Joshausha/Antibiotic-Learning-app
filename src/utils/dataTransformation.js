/**
 * Data Transformation Utilities
 * Utilities to convert RBO_JSON data structure to application-compatible format
 */

/**
 * Transform empiric antibiotic therapy array to simplified object format
 * @param {Array} empiricAntibioticTherapy - Array of therapy objects from RBO_JSON
 * @returns {Object} - Simplified therapy object for application use
 */
export const transformEmpirицTherapy = (empiricAntibioticTherapy) => {
  if (!Array.isArray(empiricAntibioticTherapy)) {
    return {};
  }

  const therapyObject = {};
  
  empiricAntibioticTherapy.forEach(item => {
    const condition = item.condition || 'Standard Treatment';
    therapyObject[condition] = item.therapy;
  });

  return therapyObject;
};

/**
 * Transform antibiotic duration array to single duration string
 * @param {Array} antibioticDuration - Array of duration options from RBO_JSON
 * @returns {string} - Primary duration recommendation
 */
export const transformDuration = (antibioticDuration) => {
  if (!Array.isArray(antibioticDuration) || antibioticDuration.length === 0) {
    return 'Duration varies based on clinical response';
  }

  // Return the first duration as primary, combine others as notes
  return antibioticDuration[0];
};

/**
 * Transform notes array into keyPoints and clinicalPearls
 * @param {Array} notes - Notes array from RBO_JSON
 * @returns {Object} - Object with keyPoints and clinicalPearls arrays
 */
export const transformNotes = (notes) => {
  if (!Array.isArray(notes)) {
    return { keyPoints: [], clinicalPearls: [] };
  }

  const keyPoints = [];
  const clinicalPearls = [];

  notes.forEach(note => {
    // Clean up note text (remove citation markers)
    const cleanNote = note.replace(/\[cite.*?\]/g, '').trim();
    
    if (cleanNote.length === 0) return;

    // Categorize notes - clinical pearls tend to be more specific/practical
    if (cleanNote.includes('Consider') || 
        cleanNote.includes('may') || 
        cleanNote.includes('can be') ||
        cleanNote.includes('recommended') ||
        cleanNote.includes('studies')) {
      clinicalPearls.push(cleanNote);
    } else {
      keyPoints.push(cleanNote);
    }
  });

  // If no clear categorization, put first half in keyPoints, rest in pearls
  if (keyPoints.length === 0 && clinicalPearls.length === 0 && notes.length > 0) {
    const midpoint = Math.ceil(notes.length / 2);
    notes.slice(0, midpoint).forEach(note => {
      const cleanNote = note.replace(/\[cite.*?\]/g, '').trim();
      if (cleanNote) keyPoints.push(cleanNote);
    });
    notes.slice(midpoint).forEach(note => {
      const cleanNote = note.replace(/\[cite.*?\]/g, '').trim();
      if (cleanNote) clinicalPearls.push(cleanNote);
    });
  }

  return { keyPoints, clinicalPearls };
};

/**
 * Clean and format pathogen names for consistency
 * @param {Array} commonPathogens - Array of pathogen names from RBO_JSON
 * @returns {Array} - Cleaned pathogen names
 */
export const transformPathogens = (commonPathogens) => {
  if (!Array.isArray(commonPathogens)) {
    return [];
  }

  return commonPathogens.map(pathogen => {
    // Clean up pathogen names (remove citation markers, extra text)
    return pathogen
      .replace(/\[cite.*?\]/g, '')
      .replace(/\(.*?\)/g, match => {
        // Keep useful parenthetical info, remove citations
        if (match.includes('cite')) return '';
        return match;
      })
      .trim();
  }).filter(pathogen => pathogen.length > 0);
};

/**
 * Transform a single RBO_JSON condition to application format
 * @param {Object} rboCondition - Single condition object from RBO_JSON
 * @returns {Object} - Transformed condition for application use
 */
export const transformCondition = (rboCondition) => {
  const { keyPoints, clinicalPearls } = transformNotes(rboCondition.notes || []);
  
  return {
    id: rboCondition.id,
    category: rboCondition.category,
    name: rboCondition.name,
    description: rboCondition.description || '',
    commonPathogens: transformPathogens(rboCondition.commonPathogens || []),
    empiricTherapy: transformEmpirицTherapy(rboCondition.empiricAntibioticTherapy || []),
    duration: transformDuration(rboCondition.antibioticDuration || []),
    keyPoints: keyPoints,
    clinicalPearls: clinicalPearls,
    // Keep original data for reference if needed
    _originalData: {
      antibioticDuration: rboCondition.antibioticDuration,
      keyResources: rboCondition.keyResources
    }
  };
};

/**
 * Transform entire RBO_JSON dataset to application format
 * @param {Array} rboData - Complete RBO_JSON data array
 * @returns {Array} - Array of transformed conditions for application use
 */
export const transformRboDataset = (rboData) => {
  if (!Array.isArray(rboData)) {
    console.error('RBO data must be an array');
    return [];
  }

  return rboData.map(condition => transformCondition(condition));
};

/**
 * Validate transformed condition data
 * @param {Object} condition - Transformed condition object
 * @returns {boolean} - Whether condition has required fields
 */
export const validateCondition = (condition) => {
  const requiredFields = ['id', 'category', 'name', 'commonPathogens', 'empiricTherapy'];
  
  return requiredFields.every(field => {
    const hasField = condition.hasOwnProperty(field);
    if (!hasField) {
      console.warn(`Condition ${condition.id || 'unknown'} missing required field: ${field}`);
    }
    return hasField;
  });
};

/**
 * Get statistics about the transformed dataset
 * @param {Array} transformedData - Array of transformed conditions
 * @returns {Object} - Dataset statistics
 */
export const getDatasetStats = (transformedData) => {
  const categories = [...new Set(transformedData.map(c => c.category))];
  const categoryCount = {};
  
  categories.forEach(category => {
    categoryCount[category] = transformedData.filter(c => c.category === category).length;
  });

  return {
    totalConditions: transformedData.length,
    categories: categories,
    categoryCount: categoryCount,
    validConditions: transformedData.filter(validateCondition).length
  };
};