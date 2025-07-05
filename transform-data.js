/**
 * Data Transformation Script
 * Reads RBO_JSON file and transforms it to application format
 * Run with: node transform-data.js
 */

const fs = require('fs');
const path = require('path');

// Transformation functions (simplified for Node.js)
const transformEmpiricTherapy = (empiricAntibioticTherapy) => {
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

const transformDuration = (antibioticDuration) => {
  if (!Array.isArray(antibioticDuration) || antibioticDuration.length === 0) {
    return 'Duration varies based on clinical response';
  }

  // Return the first duration as primary, remove citation markers
  return antibioticDuration[0].replace(/\[cite.*?\]/g, '').trim();
};

const transformNotes = (notes) => {
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

const transformPathogens = (commonPathogens) => {
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

const transformCondition = (rboCondition) => {
  const { keyPoints, clinicalPearls } = transformNotes(rboCondition.notes || []);
  
  return {
    id: rboCondition.id,
    category: rboCondition.category,
    name: rboCondition.name,
    description: (rboCondition.description || '').replace(/\[cite.*?\]/g, '').trim(),
    commonPathogens: transformPathogens(rboCondition.commonPathogens || []),
    empiricTherapy: transformEmpiricTherapy(rboCondition.empiricAntibioticTherapy || []),
    duration: transformDuration(rboCondition.antibioticDuration || []),
    keyPoints: keyPoints,
    clinicalPearls: clinicalPearls
  };
};

// Main transformation function
async function transformRboData() {
  try {
    console.log('Reading RBO_JSON file...');
    
    // Read the RBO_JSON file
    const rboJsonPath = path.join(__dirname, 'RBO_JSON');
    const rboData = JSON.parse(fs.readFileSync(rboJsonPath, 'utf8'));
    
    console.log(`Found ${rboData.length} conditions in RBO_JSON`);
    
    // Transform the data
    console.log('Transforming data...');
    const transformedData = rboData.map(condition => transformCondition(condition));
    
    // Generate statistics
    const categories = [...new Set(transformedData.map(c => c.category))];
    const categoryCount = {};
    categories.forEach(category => {
      categoryCount[category] = transformedData.filter(c => c.category === category).length;
    });
    
    console.log('Transformation complete!');
    console.log('Statistics:');
    console.log(`- Total conditions: ${transformedData.length}`);
    console.log(`- Categories: ${categories.length}`);
    Object.entries(categoryCount).forEach(([category, count]) => {
      console.log(`  - ${category}: ${count}`);
    });
    
    // Generate the new medicalConditions.js file
    const fileContent = `/**
 * Medical Conditions Data
 * Contains information about various infectious diseases and their treatment protocols
 * This data is used throughout the application for displaying condition details
 * 
 * Data source: RBO_JSON (Transformed)
 * Total conditions: ${transformedData.length}
 * Categories: ${categories.join(', ')}
 * Last updated: ${new Date().toISOString()}
 */

const medicalConditions = ${JSON.stringify(transformedData, null, 2)};

export default medicalConditions;`;

    // Write the new file
    const outputPath = path.join(__dirname, 'src', 'data', 'medicalConditions.js');
    fs.writeFileSync(outputPath, fileContent, 'utf8');
    
    console.log(`\nNew medicalConditions.js written to: ${outputPath}`);
    console.log('Transformation complete!');
    
    return transformedData;
    
  } catch (error) {
    console.error('Error during transformation:', error);
    process.exit(1);
  }
}

// Run the transformation
if (require.main === module) {
  transformRboData();
}

module.exports = { transformRboData };