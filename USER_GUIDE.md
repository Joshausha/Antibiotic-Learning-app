# Simple Pathogen Explorer User Guide

⚠️ **IMPORTANT**: This guide describes intended functionality that is currently **unverified**. See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for actual working features. Use this guide as a reference for expected behavior, not confirmed functionality.

## 🚀 Installation & Startup

### **Prerequisites**
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

### **Quick Start Options**

#### **Option 1: Simple Explorer (Recommended)**
```bash
npm run simple-explorer
```
This starts the development server and opens the Simple Pathogen Explorer.

#### **Option 2: Development Mode**
```bash
npm run dev
# or
npm start
```
Then open `http://localhost:3000` and navigate to "Simple Explorer" tab.

#### **Option 3: Production Build**
```bash
npm run build:serve
```
Builds the optimized version and serves it locally.

### **All Available Commands**
| Command | Purpose |
|---------|---------|
| `npm run simple-explorer` | Quick start with friendly message |
| `npm run dev` | Start development server |
| `npm start` | Start development server (standard) |
| `npm run build` | Create production build |
| `npm run serve` | Serve production build locally |
| `npm run build:serve` | Build and serve in one command |
| `npm run test` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run deploy:local` | Full deployment (test + build + serve) |

---

## 🎯 Quick Start Guide

Welcome to the Simple Pathogen Explorer! This tool helps you explore pathogen-antibiotic relationships for medical education and clinical decision support.

### Getting Started (2 minutes)

1. **Start the Application**: Run `npm run simple-explorer` in your terminal
2. **Access the Tool**: Navigate to the **"Simple Explorer"** tab in the main navigation
3. **Choose Your View**: Select between **List View** (detailed exploration) or **Network View** (visual relationships)
4. **Explore Pathogens**: Click on any pathogen to see its details and effective antibiotics
5. **Understand Effectiveness**: Look for color-coded indicators (🟢 High, 🟡 Medium, 🟠 Low, 🔴 Resistant)

---

## 📋 Overview of Features

### **Core Capabilities**
- ✅ **10 Common Pathogens** with complete clinical data
- ✅ **15 Essential Antibiotics** with mechanisms and effectiveness
- ✅ **Interactive Network Visualization** showing pathogen relationships
- ✅ **Smart Search & Filtering** by name, Gram status, and severity
- ✅ **Clinical Context** with infection sites and resistance patterns

### **Two Exploration Modes**

#### 📄 **List View** (Best for detailed study)
- Comprehensive pathogen list with search and filters
- Detailed pathogen cards with clinical information
- Antibiotic effectiveness grouped by level
- Perfect for systematic learning

#### 🌐 **Network View** (Best for understanding relationships)
- Interactive SVG visualization of pathogen connections
- Nodes colored by Gram status (Purple = Gram+, Red = Gram-)
- Connection lines show shared antibiotic coverage
- Zoom, pan, and click interactions

---

## 🎓 Step-by-Step Tutorials

### **Tutorial 1: Finding the Right Antibiotic for a Pathogen**

**Scenario**: You need to find effective antibiotics for *Staphylococcus aureus*

1. **Navigate** to Simple Explorer tab
2. **Search** for "staph" in the search box
3. **Click** on "Staphylococcus aureus" in the list
4. **Review** the pathogen card for clinical context
5. **Examine** the antibiotic list on the right
6. **Identify** high-effectiveness options (green indicators)
7. **Note** resistance patterns and clinical notes

**Result**: You'll see Vancomycin and Linezolid as high-effectiveness options for MRSA

### **Tutorial 2: Comparing Gram-Positive vs Gram-Negative Coverage**

**Scenario**: Understanding antibiotic spectrum differences

1. **Use Filter** dropdown to select "Gram Positive"
2. **Select** a pathogen (e.g., *Streptococcus pneumoniae*)
3. **Note** the effective antibiotics
4. **Change Filter** to "Gram Negative"
5. **Select** a pathogen (e.g., *Escherichia coli*)
6. **Compare** antibiotic differences

**Result**: You'll notice β-lactam effectiveness varies significantly between groups

### **Tutorial 3: Exploring Pathogen Networks**

**Scenario**: Understanding which pathogens share treatment options

1. **Switch** to Network View
2. **Observe** pathogen positioning (circular layout)
3. **Look** for connection lines between pathogens
4. **Hover** over nodes to see pathogen details
5. **Click** nodes to select and highlight connections
6. **Use** zoom controls to focus on specific areas

**Result**: Connected pathogens share effective antibiotics, helping identify broad-spectrum options

### **Tutorial 4: Resistance Pattern Analysis**

**Scenario**: Learning about antibiotic resistance

1. **Search** for "MRSA" or select *Staphylococcus aureus*
2. **Review** resistance information in pathogen card
3. **Examine** antibiotic list for resistant options (red indicators)
4. **Read** clinical notes explaining resistance mechanisms
5. **Compare** with susceptible alternatives

**Result**: Understanding why certain antibiotics are ineffective and alternatives needed

---

## 📖 Detailed Feature Reference

### **🔍 Search Functionality**

**What it does**: Real-time search across pathogen names, common names, and descriptions

**How to use**:
- Type in the search box at the top of the pathogen list
- Search is case-insensitive and searches partial matches
- Examples: "staph", "coli", "pneumonia", "skin"

**Search Tips**:
- Use common names: "staph" finds *Staphylococcus aureus*
- Use infection sites: "pneumonia" finds respiratory pathogens
- Use partial words: "strep" finds all Streptococcus species

### **🎛️ Filter Controls**

#### **Gram Status Filter**
- **All Gram Status**: Shows all pathogens (default)
- **Gram Positive**: Purple-coded pathogens (thick peptidoglycan wall)
- **Gram Negative**: Red-coded pathogens (thin peptidoglycan, outer membrane)

#### **Severity Filter**
- **All Severity**: Shows all pathogens (default)
- **High Severity**: Life-threatening pathogens requiring immediate treatment
- **Medium Severity**: Moderate infections, hospitalization may be needed
- **Low Severity**: Mild infections, often outpatient treatment

### **📊 Effectiveness Indicators**

The color-coding system helps quickly identify appropriate antibiotics:

| Color | Meaning | Clinical Interpretation |
|-------|---------|------------------------|
| 🟢 **Green** | High Effectiveness | First-line therapy, excellent clinical outcomes |
| 🟡 **Yellow** | Medium Effectiveness | Second-line therapy, good clinical outcomes |
| 🟠 **Orange** | Low Effectiveness | Limited utility, consider alternatives |
| 🔴 **Red** | Resistant | Avoid - pathogen is resistant to this antibiotic |

### **🦠 Pathogen Information**

Each pathogen card includes:

- **Basic Properties**: Gram status, shape (cocci/rod), severity level
- **Clinical Description**: What infections it causes
- **Common Sites**: Where infections typically occur
- **Resistance Pattern**: Known resistance mechanisms
- **ID Number**: For reference and data tracking

### **💊 Antibiotic Information**

Each antibiotic entry includes:

- **Drug Name**: Generic name (e.g., Penicillin)
- **Class**: Drug category (e.g., Beta-lactam)
- **Mechanism**: How it works (e.g., Cell wall synthesis inhibition)
- **Route**: Administration method (IV/PO/IM)
- **Effectiveness**: Against the selected pathogen
- **Clinical Notes**: Specific usage considerations

### **🌐 Network Visualization Features**

#### **Node Properties**
- **Size**: Larger nodes indicate higher clinical severity
- **Color**: Purple (Gram+), Red (Gram-), Blue (selected)
- **Position**: Circular layout for optimal viewing

#### **Connection Lines**
- **Presence**: Indicates shared effective antibiotics
- **Thickness**: Number of shared high-effectiveness antibiotics
- **Meaning**: Pathogens with connections have similar treatment options

#### **Interactive Controls**
- **Zoom In/Out**: + and - buttons or mouse wheel
- **Reset Zoom**: Reset button returns to 100%
- **Pan**: Click and drag to move view
- **Labels**: Toggle button to show/hide pathogen names

---

## 🎯 Educational Context

### **Learning Objectives**

After using the Simple Pathogen Explorer, learners should be able to:

1. **Identify Common Pathogens**: Recognize 10 clinically important organisms
2. **Understand Gram Classification**: Distinguish Gram-positive from Gram-negative bacteria
3. **Select Appropriate Antibiotics**: Choose effective treatments based on pathogen
4. **Recognize Resistance Patterns**: Understand why certain antibiotics fail
5. **Apply Clinical Reasoning**: Make evidence-based antimicrobial decisions

### **Target Audiences**

#### **👨‍🎓 Medical Students**
- **Use Case**: Learning basic infectious disease principles
- **Focus**: Pathogen recognition, antibiotic mechanisms
- **Workflow**: Systematic exploration of pathogen-antibiotic pairs

#### **👩‍⚕️ Residents**
- **Use Case**: Clinical decision support for patient care
- **Focus**: Resistance patterns, treatment alternatives
- **Workflow**: Quick lookup for specific clinical scenarios

#### **👩‍⚕️ Nurses**
- **Use Case**: Understanding antimicrobial therapy rationale
- **Focus**: Drug classes, administration routes, monitoring
- **Workflow**: Educational reinforcement of prescribed treatments

#### **🧑‍🏫 Educators**
- **Use Case**: Teaching infectious disease concepts
- **Focus**: Interactive demonstrations, case-based learning
- **Workflow**: Guided exploration during lectures or tutorials

### **Clinical Pearls**

#### **🔬 Gram Staining Significance**
- **Gram-positive** (purple/blue): Thick peptidoglycan wall, susceptible to β-lactams
- **Gram-negative** (pink/red): Outer membrane barrier, often more resistant

#### **🧬 Resistance Mechanisms**
- **β-lactamase**: Enzymes that break down penicillins/cephalosporins
- **MRSA**: Methicillin-resistant *Staphylococcus aureus*
- **ESBL**: Extended-spectrum β-lactamases in Gram-negatives
- **VRE**: Vancomycin-resistant enterococci

#### **🎯 Treatment Principles**
- **Narrow Spectrum**: Use most specific antibiotic possible
- **Broad Spectrum**: For empiric therapy before culture results
- **Combination Therapy**: For severe infections or resistant organisms
- **De-escalation**: Switch to narrow spectrum based on culture results

---

## 🔧 Troubleshooting & FAQ

### **Common Issues**

#### **Q: No pathogens showing in the list**
**A**: Check your filters - try selecting "All Gram Status" and "All Severity" to reset

#### **Q: Search not returning expected results**
**A**: Try different terms:
- Use common names: "staph" instead of "Staphylococcus"
- Use partial matches: "pneum" finds pneumonia-related organisms
- Check spelling and try synonyms

#### **Q: Network view is empty or not loading**
**A**: 
- Ensure you're in Network View mode (toggle at top)
- Try refreshing the page
- Check that pathogens are available (at least 2 needed for connections)

#### **Q: Can't see effectiveness colors**
**A**: 
- Select a pathogen first to see its antibiotics
- Colors appear in the antibiotic list on the right side
- Ensure you're looking at the antibiotic effectiveness badges

#### **Q: Network connections not showing**
**A**: 
- Connections only appear between pathogens with shared effective antibiotics
- Try selecting different pathogens to highlight their connections
- Some pathogens may have few shared treatment options

### **Performance Tips**

#### **🚀 Optimizing Your Experience**
- **Use specific searches** instead of browsing all pathogens
- **Apply filters** to reduce list size for better performance
- **Close pathogen details** when not needed to reduce memory usage
- **Use List View** for detailed study, Network View for relationships

#### **📱 Mobile Usage**
- **Rotate to landscape** for better network visualization
- **Use List View** primarily on smaller screens
- **Tap and hold** for mobile interactions in network view
- **Zoom carefully** to avoid losing context

### **Data Limitations**

#### **⚠️ Important Disclaimers**
- **Educational Tool**: This is for learning, not clinical decision-making
- **Simplified Data**: Real clinical scenarios are more complex
- **Limited Scope**: Only 10 pathogens and 15 antibiotics represented
- **Static Data**: No real-time resistance surveillance data

#### **🔄 Future Enhancements**
The tool is designed for expansion with:
- Additional pathogens and antibiotics
- Regional resistance patterns
- Dosing information
- Drug interactions
- Cost considerations

---

## 📚 Additional Resources

### **Clinical References**
- **Sanford Guide**: Antimicrobial therapy reference
- **IDSA Guidelines**: Infectious Diseases Society of America
- **CDC**: Antibiotic resistance and stewardship resources
- **Local Antibiogram**: Institution-specific resistance patterns

### **Educational Materials**
- **Medical Microbiology Textbooks**: For detailed pathogen information
- **Pharmacology Resources**: For antibiotic mechanisms and kinetics
- **Case-Based Learning**: Apply knowledge to clinical scenarios
- **Resistance Surveillance**: Track local and global resistance trends

### **Getting Help**
- **Technical Issues**: Check troubleshooting section above
- **Clinical Questions**: Consult appropriate medical references
- **Educational Support**: Contact your institution's medical education team

---

## 🎉 Conclusion

The Simple Pathogen Explorer provides an interactive, educational approach to learning pathogen-antibiotic relationships. By combining visual exploration with clinical data, it supports evidence-based learning for healthcare professionals at all levels.

**Remember**: This tool is designed for educational purposes. Always consult current clinical guidelines, local resistance patterns, and healthcare providers for patient care decisions.

---

*For technical support or suggestions, please refer to the development team or submit feedback through appropriate channels.*