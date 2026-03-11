import { createContext, useReducer, useContext, useCallback } from 'react';
import { EGYPT_PARAMS, PRELOADED_TRANSACTIONS } from '../constants/egyptParams';

const initialState = {
  campaignName: "New Campaign",
  acquirerName: "",
  targetName: "",
  status: "Active",
  currency: "EGP",
  fxRateUSDEGP: EGYPT_PARAMS.USD_EGP_RATE,
  activeModule: "command-center",

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
    synergiesInputConvention: "Pre-Tax",
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
    crossSelling: [0, 0, 0, 0, 0],
    geoExpansion: [0, 0, 0, 0, 0],
    pricingPower: [0, 0, 0, 0, 0],
    newProducts: [0, 0, 0, 0, 0],
    customerBase: [0, 0, 0, 0, 0],
    redundantPositions: 0,
    avgAnnualSalary: 0,
    duplicateFacilities: 0,
    avgRentPerFacility: 0,
    combinedProcurementSpend: 0,
    procurementDiscountPct: 0,
    itSavings: 0,
    combinedSGA: 0,
    sgaOverlapPct: 0,
    phaseIn: [50, 75, 100, 100, 100],
    avgYearsOfService: 0,
    facilityClosureCosts: 0,
    itIntegrationCosts: 0,
    rebrandingCosts: 0,
    otherIntegrationCosts: 0,
    wacc: 0.20,
  },

  lbo: {
    targetRevenueLTM: 0,
    targetEBITDALTM: 0,
    entryMultiple: 0,
    targetNetDebtAtClose: 0,
    transactionFees: 0,
    tlaMultiple: 0, tlaRate: 0, tlaAmortPct: 0, tlaMaturity: 5,
    tlbMultiple: 0, tlbRate: 0, tlbAmortPct: 1, tlbMaturity: 7,
    seniorNotesMultiple: 0, seniorNotesRate: 0, seniorNotesMaturity: 8,
    mezzMultiple: 0, mezzRate: 0, mezzPIK: false, mezzMaturity: 9,
    operating: Array.from({ length: 5 }, () => ({
      revenueGrowth: 0, ebitdaMargin: 0, depreciationPct: 0,
      capexPct: 0, dsoDays: 0, dioDays: 0, dpoDays: 0, cogsPct: 0
    })),
    minimumCashRetention: 0,
    sweepPercent: 100,
    exitYear: 5,
    exitMultiple: 0,
    exitRoute: "Strategic Sale",
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

function dealReducer(state, action) {
  switch (action.type) {
    case 'SET_CAMPAIGN_NAME':
      return { ...state, campaignName: action.payload };
    case 'SET_ACQUIRER_NAME':
      return { ...state, acquirerName: action.payload };
    case 'SET_TARGET_NAME':
      return { ...state, targetName: action.payload };
    case 'SET_ACTIVE_MODULE':
      return { ...state, activeModule: action.payload };
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };
    case 'SET_FX_RATE':
      return { ...state, fxRateUSDEGP: action.payload };
    case 'UPDATE_ACQUIRER':
      return { ...state, acquirer: { ...state.acquirer, ...action.payload } };
    case 'UPDATE_TARGET':
      return { ...state, target: { ...state.target, ...action.payload } };
    case 'UPDATE_DEAL_TERMS':
      return { ...state, dealTerms: { ...state.dealTerms, ...action.payload } };
    case 'UPDATE_SOURCES_USES':
      return { ...state, sourcesUses: { ...state.sourcesUses, ...action.payload } };
    case 'UPDATE_SYNERGIES':
      return { ...state, synergies: { ...state.synergies, ...action.payload } };
    case 'UPDATE_LBO':
      return { ...state, lbo: { ...state.lbo, ...action.payload } };
    case 'UPDATE_FAIRNESS':
      return { ...state, fairness: { ...state.fairness, ...action.payload } };
    case 'UPDATE_PRECEDENT_TRANSACTIONS':
      return { ...state, precedentTransactions: action.payload };
    case 'UPDATE_REGULATORY':
      return { ...state, regulatoryChecklist: { ...state.regulatoryChecklist, ...action.payload } };
    case 'LOAD_TEST_DEAL':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const DealContext = createContext(null);

export function DealProvider({ children }) {
  const [state, dispatch] = useReducer(dealReducer, initialState);

  const convertCurrency = useCallback((amountEGP) => {
    if (state.currency === 'USD') {
      return amountEGP / state.fxRateUSDEGP;
    }
    return amountEGP;
  }, [state.currency, state.fxRateUSDEGP]);

  const formatNumber = useCallback((value, decimals = 1) => {
    if (value === null || value === undefined || isNaN(value)) return '—';
    return value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, []);

  const formatCurrency = useCallback((amountEGP, decimals = 1) => {
    const converted = convertCurrency(amountEGP);
    const prefix = state.currency === 'USD' ? 'USD' : 'EGP';
    return `${prefix} ${formatNumber(converted, decimals)}M`;
  }, [convertCurrency, formatNumber, state.currency]);

  return (
    <DealContext.Provider value={{ state, dispatch, convertCurrency, formatNumber, formatCurrency }}>
      {children}
    </DealContext.Provider>
  );
}

export function useDeal() {
  const context = useContext(DealContext);
  if (!context) {
    throw new Error('useDeal must be used within a DealProvider');
  }
  return context;
}

export default DealContext;
