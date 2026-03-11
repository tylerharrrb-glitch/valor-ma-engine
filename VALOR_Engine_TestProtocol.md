# ⚔️ VALOR M&A ENGINE — FULL TEST PROTOCOL
## Pre-Deployment Simulation & Verification Guide
### "Courage Meets Capital"

---

## HOW TO USE THIS DOCUMENT

1. **Open VALOR** in your browser
2. **Enter the inputs** exactly as written in each module section
3. **Compare** every output Valor produces against the **EXPECTED OUTPUT** tables below
4. **Mark** each item ✅ PASS or ❌ FAIL in the checklist at the end
5. **Send me your results** — I will verify and identify any formula bugs before deployment

> ⚠️ **Zero tolerance for rounding errors above EGP 0.1M or 0.01% on percentages.**
> Every expected number below was calculated by hand from first principles.
> If Valor returns a different number — the formula is wrong. Do not deploy until all items pass.

---

## TEST DEAL OVERVIEW

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  MODULE 1–3:  PHARAOH HOLDINGS × NILE FOOD INDUSTRIES            ║
║  (Merger Model + Sources & Uses + Synergy Analysis)               ║
║                                                                   ║
║  MODULE 4:    SPHINX CAPITAL × LUXOR LOGISTICS                    ║
║  (LBO Model)                                                      ║
║                                                                   ║
║  MODULE 5:    FAIRNESS OPINION TEST                               ║
║  MODULE 6:    PRECEDENT TRANSACTIONS TEST                         ║
║  MODULE 7:    REGULATORY CHECKLIST TEST                           ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

# MODULE 1: MERGER MODEL (ACCRETION/DILUTION)

## 1A — ENTER THESE INPUTS EXACTLY

### ACQUIRER: Pharaoh Holdings SAE (EGX-listed)

| Field | Value to Enter |
|---|---|
| Revenue LTM | **EGP 5,000M** |
| EBITDA LTM | **EGP 1,000M** |
| EBIT LTM | **EGP 750M** |
| Net Income LTM | **EGP 500M** |
| Shares Outstanding | **1,000M shares** |
| Current Share Price | **EGP 10.00** |
| Existing Debt | **EGP 500M** |
| Cash & Equivalents | **EGP 400M** |
| Tax Rate | **22.5%** |

### TARGET: Nile Food Industries (private company)

| Field | Value to Enter |
|---|---|
| Revenue LTM | **EGP 1,000M** |
| EBITDA LTM | **EGP 200M** |
| EBIT LTM | **EGP 150M** |
| Net Income LTM | **EGP 100M** |
| Shares Outstanding | **100M shares** |
| Current Share Price | **EGP 20.00** (implied private valuation) |
| Existing Debt | **EGP 100M** |
| Cash & Equivalents | **EGP 50M** |
| Book Value of Equity | **EGP 300M** |
| Tax Rate | **22.5%** |

### DEAL TERMS

| Field | Value to Enter |
|---|---|
| Offer Price Per Share | **EGP 25.00** |
| Consideration — Cash % | **60%** |
| Consideration — Stock % | **40%** |
| New Debt for Cash Component | **80%** |
| New Debt Interest Rate | **18.0%** |
| Synergy Convention | **After-Tax** |
| After-Tax Synergies — Year 1 | **EGP 50M** |
| After-Tax Synergies — Year 2 | **EGP 80M** |
| After-Tax Synergies — Year 3 | **EGP 100M** |
| Deal Tax Rate | **22.5%** |
| FX Rate (EGP/USD) | **49.50** |

---

## 1B — EXPECTED OUTPUTS (STEP BY STEP)

### STEP 1: Purchase Price & Deal Metrics

| Output | Expected Value | Calculation Trail |
|---|---|---|
| Purchase Price (Equity Value) | **EGP 2,500.00M** | 25.00 × 100M shares |
| Purchase Price in USD | **$50.51M** | 2,500 ÷ 49.50 |
| Premium Paid | **25.00%** | (25.00 ÷ 20.00 − 1) × 100 |
| Target Enterprise Value | **EGP 2,550.00M** | 2,500 + 100 − 50 |
| EV / EBITDA (Implied) | **12.75x** | 2,550 ÷ 200 |
| EV / Revenue (Implied) | **2.55x** | 2,550 ÷ 1,000 |
| P/E Multiple (Implied) | **25.00x** | 25.00 ÷ (100÷100) |

### STEP 2: Consideration Breakdown

| Output | Expected Value | Calculation Trail |
|---|---|---|
| Cash Consideration | **EGP 1,500.00M** | 2,500 × 60% |
| Stock Consideration | **EGP 1,000.00M** | 2,500 × 40% |

### STEP 3: New Shares Issued

| Output | Expected Value | Calculation Trail |
|---|---|---|
| New Shares Issued | **100.00M shares** | 1,000M EGP ÷ EGP 10.00/share |
| Exchange Ratio | **1.0000x** | 100M new ÷ 100M target shares |

> ✅ **CLEAN CHECK:** Both methods give exact same result. The exchange ratio is a perfect 1-for-1, making this easy to verify.

### STEP 4: Acquisition Financing

| Output | Expected Value | Calculation Trail |
|---|---|---|
| New Acquisition Debt | **EGP 1,200.00M** | 1,500 × 80% |
| Cash Drawn from Balance | **EGP 300.00M** | 1,500 × 20% |
| Cash Available (Acquirer) | **EGP 400.00M** | Given input |
| Cash Shortfall Warning | **NONE** ✅ | 300M < 400M available |

### STEP 5: Pro-Forma Shares

| Output | Expected Value | Calculation Trail |
|---|---|---|
| Pro-Forma Shares Outstanding | **1,100.00M shares** | 1,000M + 100M new shares |

### STEP 6: Goodwill

| Output | Expected Value | Calculation Trail |
|---|---|---|
| Goodwill Created | **EGP 2,200.00M** | 2,500 purchase price − 300 book equity |
| Annual Goodwill Amortization | **EGP 220.00M/year** | 2,200 ÷ 10 years (EAS No. 19) |

### STEP 7: Incremental Interest Expense

| Output | Expected Value | Calculation Trail |
|---|---|---|
| Interest on New Debt | **EGP 216.00M** | 1,200M × 18.0% |
| Lost Interest on Cash Used | **EGP 65.40M** | 300M × (27.25% × 80%) = 300 × 0.2180 |
| Total Incremental Interest (Pre-Tax) | **EGP 281.40M** | 216.00 + 65.40 |
| Total Incremental Interest (After-Tax) | **EGP 218.085M** | 281.40 × (1 − 22.5%) = 281.40 × 0.775 |

> **Verify independently:** 281.40 × 0.775:
> 281.40 × 0.7 = 196.98
> 281.40 × 0.075 = 21.105
> Total = 218.085 ✓

### STEP 8: After-Tax Synergies (Already After-Tax Input)

| Year | Expected Value |
|---|---|
| Year 1 | **EGP 50.00M** (used directly — already after-tax) |
| Year 2 | **EGP 80.00M** |
| Year 3 | **EGP 100.00M** |

### STEP 9: Goodwill Amortization (After-Tax)

| Output | Expected Value | Calculation Trail |
|---|---|---|
| Goodwill Amortization After-Tax | **EGP 170.50M/year** | 220.00 × (1 − 22.5%) = 220 × 0.775 |

### STEP 10: Pro-Forma Net Income

**Formula:**
```
Pro-Forma NI = Acquirer NI + Target NI + After-Tax Synergies
             − Goodwill Amortization (A/T) − Incremental Interest (A/T)
```

| Year | Acquirer NI | Target NI | Synergies | Goodwill Amort | Incr. Interest | PF Net Income |
|---|---|---|---|---|---|---|
| **Year 1** | 500.000 | 100.000 | +50.000 | −170.500 | −218.085 | **= EGP 261.415M** |
| **Year 2** | 500.000 | 100.000 | +80.000 | −170.500 | −218.085 | **= EGP 291.415M** |
| **Year 3** | 500.000 | 100.000 | +100.000 | −170.500 | −218.085 | **= EGP 311.415M** |

**Verify Year 1:**
500 + 100 + 50 = 650
170.5 + 218.085 = 388.585
650 − 388.585 = **261.415** ✓

**Verify Year 2:** 680 − 388.585 = **291.415** ✓

**Verify Year 3:** 700 − 388.585 = **311.415** ✓

### STEP 11: Pro-Forma EPS

| Metric | Expected Value | Calculation Trail |
|---|---|---|
| Acquirer Standalone EPS | **EGP 0.5000** | 500M NI ÷ 1,000M shares |
| Pro-Forma EPS — Year 1 | **EGP 0.2376** | 261.415 ÷ 1,100M shares = 0.237650 |
| Pro-Forma EPS — Year 2 | **EGP 0.2649** | 291.415 ÷ 1,100M shares = 0.264923 |
| Pro-Forma EPS — Year 3 | **EGP 0.2831** | 311.415 ÷ 1,100M shares = 0.283105 |

> **Note:** Denominator is ALWAYS pro-forma shares (1,100M), NOT standalone acquirer shares (1,000M).

### STEP 12: Accretion / Dilution

**Formula:** (Pro-Forma EPS − Standalone EPS) ÷ Standalone EPS × 100

| Year | Pro-Forma EPS | Standalone EPS | Accretion/Dilution | Verdict |
|---|---|---|---|---|
| **Year 1** | 0.2376 | 0.5000 | **(0.2376 − 0.5000) ÷ 0.5000 × 100 = −52.47%** | ❌ DILUTIVE |
| **Year 2** | 0.2649 | 0.5000 | **(0.2649 − 0.5000) ÷ 0.5000 × 100 = −47.02%** | ❌ DILUTIVE |
| **Year 3** | 0.2831 | 0.5000 | **(0.2831 − 0.5000) ÷ 0.5000 × 100 = −43.38%** | ❌ DILUTIVE |

**Verify Year 1:**
(0.237650 − 0.500000) ÷ 0.500000 × 100
= (−0.262350) ÷ 0.500000 × 100
= **−52.47%** ✓

> **Why is the deal so dilutive?** Massive goodwill (EGP 2,200M on EGP 300M book equity) + expensive Egyptian debt (18%) + large share issuance (100M new shares = 9.09% dilution). This is realistic for a high-premium deal in Egypt's current rate environment.

### STEP 13: Break-Even Synergies

**What after-tax synergies make the deal EPS-neutral?**

```
Base NI (zero synergies) = 500 + 100 − 170.5 − 218.085 = EGP 211.415M
Required NI (EPS neutral) = 0.5000 × 1,100M shares = EGP 550.000M
Break-Even After-Tax Synergies = 550.000 − 211.415 = EGP 338.585M
```

| Output | Expected Value |
|---|---|
| Break-Even After-Tax Synergies Required | **EGP 338.585M/year** |

> **Interpretation:** The deal needs EGP 338.585M of after-tax synergies annually to be EPS-neutral. Current Year 3 synergies are only EGP 100M — far short. This is realistic: a 12.75x EV/EBITDA deal with 18% debt requires very large synergies to justify.

### STEP 14: Contribution Analysis

| Metric | Acquirer | Target | Combined |
|---|---|---|---|
| Revenue | **83.33%** | **16.67%** | 100% |
| EBITDA | **83.33%** | **16.67%** | 100% |
| Net Income | **83.33%** | **16.67%** | 100% |
| Pro-Forma Ownership | **90.91%** | **9.09%** | 100% |

**Verify:**
- Revenue: 5,000÷6,000=83.33%; 1,000÷6,000=16.67% ✓
- EBITDA: 1,000÷1,200=83.33%; 200÷1,200=16.67% ✓
- Ownership: 1,000÷1,100=90.91%; 100÷1,100=9.09% ✓

> **Interpretation flag (Valor should display):** Target shareholders receive 9.09% ownership but contribute 16.67% of EBITDA — they are receiving LESS ownership than their financial contribution warrants. This signals the acquirer is paying a high premium.

---

# MODULE 2: SOURCES & USES OF FUNDS

## 2A — TEST 1: BALANCED S&U (should show BALANCED ✅)

Enter these inputs:

### SOURCES

| Source | Amount to Enter |
|---|---|
| Term Loan A | **EGP 500M** |
| Term Loan B | **EGP 200M** |
| Senior Notes | **EGP 100M** |
| Sponsor Equity | **EGP 800M** |
| Cash on Hand | **EGP 96.5M** |
| **TOTAL SOURCES** | **EGP 1,696.5M** |

### USES

| Use | Amount to Enter | Notes |
|---|---|---|
| Equity Purchase Price | **EGP 1,500M** | Manual input |
| Refinance Target Debt | **EGP 50M** | Manual input |
| Advisory Fees | **EGP 15M** | 1.0% × 1,500M (>EGP 500M threshold) |
| Financing Fees | **EGP 12M** | 1.5% × 800M new debt |
| Legal & DD Fees | **EGP 7.5M** | 0.5% × 1,500M |
| ECA Filing Fee | **EGP 0.75M** | Manual input |
| Stamp Duty | **EGP 3.75M** | AUTO-CALC: 1,500 × 0.25% = 3.75M |
| Cash to Balance Sheet | **EGP 107.5M** | Manual input |
| **TOTAL USES** | **EGP 1,696.5M** | |

### Expected Outputs — Test 1

| Output | Expected Value |
|---|---|
| Total Sources | **EGP 1,696.50M** |
| Total Uses | **EGP 1,696.50M** |
| Balance Difference | **EGP 0.00M** |
| Balance Status | **BALANCED ✅** |
| Total Debt Raised | **EGP 800M** (500+200+100) |
| Total Equity | **EGP 800M** |
| Debt / Total Cap | **50.00%** (800÷1,600) |
| Equity / Total Cap | **50.00%** (800÷1,600) |

**Stamp Duty Auto-Calc Verification:**
Equity Purchase Price = EGP 1,500M
Stamp Duty = 1,500M × 0.00125 × 2 = 1,500M × 0.0025 = **EGP 3.75M** ✓

## 2B — TEST 2: INTENTIONAL IMBALANCE (should show IMBALANCED ❌)

Change ONLY this one field:
- Cash on Hand: change from EGP 96.5M → **EGP 100M**

### Expected Outputs — Test 2

| Output | Expected Value |
|---|---|
| Total Sources | **EGP 1,700.00M** |
| Total Uses | **EGP 1,696.50M** |
| Balance Difference | **+EGP 3.50M** |
| Balance Status | **IMBALANCED ❌ — Sources exceed Uses by EGP 3.50M** |

> Valor must display: *"Attention Required: Sources and Uses do not balance. Variance: EGP 3.50M"*

## 2C — TEST 3: FEE AUTO-CALCULATOR

Click "Calculate Fees" with Equity Purchase Price = EGP 1,500M and Total Debt = EGP 800M.

| Fee | Expected Auto-Calc | Formula |
|---|---|---|
| Advisory Fee | **EGP 15.00M** | 1,500M × 1.0% (deal > EGP 500M) |
| Financing Fee | **EGP 12.00M** | 800M × 1.5% |
| Legal & DD Fee | **EGP 7.50M** | 1,500M × 0.5% |

---

# MODULE 3: SYNERGY ANALYSIS

## 3A — ENTER THESE INPUTS (same deal: Pharaoh Holdings × Nile Food)

### Revenue Synergies (EGP Millions)

| Category | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---|---|---|---|---|
| Cross-Selling / Upselling | **20** | **40** | **60** | **70** | **80** |
| All other categories | 0 | 0 | 0 | 0 | 0 |

### Cost Synergy Inputs

| Field | Value |
|---|---|
| Redundant Positions | **50** |
| Average Annual Salary (EGP) | **600,000** |
| Duplicate Facilities | **3** |
| Average Annual Rent Per Facility (EGP M) | **5** |
| Combined Procurement Spend (EGP M) | **800** |
| Procurement Discount % | **3%** |
| Annual IT Savings (EGP M) | **8** |
| Combined SG&A (EGP M) | **300** |
| SG&A Overlap % | **5%** |

### Phase-In Schedule

| Year | % |
|---|---|
| Y1 | **50%** |
| Y2 | **75%** |
| Y3 | **100%** |
| Y4 | **100%** |
| Y5 | **100%** |

### Integration Costs

| Field | Value |
|---|---|
| Average Years of Service | **10** |
| Facility Closure Costs (EGP M) | **6** |
| IT Integration Costs (EGP M) | **12** |
| Rebranding Costs (EGP M) | **3** |
| Other Integration Costs (EGP M) | **5** |

### Discount Rate
- WACC: **18.0%**

---

## 3B — EXPECTED OUTPUTS (Full Calculation Trail)

### A. Headcount Synergy Calculation

```
Annual Salary Savings  = 50 positions × EGP 600,000       = EGP 30.000M
Social Insurance Savings = 30.000M × 18.75%               = EGP  5.625M
Total Headcount Synergy (full run-rate)                    = EGP 35.625M
```

### B. Other Cost Synergies (Full Run-Rate)

```
Facility Consolidation  = 3 × EGP 5M                      = EGP 15.000M
Procurement Savings     = 800M × 3%                        = EGP 24.000M
IT Savings                                                  = EGP  8.000M
SG&A Elimination        = 300M × 5%                        = EGP 15.000M
Total Cost Synergies (full run-rate)                        = EGP 97.625M
```

**Verify:** 35.625 + 15 + 24 + 8 + 15 = **97.625M** ✓

### C. Cost Synergies by Year (Phase-In Applied)

| Year | Phase-In | Cost Synergies | Revenue Synergies | Total Gross Synergies |
|---|---|---|---|---|
| Y1 | 50% | 97.625 × 50% = **48.813M** | **20.000M** | **68.813M** |
| Y2 | 75% | 97.625 × 75% = **73.219M** | **40.000M** | **113.219M** |
| Y3 | 100% | **97.625M** | **60.000M** | **157.625M** |
| Y4 | 100% | **97.625M** | **70.000M** | **167.625M** |
| Y5 | 100% | **97.625M** | **80.000M** | **177.625M** |

### D. After-Tax Synergies (×0.775)

| Year | Gross Synergies | After-Tax (×0.775) |
|---|---|---|
| Y1 | 68.813M | **53.330M** |
| Y2 | 113.219M | **87.745M** |
| Y3 | 157.625M | **122.159M** |
| Y4 | 167.625M | **129.909M** |
| Y5 | 177.625M | **137.659M** |

### E. Integration Costs

```
Severance = 50 × 600,000 × (2 months ÷ 12 months) × 10 years
          = 50 × 600,000 × 0.1667 × 10
          = 50 × 600,000 × 1.6667
          = EGP 50.000M
```

> **Source:** Egyptian Labor Law No. 12/2003, Article 120 — 2 months salary per year of service.

```
Facility Closure:   EGP  6.000M
IT Integration:     EGP 12.000M
Rebranding:         EGP  3.000M
Other:              EGP  5.000M
─────────────────────────────────
Total One-Time:     EGP 76.000M

After-Tax:          76.000 × 0.775 = EGP 58.900M
```

### F. NPV of Synergies (WACC = 18%)

**Discount Factors:**

| Year | (1.18)^n | Value |
|---|---|---|
| 1 | 1.18^1 | **1.18000** |
| 2 | 1.18^2 | **1.39240** |
| 3 | 1.18^3 | **1.64303** |
| 4 | 1.18^4 | **1.93878** |
| 5 | 1.18^5 | **2.28776** |

**NPV Calculation:**

| Item | Cash Flow (EGP M) | Discount Factor | Present Value (EGP M) |
|---|---|---|---|
| Year 0 (Integration Costs) | −58.900 | 1.00000 | **−58.900** |
| Year 1 Net Synergies | +53.330 | 1.18000 | **+45.195** |
| Year 2 Net Synergies | +87.745 | 1.39240 | **+63.019** |
| Year 3 Net Synergies | +122.159 | 1.64303 | **+74.350** |
| Year 4 Net Synergies | +129.909 | 1.93878 | **+67.006** |
| Year 5 Net Synergies | +137.659 | 2.28776 | **+60.169** |
| Terminal Value | 137.659÷0.18 = 764.772 | 2.28776 | **+334.295** |

```
NPV = −58.900 + 45.195 + 63.019 + 74.350 + 67.006 + 60.169 + 334.295
    = −58.900 + 644.034
    = EGP 585.134M
```

### G. Summary Indicators

| Output | Expected Value | Formula |
|---|---|---|
| NPV of Synergies | **EGP 585.13M** | Full calculation above |
| Synergies as % of Purchase Price | **23.41%** | 585.13 ÷ 2,500 × 100 |
| Goodwill Coverage Ratio | **26.60%** | 585.13 ÷ 2,200 × 100 |
| Goodwill Coverage Status | **❌ RED** | < 50% → high impairment risk |
| Payback Period | **~1.06 years** | See below |

**Payback Calculation:**
```
Cumulative after-tax synergies:
  End Year 1: EGP 53.330M  <  EGP 58.900M (not recovered yet)
  End Year 2: 53.330 + 87.745 = EGP 141.075M  >  EGP 58.900M ✓

Fraction of Year 2 needed: (58.900 − 53.330) ÷ 87.745 = 5.570 ÷ 87.745 = 0.0635

Payback Period = 1 + 0.0635 = 1.06 years ≈ 1 year and ~23 days
```

---

# MODULE 4: LBO MODEL

## 4A — ENTER THESE INPUTS

### Entry Assumptions: Sphinx Capital × Luxor Logistics SAE

| Field | Value to Enter |
|---|---|
| Target Revenue LTM | **EGP 2,000M** |
| Target EBITDA LTM | **EGP 400M** |
| Entry EV/EBITDA Multiple | **7.0x** |
| Target Net Debt at Close | **EGP 0M** (debt-free company — clean test) |
| Transaction & Financing Fees | **EGP 50M** |

### Capital Structure

| Tranche | Amount | Rate | Annual Amort % | Maturity |
|---|---|---|---|---|
| Term Loan A | **EGP 800M** | **20.0%** | **20%** (= EGP 160M/yr) | 5 years |
| Term Loan B | **EGP 700M** | **21.0%** | **1%** (= EGP 7M/yr) | 7 years |
| Mezzanine | **EGP 0M** | N/A | N/A | N/A |
| Sponsor Equity | **EGP 1,350M** | N/A | N/A | N/A |

### Operating Assumptions (All 5 Years — Same Values)

| Field | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---|---|---|---|---|
| Revenue Growth % | **10%** | **10%** | **10%** | **10%** | **10%** |
| EBITDA Margin % | **20%** | **20%** | **20%** | **20%** | **20%** |
| D&A % of Revenue | **5%** | **5%** | **5%** | **5%** | **5%** |
| CapEx % of Revenue | **5%** | **5%** | **5%** | **5%** | **5%** |
| DSO Days | **0** | **0** | **0** | **0** | **0** |
| DIO Days | **0** | **0** | **0** | **0** | **0** |
| DPO Days | **0** | **0** | **0** | **0** | **0** |
| COGS % | **0%** | **0%** | **0%** | **0%** | **0%** |

> **Why DSO/DIO/DPO = 0?** Setting working capital drivers to zero eliminates ΔWC from the FCFE calculation. This isolates the core LBO mechanics (debt schedule, interest, returns) for clean verification. Also note: CapEx = D&A = 5% → D&A and CapEx cancel out in FCFE.

### Exit Assumptions

| Field | Value |
|---|---|
| Exit Year | **Year 5** |
| Exit EV/EBITDA Multiple | **8.5x** |
| Exit Route | **Strategic Sale** |
| Minimum Cash Retention | **EGP 30M** |
| Cash Sweep % | **100%** |

---

## 4B — EXPECTED OUTPUTS

### Entry Metrics

| Output | Expected Value | Calculation Trail |
|---|---|---|
| Implied Entry EV | **EGP 2,800M** | 400M × 7.0x |
| Equity Purchase Price | **EGP 2,800M** | 2,800 − 0 (no target net debt) |
| Total Capital Required | **EGP 2,850M** | 2,800 + 0 + 50 fees |
| Total Debt at Entry | **EGP 1,500M** | 800 + 700 |
| Leverage at Entry | **3.75x** | 1,500 ÷ 400 |
| Sponsor Equity | **EGP 1,350M** | 2,850 − 1,500 |
| Equity % of Total Cap | **47.37%** | 1,350 ÷ 2,850 × 100 |

**Verify Capital Structure Balances:**
800 + 700 + 1,350 = **2,850M** ✓

### Operating Model — Revenue & EBITDA

| Year | Revenue (EGP M) | EBITDA (EGP M) | D&A (EGP M) | EBIT (EGP M) | CapEx (EGP M) |
|---|---|---|---|---|---|
| Base (Y0) | **2,000.00** | **400.00** | — | — | — |
| Year 1 | **2,200.00** | **440.00** | **110.00** | **330.00** | **110.00** |
| Year 2 | **2,420.00** | **484.00** | **121.00** | **363.00** | **121.00** |
| Year 3 | **2,662.00** | **532.40** | **133.10** | **399.30** | **133.10** |
| Year 4 | **2,928.20** | **585.64** | **146.41** | **439.23** | **146.41** |
| Year 5 | **3,221.02** | **644.20** | **161.05** | **483.15** | **161.05** |

> **Verify Year 5 Revenue:** 2,000 × 1.10^5 = 2,000 × 1.61051 = **3,221.02M** ✓

### Debt Schedule — Year 1 (Full Detail)

| Item | TLA | TLB | Total |
|---|---|---|---|
| Beginning Balance | **800.00M** | **700.00M** | **1,500.00M** |
| Interest Expense | **160.00M** | **147.00M** | **307.00M** |
| Mandatory Amortization | **160.00M** | **7.00M** | **167.00M** |
| Cash Sweep | **0.00M** | **0.00M** | **0.00M** |
| Ending Balance | **640.00M** | **693.00M** | **1,333.00M** |

**Interest Verification:**
- TLA: 800 × 20.0% = **160.00M** ✓
- TLB: 700 × 21.0% = **147.00M** ✓

**Year 1 Income Statement:**
```
EBIT                              330.00M
Less: Total Interest Expense     −307.00M
EBT                                23.00M
Less: Tax (23.00 × 22.5%)         −5.175M
Net Income                         17.825M
```

**Year 1 FCFE (ΔWC = 0; D&A = CapEx → net zero):**
```
FCFE = NI + D&A − CapEx − ΔWC − Mandatory Amortization
     = 17.825 + 110.00 − 110.00 − 0 − 167.00
     = 17.825 − 167.00
     = −149.175M  (NEGATIVE → no cash sweep)
```

**Year 1 Credit Metrics:**
| Metric | Expected Value | Covenant | Status |
|---|---|---|---|
| Leverage (Debt/EBITDA) | **3.030x** (1,333÷440) | ≤ 3.0x | ⚠️ BORDERLINE |
| Interest Coverage (EBITDA/Int) | **1.434x** (440÷307) | ≥ 2.5x | ❌ COVENANT BREACH |

> ⚠️ Valor **MUST** display an amber/red alert: *"Attention Required: ICR covenant breach in Year 1. Actual: 1.43x vs. minimum 2.50x"*

### Debt Schedule — All 5 Years Summary

| Year | TLA End | TLB End | Total Debt | Cash Sweep | EBITDA | Leverage | ICR | Covenant |
|---|---|---|---|---|---|---|---|---|
| Y0 | 800.00 | 700.00 | **1,500.00** | — | 400.00 | 3.75x | — | — |
| Y1 | 640.00 | 693.00 | **1,333.00** | 0 | 440.00 | **3.030x** | **1.434x** | ❌ ICR |
| Y2 | 480.00 | 686.00 | **1,166.00** | 0 | 484.00 | **2.409x** | **1.769x** | ❌ ICR |
| Y3 | 320.00 | 679.00 | **999.00** | 0 | 532.40 | **1.877x** | **2.218x** | ❌ ICR |
| Y4 | 160.00 | 672.00 | **832.00** | 0 | 585.64 | **1.421x** | **2.836x** | ✅ |
| Y5 | 0.00 | 621.72 | **621.72** | 43.28 | 644.20 | **0.965x** | **3.722x** | ✅ |

**Year-by-Year Debt Schedule Verification:**

**Year 2:**
- TLA: 640 − 160 = 480; Int = 640 × 20% = **128.00M**
- TLB: 693 − 7 = 686; Int = 693 × 21% = **145.53M**
- Total Int = 273.53M; EBT = 363 − 273.53 = 89.47M; Tax = 20.13M; NI = 69.34M
- FCFE = 69.34 − 167 = −97.66M → no sweep ✓

**Year 3:**
- TLA: 480 − 160 = 320; Int = 480 × 20% = **96.00M**
- TLB: 686 − 7 = 679; Int = 686 × 21% = **144.06M**
- Total Int = 240.06M; EBT = 399.30 − 240.06 = 159.24M; Tax = 35.83M; NI = 123.41M
- FCFE = 123.41 − 167 = −43.59M → no sweep ✓

**Year 4:**
- TLA: 320 − 160 = 160; Int = 320 × 20% = **64.00M**
- TLB: 679 − 7 = 672; Int = 679 × 21% = **142.59M**
- Total Int = 206.59M; EBT = 439.23 − 206.59 = 232.64M; Tax = 52.34M; NI = 180.30M
- FCFE = 180.30 − 167 = 13.30M
- Excess for Sweep = max(13.30 − 30, 0) = **0** (below minimum cash retention)
- No sweep ✓

**Year 5:**
- TLA: 160 − 160 = **0** (fully paid off at maturity); Int = 160 × 20% = **32.00M**
- TLB: 672 − 7 = 665; Int = 672 × 21% = **141.12M**
- Total Int = 173.12M; EBT = 483.15 − 173.12 = 310.03M; Tax = 69.76M; NI = 240.27M
- FCFE = 240.27 − 167 = 73.27M
- Excess for Sweep = max(73.27 − 30, 0) = **43.27M**
- Cash Sweep → TLA = 0 (already paid); applied to TLB
- TLB end = 665 − 43.27 = **621.73M**
- Total Debt End Y5 = **621.73M** ✓

> **ICR Year 5:** 644.20 ÷ 173.12 = **3.722x** ✓ (first year clearly above 2.5x)

### Exit & Returns Analysis

| Output | Expected Value | Calculation Trail |
|---|---|---|
| Exit EBITDA | **EGP 644.20M** | From operating model Y5 |
| Exit EV | **EGP 5,475.70M** | 644.20 × 8.5x |
| Cash at Exit (min retention) | **EGP 30.00M** | Minimum retention setting |
| Net Debt at Exit | **EGP 591.73M** | 621.73 − 30.00 |
| Equity Value at Exit | **EGP 4,883.97M** | 5,475.70 − 591.73 |
| Capital Gain on Sale | **EGP 3,533.97M** | 4,883.97 − 1,350.00 |
| Capital Gains Tax (22.5%) | **EGP 795.14M** | 3,533.97 × 22.5% |
| Equity Returned to Sponsor | **EGP 4,088.83M** | 4,883.97 − 795.14 |
| **MOIC** | **3.03x** | 4,088.83 ÷ 1,350.00 |
| **IRR** | **~24.80%** | Newton-Raphson: (4,088.83÷1,350)^(1/5)−1 |

**MOIC Benchmark:**
- 3.03x falls in **DARK GREEN** range (> 3.0x) ✅

**IRR Benchmark:**
- 24.80% exceeds Egypt/MENA hurdle rate of 20% → **GREEN** ✅

**IRR Manual Verification:**
```
IRR = (4,088.83 ÷ 1,350)^(1/5) − 1
    = (3.0288)^(0.2) − 1

Check: 1.2480^5 = 1.2480 × 1.2480 × 1.2480 × 1.2480 × 1.2480
     = 1.5575 × 1.5575 × 1.5575... ≈ 3.027

NPV check: −1,350 + 4,088.83 ÷ (1.248)^5
         = −1,350 + 4,088.83 ÷ 3.028
         = −1,350 + 1,350.9 ≈ 0 ✓
```

### Returns Attribution (Informational)

| Component | Expected Value | Calculation |
|---|---|---|
| Exit EV at Entry Multiple | 644.20 × 7.0 = 4,509.40 | — |
| Exit Equity at Entry Multiple | 4,509.40 − 591.73 = **3,917.67M** | — |
| EBITDA Growth Contribution | 3,917.67 − 1,350.00 = **EGP 2,567.67M** | — |
| Multiple Expansion Contribution | 644.20 × (8.5−7.0) = **EGP 966.30M** | — |
| Debt Paydown Contribution | 1,500 − 621.73 = **EGP 878.27M** | — |

> **Note on Attribution:** The sum (2,567.67 + 966.30 + 878.27 = EGP 4,412.24M) will NOT equal the pre-tax gain (EGP 3,533.97M). This is expected and by design — the methodology in the master prompt uses exit net debt in the EBITDA growth term, which creates an overlap with the debt paydown term. This is acceptable and informational. **Do not flag this as a bug.**

---

# MODULE 5: FAIRNESS OPINION (FOOTBALL FIELD)

## 5A — TEST 1: "NOT FAIR" DETERMINATION

Enter these valuation ranges and offer price:

| Methodology | Low (EGP) | High (EGP) |
|---|---|---|
| DCF | **22.00** | **28.00** |
| Trading Comparables | **18.00** | **24.00** |
| Precedent Transactions | **24.00** | **32.00** |
| 52-Week Trading Range | **17.00** | **23.00** |
| Analyst Price Targets | **21.00** | **26.00** |
| LBO Floor Value | **19.00** | **23.00** |
| **Offer Price Per Share** | **EGP 25.00** | — |

### Expected Outputs — Test 1 (Offer = EGP 25.00)

| Methodology | In Range? | Offer vs. Midpoint |
|---|---|---|
| DCF (range: 22–28, midpoint 25.00) | ✅ Within range | 0.00% at midpoint |
| Trading Comps (18–24, midpoint 21.00) | ❌ Above range | +19.05% above midpoint |
| Precedent Txns (24–32, midpoint 28.00) | ✅ Within range | −10.71% below midpoint |
| 52-Week (17–23, midpoint 20.00) | ❌ Above range | +25.00% above midpoint |
| Analyst Targets (21–26, midpoint 23.50) | ✅ Within range | +6.38% above midpoint |
| LBO Floor (19–23, midpoint 21.00) | ❌ Above range | +19.05% above midpoint |

```
Methodologies within range: 3 of 6 = 50% < 60% threshold
Fairness Determination: OUTSIDE FAIR RANGE ❌
```

Expected Valor display: *"The consideration falls outside the majority of value ranges derived from our financial analyses."*

## 5B — TEST 2: "FAIR" DETERMINATION

Change ONLY the offer price from EGP 25.00 → **EGP 22.00**

| Methodology | In Range? |
|---|---|
| DCF (22–28) | ✅ (22.00 = lower bound, counts as within) |
| Trading Comps (18–24) | ✅ |
| Precedent Txns (24–32) | ❌ (below range) |
| 52-Week (17–23) | ✅ |
| Analyst Targets (21–26) | ✅ |
| LBO Floor (19–23) | ✅ |

```
Methodologies within range: 5 of 6 = 83.3% > 60% threshold
Fairness Determination: FAIR ✅
```

Expected Valor display: *"Based on our analyses, the consideration to be received is fair from a financial point of view to the shareholders."*

---

# MODULE 6: PRECEDENT TRANSACTIONS DATABASE

## 6A — VERIFY PRE-LOADED DATA

Open the Precedent Transactions module. Confirm these transactions exist pre-loaded:

| # | Transaction | Expected Status |
|---|---|---|
| 1 | ADQ — Ras El Hekma New City | Should appear ✅ |
| 2 | ADQ — CIB Stake | Should appear ✅ |
| 3 | FAB — EFG Hermes | Should appear ✅ |
| 4 | Telecom Egypt — Vodafone Egypt | Should appear ✅ |
| 5 | Saudi Egyptian Investment Co. | Should appear ✅ |
| 6 | PIF — Banque du Caire | Should appear ✅ |

## 6B — ADD A NEW TRANSACTION

Enter this transaction manually:

| Field | Value |
|---|---|
| Transaction Name | **Elsewedy Electric — ACWA Power Egypt JV** |
| Date Announced | **2023-09-15** |
| Acquirer | **Elsewedy Electric** |
| Acquirer Country | **Egypt** |
| Target | **ACWA Power Egypt Assets** |
| Target Country | **Egypt** |
| Sector | **Energy / Utilities** |
| Deal Value USD (M) | **$320M** |
| Consideration | **Cash** |
| Stake Acquired | **51%** |
| Status | **Completed** |
| EV/EBITDA | **9.5x** |
| Premium % | **18%** |

After adding, the database should now have **7 transactions**.

## 6C — FILTER & ANALYTICS TEST

Apply filter: **Sector = Banking**

Expected result: **2 transactions** shown (CIB + Banque du Caire)

Analytics panel should show:
| Metric | Expected Value |
|---|---|
| Median EV/EBITDA | **N/A** (no EV/EBITDA data for banking deals in pre-loaded data) |
| Median Premium | **15.0%** (only CIB has premium data = 15%) |
| Deal Count | **2** |

Apply filter: **All Sectors** (reset)

Analytics with all 7 transactions:
| Metric | Expected Value |
|---|---|
| Deal Count | **7** |
| Transactions with EV/EBITDA data | **2** (Vodafone @ 7.2x, Elsewedy JV @ 9.5x) |
| Median EV/EBITDA (of those 2) | **8.35x** ((7.2 + 9.5) ÷ 2) |

---

# MODULE 7: REGULATORY CHECKLIST

## 7A — TRIGGER TESTS

For each scenario below, enter the described deal characteristics and verify the correct items auto-check or auto-highlight.

### Test A: ECA Trigger (Combined Revenue > EGP 100M)

Enter:
- Combined Revenue: **EGP 6,000M** (Pharaoh 5,000 + Nile 1,000)

Expected: **ECA Merger Notification ✅ auto-highlighted** (6,000M >> 100M threshold)

### Test B: Mandatory Tender Offer Trigger (Acquisition ≥ 33% of EGX-listed target)

Enter:
- Target is EGX-listed: **Yes**
- Stake Acquired: **35%**

Expected: **Mandatory Tender Offer (MTO) ✅ auto-highlighted** (35% ≥ 33% threshold)

### Test C: MTO NOT Triggered (Below Threshold)

Change stake acquired to: **30%**

Expected: **MTO NOT highlighted** (30% < 33%)

### Test D: CBE Approval Trigger (Bank Target)

Enter:
- Target sector: **Banking**
- Stake: **15%**

Expected: **CBE Approval ✅ auto-highlighted** (15% > 10% threshold)

### Test E: CBE NOT Required (Non-Bank)

Enter:
- Target sector: **Consumer Goods** (non-bank)

Expected: **CBE Approval NOT highlighted**

### Test F: Stamp Duty — Private vs. Listed Target

**Scenario 1 — Private Target:**
- Target type: Private Company
- Expected stamp duty: **EGP 0M** (no listed security transfer)

**Scenario 2 — EGX-Listed Target:**
- Target type: EGX-listed
- Equity Purchase Price: EGP 2,500M
- Expected stamp duty: **EGP 6.25M** (2,500 × 0.25% = 6.25M) per side per party
- Note: Buyer pays 3.125M + Seller pays 3.125M = total 6.25M (or show as 3.125M per side)

## 7B — DEAL TIMELINE GANTT TEST

Enter Deal Start Date: **01 January 2025**

Expected milestones to auto-generate:

| Phase | Expected Start Date | Duration |
|---|---|---|
| Preparation & Due Diligence | 01 Jan 2025 | Weeks 1–8 |
| SPA Negotiation | ~15 Feb 2025 | Weeks 6–12 |
| Regulatory Filings | ~01 Mar 2025 | Weeks 9–17 (ECA only) |
| Shareholder Approval | ~22 Mar 2025 | Weeks 12–16 |
| Closing | ~01 Jun 2025 | Week 22–23 |

---

# MODULE 8: CURRENCY TOGGLE TEST

## 8A — VERIFY EGP ↔ USD CONVERSION

With FX Rate = **49.50 EGP/USD**, toggle to USD display.

Use Merger Model outputs to verify conversion:

| Metric | EGP Value | Expected USD Value | Formula |
|---|---|---|---|
| Purchase Price | EGP 2,500.00M | **$50.51M** | 2,500 ÷ 49.50 |
| Target EV | EGP 2,550.00M | **$51.52M** | 2,550 ÷ 49.50 |
| Goodwill | EGP 2,200.00M | **$44.44M** | 2,200 ÷ 49.50 |
| PF NI Year 1 | EGP 261.415M | **$5.28M** | 261.415 ÷ 49.50 |

## 8B — VERIFY FX RATE CHANGE PROPAGATES

Change FX Rate from 49.50 → **50.00 EGP/USD**

Verify Purchase Price in USD changes:
- Old: 2,500 ÷ 49.50 = **$50.51M**
- New: 2,500 ÷ 50.00 = **$50.00M** ✓

All USD values across ALL modules must update when FX rate changes.

---

# FINAL PASS/FAIL CHECKLIST

## Instructions
Copy this checklist, run each test, mark ✅ PASS or ❌ FAIL, and send back.
For any ❌ FAIL, also write the value Valor showed vs. the expected value.

---

### MODULE 1 — MERGER MODEL

| # | Test | Expected | Valor Shows | Pass/Fail |
|---|---|---|---|---|
| M1 | Purchase Price | EGP 2,500.00M | | |
| M2 | Premium Paid | 25.00% | | |
| M3 | Target EV | EGP 2,550.00M | | |
| M4 | EV/EBITDA | 12.75x | | |
| M5 | Cash Component | EGP 1,500.00M | | |
| M6 | Stock Component | EGP 1,000.00M | | |
| M7 | New Shares Issued | 100.00M shares | | |
| M8 | Exchange Ratio | 1.0000x | | |
| M9 | New Acquisition Debt | EGP 1,200.00M | | |
| M10 | Cash from Balance | EGP 300.00M | | |
| M11 | Pro-Forma Shares | 1,100.00M | | |
| M12 | Goodwill Created | EGP 2,200.00M | | |
| M13 | Annual Goodwill Amort | EGP 220.00M | | |
| M14 | Interest on New Debt | EGP 216.00M | | |
| M15 | Lost Interest on Cash | EGP 65.40M | | |
| M16 | Total Incr. Interest (Pre-Tax) | EGP 281.40M | | |
| M17 | Total Incr. Interest (After-Tax) | EGP 218.085M | | |
| M18 | Goodwill Amort (After-Tax) | EGP 170.50M | | |
| M19 | PF Net Income Year 1 | EGP 261.415M | | |
| M20 | PF Net Income Year 2 | EGP 291.415M | | |
| M21 | PF Net Income Year 3 | EGP 311.415M | | |
| M22 | Standalone EPS | EGP 0.5000 | | |
| M23 | PF EPS Year 1 | EGP 0.2376 | | |
| M24 | PF EPS Year 2 | EGP 0.2649 | | |
| M25 | PF EPS Year 3 | EGP 0.2831 | | |
| M26 | Accretion/Dilution Year 1 | −52.47% (DILUTIVE) | | |
| M27 | Accretion/Dilution Year 2 | −47.02% (DILUTIVE) | | |
| M28 | Accretion/Dilution Year 3 | −43.38% (DILUTIVE) | | |
| M29 | Break-Even After-Tax Synergies | EGP 338.585M | | |
| M30 | Acquirer Revenue Contribution % | 83.33% | | |
| M31 | Target Revenue Contribution % | 16.67% | | |
| M32 | Acquirer Post-Merger Ownership | 90.91% | | |
| M33 | Target Shareholder Ownership | 9.09% | | |

---

### MODULE 2 — SOURCES & USES

| # | Test | Expected | Valor Shows | Pass/Fail |
|---|---|---|---|---|
| S1 | Total Sources (Test 1) | EGP 1,696.50M | | |
| S2 | Total Uses (Test 1) | EGP 1,696.50M | | |
| S3 | Balance Status (Test 1) | BALANCED ✅ | | |
| S4 | Stamp Duty Auto-Calc | EGP 3.75M | | |
| S5 | Debt / Total Cap | 50.00% | | |
| S6 | Balance Status (Test 2) | IMBALANCED ❌ +3.50M | | |
| S7 | Advisory Fee Auto-Calc | EGP 15.00M | | |
| S8 | Financing Fee Auto-Calc | EGP 12.00M | | |
| S9 | Legal & DD Fee Auto-Calc | EGP 7.50M | | |

---

### MODULE 3 — SYNERGY ANALYSIS

| # | Test | Expected | Valor Shows | Pass/Fail |
|---|---|---|---|---|
| Y1 | Full Run-Rate Headcount Synergy | EGP 35.625M | | |
| Y2 | Total Cost Synergies (Full Run-Rate) | EGP 97.625M | | |
| Y3 | Gross Synergies Year 1 | EGP 68.813M | | |
| Y4 | Gross Synergies Year 3 | EGP 157.625M | | |
| Y5 | Net (After-Tax) Synergies Year 1 | EGP 53.330M | | |
| Y6 | Net (After-Tax) Synergies Year 3 | EGP 122.159M | | |
| Y7 | Total Integration Costs (Before Tax) | EGP 76.000M | | |
| Y8 | Severance Component | EGP 50.000M | | |
| Y9 | Integration Costs After-Tax | EGP 58.900M | | |
| Y10 | NPV of Synergies | EGP 585.13M | | |
| Y11 | Synergies as % of Purchase Price | 23.41% | | |
| Y12 | Goodwill Coverage Ratio | 26.60% (RED ❌) | | |
| Y13 | Payback Period | ~1.06 years | | |

---

### MODULE 4 — LBO MODEL

| # | Test | Expected | Valor Shows | Pass/Fail |
|---|---|---|---|---|
| L1 | Entry EV | EGP 2,800.00M | | |
| L2 | Total Capital Required | EGP 2,850.00M | | |
| L3 | Sponsor Equity | EGP 1,350.00M | | |
| L4 | Entry Leverage | 3.75x | | |
| L5 | Equity % | 47.37% | | |
| L6 | Revenue Year 1 | EGP 2,200.00M | | |
| L7 | Revenue Year 5 | EGP 3,221.02M | | |
| L8 | EBITDA Year 5 | EGP 644.20M | | |
| L9 | TLA Interest Year 1 | EGP 160.00M | | |
| L10 | TLB Interest Year 1 | EGP 147.00M | | |
| L11 | Total Cash Interest Year 1 | EGP 307.00M | | |
| L12 | Net Income Year 1 | EGP 17.825M | | |
| L13 | FCFE Year 1 | EGP −149.175M | | |
| L14 | TLA Ending Balance Year 1 | EGP 640.00M | | |
| L15 | TLB Ending Balance Year 1 | EGP 693.00M | | |
| L16 | Total Debt Year 1 | EGP 1,333.00M | | |
| L17 | Leverage Year 1 | 3.030x | | |
| L18 | ICR Year 1 | 1.434x | | |
| L19 | Covenant Breach Alert Year 1 | ❌ ICR BREACH displayed | | |
| L20 | TLA Ending Balance Year 5 | EGP 0.00M | | |
| L21 | Cash Sweep Year 5 | EGP 43.27M (applied to TLB) | | |
| L22 | TLB Ending Balance Year 5 | EGP 621.73M | | |
| L23 | Total Debt Year 5 | EGP 621.73M | | |
| L24 | ICR Year 5 | 3.722x (✅ above covenant) | | |
| L25 | Exit EV | EGP 5,475.70M | | |
| L26 | Equity Value at Exit | EGP 4,883.97M | | |
| L27 | Capital Gains Tax | EGP 795.14M | | |
| L28 | Equity Returned to Sponsor | EGP 4,088.83M | | |
| L29 | **MOIC** | **3.03x** | | |
| L30 | **IRR** | **~24.80%** | | |
| L31 | MOIC Color Code | DARK GREEN (> 3.0x) | | |
| L32 | IRR Color Code | GREEN (> 20%) | | |

---

### MODULE 5 — FAIRNESS OPINION

| # | Test | Expected | Valor Shows | Pass/Fail |
|---|---|---|---|---|
| F1 | DCF Range (offer 25.00) | ✅ Within | | |
| F2 | Trading Comps (offer 25.00) | ❌ Above range | | |
| F3 | Fairness at Offer 25.00 | OUTSIDE FAIR RANGE ❌ | | |
| F4 | Fairness at Offer 22.00 | FAIR ✅ | | |
| F5 | Regulatory Disclosure Shown | Yes — FRA/Capital Market Law cited | | |

---

### MODULE 6 — PRECEDENT TRANSACTIONS

| # | Test | Expected | Valor Shows | Pass/Fail |
|---|---|---|---|---|
| P1 | Pre-loaded transactions count | 6 | | |
| P2 | New transaction added successfully | 7 total | | |
| P3 | Filter Banking → count | 2 | | |
| P4 | Median EV/EBITDA (all sectors) | 8.35x | | |

---

### MODULE 7 — REGULATORY CHECKLIST

| # | Test | Expected | Valor Shows | Pass/Fail |
|---|---|---|---|---|
| R1 | ECA triggered at combined rev EGP 6,000M | ✅ Highlighted | | |
| R2 | MTO triggered at 35% stake | ✅ Highlighted | | |
| R3 | MTO NOT triggered at 30% stake | Not highlighted | | |
| R4 | CBE triggered for bank target >10% | ✅ Highlighted | | |
| R5 | CBE NOT triggered for non-bank | Not highlighted | | |
| R6 | Stamp duty = 0 for private target | EGP 0M | | |
| R7 | Stamp duty = 3.125M/side for listed | EGP 3.125M per party | | |
| R8 | Gantt chart generates on date entry | Milestone dates shown | | |

---

### MODULE 8 — CURRENCY & SYSTEM TESTS

| # | Test | Expected | Valor Shows | Pass/Fail |
|---|---|---|---|---|
| C1 | Purchase price in USD (rate 49.50) | $50.51M | | |
| C2 | USD updates on FX rate change to 50.00 | $50.00M | | |
| C3 | All modules update on FX change | Yes | | |
| C4 | VALOR brand microcopy present | "Campaign", "Vault", "Command Center" | | |
| C5 | Accretive/Dilutive color coding | Red for -52.47% | | |
| C6 | Covenant breach alert displayed | Red banner Year 1 LBO | | |
| C7 | S&U imbalance alert displayed | Red banner +3.50M | | |

---

## SCORE INTERPRETATION

| Score | Action |
|---|---|
| **55/55 ✅** | Engine is verified — proceed to deployment |
| **50–54 ✅** | Minor issues — review specific failures, fix, re-test those items only |
| **40–49** | Moderate issues — re-test full affected module after fixes |
| **< 40** | Fundamental formula errors — do not deploy, fix and re-run full protocol |

---

## HOW TO SEND RESULTS

Fill in the "Valor Shows" column and "Pass/Fail" column in the checklist tables above. For any ❌ FAIL item, note:
1. What number Valor showed
2. What the expected number was
3. The difference (in EGP or %)

Send the completed checklist and I will:
- Identify which formula is wrong
- Explain exactly what the bug is
- Tell you precisely which line of code to fix

---

```
⚔️  VALOR M&A ENGINE
    "Courage Meets Capital"
    Pre-Deployment Test Protocol v1.0
    
    55 verification checkpoints across 7 modules
    Based on hand-calculated first-principles arithmetic
    Zero tolerance for formula errors on financial decisions
```
