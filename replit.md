# Our Love Story - Memory Timeline

A romantic memory timeline website with a greenish nature-inspired theme for couples to document and cherish their relationship milestones.

## Features

### Memory Timeline
- Interactive vertical timeline with alternating left/right memory cards
- Scroll-triggered animations that reveal memories as you scroll
- Add, edit, and delete memories with photos and dates
- Beautiful greenish color palette with botanical accents

### Love Letters
- Dedicated section for writing and reading love letters
- Full-screen letter viewer with elegant typography
- Add, edit, and delete letters

### Password Protection
- Secure server-side password verification
- Session-based authentication that persists for 7 days
- Default password: "iloveyou" (can be changed via SITE_PASSWORD environment variable)

### Design
- Romantic serif typography (Playfair Display for headlines)
- Dark mode support with theme toggle
- Responsive design for desktop and mobile
- Nature-inspired floating botanical elements

## Project Structure

```
client/src/
├── components/
│   ├── Hero.tsx           # Hero section with floating elements
│   ├── Timeline.tsx       # Main timeline component
│   ├── MemoryCard.tsx     # Individual memory cards
│   ├── AddMemoryDialog.tsx # Dialog for adding/editing memories
│   ├── Header.tsx         # Fixed header with add button
│   ├── Footer.tsx         # Romantic footer with days counter
│   ├── Navigation.tsx     # Bottom navigation between pages
│   ├── PasswordGate.tsx   # Password protection wrapper
│   ├── LoveLetterCard.tsx # Letter preview cards
│   ├── AddLetterDialog.tsx # Dialog for writing letters
│   └── LetterViewer.tsx   # Full-screen letter reader
├── pages/
│   ├── Home.tsx           # Main timeline page
│   └── LoveLetters.tsx    # Love letters page
└── App.tsx                # Main app with routing

server/
├── index.ts               # Express server with session setup
└── routes.ts              # API routes for password verification
```

## Configuration

### Environment Variables
- `SITE_PASSWORD` - Password to access the site (default: "iloveyou")
- `SESSION_SECRET` - Secret for session encryption (auto-generated if not set)

### Customization
- Relationship start date: Edit `relationshipStartDate` in `client/src/pages/Home.tsx`
- Footer quote: Edit the `quote` prop in the Footer component
- Password hint: Edit the hint text in `PasswordGate.tsx`

## Recent Changes
- December 2, 2024: Added password protection with server-side verification
- December 2, 2024: Added love letters section with full CRUD functionality
- December 2, 2024: Added bottom navigation between timeline and letters
- December 2, 2024: Initial creation with memory timeline feature
