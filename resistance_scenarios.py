#!/usr/bin/env python3
"""
Antibiotic Resistance Scenarios Generator
Creates realistic clinical scenarios involving antibiotic resistance patterns
"""

import random
import json
from datetime import datetime
from typing import List, Dict, Any

class ResistanceScenarioGenerator:
    def __init__(self):
        # Current antibiotic resistance trends and patterns
        self.resistance_patterns = {
            "MRSA": {
                "pathogen": "Staphylococcus aureus",
                "mechanism": "Altered penicillin-binding protein (PBP2a)",
                "resistant_to": ["methicillin", "oxacillin", "nafcillin", "cephalexin", "ceftriaxone"],
                "effective_against": ["vancomycin", "linezolid", "daptomycin", "ceftaroline"],
                "prevalence": "25-30% in healthcare settings",
                "risk_factors": ["hospitalization", "nursing home", "recent antibiotic use", "invasive devices"]
            },
            "ESBL": {
                "pathogen": "Escherichia coli, Klebsiella pneumoniae",
                "mechanism": "Extended-spectrum beta-lactamase production",
                "resistant_to": ["ampicillin", "ceftriaxone", "ceftazidime", "aztreonam"],
                "effective_against": ["carbapenems", "colistin", "tigecycline"],
                "prevalence": "15-20% in E. coli UTIs",
                "risk_factors": ["prior antibiotic use", "hospitalization", "urinary catheter", "travel to endemic areas"]
            },
            "CRE": {
                "pathogen": "Carbapenem-resistant Enterobacterales",
                "mechanism": "Carbapenemase production (KPC, NDM, OXA-48)",
                "resistant_to": ["carbapenems", "cephalosporins", "fluoroquinolones"],
                "effective_against": ["colistin", "tigecycline", "ceftazidime-avibactam"],
                "prevalence": "5-10% in ICU settings",
                "risk_factors": ["ICU stay", "mechanical ventilation", "prior carbapenem use", "endemic areas"]
            },
            "VRE": {
                "pathogen": "Enterococcus faecium, Enterococcus faecalis",
                "mechanism": "Altered cell wall precursor (vanA, vanB genes)",
                "resistant_to": ["vancomycin", "teicoplanin"],
                "effective_against": ["linezolid", "daptomycin", "tigecycline"],
                "prevalence": "30-40% in ICU enterococcal infections",
                "risk_factors": ["prolonged hospitalization", "prior vancomycin use", "immunocompromise"]
            },
            "MDR-TB": {
                "pathogen": "Mycobacterium tuberculosis",
                "mechanism": "Multiple mutations in drug targets",
                "resistant_to": ["isoniazid", "rifampin"],
                "effective_against": ["fluoroquinolones", "injectable agents", "newer agents"],
                "prevalence": "3-5% of new TB cases globally",
                "risk_factors": ["prior TB treatment", "HIV infection", "contact with MDR-TB patient"]
            },
            "MDR-Pseudomonas": {
                "pathogen": "Pseudomonas aeruginosa",
                "mechanism": "Multiple resistance mechanisms (efflux, enzymes, porins)",
                "resistant_to": ["ceftazidime", "ciprofloxacin", "piperacillin-tazobactam"],
                "effective_against": ["colistin", "amikacin", "newer beta-lactams"],
                "prevalence": "15-25% in ICU isolates",
                "risk_factors": ["ICU stay", "mechanical ventilation", "prior broad-spectrum antibiotics"]
            },
            "Penicillin-resistant-Pneumococcus": {
                "pathogen": "Streptococcus pneumoniae",
                "mechanism": "Altered penicillin-binding proteins",
                "resistant_to": ["penicillin", "amoxicillin"],
                "effective_against": ["vancomycin", "linezolid", "ceftriaxone (high-dose)"],
                "prevalence": "20-25% of pneumococcal isolates",
                "risk_factors": ["age >65", "daycare exposure", "prior antibiotic use"]
            }
        }
        
        # Clinical scenarios with resistance implications
        self.clinical_scenarios = {
            "healthcare_pneumonia": {
                "setting": "Hospital-acquired pneumonia",
                "patient_profile": "ICU patient on mechanical ventilation",
                "likely_pathogens": ["MRSA", "MDR-Pseudomonas", "ESBL"],
                "empiric_therapy": "Vancomycin + Piperacillin-tazobactam or Meropenem",
                "complications": ["Treatment failure", "Prolonged hospitalization", "Increased mortality"]
            },
            "recurrent_uti": {
                "setting": "Recurrent urinary tract infection",
                "patient_profile": "Elderly woman with multiple UTI episodes",
                "likely_pathogens": ["ESBL", "CRE"],
                "empiric_therapy": "Meropenem pending culture results",
                "complications": ["Pyelonephritis", "Sepsis", "Chronic kidney disease"]
            },
            "post_surgical_infection": {
                "setting": "Post-operative wound infection",
                "patient_profile": "Patient after abdominal surgery",
                "likely_pathogens": ["MRSA", "VRE", "ESBL"],
                "empiric_therapy": "Vancomycin + Meropenem",
                "complications": ["Wound dehiscence", "Abscess formation", "Prolonged healing"]
            },
            "immunocompromised_fever": {
                "setting": "Febrile neutropenia",
                "patient_profile": "Cancer patient on chemotherapy",
                "likely_pathogens": ["ESBL", "CRE", "MDR-Pseudomonas"],
                "empiric_therapy": "Meropenem + Vancomycin",
                "complications": ["Septic shock", "Multi-organ failure", "Death"]
            }
        }
        
        # Resistance testing and interpretation
        self.resistance_testing = {
            "MIC_breakpoints": {
                "vancomycin_staph": {"susceptible": "≤2", "resistant": "≥16"},
                "meropenem_enterobacterales": {"susceptible": "≤1", "resistant": "≥4"},
                "ciprofloxacin_pseudomonas": {"susceptible": "≤1", "resistant": "≥4"}
            },
            "phenotypic_tests": {
                "D-test": "Inducible clindamycin resistance in Staph aureus",
                "ESBL_test": "Double-disk synergy test for ESBL detection",
                "CRE_test": "Carbapenemase production testing"
            }
        }
    
    def generate_mrsa_scenario(self) -> Dict[str, Any]:
        """Generate MRSA resistance scenario"""
        ages = [45, 67, 72, 58, 81]
        genders = ["male", "female"]
        
        age = random.choice(ages)
        gender = random.choice(genders)
        
        scenarios = [
            {
                "setting": "ICU with ventilator-associated pneumonia",
                "history": "prolonged mechanical ventilation and prior antibiotic therapy",
                "gram_stain": "Gram-positive cocci in clusters",
                "initial_therapy": "Ceftriaxone",
                "outcome": "No clinical improvement after 48 hours"
            },
            {
                "setting": "post-surgical wound infection",
                "history": "recent cardiac surgery and hospital stay",
                "gram_stain": "Gram-positive cocci in clusters with purulent discharge",
                "initial_therapy": "Cefazolin",
                "outcome": "Worsening erythema and drainage"
            },
            {
                "setting": "diabetic foot infection",
                "history": "diabetes mellitus and previous hospitalizations",
                "gram_stain": "Gram-positive cocci in clusters",
                "initial_therapy": "Clindamycin",
                "outcome": "Progression to deeper tissue involvement"
            }
        ]
        
        scenario = random.choice(scenarios)
        
        question = f"A {age}-year-old {gender} in the {scenario['setting']} with {scenario['history']} develops infection. {scenario['gram_stain']} are seen on Gram stain. Initial treatment with {scenario['initial_therapy']} results in {scenario['outcome']}. Culture grows Staphylococcus aureus resistant to methicillin. What is the most appropriate next step?"
        
        options = [
            "Start vancomycin and obtain infectious disease consultation",
            "Increase the dose of current antibiotic",
            "Add gentamicin to current regimen",
            "Switch to high-dose penicillin"
        ]
        
        random.shuffle(options)
        correct_index = options.index("Start vancomycin and obtain infectious disease consultation")
        
        return {
            "question": question,
            "options": options,
            "correct": correct_index,
            "explanation": "MRSA (methicillin-resistant Staphylococcus aureus) requires anti-MRSA therapy such as vancomycin, linezolid, or daptomycin. Beta-lactam antibiotics are ineffective due to altered PBP2a protein. Infectious disease consultation is recommended for optimal management.",
            "category": "Antibiotic Resistance Scenarios",
            "difficulty": "advanced",
            "conditionId": "mrsa_resistance",
            "resistance_pattern": "MRSA"
        }
    
    def generate_esbl_scenario(self) -> Dict[str, Any]:
        """Generate ESBL resistance scenario"""
        ages = [72, 65, 58, 76, 69]
        genders = ["male", "female"]
        
        age = random.choice(ages)
        gender = random.choice(genders)
        
        scenarios = [
            {
                "setting": "nursing home resident with recurrent UTI",
                "history": "multiple prior UTI episodes treated with cephalexin and ciprofloxacin",
                "presentation": "fever, dysuria, and altered mental status",
                "initial_therapy": "Ceftriaxone",
                "culture_result": "E. coli resistant to ceftriaxone, ampicillin, and TMP-SMX"
            },
            {
                "setting": "diabetic patient with complicated UTI",
                "history": "recent travel to India and hospitalization there",
                "presentation": "flank pain, fever, and pyuria",
                "initial_therapy": "Ciprofloxacin",
                "culture_result": "Klebsiella pneumoniae resistant to cephalosporins and aztreonam"
            }
        ]
        
        scenario = random.choice(scenarios)
        
        question = f"A {age}-year-old {gender} {scenario['setting']} with {scenario['history']} presents with {scenario['presentation']}. Initial treatment with {scenario['initial_therapy']} fails. Urine culture shows {scenario['culture_result']}. What is the most likely resistance mechanism?"
        
        options = [
            "Extended-spectrum beta-lactamase (ESBL) production",
            "Altered penicillin-binding proteins",
            "Efflux pump overexpression",
            "Aminoglycoside-modifying enzymes"
        ]
        
        random.shuffle(options)
        correct_index = options.index("Extended-spectrum beta-lactamase (ESBL) production")
        
        return {
            "question": question,
            "options": options,
            "correct": correct_index,
            "explanation": "ESBL-producing organisms produce enzymes that hydrolyze extended-spectrum cephalosporins and aztreonam. This resistance pattern is increasingly common in E. coli and Klebsiella, especially in patients with prior antibiotic exposure or travel to endemic areas. Carbapenems are the treatment of choice.",
            "category": "Antibiotic Resistance Scenarios",
            "difficulty": "advanced",
            "conditionId": "esbl_resistance",
            "resistance_pattern": "ESBL"
        }
    
    def generate_cre_scenario(self) -> Dict[str, Any]:
        """Generate CRE resistance scenario"""
        ages = [58, 67, 72, 45, 61]
        genders = ["male", "female"]
        
        age = random.choice(ages)
        gender = random.choice(genders)
        
        question = f"A {age}-year-old {gender} in the ICU with septic shock has been on meropenem for 5 days without improvement. Blood cultures grow Klebsiella pneumoniae resistant to meropenem, ertapenem, and imipenem. The carbapenem MIC is >8 mg/L. What is the most appropriate treatment approach?"
        
        options = [
            "Combination therapy with colistin and tigecycline",
            "High-dose meropenem with prolonged infusion",
            "Switch to vancomycin monotherapy",
            "Add gentamicin to current meropenem"
        ]
        
        random.shuffle(options)
        correct_index = options.index("Combination therapy with colistin and tigecycline")
        
        return {
            "question": question,
            "options": options,
            "correct": correct_index,
            "explanation": "CRE (carbapenem-resistant Enterobacterales) infections require combination therapy due to limited treatment options. Colistin and tigecycline combination is often used, though newer agents like ceftazidime-avibactam may be effective against certain carbapenemases. High mortality rates make aggressive combination therapy necessary.",
            "category": "Antibiotic Resistance Scenarios",
            "difficulty": "advanced",
            "conditionId": "cre_resistance",
            "resistance_pattern": "CRE"
        }
    
    def generate_vre_scenario(self) -> Dict[str, Any]:
        """Generate VRE resistance scenario"""
        ages = [64, 71, 58, 82, 69]
        genders = ["male", "female"]
        
        age = random.choice(ages)
        gender = random.choice(genders)
        
        question = f"A {age}-year-old {gender} with acute leukemia develops bacteremia after prolonged vancomycin therapy. Blood cultures grow Enterococcus faecium resistant to vancomycin (MIC >256 mg/L) and ampicillin. What is the most appropriate treatment?"
        
        options = [
            "Linezolid or daptomycin",
            "High-dose vancomycin with extended infusion",
            "Combination vancomycin and gentamicin",
            "Teicoplanin therapy"
        ]
        
        random.shuffle(options)
        correct_index = options.index("Linezolid or daptomycin")
        
        return {
            "question": question,
            "options": options,
            "correct": correct_index,
            "explanation": "VRE (vancomycin-resistant enterococci) infections require alternative agents. Linezolid and daptomycin are first-line treatments for VRE bacteremia. The vanA gene cluster confers high-level resistance to vancomycin and teicoplanin. Combination therapy with vancomycin is ineffective.",
            "category": "Antibiotic Resistance Scenarios",
            "difficulty": "advanced",
            "conditionId": "vre_resistance",
            "resistance_pattern": "VRE"
        }
    
    def generate_stewardship_scenario(self) -> Dict[str, Any]:
        """Generate antibiotic stewardship scenario"""
        
        scenarios = [
            {
                "setting": "Hospital ward with rising MRSA infections",
                "problem": "30% increase in MRSA infections over 6 months",
                "intervention": "Implement MRSA screening and contact precautions",
                "expected_outcome": "Reduced MRSA transmission"
            },
            {
                "setting": "ICU with high CRE prevalence",
                "problem": "Multiple CRE outbreaks in the ICU",
                "intervention": "Restrict carbapenem use and implement cohorting",
                "expected_outcome": "Decreased CRE incidence"
            }
        ]
        
        scenario = random.choice(scenarios)
        
        question = f"A {scenario['setting']} is experiencing {scenario['problem']}. What is the most effective antibiotic stewardship intervention?"
        
        options = [
            scenario['intervention'],
            "Increase empiric antibiotic coverage",
            "Extend antibiotic duration protocols",
            "Add routine antibiotic prophylaxis"
        ]
        
        random.shuffle(options)
        correct_index = options.index(scenario['intervention'])
        
        return {
            "question": question,
            "options": options,
            "correct": correct_index,
            "explanation": f"Antibiotic stewardship focuses on optimizing antibiotic use to improve outcomes and reduce resistance. {scenario['intervention']} is an evidence-based approach that can help achieve {scenario['expected_outcome']}.",
            "category": "Antibiotic Stewardship",
            "difficulty": "advanced",
            "conditionId": "stewardship_resistance"
        }
    
    def generate_resistance_scenarios(self, num_scenarios: int = 15) -> List[Dict[str, Any]]:
        """Generate resistance scenarios"""
        scenarios = []
        
        scenario_generators = [
            self.generate_mrsa_scenario,
            self.generate_esbl_scenario,
            self.generate_cre_scenario,
            self.generate_vre_scenario,
            self.generate_stewardship_scenario
        ]
        
        for i in range(num_scenarios):
            generator = random.choice(scenario_generators)
            scenario = generator()
            scenarios.append(scenario)
        
        return scenarios
    
    def save_scenarios_to_file(self, scenarios: List[Dict[str, Any]], filename: str = "resistance_scenarios.js"):
        """Save scenarios to JavaScript file"""
        timestamp = datetime.now().isoformat()
        
        js_content = f"""/**
 * Antibiotic Resistance Scenarios
 * Realistic clinical cases involving current antibiotic resistance patterns
 * Each scenario includes detailed explanations and resistance mechanisms
 * 
 * Generated automatically by resistance_scenarios.py
 * Total scenarios: {len(scenarios)}
 * Generated on: {timestamp}
 */

const resistanceScenarios = {json.dumps(scenarios, indent=2)};

export default resistanceScenarios;
"""
        
        with open(filename, 'w') as f:
            f.write(js_content)
        
        print(f"Generated {len(scenarios)} resistance scenarios and saved to {filename}")
        return filename

def main():
    """Main function to generate resistance scenarios"""
    generator = ResistanceScenarioGenerator()
    
    # Generate resistance scenarios
    scenarios = generator.generate_resistance_scenarios(15)
    
    # Save to file
    output_file = generator.save_scenarios_to_file(scenarios)
    
    # Print summary
    print("\n=== Resistance Scenarios Summary ===")
    print(f"Total scenarios generated: {len(scenarios)}")
    
    # Count by resistance pattern
    resistance_patterns = {}
    for scenario in scenarios:
        pattern = scenario.get('resistance_pattern', 'Stewardship')
        resistance_patterns[pattern] = resistance_patterns.get(pattern, 0) + 1
    
    print("\nScenarios by resistance pattern:")
    for pattern, count in resistance_patterns.items():
        print(f"  {pattern}: {count}")
    
    print(f"\nOutput file: {output_file}")
    print("Resistance scenarios ready for integration!")

if __name__ == "__main__":
    main()