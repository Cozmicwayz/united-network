# United Network Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern creator marketplaces like Behance and Dribbble, combined with gaming-focused platforms. The design emphasizes clean presentation of creator work while maintaining accessibility and professional polish.

## Core Design Elements

### A. Color Palette
**Dark Theme Primary:**
- Background: #302F2F (primary dark surface)
- Main Text: #FFFFFF (high contrast readability)
- Accent: #A8F0E8 (soft cyan for highlights and CTAs)
- Secondary Text: #838787 (muted gray for supporting content)
- Discord Button: #BAE0CA (custom mint green)

### B. Typography
- **Primary Font**: Inter or Poppins via Google Fonts
- **Headings**: Semi-bold (600) for hierarchy
- **Body Text**: Regular (400) for readability
- **Small Text**: Regular (400) with reduced opacity

### C. Layout System
**Tailwind Spacing**: Consistent use of units 2, 4, 8, 12, and 16
- `p-4` for card padding
- `m-8` for section spacing
- `gap-2` for tight element spacing
- `h-12` for button heights

### D. Component Library

**Navigation**
- Fixed header with logo (shopping cart with coins) linking to homepage
- Clean navigation menu with semantic routes
- Mobile-responsive hamburger menu

**Cards & Content**
- Gallery/Review cards in 3-column grid (desktop), responsive stacking
- Hover effects with subtle elevation and accent color borders
- Consistent 16:9 aspect ratio for media content

**Forms & Interactions**
- Clean input fields with accent color focus states
- Upload areas with drag-and-drop styling
- Modal overlays with backdrop blur

**Buttons**
- Primary: Accent color (#A8F0E8) with rounded corners
- Secondary: Outline style with accent color border
- Discord: Custom mint green (#BAE0CA)

### E. Animations
**Minimal & Purpose-Driven:**
- Typewriter animation for homepage hero text cycling through creator roles
- Smooth page transitions (fade/slide)
- Hover effects on interactive elements
- Loading indicators for uploads
- Modal fade-in/out animations

## Page-Specific Guidelines

### Homepage
- Hero section with typewriter animation
- Three prominent CTAs arranged horizontally
- Clean, focused layout without excessive scrolling

### Gallery & Reviews
- 9-item pagination with search functionality
- Right-click context menus for authenticated users
- Full-view modals with navigation arrows
- Upload flows with clearly defined sections

### About Page
- Simple, clean typography layout
- Focus on readability and brand messaging

## Images
**No large hero images required** - the design focuses on clean typography and creator content showcase. User-uploaded content (gallery items and review profile images) should be the primary visual elements, displayed in consistent card layouts with proper aspect ratios.