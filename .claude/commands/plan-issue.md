# Plan Issue Command

## Description
Break down GitHub issues into atomic, manageable tasks using structured planning approach.

## Usage
`/plan-issue [issue-number]`

## Prompt
You are working on the Antibiotic Learning App, a React 18.2.0 medical education platform. 

**THINK HARDER** - Use your deepest reasoning capabilities to analyze this issue.

Please follow this planning process:

1. **Context Gathering**:
   - Use `gh issue view {issue-number}` to get full issue details
   - Search scratchpads/ directory for related previous work
   - Review recent PRs with `gh pr list --limit 5`
   - Check current project status in CLAUDE.md

2. **Issue Analysis**:
   - Break down the issue into 3-7 atomic tasks
   - Identify dependencies between tasks
   - Assess medical content accuracy requirements
   - Estimate complexity and testing needs

3. **Task Definition**:
   - Each task should be completable in 30-60 minutes
   - Include acceptance criteria
   - Specify testing requirements
   - Note any medical education considerations

4. **Documentation**:
   - Create scratchpad file: `scratchpads/issue-{number}-{title}.md`
   - Include issue link and context
   - Document plan with clear task breakdown
   - Add links to related PRs and issues

5. **Quality Considerations**:
   - Medical content must be evidence-based
   - All changes need comprehensive tests
   - Bundle size impact assessment
   - Accessibility compliance check

Remember: This is a medical education app - accuracy and reliability are paramount.