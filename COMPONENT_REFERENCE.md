# Apriori UI Component Reference

Complete reference for all UI components in the Apriori design system.

---

## 📦 Layout Components

### Card

Flexible container component with optional hover effects.

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

// Basic card
<Card>
  <CardContent>
    Content here
  </CardContent>
</Card>

// Card with header
<Card hover className="custom-class">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

**Props:**
- `children`: ReactNode (required)
- `className`: string (optional)
- `hover`: boolean (default: false) - Adds hover effects
- `onClick`: () => void (optional)

---

### Modal

Full-featured modal dialog with overlay.

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';

<Modal 
  isOpen={isOpen} 
  onClose={handleClose} 
  size="medium"
>
  <ModalHeader onClose={handleClose}>
    Modal Title
  </ModalHeader>
  <ModalBody>
    <p>Modal content goes here</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={handleClose}>Cancel</Button>
    <Button onClick={handleSubmit}>Submit</Button>
  </ModalFooter>
</Modal>
```

**Modal Props:**
- `isOpen`: boolean (required)
- `onClose`: () => void (required)
- `children`: ReactNode (required)
- `size`: 'small' | 'medium' | 'large' | 'full' (default: 'medium')
- `className`: string (optional)

**Features:**
- Backdrop blur overlay
- ESC key to close
- Click outside to close
- Scroll locking
- Animations (fadeIn, slideUp)

---

## 🎨 Form Components

### Input

Text input with label, error states, and helper text.

```tsx
import { Input } from '@/components/ui/Input';

<Input
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  required
  error={errors.email}
  helperText="We'll never share your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

**Props:**
- All standard `<input>` HTML attributes
- `label`: string (optional)
- `error`: string (optional) - Shows error message
- `helperText`: string (optional) - Shows helper text
- `required`: boolean (optional) - Adds asterisk to label

**States:**
- Default
- Focus (gold border + ring)
- Error (red border + ring)
- Disabled

---

### Textarea

Multi-line text input.

```tsx
import { Textarea } from '@/components/ui/Textarea';

<Textarea
  label="Description"
  placeholder="Enter description..."
  rows={6}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>
```

**Props:**
- All standard `<textarea>` HTML attributes
- `label`: string (optional)
- `error`: string (optional)
- `helperText`: string (optional)
- `required`: boolean (optional)

---

### Select

Dropdown select with custom styling.

```tsx
import { Select } from '@/components/ui/Select';

<Select
  label="Country"
  required
  value={country}
  onChange={(e) => setCountry(e.target.value)}
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ]}
/>
```

**Props:**
- All standard `<select>` HTML attributes
- `label`: string (optional)
- `error`: string (optional)
- `helperText`: string (optional)
- `required`: boolean (optional)
- `options`: Array<{ value: string, label: string }> (required)

---

## 🔘 Button Components

### Button

Primary action button with variants and states.

```tsx
import { Button } from '@/components/ui/Button';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// With loading state
<Button loading disabled>
  Saving...
</Button>

// With icon
<Button>
  <Plus className="w-5 h-5" />
  Add Item
</Button>
```

**Props:**
- All standard `<button>` HTML attributes
- `variant`: 'primary' | 'secondary' | 'ghost' (default: 'primary')
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `loading`: boolean (default: false)
- `children`: ReactNode (required)

**Variants:**
- **Primary**: Gold background, dark text, glow on hover
- **Secondary**: Transparent with border, hover background
- **Ghost**: Transparent, hover background only

---

### IconButton

Compact button for icons only.

```tsx
import { IconButton } from '@/components/ui/Button';
import { Bell } from 'lucide-react';

<IconButton
  icon={<Bell className="w-6 h-6" />}
  label="Notifications"
  onClick={handleClick}
/>
```

**Props:**
- `icon`: ReactNode (required)
- `label`: string (required) - For accessibility
- All standard `<button>` HTML attributes

---

## 🏷️ Badge & Tag Components

### Badge

Status indicators and labels.

```tsx
import { Badge } from '@/components/ui/Badge';

// Status badges
<Badge variant="draft">Draft</Badge>
<Badge variant="running">Running</Badge>
<Badge variant="completed">Completed</Badge>
<Badge variant="failed">Failed</Badge>

// General badges
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="default">Default</Badge>
```

**Props:**
- `children`: ReactNode (required)
- `variant`: 'default' | 'success' | 'warning' | 'error' | 'info' | 'draft' | 'running' | 'completed' | 'failed'
- `className`: string (optional)

**Features:**
- Running variant has pulse animation
- Capitalized text
- Rounded corners

---

### Tag

Removable chip/tag component.

```tsx
import { Tag } from '@/components/ui/Badge';

<Tag onRemove={() => handleRemove(id)}>
  Tag Label
</Tag>

// Without remove button
<Tag>Non-removable Tag</Tag>
```

**Props:**
- `children`: ReactNode (required)
- `onRemove`: () => void (optional)
- `className`: string (optional)

---

## 💬 Feedback Components

### Toast

Notification system with auto-dismiss.

```tsx
import { useToast } from '@/components/ui/Toast';

function MyComponent() {
  const { showToast } = useToast();
  
  const handleSuccess = () => {
    showToast('success', 'Success!', 'Operation completed successfully.');
  };
  
  const handleError = () => {
    showToast('error', 'Error!', 'Something went wrong.');
  };
  
  return (
    <>
      <Button onClick={handleSuccess}>Show Success</Button>
      <Button onClick={handleError}>Show Error</Button>
    </>
  );
}
```

**Usage:**
```tsx
showToast(type, title, message?)
```

**Parameters:**
- `type`: 'success' | 'error' | 'warning' | 'info'
- `title`: string (required)
- `message`: string (optional)

**Features:**
- Auto-dismiss after 5 seconds
- Stacked notifications
- Click to dismiss
- Slide-in animation
- Icon based on type

**Setup Required:**
Wrap your app with `ToastProvider`:

```tsx
import { ToastProvider } from '@/components/ui/Toast';

<ToastProvider>
  {children}
</ToastProvider>
```

---

### EmptyState

Centered empty state with icon and CTA.

```tsx
import { EmptyState } from '@/components/ui/EmptyState';
import { Users } from 'lucide-react';

<EmptyState
  icon={<Users className="w-16 h-16" />}
  title="No audiences yet"
  description="Create your first target audience to run more accurate simulations."
  action={{
    label: 'Create Audience',
    onClick: handleCreate
  }}
/>
```

**Props:**
- `icon`: ReactNode (required)
- `title`: string (required)
- `description`: string (required)
- `action`: { label: string, onClick: () => void } (optional)
- `className`: string (optional)

---

### Spinner

Loading spinner indicator.

```tsx
import { Spinner, LoadingState } from '@/components/ui/Spinner';

// Just spinner
<Spinner size="medium" />

// Spinner with message
<LoadingState message="Loading data..." />
```

**Spinner Props:**
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `className`: string (optional)

**LoadingState Props:**
- `message`: string (default: 'Loading...')
- `className`: string (optional)

---

## 🏗️ App Components

### Sidebar

Main navigation sidebar (already integrated in app layout).

**Features:**
- Fixed position on desktop
- Drawer overlay on mobile
- Active route highlighting
- Grouped navigation sections

**Usage:**
```tsx
import { Sidebar } from '@/components/app/Sidebar';

<Sidebar 
  mobileOpen={mobileMenuOpen}
  onMobileClose={() => setMobileMenuOpen(false)}
/>
```

---

### TopBar

Page header with title and actions.

**Usage:**
```tsx
import { TopBar } from '@/components/app/TopBar';

<TopBar 
  title="Page Title"
  breadcrumb="Optional breadcrumb"
  onMenuClick={toggleMobileMenu}
  actions={
    <Button>Action</Button>
  }
/>
```

**Props:**
- `title`: string (required)
- `breadcrumb`: string (optional)
- `actions`: ReactNode (optional)
- `onMenuClick`: () => void (optional) - For mobile menu

---

### AppShell

Context provider for mobile menu state (already integrated).

**Usage:**
```tsx
import { useAppShell } from '@/components/app/AppShell';

function MyPage() {
  const { toggleMobileMenu } = useAppShell();
  
  return (
    <TopBar 
      title="My Page"
      onMenuClick={toggleMobileMenu}
    />
  );
}
```

---

## 🎨 Styling Guidelines

### Using Tailwind Classes

All components use Tailwind CSS with custom design tokens:

```tsx
// Backgrounds
className="bg-bg-primary"      // Main background
className="bg-bg-secondary"    // Cards
className="bg-bg-elevated"     // Hover states

// Text colors
className="text-text-primary"     // Headings
className="text-text-secondary"   // Body
className="text-text-tertiary"    // Labels

// Accent colors
className="text-accent-gold"   // Primary
className="text-accent-blue"   // Secondary
className="text-accent-green"  // Success
```

### Typography Classes

```tsx
className="text-display"    // 36px hero
className="text-h1"         // 30px page title
className="text-h2"         // 24px section
className="text-h3"         // 20px subsection
className="text-h4"         // 18px card title
className="text-body"       // 14px default
className="text-caption"    // 12px small
className="text-label"      // 11px uppercase
```

### Spacing

```tsx
className="space-y-4"    // 16px vertical gap
className="gap-6"        // 24px gap
className="p-6"          // 24px padding
className="mb-8"         // 32px margin bottom
```

### Transitions

```tsx
className="transition-standard"  // 200ms ease-in-out
className="transition-fast"      // 150ms ease-in-out
className="hover:bg-bg-elevated" // Hover state
```

---

## 🔧 Common Patterns

### Form with Validation

```tsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
});
const [errors, setErrors] = useState({});

<form onSubmit={handleSubmit}>
  <Input
    label="Name"
    required
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    error={errors.name}
  />
  
  <Input
    label="Email"
    type="email"
    required
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    error={errors.email}
  />
  
  <Button type="submit">Submit</Button>
</form>
```

### Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id} hover>
      <CardContent>
        {/* Card content */}
      </CardContent>
    </Card>
  ))}
</div>
```

### Confirmation Modal

```tsx
const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="small">
  <ModalHeader onClose={() => setIsOpen(false)}>
    Confirm Action
  </ModalHeader>
  <ModalBody>
    <p>Are you sure you want to proceed?</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button onClick={handleConfirm}>
      Confirm
    </Button>
  </ModalFooter>
</Modal>
```

### Loading State

```tsx
const [loading, setLoading] = useState(true);

{loading ? (
  <LoadingState message="Loading data..." />
) : (
  <div>{/* Your content */}</div>
)}
```

---

## 📱 Responsive Patterns

### Hide on Mobile

```tsx
<div className="hidden md:block">
  Desktop only content
</div>
```

### Show on Mobile Only

```tsx
<div className="block md:hidden">
  Mobile only content
</div>
```

### Responsive Grid

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {/* Items */}
</div>
```

### Responsive Padding

```tsx
<div className="p-5 sm:p-8 lg:p-10">
  {/* Content */}
</div>
```

---

## ♿ Accessibility

All components follow accessibility best practices:

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus States**: Visible focus indicators (gold outline)
- **ARIA Labels**: Proper labels for screen readers
- **Color Contrast**: WCAG AA compliant
- **Semantic HTML**: Proper heading hierarchy and landmarks

### Adding ARIA Labels

```tsx
<button aria-label="Close modal" onClick={onClose}>
  <X className="w-5 h-5" />
</button>

<input aria-required="true" aria-invalid={!!error} />

<div role="status" aria-live="polite">
  {statusMessage}
</div>
```

---

## 🎯 Best Practices

1. **Always use semantic HTML**: `<button>` for buttons, `<nav>` for navigation
2. **Provide labels**: Every input should have a label
3. **Handle loading states**: Show spinners during async operations
4. **Show error states**: Display helpful error messages
5. **Use empty states**: Guide users when there's no data
6. **Add hover effects**: Provide visual feedback
7. **Test keyboard navigation**: Ensure tab order is logical
8. **Use proper heading hierarchy**: H1 → H2 → H3, don't skip levels
9. **Provide alt text**: For all images and icons
10. **Test on mobile**: Ensure touch targets are at least 44px

---

This reference covers all custom components in the Apriori design system. For standard HTML elements and Tailwind utilities, refer to their respective documentation.
