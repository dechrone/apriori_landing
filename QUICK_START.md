# Apriori Application - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Clerk account with API keys configured in `.env.local`

### Installation & Running

```bash
# Install dependencies (if not already done)
npm install

# Run development server
npm run dev

# Open in browser
# http://localhost:3000
```

## 🔑 Environment Variables

Make sure your `.env.local` file has Clerk credentials:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## 🎯 User Flow

### For Unauthenticated Users
1. Visit `http://localhost:3000`
2. See the landing page with hero, features, pricing, etc.
3. Click "Sign In" or "Sign Up" in the header
4. Complete authentication via Clerk

### For Authenticated Users
1. Visit `http://localhost:3000`
2. **Automatically redirected to `/dashboard`**
3. Access full application workspace

## 📱 Application Structure

### Main Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page (redirects to `/dashboard` if authenticated) |
| `/dashboard` | Main dashboard with insights and quick actions |
| `/simulations` | List of all simulations |
| `/simulations/new` | Create new simulation (type selector) |
| `/simulations/new/product-flow` | Product flow simulation builder |
| `/simulations/[id]` | View simulation results |
| `/audiences` | Manage target audiences |
| `/product-context` | Configure product information |
| `/insights` | View AI-generated insights |
| `/assets` | Manage visual assets |
| `/settings` | Application settings |

## 🎨 Key Features Implemented

### 1. Dashboard
- **Performance Insights**: AI-generated summary of key findings
- **Recent Simulations**: Grid of latest simulation runs
- **Quick Actions**: Fast access to common tasks

### 2. Simulations
- **List View**: Filter by type, status, and search
- **Type Selector**: Choose between Product Flow and Ad Portfolio
- **Builder**: 3-step wizard for creating simulations
- **Results**: Detailed view with tabs for analysis

### 3. Responsive Design
- **Desktop**: Full sidebar, 3-column grids
- **Tablet**: 2-column grids, collapsible sidebar
- **Mobile**: Drawer menu, single column, optimized spacing

## 🧩 Component Usage

### Using the Toast System

```tsx
import { useToast } from '@/components/ui/Toast';

function MyComponent() {
  const { showToast } = useToast();
  
  const handleSuccess = () => {
    showToast('success', 'Saved!', 'Your changes have been saved.');
  };
  
  return <button onClick={handleSuccess}>Save</button>;
}
```

### Using Cards

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

<Card hover> {/* hover adds interactive effects */}
  <CardHeader>
    <CardTitle>My Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content here</p>
  </CardContent>
</Card>
```

### Using Modals

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

<Modal isOpen={isOpen} onClose={handleClose} size="medium">
  <ModalHeader onClose={handleClose}>
    Modal Title
  </ModalHeader>
  <ModalBody>
    <p>Modal content</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={handleClose}>Cancel</Button>
    <Button onClick={handleSubmit}>Submit</Button>
  </ModalFooter>
</Modal>
```

### Using Empty States

```tsx
import { EmptyState } from '@/components/ui/EmptyState';
import { Users } from 'lucide-react';

<EmptyState
  icon={<Users className="w-16 h-16" />}
  title="No audiences yet"
  description="Create your first target audience to get started."
  action={{
    label: 'Create Audience',
    onClick: handleCreate
  }}
/>
```

## 🎨 Design System Reference

### Colors

```tsx
// Backgrounds
bg-bg-primary      // #0A0E1A - Main background
bg-bg-secondary    // #131824 - Cards/panels
bg-bg-elevated     // #1A1F2E - Hover states
bg-bg-hover        // #242938 - Interactive hover
bg-bg-input        // #1C2130 - Input fields

// Accents
text-accent-gold   // #F59E0B - Primary actions
text-accent-blue   // #3B82F6 - Secondary
text-accent-green  // #10B981 - Success
text-accent-orange // #F97316 - Warning
text-accent-red    // #EF4444 - Error

// Text
text-text-primary     // #F9FAFB - Headings
text-text-secondary   // #D1D5DB - Body text
text-text-tertiary    // #9CA3AF - Labels
text-text-quaternary  // #6B7280 - Disabled
```

### Typography Classes

```tsx
text-display    // 36px - Hero text
text-h1         // 30px - Page titles
text-h2         // 24px - Section titles
text-h3         // 20px - Subsection titles
text-h4         // 18px - Card titles
text-body-lg    // 16px - Large body
text-body       // 14px - Default body
text-body-sm    // 13px - Small body
text-caption    // 12px - Captions
text-label      // 11px - Uppercase labels
```

### Spacing

```tsx
space-1   // 4px
space-2   // 8px
space-3   // 12px
space-4   // 16px
space-6   // 24px
space-8   // 32px
space-12  // 48px
space-16  // 64px
```

### Button Variants

```tsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="ghost">Ghost Button</Button>

<Button size="small">Small</Button>
<Button size="medium">Medium (default)</Button>
<Button size="large">Large</Button>

<Button loading>Loading...</Button>
```

### Badge Variants

```tsx
<Badge variant="draft">Draft</Badge>
<Badge variant="running">Running</Badge>
<Badge variant="completed">Completed</Badge>
<Badge variant="failed">Failed</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
```

## 📝 Adding New Pages

1. Create page file in `/src/app/(app)/your-route/page.tsx`
2. Import and use `useAppShell` for mobile menu
3. Add `TopBar` with `onMenuClick={toggleMobileMenu}`
4. Add route to sidebar navigation in `/src/components/app/Sidebar.tsx`

Example:

```tsx
"use client";

import { TopBar } from '@/components/app/TopBar';
import { useAppShell } from '@/components/app/AppShell';

export default function YourPage() {
  const { toggleMobileMenu } = useAppShell();
  
  return (
    <>
      <TopBar 
        title="Your Page" 
        onMenuClick={toggleMobileMenu}
      />
      
      <div className="max-w-[1600px] mx-auto">
        {/* Your content */}
      </div>
    </>
  );
}
```

## 🔧 Common Tasks

### Update Sidebar Navigation

Edit `/src/components/app/Sidebar.tsx`:

```tsx
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  // Add your new route here
  { name: 'New Page', href: '/new-page', icon: YourIcon },
];
```

### Add New Toast Notification

```tsx
const { showToast } = useToast();

// Success
showToast('success', 'Success!', 'Operation completed.');

// Error
showToast('error', 'Error!', 'Something went wrong.');

// Warning
showToast('warning', 'Warning!', 'Please review this.');

// Info
showToast('info', 'Info', 'Here is some information.');
```

### Create New Modal

```tsx
const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader onClose={() => setIsOpen(false)}>
    Title
  </ModalHeader>
  <ModalBody>
    Content
  </ModalBody>
  <ModalFooter>
    <Button onClick={() => setIsOpen(false)}>Close</Button>
  </ModalFooter>
</Modal>
```

## 🐛 Troubleshooting

### Middleware Not Redirecting
- Check `.env.local` has correct Clerk keys
- Verify middleware.ts is in the root of `src/`
- Clear browser cache and cookies

### Sidebar Not Showing on Mobile
- Check that `useAppShell()` is being called
- Verify `onMenuClick` is passed to `TopBar`
- Check responsive breakpoints (lg:hidden, lg:flex)

### Styles Not Applying
- Ensure Tailwind classes match design system
- Check `globals.css` is imported in root layout
- Verify CSS variable names match (--bg-primary, etc.)

## 📚 Next Steps

1. **Connect Backend**: Replace mock data with real API calls
2. **Add Charts**: Integrate visualization library for metrics
3. **Implement Flow Builder**: Add drag-and-drop flow editor
4. **Real-time Updates**: Add WebSocket for simulation progress
5. **Export Features**: Add PDF/CSV export functionality

## 🎉 You're Ready!

The application is fully functional and ready for development. All core features are implemented following the PRD specifications. Start by signing in and exploring the dashboard!

For detailed implementation notes, see `IMPLEMENTATION_SUMMARY.md`.
