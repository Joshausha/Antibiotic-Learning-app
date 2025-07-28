# Junior Developer Workflow Guide
## Antibiotic Learning App - Complete Hand-Holding Guide

**Last Updated**: 2025-07-28 12:15:00
**Target Audience**: Junior developers requiring extensive guidance
**Prerequisites**: Basic React knowledge, Git fundamentals

---

## 🚨 **PART A: SAFETY FIRST - READ THIS COMPLETELY BEFORE ANY WORK**

### **Why This Project Is Different**
This is a **medical education application** used by healthcare professionals and students. Incorrect information could impact real medical decisions. Therefore:

- ✅ **Medical accuracy is CRITICAL**
- ✅ **All medical content requires expert validation**
- ✅ **Testing is MANDATORY, not optional**
- ✅ **When in doubt, ASK FOR HELP immediately**

### **🛑 NEVER DO THESE THINGS:**
- [ ] ❌ Never modify medical data without senior developer approval
- [ ] ❌ Never commit code that breaks existing tests
- [ ] ❌ Never push directly to `master` branch
- [ ] ❌ Never skip the medical accuracy review process
- [ ] ❌ Never assume medical information is correct without verification
- [ ] ❌ Never work on medical content alone - always have a reviewer

### **⚠️ STOP AND ASK FOR HELP IF:**
- You see any medical terminology you don't understand
- Tests are failing and you don't know why
- You're about to modify antibiotic-pathogen relationships
- You encounter accessibility errors
- Git commands aren't working as expected
- You're unsure about any medical content changes

---

## 📋 **PART B: DAILY STARTUP WORKFLOW**

### **Every Day Before You Start Coding:**

#### **Step 1: Environment Check**
```bash
# Navigate to project directory
cd "/Users/joshpankin/My Drive/1. Projects/Antibiotic Learning app"

# Check Git status
git status
```
**✅ Success looks like:** "On branch [branch-name]" with clean working directory
**❌ If you see errors:** Stop and ask for help

#### **Step 2: Update Your Local Repository**
```bash
# Switch to develop branch
git checkout develop

# Pull latest changes
git pull origin develop
```
**✅ Success looks like:** "Already up to date" or list of updated files
**❌ If you see conflicts:** Stop and ask for help

#### **Step 3: Install Dependencies**
```bash
# Ensure all packages are up to date
npm install
```
**✅ Success looks like:** No error messages, packages installed
**❌ If you see errors:** Stop and ask for help

#### **Step 4: Run Tests to Verify Everything Works**
```bash
# Run the test suite
npm test -- --watchAll=false
```
**✅ Success looks like:** All tests pass (green checkmarks)
**❌ If tests fail:** Stop and ask for help

#### **Step 5: Start Development Server**
```bash
# Start the application
npm start
```
**✅ Success looks like:** Browser opens to http://localhost:3000 with app running
**❌ If errors occur:** Stop and ask for help

---

## 🔄 **PART C: OODA METHODOLOGY FOR DEVELOPMENT**

### **What is OODA and Why We Use It**
OODA (Observe, Orient, Decide, Act) is a decision-making framework that helps ensure we make good choices, especially important for medical applications.

### **For Every Task You're Assigned:**

#### **🔍 OBSERVE (Understand the Request)**
Before writing any code:
- [ ] Read the task description completely
- [ ] Identify if it involves medical content (antibiotics, pathogens, medical conditions)
- [ ] List what files you might need to change
- [ ] Note any medical terms you don't understand

**Template Questions to Ask Yourself:**
- What exactly am I being asked to build/fix?
- Does this change medical information?
- What parts of the app will this affect?
- What could go wrong if I make a mistake?

#### **🧭 ORIENT (Analyze the Context)**
- [ ] Look at existing similar code in the project
- [ ] Understand the medical context (if applicable)
- [ ] Check current test coverage for related code
- [ ] Identify potential impacts on other features

**Template Actions:**
```bash
# Find similar code patterns
grep -r "similar-function-name" src/

# Look at existing tests
find src/ -name "*.test.js" -path "*similar-component*"
```

#### **⚖️ DECIDE (Choose Your Approach)**
- [ ] Sketch out your planned changes
- [ ] Identify what tests you'll need to write/update
- [ ] Plan your Git branch naming
- [ ] Decide if you need medical expert consultation

**Template Decision Framework:**
- Is this the simplest approach that works?
- Does this maintain medical accuracy?
- Will this be easy for others to understand?
- Have I planned adequate testing?

#### **⚡ ACT (Implement Safely)**
- [ ] Create feature branch following naming convention
- [ ] Make small, incremental changes
- [ ] Test after each significant change
- [ ] Document any medical content sources

---

## 🛠️ **PART D: STEP-BY-STEP FEATURE DEVELOPMENT**

### **Starting a New Feature**

#### **Step 1: Create Feature Branch**
```bash
# From develop branch, create new feature branch
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

**Naming Convention Examples:**
- `feature/add-new-antibiotic-amoxicillin`
- `feature/fix-quiz-validation-error`
- `feature/improve-pathogen-search`

**✅ Success looks like:** "Switched to a new branch 'feature/your-feature-name'"

#### **Step 2: Make Your First Small Change**
Start with the smallest possible change that moves toward your goal.

**Example: Adding a new component**
```javascript
// Create new file: src/components/YourComponent.js
import React from 'react';

const YourComponent = () => {
  return (
    <div>
      <h2>Your Component</h2>
      <p>Basic functionality here</p>
    </div>
  );
};

export default YourComponent;
```

#### **Step 3: Write Tests IMMEDIATELY**
```javascript
// Create: src/components/__tests__/YourComponent.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import YourComponent from '../YourComponent';

describe('YourComponent', () => {
  test('renders component heading', () => {
    render(<YourComponent />);
    expect(screen.getByText('Your Component')).toBeInTheDocument();
  });
});
```

#### **Step 4: Run Tests After Every Change**
```bash
# Run tests for your specific component
npm test YourComponent.test.js

# Run all tests
npm test -- --watchAll=false
```

**✅ Success looks like:** All tests pass
**❌ If tests fail:** Fix them before proceeding

#### **Step 5: Commit Small Changes Frequently**
```bash
# Check what you've changed
git status

# Add your changes
git add .

# Commit with descriptive message
git commit -m "feat: add basic YourComponent with initial tests

- Create component with basic structure
- Add initial test coverage
- Follow existing component patterns

Updated: $(date +'%Y-%m-%d %H:%M:%S')"
```

---

## 🩺 **PART E: WORKING WITH MEDICAL DATA**

### **Types of Medical Data in This Project**

#### **1. Antibiotics Data** (`src/data/SimpleAntibioticData.js`)
Contains information about antibiotics including:
- Generic and brand names
- Mechanism of action
- Common uses
- Side effects

**⚠️ CRITICAL:** Any changes require medical expert validation

#### **2. Pathogens Data** (`src/data/SimplePathogenData.js`)
Contains information about disease-causing organisms:
- Pathogen names
- Associated diseases
- Resistance patterns

**⚠️ CRITICAL:** Resistance information must be current and accurate

#### **3. Medical Conditions** (`src/data/medicalConditions.js`)
Maps conditions to appropriate treatments:
- Condition descriptions
- Recommended antibiotics
- Treatment protocols

**⚠️ CRITICAL:** Treatment recommendations must be evidence-based

### **Safe Medical Data Modification Process**

#### **Before Making ANY Medical Content Changes:**
- [ ] Verify you have a current, authoritative medical source
- [ ] Schedule medical expert review BEFORE starting work
- [ ] Create test data that doesn't affect production content
- [ ] Plan comprehensive testing of all affected pathways

#### **Step-by-Step Medical Data Change Process:**

**Step 1: Research and Documentation**
```bash
# Create documentation file for your changes
touch medical-change-documentation.md
```

Document:
- Medical source (CDC, WHO, peer-reviewed journal)
- Exact changes being made
- Rationale for the change
- Impact assessment

**Step 2: Create Test Data First**
```javascript
// Example: Create test version before modifying real data
const testAntibioticData = {
  testAntibiotic: {
    genericName: "Test Antibiotic",
    // ... other properties
  }
};
```

**Step 3: Implement with Extensive Testing**
```bash
# Run medical data validation tests
npm test -- --testPathPattern="data.*test"
```

**Step 4: Medical Expert Review**
- [ ] Create pull request with draft status
- [ ] Request medical expert review
- [ ] Document all feedback and responses
- [ ] Only proceed after explicit medical approval

---

## 🧪 **PART F: COMPREHENSIVE TESTING GUIDE**

### **Testing Philosophy for Medical Applications**
In medical applications, testing isn't just about preventing bugs—it's about preventing harm. Every line of medical code must be tested.

### **Required Test Types**

#### **1. Unit Tests (For Individual Functions)**
```javascript
// Example: Testing a medical calculation function
describe('calculateDosage', () => {
  test('calculates correct dosage for adult patient', () => {
    const result = calculateDosage({
      weight: 70, // kg
      age: 30,
      antibioticType: 'amoxicillin'
    });
    expect(result.dosage).toBe(500); // mg
    expect(result.frequency).toBe('every 8 hours');
  });

  test('adjusts dosage for pediatric patient', () => {
    const result = calculateDosage({
      weight: 20, // kg
      age: 8,
      antibioticType: 'amoxicillin'
    });
    expect(result.dosage).toBe(250); // mg
    expect(result.frequency).toBe('every 8 hours');
  });
});
```

#### **2. Component Tests (For UI Components)**
```javascript
// Example: Testing medical information display
describe('AntibioticCard', () => {
  test('displays antibiotic name correctly', () => {
    const mockAntibiotic = {
      genericName: 'Amoxicillin',
      brandNames: ['Amoxil', 'Trimox'],
      description: 'Penicillin antibiotic'
    };
    
    render(<AntibioticCard antibiotic={mockAntibiotic} />);
    
    expect(screen.getByText('Amoxicillin')).toBeInTheDocument();
    expect(screen.getByText('Amoxil, Trimox')).toBeInTheDocument();
  });

  test('shows appropriate warnings for allergies', () => {
    const mockAntibiotic = {
      genericName: 'Penicillin',
      allergyWarnings: ['Penicillin allergy', 'Cross-reactivity with cephalosporins']
    };
    
    render(<AntibioticCard antibiotic={mockAntibiotic} />);
    
    expect(screen.getByText(/Penicillin allergy/)).toBeInTheDocument();
  });
});
```

#### **3. Integration Tests (For Connected Components)**
```javascript
// Example: Testing pathogen-antibiotic relationship
describe('PathogenTreatmentRecommendations', () => {
  test('recommends correct antibiotics for E. coli UTI', () => {
    render(
      <AppContext.Provider value={mockAppContext}>
        <PathogenTreatmentRecommendations pathogen="E. coli" condition="UTI" />
      </AppContext.Provider>
    );
    
    expect(screen.getByText('First-line treatment:')).toBeInTheDocument();
    expect(screen.getByText('Trimethoprim-sulfamethoxazole')).toBeInTheDocument();
  });
});
```

### **Testing Commands You Must Know**

#### **Run All Tests**
```bash
npm test -- --watchAll=false
```
**✅ Success:** All tests pass (green)
**❌ Failure:** Any red tests must be fixed

#### **Run Tests with Coverage**
```bash
npm test -- --coverage --watchAll=false
```
**✅ Success:** Coverage meets requirements (90%+ for medical data)

#### **Run Specific Test File**
```bash
npm test YourComponent.test.js
```

#### **Run Tests for Specific Pattern**
```bash
# Test all medical data
npm test -- --testPathPattern="data.*test"

# Test all components
npm test -- --testPathPattern="components.*test"
```

### **Coverage Requirements by File Type**
- **Medical Data Files**: 100% coverage required
- **Components**: 85% minimum coverage
- **Hooks**: 90% minimum coverage
- **Utilities**: 95% minimum coverage

### **What to Do When Tests Fail**

#### **Step 1: Read the Error Message Carefully**
```
FAIL src/components/AntibioticCard.test.js
● AntibioticCard › displays antibiotic name correctly

expect(received).toBeInTheDocument()

Expected: <div>Amoxicillin</div>
Received: null
```

#### **Step 2: Understand What Failed**
- The test expected to find "Amoxicillin" in the document
- It found `null` instead
- This means the component didn't render the name

#### **Step 3: Check Your Component Code**
```javascript
// Look for the issue in your component
const AntibioticCard = ({ antibiotic }) => {
  return (
    <div>
      {/* Check: Is this line missing or incorrect? */}
      <h3>{antibiotic.genericName}</h3>
    </div>
  );
};
```

#### **Step 4: Fix and Re-test**
```bash
# After making fixes
npm test YourComponent.test.js
```

#### **Step 5: If Still Stuck**
- [ ] Copy the complete error message
- [ ] Note what you've tried to fix it
- [ ] Ask for help with specific details

---

## 🌳 **PART G: GIT WORKFLOW FOR JUNIOR DEVELOPERS**

### **Git Commands You'll Use Daily**

#### **Basic Status and Information**
```bash
# Check current branch and status
git status

# See what branch you're on
git branch

# See recent commits
git log --oneline -5
```

#### **Branch Management**
```bash
# Switch to existing branch
git checkout branch-name

# Create and switch to new branch
git checkout -b feature/new-feature-name

# Switch back to develop
git checkout develop

# Delete finished feature branch
git branch -d feature/completed-feature
```

#### **Making Commits**
```bash
# See what files have changed
git status

# Add specific files
git add src/components/YourComponent.js
git add src/components/__tests__/YourComponent.test.js

# Add all changes (use carefully!)
git add .

# Commit with message
git commit -m "feat: add YourComponent with basic functionality

- Create component structure
- Add basic tests
- Follow existing patterns

Updated: $(date +'%Y-%m-%d %H:%M:%S')"
```

### **Safe Git Workflow Process**

#### **Starting Work Each Day**
```bash
# 1. Make sure you're on develop
git checkout develop

# 2. Get latest changes
git pull origin develop

# 3. Create your feature branch
git checkout -b feature/your-task-name
```

#### **During Development**
```bash
# Frequently check your status
git status

# Make small commits often
git add .
git commit -m "Small descriptive message"

# Push your branch periodically
git push -u origin feature/your-task-name
```

#### **When Ready for Review**
```bash
# 1. Make sure all tests pass
npm test -- --watchAll=false

# 2. Make sure build works
npm run build

# 3. Push latest changes
git push origin feature/your-task-name

# 4. Create pull request on GitHub
# (You'll do this through the GitHub web interface)
```

### **Commit Message Templates**

#### **For New Features**
```
feat: add [description]

- List what you added
- Mention any important details
- Note if medical content involved

Updated: YYYY-MM-DD HH:MM:SS
```

#### **For Bug Fixes**
```
fix: resolve [issue description]

- Explain what was broken
- Describe how you fixed it
- Note any testing performed

Updated: YYYY-MM-DD HH:MM:SS
```

#### **For Tests**
```
test: add tests for [component/feature]

- Describe test coverage added
- Note any edge cases covered
- Mention medical accuracy testing if applicable

Updated: YYYY-MM-DD HH:MM:SS
```

### **🚨 Git Emergency Procedures**

#### **"I Made a Mistake in My Last Commit"**
```bash
# If you haven't pushed yet
git reset --soft HEAD~1
# Make your corrections
git add .
git commit -m "Corrected commit message"

# If you already pushed
# STOP and ask for help
```

#### **"I'm on the Wrong Branch"**
```bash
# Save your current work
git stash

# Switch to correct branch
git checkout correct-branch-name

# Get your work back
git stash pop
```

#### **"I Have Merge Conflicts"**
```bash
# STOP and ask for help
# Merge conflicts in medical data must be reviewed by senior developer
```

#### **"My Branch Is Behind/Ahead"**
```bash
# Update your branch with latest develop
git checkout develop
git pull origin develop
git checkout your-feature-branch
git rebase develop

# If conflicts occur, STOP and ask for help
```

---

## 📞 **PART H: COMMUNICATION AND HELP**

### **When to Ask for Help Immediately**

#### **🚨 Medical Content Issues**
- Any medical terminology you don't understand
- Questions about antibiotic-pathogen relationships
- Dosage calculations or medical recommendations
- Drug interaction information
- Medical accuracy concerns

#### **🚨 Technical Blockers**
- Tests failing for more than 30 minutes
- Git commands not working as expected
- Build errors you can't resolve
- Accessibility compliance questions
- Performance issues

#### **🚨 Process Questions**
- Unsure about task requirements
- Don't know which files to modify
- Unclear about testing requirements
- Code review feedback you don't understand

### **How to Ask for Help Effectively**

#### **Template for Help Requests**
```
Subject: [HELP NEEDED] Brief description of issue

**What I'm trying to do:**
[Describe your task/goal]

**What I've tried:**
1. [First thing you tried]
2. [Second thing you tried]
3. [Third thing you tried]

**Current error/problem:**
[Copy exact error messages or describe issue]

**Medical content involved:**
[Yes/No - if yes, describe what medical data is affected]

**Urgency:**
[Blocking my work / Need guidance / General question]

**Files involved:**
[List the files you're working with]
```

#### **Example Help Request**
```
Subject: [HELP NEEDED] Tests failing after adding new antibiotic data

**What I'm trying to do:**
Add Azithromycin to the antibiotic database with appropriate pathogen mappings

**What I've tried:**
1. Added data to SimpleAntibioticData.js following existing pattern
2. Updated pathogenAntibioticMap.js with new relationships
3. Ran npm test but getting failures

**Current error/problem:**
FAIL src/data/__tests__/pathogenAntibioticMap.test.js
Expected pathogen 'Streptococcus pneumoniae' to have antibiotic 'Azithromycin'
Received: undefined

**Medical content involved:**
Yes - adding Azithromycin for respiratory tract infections, specifically for Streptococcus pneumoniae and Haemophilus influenzae

**Urgency:**
Blocking my work - can't proceed without resolving test failures

**Files involved:**
- src/data/SimpleAntibioticData.js
- src/data/pathogenAntibioticMap.js
- src/data/__tests__/pathogenAntibioticMap.test.js
```

### **Response Time Expectations**
- **Medical accuracy questions**: Within 2 hours
- **Blocking technical issues**: Within 1 hour during work hours
- **General guidance**: Within 4 hours
- **Code review requests**: Within 24 hours

### **Escalation Path**
1. **First Contact**: Your assigned mentor/senior developer
2. **Medical Questions**: Project medical advisor
3. **Technical Architecture**: Lead developer
4. **Process Questions**: Project manager

---

## 📚 **PART I: LEARNING RESOURCES**

### **Medical Education Background**
Since you're working on a medical education app, understanding basic medical concepts will help:

#### **Essential Medical Concepts**
- **Antibiotics**: Medications that fight bacterial infections
- **Pathogens**: Disease-causing organisms (bacteria, viruses, fungi)
- **Resistance**: When bacteria become immune to antibiotics
- **Spectrum**: Range of bacteria an antibiotic can treat
- **First-line/Second-line**: Preferred treatment order

#### **Key Medical Resources**
- CDC Guidelines: https://www.cdc.gov/
- WHO Antibiotic Guidelines: https://www.who.int/
- UpToDate (medical reference): https://www.uptodate.com/

### **Technical Learning Resources**

#### **React Patterns Used in This Project**
- Context API for state management
- Custom hooks for logic reuse
- Error boundaries for error handling
- Accessibility best practices
- Testing with React Testing Library

#### **Testing Resources**
- Jest Documentation: https://jestjs.io/
- React Testing Library: https://testing-library.com/
- Accessibility Testing: https://www.deque.com/axe/

### **Project-Specific Patterns**

#### **Data Structure Patterns**
```javascript
// Antibiotic data structure
{
  genericName: "Amoxicillin",
  brandNames: ["Amoxil", "Trimox"],
  class: "Penicillin",
  mechanism: "Cell wall synthesis inhibition",
  spectrum: "Narrow",
  commonUses: ["UTI", "Respiratory infections"],
  sideEffects: ["Nausea", "Diarrhea"],
  interactions: ["Warfarin", "Methotrexate"]
}
```

#### **Component Patterns**
```javascript
// Standard component structure
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects here
  }, [dependencies]);
  
  const handleAction = () => {
    // Event handlers here
  };
  
  return (
    <div className="component-name">
      {/* JSX here */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number
};

export default ComponentName;
```

---

## 🎯 **PART J: SUCCESS MILESTONES**

### **Week 1: Getting Started**
- [ ] Successfully set up development environment
- [ ] Completed first simple component with tests
- [ ] Made first successful pull request
- [ ] Understand basic medical data structure
- [ ] Can run all tests and build successfully

### **Week 2: Building Confidence**
- [ ] Added new quiz question with proper validation
- [ ] Modified existing component without breaking tests
- [ ] Successfully handled code review feedback
- [ ] Understand pathogen-antibiotic relationships
- [ ] Can debug simple test failures independently

### **Week 3: Medical Data Competence**
- [ ] Added new antibiotic with full data structure
- [ ] Created pathogen-antibiotic mapping
- [ ] Conducted medical accuracy research
- [ ] Successfully completed medical expert review
- [ ] Understand accessibility requirements

### **Week 4: Independent Development**
- [ ] Completed complex feature end-to-end
- [ ] Mentored another new developer
- [ ] Identified and fixed existing bug
- [ ] Contributed to medical content accuracy
- [ ] Can work independently with minimal guidance

### **Ongoing Excellence**
- [ ] Consistently writes high-quality tests
- [ ] Proactively identifies medical accuracy issues
- [ ] Contributes to team documentation
- [ ] Helps other developers solve problems
- [ ] Maintains 100% medical data test coverage

---

## 📋 **PART K: DAILY CHECKLISTS**

### **Morning Startup Checklist**
- [ ] Check email/Slack for urgent medical accuracy corrections
- [ ] Update local repository (git pull origin develop)
- [ ] Run full test suite to ensure clean starting state
- [ ] Review assigned tasks and identify medical content
- [ ] Plan OODA approach for each task
- [ ] Schedule medical expert consultation if needed

### **Before Any Commit Checklist**
- [ ] All tests pass (npm test -- --watchAll=false)
- [ ] Build succeeds (npm run build)
- [ ] No console errors in browser
- [ ] Medical content changes reviewed by expert
- [ ] Accessibility tested if UI changes made
- [ ] Git status shows expected files only
- [ ] Commit message follows template format

### **End of Day Checklist**
- [ ] Push current work to feature branch
- [ ] Update task status/progress notes
- [ ] Schedule tomorrow's medical expert consultations
- [ ] Clean up any temporary/debug code
- [ ] Plan next day's priorities using OODA framework

### **Before Pull Request Checklist**
- [ ] Feature branch up to date with develop
- [ ] All acceptance criteria met
- [ ] Full test suite passes with adequate coverage
- [ ] Medical accuracy expert approval obtained
- [ ] Accessibility requirements verified
- [ ] Performance impact assessed
- [ ] Documentation updated if needed
- [ ] Pull request description complete and detailed

---

**🎉 Remember: You're contributing to medical education that helps healthcare professionals make better decisions. Take pride in the accuracy and quality of your work, and never hesitate to ask for help when dealing with medical content.**

**Updated**: 2025-07-28 12:15:00