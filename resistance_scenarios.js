/**
 * Antibiotic Resistance Scenarios
 * Realistic clinical cases involving current antibiotic resistance patterns
 * Each scenario includes detailed explanations and resistance mechanisms
 * 
 * Generated automatically by resistance_scenarios.py
 * Total scenarios: 15
 * Generated on: 2025-07-08T14:07:57.009622
 */

const resistanceScenarios = [
  {
    "question": "A 67-year-old male in the ICU with septic shock has been on meropenem for 5 days without improvement. Blood cultures grow Klebsiella pneumoniae resistant to meropenem, ertapenem, and imipenem. The carbapenem MIC is >8 mg/L. What is the most appropriate treatment approach?",
    "options": [
      "Combination therapy with colistin and tigecycline",
      "Add gentamicin to current meropenem",
      "High-dose meropenem with prolonged infusion",
      "Switch to vancomycin monotherapy"
    ],
    "correct": 0,
    "explanation": "CRE (carbapenem-resistant Enterobacterales) infections require combination therapy due to limited treatment options. Klebsiella pneumoniae carbapenemase (KPC) production renders carbapenems ineffective by hydrolyzing the beta-lactam ring. This organism typically exhibits multidrug resistance including fluoroquinolones and aminoglycosides. Colistin (polymyxin E) disrupts bacterial cell membranes and tigecycline (glycylcycline) inhibits protein synthesis at the 30S ribosome. Combination therapy is necessary due to high mortality rates (>50%) and limited monotherapy options. Newer agents like ceftazidime-avibactam may be effective against certain carbapenemases.",
    "category": "Antibiotic Resistance Scenarios",
    "difficulty": "advanced",
    "conditionId": "cre_resistance",
    "resistance_pattern": "CRE"
  },
  {
    "question": "A 82-year-old male with acute leukemia develops bacteremia after prolonged vancomycin therapy. Blood cultures grow Enterococcus faecium resistant to vancomycin (MIC >256 mg/L) and ampicillin. What is the most appropriate treatment?",
    "options": [
      "High-dose vancomycin with extended infusion",
      "Combination vancomycin and gentamicin",
      "Linezolid or daptomycin",
      "Teicoplanin therapy"
    ],
    "correct": 2,
    "explanation": "VRE (vancomycin-resistant enterococci) infections require alternative agents. Enterococcus faecium with vanA gene cluster produces enzymes that synthesize D-alanyl-D-lactate instead of D-alanyl-D-alanine precursors, reducing vancomycin binding affinity by 1000-fold. This confers high-level resistance to both vancomycin and teicoplanin. Linezolid (oxazolidinone) inhibits protein synthesis by binding to the 23S rRNA of the 50S ribosome, while daptomycin (cyclic lipopeptide) disrupts cell membrane potential. Both are first-line treatments for VRE bacteremia. Prolonged vancomycin exposure in immunocompromised patients is a major risk factor for VRE emergence.",
    "category": "Antibiotic Resistance Scenarios",
    "difficulty": "advanced",
    "conditionId": "vre_resistance",
    "resistance_pattern": "VRE"
  },
  {
    "question": "A 76-year-old female diabetic patient with complicated UTI with recent travel to India and hospitalization there presents with flank pain, fever, and pyuria. Initial treatment with Ciprofloxacin fails. Urine culture shows Klebsiella pneumoniae resistant to cephalosporins and aztreonam. What is the most likely resistance mechanism?",
    "options": [
      "Extended-spectrum beta-lactamase (ESBL) production",
      "Altered penicillin-binding proteins",
      "Efflux pump overexpression",
      "Aminoglycoside-modifying enzymes"
    ],
    "correct": 0,
    "explanation": "ESBL-producing organisms produce enzymes that hydrolyze extended-spectrum cephalosporins and aztreonam. Klebsiella pneumoniae commonly produces CTX-M, SHV, or TEM-type ESBLs that confer resistance to third-generation cephalosporins, aztreonam, and often fluoroquinolones. This resistance pattern is highly endemic in South Asia, with hospitalization and antibiotic exposure being major risk factors. The 'ESBL phenotype' includes resistance to cephalosporins but susceptibility to carbapenems and cephamycins. Carbapenems (meropenem, ertapenem) are the treatment of choice for ESBL-producing Enterobacterales, though carbapenem-sparing alternatives like piperacillin-tazobactam may be considered for less severe infections.",
    "category": "Antibiotic Resistance Scenarios",
    "difficulty": "advanced",
    "conditionId": "esbl_resistance",
    "resistance_pattern": "ESBL"
  },
  {
    "question": "A 58-year-old female in the ICU with ventilator-associated pneumonia with prolonged mechanical ventilation and prior antibiotic therapy develops infection. Gram-positive cocci in clusters are seen on Gram stain. Initial treatment with Ceftriaxone results in No clinical improvement after 48 hours. Culture grows Staphylococcus aureus resistant to methicillin. What is the most appropriate next step?",
    "options": [
      "Increase the dose of current antibiotic",
      "Switch to high-dose penicillin",
      "Add gentamicin to current regimen",
      "Start vancomycin and obtain infectious disease consultation"
    ],
    "correct": 3,
    "explanation": "MRSA (methicillin-resistant Staphylococcus aureus) requires anti-MRSA therapy such as vancomycin, linezolid, or daptomycin. Beta-lactam antibiotics are ineffective due to altered PBP2a protein. Infectious disease consultation is recommended for optimal management.",
    "category": "Antibiotic Resistance Scenarios",
    "difficulty": "advanced",
    "conditionId": "mrsa_resistance",
    "resistance_pattern": "MRSA"
  },
  {
    "question": "A Hospital ward with rising MRSA infections is experiencing 30% increase in MRSA infections over 6 months. What is the most effective antibiotic stewardship intervention?",
    "options": [
      "Implement MRSA screening and contact precautions",
      "Extend antibiotic duration protocols",
      "Increase empiric antibiotic coverage",
      "Add routine antibiotic prophylaxis"
    ],
    "correct": 0,
    "explanation": "Antibiotic stewardship focuses on optimizing antibiotic use to improve outcomes and reduce resistance. Implement MRSA screening and contact precautions is an evidence-based approach that can help achieve Reduced MRSA transmission.",
    "category": "Antibiotic Stewardship",
    "difficulty": "advanced",
    "conditionId": "stewardship_resistance"
  },
  {
    "question": "A 45-year-old male in the ICU with septic shock has been on meropenem for 5 days without improvement. Blood cultures grow Klebsiella pneumoniae resistant to meropenem, ertapenem, and imipenem. The carbapenem MIC is >8 mg/L. What is the most appropriate treatment approach?",
    "options": [
      "Add gentamicin to current meropenem",
      "High-dose meropenem with prolonged infusion",
      "Combination therapy with colistin and tigecycline",
      "Switch to vancomycin monotherapy"
    ],
    "correct": 2,
    "explanation": "CRE (carbapenem-resistant Enterobacterales) infections require combination therapy due to limited treatment options. Colistin and tigecycline combination is often used, though newer agents like ceftazidime-avibactam may be effective against certain carbapenemases. High mortality rates make aggressive combination therapy necessary.",
    "category": "Antibiotic Resistance Scenarios",
    "difficulty": "advanced",
    "conditionId": "cre_resistance",
    "resistance_pattern": "CRE"
  },
  {
    "question": "A ICU with high CRE prevalence is experiencing Multiple CRE outbreaks in the ICU. What is the most effective antibiotic stewardship intervention?",
    "options": [
      "Add routine antibiotic prophylaxis",
      "Restrict carbapenem use and implement cohorting",
      "Increase empiric antibiotic coverage",
      "Extend antibiotic duration protocols"
    ],
    "correct": 1,
    "explanation": "Antibiotic stewardship focuses on optimizing antibiotic use to improve outcomes and reduce resistance. Restrict carbapenem use and implement cohorting is an evidence-based approach that can help achieve Decreased CRE incidence.",
    "category": "Antibiotic Stewardship",
    "difficulty": "advanced",
    "conditionId": "stewardship_resistance"
  },
  {
    "question": "A 67-year-old male in the ICU with septic shock has been on meropenem for 5 days without improvement. Blood cultures grow Klebsiella pneumoniae resistant to meropenem, ertapenem, and imipenem. The carbapenem MIC is >8 mg/L. What is the most appropriate treatment approach?",
    "options": [
      "Switch to vancomycin monotherapy",
      "Combination therapy with colistin and tigecycline",
      "Add gentamicin to current meropenem",
      "High-dose meropenem with prolonged infusion"
    ],
    "correct": 1,
    "explanation": "CRE (carbapenem-resistant Enterobacterales) infections require combination therapy due to limited treatment options. Colistin and tigecycline combination is often used, though newer agents like ceftazidime-avibactam may be effective against certain carbapenemases. High mortality rates make aggressive combination therapy necessary.",
    "category": "Antibiotic Resistance Scenarios",
    "difficulty": "advanced",
    "conditionId": "cre_resistance",
    "resistance_pattern": "CRE"
  },
  {
    "question": "A 69-year-old female with acute leukemia develops bacteremia after prolonged vancomycin therapy. Blood cultures grow Enterococcus faecium resistant to vancomycin (MIC >256 mg/L) and ampicillin. What is the most appropriate treatment?",
    "options": [
      "Linezolid or daptomycin",
      "Teicoplanin therapy",
      "Combination vancomycin and gentamicin",
      "High-dose vancomycin with extended infusion"
    ],
    "correct": 0,
    "explanation": "VRE (vancomycin-resistant enterococci) infections require alternative agents. Linezolid and daptomycin are first-line treatments for VRE bacteremia. The vanA gene cluster confers high-level resistance to vancomycin and teicoplanin. Combination therapy with vancomycin is ineffective.",
    "category": "Antibiotic Resistance Scenarios",
    "difficulty": "advanced",
    "conditionId": "vre_resistance",
    "resistance_pattern": "VRE"
  },
  {
    "question": "A 45-year-old female in the ICU with ventilator-associated pneumonia with prolonged mechanical ventilation and prior antibiotic therapy develops infection. Gram-positive cocci in clusters are seen on Gram stain. Initial treatment with Ceftriaxone results in No clinical improvement after 48 hours. Culture grows Staphylococcus aureus resistant to methicillin. What is the most appropriate next step?",
    "options": [
      "Increase the dose of current antibiotic",
      "Start vancomycin and obtain infectious disease consultation",
      "Switch to high-dose penicillin",
      "Add gentamicin to current regimen"
    ],
    "correct": 1,
    "explanation": "MRSA (methicillin-resistant Staphylococcus aureus) requires anti-MRSA therapy such as vancomycin, linezolid, or daptomycin. Beta-lactam antibiotics are ineffective due to altered PBP2a protein. Infectious disease consultation is recommended for optimal management.",
    "category": "Antibiotic Resistance Scenarios",
    "difficulty": "advanced",
    "conditionId": "mrsa_resistance",
    "resistance_pattern": "MRSA"
  },
  {
    "question": "A 76-year-old male diabetic patient with complicated UTI with recent travel to India and hospitalization there presents with flank pain, fever, and pyuria. Initial treatment with Ciprofloxacin fails. Urine culture shows Klebsiella pneumoniae resistant to cephalosporins and aztreonam. What is the most likely resistance mechanism?",
    "options": [
      "Altered penicillin-binding proteins",
      "Aminoglycoside-modifying enzymes",
      "Efflux pump overexpression",
      "Extended-spectrum beta-lactamase (ESBL) production"
    ],
    "correct": 3,
    "explanation": "ESBL-producing organisms produce enzymes that hydrolyze extended-spectrum cephalosporins and aztreonam. This resistance pattern is increasingly common in E. coli and Klebsiella, especially in patients with prior antibiotic exposure or travel to endemic areas. Carbapenems are the treatment of choice.",
    "category": "Antibiotic Resistance Scenarios",
    "difficulty": "advanced",
    "conditionId": "esbl_resistance",
    "resistance_pattern": "ESBL"
  },
  {
    "question": "A Hospital ward with rising MRSA infections is experiencing 30% increase in MRSA infections over 6 months. What is the most effective antibiotic stewardship intervention?",
    "options": [
      "Extend antibiotic duration protocols",
      "Implement MRSA screening and contact precautions",
      "Increase empiric antibiotic coverage",
      "Add routine antibiotic prophylaxis"
    ],
    "correct": 1,
    "explanation": "Antibiotic stewardship focuses on optimizing antibiotic use to improve outcomes and reduce resistance. Implement MRSA screening and contact precautions is an evidence-based approach that can help achieve Reduced MRSA transmission.",
    "category": "Antibiotic Stewardship",
    "difficulty": "advanced",
    "conditionId": "stewardship_resistance"
  },
  {
    "question": "A 45-year-old female in the ICU with septic shock has been on meropenem for 5 days without improvement. Blood cultures grow Klebsiella pneumoniae resistant to meropenem, ertapenem, and imipenem. The carbapenem MIC is >8 mg/L. What is the most appropriate treatment approach?",
    "options": [
      "Add gentamicin to current meropenem",
      "Combination therapy with colistin and tigecycline",
      "Switch to vancomycin monotherapy",
      "High-dose meropenem with prolonged infusion"
    ],
    "correct": 1,
    "explanation": "CRE (carbapenem-resistant Enterobacterales) infections require combination therapy due to limited treatment options. Colistin and tigecycline combination is often used, though newer agents like ceftazidime-avibactam may be effective against certain carbapenemases. High mortality rates make aggressive combination therapy necessary.",
    "category": "Antibiotic Resistance Scenarios",
    "difficulty": "advanced",
    "conditionId": "cre_resistance",
    "resistance_pattern": "CRE"
  },
  {
    "question": "A 72-year-old female in the diabetic foot infection with diabetes mellitus and previous hospitalizations develops infection. Gram-positive cocci in clusters are seen on Gram stain. Initial treatment with Clindamycin results in Progression to deeper tissue involvement. Culture grows Staphylococcus aureus resistant to methicillin. What is the most appropriate next step?",
    "options": [
      "Increase the dose of current antibiotic",
      "Switch to high-dose penicillin",
      "Add gentamicin to current regimen",
      "Start vancomycin and obtain infectious disease consultation"
    ],
    "correct": 3,
    "explanation": "MRSA (methicillin-resistant Staphylococcus aureus) requires anti-MRSA therapy such as vancomycin, linezolid, or daptomycin. Beta-lactam antibiotics are ineffective due to altered PBP2a protein. Infectious disease consultation is recommended for optimal management.",
    "category": "Antibiotic Resistance Scenarios",
    "difficulty": "advanced",
    "conditionId": "mrsa_resistance",
    "resistance_pattern": "MRSA"
  },
  {
    "question": "A 72-year-old male in the ICU with septic shock has been on meropenem for 5 days without improvement. Blood cultures grow Klebsiella pneumoniae resistant to meropenem, ertapenem, and imipenem. The carbapenem MIC is >8 mg/L. What is the most appropriate treatment approach?",
    "options": [
      "Add gentamicin to current meropenem",
      "High-dose meropenem with prolonged infusion",
      "Combination therapy with colistin and tigecycline",
      "Switch to vancomycin monotherapy"
    ],
    "correct": 2,
    "explanation": "CRE (carbapenem-resistant Enterobacterales) infections require combination therapy due to limited treatment options. Colistin and tigecycline combination is often used, though newer agents like ceftazidime-avibactam may be effective against certain carbapenemases. High mortality rates make aggressive combination therapy necessary.",
    "category": "Antibiotic Resistance Scenarios",
    "difficulty": "advanced",
    "conditionId": "cre_resistance",
    "resistance_pattern": "CRE"
  }
];

export default resistanceScenarios;
