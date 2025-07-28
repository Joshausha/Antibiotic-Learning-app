# Quick Reference Checklists
## Junior Developer Daily Workflow

**Print this page and keep it handy!**
**Updated**: 2025-07-28 12:30:00

---

## 🌅 **DAILY STARTUP CHECKLIST**

### Every Morning Before Coding:
- [ ] Navigate to project: `cd "/Users/joshpankin/My Drive/1. Projects/Antibiotic Learning app"`
- [ ] Check status: `git status` (should show clean working directory)
- [ ] Switch to develop: `git checkout develop`
- [ ] Pull latest: `git pull origin develop`
- [ ] Install dependencies: `npm install`
- [ ] Run tests: `npm test -- --watchAll=false` (all should pass)
- [ ] Start dev server: `npm start` (should open browser to localhost:3000)

**🚨 If ANY step fails, stop and ask for help!**

---

## 🔄 **OODA WORKFLOW FOR EVERY TASK**

### Before Writing Code:
- [ ] **OBSERVE**: Read task completely, identify medical content
- [ ] **ORIENT**: Look at similar code, understand medical context
- [ ] **DECIDE**: Plan approach, decide if medical expert needed
- [ ] **ACT**: Implement with testing

---

## 🌿 **NEW FEATURE WORKFLOW**

### Starting New Work:
```bash
# 1. Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# 2. Make small change
# 3. Write test immediately
# 4. Run tests
npm test YourComponent.test.js

# 5. Commit frequently
git add .
git commit -m "feat: small descriptive change

- What you did
- Why you did it

Updated: $(date +'%Y-%m-%d %H:%M:%S')"
```

---

## 🧪 **TESTING CHECKLIST**

### Before Every Commit:
- [ ] Run all tests: `npm test -- --watchAll=false`
- [ ] Check coverage: `npm test -- --coverage --watchAll=false`
- [ ] Run build: `npm run build`
- [ ] Check in browser: No console errors

### Test Commands:
```bash
# All tests
npm test -- --watchAll=false

# Specific test
npm test YourComponent.test.js

# Medical data tests
npm test -- --testPathPattern="data.*test"

# With coverage
npm test -- --coverage --watchAll=false
```

---

## 🏥 **MEDICAL CONTENT SAFETY**

### 🛑 STOP and Ask for Help If:
- [ ] Medical terms you don't understand
- [ ] Modifying antibiotic-pathogen relationships
- [ ] Changing dosage calculations
- [ ] Working with drug interactions
- [ ] Tests failing on medical data

### Medical Data Files (100% coverage required):
- `src/data/SimpleAntibioticData.js`
- `src/data/SimplePathogenData.js`
- `src/data/pathogenAntibioticMap.js`
- `src/data/medicalConditions.js`

---

## 📝 **COMMIT MESSAGE TEMPLATES**

### New Feature:
```
feat: add [description]

- List what you added
- Medical content involved: Yes/No
- Tests added: Yes/No

Updated: YYYY-MM-DD HH:MM:SS
```

### Bug Fix:
```
fix: resolve [issue]

- What was broken
- How you fixed it
- Medical accuracy verified: Yes/No

Updated: YYYY-MM-DD HH:MM:SS
```

### Tests:
```
test: add tests for [component]

- Coverage added: X%
- Medical scenarios tested: Yes/No
- Edge cases covered: List them

Updated: YYYY-MM-DD HH:MM:SS
```

---

## 🚨 **PRE-COMMIT SAFETY CHECKLIST**

### Required Before ANY Commit:
- [ ] All tests pass: `npm test -- --watchAll=false`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors in browser
- [ ] Medical content reviewed (if applicable)
- [ ] Files match expected changes: `git status`
- [ ] Commit message follows template

### Required Before Pull Request:
- [ ] Feature branch updated: `git rebase develop`
- [ ] All acceptance criteria met
- [ ] Medical expert approval (if medical content changed)
- [ ] Accessibility tested (if UI changed)
- [ ] Performance checked (no major slowdowns)
- [ ] Documentation updated (if needed)

---

## 🌳 **ESSENTIAL GIT COMMANDS**

### Daily Git Commands:
```bash
# Check status
git status

# See current branch
git branch

# Switch branches
git checkout branch-name

# Create new branch
git checkout -b feature/new-feature

# Add and commit
git add .
git commit -m "message"

# Push branch
git push -u origin feature/branch-name

# Update develop
git checkout develop
git pull origin develop
```

### Emergency Git Commands:
```bash
# Undo last commit (if not pushed)
git reset --soft HEAD~1

# Save work temporarily
git stash

# Get work back
git stash pop

# See recent commits
git log --oneline -5
```

**🚨 If you see merge conflicts, STOP and ask for help!**

---

## 📞 **GET HELP CHECKLIST**

### When to Ask for Help:
- [ ] Medical terminology unclear
- [ ] Tests failing > 30 minutes
- [ ] Git commands not working
- [ ] Build errors
- [ ] Task requirements unclear

### Help Request Template:
```
Subject: [HELP NEEDED] Brief description

What I'm trying to do:
[Your goal]

What I've tried:
1. [First attempt]
2. [Second attempt]
3. [Third attempt]

Current error:
[Copy exact error message]

Medical content involved: Yes/No
Files involved: [List files]
Urgency: [Blocking/Guidance/Question]
```

---

## 🎯 **SUCCESS INDICATORS**

### Daily Success Looks Like:
- [ ] All tests passing when you start
- [ ] All tests passing when you finish
- [ ] Small, frequent commits with clear messages
- [ ] Medical accuracy maintained
- [ ] No console errors
- [ ] Progress on assigned tasks

### Weekly Success Looks Like:
- [ ] Completed feature with tests
- [ ] Successful code review
- [ ] Medical expert approval (if applicable)
- [ ] Learned something new about medical domain
- [ ] Helped team in some way

---

## ⏰ **TIME MANAGEMENT**

### Daily Time Allocation:
- **30 min**: Morning setup and planning
- **6 hours**: Development work (with breaks)
- **1 hour**: Testing and validation
- **30 min**: Documentation and communication

### Time Limits:
- **30 min max**: Struggling with same error
- **1 hour max**: Working without testing
- **2 hours max**: Working on medical content without expert input

**When time limits hit → Ask for help immediately!**

---

## 📚 **QUICK REFERENCE LINKS**

### Documentation:
- Main Guide: `JUNIOR_DEVELOPER_GUIDE.md`
- Contributing: `CONTRIBUTING.md`
- Templates: `CODE_TEMPLATES.md`
- Troubleshooting: `TROUBLESHOOTING_GUIDE.md`

### Testing:
- Jest: https://jestjs.io/
- React Testing Library: https://testing-library.com/
- Accessibility: https://www.deque.com/axe/

### Medical Resources:
- CDC: https://www.cdc.gov/
- WHO: https://www.who.int/
- Medical Terms: Ask medical expert

---

**🎉 Remember: Quality over speed! It's better to ask for help and do it right than to guess and potentially affect medical accuracy.**

**Updated**: 2025-07-28 12:30:00