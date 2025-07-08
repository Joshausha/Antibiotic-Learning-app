# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm start` - Start development server with hot reload
- `npm test` - Run all tests with Jest
- `npm run build` - Build production bundle
- `npm run test:watch` - Run tests in watch mode

## Architecture Overview

This is a React 18.2.0 medical education application for learning about antibiotics, pathogens, and antimicrobial resistance. The app uses a tab-based navigation system with five main sections.

### Core Architecture Pattern
- **React Context API** for global state management (UserContext)
- **Custom hooks** for reusable logic (useUserProgress, useErrorHandler)
- **Component-based architecture** with clear separation of concerns
- **Webpack** build system with custom configuration
- **Tailwind CSS** for styling (recently migrated from CDN to local)

### Key Architecture Components

#### State Management
- **UserContext** (`src/context/UserContext.js`) - Manages user progress, quizzes, and achievements
- **localStorage** - Persistent user data storage
- **useUserProgress** custom hook - Handles progress tracking and quiz state

#### Navigation System
- **Header** (`src/components/Header.js`) - Tab-based navigation with active state management
- **App** (`src/components/App.js`) - Main component that renders active tab content
- Five main tabs: Home, Conditions, Quiz, Pathogen Explorer, Antibiotic Explorer

#### Data Structure
Located in `/src/data/` - All medical data is stored as JavaScript modules:
- `conditions.js` - 20 medical conditions across 10 categories
- `quizQuestions.js` - 79+ quiz questions with difficulty levels
- `pathogens.js` - 10 common pathogens
- `antibiotics.js` - 15 common antibiotics
- `RBO_JSON.js` - Medical reference data (833 lines)

#### Error Handling Pattern
- **Error boundaries** with custom error handling
- **useErrorHandler** hook for consistent error management
- **Graceful fallbacks** for all major components

## Critical Development Patterns

### Data Flow
1. User actions trigger state changes in UserContext
2. Progress is persisted to localStorage
3. Components consume context state via useContext
4. Quiz state is managed through useUserProgress hook

### Component Organization
- **Feature-based components** in `/src/components/`
- **Reusable UI components** with consistent styling
- **Lazy loading** for performance optimization
- **Responsive design** with mobile-first approach

### Testing Strategy
- **Jest** with React Testing Library
- **Integration tests** for major user flows
- **Component tests** for individual components
- Test files located in `/src/tests/`

## Recent Enhancements

### Tailwind CSS Migration
- Migrated from CDN to local installation
- Custom configuration in `tailwind.config.js`
- Custom CSS classes in `src/index.css`

### New Components Added
- **SkeletonLoader** - Loading state components
- **ErrorMessage** - User-friendly error displays
- **ProgressIndicator** - Multiple progress visualization types
- **Enhanced QuizProgress** - Real-time quiz statistics
- **QuizAnalyticsDashboard** - Comprehensive analytics dashboard with data visualizations

### Content Enhancements
- **25+ new quiz questions** generated with difficulty levels
- **15 resistance scenarios** - Clinical case studies
- **Enhanced medical data** with quality validation
- **Difficulty classification** - Beginner/Intermediate/Advanced

### Analytics Dashboard Features
- **Real-time Performance Charts** - Visual representation of quiz progress over time
- **Category Performance Analysis** - Radar charts showing knowledge strengths across medical categories
- **Difficulty Progression Tracking** - Visual breakdown of performance by difficulty level
- **Learning Streak Visualization** - Gamified progress tracking with streak counters
- **Topic Analysis** - Automated identification of knowledge strengths and weaknesses
- **Interactive Timeline** - Recent activity tracking with detailed quiz history
- **Personalized Recommendations** - AI-powered learning suggestions based on performance data
- **Time Range Filtering** - Customizable analytics views (all time, weekly, monthly, quarterly)
- **Mobile-Responsive Design** - Fully optimized for all device sizes

## Build System

### Webpack Configuration
- Custom webpack config for asset handling
- Babel transpilation for modern JavaScript
- CSS processing with PostCSS
- Development server with hot reload

### Bundle Structure
- Entry point: `src/index.js`
- CSS imports: `src/index.css` (includes Tailwind)
- Asset optimization for production builds

## Important Notes

- Medical data should be validated before adding new content
- Quiz questions follow specific format with ID, difficulty, and medical accuracy
- Progress tracking is essential for user experience
- Error handling must be comprehensive for medical education app
- All components should be responsive and accessible