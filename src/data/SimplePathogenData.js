/**
 * Simple Pathogen Data
 * Sophomore-level data structure for 10 common pathogens
 * Easy to understand and modify
 */

const simplePathogens = [
  {
    id: 1,
    name: "Staphylococcus aureus",
    commonName: "Staph aureus",
    gramStatus: "positive",
    shape: "cocci",
    description: "Common cause of skin infections, pneumonia, and bloodstream infections",
    commonSites: ["Skin", "Soft tissue", "Blood", "Lungs"],
    resistance: "MRSA strains are resistant to methicillin",
    severity: "high"
  },
  {
    id: 2,
    name: "Escherichia coli",
    commonName: "E. coli",
    gramStatus: "negative",
    shape: "rod",
    description: "Leading cause of urinary tract infections and gastroenteritis",
    commonSites: ["Urinary tract", "Intestines", "Blood"],
    resistance: "ESBL-producing strains",
    severity: "medium"
  },
  {
    id: 3,
    name: "Streptococcus pneumoniae",
    commonName: "Pneumococcus",
    gramStatus: "positive",
    shape: "cocci",
    description: "Major cause of pneumonia, meningitis, and ear infections",
    commonSites: ["Lungs", "Sinuses", "Brain", "Ears"],
    resistance: "Penicillin-resistant strains exist",
    severity: "high"
  },
  {
    id: 4,
    name: "Pseudomonas aeruginosa",
    commonName: "Pseudomonas",
    gramStatus: "negative",
    shape: "rod",
    description: "Opportunistic pathogen causing infections in immunocompromised patients",
    commonSites: ["Lungs", "Burns", "Wounds", "Urinary tract"],
    resistance: "Multi-drug resistant",
    severity: "high"
  },
  {
    id: 5,
    name: "Streptococcus pyogenes",
    commonName: "Group A Strep",
    gramStatus: "positive",
    shape: "cocci",
    description: "Causes strep throat, cellulitis, and necrotizing fasciitis",
    commonSites: ["Throat", "Skin", "Soft tissue"],
    resistance: "Generally sensitive to penicillin",
    severity: "medium"
  },
  {
    id: 6,
    name: "Klebsiella pneumoniae",
    commonName: "Klebsiella",
    gramStatus: "negative",
    shape: "rod",
    description: "Hospital-acquired pneumonia and urinary tract infections",
    commonSites: ["Lungs", "Urinary tract", "Blood"],
    resistance: "Carbapenem-resistant strains (CRE)",
    severity: "high"
  },
  {
    id: 7,
    name: "Enterococcus faecalis",
    commonName: "Enterococcus",
    gramStatus: "positive",
    shape: "cocci",
    description: "Causes urinary tract and bloodstream infections",
    commonSites: ["Urinary tract", "Blood", "Abdomen"],
    resistance: "VRE (vancomycin-resistant) strains",
    severity: "medium"
  },
  {
    id: 8,
    name: "Haemophilus influenzae",
    commonName: "H. flu",
    gramStatus: "negative",
    shape: "rod",
    description: "Respiratory tract infections, especially in children",
    commonSites: ["Lungs", "Sinuses", "Ears", "Brain"],
    resistance: "Beta-lactamase producing strains",
    severity: "medium"
  },
  {
    id: 9,
    name: "Acinetobacter baumannii",
    commonName: "Acinetobacter",
    gramStatus: "negative",
    shape: "rod",
    description: "Hospital-acquired infections, especially in ICU patients",
    commonSites: ["Lungs", "Blood", "Wounds"],
    resistance: "Multi-drug resistant (MDR)",
    severity: "high"
  },
  {
    id: 10,
    name: "Clostridium difficile",
    commonName: "C. diff",
    gramStatus: "positive",
    shape: "rod",
    description: "Antibiotic-associated colitis and diarrhea",
    commonSites: ["Colon"],
    resistance: "Spore-forming, survives antibiotics",
    severity: "medium"
  }
];

// Helper functions for sophomore developers
export const getPathogenById = (id) => {
  return simplePathogens.find(pathogen => pathogen.id === id);
};

export const getPathogenByName = (name) => {
  return simplePathogens.find(pathogen => 
    pathogen.name.toLowerCase() === name.toLowerCase() ||
    pathogen.commonName.toLowerCase() === name.toLowerCase()
  );
};

export const getPathogensByGramStatus = (gramStatus) => {
  return simplePathogens.filter(pathogen => pathogen.gramStatus === gramStatus);
};

export const getPathogensBySeverity = (severity) => {
  return simplePathogens.filter(pathogen => pathogen.severity === severity);
};

export const searchPathogens = (searchTerm) => {
  if (!searchTerm) return simplePathogens;
  
  const term = searchTerm.toLowerCase();
  return simplePathogens.filter(pathogen =>
    pathogen.name.toLowerCase().includes(term) ||
    pathogen.commonName.toLowerCase().includes(term) ||
    pathogen.description.toLowerCase().includes(term)
  );
};

// Data validation function
export const validatePathogenData = () => {
  const errors = [];
  
  simplePathogens.forEach(pathogen => {
    if (!pathogen.name) errors.push(`Pathogen ${pathogen.id} missing name`);
    if (!pathogen.gramStatus) errors.push(`Pathogen ${pathogen.id} missing gram status`);
    if (!pathogen.description) errors.push(`Pathogen ${pathogen.id} missing description`);
  });
  
  return errors.length === 0 ? null : errors;
};

export default simplePathogens;