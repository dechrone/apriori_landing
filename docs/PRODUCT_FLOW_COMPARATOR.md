# Product Flow Comparator Guide

## Overview

The **Product Flow Comparator** is a special folder type that allows you to compare two different user flows side-by-side. When you create a Product Flow Comparator, the system automatically generates two subfolders (Flow 1 and Flow 2) where you can upload and organize screens for each flow variant.

## Key Features

### 1. Automatic Subfolder Creation
When you create a Product Flow Comparator folder, the system automatically creates:
- **Flow 1**: First variant of your user flow
- **Flow 2**: Second variant of your user flow

Both subfolders are of type `product-flow` and support the same metadata capabilities as regular Product Flow Screens.

### 2. Step-by-Step Metadata
Each asset uploaded to Flow 1 or Flow 2 can have detailed metadata:
- **Step Number**: Numerical order in the flow (must be unique within each flow)
- **Step Name**: Descriptive name (e.g., "Signup", "Pricing", "Dashboard")
- **Page Type**: Category of the screen (signup, onboarding, pricing, dashboard, checkout, other)
- **User Intent**: What the user wants to achieve at this step
- **Expected Action**: What action the user should take
- **Notes**: Additional context for simulation

### 3. Simulation-Ready
Both flows maintain their own step numbering, allowing simulations to:
- Compare conversion rates between Flow 1 and Flow 2
- Identify drop-off points in each variant
- Analyze which flow performs better at each step

## How to Use

### Step 1: Create a Product Flow Comparator

1. Navigate to the **Assets** page
2. Click **"Create folder"**
3. Select **"Product Flow Comparator"** as the asset type
4. Give your comparator a descriptive name (e.g., "Onboarding V1 vs V2")
5. Optionally add a description
6. Click **"Create folder"**

The system will create:
- A parent folder with your chosen name
- Two subfolders: "Flow 1" and "Flow 2"

### Step 2: Upload Screens to Each Flow

1. Click on the Product Flow Comparator folder to view Flow 1 and Flow 2
2. Click on **Flow 1** to open it
3. Click **"Upload Flow Screens"** to add images for the first variant
4. Repeat for **Flow 2** with the second variant's screens

### Step 3: Add Metadata to Each Screen

For each uploaded screen in both flows:

1. Click the **Edit** (pencil) icon on the asset card
2. Fill in the metadata:
   - **Step Number**: Enter the sequential step (e.g., 1, 2, 3...)
   - **Step Name**: Give it a meaningful name
   - **Page Type**: Select the appropriate category
   - **User Intent**: (Optional) What the user wants to do
   - **Expected Action**: (Optional) What action they should take
   - **Notes**: (Optional) Any additional context
3. Click **"Save metadata"**

**Important**: Each flow maintains its own step sequence. Flow 1 can have steps 1, 2, 3, and Flow 2 can also have steps 1, 2, 3 independently.

### Step 4: Save to Firebase

1. After adding metadata to all screens, click **"Save to Firebase"**
2. This persists all your assets and metadata permanently
3. Your comparator is now ready for simulations!

## Best Practices

### Naming Conventions
- **Comparator Name**: Use descriptive names like "Onboarding A/B Test", "Pricing Page Variants", "Checkout Flow Comparison"
- **Step Names**: Be consistent across both flows for easier comparison (e.g., both flows have "Step 1: Landing", "Step 2: Signup Form")

### Step Numbering
- Start each flow with Step 1
- Use consecutive numbers (1, 2, 3, 4...)
- Keep step numbers unique within each flow
- Flows can have different numbers of steps

### Metadata Quality
- Fill in at least **Step Number**, **Step Name**, and **Page Type** for all assets
- Use **User Intent** and **Expected Action** to help the simulation understand user behavior
- Add **Notes** for friction points or key conversion moments

### Asset Organization
- Upload screens in the correct flow folder (don't mix Flow 1 and Flow 2)
- Use clear, descriptive filenames
- Ensure all screens are visible and readable

## Example Workflow

### Scenario: Testing Two Signup Flows

**Flow 1: Single-Step Signup**
- Step 1: Landing Page with signup form
- Step 2: Email verification
- Step 3: Welcome dashboard

**Flow 2: Multi-Step Signup**
- Step 1: Landing page with CTA
- Step 2: Email collection
- Step 3: Password creation
- Step 4: Profile details
- Step 5: Email verification
- Step 6: Welcome dashboard

### Creating the Comparison

1. Create folder: "Signup Flow Comparison"
2. Upload 3 screens to Flow 1, set steps 1-3
3. Upload 6 screens to Flow 2, set steps 1-6
4. Add metadata to all screens
5. Save to Firebase
6. Run simulation to compare conversion rates

## Technical Details

### Folder Structure
```
Product Flow Comparator (parent)
├── Flow 1 (subfolder, type: product-flow)
│   ├── Asset 1 (Step 1 metadata)
│   ├── Asset 2 (Step 2 metadata)
│   └── Asset 3 (Step 3 metadata)
└── Flow 2 (subfolder, type: product-flow)
    ├── Asset 1 (Step 1 metadata)
    ├── Asset 2 (Step 2 metadata)
    └── Asset 3 (Step 3 metadata)
```

### Asset Types
- **Parent Folder**: `product-flow-comparator` (cannot upload assets directly)
- **Subfolders**: `product-flow` (can upload assets with product flow metadata)

### Metadata Schema
Each asset in Flow 1 and Flow 2 uses `ProductFlowMetadata`:
```typescript
interface ProductFlowMetadata {
  stepNumber: number;          // Required, unique per flow
  stepName: string;             // Required
  pageType: ProductFlowPageType; // Required
  userIntent?: string;          // Optional
  expectedAction?: string;      // Optional
  notes?: string;               // Optional
}
```

## Troubleshooting

### "Duplicate step number" error
- Ensure step numbers are unique within each flow
- Flow 1 and Flow 2 can have the same step numbers (e.g., both can have Step 1)

### Cannot upload to comparator folder
- You must upload to Flow 1 or Flow 2 subfolders, not the parent comparator
- Click on the comparator, then click on Flow 1 or Flow 2 to upload

### Assets not showing in upload modal
- Only uploadable folders appear (not comparator parents)
- Look for folders labeled with "→" showing the hierarchy (e.g., "Onboarding Test → Flow 1")

### Missing metadata warning
- Fill in at least Step Number, Step Name, and Page Type
- Click the pencil icon on each asset to add metadata
- Don't forget to click "Save to Firebase" after adding metadata

## Limitations

- Each comparator has exactly 2 flows (Flow 1 and Flow 2)
- Cannot rename subfolders after creation
- Cannot delete individual subfolders (only the entire comparator)
- Step numbers must be positive integers
- Each flow must have at least one asset for simulation

## FAQ

**Q: Can I create more than 2 flows in a comparator?**  
A: Currently, each comparator supports exactly 2 flows. To compare more variants, create multiple comparators.

**Q: Can I compare different types of flows (e.g., signup vs. checkout)?**  
A: Yes, but it's recommended to compare similar flows for meaningful results. Both flows use the same metadata structure.

**Q: What happens if Flow 1 has 5 steps and Flow 2 has 3 steps?**  
A: That's perfectly fine. The simulation will compare them appropriately and show where each flow ends.

**Q: Can I reorder steps after uploading?**  
A: Yes, edit each asset's metadata and change the step number. Make sure to keep step numbers unique within each flow.

**Q: Will the parent folder show asset count?**  
A: Yes, the parent comparator folder will show the total count across both flows on the main Assets page.
