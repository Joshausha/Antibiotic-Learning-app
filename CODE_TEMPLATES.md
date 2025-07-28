# Code Templates for Junior Developers
## Copy-Paste Ready Templates

**Updated**: 2025-07-28 12:45:00
**Usage**: Copy these templates and modify for your specific needs

---

## 📋 **TABLE OF CONTENTS**
1. [React Component Templates](#react-component-templates)
2. [Test File Templates](#test-file-templates)
3. [Medical Data Templates](#medical-data-templates)
4. [Git Commit Templates](#git-commit-templates)
5. [Pull Request Templates](#pull-request-templates)
6. [Hook Templates](#hook-templates)
7. [Utility Function Templates](#utility-function-templates)

---

## 🧩 **REACT COMPONENT TEMPLATES**

### Basic Component Template
```javascript
// src/components/YourComponent.js
import React from 'react';
import PropTypes from 'prop-types';
import './YourComponent.css'; // Optional: if you need custom styles

/**
 * YourComponent - Brief description of what this component does
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The title to display
 * @param {Function} props.onAction - Callback for user actions
 * @returns {JSX.Element} The rendered component
 */
const YourComponent = ({ title, onAction }) => {
  const handleClick = () => {
    if (onAction) {
      onAction();
    }
  };

  return (
    <div className="your-component">
      <h2>{title}</h2>
      <button onClick={handleClick} aria-label={`Action for ${title}`}>
        Click me
      </button>
    </div>
  );
};

YourComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onAction: PropTypes.func
};

YourComponent.defaultProps = {
  onAction: null
};

export default YourComponent;
```

### Component with State Template
```javascript
// src/components/YourStatefulComponent.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * YourStatefulComponent - Component with local state
 */
const YourStatefulComponent = ({ initialValue, onValueChange }) => {
  const [value, setValue] = useState(initialValue || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Side effects here (API calls, subscriptions, etc.)
    // Remember to clean up if needed
    return () => {
      // Cleanup function
    };
  }, [/* dependencies */]);

  const handleChange = (newValue) => {
    setValue(newValue);
    
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Your async operation here
      // await someApiCall(value);
      
      // Success handling
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="error-message" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="your-stateful-component">
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isLoading}
        aria-label="Your input field"
      />
      
      <button 
        onClick={handleSubmit} 
        disabled={isLoading || !value.trim()}
        aria-label="Submit your input"
      >
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </div>
  );
};

YourStatefulComponent.propTypes = {
  initialValue: PropTypes.string,
  onValueChange: PropTypes.func
};

export default YourStatefulComponent;
```

### Medical Component Template
```javascript
// src/components/MedicalDataComponent.js
import React from 'react';
import PropTypes from 'prop-types';

/**
 * MedicalDataComponent - Template for components displaying medical information
 * 
 * MEDICAL SAFETY NOTES:
 * - All medical data must be validated before display
 * - Sources must be documented
 * - Changes require medical expert review
 */
const MedicalDataComponent = ({ medicalData, onDataUpdate }) => {
  // Validate medical data structure
  if (!medicalData || typeof medicalData !== 'object') {
    return (
      <div className="error-message" role="alert">
        Invalid medical data provided
      </div>
    );
  }

  const {
    name,
    category,
    description,
    warnings = [],
    sources = []
  } = medicalData;

  return (
    <div className="medical-data-component">
      <header>
        <h3>{name}</h3>
        {category && <span className="category-badge">{category}</span>}
      </header>
      
      <main>
        <p className="description">{description}</p>
        
        {warnings.length > 0 && (
          <div className="warnings" role="alert">
            <h4>⚠️ Important Warnings:</h4>
            <ul>
              {warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
      
      <footer>
        {sources.length > 0 && (
          <div className="sources">
            <strong>Medical Sources:</strong>
            <ul>
              {sources.map((source, index) => (
                <li key={index}>{source}</li>
              ))}
            </ul>
          </div>
        )}
      </footer>
    </div>
  );
};

MedicalDataComponent.propTypes = {
  medicalData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    description: PropTypes.string.isRequired,
    warnings: PropTypes.arrayOf(PropTypes.string),
    sources: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onDataUpdate: PropTypes.func
};

export default MedicalDataComponent;
```

---

## 🧪 **TEST FILE TEMPLATES**

### Basic Component Test Template
```javascript
// src/components/__tests__/YourComponent.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import YourComponent from '../YourComponent';

describe('YourComponent', () => {
  // Test data
  const mockProps = {
    title: 'Test Title',
    onAction: jest.fn()
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders component with title', () => {
      render(<YourComponent {...mockProps} />);
      
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('renders with minimal props', () => {
      render(<YourComponent title="Minimal Test" />);
      
      expect(screen.getByText('Minimal Test')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    test('calls onAction when button is clicked', () => {
      render(<YourComponent {...mockProps} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(mockProps.onAction).toHaveBeenCalledTimes(1);
    });

    test('handles missing onAction gracefully', () => {
      render(<YourComponent title="Test" />);
      
      const button = screen.getByRole('button');
      
      // Should not throw error
      expect(() => fireEvent.click(button)).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA labels', () => {
      render(<YourComponent {...mockProps} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Action for Test Title');
    });
  });
});
```

### Medical Data Test Template
```javascript
// src/data/__tests__/medicalData.test.js
import { validateMedicalData, getMedicalInfo } from '../medicalDataUtils';

describe('Medical Data Validation', () => {
  describe('validateMedicalData', () => {
    test('validates correct antibiotic data structure', () => {
      const validAntibiotic = {
        genericName: 'Amoxicillin',
        brandNames: ['Amoxil', 'Trimox'],
        class: 'Penicillin',
        mechanism: 'Cell wall synthesis inhibition',
        spectrum: 'Narrow',
        commonUses: ['UTI', 'Respiratory infections'],
        sideEffects: ['Nausea', 'Diarrhea'],
        interactions: ['Warfarin'],
        sources: ['CDC Guidelines 2023']
      };

      const result = validateMedicalData(validAntibiotic);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('rejects incomplete medical data', () => {
      const invalidAntibiotic = {
        genericName: 'Incomplete Antibiotic'
        // Missing required fields
      };

      const result = validateMedicalData(invalidAntibiotic);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Missing required field: class');
    });

    test('validates pathogen-antibiotic relationships', () => {
      const validMapping = {
        pathogen: 'E. coli',
        condition: 'UTI',
        firstLine: ['Trimethoprim-sulfamethoxazole'],
        secondLine: ['Ciprofloxacin'],
        resistance: ['Ampicillin']
      };

      const result = validateMedicalData(validMapping);
      
      expect(result.isValid).toBe(true);
    });
  });

  describe('Medical Accuracy Requirements', () => {
    test('all antibiotics have authoritative sources', () => {
      const antibiotics = getMedicalInfo('antibiotics');
      
      antibiotics.forEach(antibiotic => {
        expect(antibiotic.sources).toBeDefined();
        expect(antibiotic.sources.length).toBeGreaterThan(0);
        expect(antibiotic.sources[0]).toMatch(/CDC|WHO|UpToDate/);
      });
    });

    test('all pathogen mappings are evidence-based', () => {
      const mappings = getMedicalInfo('pathogen-mappings');
      
      mappings.forEach(mapping => {
        expect(mapping.evidenceLevel).toBeDefined();
        expect(['A', 'B', 'C']).toContain(mapping.evidenceLevel);
      });
    });
  });
});
```

### Hook Test Template
```javascript
// src/hooks/__tests__/useYourHook.test.js
import { renderHook, act } from '@testing-library/react';
import useYourHook from '../useYourHook';

describe('useYourHook', () => {
  describe('Initial State', () => {
    test('initializes with default values', () => {
      const { result } = renderHook(() => useYourHook());
      
      expect(result.current.value).toBe('');
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });

    test('initializes with provided initial value', () => {
      const initialValue = 'test value';
      const { result } = renderHook(() => useYourHook(initialValue));
      
      expect(result.current.value).toBe(initialValue);
    });
  });

  describe('State Updates', () => {
    test('updates value correctly', () => {
      const { result } = renderHook(() => useYourHook());
      
      act(() => {
        result.current.setValue('new value');
      });
      
      expect(result.current.value).toBe('new value');
    });

    test('handles loading states', () => {
      const { result } = renderHook(() => useYourHook());
      
      act(() => {
        result.current.setIsLoading(true);
      });
      
      expect(result.current.isLoading).toBe(true);
    });
  });

  describe('Error Handling', () => {
    test('handles errors gracefully', () => {
      const { result } = renderHook(() => useYourHook());
      
      act(() => {
        result.current.setError('Test error');
      });
      
      expect(result.current.error).toBe('Test error');
    });
  });
});
```

---

## 🏥 **MEDICAL DATA TEMPLATES**

### Antibiotic Data Structure Template
```javascript
// Template for adding new antibiotic data
const newAntibioticTemplate = {
  // REQUIRED FIELDS
  genericName: "Generic Name Here",
  brandNames: ["Brand Name 1", "Brand Name 2"],
  class: "Antibiotic Class (e.g., Penicillin, Cephalosporin)",
  mechanism: "How the antibiotic works",
  spectrum: "Narrow/Broad/Extended",
  
  // CLINICAL INFORMATION
  commonUses: [
    "Condition 1",
    "Condition 2"
  ],
  dosage: {
    adult: "Adult dosing information",
    pediatric: "Pediatric dosing (if applicable)",
    renal: "Renal adjustment notes"
  },
  
  // SAFETY INFORMATION
  sideEffects: [
    "Common side effect 1",
    "Common side effect 2"
  ],
  interactions: [
    "Drug interaction 1",
    "Drug interaction 2"
  ],
  contraindications: [
    "When not to use",
    "Patient populations to avoid"
  ],
  warnings: [
    "Important warning 1",
    "Important warning 2"
  ],
  
  // RESISTANCE AND EFFECTIVENESS
  effectiveness: {
    "Pathogen Name": "effective/intermediate/resistant",
    // Add more pathogens as needed
  },
  resistanceNotes: "Notes about resistance patterns",
  
  // REQUIRED: MEDICAL SOURCES (CRITICAL!)
  sources: [
    "CDC Guidelines 2023",
    "WHO Treatment Guidelines",
    "UpToDate Database"
  ],
  lastUpdated: "YYYY-MM-DD",
  reviewedBy: "Medical Expert Name"
};
```

### Pathogen Data Structure Template
```javascript
// Template for adding new pathogen data
const newPathogenTemplate = {
  // REQUIRED FIELDS
  name: "Scientific Name",
  commonName: "Common name if different",
  type: "bacteria/virus/fungus/parasite",
  
  // CLASSIFICATION
  gramStain: "positive/negative/n/a", // For bacteria only
  morphology: "Shape and arrangement",
  family: "Taxonomic family",
  
  // CLINICAL INFORMATION
  diseases: [
    "Disease 1",
    "Disease 2"
  ],
  bodySystem: "Primary system affected",
  severity: "mild/moderate/severe/life-threatening",
  
  // EPIDEMIOLOGY
  prevalence: "How common",
  riskFactors: [
    "Risk factor 1",
    "Risk factor 2"
  ],
  transmission: "How it spreads",
  
  // TREATMENT INFORMATION
  firstLineAntibiotics: [
    "Preferred antibiotic 1",
    "Preferred antibiotic 2"
  ],
  secondLineAntibiotics: [
    "Alternative antibiotic 1",
    "Alternative antibiotic 2"
  ],
  resistantTo: [
    "Antibiotic it resists"
  ],
  
  // REQUIRED: MEDICAL SOURCES (CRITICAL!)
  sources: [
    "CDC Pathogen Guidelines",
    "Medical textbook reference",
    "Recent research paper"
  ],
  lastUpdated: "YYYY-MM-DD",
  reviewedBy: "Medical Expert Name"
};
```

### Quiz Question Template
```javascript
// Template for medical quiz questions
const newQuizQuestionTemplate = {
  id: "unique-question-id",
  category: "antibiotics/pathogens/conditions/dosing",
  difficulty: "beginner/intermediate/advanced",
  
  question: "Your quiz question here?",
  
  options: [
    "Option A",
    "Option B", 
    "Option C",
    "Option D"
  ],
  
  correctAnswer: 0, // Index of correct option (0-based)
  
  explanation: "Detailed explanation of why this answer is correct and why others are wrong",
  
  // MEDICAL CONTEXT
  medicalContext: {
    pathogens: ["Related pathogen"],
    antibiotics: ["Related antibiotic"], 
    conditions: ["Related condition"]
  },
  
  // LEARNING OBJECTIVES
  learningObjectives: [
    "What student should learn from this question"
  ],
  
  // REQUIRED: SOURCES
  sources: [
    "Medical source for this information"
  ],
  
  // METADATA
  tags: ["tag1", "tag2"],
  lastUpdated: "YYYY-MM-DD",
  reviewedBy: "Medical Expert Name"
};
```

---

## 📝 **GIT COMMIT TEMPLATES**

### Feature Commit Template
```bash
git commit -m "feat: add [specific feature description]

- Detailed change 1
- Detailed change 2
- Medical content involved: Yes/No
- Tests added: Yes/No
- Medical expert review: Yes/No/N/A

Updated: $(date +'%Y-%m-%d %H:%M:%S')"
```

### Bug Fix Commit Template
```bash
git commit -m "fix: resolve [specific issue]

Issue: Brief description of what was broken
Solution: How the issue was fixed
Testing: How the fix was verified
Medical impact: None/Low/High

Files changed:
- src/path/to/file1.js
- src/path/to/file2.js

Updated: $(date +'%Y-%m-%d %H:%M:%S')"
```

### Test Addition Commit Template
```bash
git commit -m "test: add comprehensive tests for [component/feature]

Coverage added:
- Unit tests: X new tests
- Integration tests: X new tests
- Medical accuracy tests: X new tests

Total coverage: X% (previous: X%)
Medical data coverage: 100% maintained

Updated: $(date +'%Y-%m-%d %H:%M:%S')"
```

### Medical Content Commit Template
```bash
git commit -m "feat: add medical data for [antibiotic/pathogen/condition]

Medical content:
- Added: [What was added]
- Sources: [List authoritative sources]
- Expert review: Completed by [Expert name]
- Validation tests: All passing

Data integrity checks:
- Pathogen-antibiotic mappings verified
- Drug interaction data validated
- Dosing information confirmed

Updated: $(date +'%Y-%m-%d %H:%M:%S')"
```

---

## 🔄 **PULL REQUEST TEMPLATES**

### Feature Pull Request Description
```markdown
## Summary
Brief description of the feature and why it was needed.

## Changes Made
- [ ] Added new component: `ComponentName`
- [ ] Updated medical data: [specify what]
- [ ] Added comprehensive tests
- [ ] Updated documentation

## Medical Content Review
- [ ] Medical expert consulted: [Name]
- [ ] Sources validated: [List sources]
- [ ] Accuracy confirmed: Yes/No
- [ ] Drug interactions checked: Yes/No

## Testing
- [ ] All existing tests pass
- [ ] New tests added with X% coverage
- [ ] Medical data tests: 100% coverage maintained
- [ ] Manual testing completed
- [ ] Accessibility tested (if UI changes)

## Performance Impact
- [ ] No performance degradation
- [ ] Bundle size impact: +/- X kB
- [ ] Load time impact: None/Minimal/Measured

## Screenshots/Demo
[Add screenshots or GIFs if UI changes]

## Checklist
- [ ] Code follows project conventions
- [ ] Medical accuracy verified
- [ ] Documentation updated
- [ ] Reviewers assigned
- [ ] Ready for medical expert review (if applicable)
```

### Bug Fix Pull Request Description
```markdown
## Bug Description
Clear description of what was broken and how it affected users.

## Root Cause
Explanation of why the bug occurred.

## Solution
Detailed description of how the bug was fixed.

## Medical Safety Impact
- [ ] No impact on medical accuracy
- [ ] Medical data integrity maintained
- [ ] Patient safety not affected

## Testing
- [ ] Bug reproduction test added
- [ ] Regression test coverage
- [ ] Manual verification completed
- [ ] All existing tests still pass

## Verification Steps
1. Step to reproduce original bug
2. Step to verify fix works
3. Step to confirm no regression

## Files Changed
- `src/path/to/file1.js`: Description of changes
- `src/path/to/file2.js`: Description of changes

## Checklist
- [ ] Bug reproduced and confirmed fixed
- [ ] No side effects identified  
- [ ] Medical expert consulted (if medical content affected)
- [ ] Documentation updated if needed
```

---

## 🎯 **HOOK TEMPLATES**

### Basic Custom Hook Template
```javascript
// src/hooks/useYourHook.js
import { useState, useEffect, useCallback } from 'react';

/**
 * useYourHook - Custom hook description
 * 
 * @param {*} initialValue - Initial value for the hook
 * @returns {Object} Hook return object
 */
const useYourHook = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoized callback to prevent unnecessary re-renders
  const updateValue = useCallback((newValue) => {
    setValue(newValue);
    setError(null); // Clear error when updating
  }, []);

  // Effect for side effects (cleanup if needed)
  useEffect(() => {
    // Side effect logic here
    
    return () => {
      // Cleanup logic here
    };
  }, [value]);

  // Return hook interface
  return {
    value,
    setValue: updateValue,
    isLoading,
    setIsLoading,
    error,
    setError
  };
};

export default useYourHook;
```

### Medical Data Hook Template
```javascript
// src/hooks/useMedicalData.js
import { useState, useEffect, useCallback } from 'react';
import { validateMedicalData } from '../utils/medicalValidation';

/**
 * useMedicalData - Hook for managing medical data with validation
 * 
 * MEDICAL SAFETY NOTES:
 * - All data is validated before state updates
 * - Changes are logged for audit trail
 * - Medical expert approval required for modifications
 */
const useMedicalData = (dataType, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [isValid, setIsValid] = useState(true);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Validate medical data before setting
  const updateData = useCallback((newData) => {
    const validation = validateMedicalData(newData, dataType);
    
    if (validation.isValid) {
      setData(newData);
      setIsValid(true);
      setValidationErrors([]);
      setLastUpdated(new Date().toISOString());
      
      // Log medical data change for audit
      console.log(`Medical data updated: ${dataType}`, {
        timestamp: new Date().toISOString(),
        dataType,
        isValid: true
      });
    } else {
      setIsValid(false);
      setValidationErrors(validation.errors);
      
      // Log validation failure for audit
      console.error(`Medical data validation failed: ${dataType}`, {
        timestamp: new Date().toISOString(),
        dataType,
        errors: validation.errors
      });
    }
  }, [dataType]);

  // Effect to validate initial data
  useEffect(() => {
    if (initialData) {
      updateData(initialData);
    }
  }, [initialData, updateData]);

  return {
    data,
    updateData,
    isValid,
    validationErrors,
    isLoading,
    setIsLoading,
    lastUpdated
  };
};

export default useMedicalData;
```

---

## ⚙️ **UTILITY FUNCTION TEMPLATES**

### Data Validation Utility Template
```javascript
// src/utils/dataValidation.js

/**
 * Validates medical data structure and content
 * 
 * @param {Object} data - Data to validate
 * @param {string} type - Type of data (antibiotic, pathogen, etc.)
 * @returns {Object} Validation result
 */
export const validateMedicalData = (data, type) => {
  const errors = [];
  
  // Common validation for all medical data
  if (!data || typeof data !== 'object') {
    errors.push('Data must be a valid object');
    return { isValid: false, errors };
  }
  
  if (!data.sources || !Array.isArray(data.sources) || data.sources.length === 0) {
    errors.push('Medical sources are required');
  }
  
  if (!data.lastUpdated) {
    errors.push('Last updated date is required');
  }
  
  // Type-specific validation
  switch (type) {
    case 'antibiotic':
      validateAntibioticData(data, errors);
      break;
    case 'pathogen':
      validatePathogenData(data, errors);
      break;
    case 'condition':
      validateConditionData(data, errors);
      break;
    default:
      errors.push(`Unknown data type: ${type}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validates antibiotic-specific data
 */
const validateAntibioticData = (data, errors) => {
  const requiredFields = ['genericName', 'class', 'mechanism', 'spectrum'];
  
  requiredFields.forEach(field => {
    if (!data[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  if (data.spectrum && !['Narrow', 'Broad', 'Extended'].includes(data.spectrum)) {
    errors.push('Spectrum must be Narrow, Broad, or Extended');
  }
};

/**
 * Validates pathogen-specific data
 */
const validatePathogenData = (data, errors) => {
  const requiredFields = ['name', 'type'];
  
  requiredFields.forEach(field => {
    if (!data[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  if (data.type && !['bacteria', 'virus', 'fungus', 'parasite'].includes(data.type)) {
    errors.push('Type must be bacteria, virus, fungus, or parasite');
  }
};

/**
 * Validates medical condition data
 */
const validateConditionData = (data, errors) => {
  const requiredFields = ['name', 'category', 'description'];
  
  requiredFields.forEach(field => {
    if (!data[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });
};
```

### API Call Utility Template
```javascript
// src/utils/apiUtils.js

/**
 * Generic API call utility with error handling
 * 
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise} API response
 */
export const apiCall = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(endpoint, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data };
    
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error);
    return { 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

/**
 * Medical data API call with additional safety checks
 */
export const medicalApiCall = async (endpoint, data, expertApproval = false) => {
  if (!expertApproval) {
    throw new Error('Medical expert approval required for medical data API calls');
  }
  
  // Log medical API call for audit
  console.log('Medical API call initiated', {
    endpoint,
    timestamp: new Date().toISOString(),
    expertApproval
  });
  
  return apiCall(endpoint, {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      medicalDataFlag: true,
      expertApproval,
      timestamp: new Date().toISOString()
    })
  });
};
```

---

## 📋 **USAGE INSTRUCTIONS**

### How to Use These Templates:

1. **Copy the entire template** you need
2. **Replace placeholder text** with your specific content
3. **Modify the structure** as needed for your use case
4. **Add your specific logic** where indicated
5. **Test thoroughly** before committing

### Template Modification Guidelines:

- **Keep medical safety checks** - Don't remove validation or approval steps
- **Maintain accessibility** - Keep ARIA labels and semantic HTML
- **Follow naming conventions** - Use the established patterns
- **Add comprehensive tests** - Every template needs corresponding tests
- **Document your changes** - Update comments to reflect your modifications

### Medical Content Template Usage:

- **Always validate sources** - Ensure all medical sources are authoritative
- **Get expert review** - Never skip medical expert approval
- **Test thoroughly** - Medical data requires 100% test coverage
- **Document changes** - Maintain audit trail for all medical modifications

---

**🎉 Remember: These templates are starting points. Always customize them for your specific needs while maintaining the safety and quality standards of the medical education application.**

**Updated**: 2025-07-28 12:45:00