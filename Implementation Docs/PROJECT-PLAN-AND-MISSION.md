# TruAsset Website Redesign - Project Plan & Mission Document
**Processed & Analyzed by Val Vinnakota | January 2026**

---

## 📋 EXECUTIVE SUMMARY

### Project Overview
Redesign the TruAsset website to achieve:
1. **100% ADA Compliance** (currently at 47%)
2. **Modern, streamlined look and feel**
3. **Improved user experience and information architecture**
4. **Enhanced accessibility for all users**

### Timeline
- **Project Start:** January 6, 2026
- **Phase 1 Deliverable:** 4 Homepage Design Variations
- **Delivery Format:** HTML + CSS + JS (no framework)

### Stakeholders
- **Client:** Jason Byers (TruAsset)
- **Agency:** Brandcave
- **Project Lead:** Cody Miles
- **Designer/Developer:** Val Vinnakota

---

## 🎯 PROJECT MISSION

### Core Objectives
1. **ADA Compliance First**: Achieve 100% accessibility compliance
   - High contrast color schemes
   - Larger, more readable font sizes
   - Proper semantic HTML structure
   - Alt text for all images
   - Keyboard navigation support
   - Screen reader compatibility
   - WCAG 2.1 Level AA standards

2. **Visual Modernization**: Transform the dated Bootstrap-based design into a contemporary, engaging experience

3. **Content Streamlining**: Reorganize information architecture for better user flow and conversion

4. **Maintain WordPress Compatibility**: Build with vanilla HTML/CSS/JS for easy WordPress theme integration

---

## 🏗️ TECHNICAL APPROACH

### Technology Stack
**CONFIRMED:** Vanilla HTML + CSS + JavaScript ONLY
- ✅ No Bootstrap
- ✅ No Tailwind
- ✅ No frameworks
- ✅ Clean, semantic HTML5
- ✅ Modern CSS3 (Grid, Flexbox, Custom Properties)
- ✅ Vanilla JavaScript for interactions
- ✅ WordPress-ready code structure

### Why This Approach?
- Cody can easily integrate into existing WordPress theme
- Full control over accessibility features
- Smaller file sizes and better performance
- No dependency management
- Direct conversion to Figma for final source of truth

### Design System
- **Custom design system** inspired by modern SaaS websites
- Not bound to Bootstrap's constraints
- ADA-compliant color palette (contrast ratios ≥ 4.5:1)
- Scalable typography system
- Flexible component library

---

## 📂 PROJECT STRUCTURE

### Available Assets

#### 1. Company Branding
- **Logo:** `truasset-logo.svg` (Blue brand mark with company name)
- **Brand Color:** Primary Blue (#0069BD)

#### 2. Compliance Organization Logos
- 5 compliance org logos (SVG format)
- For "Trusted by" or credibility sections

#### 3. Customer/User Images
- Clinical Engineering Woman
- Environmental Services Woman
- Independent Service Org Woman
- Maintenance Man
- Customer Distribution Map

#### 4. Product Screenshots
- Product dashboard screenshot
- Product viewed in tablet (2 variations)
- Work order viewed in tablet

#### 5. Blog/Resource Images
- AI in Healthcare Tech
- Environmental Services
- Fireworks (celebration)
- Household PM Schedules
- Summertime Boredom

---

## 🗺️ CURRENT WEBSITE INFORMATION ARCHITECTURE

### Existing Pages (from screenshots):

#### Primary Navigation
1. **Homepage** (`/`)
   - Hero: "CMMS Software: HTM Management on the Move"
   - Product showcase
   - Compliance logos
   - Features overview
   - CTA: Request Demo + Watch Video

2. **Features** (`/features/`)
   - Main hub page: "Make Maintenance Management Easy"
   - Sub-pages:
     - Work Order Management
     - Asset Management
     - Reporting
     - Contract Management
     - P.O. & Invoice Tracking
     - Service Request Systems
     - Field Service Reporting
     - Parts Management
     - Project Management
     - Integrations
     - Hardware

3. **Customers** (`/customers/`)
   - Hub page: "Built for High-Performance Teams"
   - Customer segments:
     - Independent Service Orgs
     - Maintenance
     - Clinical Engineering
     - Environmental Services
   - Sub-pages:
     - Equipment Tracking System
     - Medical Inventory Management Software

4. **Company** (`/company/`)
   - CMMS Healthcare focus
   - About TruAsset

5. **Contact** (`/contact/`)
   - Contact form
   - Phone: 214-276-1280

6. **Resources** (`/blog/`)
   - Blog articles and resources

#### Footer Pages
- Privacy Policy
- Terms & Conditions
- Hospital Facilities Management

---

## 🎨 PROPOSED INFORMATION ARCHITECTURE IMPROVEMENTS

### IA Variation 1: **Conversion-Focused**
```
Homepage
├── Product (merged Features)
│   ├── Overview
│   ├── Work Order Management
│   ├── Asset Management
│   ├── Reporting & Analytics
│   └── Integrations
├── Solutions (merged Customers)
│   ├── By Team
│   │   ├── Maintenance
│   │   ├── Clinical Engineering
│   │   ├── Environmental Services
│   │   └── Independent Service Orgs
│   └── By Need
│       ├── Equipment Tracking
│       ├── Inventory Management
│       └── Compliance Management
├── Pricing
├── Resources
│   ├── Blog
│   ├── Case Studies
│   ├── Documentation
│   └── Webinars
├── Company
│   ├── About
│   ├── Careers
│   └── Contact
└── Request Demo (CTA)
```

### IA Variation 2: **Feature-First**
```
Homepage
├── Features
│   ├── All Features (hub)
│   ├── Core Features (top 5)
│   └── Advanced Features
├── Industries
│   ├── Healthcare Facilities
│   ├── Hospital Systems
│   └── Independent Service Providers
├── Solutions
│   ├── For Maintenance Teams
│   ├── For Clinical Engineering
│   ├── For Environmental Services
│   └── For ISOs
├── Why TruAsset
│   ├── Customer Stories
│   ├── ROI Calculator
│   └── Compliance & Security
├── Resources & Support
└── Get Started
```

### IA Variation 3: **User Journey-Based**
```
Homepage
├── Explore
│   ├── How It Works
│   ├── Product Tour
│   └── Live Demo
├── Features
│   ├── For Your Team
│   ├── For Managers
│   └── For Leadership
├── Success Stories
│   ├── Case Studies
│   ├── Customer Map
│   └── Testimonials
├── Learn
│   ├── Blog
│   ├── Guides
│   ├── Videos
│   └── FAQs
├── Company
└── Contact Sales
```

### IA Variation 4: **Simplified Modern SaaS**
```
Homepage
├── Product
├── Solutions
├── Customers
├── Pricing
├── Resources
├── Company
└── Contact
```
*(Simple top-level with rich mega-menus)*

---

## 🎨 DESIGN DIRECTION & INSPIRATION

### Reference Websites
1. **Getclair.com** ⭐ (Val's preferred)
   - Webflow-based
   - Clean, modern aesthetic
   - Smooth animations
   - Dark teal gradient backgrounds
   - Excellent use of whitespace
   - Mobile mockup integration

2. **Acquire.com**
   - Bold typography
   - High contrast
   - Clear CTAs
   - Minimalist approach

3. **Unloop.so**
   - Modern SaaS aesthetic
   - Good use of color
   - Clean layouts

### Key Design Principles
1. **Accessibility First**
   - WCAG 2.1 Level AA compliance
   - 4.5:1 contrast ratio minimum
   - Large, readable fonts (16px base minimum)
   - Clear focus states
   - Logical tab order

2. **Modern & Clean**
   - Generous whitespace
   - Contemporary typography
   - Smooth transitions
   - Purposeful animations
   - Mobile-first responsive design

3. **Trust & Credibility**
   - Display compliance logos prominently
   - Customer testimonials
   - Security badges
   - Professional imagery

4. **Conversion-Optimized**
   - Clear CTAs (Request Demo)
   - Reduced friction
   - Streamlined forms
   - Strategic social proof placement

---

## 🎯 PHASE 1 DELIVERABLES

### 4 Homepage Design Variations

Each variation will be:
- **Unique visual direction**
- **Different layout approach**
- **Varied information hierarchy**
- **Distinct animation/interaction style**
- **100% ADA compliant**

#### Variation 1: **Bold & Confident**
- Large hero with gradient background (inspired by Clair)
- Product screenshot integration
- Animated statistics
- Dark color scheme with high contrast

#### Variation 2: **Clean & Minimal**
- Light, airy design
- Lots of whitespace
- Simple animations
- Focus on clarity and readability

#### Variation 3: **Feature-Rich**
- Interactive feature showcase
- Tabbed content sections
- Product demo embedded
- More content-dense but organized

#### Variation 4: **Trust-Focused**
- Customer-first approach
- Large testimonials
- Compliance badges prominent
- Social proof throughout

---

## 📐 DESIGN SPECIFICATIONS

### Typography Scale (ADA Compliant)
```css
Base: 18px (increased from typical 16px)
H1: 48px - 56px (3rem - 3.5rem)
H2: 36px - 42px (2.25rem - 2.625rem)
H3: 28px - 32px (1.75rem - 2rem)
H4: 24px (1.5rem)
Body: 18px (1.125rem)
Small: 16px (1rem) - minimum size
```

### Color System (ADA Compliant)
```css
Primary Brand:
- Blue: #0069BD (existing)
- Accessible alternatives for low vision

High Contrast Combinations:
- Text on background: ≥ 4.5:1 ratio
- Large text: ≥ 3:1 ratio
- Interactive elements: ≥ 3:1 ratio

Proposed Palette:
- Primary: #0069BD
- Primary Dark: #004A8F (for contrast)
- Primary Light: #3399FF
- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444
- Gray Scale: #1F2937 to #F9FAFB
```

### Spacing System
```css
4px base unit (0.25rem)
Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px
```

### Breakpoints
```css
Mobile: 0 - 639px
Tablet: 640px - 1023px
Desktop: 1024px - 1279px
Large: 1280px+
```

---

## 🚀 DEVELOPMENT APPROACH

### File Structure (Per Variation)
```
variation-1/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── typography.css
│   ├── layout.css
│   ├── components.css
│   └── styles.css
├── js/
│   ├── navigation.js
│   ├── animations.js
│   └── main.js
└── assets/
    ├── images/
    ├── icons/
    └── fonts/
```

### HTML Standards
- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ARIA labels where needed
- Alt text for all images
- Proper heading hierarchy (h1 → h2 → h3)
- Skip links for keyboard navigation
- Form labels and error states

### CSS Standards
- CSS Custom Properties (variables)
- CSS Grid for layouts
- Flexbox for components
- Mobile-first media queries
- Organized by ITCSS methodology
- No preprocessors (vanilla CSS)

### JavaScript Standards
- ES6+ syntax
- No jQuery
- No external libraries (unless absolutely necessary)
- Vanilla JS for:
  - Mobile menu toggle
  - Scroll animations
  - Form validation
  - Smooth scrolling

---

## 📋 CONTENT REQUIREMENTS

### Pages to Create (Phase 1)
1. **Homepage** (4 variations)
   - Hero section
   - Features overview
   - Customer logos/testimonials
   - Product showcase
   - CTA sections

### Content to Include
- Company name: TruAsset
- Tagline: "CMMS Software: HTM Management on the Move"
- Phone: 214-276-1280
- Primary CTA: "Request Demo"
- Secondary CTA: "Watch Video"
- Key features copy
- Compliance organization logos

---

## ✅ ADA COMPLIANCE CHECKLIST

### Visual
- [ ] Color contrast ≥ 4.5:1 for normal text
- [ ] Color contrast ≥ 3:1 for large text (18px+)
- [ ] Color is not the only indicator (use icons/text)
- [ ] Text resizable to 200% without loss of functionality
- [ ] Sufficient line height (1.5 minimum)
- [ ] Sufficient letter spacing

### Structure
- [ ] Proper heading hierarchy
- [ ] Semantic HTML elements
- [ ] Landmarks (header, nav, main, footer)
- [ ] Skip navigation link
- [ ] Focus visible on all interactive elements
- [ ] Logical tab order

### Content
- [ ] Alt text for all images
- [ ] Captions for videos
- [ ] Text alternatives for icons
- [ ] Form labels associated with inputs
- [ ] Error messages clear and accessible
- [ ] Link text is descriptive

### Interaction
- [ ] Keyboard accessible (no mouse required)
- [ ] Focus trap in modals
- [ ] ARIA labels for dynamic content
- [ ] Loading states announced
- [ ] Error states announced

---

## 🎬 ANIMATION & INTERACTION GUIDELINES

### Allowed Animations (ADA-Friendly)
- Fade-in on scroll (subtle, <300ms)
- Button hover states (instant feedback)
- Menu transitions (smooth, predictable)
- Loading indicators (clear purpose)

### Animations to Avoid
- Auto-playing videos with sound
- Flashing/strobing effects
- Parallax scrolling (can cause motion sickness)
- Rapid transitions (>3Hz)
- Animations without pause controls

### Implementation
```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🔄 WORKFLOW

### Development Process
1. **Vibe Code** each variation in vanilla HTML/CSS/JS
2. **Test** for ADA compliance using:
   - [WAVE Browser Extension](https://wave.webaim.org/extension/)
   - [axe DevTools](https://www.deque.com/axe/devtools/)
   - Keyboard-only navigation
   - Screen reader testing (NVDA/JAWS)
3. **Review** with Cody for direction approval
4. **Convert** approved variation(s) to Figma
5. **Finalize** in Figma as source of truth
6. **Handoff** Figma designs to Cody for WordPress integration

### Version Control
- Each variation in separate folder
- Git repository for tracking
- Clear commit messages
- Branch per variation

---

## 📊 SUCCESS METRICS

### Accessibility
- ✅ 100% ADA compliance score
- ✅ WCAG 2.1 Level AA certification
- ✅ Zero critical accessibility errors

### Performance
- ✅ Lighthouse score: 90+ (Performance, Accessibility, Best Practices, SEO)
- ✅ Page load time: <2 seconds
- ✅ First Contentful Paint: <1 second

### User Experience
- ✅ Mobile-responsive across all devices
- ✅ Intuitive navigation
- ✅ Clear conversion paths
- ✅ Professional, modern aesthetic

---

## 🤔 QUESTIONS FOR CLARIFICATION

### Content Strategy
1. Should we create new copy or use existing content from screenshots?
2. Is there a content deck or copy document available?
3. Are there specific CTAs beyond "Request Demo" and "Watch Video"?

### Design Preferences
1. Does Jason have any brand preferences or competitors he admires?
2. Are there colors beyond the primary blue we should incorporate?
3. Any features that MUST be on the homepage?

### Scope
1. Are we designing just the homepage or multiple pages?
2. Should we show desktop, tablet, AND mobile views?
3. How many pages will eventually need redesign?

---

## 📅 NEXT STEPS

### Immediate Actions
1. ✅ **Create 4 homepage variations** using vanilla HTML+CSS+JS
2. ✅ **Ensure 100% ADA compliance** in each variation
3. ✅ **Test across devices** and browsers
4. ✅ **Document design decisions** for each variation
5. ⏳ **Present to Cody** for feedback and direction
6. ⏳ **Convert approved variation** to Figma

### Future Phases
- Design additional pages based on approved direction
- Create component library in Figma
- Provide WordPress integration support
- Post-launch accessibility audit

---

## 📎 RESOURCES & REFERENCES

### Inspiration Websites
- https://getclair.com/ ⭐
- https://acquire.com/
- https://www.unloop.so/

### Accessibility Tools
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Accessibility Tool](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Accessibility Insights](https://accessibilityinsights.io/)

### ADA Guidelines
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Articles](https://webaim.org/articles/)
- [A11y Project](https://www.a11yproject.com/)

### Design Tools
- Figma (final source of truth)
- VS Code (development)
- Browser DevTools (testing)

---

## 🎯 PROJECT VISION

**Transform TruAsset's website from a functional but dated Bootstrap template into a modern, accessible, conversion-focused digital experience that positions them as the leading CMMS solution for healthcare facilities.**

### Core Values
1. **Accessibility First**: Every user, regardless of ability, deserves a great experience
2. **Clarity Over Complexity**: Simple, clear communication wins
3. **Trust Through Design**: Professional aesthetics build credibility
4. **Performance Matters**: Fast, efficient, optimized code

---

**Document Version:** 1.0  
**Last Updated:** January 7, 2026  
**Next Review:** After Phase 1 completion

---

*This document serves as the single source of truth for the TruAsset redesign project. All design and development decisions should align with the principles and specifications outlined here.*
