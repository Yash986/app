# Memory Timeline Website - Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from Instagram Stories' intimate presentation, Notion's timeline elegance, and wedding website aesthetics. This romantic application prioritizes emotional impact through visual storytelling.

**Core Principles:**
- Intimate & Personal: Design feels like a private treasure, not a public showcase
- Story-Driven Flow: Each scroll reveals a new chapter naturally
- Nature-Inspired: Organic shapes and botanical elements enhance the greenish theme
- Timeless Romance: Avoid trendy effects; create lasting beauty

## Typography
**Font Pairing:**
- Primary (Headlines/Dates): 'Playfair Display' (serif, romantic elegance)
- Secondary (Body/Descriptions): 'Inter' (clean, readable)

**Hierarchy:**
- Hero Title: text-5xl to text-7xl, font-bold
- Memory Titles: text-2xl to text-3xl, font-semibold
- Dates: text-lg, uppercase tracking-wide, opacity-80
- Descriptions: text-base to text-lg, leading-relaxed
- Small Details: text-sm, font-medium

## Layout System
**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20, and 24 for consistency.

**Container Strategy:**
- Max-width: max-w-5xl for timeline content
- Section padding: py-16 to py-24 (desktop), py-12 (mobile)
- Card spacing: gap-12 to gap-16 between memory entries

**Timeline Structure:**
- Vertical center line (2px width) running through the page
- Alternating left/right memory cards (desktop)
- Stacked single column (mobile)
- Cards offset from center line by 8-12 units

## Component Library

### Hero Section
- Full viewport height (min-h-screen)
- Centered content with romantic headline and subtitle
- Subtle animated botanical elements (floating leaves using CSS animations)
- Soft gradient background overlay
- Call-to-action: "Begin Our Journey" scroll indicator

### Timeline Cards (Memory Entries)
Each card contains:
- Date badge (absolute positioned, connected to timeline with dot indicator)
- Image container (aspect-ratio-4/3, rounded-2xl, subtle shadow)
- Content area with title, description (max 3-4 lines)
- Hover state: gentle lift (transform translate) and shadow enhancement

**Card Layout:**
- Even entries: Image left (w-1/2), content right (w-1/2)
- Odd entries: Content left, image right
- Mobile: Stack image on top, content below
- Spacing: p-6 to p-8 internal padding

### Navigation
- Fixed header (sticky top-0) with frosted glass effect (backdrop-blur)
- Site title/logo left-aligned
- "Add Memory" button right-aligned (visible only in edit mode)
- Minimal and unobtrusive

### Footer
- Centered romantic quote or message
- Date counter: "Days together: [number]"
- Small heart icon or botanical flourish
- Padding: py-12

### Interactive Elements
- Timeline dots: Circular indicators (w-4 h-4) on the center line
- Connecting lines: Curved paths from timeline to cards
- Scroll-triggered animations: Fade-in and slide from side as cards enter viewport
- Image zoom modal: Click to expand photos in overlay

### Add/Edit Memory Interface
- Floating action button (bottom-right corner) when in edit mode
- Modal overlay with form:
  - Date picker
  - Title input (text-xl preview)
  - Description textarea (4-5 rows)
  - Image upload with preview
  - Save/Cancel buttons
- Simple, focused form design

## Images

**Hero Background Image:**
- Nature scene with botanical elements (forest path, garden, botanical greenhouse)
- Soft focus/blur to support text readability
- Overlay: Semi-transparent gradient (dark to transparent from bottom to top)

**Memory Entry Images:**
- Personal photos of couple moments
- Aspect ratio: 4:3 or 16:9 (consistent throughout)
- Automatic cropping: object-fit-cover
- Rounded corners (rounded-2xl) with subtle shadow
- Lazy loading for performance

**Decorative Elements:**
- Small botanical illustrations as section dividers (leaves, branches)
- Subtle texture overlays (paper grain, watercolor effects)
- Nature-inspired icons for UI elements (heart made of leaves, etc.)

**Image Placement:**
- Hero: Full-width background image
- Timeline cards: Each memory has one featured image
- Empty state: Illustration of couple silhouette with botanical frame when no memories exist

## Animations (Minimal & Purposeful)
- Scroll-reveal: Fade-in + slide (duration-700, ease-out)
- Card hover: Subtle lift (translate-y-2) + shadow enhancement
- Hero elements: Gentle floating motion on botanical decorations (slow, infinite)
- Page transitions: Smooth fade between views (duration-300)

**Note:** Avoid excessive motion to maintain romantic, peaceful atmosphere.

## Responsive Behavior
- Desktop (lg+): Full alternating timeline layout
- Tablet (md): Reduce card width, maintain alternation
- Mobile (base): Single column stack, timeline becomes left edge indicator
- Image sizes: Responsive scaling with max heights to prevent overwhelming small screens