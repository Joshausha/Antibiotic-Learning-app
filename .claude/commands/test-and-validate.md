# Test and Validate Command

## Description
Run comprehensive testing and validation for the Antibiotic Learning App.

## Usage
`/test-and-validate [scope]`

## Prompt
You are running comprehensive tests and validation for the Antibiotic Learning App medical education platform.

**THINK HARDER** - Consider all quality assurance aspects for medical education software.

Execute this testing process:

1. **Automated Test Suite**:
   - Run `npm test` for Jest + React Testing Library
   - Check test coverage with `npm run test:coverage`
   - Verify all tests pass with detailed output
   - Review any flaky or failing tests

2. **Medical Content Validation**:
   - Run Python content validation scripts:
     - `python content_tester.py` for quiz questions
     - `python data_validator.py` for medical data
   - Review comprehensive_test_report.txt for issues
   - Check for medical accuracy and evidence-based content

3. **Build and Bundle Analysis**:
   - Run `npm run build` to verify production build
   - Check bundle size (target: 65-70 kB gzipped)
   - Review webpack bundle analyzer output
   - Verify all assets load correctly

4. **Browser Testing** (if Puppeteer available):
   - Test core user workflows
   - Verify responsive design across devices
   - Check accessibility compliance
   - Test quiz functionality end-to-end

5. **Performance Validation**:
   - Measure loading times
   - Check mobile performance
   - Verify memory usage patterns
   - Test with slow network conditions

6. **Quality Gates**:
   - Test coverage > 80%
   - Medical content accuracy > 90%
   - Bundle size < 70 kB gzipped
   - Zero critical accessibility issues
   - All user flows working correctly

7. **Documentation Review**:
   - Update CLAUDE.md with any changes
   - Verify README accuracy
   - Check code comments and documentation
   - Update integration guides if needed

Report Results:
- Provide detailed test summary
- List any issues found with severity
- Recommend fixes for failing tests
- Document performance metrics
- Suggest optimizations if needed

Remember: Medical education software must meet the highest quality standards.