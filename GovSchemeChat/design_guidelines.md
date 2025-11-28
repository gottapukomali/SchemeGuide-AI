# Government Schemes Chatbot - Design Guidelines

## Design Approach: Material Design System

**Rationale:** Government civic application requiring trust, accessibility, and information clarity. Material Design provides established patterns for data-dense interfaces with strong usability foundations.

## Core Design Principles

1. **Trust & Credibility:** Professional, government-appropriate aesthetic
2. **Accessibility First:** High contrast, clear hierarchy, readable typography
3. **Information Clarity:** Prioritize readability and scannability
4. **Guided Discovery:** Help users understand what they can ask

---

## Typography

**Font Family:** 
- Primary: Inter (via Google Fonts CDN)
- Fallback: system-ui, sans-serif

**Hierarchy:**
- Hero Heading: text-4xl md:text-5xl, font-bold
- Section Headings: text-2xl md:text-3xl, font-semibold
- Chat Messages: text-base, font-normal
- Scheme Titles: text-xl, font-semibold
- Body Text: text-sm md:text-base
- Labels/Meta: text-xs md:text-sm, font-medium

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Tight spacing: p-2, gap-2
- Standard spacing: p-4, gap-4, mb-6
- Generous spacing: p-8, gap-8, my-12, py-16

**Container Strategy:**
- Full-width app with max-w-7xl centered container
- Chat interface: max-w-4xl centered
- Content cards: max-w-3xl for readability

---

## Application Layout Structure

### Landing Page (Pre-Chat)

**Hero Section (60vh minimum):**
- Government emblem/Ashoka Chakra graphic element (small, subtle)
- Bold headline: "Find Government Schemes You Qualify For"
- Subheading explaining the service
- Primary CTA: "Start Finding Benefits"
- Trust indicators: "Accurate • Up-to-date • Free"

**How It Works Section:**
- 3-column grid (lg:grid-cols-3, md:grid-cols-2, base:grid-cols-1)
- Icon + Title + Description cards
- Steps: "Ask Questions" → "AI Searches Schemes" → "Get Instant Answers"

**Popular Questions Section:**
- 2-column grid of clickable question cards
- Examples: "Schemes for students?", "Farmer assistance programs?", "Women entrepreneur benefits?"
- Each card acts as quick-start trigger

**Scheme Categories Overview:**
- 4-column grid showcasing categories
- Categories: Students, Farmers, Women, Housing, Health, Employment
- Icon + Category name + Brief description

**Footer:**
- Disclaimer about official government verification
- Links to official government portals
- Contact/feedback information

### Chat Interface Page

**Header (Fixed):**
- Logo/Emblem left
- "Government Schemes Assistant" title center
- "New Chat" button right

**Chat Container (Main Area):**
- Full-height scroll area with messages
- Bot messages: Left-aligned, light background card
- User messages: Right-aligned, primary-tinted background
- Timestamp metadata below each message

**Scheme Result Cards (Within Chat):**
- Elevated card design with border-l-4 accent
- Structure:
  - Scheme name (large, bold)
  - 2-column grid layout for details:
    - Left: Benefits list, Eligibility criteria
    - Right: Required documents, How to apply
  - Official website link with external icon
  - "Learn More" expandable section

**Suggested Questions (Sticky):**
- Horizontal scrollable chips above input
- Quick-tap questions that populate input
- Examples dynamically change based on conversation context

**Input Area (Fixed Bottom):**
- Text input with placeholder: "Ask about any government scheme..."
- Send button (paper plane icon)
- Voice input button (microphone icon)
- Character count/status indicator

---

## Component Library

### Navigation
- Minimal top bar with logo and new chat action
- Breadcrumb if navigating between sections

### Cards
- Scheme cards: shadow-md, rounded-lg, p-6, hover:shadow-lg transition
- Message bubbles: rounded-2xl, p-4, max-w-prose
- Question suggestions: rounded-full, px-4, py-2, border

### Forms & Inputs
- Chat input: Large rounded-full input with shadow-sm
- Elevated send button (circular, floating appearance)

### Data Display
- Lists: Bulleted with checkmark icons for benefits/eligibility
- Tags: Small rounded pills for categories (Students, Farmers, etc.)
- Dividers: Subtle horizontal rules between sections

### Feedback Elements
- Loading: Three animated dots for bot typing
- Success: Checkmark icon for successful scheme matches
- Empty state: Friendly illustration with guidance text
- Error: Warning icon with retry option

---

## Icons

**Library:** Heroicons (via CDN)

**Key Icons:**
- Chat: chat-bubble-left-right
- Send: paper-airplane
- Microphone: microphone
- External link: arrow-top-right-on-square
- Check: check-circle
- Info: information-circle
- Categories: academic-cap, banknote, user-group, home, heart, briefcase

---

## Images

**Hero Section Image:**
- Illustration or photo showing diverse Indian citizens (students, farmers, families)
- Position: Right side of hero on desktop, full-width on mobile
- Style: Modern, optimistic, inclusive representation
- Size: 600x400px minimum

**Category Icons:**
- Simple line-art or duotone icons representing each scheme category
- Consistent style across all categories
- Size: 48x48px to 64x64px

**Empty State Illustration:**
- Friendly graphic when no conversation started
- Shows person with question mark or search concept
- Size: 300x200px

**Government Emblem:**
- Official Ashoka Chakra or India emblem (small, respectful usage)
- Header: 40x40px
- Hero: 60x60px

---

## Animations

**Minimal & Purposeful:**
- Bot typing indicator: Gentle pulse animation
- Message appearance: Subtle fade-in from bottom
- Card hover: Elevation increase (shadow transition)
- Button click: Scale feedback (scale-95)

**No scroll-triggered or complex animations** - focus on instant, responsive feel.

---

## Responsive Behavior

**Mobile (base to md):**
- Single column layouts
- Full-width chat interface
- Collapsible scheme details (accordion pattern)
- Bottom sheet for detailed scheme info

**Desktop (lg+):**
- Side-by-side layouts where applicable
- Wider chat container with comfortable reading width
- Expanded scheme cards showing all details

---

## Accessibility Implementation

- ARIA labels on all interactive elements
- Keyboard navigation support (Tab, Enter, Escape)
- Focus indicators with visible outline
- High contrast text (minimum 4.5:1 ratio)
- Screen reader announcements for bot responses
- Skip navigation links

---

## Key User Flows

1. **First-Time User:** Landing page → Popular question click → Chat interface → Scheme results → Apply action
2. **Return User:** Direct to chat → Voice/text input → Results → Refine search
3. **Exploratory:** Browse categories → Ask specific question → Compare schemes → Get eligibility info

---

This design creates a trustworthy, accessible government service that guides citizens through discovering benefits with clarity and confidence.