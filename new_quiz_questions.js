/**
 * Additional Quiz Questions Data
 * Generated clinical questions for testing knowledge of infectious diseases and antimicrobial therapy
 * Each question includes options, correct answer index, and detailed explanation
 * 
 * Generated automatically by quiz_generator.py
 * Total questions: 25
 * Generated on: 2025-07-08T14:05:35.669748
 */

const additionalQuizQuestions = [
  {
    "question": "A 45-year-old diabetic patient presents with a 3-day history of cellulitis on the lower extremity. Initial culture shows Staphylococcus aureus resistant to azithromycin. The patient was previously treated with azithromycin for a respiratory infection 2 months ago. What is the most likely resistance mechanism?",
    "options": [
      "Efflux pumps",
      "Ribosomal mutations (23S rRNA methylation)",
      "Target modification",
      "Enzymatic inactivation"
    ],
    "correct": 1,
    "explanation": "Azithromycin resistance in S. aureus commonly occurs through ribosomal mutations, specifically 23S rRNA methylation by methylases (erm genes). This mechanism confers cross-resistance to other macrolides and lincosamides. The patient's previous azithromycin exposure likely selected for resistant strains. For cellulitis treatment, first-line oral therapy includes cephalexin (500mg QID) which targets cell wall synthesis and is effective against MSSA. If MRSA is suspected, clindamycin (300-450mg TID) can be used if D-test negative for inducible resistance. Severe cases may require IV antibiotics like ceftriaxone or vancomycin depending on resistance patterns.",
    "category": "Antibiotic Resistance",
    "difficulty": "advanced",
    "conditionId": "antibiotic_resistance"
  },
  {
    "question": "A 68-year-old patient with hospital-acquired pneumonia has been receiving gentamicin 320mg IV every 8 hours for 5 days. Baseline creatinine was 1.1 mg/dL, and today's creatinine is 2.3 mg/dL with decreased urine output. Gentamicin trough level is 4.8 mcg/mL (target <2 mcg/mL). What should be the next step in management?",
    "options": [
      "Increase monitoring frequency only",
      "Discontinue gentamicin immediately and monitor renal function",
      "Reduce the dose by half and continue",
      "Continue at same dose with daily monitoring"
    ],
    "correct": 1,
    "explanation": "This patient shows clear signs of aminoglycoside-induced nephrotoxicity with doubling of creatinine, elevated trough levels, and decreased urine output. Gentamicin (an aminoglycoside antibiotic) should be discontinued immediately as continued exposure will worsen renal damage through proximal tubular cell toxicity. The nephrotoxicity is typically reversible if caught early. For hospital-acquired pneumonia, alternative antibiotics should be considered based on culture results - options include beta-lactams (piperacillin-tazobactam, ceftazidime, or meropenem) or fluoroquinolones (ciprofloxacin, levofloxacin) depending on pathogen and resistance patterns. Renal function should be monitored closely, and nephrology consultation may be needed if severe.",
    "category": "Side Effects",
    "difficulty": "intermediate",
    "conditionId": "side_effects"
  },
  {
    "question": "A 74-year-old male with COPD and diabetes presents to the ED with a 3-day history of dyspnea, productive cough with purulent sputum, and fever (38.5°C). Chest X-ray shows right lower lobe consolidation. Vital signs: BP 135/85, HR 95, RR 22, O2 sat 88% on room air. He has no recent antibiotic exposure or hospitalization. What is the most appropriate empiric antibiotic therapy?",
    "options": [
      "Clindamycin",
      "Ceftriaxone plus azithromycin",
      "Gentamicin",
      "Ciprofloxacin"
    ],
    "correct": 1,
    "explanation": "This patient has community-acquired pneumonia (CAP) with risk factors (age >65, COPD, diabetes). According to IDSA guidelines, hospitalized CAP patients should receive combination therapy with a beta-lactam (ceftriaxone) plus a macrolide (azithromycin) to cover typical pathogens (S. pneumoniae, H. influenzae) and atypical pathogens. Ceftriaxone provides excellent gram-positive and gram-negative coverage with good lung penetration. Atypical pathogens like Mycoplasma pneumoniae (causes walking pneumonia with gradual onset), Legionella pneumophila (associated with water systems, can cause severe pneumonia), and Chlamydia pneumoniae (causes mild respiratory illness) require macrolide coverage. Azithromycin covers these atypical organisms and also provides some gram-positive coverage.",
    "category": "Clinical Scenarios",
    "difficulty": "intermediate",
    "conditionId": "clinical_pneumonia"
  },
  {
    "question": "A 55-year-old patient with suspected gram-negative sepsis requires an antibiotic that works by binding to the 30S ribosomal subunit. The intensivist wants to understand the mechanism of action for synergistic therapy planning. Which antibiotic works by protein synthesis inhibition at the 30S ribosome?",
    "options": [
      "Penicillin (cell wall synthesis inhibition)",
      "Gentamicin (30S ribosomal binding)",
      "Meropenem (cell wall synthesis inhibition)",
      "Azithromycin (50S ribosomal binding)"
    ],
    "correct": 1,
    "explanation": "Gentamicin is an aminoglycoside that binds irreversibly to the 30S ribosomal subunit, causing misreading of mRNA and inhibiting protein synthesis. This bactericidal mechanism is particularly effective against gram-negative bacteria and shows synergy with beta-lactams (like penicillin/meropenem) because cell wall damage enhances aminoglycoside uptake. The 30S binding site is distinct from the 50S site targeted by macrolides like azithromycin.",
    "category": "Antibiotic Mechanisms",
    "difficulty": "intermediate",
    "conditionId": "antibiotic_mechanism"
  },
  {
    "question": "A 32-year-old patient with severe dental abscess and anaerobic infection requires an antibiotic that targets the 50S ribosomal subunit. The patient is allergic to penicillin. Which antibiotic works by protein synthesis inhibition at the 50S ribosome and has excellent anaerobic coverage?",
    "options": [
      "Gentamicin (30S ribosomal binding)",
      "Vancomycin (cell wall synthesis inhibition)",
      "Meropenem (cell wall synthesis inhibition)",
      "Clindamycin (50S ribosomal binding)"
    ],
    "correct": 3,
    "explanation": "Clindamycin is a lincosamide that binds to the 50S ribosomal subunit, specifically the 23S rRNA, blocking peptide bond formation and inhibiting protein synthesis. It has excellent anaerobic coverage including Bacteroides species and is particularly useful for dental infections, aspiration pneumonia, and skin/soft tissue infections. Unlike gentamicin (30S binding), clindamycin targets the 50S subunit and has good oral bioavailability and tissue penetration.",
    "category": "Antibiotic Mechanisms",
    "difficulty": "intermediate",
    "conditionId": "antibiotic_mechanism"
  },
  {
    "question": "A 34-year-old male with AIDS (CD4 count 85 cells/μL) presents to the ED with fever (39.2°C), severe headache, neck stiffness, and altered mental status. Lumbar puncture shows cloudy CSF with 850 WBC/μL (85% neutrophils), glucose 25 mg/dL, and protein 180 mg/dL. Gram stain is pending. What is the most appropriate empiric antibiotic therapy?",
    "options": [
      "Clindamycin",
      "Ciprofloxacin",
      "Azithromycin",
      "Ceftriaxone plus vancomycin plus ampicillin"
    ],
    "correct": 3,
    "explanation": "This immunocompromised patient has bacterial meningitis (elevated WBC, low glucose, high protein). HIV patients with low CD4 counts are at risk for typical bacterial pathogens (S. pneumoniae, N. meningitidis, H. influenzae) plus Listeria monocytogenes. Listeria monocytogenes is a gram-positive rod that causes meningitis in immunocompromised patients, neonates, and elderly. It has tropism for the CNS and can cause meningoencephalitis with high mortality if untreated. Empiric therapy should include ceftriaxone (covers typical pathogens), vancomycin (covers resistant S. pneumoniae), and ampicillin (covers Listeria as beta-lactams are the drugs of choice for Listeria). Dexamethasone should also be considered to reduce inflammation and neurologic sequelae.",
    "category": "Clinical Scenarios",
    "difficulty": "intermediate",
    "conditionId": "clinical_meningitis"
  },
  {
    "question": "A 55-year-old male with end-stage renal disease on hemodialysis presents with fever (38.9°C), hypotension (BP 85/55), and altered mental status. He has a tunneled hemodialysis catheter. Lactate is elevated at 4.2 mmol/L. Blood cultures are pending. What is the most appropriate empiric antibiotic therapy?",
    "options": [
      "Penicillin (narrow spectrum, inadequate coverage)",
      "Meropenem (broad spectrum, covers catheter-related pathogens)",
      "Clindamycin (limited gram-negative coverage)",
      "Azithromycin (primarily for atypical pathogens)"
    ],
    "correct": 1,
    "explanation": "This patient has septic shock likely secondary to catheter-related bloodstream infection. Dialysis patients with central venous catheters are at high risk for infections with both gram-positive organisms (MRSA, coagulase-negative staphylococci) and gram-negative bacteria. Meropenem provides broad-spectrum coverage and is appropriate for severe sepsis/septic shock. Vancomycin should also be added to cover MRSA. The combination provides comprehensive coverage while awaiting culture results.",
    "category": "Clinical Scenarios",
    "difficulty": "intermediate",
    "conditionId": "clinical_sepsis"
  },
  {
    "question": "A 28-year-old patient with community-acquired pneumonia has a S. aureus isolate that shows erythromycin resistance but appears clindamycin susceptible on disk diffusion. However, the D-test is positive. The patient was started on clindamycin but clinical improvement is poor after 48 hours. What is the most likely resistance mechanism?",
    "options": [
      "Enzymatic inactivation by esterases",
      "Active efflux pumps",
      "Inducible resistance (erm gene with MLSb phenotype)",
      "Target modification of ribosomal binding site"
    ],
    "correct": 2,
    "explanation": "This describes inducible clindamycin resistance due to erm genes encoding methylases that modify the 23S rRNA binding site. The positive D-test indicates inducible MLSb (macrolide-lincosamide-streptogramin B) resistance. Although clindamycin appears susceptible initially, exposure to the drug induces methylase production, leading to treatment failure. Erythromycin (a macrolide) acts as an inducer, and clindamycin (a lincosamide) becomes ineffective due to cross-resistance. This is why the D-test is crucial for detecting inducible resistance in S. aureus isolates that are erythromycin-resistant but clindamycin-susceptible. Alternative therapy should include antibiotics with different mechanisms like trimethoprim-sulfamethoxazole, doxycycline, or vancomycin.",
    "category": "Antibiotic Resistance",
    "difficulty": "advanced",
    "conditionId": "antibiotic_resistance"
  },
  {
    "question": "A 69-year-old female with acute myeloid leukemia on chemotherapy (neutrophil count 200/μL) presents with fever (39.4°C), altered mental status, and hypotension. She has a central venous catheter. Blood cultures are pending. What is the most appropriate empiric antibiotic therapy?",
    "options": [
      "Meropenem plus vancomycin (broad spectrum plus MRSA coverage)",
      "Penicillin (inadequate for neutropenic fever)",
      "Clindamycin (insufficient gram-negative coverage)",
      "Azithromycin (inappropriate for neutropenic fever)"
    ],
    "correct": 0,
    "explanation": "This neutropenic patient has febrile neutropenia with signs of sepsis. Neutropenic patients require immediate broad-spectrum antibiotics covering gram-positive and gram-negative organisms including Pseudomonas. Meropenem provides excellent gram-negative coverage including Pseudomonas, while vancomycin covers MRSA and other gram-positive organisms. This combination is standard for high-risk neutropenic fever. Antifungal coverage may be needed if fever persists despite antibiotics.",
    "category": "Clinical Scenarios",
    "difficulty": "intermediate",
    "conditionId": "clinical_sepsis"
  },
  {
    "question": "A 74-year-old female with diabetes presents with acute onset fever (38.8°C), chills, and altered mental status. Blood cultures are drawn. Gram stain shows gram-positive cocci in pairs and chains. She has no obvious source of infection on examination. What is the most likely pathogen?",
    "options": [
      "Streptococcus pneumoniae",
      "Pseudomonas aeruginosa",
      "Staphylococcus aureus",
      "Escherichia coli"
    ],
    "correct": 0,
    "explanation": "This clinical presentation suggests bacteremia with an occult source. S. pneumoniae is a common cause of bacteremia in elderly patients, especially those with diabetes and other comorbidities. The gram-positive cocci in pairs and chains are characteristic of streptococci. S. pneumoniae can cause invasive disease including bacteremia, pneumonia, and meningitis. The lack of obvious source suggests either occult pneumonia or spontaneous bacteremia, both common with pneumococcus in elderly patients.",
    "category": "Pathogen Identification",
    "difficulty": "beginner",
    "conditionId": "pathogen_identification"
  },
  {
    "question": "A 49-year-old sexually active female presents with 2-day history of suprapubic pain, dysuria, urinary frequency, and urgency. She has no fever or flank pain. Urinalysis shows >100 WBC/hpf, positive leukocyte esterase, and positive nitrites. What is the most appropriate empiric antibiotic therapy?",
    "options": [
      "Ciprofloxacin (broad spectrum, good urinary concentration)",
      "Vancomycin (gram-positive coverage only)",
      "Clindamycin (poor urinary concentration)",
      "Azithromycin (limited gram-negative coverage)"
    ],
    "correct": 0,
    "explanation": "This patient has uncomplicated cystitis based on typical symptoms and positive urinalysis. The most common pathogens are E. coli, Klebsiella, and other gram-negative uropathogens. Ciprofloxacin is a fluoroquinolone with excellent urinary tract penetration and broad gram-negative coverage. However, local resistance patterns should be considered, and alternatives like nitrofurantoin or trimethoprim-sulfamethoxazole may be preferred in areas with high fluoroquinolone resistance.",
    "category": "Clinical Scenarios",
    "difficulty": "intermediate",
    "conditionId": "clinical_uti"
  },
  {
    "question": "A 42-year-old patient with atypical pneumonia was started on azithromycin 500mg daily. After 2 days, the patient develops severe nausea, vomiting, and abdominal cramping that prevents oral intake. The patient has no history of GI disorders and symptoms began shortly after starting the antibiotic. What should be the next step in management?",
    "options": [
      "Continue current therapy with anti-emetics",
      "Increase the dose to improve efficacy",
      "Assess severity and switch to alternative antibiotic (doxycycline or fluoroquinolone)",
      "Add proton pump inhibitor only"
    ],
    "correct": 2,
    "explanation": "Azithromycin commonly causes GI side effects (nausea, vomiting, diarrhea) due to its prokinetic effects on GI motility. When symptoms are severe enough to prevent oral intake, alternative antibiotics should be considered. For atypical pneumonia, doxycycline or a respiratory fluoroquinolone (levofloxacin) would be appropriate alternatives with similar efficacy but better GI tolerability. Continuing azithromycin with severe GI symptoms risks dehydration and treatment failure.",
    "category": "Side Effects",
    "difficulty": "intermediate",
    "conditionId": "side_effects"
  },
  {
    "question": "A 65-year-old patient with complicated UTI was started on ciprofloxacin 500mg BID. On day 3, the patient develops confusion, agitation, hallucinations, and tremors. The patient has no history of seizures or psychiatric illness. Neurological examination is otherwise normal. What should be the next step in management?",
    "options": [
      "Continue current therapy with psychiatric consultation",
      "Increase the dose to improve CNS penetration",
      "Add benzodiazepines for symptom control only",
      "Discontinue ciprofloxacin immediately and switch to alternative antibiotic"
    ],
    "correct": 3,
    "explanation": "Ciprofloxacin (a fluoroquinolone) can cause serious CNS adverse effects including confusion, agitation, hallucinations, and seizures, especially in elderly patients. These effects are due to GABA receptor antagonism in the CNS. The symptoms described are consistent with ciprofloxacin-induced neurotoxicity and require immediate discontinuation. For complicated UTI, alternative antibiotics include ceftriaxone (third-generation cephalosporin with good urinary concentration), piperacillin-tazobactam (broad-spectrum beta-lactam/beta-lactamase inhibitor combination), or other agents based on culture results. CNS effects are typically reversible upon discontinuation.",
    "category": "Side Effects",
    "difficulty": "intermediate",
    "conditionId": "side_effects"
  },
  {
    "question": "A 58-year-old ICU patient with hospital-acquired pneumonia has cultures growing ESBL-producing Klebsiella pneumoniae. The infection is severe and the patient requires broad-spectrum coverage. Which antibiotic works by cell wall synthesis inhibition and is considered the drug of choice for ESBL-producing organisms?",
    "options": [
      "Penicillin (beta-lactam, narrow spectrum)",
      "Ceftriaxone (beta-lactam, but ineffective against ESBL)",
      "Ciprofloxacin (DNA gyrase inhibitor)",
      "Meropenem (carbapenem, broad spectrum)"
    ],
    "correct": 3,
    "explanation": "Meropenem is a carbapenem that inhibits cell wall synthesis by binding to penicillin-binding proteins (PBPs), particularly PBP2. Carbapenems are stable against most beta-lactamases including ESBLs, making them the drugs of choice for ESBL-producing organisms. Unlike penicillin and ceftriaxone, meropenem maintains activity against gram-negative bacteria that produce extended-spectrum beta-lactamases. It provides broad-spectrum coverage including gram-positives, gram-negatives, and anaerobes.",
    "category": "Antibiotic Mechanisms",
    "difficulty": "intermediate",
    "conditionId": "antibiotic_mechanism"
  },
  {
    "question": "A 37-year-old female presents with acute onset fever (38.9°C), chills, productive cough with rust-colored sputum, and pleuritic chest pain. Chest X-ray shows right upper lobe consolidation. Gram stain of sputum shows gram-positive cocci in pairs and chains. What is the most likely pathogen?",
    "options": [
      "Streptococcus pneumoniae",
      "Staphylococcus aureus",
      "Escherichia coli",
      "Pseudomonas aeruginosa"
    ],
    "correct": 0,
    "explanation": "This classic presentation of community-acquired pneumonia with gram-positive cocci in pairs and chains is most consistent with Streptococcus pneumoniae. The rust-colored sputum and acute onset with high fever are characteristic of pneumococcal pneumonia. S. pneumoniae is the most common cause of bacterial pneumonia in adults and typically presents as an alpha-hemolytic, optochin-sensitive, lancet-shaped diplococci. The organism commonly causes respiratory tract infections, bacteremia, and meningitis.",
    "category": "Pathogen Identification",
    "difficulty": "beginner",
    "conditionId": "pathogen_identification"
  },
  {
    "question": "A 45-year-old patient with febrile neutropenia requires empiric antibiotic therapy. The oncology team wants to use an agent that inhibits bacterial cell wall synthesis with the broadest spectrum of activity. Which antibiotic works by cell wall synthesis inhibition and provides the most comprehensive coverage?",
    "options": [
      "Ciprofloxacin (DNA gyrase inhibitor)",
      "Ceftriaxone (beta-lactam, but limited anaerobic coverage)",
      "Meropenem (carbapenem, broad spectrum including anaerobes)",
      "Clindamycin (50S ribosomal inhibitor)"
    ],
    "correct": 2,
    "explanation": "Meropenem is a carbapenem that inhibits cell wall synthesis by binding to penicillin-binding proteins. It offers the broadest spectrum among the options, covering gram-positive cocci, gram-negative rods (including Pseudomonas), and anaerobes. This makes it ideal for febrile neutropenia where broad empiric coverage is essential. Carbapenems are also stable against most beta-lactamases, providing reliable activity against resistant organisms commonly encountered in immunocompromised patients.",
    "category": "Antibiotic Mechanisms",
    "difficulty": "intermediate",
    "conditionId": "antibiotic_mechanism"
  },
  {
    "question": "A 52-year-old sexually active male presents with 3-day history of urinary urgency, frequency, dysuria, and perineal discomfort. He has no fever but reports feeling generally unwell. Urinalysis shows moderate WBCs and bacteria. Digital rectal exam reveals a tender, boggy prostate. What is the most appropriate empiric antibiotic therapy?",
    "options": [
      "Clindamycin (poor prostate penetration)",
      "Ciprofloxacin (excellent prostate penetration)",
      "Vancomycin (gram-positive coverage only)",
      "Azithromycin (limited gram-negative coverage)"
    ],
    "correct": 1,
    "explanation": "This patient has acute bacterial prostatitis based on urinary symptoms and tender prostate on examination. Prostatitis requires antibiotics with good prostate penetration. Ciprofloxacin is a fluoroquinolone with excellent prostate tissue penetration and covers the most common pathogens (E. coli, Klebsiella, Enterobacter). Treatment typically requires 4-6 weeks of therapy. Alternative agents include trimethoprim-sulfamethoxazole or doxycycline, but fluoroquinolones are preferred for acute prostatitis.",
    "category": "Clinical Scenarios",
    "difficulty": "intermediate",
    "conditionId": "clinical_uti"
  },
  {
    "question": "A 72-year-old patient with recurrent UTIs and recent hospitalization develops a complicated UTI. Urine culture grows Enterococcus faecium resistant to vancomycin. The patient has a history of multiple antibiotic courses including vancomycin for previous infections. What is the most likely resistance mechanism?",
    "options": [
      "Efflux pumps",
      "Target modification",
      "Enzymatic inactivation",
      "VRE (vancomycin-resistant enterococci) with vanA/vanB genes"
    ],
    "correct": 3,
    "explanation": "This describes vancomycin-resistant enterococci (VRE), typically involving vanA or vanB gene clusters that encode enzymes producing modified peptidoglycan precursors (D-ala-D-lac instead of D-ala-D-ala), reducing vancomycin binding affinity. VRE emergence is associated with vancomycin selective pressure, especially in hospitalized patients. E. faecium is more commonly vancomycin-resistant than E. faecalis. Treatment options include linezolid, daptomycin, or tigecycline depending on susceptibility patterns.",
    "category": "Antibiotic Resistance",
    "difficulty": "advanced",
    "conditionId": "antibiotic_resistance"
  },
  {
    "question": "A 74-year-old male presents to the ED with a 6-hour history of severe headache, fever (39.4°C), neck stiffness, and photophobia. He appears acutely ill and disoriented. Lumbar puncture shows turbid CSF with 1200 WBC/μL (90% neutrophils), glucose 30 mg/dL, and protein 200 mg/dL. What is the most appropriate empiric antibiotic therapy?",
    "options": [
      "Azithromycin (macrolide, poor CSF penetration)",
      "Clindamycin (lincosamide, poor CSF penetration)",
      "Ciprofloxacin (fluoroquinolone, variable CSF penetration)",
      "Ceftriaxone plus vancomycin (broad-spectrum, excellent CSF penetration)"
    ],
    "correct": 3,
    "explanation": "This patient has bacterial meningitis based on CSF findings (elevated WBC with neutrophil predominance, low glucose, high protein). Elderly patients are at risk for S. pneumoniae, N. meningitidis, and potentially resistant S. pneumoniae. Empiric therapy should include ceftriaxone (covers most gram-positive and gram-negative pathogens) plus vancomycin (covers resistant S. pneumoniae). Both agents have excellent CSF penetration when meninges are inflamed. Dexamethasone should also be considered to reduce inflammation.",
    "category": "Clinical Scenarios",
    "difficulty": "intermediate",
    "conditionId": "clinical_meningitis"
  },
  {
    "question": "A 62-year-old patient with severe MRSA bacteremia requires an antibiotic that binds to D-alanyl-D-alanine precursors in the cell wall. The patient has normal renal function and no history of vancomycin allergy. Which antibiotic works by cell wall synthesis inhibition through this specific mechanism?",
    "options": [
      "Vancomycin (glycopeptide, binds D-ala-D-ala precursors)",
      "Meropenem (carbapenem, binds PBPs)",
      "Ciprofloxacin (fluoroquinolone, DNA gyrase inhibitor)",
      "Clindamycin (lincosamide, 50S ribosomal inhibitor)"
    ],
    "correct": 0,
    "explanation": "Vancomycin is a glycopeptide that inhibits cell wall synthesis by binding to D-alanyl-D-alanine precursors in peptidoglycan, preventing cross-linking and weakening the cell wall. This mechanism differs from beta-lactams (like meropenem) that bind to penicillin-binding proteins (PBPs). The D-ala-D-ala binding prevents the final transpeptidation step in peptidoglycan synthesis, leading to cell wall weakness and bacterial death. Vancomycin is the drug of choice for MRSA infections due to its retained activity against methicillin-resistant staphylococci. It also treats C. difficile colitis when given orally. Therapeutic monitoring of trough levels (15-20 mcg/mL for serious infections) is essential to ensure efficacy and minimize nephrotoxicity.",
    "category": "Antibiotic Mechanisms",
    "difficulty": "intermediate",
    "conditionId": "antibiotic_mechanism"
  },
  {
    "question": "A 55-year-old patient with intra-abdominal sepsis requires broad-spectrum antibiotic therapy. The surgeon wants to use an agent that inhibits cell wall synthesis and has activity against gram-positives, gram-negatives, and anaerobes. Which antibiotic provides the broadest spectrum through cell wall synthesis inhibition?",
    "options": [
      "Penicillin (narrow spectrum, gram-positive coverage)",
      "Ciprofloxacin (DNA gyrase inhibitor, limited anaerobic coverage)",
      "Vancomycin (gram-positive only, no gram-negative coverage)",
      "Meropenem (broad spectrum including anaerobes)"
    ],
    "correct": 3,
    "explanation": "Meropenem is a carbapenem that inhibits cell wall synthesis by binding to penicillin-binding proteins. It provides the broadest spectrum among cell wall synthesis inhibitors, covering gram-positive cocci, gram-negative rods (including Pseudomonas), and anaerobes. This makes it ideal for polymicrobial intra-abdominal infections. Carbapenems are stable against most beta-lactamases including ESBLs, providing reliable broad-spectrum coverage for serious infections.",
    "category": "Antibiotic Mechanisms",
    "difficulty": "intermediate",
    "conditionId": "antibiotic_mechanism"
  },
  {
    "question": "A 76-year-old male with COPD presents with acute onset fever (39.1°C), chills, and productive cough with purulent sputum. Chest X-ray shows left lower lobe consolidation. Gram stain of sputum shows abundant gram-positive cocci in pairs and chains. What is the most likely pathogen?",
    "options": [
      "Escherichia coli (gram-negative rod)",
      "Staphylococcus aureus (cocci in clusters)",
      "Streptococcus pneumoniae (cocci in pairs/chains)",
      "Pseudomonas aeruginosa (gram-negative rod)"
    ],
    "correct": 2,
    "explanation": "This presentation is typical of pneumococcal pneumonia in an elderly patient with COPD. S. pneumoniae appears as gram-positive cocci in pairs and chains (diplococci) and is the most common cause of community-acquired pneumonia in adults. COPD patients are at higher risk for pneumococcal infection due to impaired clearance mechanisms and chronic inflammation. The acute onset with high fever and purulent sputum showing the characteristic gram stain morphology strongly suggests S. pneumoniae. This pathogen is alpha-hemolytic, optochin-sensitive, and bile-soluble, which helps distinguish it from other streptococci.",
    "category": "Pathogen Identification",
    "difficulty": "beginner",
    "conditionId": "pathogen_identification"
  },
  {
    "question": "A 68-year-old patient with prolonged hospitalization develops bloodstream infection. Blood cultures grow Enterococcus faecium resistant to vancomycin. The patient has a history of multiple antibiotic courses and ICU stay. What is the most likely resistance mechanism?",
    "options": [
      "Target modification by D-cycloserine",
      "Enzymatic inactivation by beta-lactamases",
      "VRE (vancomycin-resistant enterococci) with vanA gene cluster",
      "Active efflux pumps"
    ],
    "correct": 2,
    "explanation": "This describes healthcare-associated VRE bloodstream infection. VRE resistance occurs through van gene clusters (vanA, vanB, vanC) that encode enzymes producing modified peptidoglycan precursors ending in D-alanyl-D-lactate instead of D-alanyl-D-alanine, reducing vancomycin binding affinity by 1000-fold. VanA phenotype confers high-level resistance to both vancomycin and teicoplanin. Risk factors include prolonged hospitalization, ICU stay, and broad-spectrum antibiotic exposure. Treatment requires alternative agents like linezolid, daptomycin, or tigecycline.",
    "category": "Antibiotic Resistance",
    "difficulty": "advanced",
    "conditionId": "antibiotic_resistance"
  },
  {
    "question": "A 76-year-old male with a history of influenza 5 days ago presents with acute worsening cough, purulent sputum, and dyspnea. Chest X-ray shows multiple cavitary lesions in both lungs. Gram stain of sputum shows gram-positive cocci in clusters. What is the most likely pathogen?",
    "options": [
      "Streptococcus pneumoniae (cocci in pairs/chains)",
      "Pseudomonas aeruginosa (gram-negative rods)",
      "Escherichia coli (gram-negative rods)",
      "Staphylococcus aureus (cocci in clusters)"
    ],
    "correct": 3,
    "explanation": "This presentation is classic for post-influenza staphylococcal pneumonia. S. aureus characteristically causes necrotizing pneumonia with cavitary lesions, especially following viral respiratory infections. The gram-positive cocci in clusters distinguish it from S. pneumoniae (pairs/chains). S. aureus pneumonia is associated with high mortality and can be caused by both MSSA and MRSA. The organism commonly causes skin, soft tissue, bloodstream, and respiratory tract infections.",
    "category": "Pathogen Identification",
    "difficulty": "beginner",
    "conditionId": "pathogen_identification"
  },
  {
    "question": "A 8-year-old child with bacterial meningitis has been receiving ceftriaxone 100mg/kg/day for 5 days. The patient develops right upper quadrant pain and nausea. Ultrasound shows echogenic material in the gallbladder consistent with biliary sludging. The child is otherwise improving clinically. What should be the next step in management?",
    "options": [
      "Assess severity and consider switching to alternative antibiotic if symptomatic",
      "Continue current therapy and monitor",
      "Increase the dose for better efficacy",
      "Add ursodeoxycholic acid only"
    ],
    "correct": 0,
    "explanation": "Ceftriaxone (a third-generation cephalosporin) can cause biliary sludging and pseudocholelithiasis, especially in children, due to high biliary concentrations and calcium salt precipitation. While often asymptomatic, symptomatic biliary sludging requires assessment of severity. If the patient has significant symptoms, alternative antibiotics like cefotaxime (another third-generation cephalosporin with similar spectrum and CNS penetration) should be considered. The sludging is typically reversible upon discontinuation. For meningitis, maintaining appropriate CNS-penetrating antibiotics is crucial, so switching to cefotaxime would maintain equivalent efficacy while reducing biliary complications since it has different biliary excretion patterns.",
    "category": "Side Effects",
    "difficulty": "intermediate",
    "conditionId": "side_effects"
  }
];

export default additionalQuizQuestions;
