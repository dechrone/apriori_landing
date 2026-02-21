# API Contract: Frontend ↔ Backend

This document describes the **data schemas and API contract** so the backend can stay compatible with the dashboard frontend. It is derived from the landing app’s types, pages, and UI flows.

**Conventions**
- **Receive (FROM backend):** GET list/detail responses the frontend expects.
- **Send (TO backend):** POST/PUT/PATCH request bodies the frontend will send.

---

## 1. Dashboard Details

### 1.1 Data received FROM backend

The dashboard shows **recent simulations** only. No dedicated dashboard API is required if the simulations list API is used.

If you add a dedicated dashboard endpoint, it should return at least:

```ts
// GET /api/v1/dashboard (optional)
{
  recentSimulations: SimulationListItem[]  // see Simulations §2.1
}
```

---

## 2. Simulations

### 2.1 Data received FROM backend

**List (for dashboard + simulations list page)**

```ts
// GET /api/v1/simulations
// Query: ?type=all|product-flow|ad-portfolio&status=all|draft|running|completed|failed&search=...

interface SimulationListItem {
  id: string;
  type: 'Product Flow' | 'Ad Portfolio';   // display label; backend may use 'product-flow' | 'ad-portfolio'
  status: 'draft' | 'running' | 'completed' | 'failed';
  name: string;
  metric: string;       // e.g. "+18% retention predicted", "Running 10 variants"
  timestamp: string;   // e.g. "2 days ago", "Started 3 hours ago"
}
```

**Product Flow simulation detail (results)**

```ts
// GET /api/v1/simulations/{id}
// Used by: /simulations/[id] (Product Flow result page)

interface ProductFlowSimulationResult {
  id: string;
  title: string;           // e.g. "Onboarding Flow Optimization"
  type: 'product-flow';
  status: 'draft' | 'running' | 'completed' | 'failed';
  runDate?: string;        // e.g. "Feb 6, 2026"
  primaryMetric?: string;  // e.g. "+18% retention predicted"
  // Summary tab
  funnel?: unknown;        // "Drop-off Funnel" visualization data
  frictionPoints: Array<{
    severity: 'high' | 'medium' | 'low';
    step: string;          // e.g. "Step 3"
    issue: string;
    impact: string;        // e.g. "32% drop-off rate"
  }>;
  predictedMetrics: Array<{
    label: string;         // e.g. "Completion Rate"
    value: string;         // e.g. "68%"
    change: string;        // e.g. "+12%"
    positive: boolean;
  }>;
}
```

**Ad Portfolio simulation detail (results)**

Referenced in UI as: `GET /api/v1/simulations/{id}/results` (returns full simulation data).

```ts
// GET /api/v1/simulations/{id}/results
// Used by: /simulations/ad-portfolio/[id]

interface AdPortfolioSimulationResult {
  meta: {
    archetypeCount: number;
    adCount: number;
    iterationsPerArchetype: number;
    totalSimulations: number;
    validReactions: number;
    flaggedCount: number;
    runDate: string;         // e.g. "February 14, 2026"
    confidenceLevel: number; // e.g. 95
  };
  archetypes: Array<{
    name: string;
    pct: number;
    personas: number;
    users: string;           // e.g. "~400K"
  }>;
  ads: Array<{
    id: string;
    name: string;
    desc: string;
    ctr: number;
    ctrCi: number;
    clicks: number;
    highIntent: number;
    trust: number;
    trustCi: number;
    relevance: number;
    sims: number;
    rec: 'scale' | 'maintain' | 'optimize' | 'replace';
    actions: [string, string][];  // [label, actionKey][]
  }>;
  insights: Array<{
    num: number;
    title: string;
    description: string;
    confidence: number;
    ci: [number, number];
    sample: number;
    effectSize?: number;
    rec: string;
    actions: [string, string][];
  }>;
  actionPlan: Array<{
    priority: 'immediate' | 'short-term' | 'long-term';
    num: number;
    title: string;
    impact: string;
    effort: string;
    risk: string;
    aiNote?: boolean;
    actions: [string, string][];
  }>;
  validationChecks?: string[];
  reactionMatrix?: Array<{
    archetype: string;
    personas: number;
    ad1: 'high' | 'mid' | 'none';
    ad2: 'high' | 'mid' | 'none';
    ad3: 'high' | 'mid' | 'none';
    ad4: 'high' | 'mid' | 'none';
    cr1: number;
    cr2: number;
    cr3: number;
    cr4: number;
  }>;
}
```

### 2.2 Data sent TO backend

**Create Product Flow simulation**

```ts
// POST /api/v1/simulations/product-flow

{
  name: string;                    // required
  audience: string;                // audience id
  personaDepth: 'low' | 'medium' | 'high';
  optimizeMetric: string;          // e.g. 'signup-completion' | 'activation' | 'checkout-conversion' | 'retention-7d' | 'retention-30d'
  selectedFolderIds: string[];     // asset folder ids (product-flow, ready only)
}
```

**Create Ad Portfolio simulation**

```ts
// POST /api/v1/simulations/ad-portfolio

{
  name: string;           // required
  audience: string;       // audience id
  selectedFolderId: string;  // single ad-creative folder id (ready only)
}
```

---

## 3. Audiences

### 3.1 Data received FROM backend

**List**

```ts
// GET /api/v1/audiences

interface AudienceListItem {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'archived';
  usedInSimulations: number;
  demographics: string[];   // e.g. ["Age: 25-45", "Location: US"]
  psychographics: string[]; // e.g. ["Value-driven", "Cost-conscious"]
  budget: string;           // e.g. "Medium"
  risk: string;             // e.g. "Low"
}
```

**Detail (for edit / simulation dropdown)**

Full audience model used by types and (future) edit screen:

```ts
// GET /api/v1/audiences/{id}

interface Audience {
  id: string;
  status: 'draft' | 'active' | 'archived';
  createdAt: string;   // ISO
  updatedAt: string;  // ISO
  usedInSimulations?: number;
  confidenceScore?: number;  // 0–100
  identity: {
    audienceName: string;
    audienceType: 'b2b-decision-maker' | 'b2b-influencer' | 'b2c-end-user' | 'custom';
    primaryRole: string;
    secondaryRoles?: string;
    reportingStructure?: 'ic' | 'manager' | 'exec';
  };
  firmographics?: {
    companySizeMin?: number;
    companySizeMax?: number;
    revenueRange?: string;
    companyStage?: 'seed' | 'series-a' | 'series-b' | 'series-c' | 'growth' | 'enterprise';
    industryPrimary?: string;
    industrySecondary?: string;
    geographyHQ?: string;
    geographyMarkets?: string;
    teamMaturity?: 'early' | 'scaling' | 'mature';
    buyingMotion?: 'founder-led' | 'committee-led' | 'hybrid';
    procurementComplexity?: 'low' | 'medium' | 'high';
  };
  goals?: {
    businessGoal1?: string;
    businessGoal2?: string;
    businessGoal3?: string;
    personalSuccessMetrics?: string;
    timeHorizon?: 'short' | 'medium' | 'long';
  };
  painPoints?: {
    topProblems?: string;
    problemSeverity?: 'low' | 'medium' | 'existential';
    currentWorkarounds?: string;
    triedBefore?: string;
  };
  decisionBehavior: {
    riskAppetite: number;  // 0–100
    dataDependency?: 'gut-driven' | 'balanced' | 'metrics-driven';
    decisionSpeed?: 'immediate' | 'considered' | 'slow';
    trustThreshold?: string;
    changeResistance?: 'low' | 'medium' | 'high';
    openToNewTools?: boolean;
    prefersBestInClass?: boolean;
    vendorLockInSensitive?: boolean;
  };
  budget?: {
    budgetRange?: string;
    budgetFlexibility?: 'fixed' | 'flexible' | 'expandable';
    approvalRequired?: boolean;
    willingnessToPay?: string;
  };
}
```

**Filter definition (for create audience)**

The create-audience flow uses a **filter tree**. The frontend sends this structure when creating an audience.

```ts
// Condition tree (root is a group)
interface ConditionNode {
  id: string;
  type: 'condition';
  fieldId: string | null;
  operator: ConditionOperator | null;
  value: unknown;
}

interface ConditionGroupNode {
  id: string;
  type: 'group';
  operator: 'AND' | 'OR';
  children: Array<ConditionNode | ConditionGroupNode>;
}

type ConditionOperator =
  | 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte'
  | 'between' | 'in' | 'not_in' | 'contains' | 'not_contains';
```

Supported `fieldId`s (from AudienceFilterBuilder) include: `age`, `gender`, `education`, `marital_status`, `occupation`, plus geography, socioeconomic, behavioral, psychographic, digital fields. Backend can mirror the same field set or map to internal attributes.

### 3.2 Data sent TO backend

**Create audience (current flow: name, description + filter tree)**

```ts
// POST /api/v1/audiences

{
  name: string;           // required
  description?: string;
  filters: ConditionGroupNode;  // root group, at least one child required
  status?: 'draft' | 'active';  // optional; draft when "Save draft"
}
```

**Update audience (for future edit)**

```ts
// PATCH /api/v1/audiences/{id}

Partial<{
  name: string;
  description: string;
  status: 'draft' | 'active' | 'archived';
  filters: ConditionGroupNode;
  identity: Audience['identity'];
  firmographics: Audience['firmographics'];
  goals: Audience['goals'];
  painPoints: Audience['painPoints'];
  decisionBehavior: Audience['decisionBehavior'];
  budget: Audience['budget'];
}>
```

---

## 4. Product context

### 4.1 Data received FROM backend

```ts
// GET /api/v1/product-context (or similar)

interface ProductContext {
  productType: 'saas' | 'marketplace' | 'ecommerce' | 'platform';
  pricingModel: 'subscription' | 'usage-based' | 'one-time' | 'freemium';
  salesMotion: 'plg' | 'sales-led' | 'hybrid';
  kpis: string[];    // e.g. ["Retention", "LTV", "Activation Rate", "Conversion Rate", "Churn Rate"]
  constraints: string;
}
```

### 4.2 Data sent TO backend

```ts
// PUT or PATCH /api/v1/product-context

{
  productType: string;
  pricingModel: string;
  salesMotion: string;
  kpis: string[];
  constraints: string;
}
```

---

## 5. Assets

### 5.1 Data received FROM backend

**Folder list**

```ts
// GET /api/v1/assets/folders (or GET /api/v1/folders)

interface AssetFolder {
  id: string;
  name: string;
  description?: string;
  assetType: 'product-flow' | 'ad-creative';
  createdAt: string;   // ISO
  updatedAt: string;   // ISO
  assetCount: number;
  usedInSimulations: number;
  status: 'ready' | 'missing-metadata' | 'incompatible';
}
```

**Assets in a folder**

```ts
// GET /api/v1/assets/folders/{folderId}/assets (or GET /api/v1/folders/{folderId}/assets)

interface Asset {
  id: string;
  folderId: string;
  name: string;
  url: string;
  assetType: 'product-flow' | 'ad-creative';
  createdAt: string;
  status: 'complete' | 'missing-info';
  productFlowMetadata?: {
    stepNumber: number;
    stepName: string;
    pageType: 'signup' | 'onboarding' | 'pricing' | 'dashboard' | 'checkout' | 'other';
    userIntent?: string;
    expectedAction?: string;
    notes?: string;
  };
  adCreativeMetadata?: {
    caption: string;
    creativeFormat: 'image' | 'video';
    platform: 'meta' | 'google' | 'generic';
    hookType?: 'pain-driven' | 'curiosity' | 'authority' | 'offer-led';
    ctaType?: string;
    targetPersonaId?: string;
    angleTheme?: string;
  };
  linkedSimulationIds?: string[];
}
```

### 5.2 Data sent TO backend

**Create folder**

```ts
// POST /api/v1/assets/folders (or POST /api/v1/folders)

{
  name: string;
  assetType: 'product-flow' | 'ad-creative';
  description?: string;
}
```

**Update folder**

```ts
// PATCH /api/v1/assets/folders/{folderId}

{
  name: string;
  description?: string;
}
```

**Upload assets**

- **Request:** `multipart/form-data` with `folderId` and `files[]` (or equivalent).
- **Accepted types:** images, PDF (e.g. `image/*,.png,.jpg,.jpeg,.gif,.webp,.pdf`).
- **Constraint:** e.g. max 10MB per file (document in API spec).

**Update asset (metadata only)**

```ts
// PATCH /api/v1/assets/{assetId}
// Or PATCH /api/v1/assets/folders/{folderId}/assets/{assetId}

// Product-flow asset
{
  productFlowMetadata: {
    stepNumber: number;
    stepName: string;
    pageType: 'signup' | 'onboarding' | 'pricing' | 'dashboard' | 'checkout' | 'other';
    userIntent?: string;
    expectedAction?: string;
    notes?: string;
  }
}

// Ad-creative asset
{
  adCreativeMetadata: {
    caption: string;
    creativeFormat: 'image' | 'video';
    platform: 'meta' | 'google' | 'generic';
    hookType?: 'pain-driven' | 'curiosity' | 'authority' | 'offer-led';
    ctaType?: string;
    angleTheme?: string;
    targetPersonaId?: string;
  }
}
```

**Delete folder**

```ts
// DELETE /api/v1/assets/folders/{folderId}
```

**Delete asset**

```ts
// DELETE /api/v1/assets/{assetId}
// Or DELETE /api/v1/assets/folders/{folderId}/assets/{assetId}
```

---

## 6. Summary table

| Area            | FROM backend (GET)                    | TO backend (POST/PATCH/PUT/DELETE)     |
|----------------|--------------------------------------|----------------------------------------|
| Dashboard      | Optional: recent simulations list    | —                                      |
| Simulations    | List, Product Flow result, Ad Portfolio result | Create product-flow, Create ad-portfolio |
| Audiences      | List, Detail (full Audience)         | Create (name, description, filters), PATCH |
| Product context| Single product context object         | PUT/PATCH product context              |
| Assets         | Folder list, Assets in folder        | Create/update/delete folder; upload assets; PATCH asset metadata; delete asset |

---

## 7. TypeScript types in repo

- **Audiences:** `src/types/audience.ts` — `Audience`, `AudienceFormState`, enums.
- **Assets:** `src/types/asset.ts` — `AssetFolder`, `Asset`, `ProductFlowMetadata`, `AdCreativeMetadata`, enums.
- **Filter tree:** `src/components/audiences/AudienceFilterBuilder.tsx` — `ConditionNode`, `ConditionGroupNode`, `ConditionOperator`, `LogicalOperator`, `FilterField`.

Use these as the source of truth for request/response shapes when implementing or validating the backend.
