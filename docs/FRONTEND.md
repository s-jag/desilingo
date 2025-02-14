# DesiLingo Frontend Development Guide

## Tech Stack Overview

### Core Technologies
- **Framework**: React 18.2 with TypeScript
- **Build Tool**: Vite 5.1
- **UI Framework**: Chakra UI
- **Routing**: React Router v6
- **Authentication**: Auth0
- **Animation**: Framer Motion
- **State Management**: React Context API

## Project Structure

```
frontend/
├── src/
│   ├── assets/           # Static assets (images, SVGs)
│   ├── components/       # Reusable UI components
│   │   ├── motion.ts    # Framer Motion component wrappers
│   │   ├── Navbar.tsx   # Navigation component
│   │   └── ...
│   ├── pages/           # Page components
│   │   ├── Landing.tsx
│   │   ├── Dashboard.tsx
│   │   └── ...
│   ├── theme/           # Chakra UI theme customization
│   ├── types/           # TypeScript type definitions
│   ├── auth/            # Authentication related code
│   └── App.tsx          # Main application component
├── index.html
├── vite.config.ts       # Vite configuration
└── package.json
```

## Key Components

### Navigation System
- `Navbar.tsx`: Main navigation component
  - Responsive design with mobile menu
  - User dropdown menu with profile access
  - Streak notification system
  - Dynamic route handling

### Layout Components
- `ProtectedLayout.tsx`: Wrapper for authenticated routes
  - Includes navigation bar
  - Handles authentication state
  - Manages layout spacing

### Feature Components
- `LanguageSelection.tsx`: Language choice interface
  - Grid layout of language options
  - Interactive cards with native script display
  - Proficiency level selection modal

### Animation Components
- `motion.ts`: Framer Motion component wrappers
  - Custom motion components for Chakra UI
  - Reusable animation variants
  - Type-safe motion components

## User Interface Features

### Streak System
```typescript
// Streak notification implementation
const StreakNotification = ({ onClose }: { onClose: () => void }) => {
  return (
    <AnimatePresence>
      <MotionBox
        position="fixed"
        right={4}
        top={20}
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={onClose}
      >
        // Notification content
      </MotionBox>
    </AnimatePresence>
  )
}
```

### Theme System
- Light/Dark mode support
- Custom color schemes
- Responsive design utilities
- Consistent spacing scale

## Authentication Flow

1. **Initial Auth Check**
```typescript
const { isAuthenticated, isLoading } = useAuth0();

if (isLoading) {
  return <LoadingSpinner />;
}

return isAuthenticated ? <ProtectedContent /> : <PublicContent />;
```

2. **Protected Routes**
```typescript
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return <>{children}</>;
};
```

## State Management

### Local Storage Usage
```typescript
// Streak tracking example
const [streak, setStreak] = useState(() => {
  return parseInt(localStorage.getItem('streak') || '0');
});

// Update streak
const updateStreak = () => {
  const newStreak = streak + 1;
  setStreak(newStreak);
  localStorage.setItem('streak', newStreak.toString());
};
```

### Context Usage
```typescript
// Theme context example
export const ThemeContext = createContext({
  colorMode: 'light',
  toggleColorMode: () => {},
});

// Usage in components
const { colorMode, toggleColorMode } = useContext(ThemeContext);
```

## Animation Guidelines

### Framer Motion Usage
```typescript
// Standard animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Usage with Chakra UI
const MotionBox = motion(Box);

<MotionBox
  variants={fadeInUp}
  initial="hidden"
  animate="visible"
  transition={{ duration: 0.5 }}
>
  {content}
</MotionBox>
```

## Form Handling

### Level Selection Example
```typescript
const LevelSelectionModal = ({ language, onSubmit }) => {
  const [currentLevel, setCurrentLevel] = useState('beginner');
  const [targetLevel, setTargetLevel] = useState('intermediate');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ currentLevel, targetLevel });
  };

  return (
    <Modal>
      <Form onSubmit={handleSubmit}>
        <Select value={currentLevel} onChange={setCurrentLevel}>
          {/* Level options */}
        </Select>
      </Form>
    </Modal>
  );
};
```

## Best Practices

### Component Organization
1. Group related components in directories
2. Use index.ts files for clean exports
3. Keep components focused and single-responsibility
4. Implement proper TypeScript interfaces

### Performance Optimization
1. Use React.memo for expensive renders
2. Implement proper dependency arrays in useEffect
3. Lazy load routes and heavy components
4. Optimize images and assets

### Code Style
1. Use TypeScript for type safety
2. Follow ESLint and Prettier configurations
3. Write meaningful component and function names
4. Document complex logic with comments

## Testing

### Component Testing
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('LanguageCard', () => {
  it('should handle selection', async () => {
    const onSelect = jest.fn();
    render(<LanguageCard language={mockLanguage} onSelect={onSelect} />);
    
    await userEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith(mockLanguage);
  });
});
```

## Deployment

### Build Process
```bash
# Production build
npm run build

# Preview build
npm run preview
```

### Environment Variables
```env
VITE_API_URL=http://localhost:3000
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=your-auth0-api-identifier
```

## Troubleshooting

### Common Issues
1. Auth0 configuration issues
   - Check environment variables
   - Verify callback URLs
   - Check Auth0 application settings

2. Build problems
   - Clear node_modules and reinstall
   - Check for TypeScript errors
   - Verify Vite configuration

3. State management issues
   - Check localStorage availability
   - Verify context providers
   - Debug state updates with React DevTools

## Contributing

### Development Workflow
1. Create feature branch
2. Implement changes
3. Add tests
4. Update documentation
5. Create pull request

### Code Review Guidelines
1. Verify TypeScript types
2. Check for responsive design
3. Ensure accessibility standards
4. Test cross-browser compatibility
``` 