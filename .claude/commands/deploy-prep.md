# Deploy Prep Command

## Description
Prepare the Antibiotic Learning App for production deployment with comprehensive checks.

## Usage
`/deploy-prep [deployment-target]`

## Prompt
You are preparing the Antibiotic Learning App for production deployment.

**THINK HARDER** - Consider all production readiness aspects for medical education software.

Execute this deployment preparation process:

1. **Pre-Deployment Validation**:
   - Run full test suite: `npm test`
   - Execute content validation: `python content_tester.py`
   - Build production bundle: `npm run build`
   - Verify all quality gates pass

2. **Production Build Optimization**:
   - Check bundle size and optimization
   - Verify all assets are properly minified
   - Test production build locally: `npm run serve`
   - Confirm all features work in production mode

3. **Medical Content Review**:
   - Final medical accuracy verification
   - Check all quiz questions for clinical relevance
   - Verify pathogen and antibiotic data accuracy
   - Ensure evidence-based content throughout

4. **Security and Compliance**:
   - Review code for security vulnerabilities
   - Check for exposed sensitive data
   - Verify HIPAA compliance for medical content
   - Ensure proper error handling

5. **Performance and Accessibility**:
   - Run Lighthouse audit
   - Check mobile responsiveness
   - Verify accessibility compliance (WCAG 2.1)
   - Test loading performance

6. **Documentation and Communication**:
   - Update deployment documentation
   - Prepare release notes
   - Document any breaking changes
   - Update version numbers if needed

7. **Git and GitHub Preparation**:
   - Ensure working tree is clean
   - Create appropriate git tags
   - Update README with current status
   - Verify all commits are properly documented

8. **Rollback Plan**:
   - Document current production state
   - Prepare rollback procedure
   - Test rollback process
   - Document emergency contacts

9. **Post-Deployment Monitoring**:
   - Set up monitoring alerts
   - Prepare health check endpoints
   - Document expected metrics
   - Plan post-deployment verification

Final Checklist:
- [ ] All tests passing
- [ ] Bundle size within limits
- [ ] Medical content validated
- [ ] Security review complete
- [ ] Performance optimized
- [ ] Documentation updated
- [ ] Rollback plan ready
- [ ] Monitoring configured

Remember: Medical education software deployment requires extra diligence and validation.