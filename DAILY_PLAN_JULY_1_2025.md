# Daily Plan - July 1, 2025
## Junior Developer Task List with Hand-Holding Instructions

### 🎯 Today's Primary Objective
Fix critical runtime errors and failing tests to improve app stability from 57% to 70% functionality.

### 📋 Task List (Priority Order)

#### **TASK 1: Fix ConditionsTab Runtime Error** ⚠️ CRITICAL
**Status**: 🔴 BROKEN - Cannot read properties of undefined (map error)
**Time Estimate**: 2-3 hours
**Instructions**:
1. Open `src/components/ConditionsTab.js`
2. Look for `.map()` calls on potentially undefined arrays
3. Add null checks: `data?.conditions?.map()` or `(data.conditions || []).map()`
4. Test locally: `npm start` and navigate to Conditions tab
5. **Validation**: Tab loads without console errors

#### **TASK 2: Investigate Quiz Tab Test Failures** ⚠️ HIGH
**Status**: 🔴 FAILING TESTS - Multiple test failures in component  
**Time Estimate**: 1-2 hours
**Instructions**:
1. Run tests: `npm test -- --testPathPattern=Quiz`
2. Read error messages carefully
3. Fix one test at a time, starting with the simplest
4. Common issues: missing props, undefined state, async timing
5. **Validation**: All Quiz tests pass

#### **TASK 3: Fix Pathogen Explorer Syntax Errors** 🔧 MEDIUM
**Status**: 🔴 SYNTAX ERRORS - ParseError preventing compilation
**Time Estimate**: 1 hour
**Instructions**:
1. Open `src/components/PathogenExplorer.js`
2. Look for syntax errors: missing brackets, semicolons, quotes
3. Use VS Code error highlighting or ESLint
4. Fix each syntax error one by one
5. **Validation**: File compiles without errors

#### **TASK 4: Verify Unknown Status Components** 🔍 LOW
**Time Estimate**: 30 minutes each
**Instructions**:
1. Test Antibiotic Explorer tab - click and verify functionality
2. Test Visualizations tab - verify charts render
3. Document findings in project status
4. **Validation**: Document actual status of each component

### 🛡️ Safety Guidelines for Junior Developer
- **Always backup before major changes**: `git add . && git commit -m "backup before fixes"`
- **Test after each fix**: Don't fix multiple issues without testing
- **Read error messages slowly**: They contain the solution
- **Ask for help if stuck >30 minutes** on any single issue

### 📊 Success Metrics for Today
- [ ] ConditionsTab loads without errors
- [ ] Quiz tests pass (0 failing tests for Quiz component)  
- [ ] Pathogen Explorer compiles successfully
- [ ] Overall app functionality improves from 57% to 70%
- [ ] No new errors introduced

### 🔄 End-of-Day Checklist
1. Run full test suite: `npm test`
2. Build production version: `npm run build`
3. Document what was fixed and what still needs work
4. Commit changes with descriptive messages
5. Update project status in CLAUDE.md

### 📞 Escalation Points
**Escalate immediately if**:
- Cannot understand error messages after 30 minutes
- Fixes break other functionality
- Test failures seem unrelated to your changes
- Build process fails after your changes

---
*This plan follows the 20-day structured completion timeline. Today focuses on critical stability issues before moving to feature completion.*