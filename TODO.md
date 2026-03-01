# BAZ Empire - Integration Plan

## Task: Unify all BAZ ecosystem apps and deploy to GitHub

### Current Structure
- **BAZ-Ecosystem** (monorepo root)
  - apps/purple-empire - Main app with routing (Landing, Kraken, Seller, Marketer, Clone)
  - apps/universe - Auction, Marketer, Seller dashboards
  - apps/ventures-academy - Academy context
  - apps/ad-optimizer - Ad optimizer app

### Integration Steps

#### Phase 1: Update Routing in purple-empire
- [ ] Add universe pages to App.tsx routes
- [ ] Update KrakenNav to include new routes (Universe, Academy, AdOptimizer)

#### Phase 2: Integrate shared-ui components
- [ ] Import shared-ui components into purple-empire
- [ ] Replace existing UI with shared-ui components

#### Phase 3: Add missing pages from universe
- [ ] Create AuctionRoom page (from universe)
- [ ] Create MarketerDashboard page (from universe)
- [ ] Create SellerDashboard page (from universe)
- [ ] Create PlaybookLibrary page (from universe)

#### Phase 4: GitHub Deployment
- [ ] Check/create GitHub repo for BAZ-Ecosystem
- [ ] Push all changes to GitHub

### New Routes to Add
- /universe - Universe app (AuctionRoom, dashboards)
- /academy - Ventures Academy
- /ad-optimizer - Ad Optimizer

### Navigation Update
Add to navItems:
- { path: "/universe", label: "Universe", icon: Globe }
- { path: "/academy", label: "Academy", icon: GraduationCap }
- { path: "/ad-optimizer", label: "Ads", icon: Megaphone }
