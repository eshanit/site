# PEGISUS Design System

## Overview
This design system is built following UNICEF compliance standards, accessibility guidelines, and best practices for youth-centric web development.

## Table of Contents
1. [Design Tokens](#design-tokens)
2. [Content & Voice Guidelines](#content--voice-guidelines)
3. [Navigation Patterns](#navigation-patterns)
4. [Component Specifications](#component-specifications)
5. [UNICEF-Specific Requirements](#unicef-specific-requirements)
6. [Technical Implementation](#technical-implementation)
7. [Visual Examples & Anti-Patterns](#visual-examples--anti-patterns)

---

## 1. Design Tokens

### Color System
```css
:root {
  /* Primary Colors */
  --color-primary: #06b6d4; /* cyan-500 */
  --color-primary-dark: #0891b2; /* cyan-600 */
  --color-primary-darker: #0e7490; /* cyan-700 */
  
  /* Secondary Colors */
  --color-secondary: #1e3a8a; /* blue-900 */
  --color-secondary-light: #3b82f6; /* blue-500 */
  
  /* Accent Colors */
  --color-accent-green: #10b981;
  --color-accent-orange: #f97316;
  --color-accent-red: #ef4444;
  
  /* Neutral Colors */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
}
```

### Typography
```css
:root {
  --font-family-base: 'Inter', system-ui, -apple-system, sans-serif;
  --font-family-heading: 'Inter', system-ui, -apple-system, sans-serif;
  
  /* Font Sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.75rem;
  --text-4xl: 2rem;
  --text-5xl: 2.25rem;
  --text-6xl: 2.5rem;
}
```

### Spacing System (8px Grid)
```css
:root {
  --spacing-unit: 8px;
  --space-1: 2px;
  --space-2: 4px;
  --space-3: 6px;
  --space-4: 8px;
  --space-6: 12px;
  --space-8: 16px;
  --space-12: 24px;
  --space-16: 32px;
  --space-20: 40px;
  --space-24: 48px;
  --space-32: 64px;
}
```

---

## 2. Content & Voice Guidelines

### Writing Principles
- **Clear & Concise:** Use simple, direct language (UNICEF clarity)
- **Empowering:** Focus on youth agency and potential ("enable" not "help")
- **Story-Driven:** Include personal narratives like Sozo's testimonial approach
- **Impact-Focused:** Quantify outcomes where possible

### Voice Characteristics
- **Professional yet Approachable:** Academic rigor without jargon
- **Hopeful but Realistic:** Acknowledge challenges while showcasing solutions
- **Inclusive & Youth-Centric:** "With youth" not "for youth"

### Key Phrases to Use
- "Skills for tomorrow"
- "Community-led solutions"
- "Evidence-based approaches"
- "Sustainable impact"
- "Youth empowerment"

---

## 3. Navigation Patterns

### Global Navigation Structure
1. **Home** (`/`)
2. **What We Do** (`/what-we-do`)
3. **Who We Are** (`/who-we-are`)
4. **Where We Work** (`/where-we-work`)
5. **Contact** (`/contact`)

### Mobile Navigation
- Hamburger menu with clear hierarchy
- Sticky CTA button on mobile ("Partner With Us")
- Breadcrumb navigation for deep content

### Footer Requirements
- Contact information with clear channels
- Social media links (Twitter, LinkedIn, YouTube, Instagram)
- Newsletter signup (prominent but non-intrusive)
- Legal/transparency links

---

## 4. Component Specifications

### Available Components

#### Breadcrumb
Location: `app/components/Shared/Breadcrumb.vue`
```vue
<SharedBreadcrumb
  :items="[
    { name: 'Home', href: '/' },
    { name: 'Who We Are', href: '/who-we-are' },
    { name: 'Team Members', current: true }
  ]"
/>
```

#### Button
Location: `app/components/Shared/Button.vue`
```vue
<SharedButton variant="primary" size="md">
  Partner With Us
</SharedButton>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `loading`: boolean
- `href`: string (for links)
- `fullWidth`: boolean

#### Card
Location: `app/components/Shared/Card.vue`
```vue
<SharedCard variant="bordered" size="md" :hover="true">
  <h3>Card Title</h3>
  <p>Card content...</p>
</SharedCard>
```

**Props:**
- `variant`: 'default' | 'bordered' | 'elevated' | 'transparent'
- `size`: 'sm' | 'md' | 'lg'
- `hover`: boolean
- `padding`: boolean

#### DataStats
Location: `app/components/Shared/DataStats.vue`
```vue
<SharedDataStats
  :stats="[
    { value: '500+', label: 'Youth Impacted', icon: 'i-heroicons-users' },
    { value: '3', label: 'Countries', icon: 'i-heroicons-globe-alt' }
  ]"
  :columns="3"
  :animated="true"
/>
```

#### FormInput (UNICEF Compliant)
Location: `app/components/Shared/FormInput.vue`
```vue
<SharedFormInput
  id="email"
  label="Email Address"
  type="email"
  v-model="email"
  :required="true"
  placeholder="your@email.com"
  error="Please enter a valid email"
  helpText="We'll never share your email"
/>
```

**Features:**
- Always visible labels (not just placeholders)
- Clear error states with color AND text
- Accessible ARIA attributes
- Screen reader support

#### LazyImage
Location: `app/components/Shared/LazyImage.vue`
```vue
<SharedLazyImage
  src="/img/photo.jpg"
  alt="Description of image"
  width="400"
  height="300"
  :priority="false"
/>
```

**Features:**
- Lazy loading by default
- Placeholder/skeleton loading state
- Error handling
- WebP support
- Accessibility attributes

---

## 5. UNICEF-Specific Requirements

### Form Design Standards
- ✅ All form fields must have visible labels (not just placeholders)
- ✅ Error states must be clear with color AND text indicators
- ✅ Success messages must persist and be screen-reader friendly
- ✅ All inputs must have proper ARIA attributes

### Language Support
- ✅ Right-to-left language consideration in layout
- ✅ Fonts must support extended character sets
- ✅ Language switcher in top-right (if applicable)

### Disability Inclusion
- ✅ Screen reader skip links at page top
- ✅ All images must have alt text
- ✅ Videos must have captions and transcripts
- ✅ Focus indicators must be clearly visible
- ✅ Color contrast meets WCAG 2.1 AA standards

### Accessibility Checklist
- [ ] Skip to main content link
- [ ] Proper heading hierarchy (h1-h6)
- [ ] Form labels and error messages
- [ ] Keyboard navigation
- [ ] ARIA labels where needed
- [ ] Alt text for all images
- [ ] Focus visible states
- [ ] Reduced motion support

---

## 6. Technical Implementation

### Performance Targets
- Lighthouse scores: >90 Performance, >95 Accessibility
- Images: WebP format with lazy loading
- Fonts: Local hosting with font-display: swap

### SEO Requirements
- Semantic HTML structure (h1-h6 hierarchy)
- Meta descriptions for all pages
- Open Graph tags for social sharing
- Structured data for organization markup

### Analytics & Tracking
- UNICEF-compliant privacy-first analytics
- Event tracking for key interactions
- Cookie consent banner with clear options

---

## 7. Visual Examples & Anti-Patterns

### Do:
✅ Use authentic youth photography with genuine expressions
✅ Implement clear visual hierarchy with consistent spacing
✅ Use color strategically (accent colors for CTAs only)
✅ Include diverse representation across all imagery
✅ Use card-based layouts for content grouping
✅ Implement smooth animations with reduced motion support

### Don't:
❌ Use stock photos of "perfect" people
❌ Overload pages with too many colors or animations
❌ Use low-contrast text for accessibility compliance
❌ Create complex navigation with more than 5 main items
❌ Use complex dropdowns that break on mobile
❌ Have missing alt text on images

---

## Quick Win Suggestions

### 1. Use Design System Components
Import and use the shared components for consistency:
```vue
<SharedBreadcrumb />
<SharedCard />
<SharedButton />
<SharedFormInput />
<SharedLazyImage />
<SharedDataStats />
```

### 2. Follow Page Templates
- **Landing Page**: `app/pages/index.vue` - Hero, Impact Stats, Stories
- **About Page**: `app/pages/who-we-are.vue` - Team, Partners, Mission
- **Programs Page**: `app/pages/what-we-do.vue` - Pillars, Details
- **Contact Page**: `app/pages/contact.vue` - Form, Contact Info

### 3. Progressive Enhancement
Ensure core functionality works without JavaScript:
- Forms should submit properly without JS
- Navigation should work with keyboard only
- Content should be accessible without styles

---

## File Structure
```
app/
├── assets/css/main.css          # Design tokens & global styles
├── components/
│   └── Shared/
│       ├── Breadcrumb.vue        # Navigation breadcrumbs
│       ├── Button.vue           # Consistent button component
│       ├── Card.vue             # Card component variants
│       ├── DataStats.vue        # Statistics display
│       ├── FormInput.vue        # Accessible form inputs
│       ├── LazyImage.vue        # Optimized image loading
│       ├── Footer.vue           # Site footer
│       └── NavBar.vue           # Main navigation
├── layouts/
│   └── default.vue              # Default layout with skip link
├── pages/
│   ├── index.vue                # Landing page
│   ├── what-we-do.vue          # Programs page
│   ├── who-we-are.vue          # About page
│   ├── where-we-work.vue       # Countries page
│   └── contact.vue             # Contact page
└── app.vue                      # Root with SEO & skip link
```
