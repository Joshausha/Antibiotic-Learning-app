# Contributing to Antibiotic Learning App

## Git Workflow Documentation

**Last Updated**: 2025-07-28 11:45:00

This document outlines the Git workflow and contribution guidelines for the Antibiotic Learning App, a production-ready React medical education platform.

## 🌟 Project Overview

The Antibiotic Learning App is a comprehensive medical education platform featuring:
- 30 antibiotics with detailed information
- 29 pathogens with interactive visualizations  
- 79+ quiz questions with difficulty classification
- 100% test coverage for medical data
- WCAG 2.1 accessibility compliance
- Advanced pathogen network visualization

## 🔄 Branching Strategy

### Main Branches

- **`master`**: Production-ready code only
  - All code in master should be deployable
  - Protected branch requiring pull request reviews
  - Automatic testing required before merge

- **`develop`**: Integration branch for features
  - Used for integrating feature branches
  - Should always be stable and testable
  - Merges to master trigger releases

### Feature Branches

- **`feature/<description>`**: Individual feature development
  - Branch from `develop`
  - Use descriptive names: `feature/enhanced-quiz-validation`
  - Delete after merging to `develop`

- **`hotfix/<description>`**: Emergency production fixes
  - Branch from `master`
  - Merge to both `master` and `develop`
  - Use for critical production issues only

### Branch Naming Conventions

```bash
feature/pathogen-network-visualization
feature/quiz-difficulty-classifier
hotfix/data-validation-error
hotfix/accessibility-compliance-fix
```

## 🚀 Development Workflow

### 1. Starting New Work

```bash
# Update your local develop branch
git checkout develop
git pull origin develop

# Create a new feature branch
git checkout -b feature/your-feature-name

# Start developing
npm start
```

### 2. Development Process

```bash
# Make your changes
# Run tests frequently
npm test

# Run linting and formatting
npm run lint
npm run format

# Build to verify no issues
npm run build
```

### 3. Committing Changes

#### Commit Message Format

```
<type>: <description>

<body>

Updated: YYYY-MM-DD HH:MM:SS
```

#### Commit Types

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `test:` Test additions/modifications
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `chore:` Maintenance tasks

#### Examples

```bash
git commit -m "feat: add pathogen resistance visualization

- Implement interactive network graph for pathogen relationships
- Add filtering by resistance patterns
- Include comprehensive accessibility features

Updated: 2025-07-28 11:45:00"
```

### 4. Pull Request Process

#### Before Creating Pull Request

```bash
# Ensure all tests pass
npm test -- --coverage --watchAll=false

# Verify build succeeds
npm run build

# Update from develop branch
git checkout develop
git pull origin develop
git checkout feature/your-feature-name
git rebase develop

# Push your branch
git push -u origin feature/your-feature-name
```

#### Pull Request Template

When creating a pull request, use this template:

```markdown
## Summary
Brief description of changes and their purpose.

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix/feature causing existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Medical Education Impact
- [ ] Affects antibiotic information accuracy
- [ ] Modifies pathogen data structures
- [ ] Changes quiz question logic
- [ ] Updates medical condition mappings

## Testing Checklist
- [ ] All existing tests pass
- [ ] New tests added for changes
- [ ] Manual testing completed
- [ ] Accessibility testing performed (if UI changes)
- [ ] Medical accuracy verified (if data changes)

## Code Quality Checklist
- [ ] Code follows project conventions
- [ ] No console errors or warnings
- [ ] Documentation updated if needed
- [ ] Performance impact assessed
- [ ] Security implications reviewed

## Screenshots/Recordings
[Add screenshots for UI changes or recordings for complex interactions]

## Additional Notes
[Any other relevant information for reviewers]
```

### 5. Code Review Guidelines

#### For Authors

- Keep pull requests focused and reasonably sized
- Provide clear descriptions and context
- Respond promptly to review feedback
- Update documentation with changes
- Ensure medical accuracy for health-related changes

#### For Reviewers

- Review within 2 business days
- Focus on medical accuracy, code quality, and user experience
- Test accessibility features if UI changes are involved
- Verify test coverage for new functionality
- Check for security implications

## 🧪 Testing Requirements

### Required Tests Before Merge

```bash
# Run full test suite
npm test -- --coverage --watchAll=false

# Verify build process
npm run build

# Check linting
npm run lint

# Verify accessibility (if applicable)
npm run test:a11y
```

### Test Coverage Requirements

- **Data Layer**: 100% coverage required (medical data accuracy critical)
- **Components**: Minimum 85% coverage
- **Hooks**: Minimum 90% coverage  
- **Utilities**: Minimum 95% coverage

### Medical Data Testing

Special attention required for:
- Antibiotic-pathogen mappings
- Drug resistance information
- Medical condition classifications
- Quiz question accuracy

## 📋 Definition of Done

A feature is considered complete when:

### Functional Requirements
- [ ] All acceptance criteria met
- [ ] Feature works as designed across all supported browsers
- [ ] No regressions in existing functionality
- [ ] Medical accuracy verified by domain expert

### Technical Requirements
- [ ] Code follows established patterns and conventions
- [ ] All tests pass with required coverage
- [ ] No build errors or warnings
- [ ] Security review completed (if applicable)

### Documentation Requirements
- [ ] Code is self-documenting with clear variable/function names
- [ ] Complex logic includes inline comments
- [ ] API changes documented
- [ ] User-facing changes documented

### Quality Assurance
- [ ] Accessibility standards met (WCAG 2.1)
- [ ] Performance impact assessed and acceptable
- [ ] Cross-browser compatibility verified
- [ ] Mobile responsiveness tested

## 🔧 Development Environment Setup

### Prerequisites

```bash
# Node.js 18+ required
node --version

# Install dependencies
npm install

# Set up Git hooks (if using Husky)
npm run prepare
```

### Recommended VS Code Extensions

- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- axe Accessibility Linter
- GitLens

### Environment Variables

Create `.env.local` for local development:

```env
REACT_APP_ENV=development
REACT_APP_API_BASE_URL=http://localhost:3001
```

## 🚨 Common Issues and Solutions

### Git Issues

**Problem**: Merge conflicts during rebase
```bash
# Resolve conflicts in your editor, then:
git add .
git rebase --continue
```

**Problem**: Need to update branch with latest develop
```bash
git checkout develop
git pull origin develop
git checkout feature/your-branch
git rebase develop
```

### Build Issues

**Problem**: Build fails after pulling changes
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Problem**: Tests fail unexpectedly
```bash
# Clear Jest cache
npm test -- --clearCache
npm test
```

### Medical Data Issues

**Problem**: Data validation errors
- Verify against authoritative medical sources
- Check data format consistency
- Ensure proper error handling for edge cases

## 📞 Getting Help

### Code Review Process
- Tag relevant team members for medical accuracy review
- Use draft PRs for work-in-progress feedback
- Schedule pair programming sessions for complex features

### Medical Content Review
- All medical content changes require domain expert review
- Reference authoritative sources (CDC, WHO, medical literature)
- Document sources for medical information updates

### Technical Questions
- Check existing documentation and code comments
- Search closed issues and pull requests
- Create discussion threads for architectural decisions

## 🎯 Project-Specific Guidelines

### Medical Education Standards
- All medical information must be current and evidence-based
- Drug interactions and contraindications require special attention
- Accessibility is critical for inclusive medical education

### Performance Considerations
- Target <100ms render times for quiz interactions
- Optimize image loading for pathogen visualizations
- Monitor bundle size for educational content delivery

### Data Integrity
- Implement comprehensive validation for medical data
- Use TypeScript interfaces for data structure enforcement
- Maintain audit trails for medical content changes

---

## 📝 Document Updates

This document should be updated whenever:
- Workflow processes change
- New tools are introduced
- Team structure evolves
- Project requirements shift

**Document Version**: 1.0
**Last Review**: 2025-07-28 11:45:00
**Next Review**: 2025-08-28