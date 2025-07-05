/**
 * Simple Antibiotic Data
 * Sophomore-level data structure for 15 common antibiotics
 * Easy to understand and modify
 */

const simpleAntibiotics = [
  {
    id: 1,
    name: "Penicillin",
    category: "Beta-lactam",
    class: "Penicillin",
    description: "First antibiotic discovered, effective against gram-positive bacteria",
    mechanism: "Cell wall synthesis inhibition",
    route: "IV/PO",
    commonUses: ["Strep throat", "Pneumococcal infections"],
    resistance: "Beta-lactamase producing bacteria",
    sideEffects: ["Allergic reactions", "GI upset"]
  },
  {
    id: 2,
    name: "Vancomycin",
    category: "Glycopeptide",
    class: "Glycopeptide",
    description: "Reserve antibiotic for MRSA and severe gram-positive infections",
    mechanism: "Cell wall synthesis inhibition",
    route: "IV",
    commonUses: ["MRSA infections", "C. diff colitis"],
    resistance: "VRE (vancomycin-resistant enterococci)",
    sideEffects: ["Kidney toxicity", "Red man syndrome"]
  },
  {
    id: 3,
    name: "Ciprofloxacin",
    category: "Fluoroquinolone",
    class: "Quinolone",
    description: "Broad-spectrum antibiotic effective against gram-negative bacteria",
    mechanism: "DNA synthesis inhibition",
    route: "IV/PO",
    commonUses: ["UTI", "Pseudomonas infections"],
    resistance: "Chromosomal mutations",
    sideEffects: ["Tendon rupture", "CNS effects"]
  },
  {
    id: 4,
    name: "Ceftriaxone",
    category: "Beta-lactam",
    class: "3rd generation cephalosporin",
    description: "Third-generation cephalosporin with broad spectrum activity",
    mechanism: "Cell wall synthesis inhibition",
    route: "IV/IM",
    commonUses: ["Pneumonia", "Meningitis", "Gonorrhea"],
    resistance: "ESBL-producing bacteria",
    sideEffects: ["Diarrhea", "Injection site reactions"]
  },
  {
    id: 5,
    name: "Azithromycin",
    category: "Macrolide",
    class: "Macrolide",
    description: "Macrolide antibiotic with good tissue penetration",
    mechanism: "Protein synthesis inhibition",
    route: "PO/IV",
    commonUses: ["Atypical pneumonia", "Chlamydia"],
    resistance: "Ribosomal mutations",
    sideEffects: ["GI upset", "QT prolongation"]
  },
  {
    id: 6,
    name: "Clindamycin",
    category: "Lincosamide",
    class: "Lincosamide",
    description: "Good anaerobic coverage and skin/soft tissue infections",
    mechanism: "Protein synthesis inhibition",
    route: "IV/PO",
    commonUses: ["Skin infections", "Anaerobic infections"],
    resistance: "Ribosomal methylation",
    sideEffects: ["C. diff colitis", "Diarrhea"]
  },
  {
    id: 7,
    name: "Gentamicin",
    category: "Aminoglycoside",
    class: "Aminoglycoside",
    description: "Aminoglycoside with gram-negative activity",
    mechanism: "Protein synthesis inhibition",
    route: "IV/IM",
    commonUses: ["Gram-negative sepsis", "Endocarditis"],
    resistance: "Enzymatic modification",
    sideEffects: ["Kidney toxicity", "Hearing loss"]
  },
  {
    id: 8,
    name: "Meropenem",
    category: "Beta-lactam",
    class: "Carbapenem",
    description: "Broad-spectrum carbapenem for serious infections",
    mechanism: "Cell wall synthesis inhibition",
    route: "IV",
    commonUses: ["Multi-drug resistant infections", "Severe sepsis"],
    resistance: "Carbapenemases (CRE)",
    sideEffects: ["Seizures", "Diarrhea"]
  },
  {
    id: 9,
    name: "Doxycycline",
    category: "Tetracycline",
    class: "Tetracycline",
    description: "Tetracycline with good oral bioavailability",
    mechanism: "Protein synthesis inhibition",
    route: "PO/IV",
    commonUses: ["Atypical infections", "Tick-borne diseases"],
    resistance: "Efflux pumps",
    sideEffects: ["Photosensitivity", "Tooth discoloration"]
  },
  {
    id: 10,
    name: "Trimethoprim-Sulfamethoxazole",
    category: "Folate inhibitor",
    class: "Sulfonamide combination",
    description: "Combination antibiotic with broad activity",
    mechanism: "Folate synthesis inhibition",
    route: "PO/IV",
    commonUses: ["UTI", "PCP pneumonia", "MRSA skin infections"],
    resistance: "Folate pathway mutations",
    sideEffects: ["Hyperkalemia", "Skin reactions"]
  },
  {
    id: 11,
    name: "Linezolid",
    category: "Oxazolidinone",
    class: "Oxazolidinone",
    description: "MRSA and VRE active antibiotic",
    mechanism: "Protein synthesis inhibition",
    route: "PO/IV",
    commonUses: ["MRSA pneumonia", "VRE infections"],
    resistance: "Ribosomal mutations (rare)",
    sideEffects: ["Thrombocytopenia", "Neuropathy"]
  },
  {
    id: 12,
    name: "Metronidazole",
    category: "Nitroimidazole",
    class: "Nitroimidazole",
    description: "Excellent anaerobic and protozoal coverage",
    mechanism: "DNA damage",
    route: "PO/IV",
    commonUses: ["Anaerobic infections", "C. diff", "Giardia"],
    resistance: "Uncommon",
    sideEffects: ["Metallic taste", "Disulfiram reaction"]
  },
  {
    id: 13,
    name: "Cefazolin",
    category: "Beta-lactam",
    class: "1st generation cephalosporin",
    description: "First-generation cephalosporin for gram-positive infections",
    mechanism: "Cell wall synthesis inhibition",
    route: "IV/IM",
    commonUses: ["Skin infections", "Surgical prophylaxis"],
    resistance: "Beta-lactamases",
    sideEffects: ["Allergic reactions", "Diarrhea"]
  },
  {
    id: 14,
    name: "Piperacillin-Tazobactam",
    category: "Beta-lactam",
    class: "Penicillin + Beta-lactamase inhibitor",
    description: "Broad-spectrum penicillin with beta-lactamase inhibitor",
    mechanism: "Cell wall synthesis inhibition",
    route: "IV",
    commonUses: ["Hospital-acquired pneumonia", "Intra-abdominal infections"],
    resistance: "AmpC beta-lactamases",
    sideEffects: ["Diarrhea", "Electrolyte abnormalities"]
  },
  {
    id: 15,
    name: "Ampicillin",
    category: "Beta-lactam",
    class: "Penicillin",
    description: "Extended-spectrum penicillin",
    mechanism: "Cell wall synthesis inhibition",
    route: "IV/PO",
    commonUses: ["Enterococcal infections", "Listeria meningitis"],
    resistance: "Beta-lactamase producing bacteria",
    sideEffects: ["Rash", "GI upset"]
  }
];

// Helper functions for sophomore developers
export const getAntibioticById = (id) => {
  return simpleAntibiotics.find(antibiotic => antibiotic.id === id);
};

export const getAntibioticByName = (name) => {
  return simpleAntibiotics.find(antibiotic => 
    antibiotic.name.toLowerCase() === name.toLowerCase()
  );
};

export const getAntibioticsByClass = (drugClass) => {
  return simpleAntibiotics.filter(antibiotic => antibiotic.class === drugClass);
};

export const getAntibioticsByCategory = (category) => {
  return simpleAntibiotics.filter(antibiotic => antibiotic.category === category);
};

export const searchAntibiotics = (searchTerm) => {
  if (!searchTerm) return simpleAntibiotics;
  
  const term = searchTerm.toLowerCase();
  return simpleAntibiotics.filter(antibiotic =>
    antibiotic.name.toLowerCase().includes(term) ||
    antibiotic.class.toLowerCase().includes(term) ||
    antibiotic.description.toLowerCase().includes(term)
  );
};

export const getAllDrugClasses = () => {
  const classes = simpleAntibiotics.map(antibiotic => antibiotic.class);
  return [...new Set(classes)].sort();
};

export const getAllCategories = () => {
  const categories = simpleAntibiotics.map(antibiotic => antibiotic.category);
  return [...new Set(categories)].sort();
};

// Data validation function
export const validateAntibioticData = () => {
  const errors = [];
  
  simpleAntibiotics.forEach(antibiotic => {
    if (!antibiotic.name) errors.push(`Antibiotic ${antibiotic.id} missing name`);
    if (!antibiotic.class) errors.push(`Antibiotic ${antibiotic.id} missing class`);
    if (!antibiotic.mechanism) errors.push(`Antibiotic ${antibiotic.id} missing mechanism`);
  });
  
  return errors.length === 0 ? null : errors;
};

export default simpleAntibiotics;