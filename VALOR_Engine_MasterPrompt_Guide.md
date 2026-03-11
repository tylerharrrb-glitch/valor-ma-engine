# ⚔️ VALOR — M&A & Transaction Structuring Engine
## Master Execution Prompt + Full Development Guide
### For Google Antigravity | Claude Opus 4.6 (Thinking)

---

# PART 0: ENGINE NAME & BRAND IDENTITY

## ✅ Confirmed Name: **VALOR**
### Full Name: *Valor M&A Engine*
### Tagline: *"Courage Meets Capital"*

**The Three Layers of Meaning**

| Layer | Meaning | Connection to M&A |
|---|---|---|
| **Courage** | Valor = exceptional bravery | The courage to make a $500M bid, walk away from a bad deal, challenge management projections |
| **Value** | Latin *valēre* = "to be worth" | Shares DNA with: value, valuation, valid, evaluate — the entire language of M&A |
| **Strength** | *Valēre* = "to be strong" | Stress-tested models. Bulletproof deal structures. Fortified debt schedules. |

**Suite Cohesion:**
```
1. 🐺 Wolf Valuation Engine   ← "What is it worth?"
2. 📊 3-Statement Model Engine ← "How does it perform?"
3. ⚔️ Valor M&A Engine        ← "How do we close the deal?"

"Wolf finds the value. Valor has the courage to close."
```

**Deployment URL:** `valor-ma-engine.pages.dev`

---

# PART 1: MASTER EXECUTION PROMPT FOR GOOGLE ANTIGRAVITY

> **Instructions:** Copy everything inside the block below and paste it as your prompt into Google Antigravity. This is a single, complete master prompt. Do NOT split it into parts. Do NOT modify the financial formulas.

---

```
=============================================================================
MASTER BUILD PROMPT — VALOR M&A ENGINE
"Courage Meets Capital"
Claude Opus 4.6 (Thinking) | Google Antigravity
=============================================================================

YOU ARE BUILDING: "VALOR" — A professional-grade, Egypt/MENA-focused M&A
and Transaction Structuring Engine for investment banking use.

CRITICAL NON-NEGOTIABLES:
- Every single financial calculation must be 100% mathematically correct.
- This tool will be used for real financial decisions by investment bankers,
  PE professionals, and corporate finance teams in Egypt and MENA.
- Any rounding must be explicitly labeled. No silent rounding.
- All formulas must be derived from first principles of corporate finance.
- Egyptian tax rates, regulatory thresholds, and labor law must be hardcoded
  accurately and sourced from Egyptian law.
- The brand voice is: Confident. Precise. Institutional. Bold.
  Never casual. Never verbose. Speak like a senior M&A banker.

=============================================================================
SECTION 1: TECHNOLOGY STACK & PROJECT SETUP
=============================================================================

Framework:        React (with hooks: useState, useEffect, useCallback, useMemo,
                  useContext, useReducer)
Styling:          Tailwind CSS (utility classes only, no custom CSS files)
Charts:           Recharts (for all visualizations)
Icons:            lucide-react
Language:         JavaScript (JSX)
Hosting Target:   Cloudflare Pages
Entry Point:      Single-page app with client-side routing (no Next.js)
State:            React Context + useReducer (no Redux, no localStorage)
Export:           jsPDF + html2canvas for PDF generation

DESIGN SYSTEM — VALOR BRAND:
═══════════════════════════════════════════════════════════════════════

PRIMARY COLORS:
- Valor Black:    #0B0F1A  → Primary background, navbar
- Valor Navy:     #1A2340  → Card surfaces, sidebar, panels
- Valor Gold:     #C5A44E  → Logo, accents, CTAs, highlights
- Valor Gold Hover: #D4B568 → Hover states on gold elements
- Valor Bronze:   #8B7534  → Secondary accents, subtle borders
- Valor Ivory:    #F4EDE4  → Primary text on dark backgrounds
- Valor Steel:    #2C3E6B  → Data tables, secondary text, grid lines

STATUS COLORS:
- Accretive Green: #4CAF50 → Positive values, accretion, gains
- Dilutive Red:    #E53935 → Negative values, dilution, losses
- Caution Amber:   #FF9800 → Warnings, moderate risk
- Neutral Slate:   #7C8DB0 → Disabled states, neutral data

TYPOGRAPHY:
- Display/Logo:   'Playfair Display', serif, weight 700
                  (Google Fonts — use for VALOR wordmark, page titles, hero)
- UI/Navigation:  'Inter', sans-serif
                  (Use for navigation, buttons, labels, body text)
- Data/Numbers:   'IBM Plex Mono', monospace
                  (Use for ALL financial figures, calculations, model outputs)
                  Critical: monospace ensures column alignment in tables

LOGO MARK:
  The "Shield of Valor" — a minimalist heraldic shield with the letter "V"
  rendered in Valor Gold (#C5A44E) on Valor Black (#0B0F1A).
  The shield represents protection of deal value.
  The V represents Valor + Value + Victory.
  Use ⚔️ emoji as placeholder until SVG is created.

BRAND VOICE (apply to ALL UI text):
  ✅ "Configure your transaction parameters"   ← institutional
  ❌ "Hey! Set up your deal here 👋"           ← never
  ✅ "Transaction is accretive by 12.4%."      ← precise
  ❌ "Looks like the deal is working out!"     ← never
  ✅ "Intelligence ready. 42 scenarios modeled." ← confident
  ❌ "Done! Your analysis is complete 🎉"      ← never

VALOR TERMINOLOGY (use throughout UI):
  Say "Vault"              instead of "Save / Database"
  Say "Campaign"           instead of "Deal / Project"
  Say "Command Center"     instead of "Dashboard"
  Say "Parameters"         instead of "Settings"
  Say "Scenario Matrix"    instead of "Sensitivity Table"
  Say "Deal Memorandum"    instead of "PDF Report"
  Say "Deploy"             instead of "Get Started"
  Say "Dispatch"           instead of "Export"
  Say "Audit Trail"        instead of "History / Log"
  Say "Attention Required" instead of "Error"
  Say "Intelligence Ready" instead of "Analysis Complete"
  Say "Principal"          instead of "User Profile"
  Say "Archive Campaign"   instead of "Delete Deal"
  Say "Blueprint"          instead of "Template"

=============================================================================
SECTION 2: APPLICATION ARCHITECTURE
=============================================================================

Build a single-page React application with the following structure:

App.jsx
├── context/
│   └── DealContext.jsx         (global state — Context + useReducer)
│
├── constants/
│   └── egyptParams.js          (all Egypt-specific parameters)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx           (VALOR logo + deal name + currency toggle)
│   │   ├── Sidebar.jsx          (module navigation icons — collapsible)
│   │   └── DealHeader.jsx       (campaign name, status badge, FX rate)
│   │
│   ├── dashboard/
│   │   └── CommandCenter.jsx    (KPI cards + quick action tiles)
│   │
│   ├── merger/
│   │   ├── MergerInputs.jsx     (acquirer + target financials)
│   │   ├── DealTerms.jsx        (offer price, premium, consideration mix)
│   │   ├── MergerOutputs.jsx    (pro-forma P&L, EPS bridge table)
│   │   ├── AccretionChart.jsx   (waterfall chart — EPS bridge)
│   │   └── ScenarioMatrix.jsx   (sensitivity heat map — reusable)
│   │
│   ├── sources-uses/
│   │   └── SourcesUses.jsx      (balanced S&U table with live validator)
│   │
│   ├── synergies/
│   │   ├── SynergyInputs.jsx
│   │   └── SynergyOutputs.jsx
│   │
│   ├── lbo/
│   │   ├── LBOEntry.jsx         (entry assumptions + capital structure)
│   │   ├── LBOOperating.jsx     (5-year operating model)
│   │   ├── DebtSchedule.jsx     (tranche-by-tranche amortization + sweep)
│   │   ├── LBOExit.jsx          (exit assumptions + tax)
│   │   └── ReturnsAnalysis.jsx  (IRR, MOIC, returns attribution bridge)
│   │
│   ├── fairness/
│   │   ├── FootballField.jsx    (horizontal bar range chart in Recharts)
│   │   └── FairnessOutput.jsx   (determination + regulatory disclosure)
│   │
│   ├── precedents/
│   │   └── PrecedentTransactions.jsx (table + analytics + filters)
│   │
│   ├── regulatory/
│   │   └── RegulatoryChecklist.jsx   (interactive checklist + Gantt)
│   │
│   └── shared/
│       ├── CurrencyToggle.jsx   (EGP ⟷ USD global switch)
│       ├── InputField.jsx       (standardized number input with tooltip)
│       ├── MetricCard.jsx       (KPI card with gold accent line)
│       ├── SectionHeader.jsx    (section title with gold rule separator)
│       ├── StatusBadge.jsx      (Accretive/Dilutive/Balanced indicators)
│       ├── CovenantAlert.jsx    (breach warning component)
│       └── ExportPDF.jsx        (Deal Memorandum generator)

=============================================================================
SECTION 3: GLOBAL STATE — EGYPT PARAMETERS (HARDCODED CONSTANTS)
=============================================================================

Create file: constants/egyptParams.js

export const EGYPT_PARAMS = {

  // ── TAXATION ──────────────────────────────────────────────────────────
  CORPORATE_TAX_RATE: 0.225,
  // Source: Egyptian Income Tax Law No. 91 of 2005, Article 56
  // Standard rate for most Egyptian corporations

  CORPORATE_TAX_RATE_OIL_GAS: 0.40,
  // Source: Egyptian Income Tax Law No. 91 of 2005, Article 59
  // Applies to oil & gas exploration and production companies

  CAPITAL_GAINS_TAX_LISTED: 0.10,
  // Source: Capital Market Law amendments — 10% on gains from
  // sale of EGX-listed securities

  CAPITAL_GAINS_TAX_UNLISTED: 0.225,
  // Source: Egyptian Income Tax Law, Article 56
  // Unlisted equity gains treated as ordinary income at 22.5%

  STAMP_DUTY_RATE_PER_SIDE: 0.00125,
  // Source: Stamp Tax Law No. 111 of 1980
  // Rate: 1.25‰ (0.125%) per side — total effective cost = 0.25%
  // Applies to transfers of EGX-listed securities
  // Both buyer AND seller pay this separately

  DIVIDEND_WITHHOLDING_TAX_RESIDENT: 0.10,
  // Source: Egyptian Income Tax Law — 10% WHT on dividends
  // Applicable to Egyptian resident shareholders

  DIVIDEND_WITHHOLDING_TAX_NON_RESIDENT: 0.10,
  // May be reduced under applicable Double Tax Treaties
  // E.g., Egypt-UAE DTT, Egypt-UK DTT — verify per deal

  // ── CENTRAL BANK OF EGYPT (CBE) — UPDATE BEFORE EACH USE ─────────────
  CBE_OVERNIGHT_LENDING_RATE: 0.2825,  // 28.25% as of Q4 2024
  CBE_OVERNIGHT_DEPOSIT_RATE: 0.2725,  // 27.25% as of Q4 2024
  CBE_DISCOUNT_RATE: 0.2800,           // 28.00% as of Q4 2024
  // ⚠️ CBE rates change with MPC meetings. Always verify at cbe.org.eg

  // ── FX RATES — UPDATE BEFORE EACH USE ────────────────────────────────
  USD_EGP_RATE: 49.50,   // User-adjustable in UI
  SAR_EGP_RATE: 13.20,   // Saudi Riyal
  AED_EGP_RATE: 13.48,   // UAE Dirham
  EUR_EGP_RATE: 54.20,   // Euro
  GBP_EGP_RATE: 62.50,   // British Pound
  // ⚠️ FX rates are highly volatile given EGP devaluation history.
  // The UI must allow real-time FX adjustment by user.

  // ── REGULATORY THRESHOLDS ─────────────────────────────────────────────
  MANDATORY_TENDER_OFFER_THRESHOLD: 0.33,
  // Source: Capital Market Law No. 95 of 1992, Article 4
  //         + FRA Executive Regulations
  // When acquiring ≥ 33% of an EGX-listed company, acquirer MUST
  // launch a mandatory tender offer to ALL remaining shareholders
  // at the same price or the highest price paid in prior 12 months

  ECA_NOTIFICATION_THRESHOLD_REVENUE_EGP: 100_000_000,
  // Source: Egyptian Competition Law No. 3 of 2005
  // Mandatory notification to Egyptian Competition Authority (ECA)
  // if combined annual turnover of merging parties exceeds EGP 100M

  ECA_MARKET_SHARE_THRESHOLD: 0.35,
  // Source: Egyptian Competition Law No. 3 of 2005
  // Dominant market position if post-merger market share exceeds 35%
  // Triggers Phase 2 review and potential remedy requirements

  CBE_BANK_ACQUISITION_THRESHOLD: 0.10,
  // Source: CBE regulations
  // Prior CBE approval required for acquisition of >10% stake
  // in any licensed Egyptian bank

  CBE_BANK_CONTROL_THRESHOLD: 0.33,
  // Source: CBE regulations
  // "Control" threshold — heightened review and board approval required

  FRA_INSURANCE_THRESHOLD: 0.10,
  // Source: FRA (Financial Regulatory Authority) regulations
  // Prior FRA approval required for >10% acquisition of:
  // insurance company, leasing company, mortgage finance entity,
  // microfinance entity, or securities brokerage

  // ── LABOR LAW ─────────────────────────────────────────────────────────
  SEVERANCE_MONTHS_PER_YEAR_OF_SERVICE: 2,
  // Source: Egyptian Labor Law No. 12 of 2003, Article 120
  // Minimum severance = 2 months gross salary per full year of service
  // This is a MINIMUM — employment contracts may specify higher amounts
  // Applies when employer terminates for restructuring/redundancy

  SOCIAL_INSURANCE_EMPLOYER_RATE: 0.1875,  // 18.75%
  SOCIAL_INSURANCE_EMPLOYEE_RATE: 0.1100,  // 11.00%
  // Source: Social Insurance and Pensions Law No. 148 of 2019
  // Employer rate = 18.75% of gross salary (borne by employer)
  // Employee rate = 11.00% of gross salary (deducted from salary)
  // Both capped at maximum insurable salary per month

  EMPLOYEE_PROFIT_SHARING_RATE: 0.10,
  // Source: Egyptian Labor Law No. 12 of 2003
  // 10% of net profit must be distributed to employees
  // Capped at total annual gross wages of the employee group

  // ── MARKET DATA (PROXIES — UPDATE PER DEAL) ───────────────────────────
  EGX_RISK_FREE_RATE: 0.2650,
  // Proxy: 12-month Egyptian T-bill yield (approximate)
  // Source: CBE T-bill auction results — verify at each use

  EGYPT_EQUITY_RISK_PREMIUM: 0.0850,  // 8.5%
  // Source: Damodaran MENA emerging market benchmark

  EGYPT_COUNTRY_RISK_PREMIUM: 0.0350, // 3.5%
  // Source: Damodaran Egypt CRP — sovereign spread-based estimate

  // ── ACCOUNTING STANDARDS ──────────────────────────────────────────────
  GOODWILL_AMORTIZATION_YEARS: 10,
  // Source: Egyptian Accounting Standard (EAS) No. 19
  // Goodwill and intangible assets amortized over useful life,
  // maximum 10 years under Egyptian GAAP
  // Note: IFRS (used by some EGX companies) requires impairment testing
  // instead of amortization — clarify which standard applies per deal

  // ── TYPICAL TRANSACTION FEES (EGYPT BENCHMARKS) ───────────────────────
  ADVISORY_FEE_RATE_SMALL: 0.0150,   // 1.5% for deals under EGP 500M
  ADVISORY_FEE_RATE_LARGE: 0.0100,   // 1.0% for deals EGP 500M+
  FINANCING_FEE_RATE: 0.0150,        // 1.5% of debt raised
  LEGAL_FEE_RATE: 0.0050,            // 0.5% of deal value
  DUE_DILIGENCE_FEE_RATE: 0.0025,   // 0.25% of deal value

  // ── DEBT COVENANT BENCHMARKS (EGYPTIAN BANKS) ─────────────────────────
  MAX_LEVERAGE_COVENANT_DEFAULT: 3.0,   // Debt/EBITDA ≤ 3.0x
  MIN_ICR_COVENANT_DEFAULT: 2.5,        // EBITDA/Interest ≥ 2.5x
  // Note: International banks / PE debt may allow higher leverage (4-5x)
  // Egyptian domestic banks are significantly more conservative
};

=============================================================================
SECTION 4: MODULE 1 — MERGER MODEL (ACCRETION/DILUTION ANALYSIS)
=============================================================================

PURPOSE: Determine whether the proposed acquisition is ACCRETIVE (increases
the acquirer's Earnings Per Share) or DILUTIVE (decreases EPS).
This is the most fundamental question in any strategic M&A deal.

── INPUTS ──────────────────────────────────────────────────────────────────

ACQUIRER INPUTS (labeled "Acquirer — [Company Name]"):
  acquirerRevenueLTM          (EGP millions — Last Twelve Months revenue)
  acquirerEBITDALTM           (EGP millions — LTM EBITDA)
  acquirerEBITLTM             (EGP millions — LTM EBIT = EBITDA - D&A)
  acquirerNetIncomeLTM        (EGP millions — LTM net income attributable to
                               common shareholders, after minority interest)
  acquirerSharesOutstanding   (millions of diluted shares outstanding)
  acquirerSharePrice          (EGP per share — use closing price)
  acquirerExistingDebt        (EGP millions — total financial debt, gross)
  acquirerCashAndEquivalents  (EGP millions — unrestricted cash)
  acquirerTaxRate             (%, default: 22.5%)
  acquirerInterestRateOnDebt  (weighted average cost of existing debt, %)

TARGET INPUTS (labeled "Target — [Company Name]"):
  targetRevenueLTM            (EGP millions)
  targetEBITDALTM             (EGP millions)
  targetEBITLTM               (EGP millions)
  targetNetIncomeLTM          (EGP millions — standalone, before any deal adj.)
  targetSharesOutstanding     (millions of shares — for listed or private co.)
  targetSharePrice            (EGP per share — current market price, or implied
                               value per share for private company)
  targetExistingDebt          (EGP millions)
  targetCashAndEquivalents    (EGP millions)
  targetTaxRate               (%, default: 22.5%)
  targetBookValueOfEquity     (EGP millions — from most recent balance sheet)

DEAL TERMS:
  offerPricePerShare          (EGP per share — proposed acquisition price)
  considerationCashPercent    (% of purchase price paid in cash, e.g. 70%)
  considerationStockPercent   (% of purchase price paid in acquirer stock, e.g. 30%)
  // Validation: considerationCashPercent + considerationStockPercent = 100%

  newDebtForCashPercent       (% of cash component funded by new acquisition debt)
  newDebtInterestRate         (annual interest rate on acquisition financing, %)

  synergiesInputConvention    (dropdown: "Pre-Tax" or "After-Tax")
  synergiesYear1              (EGP millions)
  synergiesYear2              (EGP millions)
  synergiesYear3              (EGP millions — typically "steady state")

  dealTaxRate                 (%, default: EGYPT_PARAMS.CORPORATE_TAX_RATE = 22.5%)

── CALCULATIONS (EXACT — NO APPROXIMATIONS) ────────────────────────────────

STEP 1: PURCHASE PRICE & DEAL METRICS
  purchasePriceEquity = offerPricePerShare × targetSharesOutstanding
  // Total equity check written by acquirer

  premiumPaid = (offerPricePerShare / targetSharePrice - 1) × 100
  // Percentage premium over undisturbed market price

  targetEnterpriseValue = purchasePriceEquity
                        + targetExistingDebt
                        - targetCashAndEquivalents
  // EV = Equity Value + Net Debt (standard bridge)

  impliedEVtoEBITDA = targetEnterpriseValue / targetEBITDALTM
  impliedEVtoRevenue = targetEnterpriseValue / targetRevenueLTM
  impliedPriceEarnings = offerPricePerShare /
                         (targetNetIncomeLTM / targetSharesOutstanding)

STEP 2: CONSIDERATION BREAKDOWN
  cashComponent = purchasePriceEquity × (considerationCashPercent / 100)
  stockComponent = purchasePriceEquity × (considerationStockPercent / 100)

STEP 3: NEW ACQUIRER SHARES ISSUED (STOCK COMPONENT)
  newSharesIssued = stockComponent / acquirerSharePrice
  // Number of new acquirer shares created and given to target shareholders
  
  exchangeRatio = newSharesIssued / targetSharesOutstanding
  // How many acquirer shares each target shareholder receives per share held

STEP 4: ACQUISITION FINANCING (CASH COMPONENT)
  debtForCashComponent = cashComponent × (newDebtForCashPercent / 100)
  // Portion of cash consideration raised through new debt

  cashDrawnFromBalance = cashComponent - debtForCashComponent
  // Portion funded from acquirer's existing cash balance
  // Display warning if cashDrawnFromBalance > acquirerCashAndEquivalents

STEP 5: PRO-FORMA SHARES OUTSTANDING
  proFormaSharesOutstanding = acquirerSharesOutstanding + newSharesIssued
  // Target's old shares are RETIRED — replaced by cash or acquirer shares
  // Only acquirer shares remain outstanding post-merger

STEP 6: GOODWILL CREATED
  goodwillCreated = purchasePriceEquity - targetBookValueOfEquity
  // Goodwill = premium paid over book value of NET ASSETS acquired
  // If negative (bargain purchase): record as gain, display alert
  
  annualGoodwillAmortization = goodwillCreated / EGYPT_PARAMS.GOODWILL_AMORTIZATION_YEARS
  // Per Egyptian Accounting Standard No. 19 — 10-year straight-line maximum

STEP 7: INCREMENTAL INTEREST EXPENSE (AFTER-TAX)
  interestOnNewDebt = debtForCashComponent × (newDebtInterestRate / 100)
  // Annual interest on acquisition financing

  lostInterestOnCashUsed = cashDrawnFromBalance ×
                           (EGYPT_PARAMS.CBE_OVERNIGHT_DEPOSIT_RATE × 0.80)
  // Opportunity cost of cash used — approximated at 80% of CBE deposit rate
  // (80% represents rough post-tax yield on short-term deposits)

  totalIncrementalInterestPreTax = interestOnNewDebt + lostInterestOnCashUsed

  totalIncrementalInterestAfterTax = totalIncrementalInterestPreTax
                                    × (1 - dealTaxRate)
  // Tax shield on interest reduces the net cost

STEP 8: AFTER-TAX SYNERGIES (STANDARDIZE INPUT)
  // If user entered synergies as PRE-TAX:
    afterTaxSynergiesYear[n] = synergiesYear[n] × (1 - dealTaxRate)
  // If user entered synergies as AFTER-TAX:
    afterTaxSynergiesYear[n] = synergiesYear[n]  // use directly
  // ALWAYS clearly label in UI which convention is being used

STEP 9: GOODWILL AMORTIZATION (AFTER-TAX)
  goodwillAmortizationAfterTax = annualGoodwillAmortization × (1 - dealTaxRate)
  // Amortization reduces taxable income — tax benefit reduces net cost

STEP 10: PRO-FORMA NET INCOME (FOR EACH YEAR n = 1, 2, 3)
  proFormaNI[n] =
      acquirerNetIncomeLTM              // Acquirer standalone net income
    + targetNetIncomeLTM               // Target standalone net income
    + afterTaxSynergiesYear[n]         // Synergy benefit (after-tax)
    - goodwillAmortizationAfterTax     // Goodwill amortization drag (after-tax)
    - totalIncrementalInterestAfterTax // Financing cost drag (after-tax)

  // IMPORTANT NOTES ON THIS FORMULA:
  // (a) acquirerNetIncomeLTM already reflects acquirer's existing interest & tax
  // (b) targetNetIncomeLTM already reflects target's existing interest & tax
  // (c) We only ADD the INCREMENTAL effects of the deal (new debt, lost cash
  //     interest, goodwill amortization, synergies)
  // (d) We do NOT double-count target's existing interest expense

STEP 11: PRO-FORMA EPS (FOR EACH YEAR n = 1, 2, 3)
  acquirerStandaloneEPS = acquirerNetIncomeLTM / acquirerSharesOutstanding

  proFormaEPS[n] = proFormaNI[n] / proFormaSharesOutstanding
  // Denominator is PRO-FORMA shares (acquirer + new shares issued)
  // NOT standalone acquirer shares — this is the critical dilution mechanism

STEP 12: ACCRETION / DILUTION (FOR EACH YEAR n = 1, 2, 3)
  accretionDilution[n] =
      (proFormaEPS[n] - acquirerStandaloneEPS)
      / acquirerStandaloneEPS
      × 100
  // POSITIVE result = ACCRETIVE ✅ (deal increases EPS)
  // NEGATIVE result = DILUTIVE  ❌ (deal decreases EPS)
  // The goal: Year 1 accretive, or Year 2-3 accretive with clear path

STEP 13: BREAK-EVEN SYNERGIES REQUIRED
  // What minimum after-tax synergies make the deal EPS-neutral?
  
  baseProFormaNI_ZeroSynergies =
      acquirerNetIncomeLTM
    + targetNetIncomeLTM
    - goodwillAmortizationAfterTax
    - totalIncrementalInterestAfterTax
  // This is pro-forma NI with ZERO synergies

  breakEvenAfterTaxSynergies =
      (acquirerStandaloneEPS × proFormaSharesOutstanding)
    - baseProFormaNI_ZeroSynergies
  // The after-tax synergy level needed for pro-forma EPS = standalone EPS
  // If negative: deal is accretive even with zero synergies

STEP 14: CONTRIBUTION ANALYSIS
  // Shows whether acquirer is paying proportionally to what target contributes

  acquirerRevenueContribution = acquirerRevenueLTM /
                                (acquirerRevenueLTM + targetRevenueLTM) × 100

  targetRevenueContribution = targetRevenueLTM /
                              (acquirerRevenueLTM + targetRevenueLTM) × 100

  acquirerEBITDAContribution = acquirerEBITDALTM /
                               (acquirerEBITDALTM + targetEBITDALTM) × 100

  targetEBITDAContribution = targetEBITDALTM /
                             (acquirerEBITDALTM + targetEBITDALTM) × 100

  acquirerNIContribution = acquirerNetIncomeLTM /
                           (acquirerNetIncomeLTM + targetNetIncomeLTM) × 100

  targetNIContribution = targetNetIncomeLTM /
                         (acquirerNetIncomeLTM + targetNetIncomeLTM) × 100

  acquirerOwnershipPostMerger = acquirerSharesOutstanding /
                                proFormaSharesOutstanding × 100

  targetShareholderOwnershipPostMerger = newSharesIssued /
                                         proFormaSharesOutstanding × 100

  // Interpretation: If targetShareholderOwnershipPostMerger >
  // targetEBITDAContribution, acquirer may be overpaying

── SCENARIO MATRIX (SENSITIVITY TABLE) ─────────────────────────────────────

Build a 7×7 grid for Year 1 Accretion/Dilution (%):
  ROWS (7): Offer Price Premium — 0%, 10%, 20%, 30%, 40%, 50%, 60%
  COLS (7): After-Tax Synergies (EGP M) — 0, 50, 100, 150, 200, 300, 500

For each cell [i][j]:
  Recalculate purchasePriceEquity using premium[i]
  Recalculate all downstream values using synergy[j]
  Display accretionDilution[1] for that combination

Color coding per cell:
  accretionDilution[1] > +5%:   Dark green (#2E7D32)
  accretionDilution[1] 0–5%:    Light green (#4CAF50)
  accretionDilution[1] -5–0%:   Light amber (#FF9800)
  accretionDilution[1] < -5%:   Red (#E53935)
  
  Add golden border to cell closest to user's actual inputs (current scenario)

── OUTPUTS PANEL — DISPLAY ALL OF THE FOLLOWING ─────────────────────────────

DEAL METRICS:
  "Purchase Price (Equity Value)"    EGP ___M  /  USD ___M
  "Enterprise Value of Target"       EGP ___M  /  USD ___M
  "Premium to Market Price"          ____%
  "EV / EBITDA Multiple Paid"        ___x
  "EV / Revenue Multiple Paid"       ___x
  "Price / Earnings Multiple Paid"   ___x

DEAL STRUCTURE:
  "Cash Consideration"               EGP ___M  (__%)
  "Stock Consideration"              EGP ___M  (__%)
  "New Shares Issued"                ___M shares
  "Exchange Ratio"                   ___x acquirer per target share
  "New Acquisition Debt"             EGP ___M
  "Cash Drawn from Balance"          EGP ___M

COMBINED ENTITY:
  "Pro-Forma Shares Outstanding"     ___M shares
  "Goodwill Created"                 EGP ___M
  "Annual Goodwill Amortization"     EGP ___M/year  (10 years, EAS No. 19)
  "Net Incremental Interest (A/T)"   EGP ___M/year
  "Break-Even Synergies Required"    EGP ___M (after-tax)

EPS ANALYSIS:
  "Acquirer Standalone EPS"          EGP ___
  "Pro-Forma EPS — Year 1"           EGP ___
  "Pro-Forma EPS — Year 2"           EGP ___
  "Pro-Forma EPS — Year 3"           EGP ___
  "Accretion / (Dilution) — Year 1"  ____%   [ACCRETIVE ✅ / DILUTIVE ❌]
  "Accretion / (Dilution) — Year 2"  ____%
  "Accretion / (Dilution) — Year 3"  ____%

CONTRIBUTION ANALYSIS TABLE:
  Display as 3×3 matrix:
  Metric        | Acquirer | Target | Combined
  Revenue       |  ____%   | ____%  | 100%
  EBITDA        |  ____%   | ____%  | 100%
  Net Income    |  ____%   | ____%  | 100%
  Ownership     |  ____%   | ____%  | 100%

=============================================================================
SECTION 5: MODULE 2 — SOURCES & USES OF FUNDS
=============================================================================

PURPOSE: Every M&A transaction requires a balanced Sources & Uses table.
CORE INVARIANT: Total Sources MUST equal Total Uses to the EGP.
Display a LIVE balance validator — update on every keystroke.

── SOURCES PANEL ────────────────────────────────────────────────────────────

Each source is an input field (EGP millions):
  revolverDraw         (Revolving Credit Facility draw)
  termLoanA            (Senior Secured Term Loan A — amortizing)
  termLoanB            (Senior Secured Term Loan B — bullet maturity)
  seniorNotes          (Senior Unsecured / High Yield Notes)
  subordinatedNotes    (Junior Subordinated Notes)
  mezzanineFinancing   (Mezzanine / Preferred — hybrid instrument)
  sellerFinancing      (Seller Note / Deferred consideration)
  sponsorEquity        (PE Sponsor equity check)
  rolloverEquity       (Management / Seller equity retained in NewCo)
  cashOnHand           (Acquirer's existing cash used)

  totalSources = sum of all above

── USES PANEL ───────────────────────────────────────────────────────────────

  equityPurchasePrice     (auto-linked from Merger Model)
  refinanceTargetDebt     (target's existing debt repaid at close)
  refinanceAcquirerDebt   (acquirer debt refinanced, if applicable)
  advisoryFees            (M&A advisor / investment bank fee)
  financingFees           (bank syndication / debt underwriting fee)
  legalDueDiligenceFees   (legal counsel + Big 4 due diligence)
  fraFilingFee            (FRA regulatory filing fee — Egypt specific)
  ecaFilingFee            (ECA competition notification fee)
  stampDuty               (auto-calculated, user-overridable)
  cashToBalanceSheet      (minimum working capital / cash buffer post-close)

  totalUses = sum of all above

── AUTO-CALCULATIONS ────────────────────────────────────────────────────────

  stampDutyAutoCalc = equityPurchasePrice
                    × EGYPT_PARAMS.STAMP_DUTY_RATE_PER_SIDE
                    × 2
  // Both buyer and seller each pay 0.125%. Total = 0.25% of equity price.
  // Only applies to EGX-listed securities transfer.
  // For private M&A: no stamp duty on share transfers (verify with counsel).
  // Auto-fill stampDuty with stampDutyAutoCalc, allow manual override.

  balanceDifference = totalSources - totalUses
  // Display prominently: BALANCED ✅ | IMBALANCED ❌ (Δ EGP ___M)

  totalDebtRaised = revolverDraw + termLoanA + termLoanB
                  + seniorNotes + subordinatedNotes + mezzanineFinancing

  totalEquityContributed = sponsorEquity + rolloverEquity

  debtToTotalCap = totalDebtRaised / (totalDebtRaised + totalEquityContributed)
  equityToTotalCap = totalEquityContributed / (totalDebtRaised + totalEquityContributed)
  
  leverageAtEntry = totalDebtRaised / targetEBITDALTM
  // Display warning if leverageAtEntry > 5.0x

── FEE AUTO-CALCULATOR ──────────────────────────────────────────────────────

"Calculate Fees" button auto-fills fee fields using Egypt benchmarks:
  if equityPurchasePrice < 500_000_000:
    advisoryFeeSuggested = equityPurchasePrice × 0.0150   // 1.5%
  else:
    advisoryFeeSuggested = equityPurchasePrice × 0.0100   // 1.0%

  financingFeeSuggested = totalDebtRaised × 0.0150        // 1.5%
  legalFeeSuggested = equityPurchasePrice × 0.0050         // 0.5%
  ddFeeSuggested = equityPurchasePrice × 0.0025            // 0.25%

  // Show all as "suggested" — user can override each one

=============================================================================
SECTION 6: MODULE 3 — SYNERGY ANALYSIS
=============================================================================

PURPOSE: Quantify, phase in, tax-effect, and NPV-discount the value of
synergies created by the combination. Synergies justify the acquisition premium.

── REVENUE SYNERGY INPUTS (by category, Year 1–5) ───────────────────────────

User inputs EGP millions for each year (1 through 5):

  1. Cross-Selling / Upselling         [Year 1] [Year 2] [Year 3] [Year 4] [Year 5]
  2. Geographic Expansion (MENA)       [Year 1] [Year 2] [Year 3] [Year 4] [Year 5]
  3. Pricing Power (reduced competition)[Year 1] [Year 2] [Year 3] [Year 4] [Year 5]
  4. New Products (combined capability) [Year 1] [Year 2] [Year 3] [Year 4] [Year 5]
  5. Customer Base Expansion            [Year 1] [Year 2] [Year 3] [Year 4] [Year 5]

  grossRevenueSynergies[year] = sum of all 5 categories for that year

── COST SYNERGY INPUTS ───────────────────────────────────────────────────────

A. HEADCOUNT REDUCTION:
  redundantPositions       (number of redundant roles)
  avgAnnualSalaryEGP       (average annual gross salary per role, EGP)

  annualSalarySavings = redundantPositions × avgAnnualSalaryEGP
  annualSocialInsuranceSavings = annualSalarySavings
                               × EGYPT_PARAMS.SOCIAL_INSURANCE_EMPLOYER_RATE
  grossHeadcountSynergy = annualSalarySavings + annualSocialInsuranceSavings

B. FACILITY CONSOLIDATION:
  duplicateFacilitiesCount    (number of offices/warehouses to close)
  avgAnnualRentPerFacilityEGP (average annual rental cost per facility)

  facilityConsolidationSynergy = duplicateFacilitiesCount
                                × avgAnnualRentPerFacilityEGP

C. PROCUREMENT SAVINGS:
  combinedProcurementSpendEGP (combined annual COGS + procurement spend)
  procurementDiscountPercent  (% discount from volume leverage)

  procurementSynergy = combinedProcurementSpendEGP
                     × (procurementDiscountPercent / 100)

D. TECHNOLOGY CONSOLIDATION:
  annualITSavingsEGP (licenses, maintenance, duplicate systems)

E. SG&A OVERLAP ELIMINATION:
  combinedSGAEGP        (combined annual SG&A of both entities)
  sgaOverlapPercent     (% of combined SG&A that is redundant)

  sgaSynergy = combinedSGAEGP × (sgaOverlapPercent / 100)

── PHASE-IN SCHEDULE (user-adjustable) ─────────────────────────────────────

Default phase-in for cost synergies:
  Year 1: phaseInY1 = 50%   (ramp-up period)
  Year 2: phaseInY2 = 75%   (approaching run-rate)
  Year 3: phaseInY3 = 100%  (full run-rate)
  Year 4: phaseInY4 = 100%
  Year 5: phaseInY5 = 100%

  grossCostSynergies[year] = (grossHeadcountSynergy
                            + facilityConsolidationSynergy
                            + procurementSynergy
                            + annualITSavingsEGP
                            + sgaSynergy)
                           × (phaseIn[year] / 100)

── INTEGRATION COSTS (ONE-TIME — YEAR 0) ────────────────────────────────────

  severanceCosts:
    = redundantPositions
    × avgAnnualSalaryEGP
    × EGYPT_PARAMS.SEVERANCE_MONTHS_PER_YEAR_OF_SERVICE / 12
    × avgYearsOfServiceInput
  // Source: Egyptian Labor Law No. 12 of 2003, Article 120
  // 2 months gross salary per full year of service — MINIMUM

  facilityClosureCosts        (lease breakage penalties, removal, etc.)
  itIntegrationCosts          (system migration, ERP integration)
  rebrandingCosts             (signage, collateral, marketing)
  otherIntegrationCosts       (consultants, training, etc.)

  totalOneTimeIntegrationCosts = severanceCosts + facilityClosureCosts
                               + itIntegrationCosts + rebrandingCosts
                               + otherIntegrationCosts

── NET SYNERGY CALCULATIONS ─────────────────────────────────────────────────

For years 1 through 5:
  grossSynergies[year] = grossRevenueSynergies[year] + grossCostSynergies[year]
  taxOnSynergies[year] = grossSynergies[year] × EGYPT_PARAMS.CORPORATE_TAX_RATE
  netSynergies[year]   = grossSynergies[year] - taxOnSynergies[year]
  // = grossSynergies[year] × (1 - EGYPT_PARAMS.CORPORATE_TAX_RATE)

  integrationCostsAfterTax = totalOneTimeIntegrationCosts
                           × (1 - EGYPT_PARAMS.CORPORATE_TAX_RATE)
  // Integration costs are mostly deductible for Egyptian tax purposes

── NPV OF SYNERGIES ─────────────────────────────────────────────────────────

Input: wacc (user-input WACC, or link from Valuation Engine, %)

  npvSynergies =
      -integrationCostsAfterTax                           // Year 0 outflow
    + netSynergies[1] / (1 + wacc)^1
    + netSynergies[2] / (1 + wacc)^2
    + netSynergies[3] / (1 + wacc)^3
    + netSynergies[4] / (1 + wacc)^4
    + netSynergies[5] / (1 + wacc)^5
    + (netSynergies[5] / wacc) / (1 + wacc)^5
  // Last term = perpetuity terminal value (assume Year 5 synergies continue forever)
  // Only valid if Year 5 synergies are truly sustainable

  synergiesAsPercentOfPurchasePrice = npvSynergies / purchasePriceEquity × 100

  // PAYBACK PERIOD: Find first year where cumulative net synergies
  // (after tax) exceed total integration costs (after tax)
  cumulativeNetSynergies[year] = sum of netSynergies[1..year]
  paybackPeriod = smallest year where cumulativeNetSynergies[year]
                >= integrationCostsAfterTax

── SYNERGY ADEQUACY INDICATOR ────────────────────────────────────────────────

  goodwillCoverageRatio = npvSynergies / goodwillCreated × 100
  // > 100% → Synergies more than justify goodwill paid ✅
  //  50-100% → Synergies partially justify goodwill ⚠️
  //  < 50%  → Goodwill at significant impairment risk ❌

=============================================================================
SECTION 7: MODULE 4 — LBO MODEL (LEVERAGED BUYOUT)
=============================================================================

PURPOSE: Model a leveraged buyout — a private equity sponsor acquires a
company using mostly debt financing, operates it for 3-7 years while paying
down debt and growing EBITDA, then exits to generate returns (IRR, MOIC).

── STEP 1: ENTRY ASSUMPTIONS ────────────────────────────────────────────────

  lboTargetRevenueLTM         (EGP millions — LTM revenue of LBO target)
  lboTargetEBITDALTM          (EGP millions — LTM EBITDA)
  entryEVEBITDAMultiple       (x — e.g., 8.0x)

  impliedEntryEV = lboTargetEBITDALTM × entryEVEBITDAMultiple

  targetNetDebtAtClose        (EGP millions — existing debt minus cash at closing)
  // Net Debt = Gross Debt − Cash & Equivalents

  purchasePriceEquityLBO = impliedEntryEV - targetNetDebtAtClose
  // Equity check = EV minus the net debt the PE sponsor inherits

  transactionAndFinancingFees (EGP millions — all-in advisory + financing fees)

  totalCapitalRequired = purchasePriceEquityLBO
                       + targetNetDebtAtClose   // refinanced at close
                       + transactionAndFinancingFees

── STEP 2: CAPITAL STRUCTURE (DEBT TRANCHES) ─────────────────────────────────

For each tranche, user inputs:
  amountAsMultipleOfEBITDA  (x — e.g., 2.0x EBITDA)
  principal = lboTargetEBITDALTM × amountAsMultipleOfEBITDA
  interestRate (%)
  amortizationAnnualPercent (% of original principal paid each year)
  maturityYears
  pikToggle (boolean — Payment-in-Kind: interest accrues vs. paid in cash)

TRANCHE A — SENIOR SECURED TERM LOAN A:
  Typical: 1.5x–2.5x EBITDA | CBE lending rate + 2–3% | 10–15% annual amort
  principalA = lboTargetEBITDALTM × tlaMxMultiple

TRANCHE B — SENIOR SECURED TERM LOAN B:
  Typical: 1.0x–2.0x EBITDA | higher rate | 1% annual amort, bullet at maturity
  principalB = lboTargetEBITDALTM × tlbMultiple

SENIOR NOTES (OPTIONAL):
  Typical: 0.5x–1.0x EBITDA | high yield coupon | bullet maturity
  principalC = lboTargetEBITDALTM × seniorNotesMultiple

MEZZANINE (OPTIONAL):
  Typical: 0.5x–1.0x EBITDA | highest rate | PIK option
  principalMezz = lboTargetEBITDALTM × mezzMultiple

SPONSOR EQUITY:
  sponsorEquityLBO = totalCapitalRequired - principalA - principalB
                   - principalC - principalMezz
  // Residual after all debt — typically 30-40% in Egypt (given high debt cost)

ENTRY LEVERAGE METRICS:
  totalDebtAtEntry = principalA + principalB + principalC + principalMezz
  debtToEBITDAEntry = totalDebtAtEntry / lboTargetEBITDALTM
  equityPercent = sponsorEquityLBO / totalCapitalRequired × 100

  // ⚠️ Warning if debtToEBITDAEntry > 5.0x (aggressive for Egypt)
  // ⚠️ Warning if equityPercent < 30% (undercapitalized for Egyptian banks)

── STEP 3: 5-YEAR OPERATING MODEL ───────────────────────────────────────────

User inputs for each year (1 through 5):
  revenueGrowthRate[year]    (%)
  ebitdaMargin[year]         (%)
  depreciationPercent[year]  (% of revenue — converts revenue to D&A amount)
  capexPercent[year]         (% of revenue — maintenance + growth capex)
  dsoDays[year]              (Days Sales Outstanding)
  dioDays[year]              (Days Inventory Outstanding)
  dpoDays[year]              (Days Payable Outstanding)
  cogsPercent[year]          (% of revenue — cost of goods sold)

Derived for each year:

  revenue[year] = revenue[year-1] × (1 + revenueGrowthRate[year] / 100)
  // Base: revenue[0] = lboTargetRevenueLTM

  ebitda[year] = revenue[year] × (ebitdaMargin[year] / 100)

  depreciation[year] = revenue[year] × (depreciationPercent[year] / 100)

  ebit[year] = ebitda[year] - depreciation[year]

  // Interest from debt schedule (see Step 4) — causes circularity;
  // RESOLVE BY: use beginning-of-year debt balance for interest calculation
  interestExpense[year] = calculated in debt schedule (see Step 4)

  ebt[year] = ebit[year] - interestExpense[year]

  taxes[year] = max(ebt[year], 0) × EGYPT_PARAMS.CORPORATE_TAX_RATE
  // NEVER negative — no benefit from losses (conservative treatment)
  // For full model: implement loss carry-forward with toggle

  netIncome[year] = ebt[year] - taxes[year]

  capex[year] = revenue[year] × (capexPercent[year] / 100)

  // WORKING CAPITAL:
  cogs[year] = revenue[year] × (cogsPercent[year] / 100)

  accountsReceivable[year] = revenue[year] × dsoDays[year] / 365
  inventory[year]          = cogs[year] × dioDays[year] / 365
  accountsPayable[year]    = cogs[year] × dpoDays[year] / 365
  netWorkingCapital[year]  = accountsReceivable[year]
                           + inventory[year]
                           - accountsPayable[year]

  changeInNWC[year] = netWorkingCapital[year] - netWorkingCapital[year-1]
  // Positive ΔWC = cash USE (WC increased, cash consumed)
  // Negative ΔWC = cash SOURCE (WC decreased, cash released)
  // Base: netWorkingCapital[0] = calculated from LTM inputs

  freeCashFlowToFirm[year] = ebitda[year]
                           - (max(ebit[year],0) × EGYPT_PARAMS.CORPORATE_TAX_RATE)
                           // ^^ cash taxes on EBIT (unlevered)
                           - capex[year]
                           - changeInNWC[year]

  freeCashFlowToEquity[year] = netIncome[year]
                             + depreciation[year]
                             - capex[year]
                             - changeInNWC[year]
                             - mandatoryDebtAmortization[year]
                             // ^^ from debt schedule (see Step 4)

── STEP 4: DEBT SCHEDULE (YEAR-BY-YEAR) ─────────────────────────────────────

Calculate for each tranche, for years 1 through 7:

CASH SWEEP CALCULATION (applied after mandatory amortization):
  excessCashAvailableForSweep[year] =
      max(freeCashFlowToEquity[year] - minimumCashRetention, 0)
  // minimumCashRetention = user input (e.g., EGP 20M PE wants to keep)

  cashSweepApplied[year] = excessCashAvailableForSweep[year] × sweepPercent
  // sweepPercent = % of excess cash applied to debt prepayment
  // Applied in priority: TLA first, then TLB, then Senior Notes
  // (Mezzanine typically cannot be prepaid without premium)

FOR EACH TRANCHE (shown for TLA; repeat analogously for TLB, Notes, Mezz):

  beginningBalance_A[year] = endingBalance_A[year-1]
  // beginningBalance_A[1] = principalA (full amount at close)

  interestExpense_A[year] = beginningBalance_A[year] × (interestRateA / 100)
  // Use BEGINNING balance — resolves circularity with operating model

  mandatoryAmortization_A[year] = principalA × (amortizationAnnualPercentA / 100)
  // In maturity year: endingBalance must go to zero
  //   If remaining balance > mandatoryAmortization: pay off remaining balance
  //   if year == maturityYearsA:
  //     mandatoryAmortization_A[year] = beginningBalance_A[year]

  cashSweep_A[year] = allocated portion of cashSweepApplied[year]
  // Priority: TLA receives all sweep until balanced, then TLB

  endingBalance_A[year] = max(0,
    beginningBalance_A[year]
    - mandatoryAmortization_A[year]
    - cashSweep_A[year])
  // Cannot go below zero

  // FOR PIK MEZZANINE (if pikToggle_Mezz = true):
  endingBalance_Mezz[year] = beginningBalance_Mezz[year]
                           × (1 + interestRateMezz / 100)
  // PIK: interest compounds onto principal, no cash outflow
  interestExpense_Mezz_CashPaid[year] = 0   // no cash interest paid
  interestExpense_Mezz_PIK[year] = beginningBalance_Mezz[year]
                                 × (interestRateMezz / 100)
  // PIK interest accrues but does NOT reduce FCFE (non-cash)

AGGREGATE DEBT SCHEDULE OUTPUTS (each year):
  totalDebt[year] = endingBalance_A + endingBalance_B + endingBalance_C
                  + endingBalance_Mezz
  totalInterestExpense[year] = interestExpense_A + interestExpense_B
                              + interestExpense_C + interestExpense_Mezz_Cash
  totalMandatoryAmortization[year] = sum across all cash-pay tranches

  debtToEBITDA[year] = totalDebt[year] / ebitda[year]
  interestCoverageRatio[year] = ebitda[year] / totalInterestExpense[year]

  // COVENANT BREACH ALERTS (display red warning banner if):
  if debtToEBITDA[year] > EGYPT_PARAMS.MAX_LEVERAGE_COVENANT_DEFAULT:
    alert: "Attention Required: Leverage covenant breach in Year [year]"

  if interestCoverageRatio[year] < EGYPT_PARAMS.MIN_ICR_COVENANT_DEFAULT:
    alert: "Attention Required: ICR covenant breach in Year [year]"

── STEP 5: EXIT ASSUMPTIONS ──────────────────────────────────────────────────

  exitYear                (3, 4, 5, 6, or 7 — dropdown)
  exitEVEBITDAMultiple    (x — e.g., 8.0x)

  exitEBITDA = ebitda[exitYear]
  exitEV = exitEBITDA × exitEVEBITDAMultiple

  cashAtExit = minimumCashRetention  // assumes minimum cash remains
  netDebtAtExit = totalDebt[exitYear] - cashAtExit
  equityValueAtExit = exitEV - netDebtAtExit

  exitRoute (dropdown): "IPO on EGX" | "Strategic Sale" | "Secondary Buyout"

  // TAX ON EXIT:
  if exitRoute == "Strategic Sale" (private, unlisted):
    gainOnSale = equityValueAtExit - sponsorEquityLBO
    capitalGainsTaxOnExit = max(gainOnSale, 0)
                          × EGYPT_PARAMS.CAPITAL_GAINS_TAX_UNLISTED
    equityReturnedToSponsor = equityValueAtExit - capitalGainsTaxOnExit

  if exitRoute == "IPO on EGX":
    capitalGainsTaxOnExit = 0  // 10% rate but often structured to minimize
    equityReturnedToSponsor = equityValueAtExit
    // Note: Display caveat about IPO execution risk and lock-up periods

  if exitRoute == "Secondary Buyout":
    // Same as Strategic Sale tax treatment for PE seller
    capitalGainsTaxOnExit = max(equityValueAtExit - sponsorEquityLBO, 0)
                          × EGYPT_PARAMS.CAPITAL_GAINS_TAX_UNLISTED
    equityReturnedToSponsor = equityValueAtExit - capitalGainsTaxOnExit

── STEP 6: RETURNS ANALYSIS ──────────────────────────────────────────────────

MOIC (Multiple on Invested Capital):
  MOIC = equityReturnedToSponsor / sponsorEquityLBO
  // Target range for Egypt/MENA PE: 2.5x–4.0x over 3-5 year hold

IRR (Internal Rate of Return):
  // Build sponsor cash flow array:
  sponsorCashFlows[0] = -sponsorEquityLBO  // investment at Year 0 (negative)
  sponsorCashFlows[1..exitYear-1] = 0      // no interim distributions (simplest case)
  // Toggle: allow user to input interim dividend distributions if applicable
  sponsorCashFlows[exitYear] = +equityReturnedToSponsor  // exit proceeds

  // Solve using Newton-Raphson iteration:
  function calculateIRR(cashFlows):
    let r = 0.20  // initial guess: 20%
    const TOLERANCE = 0.000001  // 0.0001% convergence threshold
    const MAX_ITER = 1000

    for (let i = 0; i < MAX_ITER; i++):
      let npv = 0
      let dnpv = 0  // first derivative of NPV with respect to r

      for (let t = 0; t < cashFlows.length; t++):
        npv  += cashFlows[t] / Math.pow(1 + r, t)
        dnpv -= t * cashFlows[t] / Math.pow(1 + r, t + 1)

      const r_new = r - npv / dnpv  // Newton-Raphson update step

      if (Math.abs(r_new - r) < TOLERANCE):
        return r_new  // converged — return IRR as decimal (e.g., 0.285 = 28.5%)

      r = r_new  // update for next iteration

    return null  // did not converge — display "N/A" with error message

  // Display IRR benchmarks alongside result:
  // Egypt/MENA PE typical target: 20–30% IRR
  // Below hurdle rate (18–20%): display amber warning
  // Above 30%: display green indicator

RETURNS ATTRIBUTION (Value Bridge — Waterfall):
  // Decompose the total equity gain into 3 sources:

  1. EBITDA GROWTH:
     exitEquityIfSameMultipleAndSameDebt =
         (exitEBITDA × entryEVEBITDAMultiple) - netDebtAtExit
     // What equity would be worth at entry multiple, given EBITDA growth
     
     ebitdaGrowthContrib = exitEquityIfSameMultipleAndSameDebt - sponsorEquityLBO
     // Value created purely from growing EBITDA

  2. MULTIPLE EXPANSION:
     exitEquityIfActualMultipleButEntryDebt =
         (exitEBITDA × exitEVEBITDAMultiple) - netDebtAtExit
     
     multipleExpansionContrib = exitEquityIfActualMultipleButEntryDebt
                               - exitEquityIfSameMultipleAndSameDebt
     // Value created from paying a higher multiple on exit vs. entry

  3. DEBT PAYDOWN (DELEVERAGING):
     debtPaydownContrib = (totalDebtAtEntry - totalDebt[exitYear])
     // Value created by using FCF to repay debt (increases equity share of EV)

  4. RECONCILIATION CHECK:
     totalGain = ebitdaGrowthContrib + multipleExpansionContrib + debtPaydownContrib
     expectedGain = equityReturnedToSponsor - sponsorEquityLBO
     // These should match. If not: rounding error in intermediate steps.

  Display as horizontal stacked bar chart with three colored segments:
  - EBITDA Growth: Valor Gold (#C5A44E)
  - Multiple Expansion: Steel Blue (#2C3E6B)
  - Debt Paydown: Accretive Green (#4CAF50)

── SCENARIO MATRICES (3 TABLES, 7×7 EACH) ───────────────────────────────────

TABLE 1: IRR — Entry Multiple vs. Exit Multiple
  Rows: Entry EV/EBITDA: 5x, 6x, 7x, 8x, 9x, 10x, 11x
  Cols: Exit EV/EBITDA:  5x, 6x, 7x, 8x, 9x, 10x, 11x
  Value: IRR (%)

TABLE 2: IRR — Revenue CAGR vs. EBITDA Margin Year 5
  Rows: Revenue CAGR: 0%, 5%, 10%, 15%, 20%, 25%, 30%
  Cols: EBITDA Margin Y5: 10%, 15%, 20%, 25%, 30%, 35%, 40%
  Value: IRR (%)

TABLE 3: MOIC — Entry Multiple vs. Exit Year
  Rows: Entry EV/EBITDA: 5x, 6x, 7x, 8x, 9x, 10x, 11x
  Cols: Exit Year: 3, 4, 5, 6, 7
  Value: MOIC (x)

Color coding for all three tables:
  IRR > 25% or MOIC > 3.0x:   Dark green (#2E7D32)
  IRR 20–25% or MOIC 2.5–3.0x: Light green (#4CAF50)
  IRR 15–20% or MOIC 2.0–2.5x: Amber (#FF9800)
  IRR < 15% or MOIC < 2.0x:    Red (#E53935)
  Highlight current scenario cell with gold border (#C5A44E)

=============================================================================
SECTION 8: MODULE 5 — FAIRNESS OPINION (FOOTBALL FIELD CHART)
=============================================================================

PURPOSE: Summarize valuation ranges from multiple methodologies and determine
whether the proposed offer price falls within a fair range.
Required by FRA for mandatory tender offers on EGX-listed targets.

── VALUATION RANGE INPUTS (EGP PER SHARE) ────────────────────────────────────

Each methodology has a low and high bound:
  dcfRangeLow,           dcfRangeHigh         (from Valuation Engine DCF)
  tradingCompsRangeLow,  tradingCompsRangeHigh (from Valuation Engine Comps)
  precedentTxnsRangeLow, precedentTxnsRangeHigh (from Precedent Transactions)
  week52Low,             week52High             (EGX 52-week trading range)
  analystTargetsLow,     analystTargetsHigh     (sell-side analyst price targets)
  lboFloorLow,           lboFloorHigh           (minimum PE buyer would pay)
  
  offerPricePerShare                             (from Deal Terms module)

── FOOTBALL FIELD CHART (Recharts ComposedChart) ────────────────────────────

Implement as horizontal bar chart:
  - Chart is rotated 90° (horizontal bars = football field shape)
  - Each methodology = one horizontal bar from LOW to HIGH value
  - Bar extends from low to high on the x-axis (price axis)
  - Background "spacer" bar from 0 to low is transparent (invisible)
  - Actual visible bar from low to high
  - Offer price = vertical ReferenceLine across all bars
  
  Color logic per bar:
    If offerPricePerShare >= low AND <= high: bar color = Valor Gold (#C5A44E)
    If offerPricePerShare < low: bar color = Valor Steel (below range)
    If offerPricePerShare > high: bar color = Accretive Green (above range)

  Labels on each bar: methodology name, low value, high value
  Midpoint marker: small dot at midpoint of each range

── PER-METHODOLOGY ANALYSIS ─────────────────────────────────────────────────

For each methodology:
  midpoint[m] = (low[m] + high[m]) / 2
  premiumToMidpoint[m] = (offerPricePerShare / midpoint[m] - 1) × 100
  isWithinRange[m] = (offerPricePerShare >= low[m]) AND
                     (offerPricePerShare <= high[m])

── FAIRNESS DETERMINATION ────────────────────────────────────────────────────

  methodologiesInRange = count where isWithinRange[m] = true
  totalMethodologies = count of methodologies with valid inputs (> 0)
  
  if methodologiesInRange >= Math.ceil(totalMethodologies × 0.6):
    // ≥ 60% of methodologies agree → FAIR
    fairnessOpinion = "FAIR ✅"
    opinionText = "Based on our analyses, the consideration to be received is 
                   fair from a financial point of view to the shareholders."
  else:
    fairnessOpinion = "OUTSIDE FAIR RANGE ❌"
    opinionText = "The consideration falls outside the majority of value ranges 
                   derived from our financial analyses."

  // REGULATORY DISCLOSURE (display on output):
  regulatoryNote = "This analysis is prepared in reference to the requirements 
                    of the Financial Regulatory Authority (FRA) under Capital 
                    Market Law No. 95 of 1992 and its executive regulations. 
                    This analysis does not constitute a formal fairness opinion 
                    and should not be relied upon as such without independent 
                    professional review."

=============================================================================
SECTION 9: MODULE 6 — PRECEDENT TRANSACTIONS DATABASE
=============================================================================

PRE-LOADED EGYPT/MENA TRANSACTIONS (JSON array — hardcoded as starting data):

const PRELOADED_TRANSACTIONS = [
  {
    id: 1,
    name: "ADQ — Ras El Hekma New City",
    announced: "2024-02-23",
    acquirer: "ADQ (Abu Dhabi Developmental Holding Company)",
    acquirerCountry: "UAE",
    target: "Ras El Hekma Land Development Rights",
    targetCountry: "Egypt",
    sector: "Real Estate / Development",
    dealValueUSD_M: 35000,
    consideration: "Cash",
    stakeAcquired: 100,
    status: "Completed",
    evRevenue: null,
    evEBITDA: null,
    premiumPercent: null,
    notes: "Largest single FDI in Egyptian history. ADQ acquired 170km² for new city."
  },
  {
    id: 2,
    name: "ADQ — Commercial International Bank (CIB) Stake",
    announced: "2024",
    acquirer: "ADQ",
    acquirerCountry: "UAE",
    target: "Commercial International Bank Egypt",
    targetCountry: "Egypt",
    sector: "Banking",
    dealValueUSD_M: 1900,
    consideration: "Cash",
    stakeAcquired: 13.5,
    status: "Announced",
    premiumPercent: 15,
    notes: "Minority strategic stake — CBE approval required."
  },
  {
    id: 3,
    name: "FAB — EFG Hermes Investment Banking",
    announced: "2022",
    acquirer: "First Abu Dhabi Bank (FAB)",
    acquirerCountry: "UAE",
    target: "EFG Hermes (Investment Banking Operations)",
    targetCountry: "Egypt",
    sector: "Investment Banking / Financial Services",
    dealValueUSD_M: 860,
    consideration: "Cash",
    stakeAcquired: 51,
    status: "Completed",
    notes: "FAB acquired majority stake — formed EFG Hermes/FAB Securities."
  },
  {
    id: 4,
    name: "Telecom Egypt — Vodafone Egypt Stake Acquisition",
    announced: "2022",
    acquirer: "Telecom Egypt",
    acquirerCountry: "Egypt",
    target: "Vodafone Egypt",
    targetCountry: "Egypt",
    sector: "Telecommunications",
    dealValueUSD_M: 2200,
    evEBITDA: 7.2,
    consideration: "Cash",
    stakeAcquired: 45,
    status: "Completed",
    notes: "Telecom Egypt increased stake; later acquired full control."
  },
  {
    id: 5,
    name: "Saudi Egyptian Investment Co. — Sahl El Heisha",
    announced: "2023",
    acquirer: "Saudi Egyptian Investment Company",
    acquirerCountry: "Saudi Arabia",
    target: "Sahl El Heisha Land",
    targetCountry: "Egypt",
    sector: "Real Estate",
    dealValueUSD_M: 1800,
    consideration: "Cash",
    stakeAcquired: 100,
    status: "Completed"
  },
  {
    id: 6,
    name: "PIF — Banque du Caire Stake",
    announced: "2023",
    acquirer: "Public Investment Fund (PIF)",
    acquirerCountry: "Saudi Arabia",
    target: "Banque du Caire",
    targetCountry: "Egypt",
    sector: "Banking",
    dealValueUSD_M: 550,
    consideration: "Cash",
    stakeAcquired: 20,
    status: "Completed",
    notes: "Part of broad Egyptian banking privatization program."
  }
]

USER CAPABILITIES:
  - Add new transactions via modal form (all fields)
  - Edit existing transactions
  - Filter by: Sector, Acquirer Country, Date Range, Deal Size, Status
  - Sort by any column (ascending/descending)
  - Multi-select filter (e.g., Banking + Insurance together)

ANALYTICS PANEL (updates live with filters applied):
  medianEVEBITDA = median of all non-null evEBITDA values in filtered set
  meanEVEBITDA   = mean of all non-null evEBITDA values in filtered set
  medianPremium  = median of all non-null premiumPercent values
  meanPremium    = mean of all non-null premiumPercent values
  dealCount      = count of transactions in filtered set
  totalValueUSD  = sum of dealValueUSD_M for filtered set

  Display as summary stat cards above the table.
  "Send to Fairness Opinion" button → auto-populates precedentTxns range

=============================================================================
SECTION 10: MODULE 7 — REGULATORY CHECKLIST & DEAL TIMELINE
=============================================================================

INTERACTIVE CHECKLIST (checkable, with expandable detail for each item):

── MANDATORY FOR ALL TRANSACTIONS ───────────────────────────────────────────

☐ Egyptian Competition Authority (ECA) Merger Notification
  Required if: combined annual revenue > EGP 100M
  Source: Competition Law No. 3 of 2005
  Filing deadline: Prior to closing (suspensory — cannot close without clearance)
  Phase 1 review: 30 calendar days
  Phase 2 review: up to 90 additional days (if complex)
  Remedy types: Behavioral remedies, structural divestitures

☐ GAFI Registration (General Authority for Investment and Free Zones)
  Required for: Foreign acquirers in restricted sectors
  Restricted sectors: Media, real estate in certain zones, some utilities
  Timeline: Concurrent with regulatory approvals

☐ Shareholder Approval (Extraordinary General Meeting)
  Required for listed acquirer if transaction exceeds: 25% of total assets
  Required for listed target: Scheme of arrangement or privatization structure
  EGM notice period: minimum 21 days
  Quorum: typically 50%+ of outstanding shares

── FOR EGX-LISTED TARGETS ────────────────────────────────────────────────────

☐ FRA Pre-Notification (Financial Regulatory Authority)
  MUST be filed BEFORE any public announcement of intent to acquire
  Source: Capital Market Law No. 95 of 1992, Article 4
  Contents: Identity of acquirer, proposed offer price, financing sources,
            conditions to the offer, timetable

☐ Mandatory Tender Offer (MTO)
  Triggered when: acquirer will hold ≥ 33% of voting shares
  Requirement: Offer to ALL remaining shareholders
  Price: Higher of (a) offer price or (b) highest price paid in prior 12 months
  Acceptance period: minimum 30 days
  FRA supervises: offer document, independent advisor, escrow arrangements

☐ Independent Fairness Opinion
  Required for: Related-party transactions and MTO situations
  Provider: Licensed investment bank or financial advisor approved by FRA
  Must cover: DCF, comparable companies, comparable transactions

── FOR BANKING SECTOR TARGETS ────────────────────────────────────────────────

☐ Central Bank of Egypt (CBE) Approval
  Threshold 1: > 10% stake → prior CBE notification and approval
  Threshold 2: > 33% (control) → full CBE board review
  Review period: 60–120 business days
  Required documents: KYC on acquirer, 3-year business plan, AML compliance,
                      source of funds certification, management CVs

☐ Foreign Currency Repatriation Approval (CBE)
  Required for: Cross-border deals where purchase price is remitted abroad
  Process: Acquirer banks must coordinate with CBE FX operations
  Timeline: Variable — critical bottleneck in practice

── FOR INSURANCE / FINANCIAL SERVICES TARGETS ───────────────────────────────

☐ FRA Approval (Insurance Companies)
  Threshold: > 10% acquisition of insurance company
  Review period: 60–90 days
  Also required for: Leasing, factoring, mortgage finance, microfinance entities

── POST-SIGNING REQUIREMENTS ─────────────────────────────────────────────────

☐ Commercial Registry Update (Ministry of Commerce and Industry)
  Deadline: Within 30 days of closing

☐ Egyptian Tax Authority (ETA) Notification
  File: Capital gains tax declaration on acquisition
  Deadline: Within 30 days of closing

☐ Labor Authority Notification
  Required if: > 200 employees are being restructured
  Must file: Workforce plan, timeline for changes, social insurance arrangements

☐ CBE Registration (Cross-Border Payments)
  For USD/EUR-denominated deals: register FX transactions with CBE

DEAL TIMELINE GANTT CHART:
  Display using horizontal bars (Recharts or custom SVG):
  
  Input: Deal Start Date (date picker) → auto-calculate all milestone dates
  
  Phase               Start Week   Duration   End Week
  Preparation & Info  Week 0       3 weeks    Week 3
  Due Diligence       Week 2       6 weeks    Week 8
  SPA Negotiation     Week 6       4 weeks    Week 10
  Regulatory Filings  Week 9       [depends on type — see above]
    └ ECA Only         Week 9       8 weeks    Week 17
    └ CBE + ECA        Week 9       16 weeks   Week 25
  Shareholder Aprvl   Week 12      4 weeks    Week 16
  Condition Satisfy   Week 14      Variable   Week 22
  Closing & Funding   Week 22      1 week     Week 23
  Post-Close Integr.  Week 23      52 weeks   Week 75

  Color: Active phases in Valor Gold, completed in Valor Steel, future in Navy

=============================================================================
SECTION 11: UI/UX SPECIFICATIONS — VALOR BRAND APPLIED
=============================================================================

NAVBAR (fixed top):
  Left:   [⚔️ VALOR wordmark in Playfair Display, gold]
  Center: Campaign name (editable inline) + Status badge
  Right:  [EGP] ⟷ [USD] toggle  |  FX: 49.50 (editable)  |  Principal icon

SIDEBAR (collapsible, fixed left):
  Module icons + labels:
  ⚔️  Command Center
  ♟️  Merger Model
  🏗️  Sources & Uses
  🔗  Synergy Analysis
  📊  LBO Model
  ⚖️  Fairness Opinion
  🏛️  Precedents
  📋  Regulatory
  📄  Dispatch PDF

COMMAND CENTER (Dashboard):
  Hero: Campaign name + Acquirer × Target + Status
  
  6 KPI Cards (3×2 grid):
    Card 1: Deal Value (EGP __B / USD __M)
    Card 2: Premium Paid (__%)
    Card 3: EPS Impact — Year 1 (green if accretive, red if dilutive)
    Card 4: LBO IRR (__%) + benchmark comparison
    Card 5: MOIC (__x) + benchmark comparison
    Card 6: NPV Synergies (EGP __M)
  
  Each card: gold left border accent, IBM Plex Mono numbers, Valor Navy background
  
  6 Quick Action Tiles (module grid):
  Each shows module icon + name + "→ Configure" link

INPUT FIELDS (standardized InputField component):
  - Right-aligned number input
  - "EGP M" suffix shown in muted text
  - Comma formatting (1,234.5)
  - Negative values in Dilutive Red (#E53935)
  - Required fields: gold asterisk (*)
  - Every field has a (?) tooltip icon → shows definition + Egypt-specific note
  - Live recalculation: all outputs update on every input change (useMemo)

TABLES:
  Font: IBM Plex Mono for all numeric cells
  Header: Valor Black background + Valor Gold text
  Rows: alternating Valor Navy / slightly lighter variant
  Numbers: 1 decimal for EGP millions, 2 decimal for EPS, 1 decimal for %
  Negative numbers: Dilutive Red (#E53935)
  Positive numbers: Valor Ivory (#F4EDE4)
  Sticky first column (row labels) and sticky header row

STATUS BADGES:
  "ACCRETIVE"  → filled green badge (#4CAF50)
  "DILUTIVE"   → filled red badge (#E53935)
  "BALANCED"   → filled gold badge (#C5A44E) — for S&U table
  "IMBALANCED" → filled red badge with Δ amount

LOADING STATES:
  Spinner: Valor Gold ring animation
  Messages (cycle through):
    "Analyzing transaction..."
    "Structuring the deal economics..."
    "Running scenario matrix..."
    "Intelligence ready."

ALERTS & WARNINGS:
  Red banner (⚠️ Attention Required): covenant breaches, S&U imbalance
  Amber banner (⚠️): inputs approaching risk thresholds
  Green banner (✅): successful saves, balanced S&U, accretive result

DEAL MEMORANDUM (PDF Export):
  Header: ⚔️ VALOR | "Deal Memorandum" | [Campaign Name]
  Date + time stamp
  All module outputs (tables + chart images captured via html2canvas)
  Egypt regulatory parameters disclosure table
  Disclaimer: "This memorandum was prepared using Valor M&A Engine..."
  Footer: "Valor M&A Engine | Part of the Wolf Financial Suite"
  Page numbers

KEYBOARD SHORTCUTS:
  ⌘+M → Merger Model
  ⌘+L → LBO Model
  ⌘+S → Sources & Uses
  ⌘+Y → Synergy Analysis
  ⌘+F → Fairness Opinion
  ⌘+R → Regulatory
  ⌘+E → Dispatch PDF
  ⌘+D → Toggle EGP/USD
  ⌘+N → New Campaign
  ⌘+K → Command Palette (search all fields)
  Esc  → Close current panel

=============================================================================
SECTION 12: STATE MANAGEMENT — GLOBAL DEAL STATE
=============================================================================

Create: context/DealContext.jsx

const initialState = {
  campaignName: "New Campaign",
  acquirerName: "",
  targetName: "",
  status: "Active",
  currency: "EGP",             // "EGP" or "USD"
  fxRateUSDEGP: EGYPT_PARAMS.USD_EGP_RATE,

  acquirer: {
    revenue: 0, ebitda: 0, ebit: 0, netIncome: 0,
    sharesOutstanding: 0, sharePrice: 0,
    existingDebt: 0, cash: 0,
    taxRate: EGYPT_PARAMS.CORPORATE_TAX_RATE,
    interestRateOnDebt: 0,
  },

  target: {
    revenue: 0, ebitda: 0, ebit: 0, netIncome: 0,
    sharesOutstanding: 0, sharePrice: 0,
    existingDebt: 0, cash: 0,
    taxRate: EGYPT_PARAMS.CORPORATE_TAX_RATE,
    bookValueOfEquity: 0,
  },

  dealTerms: {
    offerPricePerShare: 0,
    cashPercent: 100,
    stockPercent: 0,
    newDebtForCashPercent: 0,
    newDebtInterestRate: 0,
    synergiesInputConvention: "Pre-Tax",  // "Pre-Tax" or "After-Tax"
    synergiesYear1: 0,
    synergiesYear2: 0,
    synergiesYear3: 0,
    dealTaxRate: EGYPT_PARAMS.CORPORATE_TAX_RATE,
  },

  sourcesUses: {
    revolverDraw: 0, termLoanA: 0, termLoanB: 0,
    seniorNotes: 0, subordinatedNotes: 0, mezzanineFinancing: 0,
    sellerFinancing: 0, sponsorEquity: 0, rolloverEquity: 0, cashOnHand: 0,
    refinanceTargetDebt: 0, refinanceAcquirerDebt: 0,
    advisoryFees: 0, financingFees: 0, legalDueDiligenceFees: 0,
    fraFilingFee: 0, ecaFilingFee: 0, stampDuty: 0, cashToBalanceSheet: 0,
  },

  synergies: {
    // Revenue synergies [Y1..Y5] per category
    crossSelling: [0,0,0,0,0],
    geoExpansion: [0,0,0,0,0],
    pricingPower: [0,0,0,0,0],
    newProducts: [0,0,0,0,0],
    customerBase: [0,0,0,0,0],
    // Cost synergy inputs
    redundantPositions: 0,
    avgAnnualSalary: 0,
    duplicateFacilities: 0,
    avgRentPerFacility: 0,
    combinedProcurementSpend: 0,
    procurementDiscountPct: 0,
    itSavings: 0,
    combinedSGA: 0,
    sgaOverlapPct: 0,
    // Phase-in
    phaseIn: [50, 75, 100, 100, 100],
    // Integration costs
    avgYearsOfService: 0,
    facilityClosureCosts: 0,
    itIntegrationCosts: 0,
    rebrandingCosts: 0,
    otherIntegrationCosts: 0,
    // Discount rate
    wacc: 0.20,
  },

  lbo: {
    targetRevenueLTM: 0,
    targetEBITDALTM: 0,
    entryMultiple: 0,
    targetNetDebtAtClose: 0,
    transactionFees: 0,
    // Debt tranches
    tlaMultiple: 0, tlaRate: 0, tlaAmortPct: 0, tlaMaturity: 5,
    tlbMultiple: 0, tlbRate: 0, tlbAmortPct: 1, tlbMaturity: 7,
    seniorNotesMultiple: 0, seniorNotesRate: 0, seniorNotesMaturity: 8,
    mezzMultiple: 0, mezzRate: 0, mezzPIK: false, mezzMaturity: 9,
    // Operating model
    operating: Array(5).fill({
      revenueGrowth: 0, ebitdaMargin: 0, depreciationPct: 0,
      capexPct: 0, dsoDays: 0, dioDays: 0, dpoDays: 0, cogsPct: 0
    }),
    minimumCashRetention: 0,
    sweepPercent: 100,
    // Exit
    exitYear: 5,
    exitMultiple: 0,
    exitRoute: "Strategic Sale",
    // Covenants
    maxLeverageCovenant: EGYPT_PARAMS.MAX_LEVERAGE_COVENANT_DEFAULT,
    minICRCovenant: EGYPT_PARAMS.MIN_ICR_COVENANT_DEFAULT,
  },

  fairness: {
    dcfLow: 0, dcfHigh: 0,
    compsLow: 0, compsHigh: 0,
    precedentLow: 0, precedentHigh: 0,
    week52Low: 0, week52High: 0,
    analystLow: 0, analystHigh: 0,
    lboLow: 0, lboHigh: 0,
  },

  precedentTransactions: PRELOADED_TRANSACTIONS,

  regulatoryChecklist: {
    eca: false, gafi: false, shareholderApproval: false,
    fraPreNotification: false, mandatoryTenderOffer: false,
    fairnessOpinionFiled: false, cbeApproval: false,
    cbeFXApproval: false, fraInsurance: false,
    commercialRegistry: false, taxAuthority: false,
    laborAuthority: false, cbeRegistration: false,
    dealStartDate: null,
  },
};

=============================================================================
SECTION 13: MATHEMATICAL ACCURACY — NON-NEGOTIABLE RULES
=============================================================================

RULE 1: FLOATING POINT
  All calculations use JavaScript IEEE 754 64-bit floating-point arithmetic.
  Round for DISPLAY only — using .toFixed(n) or toLocaleString().
  NEVER round intermediate calculations. Pass full precision through chain.

RULE 2: IRR ALGORITHM
  MUST use Newton-Raphson iteration as specified in Section 7, Step 6.
  Convergence tolerance: 0.000001 (0.0001%).
  Max iterations: 1000.
  If not convergent after 1000 iterations: display "N/A — IRR did not converge"
  NEVER use CAGR as a proxy for IRR when there are multiple cash flows.

RULE 3: NPV FORMULA
  NPV = Σ (CF_t / (1 + r)^t) for t = 0 to n
  Use Math.pow(1 + r, t) — NOT exponential/log approximation.

RULE 4: DEBT SCHEDULE SEQUENCING
  Each year computed sequentially: Year 1 → Year 2 → ... → Year 7.
  beginningBalance[year] = endingBalance[year-1].
  No vectorized shortcuts that skip intermediate years.

RULE 5: TAX FLOOR
  taxes = max(EBT, 0) × taxRate
  EBT can be negative (company in loss).
  Tax is NEVER negative. No tax refund in this model.

RULE 6: SYNERGY CONVENTION
  Clearly label in UI: "Pre-Tax Synergies" vs "After-Tax Synergies"
  If Pre-Tax entered: multiply by (1 - taxRate) before use in NI
  If After-Tax entered: use directly
  NEVER silently convert without labeling

RULE 7: GOODWILL BASIS
  Goodwill = Purchase Price of EQUITY (not EV) minus Book Value of EQUITY
  This is correct under both IFRS 3 and Egyptian GAAP EAS 19
  Goodwill is NOT calculated on EV basis

RULE 8: PRO-FORMA EPS DENOMINATOR
  Pro-Forma EPS denominator = Acquirer's existing shares + New shares issued
  Target's old shares are RETIRED (cancelled) in the merger
  They do NOT remain outstanding

RULE 9: CASH SWEEP PRIORITY WATERFALL
  Step 1: Apply mandatory amortization to all tranches simultaneously
  Step 2: Calculate excess cash after mandatory amort and minimum retention
  Step 3: Apply excess cash to TLA first (sweep down to zero before TLB)
  Step 4: Apply remaining excess to TLB
  Step 5: Apply remaining to Senior Notes (if callable without penalty)
  Step 6: Mezzanine — check call protection before sweep

RULE 10: EXCHANGE RATIO VERIFICATION
  Exchange Ratio = newSharesIssued / targetSharesOutstanding
               = (stockPercent × purchasePriceEquity / acquirerSharePrice)
                 / targetSharesOutstanding
  Both calculations MUST yield identical result.
  Display a verification check in developer console.

RULE 11: ACCRETION/DILUTION SIGN CONVENTION
  POSITIVE accretion = pro-forma EPS > standalone EPS = GOOD ✅
  NEGATIVE dilution  = pro-forma EPS < standalone EPS = BAD ❌
  Display sign explicitly: "+12.4% (Accretive)" or "-3.2% (Dilutive)"

RULE 12: RETURNS ATTRIBUTION RECONCILIATION
  ebitdaGrowthContrib + multipleExpansionContrib + debtPaydownContrib
  MUST equal equityReturnedToSponsor - sponsorEquityLBO
  within EGP 0.1M rounding tolerance.
  If they don't match: debug the formula, DO NOT force-fit.

=============================================================================
SECTION 14: TEST DEAL — VERIFY ALL OUTPUTS BEFORE DEPLOYMENT
=============================================================================

This fictional Egyptian deal is your QA benchmark.
Every number below is pre-calculated to 2 decimal places.
If Valor returns different numbers: the formula is WRONG. Fix it.

DEAL NAME: "Valor Test — Nile Capital Partners × Delta Food Industries"

ACQUIRER (Nile Capital Partners — EGX listed):
  Revenue LTM:        EGP 2,400.00M
  EBITDA LTM:         EGP  480.00M  (20.0% margin)
  EBIT LTM:           EGP  360.00M
  Net Income LTM:     EGP  252.00M
    Verify: EBT = 360, Tax@30% = 108, NI = 252 ✓
    (Note: acquirer uses 30% effective tax for test purposes)
  Shares Outstanding:    500.00M shares
  Share Price:        EGP    8.50 per share
  Existing Debt:      EGP  200.00M
  Cash:               EGP  150.00M
  Tax Rate:              30.0%  (test — not 22.5%; testing rate flexibility)

TARGET (Delta Food Industries — private):
  Revenue LTM:        EGP  800.00M
  EBITDA LTM:         EGP  160.00M  (20.0% margin)
  EBIT LTM:           EGP  120.00M
  Net Income LTM:     EGP   93.00M
    Verify: EBT = 120, Tax@22.5% = 27, NI = 93 ✓
  Shares Outstanding:    100.00M shares
  Current Share Price:EGP   12.00 per share
  Existing Debt:      EGP   80.00M
  Cash:               EGP   30.00M
  Book Value of Equity: EGP 280.00M
  Tax Rate:              22.5%

DEAL TERMS:
  Offer Price:        EGP   15.00 per share
  Cash %:                   70%
  Stock %:                  30%
  New Debt for Cash:        80%  (of cash component funded by new debt)
  New Debt Rate:            20.0%  (annual)
  Synergy Convention:   Pre-Tax
  Pre-Tax Synergies Y1: EGP   58.06M (= 45 / (1-0.225) — see after-tax below)
  Pre-Tax Synergies Y2: EGP   90.32M (= 70 / (1-0.225))
  Pre-Tax Synergies Y3: EGP  116.13M (= 90 / (1-0.225))
  Deal Tax Rate:            22.5%

  ALTERNATIVELY (use this if convention = "After-Tax"):
  After-Tax Synergies Y1: EGP 45.00M
  After-Tax Synergies Y2: EGP 70.00M
  After-Tax Synergies Y3: EGP 90.00M

EXPECTED OUTPUTS — VERIFY THESE EXACTLY:

Step 1: Purchase Price
  purchasePriceEquity = 15.00 × 100.00M = EGP 1,500.00M ✓
  premiumPaid = (15.00 / 12.00 - 1) × 100 = 25.00% ✓
  targetEV = 1,500.00 + 80.00 - 30.00 = EGP 1,550.00M ✓
  impliedEVEBITDA = 1,550.00 / 160.00 = 9.69x ✓
  impliedEVRevenue = 1,550.00 / 800.00 = 1.94x ✓

Step 2: Consideration
  cashComponent = 1,500.00 × 0.70 = EGP 1,050.00M ✓
  stockComponent = 1,500.00 × 0.30 = EGP 450.00M ✓

Step 3: New Shares
  newSharesIssued = 450.00M EGP / 8.50 EGP per share = 52.941M shares ✓
  exchangeRatio = 52.941M / 100.00M = 0.5294x ✓

Step 4: Financing
  debtForCash = 1,050.00 × 0.80 = EGP 840.00M ✓
  cashFromBalance = 1,050.00 × 0.20 = EGP 210.00M ✓
  // Check: 210 < 150 (acquirer cash) → WARNING: cash shortfall by 60M
  // Valor should display "Attention Required: Cash drawn exceeds available balance"

Step 5: Pro-Forma Shares
  proFormaShares = 500.00 + 52.941 = 552.941M shares ✓

Step 6: Goodwill
  goodwillCreated = 1,500.00 - 280.00 = EGP 1,220.00M ✓
  annualGoodwillAmortization = 1,220.00 / 10 = EGP 122.00M/year ✓

Step 7: Incremental Interest
  interestOnNewDebt = 840.00 × 0.20 = EGP 168.00M/year ✓
  lostInterestOnCash = 210.00 × (0.2725 × 0.80) = 210.00 × 0.2180 = EGP 45.78M/year ✓
  totalIncrementalInterestPreTax = 168.00 + 45.78 = EGP 213.78M/year ✓
  totalIncrementalInterestAfterTax = 213.78 × (1 - 0.225) = 213.78 × 0.775
                                   = EGP 165.68M/year ✓

Step 8: After-Tax Synergies (using After-Tax inputs):
  afterTaxSynY1 = 45.00M ✓
  afterTaxSynY2 = 70.00M ✓
  afterTaxSynY3 = 90.00M ✓

Step 9: Goodwill Amortization After-Tax
  goodwillAmortAfterTax = 122.00 × (1 - 0.225) = 122.00 × 0.775
                        = EGP 94.55M/year ✓

Step 10: Pro-Forma Net Income
  NI_Year1 = 252.00 + 93.00 + 45.00 - 94.55 - 165.68
           = 390.00 - 260.23
           = EGP 129.77M ✓

  NI_Year2 = 252.00 + 93.00 + 70.00 - 94.55 - 165.68
           = EGP 154.77M ✓

  NI_Year3 = 252.00 + 93.00 + 90.00 - 94.55 - 165.68
           = EGP 174.77M ✓

Step 11: Pro-Forma EPS
  standaloneEPS = 252.00 / 500.00 = EGP 0.5040 per share ✓

  proFormaEPS_Y1 = 129.77 / 552.941 = EGP 0.2347 per share ✓
  proFormaEPS_Y2 = 154.77 / 552.941 = EGP 0.2799 per share ✓
  proFormaEPS_Y3 = 174.77 / 552.941 = EGP 0.3160 per share ✓

Step 12: Accretion / Dilution
  AD_Y1 = (0.2347 - 0.5040) / 0.5040 × 100 = -53.44% DILUTIVE ❌ ✓
  AD_Y2 = (0.2799 - 0.5040) / 0.5040 × 100 = -44.46% DILUTIVE ❌ ✓
  AD_Y3 = (0.3160 - 0.5040) / 0.5040 × 100 = -37.30% DILUTIVE ❌ ✓

  // Heavy dilution is realistic: very high goodwill (EGP 1.22B on EGP 280M book)
  // + expensive Egyptian debt (20%) + large new share issuance
  // This is exactly what happens in high-premium Egyptian deals with leverage

Step 13: Break-Even Synergies
  baseNI_ZeroSynergies = 252.00 + 93.00 - 94.55 - 165.68 = EGP 84.77M
  requiredNI_EPS_Neutral = 0.5040 × 552.941 = EGP 278.68M
  breakEvenAfterTaxSynergies = 278.68 - 84.77 = EGP 193.91M after-tax ✓

  // Translation: deal needs EGP 193.91M of after-tax synergies/year
  // to be EPS-neutral. That's EGP 250M pre-tax — very high.
  // This correctly signals: deal is expensive relative to acquirer's size.

=============================================================================
SECTION 15: BUILD SEQUENCE (RECOMMENDED ORDER)
=============================================================================

Session 1:  Project init + EGYPT_PARAMS constants + DealContext + Reducer
Session 2:  Navbar + Sidebar + CurrencyToggle + DealHeader layout
Session 3:  Command Center (dashboard with 6 KPI cards — initially zeros)
Session 4:  Sources & Uses — inputs, auto-calculations, balance validator
Session 5:  Merger Model — Inputs UI (all fields with tooltips)
Session 6:  Merger Model — All calculation logic (Steps 1–14 in Section 4)
Session 7:  Merger Model — Outputs display (tables + EPS bridge chart)
Session 8:  Scenario Matrix component (reusable — 7×7 heat map)
Session 9:  Synergy Analysis — inputs + phase-in + integration costs
Session 10: Synergy Analysis — outputs + NPV + goodwill coverage indicator
Session 11: LBO Entry + Capital Structure inputs + leverage entry metrics
Session 12: LBO Operating Model (5-year projections)
Session 13: LBO Debt Schedule (all tranches + PIK + cash sweep)
Session 14: LBO Returns Analysis (IRR Newton-Raphson + MOIC + bridge chart)
Session 15: LBO Scenario Matrices (3 sensitivity tables)
Session 16: Fairness Opinion Football Field Chart (Recharts + offer price line)
Session 17: Precedent Transactions (table + filters + analytics + send-to-fairness)
Session 18: Regulatory Checklist + Gantt Timeline Chart
Session 19: Deal Memorandum PDF Export (all modules + charts captured)
Session 20: Full QA — Run test deal from Section 14, verify all 15 steps

=============================================================================
END OF MASTER PROMPT — VALOR M&A ENGINE
"Courage Meets Capital"
=============================================================================
```

---

# PART 2: FULL DEVELOPMENT GUIDE

## Chapter 1: Before You Start

### Prerequisites Checklist
- [ ] Google Antigravity account active with Claude Opus 4.6 (Thinking) access
- [ ] Cloudflare Pages account (for deployment)
- [ ] Git repository initialized — name it `valor-ma-engine`
- [ ] Node.js 18+ installed
- [ ] Familiarity with your existing Wolf engine codebase

### Understanding the Scope

| Component | Complexity | Sessions |
|---|---|---|
| Merger Model (Accretion/Dilution) | High | 3 |
| LBO Model (full debt schedule) | Very High | 5 |
| Sources & Uses | Low | 1 |
| Synergy Analysis | Medium | 2 |
| Fairness Opinion | Medium | 1 |
| Precedent Transactions | Medium | 1 |
| Regulatory Checklist | Low | 1 |
| PDF Export | Medium | 1 |
| **Total** | | **~20 sessions** |

**Estimated timeline:** 8–12 weeks at 2–3 sessions/week

---

## Chapter 2: Session-by-Session Prompting Strategy

### How to Work with Google Antigravity Effectively

The master prompt (Part 1) is your **single source of truth**. Use this template for each session:

```
[Paste the FULL Master Prompt from Part 1 above]

═══════════════════════════════════════════════════════
CURRENT SESSION FOCUS
═══════════════════════════════════════════════════════

Build: [specific component]
Section referenced: Section [X] of the master prompt above

Previously completed:
  ✅ [list done items]

This session — create/modify:
  📁 [file path 1]
  📁 [file path 2]

CRITICAL REQUIREMENTS FOR THIS SESSION:
  1. All financial calculations must exactly match Section [X] formulas
  2. Use EGYPT_PARAMS constants from constants/egyptParams.js
  3. Apply Valor brand design system (Section 1 of master prompt)
  4. Brand voice: Institutional, confident, precise — no casual microcopy
  5. Use Valor terminology: "Campaign" not "Deal", "Vault" not "Save", etc.
```

---

## Chapter 3: Financial Validation Protocol

### The Golden Rule
Before any real-world use, every single output must be validated against the test deal in Section 14 of the master prompt. Build a validation checklist in a separate Excel spreadsheet.

### Most Common Calculation Errors to Watch For

| Formula | Common Wrong Implementation | Correct Implementation |
|---|---|---|
| Pro-Forma NI | Using pre-tax synergies directly | Must convert to after-tax first |
| Pro-Forma EPS | Dividing by acquirer standalone shares | Must use pro-forma shares (acquirer + new shares) |
| Goodwill | EV minus target's total assets | Equity Value minus Book Value of Equity only |
| IRR | Using CAGR: (exit/entry)^(1/years) - 1 | Must use Newton-Raphson NPV iteration |
| Debt Interest | Using end-of-period balance | Must use beginning-of-period balance |
| Stamp Duty | 0.15% (incorrect) | 0.125% per side = 0.25% total |
| After-Tax Interest | preTax × (1 - tax) | Correct ✓ |
| Break-Even Synergies | Working backward from EPS | requiredNI = standaloneEPS × proFormaShares |
| Cash Sweep | Applied before mandatory amort | Mandatory amort FIRST, then sweep |
| Tax on LBO | Applying tax to EBITDA | Apply tax only to positive EBT |

### Validation Worksheet
Build this in Excel and compare every row to Valor output:

```
Input: All Section 14 values
Expected Output vs. Valor Output vs. Match?

Step 1:  purchasePriceEquity     = 1,500.00  | Valor: ____  | ✅/❌
Step 1:  premiumPaid             = 25.00%    | Valor: ____  | ✅/❌
Step 1:  targetEV                = 1,550.00  | Valor: ____  | ✅/❌
Step 3:  newSharesIssued         = 52.941M   | Valor: ____  | ✅/❌
Step 6:  goodwillCreated         = 1,220.00  | Valor: ____  | ✅/❌
Step 7:  lostInterestOnCash      = 45.78     | Valor: ____  | ✅/❌
Step 7:  incrInterestAfterTax    = 165.68    | Valor: ____  | ✅/❌
Step 9:  goodwillAmortAfterTax   = 94.55     | Valor: ____  | ✅/❌
Step 10: proFormaNI_Y1           = 129.77    | Valor: ____  | ✅/❌
Step 11: standaloneEPS           = 0.5040    | Valor: ____  | ✅/❌
Step 11: proFormaEPS_Y1          = 0.2347    | Valor: ____  | ✅/❌
Step 12: AD_Y1                   = -53.44%   | Valor: ____  | ✅/❌
Step 13: breakEvenSynergies      = 193.91    | Valor: ____  | ✅/❌
```

---

## Chapter 4: Egypt-Specific Compliance Reference

### All Legal Sources — Verified

| Parameter | Value | Source |
|---|---|---|
| Corporate Tax | 22.5% | Income Tax Law No. 91/2005, Art. 56 |
| Oil & Gas Tax | 40.0% | Income Tax Law No. 91/2005, Art. 59 |
| Capital Gains (EGX) | 10.0% | Capital Market Law amendments 2014 |
| Capital Gains (unlisted) | 22.5% | Income Tax Law, Art. 56 |
| Stamp Duty (per side) | 0.125% | Stamp Tax Law No. 111/1980 |
| Dividend WHT | 10.0% | Income Tax Law |
| MTO Threshold | 33% | Capital Market Law No. 95/1992, Art. 4 |
| ECA Revenue Threshold | EGP 100M | Competition Law No. 3/2005 |
| CBE Bank Threshold (notification) | 10% | CBE Regulations |
| CBE Bank Threshold (control) | 33% | CBE Regulations |
| FRA Insurance Threshold | 10% | FRA Regulations |
| Severance Minimum | 2 months/year | Labor Law No. 12/2003, Art. 120 |
| Employer Social Insurance | 18.75% | Social Insurance Law No. 148/2019 |
| Employee Social Insurance | 11.00% | Social Insurance Law No. 148/2019 |
| Profit Sharing | 10% of net profit | Labor Law No. 12/2003 |
| Goodwill Amortization Max | 10 years | Egyptian Accounting Standard No. 19 |

### ⚠️ Mandatory Disclaimer (Display in Engine Footer)
> *"Valor parameters are calibrated to Egyptian law and CBE rates as of Q4 2024. Tax rates, regulatory thresholds, and CBE interest rates are subject to change. Users must verify current rates with qualified legal and tax advisors before relying on this engine for actual transactions. This engine does not constitute legal, tax, or financial advisory services."*

---

## Chapter 5: Deployment & Brand Setup

### Cloudflare Pages Deployment
1. Push to GitHub repository: `valor-ma-engine`
2. Connect to Cloudflare Pages → select repository
3. Build command: `npm run build`
4. Output directory: `dist` (Vite) or `build` (CRA)
5. Live URL: **`valor-ma-engine.pages.dev`**

### Valor Brand Assets (Request in Dedicated Antigravity Session)
- Shield of Valor SVG icon — minimalist heraldic shield + "V" in Valor Gold
- VALOR wordmark SVG in Playfair Display, weight 700
- Favicon (32×32 and 180×180 PNG)
- PDF header template (VALOR logo + gold rule + deal name)
- Loading animation (shield pulse / sword slash reveal)

### Integration with Existing Wolf Engines

Add "Send to Valor →" buttons in each engine:

| From Engine | Data Sent to Valor |
|---|---|
| Wolf Valuation Engine | DCF range, trading comps range, football field values |
| 3-Statement Model Engine | Revenue/EBITDA/NI projections, balance sheet, cash flows |

---

## Chapter 6: Technical Edge Cases & Solutions

### Edge Case 1: IRR Non-Convergence
If Newton-Raphson doesn't converge (some unusual cash flow patterns):
```javascript
// Fallback: bisection method between 0% and 1000%
function irrBisection(cashFlows) {
  let low = -0.99, high = 10.0;
  for (let i = 0; i < 200; i++) {
    const mid = (low + high) / 2;
    const npv = cashFlows.reduce((sum, cf, t) =>
      sum + cf / Math.pow(1 + mid, t), 0);
    if (Math.abs(npv) < 0.001) return mid;
    if (npv > 0) low = mid; else high = mid;
  }
  return null; // display "N/A"
}
```

### Edge Case 2: PIK Mezzanine
PIK interest compounds — implement exactly as:
```javascript
// PIK: interest accrues to balance, NO cash outflow
endingBalance_Mezz[year] = beginningBalance_Mezz[year]
                         * (1 + mezzRate / 100);
cashInterestExpense_Mezz[year] = 0; // no cash used for debt service
```

### Edge Case 3: Football Field Chart (Recharts)
Native Recharts doesn't support horizontal floating bars. Implement as:
```jsx
// Use BarChart layout="vertical" with two data series:
// Series 1: "spacer" from 0 to rangeLow (fill="transparent")
// Series 2: "range" from rangeLow to rangeHigh (fill=Valor Gold)
// Add ReferenceLine x={offerPrice} stroke={#E53935} strokeWidth={3}
```

### Edge Case 4: Sources ≠ Uses (Circular Warning)
When equityPurchasePrice (a Use) is linked from Merger Model (which itself depends on dealTerms), avoid circular re-renders:
```javascript
// Use useCallback to memoize the merger model calculation
// Only recompute S&U when offerPricePerShare or targetSharesOutstanding change
// Don't allow S&U to feed back into Merger Model inputs
```

---

## Chapter 7: QA Checklist Before Launch

### Calculation Accuracy
- [ ] All 13 expected outputs from Section 14 match to 2 decimal places
- [ ] Accretion/Dilution correctly negative for test deal (-53.44% Y1)
- [ ] Break-even synergies = 193.91M (after-tax)
- [ ] Sources = Uses validation triggers at EGP 0.01 difference
- [ ] IRR converges within 0.0001% (test: -100, +241.6 over 5 years ≈ 24.6%)
- [ ] Debt schedule ending balances never go negative
- [ ] Tax never negative on negative EBT
- [ ] PIK toggle: interest accrues to balance, zero cash outflow

### Egypt-Specific
- [ ] Stamp duty = 0.25% (= 0.125% × 2 sides)
- [ ] Severance = 2 months × years × salary (NOT 1 month)
- [ ] MTO triggers at ≥ 33% (not 30%, not 35%)
- [ ] Corporate tax at 22.5% (not 25%, not 30%)
- [ ] Goodwill amortization over 10 years straight-line

### Brand & UX
- [ ] All Valor terminology applied (Campaign, Vault, Command Center, etc.)
- [ ] Currency toggle converts all EGP values correctly at live FX rate
- [ ] FX rate field is editable and triggers full recalculation
- [ ] All microcopy matches Valor brand voice (institutional, no emoji except ✅/❌)
- [ ] PDF export includes VALOR header, all charts, disclaimer footer
- [ ] Sensitivity matrices color-code correctly (green/amber/red)

---

## Chapter 8: Pricing & Go-to-Market (Egypt)

### Pricing Tiers (EGP)

| Tier | Monthly Price | Key Features |
|---|---|---|
| **Analyst** | EGP 0 (Free) | Merger model only, 2 scenarios, watermarked PDF |
| **Associate** | EGP 499/month | All 7 modules, 10 campaigns saved to Vault |
| **VP** | EGP 999/month | Unlimited campaigns, full PDF dispatch, Excel export |
| **Director** | EGP 1,999/month | Multi-user, API access, precedent DB full edit |
| **Enterprise** | Custom | White-label, Arabic UI, direct integration |
| **University** | EGP 199/month | Full access, educational use, bulk licenses |

### Priority Outreach Targets (Egypt)

| Target | Reason | Approach |
|---|---|---|
| EFG Hermes M&A team | Largest Egyptian IB | Demo with live Egyptian deal case |
| CI Capital | Active M&A advisor | Free trial for analysts |
| Sovereign Fund of Egypt | Running privatization program | Government pricing + Arabic support |
| Chimera Investment | Active Egypt PE | LBO module showcase |
| AUC School of Business | 3,000+ finance students | University license + curriculum integration |
| CFA Society Egypt | 2,000+ charterholders | Endorsed study/practice tool |

---

## Chapter 9: The Valor Suite Roadmap

```
TODAY:
⚔️ Valor M&A Engine        ← You build this

PHASE 2 (6-12 months):
⚔️ Valor IPO Engine        ← EGX IPO pricing, book-building, allocation
⚔️ Valor Restructuring     ← Debt workout, distressed analysis, scheme modeling

PHASE 3 (12-24 months):
⚔️ Valor Credit Engine     ← Credit analysis, debt capacity, ratings model
⚔️ Valor Pitch Engine      ← Auto-generate deal teasers and pitch books
⚔️ Valor Due Diligence     ← DD checklist, VDR tracker, red flag detection

The "Valor" brand becomes your complete deal execution product family.
Like Bloomberg has Terminal, Intelligence, Law, Tax — Valor becomes the
Egyptian investment banking operating system.
```

---

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║                    ⚔️  V A L O R                                ║
║                    M & A  E N G I N E                            ║
║                                                                  ║
║  ──────────────────────────────────────────────────────────────  ║
║                                                                  ║
║  NAME:          Valor M&A Engine                                 ║
║  TAGLINE:       "Courage Meets Capital"                          ║
║  URL:           valor-ma-engine.pages.dev                        ║
║  ROOT:          Latin valēre — to be strong, to be worth         ║
║                                                                  ║
║  COLORS:        Black #0B0F1A | Gold #C5A44E |                  ║
║                 Navy #1A2340  | Ivory #F4EDE4                    ║
║  LOGO:          Shield of Valor — heraldic shield + V            ║
║  FONTS:         Playfair Display | Inter | IBM Plex Mono         ║
║  VOICE:         Confident. Precise. Institutional. Bold.         ║
║                                                                  ║
║  MODULES:       Merger Model | LBO | Sources & Uses |            ║
║                 Synergies | Fairness Opinion |                   ║
║                 Precedents | Regulatory                          ║
║                                                                  ║
║  EGYPT-READY:   22.5% tax | FRA | ECA | CBE | Labor Law         ║
║  BUILT WITH:    Google Antigravity (Claude Opus 4.6 Thinking)    ║
║                                                                  ║
║  SUITE:         🐺 Wolf Valuation Engine                        ║
║                 📊 3-Statement Model Engine                      ║
║                 ⚔️  Valor M&A Engine                            ║
║                                                                  ║
║  ──────────────────────────────────────────────────────────────  ║
║                                                                  ║
║          "Wolf finds the value.                                  ║
║           Valor has the courage to close."                       ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```
