# Technical Specification: Chikwanda Chisha Portfolio

## Component Inventory

### shadcn/ui Components (Built-in)
- Button - Primary and secondary CTAs
- Card - Project cards, skill cards, stats cards
- Badge - Category tags, skill levels
- Separator - Section dividers
- Sheet - Mobile navigation drawer

### Custom Components
- Navigation - Fixed floating pill nav with glassmorphism
- Hero - Full-height hero with staggered animations
- About - Two-column layout with stats
- Experience - Skills grid with categorized cards
- Projects - Project showcase grid
- Contact - CTA section with social links
- Footer - Minimal footer
- ScrollReveal - Reusable scroll animation wrapper

### Animation Components
- FadeIn - Opacity + translateY animation
- StaggerContainer - Parent for staggered children
- CountUp - Number counter animation

## Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Page load stagger | Framer Motion | AnimatePresence + staggerChildren | Medium |
| Scroll reveal | Framer Motion | useInView + motion.div | Low |
| Nav underline hover | CSS | transform scaleX with transition | Low |
| Button hover scale | CSS/Framer | whileHover={{ scale: 1.02 }} | Low |
| Card hover lift | CSS/Framer | whileHover={{ y: -4 }} | Low |
| Scroll indicator bounce | CSS | @keyframes bounce infinite | Low |
| Stats counter | Custom hook | useCountUp with requestAnimationFrame | Medium |
| Skill card glow | CSS | box-shadow transition on hover | Low |
| Mobile menu slide | Framer Motion | AnimatePresence + slide animation | Medium |

## Animation Library Choices

### Primary: Framer Motion
- React-native integration
- Declarative API
- Built-in useInView hook
- AnimatePresence for mount/unmount
- Gesture support (hover, tap)

### Secondary: CSS Animations
- Simple hover effects
- Infinite animations (scroll indicator)
- Performance-critical micro-interactions

## Project File Structure

```
app/
├── src/
│   ├── sections/
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── components/
│   │   ├── ScrollReveal.tsx
│   │   ├── FadeIn.tsx
│   │   └── CountUp.tsx
│   ├── hooks/
│   │   └── useCountUp.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── components/ui/        # shadcn components
├── public/
│   └── images/
├── index.html
├── tailwind.config.js
└── package.json
```

## Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.400.0",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  }
}
```

## Tailwind Configuration Extensions

```javascript
// tailwind.config.js
{
  theme: {
    extend: {
      colors: {
        background: '#000000',
        'background-secondary': '#0a0a0a',
        'background-tertiary': '#111111',
        accent: '#00d4ff',
        'accent-secondary': '#0099cc',
        border: '#222222',
        'border-hover': '#333333',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
}
```

## Implementation Order

1. Initialize project with webapp-building skill
2. Install framer-motion and configure Tailwind
3. Create base layout and global styles
4. Build Navigation component
5. Build Hero section with load animations
6. Build About section with scroll reveal
7. Build Experience section with skill cards
8. Build Projects section with project cards
9. Build Contact section
10. Build Footer
11. Add scroll reveal animations
12. Test and refine
13. Build and deploy
