// ═══════════════════════════════════════════════════════════════
// VALOR M&A ENGINE — Egypt-Specific Parameters
// All constants sourced from Egyptian law and regulatory framework
// ═══════════════════════════════════════════════════════════════

export const EGYPT_PARAMS = {

  // ── TAXATION ──────────────────────────────────────────────────
  CORPORATE_TAX_RATE: 0.225,
  // Source: Egyptian Income Tax Law No. 91 of 2005, Article 56

  CORPORATE_TAX_RATE_OIL_GAS: 0.40,
  // Source: Egyptian Income Tax Law No. 91 of 2005, Article 59

  CAPITAL_GAINS_TAX_LISTED: 0.10,
  // Source: Capital Market Law amendments — 10% on EGX-listed securities

  CAPITAL_GAINS_TAX_UNLISTED: 0.225,
  // Source: Egyptian Income Tax Law, Article 56

  STAMP_DUTY_RATE_PER_SIDE: 0.00125,
  // Source: Stamp Tax Law No. 111 of 1980
  // Rate: 1.25‰ (0.125%) per side — total effective cost = 0.25%

  DIVIDEND_WITHHOLDING_TAX_RESIDENT: 0.10,
  DIVIDEND_WITHHOLDING_TAX_NON_RESIDENT: 0.10,

  // ── CENTRAL BANK OF EGYPT (CBE) ──────────────────────────────
  CBE_OVERNIGHT_LENDING_RATE: 0.2825,  // 28.25% as of Q4 2024
  CBE_OVERNIGHT_DEPOSIT_RATE: 0.2725,  // 27.25% as of Q4 2024
  CBE_DISCOUNT_RATE: 0.2800,           // 28.00% as of Q4 2024

  // ── FX RATES ─────────────────────────────────────────────────
  USD_EGP_RATE: 49.50,
  SAR_EGP_RATE: 13.20,
  AED_EGP_RATE: 13.48,
  EUR_EGP_RATE: 54.20,
  GBP_EGP_RATE: 62.50,

  // ── REGULATORY THRESHOLDS ────────────────────────────────────
  MANDATORY_TENDER_OFFER_THRESHOLD: 0.33,
  // Source: Capital Market Law No. 95 of 1992, Article 4

  ECA_NOTIFICATION_THRESHOLD_REVENUE_EGP: 100_000_000,
  // Source: Egyptian Competition Law No. 3 of 2005

  ECA_MARKET_SHARE_THRESHOLD: 0.35,
  CBE_BANK_ACQUISITION_THRESHOLD: 0.10,
  CBE_BANK_CONTROL_THRESHOLD: 0.33,
  FRA_INSURANCE_THRESHOLD: 0.10,

  // ── LABOR LAW ────────────────────────────────────────────────
  SEVERANCE_MONTHS_PER_YEAR_OF_SERVICE: 2,
  // Source: Egyptian Labor Law No. 12 of 2003, Article 120

  SOCIAL_INSURANCE_EMPLOYER_RATE: 0.1875,
  SOCIAL_INSURANCE_EMPLOYEE_RATE: 0.1100,
  EMPLOYEE_PROFIT_SHARING_RATE: 0.10,

  // ── MARKET DATA ──────────────────────────────────────────────
  EGX_RISK_FREE_RATE: 0.2650,
  EGYPT_EQUITY_RISK_PREMIUM: 0.0850,
  EGYPT_COUNTRY_RISK_PREMIUM: 0.0350,

  // ── ACCOUNTING STANDARDS ─────────────────────────────────────
  GOODWILL_AMORTIZATION_YEARS: 10,
  // Source: Egyptian Accounting Standard (EAS) No. 19

  // ── TRANSACTION FEE BENCHMARKS ───────────────────────────────
  ADVISORY_FEE_RATE_SMALL: 0.0150,   // 1.5% for deals under EGP 500M
  ADVISORY_FEE_RATE_LARGE: 0.0100,   // 1.0% for deals EGP 500M+
  FINANCING_FEE_RATE: 0.0150,
  LEGAL_FEE_RATE: 0.0050,
  DUE_DILIGENCE_FEE_RATE: 0.0025,

  // ── DEBT COVENANT BENCHMARKS ─────────────────────────────────
  MAX_LEVERAGE_COVENANT_DEFAULT: 3.0,
  MIN_ICR_COVENANT_DEFAULT: 2.5,
};

// Pre-loaded Egypt/MENA Precedent Transactions
export const PRELOADED_TRANSACTIONS = [
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
    evRevenue: null,
    evEBITDA: null,
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
    evRevenue: null,
    evEBITDA: null,
    premiumPercent: null,
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
    consideration: "Cash",
    stakeAcquired: 45,
    status: "Completed",
    evRevenue: null,
    evEBITDA: 7.2,
    premiumPercent: null,
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
    status: "Completed",
    evRevenue: null,
    evEBITDA: null,
    premiumPercent: null,
    notes: null
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
    evRevenue: null,
    evEBITDA: null,
    premiumPercent: null,
    notes: "Part of broad Egyptian banking privatization program."
  }
];
