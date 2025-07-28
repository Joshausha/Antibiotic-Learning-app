# Troubleshooting Guide
## Junior Developer Error Recovery

**Last Updated**: 2025-07-28 13:00:00
**Target Audience**: Junior developers requiring step-by-step problem resolution
**Emergency Contact**: [Your senior developer/medical expert contact]

---

## 🚨 **EMERGENCY PROCEDURES**

### **🛑 STOP AND ASK FOR HELP IMMEDIATELY IF:**
- [ ] Medical data is corrupted or showing incorrect information
- [ ] Production build is broken and you can't fix it in 30 minutes
- [ ] Tests are failing and affecting medical accuracy validation
- [ ] You accidentally committed sensitive data (API keys, credentials)
- [ ] Git repository is in an unrecoverable state

### **📞 Emergency Contact Template:**
```
URGENT: [Brief description of issue]

Medical data affected: Yes/No
Production impact: Yes/No
User safety concern: Yes/No

What happened: [Brief explanation]
What I tried: [List your attempts]
Current status: [Broken/Partially working/Unknown]

Files involved: [List affected files]
```

---

## 🔧 **COMMON DEVELOPMENT ERRORS**

### **1. React Component Errors**

#### **Error: "Cannot read property of undefined"**
```
TypeError: Cannot read property 'genericName' of undefined
```

**🔍 Diagnosis Steps:**
```bash
# Check if data is loading properly
console.log('Props:', props);
console.log('Data:', data);
```

**✅ Solution:**
```javascript
// Bad - No safety check
const AntibioticCard = ({ antibiotic }) => {
  return <h3>{antibiotic.genericName}</h3>; // Will crash if antibiotic is undefined
};

// Good - With safety checks
const AntibioticCard = ({ antibiotic }) => {
  if (!antibiotic) {
    return <div>Loading antibiotic data...</div>;
  }
  
  return <h3>{antibiotic.genericName || 'Unknown Antibiotic'}</h3>;
};
```

#### **Error: "Hooks called conditionally"**
```
React Hook "useState" is called conditionally. React Hooks must be called in the exact same order every time.
```

**🔍 Common Cause:**
```javascript
// Bad - Hook inside condition
const MyComponent = ({ showFeature }) => {
  if (showFeature) {
    const [count, setCount] = useState(0); // ❌ Conditional hook
  }
  return <div>Component</div>;
};
```

**✅ Solution:**
```javascript
// Good - Hook at top level
const MyComponent = ({ showFeature }) => {
  const [count, setCount] = useState(0); // ✅ Always called
  
  if (showFeature) {
    // Use the hook value here
    return <div>Count: {count}</div>;
  }
  return <div>Feature disabled</div>;
};
```

### **2. Medical Data Validation Errors**

#### **Error: "Medical source validation failed"**
```
ValidationError: Medical data missing required sources
```

**🔍 Check Data Structure:**
```javascript
// Your data should look like this:
const antibioticData = {
  genericName: "Amoxicillin",
  class: "Penicillin",
  // ... other fields
  sources: [
    "CDC Guidelines 2023",
    "WHO Treatment Guidelines", 
    "UpToDate Database"
  ], // ✅ Required field
  lastUpdated: "2025-07-28",
  reviewedBy: "Dr. Medical Expert" // ✅ Required for medical content
};
```

**✅ Fix Checklist:**
- [ ] Add `sources` array with at least one authoritative medical source
- [ ] Include `lastUpdated` date in YYYY-MM-DD format
- [ ] Add `reviewedBy` field with medical expert name
- [ ] Verify all medical terminology is spelled correctly

### **3. Import/Export Errors**

#### **Error: "Module not found" or "Cannot resolve module"**
```
Module not found: Can't resolve './components/MyComponent'
```

**🔍 Diagnosis Steps:**
```bash
# Check if file exists
ls src/components/MyComponent.js

# Check current directory
pwd

# Check file permissions
ls -la src/components/MyComponent.js
```

**✅ Common Solutions:**
```javascript
// Check these common issues:

// 1. File extension missing
import MyComponent from './MyComponent'; // ❌ Missing .js
import MyComponent from './MyComponent.js'; // ✅ Correct

// 2. Wrong path
import MyComponent from './components/MyComponent'; // ❌ From wrong location
import MyComponent from '../components/MyComponent'; // ✅ Correct relative path

// 3. Case sensitivity (especially on macOS)
import MyComponent from './mycomponent'; // ❌ Wrong case
import MyComponent from './MyComponent'; // ✅ Correct case

// 4. Default vs named exports
import { MyComponent } from './MyComponent'; // ❌ If it's default export
import MyComponent from './MyComponent'; // ✅ For default export
```

---

## 🧪 **TESTING TROUBLESHOOTING**

### **1. Test Failures**

#### **Error: "Test suite failed to run"**
```
FAIL src/components/__tests__/MyComponent.test.js
● Test suite failed to run
  Cannot find module '../MyComponent' from 'src/components/__tests__/MyComponent.test.js'
```

**🔍 Diagnosis:**
```bash
# Check test file location
ls src/components/__tests__/MyComponent.test.js

# Check component location  
ls src/components/MyComponent.js

# Verify import path in test
head -5 src/components/__tests__/MyComponent.test.js
```

**✅ Fix Import Paths:**
```javascript
// In test file: src/components/__tests__/MyComponent.test.js
import MyComponent from '../MyComponent'; // ✅ Correct (go up one level)
import MyComponent from './MyComponent'; // ❌ Wrong (same level)
```

#### **Error: "Element not found in document"**
```
TestingLibraryElementError: Unable to find an element with the text: /Submit/
```

**🔍 Debug Steps:**
```javascript
// Add debug output to see what's actually rendered
import { render, screen } from '@testing-library/react';

test('finds submit button', () => {
  render(<MyComponent />);
  
  // Debug: See what's actually in the DOM
  screen.debug();
  
  // Then look for your element
  expect(screen.getByText('Submit')).toBeInTheDocument();
});
```

**✅ Common Solutions:**
```javascript
// 1. Check exact text match
screen.getByText('Submit'); // ❌ Exact match required
screen.getByText(/submit/i); // ✅ Case insensitive regex

// 2. Use role instead of text
screen.getByRole('button'); // ✅ More reliable
screen.getByRole('button', { name: /submit/i }); // ✅ Even better

// 3. Wait for async content
await screen.findByText('Submit'); // ✅ For async content
```

### **2. Medical Data Test Failures**

#### **Error: "Medical accuracy validation failed"**
```
Expected pathogen 'E. coli' to be mapped to antibiotic 'Trimethoprim-sulfamethoxazole'
Received: undefined
```

**🔍 Check Data Mapping:**
```bash
# Look at pathogen-antibiotic mapping file
cat src/data/pathogenAntibioticMap.js | grep -A 5 "E. coli"
```

**✅ Fix Data Structure:**
```javascript
// In pathogenAntibioticMap.js
export const pathogenAntibioticMap = {
  "Escherichia coli": { // ✅ Use full scientific name
    firstLine: ["Trimethoprim-sulfamethoxazole"],
    secondLine: ["Ciprofloxacin"],
    // ... other data
  },
  // Not: "E. coli" ❌ (abbreviation might cause lookup failures)
};
```

---

## 🌳 **GIT TROUBLESHOOTING**

### **1. Common Git Errors**

#### **Error: "Your branch is behind 'origin/develop'"**
```bash
Your branch is behind 'origin/develop' by 3 commits, and can be fast-forwarded.
```

**✅ Solution:**
```bash
# Simple case - can fast-forward
git pull origin develop

# If you have local changes
git stash                    # Save your work
git pull origin develop      # Get updates
git stash pop               # Restore your work
```

#### **Error: "Merge conflict in [filename]"**
```
Auto-merging src/data/SimpleAntibioticData.js
CONFLICT (content): Merge conflict in src/data/SimpleAntibioticData.js
```

**🚨 STOP - Medical Data Conflicts:**
If this involves medical data files, **STOP and ask for help immediately**.

**🔍 For Non-Medical Files:**
```bash
# See which files have conflicts
git status

# Look at the conflict
cat src/components/MyComponent.js
```

**✅ Basic Conflict Resolution:**
```javascript
// You'll see something like this in the file:
<<<<<<< HEAD
const myFunction = () => {
  return "your version";
};
=======
const myFunction = () => {
  return "their version"; 
};
>>>>>>> develop

// Choose one version and remove the conflict markers:
const myFunction = () => {
  return "chosen version";
};
```

```bash
# After fixing conflicts
git add src/components/MyComponent.js
git commit -m "fix: resolve merge conflict in MyComponent"
```

#### **Error: "Permission denied (publickey)"**
```
git@github.com: Permission denied (publickey).
```

**✅ Quick Fix:**
```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/username/repo.git

# Then try your git command again
git push origin feature/your-branch
```

### **2. Git Recovery Procedures**

#### **"I committed to the wrong branch"**
```bash
# If you haven't pushed yet
git log --oneline -3  # See recent commits
git reset --soft HEAD~1  # Undo last commit, keep changes
git stash  # Save changes
git checkout correct-branch
git stash pop  # Restore changes
git add .
git commit -m "fix: move commit to correct branch"
```

#### **"I accidentally added the wrong files"**
```bash
# Before committing
git reset  # Unstage all files
git add src/components/CorrectFile.js  # Add only what you want

# After committing but before pushing
git reset --soft HEAD~1  # Undo commit, keep changes staged
git reset  # Unstage everything
git add src/components/CorrectFile.js  # Add only what you want
git commit -m "fix: add only correct files"
```

---

## 🔨 **BUILD AND DEPLOYMENT ISSUES**

### **1. Build Failures**

#### **Error: "npm run build failed"**
```
npm ERR! code ELIFECYCLE
npm ERR! errno 1
```

**🔍 Get More Details:**
```bash
# Run build with verbose output
npm run build 2>&1 | tee build-error.log

# Check for specific errors
cat build-error.log | grep -i error
```

**✅ Common Build Fixes:**

**Memory Issues:**
```bash
# Increase Node.js memory limit
node --max-old-space-size=4096 node_modules/.bin/react-scripts build
```

**Dependency Issues:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**ESLint Errors:**
```bash
# Fix auto-fixable linting issues
npm run lint:fix

# Or temporarily disable for build
DISABLE_ESLINT_PLUGIN=true npm run build
```

#### **Error: "Module parse failed: Unexpected token"**
```
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type
```

**🔍 Common Causes:**
- Missing file extensions
- Wrong file format (trying to import image as JS)
- Babel configuration issues

**✅ Solutions:**
```javascript
// 1. Check import statements
import logo from '../assets/logo.png'; // ✅ Correct
import logo from '../assets/logo'; // ❌ Missing extension

// 2. Move files to public folder for static assets
// public/images/logo.png
const logo = '/images/logo.png'; // ✅ Public folder reference
```

### **2. Development Server Issues**

#### **Error: "Port 3000 is already in use"**
```bash
# Find what's using the port
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)

# Or use different port
PORT=3001 npm start
```

#### **Error: "Module not found after installing package"**
```bash
# Clear cache and restart
rm -rf node_modules/.cache
npm start
```

---

## 🎯 **ACCESSIBILITY TROUBLESHOOTING**

### **1. ARIA and Screen Reader Issues**

#### **Error: "Elements must have sufficient color contrast"**
**✅ Fix Color Contrast:**
```css
/* Bad - insufficient contrast */
.button {
  background-color: #ccc;
  color: #999;
}

/* Good - sufficient contrast (4.5:1 ratio minimum) */
.button {
  background-color: #0066cc;
  color: #ffffff;
}
```

#### **Error: "Form elements must have labels"**
**✅ Add Proper Labels:**
```javascript
// Bad - no label
<input type="text" placeholder="Enter antibiotic name" />

// Good - proper label association
<label htmlFor="antibiotic-input">Antibiotic Name:</label>
<input 
  id="antibiotic-input"
  type="text" 
  placeholder="Enter antibiotic name"
  aria-describedby="antibiotic-help"
/>
<div id="antibiotic-help">Enter generic or brand name</div>
```

### **2. Keyboard Navigation Issues**

#### **Error: "Elements not reachable by keyboard"**
**✅ Fix Tab Order:**
```javascript
// Bad - div not keyboard accessible
<div onClick={handleClick}>Click me</div>

// Good - button with proper keyboard support
<button 
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Click me
</button>

// Good - custom clickable with keyboard support
<div 
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Click me
</div>
```

---

## ⚡ **PERFORMANCE TROUBLESHOOTING**

### **1. Slow Component Rendering**

#### **Symptom: "Page feels sluggish"**
**🔍 Identify Performance Issues:**
```javascript
// Add React DevTools Profiler
import { Profiler } from 'react';

const MyComponent = () => {
  const onRenderCallback = (id, phase, actualDuration) => {
    console.log(`${id} ${phase} took ${actualDuration}ms`);
  };

  return (
    <Profiler id="MyComponent" onRender={onRenderCallback}>
      {/* Your component content */}
    </Profiler>
  );
};
```

**✅ Common Performance Fixes:**

**1. Memoize Expensive Calculations:**
```javascript
import { useMemo } from 'react';

const ExpensiveComponent = ({ antibiotics }) => {
  // Bad - recalculates every render
  const filteredAntibiotics = antibiotics.filter(a => a.class === 'Penicillin');

  // Good - only recalculates when antibiotics change
  const filteredAntibiotics = useMemo(() => 
    antibiotics.filter(a => a.class === 'Penicillin'),
    [antibiotics]
  );

  return <div>{/* render filtered data */}</div>;
};
```

**2. Prevent Unnecessary Re-renders:**
```javascript
import { memo, useCallback } from 'react';

// Memoize component
const AntibioticCard = memo(({ antibiotic, onSelect }) => {
  return (
    <div onClick={() => onSelect(antibiotic.id)}>
      {antibiotic.name}
    </div>
  );
});

// Memoize callback in parent
const AntibioticList = ({ antibiotics }) => {
  const handleSelect = useCallback((id) => {
    console.log('Selected:', id);
  }, []);

  return (
    <div>
      {antibiotics.map(antibiotic => (
        <AntibioticCard 
          key={antibiotic.id}
          antibiotic={antibiotic}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};
```

### **2. Large Bundle Size**

#### **Symptom: "App loads slowly"**
**🔍 Analyze Bundle Size:**
```bash
# Build with bundle analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

**✅ Reduce Bundle Size:**
```javascript
// 1. Use dynamic imports for large dependencies
const Chart = lazy(() => import('react-chartjs-2'));

// 2. Import only what you need
import { debounce } from 'lodash'; // ❌ Imports entire lodash
import debounce from 'lodash/debounce'; // ✅ Imports only debounce

// 3. Use code splitting
const QuizAnalytics = lazy(() => import('./QuizAnalytics'));
```

---

## 💾 **DATA AND STATE ISSUES**

### **1. LocalStorage Problems**

#### **Error: "User progress not saving"**
**🔍 Debug LocalStorage:**
```javascript
// Check what's in localStorage
console.log('All localStorage:', localStorage);
console.log('User progress:', localStorage.getItem('userProgress'));

// Clear corrupt data
localStorage.removeItem('userProgress');
localStorage.clear(); // Nuclear option
```

**✅ Fix Storage Issues:**
```javascript
// Add error handling for localStorage
const saveUserProgress = (progress) => {
  try {
    localStorage.setItem('userProgress', JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
    // Handle storage quota exceeded
    if (error.name === 'QuotaExceededError') {
      // Clear old data or notify user
      localStorage.clear();
      alert('Storage full. Your progress has been reset.');
    }
  }
};

const loadUserProgress = () => {
  try {
    const saved = localStorage.getItem('userProgress');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load progress:', error);
    // Clear corrupt data
    localStorage.removeItem('userProgress');
    return null;
  }
};
```

### **2. Context State Issues**

#### **Error: "useContext must be used within provider"**
```
Error: useContext must be used within a UserContextProvider
```

**🔍 Check Component Tree:**
```javascript
// Make sure component is wrapped in provider
function App() {
  return (
    <UserContextProvider> {/* ✅ Provider at top level */}
      <Header />
      <MainContent />
    </UserContextProvider>
  );
}

// Not this:
function App() {
  return (
    <div>
      <Header /> {/* ❌ Outside provider */}
      <UserContextProvider>
        <MainContent />
      </UserContextProvider>
    </div>
  );
}
```

---

## 🔍 **DEBUGGING TECHNIQUES**

### **1. Console Debugging**
```javascript
// 1. Strategic console.logs
console.log('Props received:', props);
console.log('Current state:', state);
console.log('API response:', response);

// 2. Conditional logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', debugData);
}

// 3. Trace function calls
console.trace('Function called from:');

// 4. Time expensive operations
console.time('data-processing');
// ... expensive operation
console.timeEnd('data-processing');
```

### **2. React DevTools**
```bash
# Install React DevTools browser extension
# Then inspect components:
# 1. View component props and state
# 2. Trace state changes
# 3. Profile component performance
# 4. Debug hooks
```

### **3. Network Debugging**
```javascript
// Monitor API calls
fetch('/api/antibiotics')
  .then(response => {
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    return response.json();
  })
  .then(data => {
    console.log('API data:', data);
  })
  .catch(error => {
    console.error('API error:', error);
  });
```

---

## 📚 **REFERENCE QUICK FIXES**

### **Frequent Error Solutions**

| Error Message | Quick Fix |
|---------------|-----------|
| `Module not found` | Check file path and extension |
| `Cannot read property of undefined` | Add null/undefined checks |
| `Hooks called conditionally` | Move hooks to top of component |
| `Memory limit exceeded` | `node --max-old-space-size=4096` |
| `Port already in use` | `kill -9 $(lsof -ti:3000)` |
| `Permission denied` | Use HTTPS instead of SSH for git |
| `Test suite failed` | Check import paths in tests |
| `Build failed` | Clear node_modules and reinstall |

### **Command Cheat Sheet**
```bash
# Development
npm start                    # Start dev server
npm test                     # Run tests
npm run build               # Build for production
npm run lint                # Check code quality
npm run lint:fix            # Auto-fix linting issues

# Git Recovery
git status                  # Check current status
git stash                   # Save work temporarily
git stash pop              # Restore stashed work
git reset --soft HEAD~1    # Undo last commit, keep changes
git clean -fd              # Remove untracked files

# Debugging
npx create-react-app --info # Check environment
npm ls                      # List installed packages
npm audit                   # Check for vulnerabilities
lsof -ti:3000              # Find process using port 3000
```

---

## 🆘 **WHEN ALL ELSE FAILS**

### **Nuclear Options (Use with Caution)**

#### **1. Complete Environment Reset**
```bash
# ⚠️ This will delete everything and start fresh
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### **2. Git Repository Reset**
```bash
# ⚠️ This will lose all uncommitted changes
git stash  # Save current work first
git reset --hard origin/develop  # Reset to remote state
git clean -fd  # Remove untracked files
```

#### **3. Create New Branch and Start Over**
```bash
# ⚠️ Use when your current branch is completely broken
git stash  # Save your work
git checkout -b feature/new-attempt  # Create fresh branch
git stash pop  # Restore your work
# Start with clean slate
```

### **Emergency Contacts and Resources**

#### **Immediate Help**
- **Senior Developer**: [Contact info]
- **Medical Expert**: [Contact info] 
- **Tech Lead**: [Contact info]

#### **Documentation**
- **Main Guide**: `JUNIOR_DEVELOPER_GUIDE.md`
- **Quick Reference**: `QUICK_REFERENCE_CHECKLISTS.md`
- **Code Templates**: `CODE_TEMPLATES.md`
- **Contributing**: `CONTRIBUTING.md`

#### **External Resources**
- **React Documentation**: https://react.dev/
- **Jest Testing**: https://jestjs.io/
- **Accessibility**: https://www.w3.org/WAI/WCAG21/quickref/
- **Git Help**: https://git-scm.com/docs

---

**🎯 Remember: Every developer encounters these issues. The key is knowing how to systematically diagnose and resolve them. When in doubt, ask for help - that's what senior developers are for!**

**Updated**: 2025-07-28 13:00:00