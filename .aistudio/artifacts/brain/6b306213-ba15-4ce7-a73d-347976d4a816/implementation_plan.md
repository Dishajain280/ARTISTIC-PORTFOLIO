# ATELIER — Hackathon Architecture & Implementation Blueprint

An editorial online presence and structured commission platform for independent artists, craft creators, and small makers. Unifies portfolios, galleries, collections, and commission requests into a single shareable link (`/@artistname`).

---

## 1. Executive Product Specification Analysis

### Problem & Opportunity
Independent visual artists and craft makers currently suffer from fragmented workflows:
- **Discovery**: Instagram / TikTok (unstructured, algorithmic suppression)
- **Commissions**: Instagram DMs / WhatsApp (unstructured, missing budgets, vague deadlines, scope creep)
- **Portfolio**: Squarespace / Carrd (disconnected from commission intake)
- **Files & Invoicing**: Google Drive + Venmo / PayPal links

### Core Solution
**ATELIER** provides each creator with a single, high-aesthetic shareable identity:
`atelier.app/@artistname` (in-app: `/@artistname`)
1. **Curated Monograph & Portfolio**: High-resolution gallery organized by collections and featured works.
2. **Transparent Commission Services**: Tiered offerings with base price, estimated turnaround, and revision limits.
3. **Structured Commission Intake**: Replaces chaotic DMs with a structured brief generator.
4. **Artist Commission Desk**: Kanban/list inbox tracking requests from `RECEIVED` to `DELIVERED`.
5. **AI Craft Assistants**: Gemini-powered helpers for artwork metadata, artist statements/bios, and structured client briefs (always human-editable before publishing).

---

## 2. Minimum Viable Feature Set (Hackathon Scope)

```
┌────────────────────────────────────────────────────────────────────────┐
│                          ATELIER HACKATHON MVP                         │
├───────────────────────────────────┬────────────────────────────────────┤
│              PHASE 1              │              PHASE 2               │
│         Identity & Showcase       │        Commissions & Inbox         │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Editorial Landing Page          │ • Commission Service Offerings     │
│ • Seamless Demo Auth (@maya)      │ • Structured Intake Request Form   │
│ • Artist Onboarding (@handle)     │ • Commission Inbox Dashboard       │
│ • Public /@handle Profile View    │ • 6-Stage Request Status Engine    │
│ • Artwork CRUD + Collections      │ • AI Brief Generator for Clients   │
│ • AI Metadata & Bio Assistants    │ • Live Demo Scenario Fast-Switch   │
└───────────────────────────────────┴────────────────────────────────────┘
```

### Excluded for Hackathon Reliability
- No real Stripe/escrow financial processing (simulated quotes & terms).
- No complex marketplace search directory (the link is artist-first).
- No native mobile apps (responsive mobile-first web layout).
- No chat/instant messenger (structured status milestones replace DM chat).

---

## 3. Application Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                              CLIENT TIER                               │
│  React 19 + TypeScript + Tailwind CSS v4 + Motion + Lucide             │
│                                                                        │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────┐  │
│  │   Public Views   │  │   Artist Desk    │  │   Intake & Modals    │  │
│  │  - / (Landing)   │  │  - /dashboard    │  │  - Commission Form   │  │
│  │  - /@handle      │  │  - /artwork/new  │  │  - AI Brief Assistant│  │
│  │  - /@handle/comm │  │  - /commissions  │  │  - Lightbox / Inspect│  │
│  └─────────┬────────┘  └────────┬─────────┘  └──────────┬───────────┘  │
└────────────┼────────────────────┼───────────────────────┼──────────────┘
             │                    │                       │
             ▼                    ▼                       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        API / SERVER ROUTE TIER                         │
│  Express + Node.js (server.ts) on Port 3000                            │
│                                                                        │
│  ┌───────────────┐ ┌────────────────┐ ┌──────────────────────────────┐ │
│  │ /api/creators │ │ /api/artworks  │ │ /api/commissions             │ │
│  │ /api/auth     │ │ /api/collect   │ │ /api/services                │ │
│  └───────┬───────┘ └───────┬────────┘ └──────────────┬───────────────┘ │
│          │                 │                         │                 │
│          ▼                 ▼                         ▼                 │
│  ┌─────────────────────────────────┐  ┌──────────────────────────────┐ │
│  │    In-Memory/SQLite Store       │  │    @google/genai (Gemini)    │ │
│  │    - Zod Schema Validation      │  │    - 'gemini-3.8-flash'      │ │
│  │    - Realistic Seed (@maya, etc)│  │    - Bio / Meta / Brief Gen  │ │
│  └─────────────────────────────────┘  └──────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Proposed Folder Structure

```
/
├── server.ts                    # Express backend + Vite middleware proxy
├── src/
│   ├── api/                     # Typed client fetchers for /api/*
│   │   ├── client.ts
│   │   ├── creators.ts
│   │   ├── artworks.ts
│   │   ├── commissions.ts
│   │   └── ai.ts
│   ├── components/
│   │   ├── ui/                  # Buttons, Inputs, Dialogs, Cards, Badges
│   │   ├── layout/              # Header, Footer, StudioNav, DemoSwitcher
│   │   ├── profile/             # Hero, GalleryGrid, CollectionTabs, ServiceCard
│   │   ├── dashboard/           # CommissionInbox, StatusPipeline, ArtworkTable
│   │   ├── commissions/         # StructuredRequestModal, StatusBadge
│   │   └── ai/                  # AiBioAssistant, AiMetadataModal, AiBriefModal
│   ├── data/
│   │   ├── mockData.ts          # Curated seed database (Maya Lin, Elena, Marcus)
│   │   └── presets.ts           # Curated artwork textures, mediums, palettes
│   ├── hooks/                   # useAuth, useCreator, useCommissions
│   ├── schemas/                 # Zod validation schemas
│   │   ├── creator.ts
│   │   ├── artwork.ts
│   │   ├── service.ts
│   │   └── commission.ts
│   ├── types/                   # TypeScript interfaces and status unions
│   │   └── index.ts
│   ├── views/
│   │   ├── LandingView.tsx      # High-aesthetic platform landing
│   │   ├── PublicProfileView.tsx# The core /@handle public experience
│   │   ├── CommissionPublicView # /@handle/commissions booking page
│   │   ├── DashboardView.tsx    # Artist studio control center
│   │   ├── ArtworkEditorView.tsx# Artwork creation/editing with AI helper
│   │   └── OnboardingView.tsx   # Handle claiming and profile setup
│   ├── App.tsx                  # Root state, URL router (/@handle aware)
│   └── index.css                # Tailwind theme tokens & typography
```

---

## 5. Database Schema & Data Models

### Creator
```typescript
interface Creator {
  id: string;
  handle: string;              // e.g. "maya" -> /@maya
  name: string;                // e.g. "Maya Chen"
  tagline: string;             // e.g. "Architectural Ceramics & Basalt Vessels"
  bio: string;
  avatarUrl: string;
  heroImageUrl?: string;
  location: string;
  medium: string;              // e.g. "Ceramics & Stoneware"
  socialLinks: {
    instagram?: string;
    website?: string;
    twitter?: string;
  };
  themeSettings: {
    palette: 'linen' | 'carbon' | 'terracotta';
    layout: 'editorial' | 'dense' | 'monograph';
  };
  createdAt: string;
}
```

### Artwork
```typescript
interface Artwork {
  id: string;
  creatorId: string;
  collectionId?: string;
  title: string;
  description: string;
  images: string[];            // Main image + alternate detail angles
  medium: string;              // e.g. "Wood-fired Shigaraki stoneware"
  year: number;
  dimensions: string;          // e.g. "34 × 22 × 22 cm"
  tags: string[];
  featured: boolean;           // Showcases in hero monograph
  status: 'available' | 'reserved' | 'private_collection' | 'exhibition_loan';
  price?: number;
  createdAt: string;
}
```

### Collection
```typescript
interface Collection {
  id: string;
  creatorId: string;
  title: string;               // e.g. "Tectonic Residue (2024)"
  description: string;
  order: number;
  visibility: 'public' | 'unlisted';
}
```

### CommissionService
```typescript
interface CommissionService {
  id: string;
  creatorId: string;
  title: string;               // e.g. "Bespoke Sculptural Vessel"
  description: string;
  basePrice: number;           // e.g. 1800
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
  turnaroundWeeks: number;     // e.g. 6 (weeks)
  revisionsIncluded: number;   // e.g. 2
  active: boolean;             // Open / Closed for commissions
  deliverables: string[];      // e.g. ["Pre-firing clay maquette review", "Certificate of authenticity"]
}
```

### CommissionRequest
```typescript
type CommissionStatus =
  | 'RECEIVED'
  | 'IN_REVIEW'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'IN_PROGRESS'
  | 'DELIVERED'
  | 'CANCELLED';

interface CommissionRequest {
  id: string;
  creatorId: string;
  serviceId: string;
  clientName: string;
  clientEmail: string;
  brief: string;               // AI-assisted structured brief
  references: string[];        // Image URLs or inspiration keywords
  budget: number;
  currency: string;
  targetDeadline?: string;
  dimensionsRequired?: string;
  status: CommissionStatus;
  statusNotes?: string;        // Artist's update note to client
  createdAt: string;
  updatedAt: string;
}
```

---

## 6. Real vs. Development Fallbacks

| Feature | Real Implementation | Development Fallback Strategy |
| :--- | :--- | :--- |
| **Routing / Identity** | Real path routing for `/@handle` & `/dashboard` | Client router handles URL pathname with demo selector |
| **Authentication** | Real session state with fast profile switching | One-click instant login as `@maya` or claim new `@handle` |
| **Database** | In-memory reactive store initialized with rich seed | Automatically reset or mutate live; zero API key dependencies |
| **AI Helpers** | Real Google Gemini API calls via `@google/genai` | Uses `gemini-3.8-flash` on Express backend (`/api/ai/*`) |
| **Image Storage** | Real image previews + high-res CDN presets | Curated art CDN library + local drag & drop object URLs |
| **Notifications** | Real visual status ledger & toast dispatch | No live Resend API key required; displays client inbox state |

---

## 7. Implementation Order

1. **Sprint 1: Core Framework & Routing**
   - Express server (`server.ts`) with Gemini SDK backend proxy.
   - Setup client routing supporting `/@handle`, `/dashboard`, and `/`.
2. **Sprint 2: Public Artist Experience (`/@handle`)**
   - High-end editorial profile header, featured artwork, collections filter tabs.
   - Artwork grid, modal zoom inspect, and commission service cards.
3. **Sprint 3: Structured Commission Intake & AI Brief Generator**
   - "Commission Me" interactive modal with client brief wizard.
   - Gemini AI integration to transform bullet points into an actionable commission brief.
4. **Sprint 4: Artist Dashboard & Commission Pipeline**
   - Live commission inbox with status transitions (`RECEIVED` → `IN_REVIEW` → `ACCEPTED` → `IN_PROGRESS` → `DELIVERED`).
   - Artwork CRUD modal with AI metadata assistant (auto-generates title, medium description, and tags).
5. **Sprint 5: Demo Switcher & Hackathon Polish**
   - Floating demo toolbar: "View as Visitor" vs "View as Artist (@maya)".
   - Seed data with realistic commissions at different status stages.

---

## 8. Potential Technical Risks & Mitigations

1. **Risk: `/@handle` routing conflicts with normal routes.**
   *Mitigation*: Strict route hierarchy: explicit routes (`/dashboard`, `/onboarding`) take priority; any `/@:handle` or `/:handle` is resolved by the creator lookup engine.
2. **Risk: Gemini API rate limit or latency during live demo.**
   *Mitigation*: Fast timeout with graceful fallback suggestions; AI assists with clear loading spinners and editable textarea outputs.
3. **Risk: Demo state gets dirty during a presentation.**
   *Mitigation*: Include a 1-click **"Reset Demo Data"** button in the demo toolbar to instantly restore `@maya` to pristine state.

---

## 9. Hackathon Demo Reliability Strategy

- **Dual-Perspective Header**: Presenters can switch seamlessly between "Viewing as Visitor" and "Artist Dashboard" in 1 click without logging out.
- **Pre-populated Pipeline**: The inbox begins with 3 realistic commission requests (1 `RECEIVED`, 1 `IN_REVIEW`, 1 `IN_PROGRESS`) so judges see the workflow immediately without typing test data from scratch.
- **Speed & Zero Spinners**: All interactions are instant and fluid.
