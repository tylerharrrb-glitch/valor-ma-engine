import { useMemo } from 'react';
import { EGYPT_PARAMS } from '../constants/egyptParams';

/**
 * VALOR Merger Model — All 14 calculation steps
 * Accretion/Dilution analysis engine
 * 
 * Every formula is derived from first principles of corporate finance.
 * No approximations. Full precision in intermediate calculations.
 */
export function useMergerCalculations(acquirer, target, dealTerms) {
  return useMemo(() => {
    const a = acquirer;
    const t = target;
    const d = dealTerms;

    // Guard - need minimum inputs
    if (!t.sharesOutstanding || !d.offerPricePerShare || !a.sharesOutstanding) {
      return null;
    }

    // ── STEP 1: PURCHASE PRICE & DEAL METRICS ──
    const purchasePriceEquity = d.offerPricePerShare * t.sharesOutstanding;
    const premiumPaid = t.sharePrice > 0
      ? (d.offerPricePerShare / t.sharePrice - 1) * 100
      : 0;
    const targetEnterpriseValue = purchasePriceEquity + t.existingDebt - t.cash;
    const impliedEVtoEBITDA = t.ebitda > 0 ? targetEnterpriseValue / t.ebitda : null;
    const impliedEVtoRevenue = t.revenue > 0 ? targetEnterpriseValue / t.revenue : null;
    const targetEPS = t.sharesOutstanding > 0 ? t.netIncome / t.sharesOutstanding : 0;
    const impliedPE = targetEPS > 0 ? d.offerPricePerShare / targetEPS : null;

    // ── STEP 2: CONSIDERATION BREAKDOWN ──
    const cashComponent = purchasePriceEquity * (d.cashPercent / 100);
    const stockComponent = purchasePriceEquity * (d.stockPercent / 100);

    // ── STEP 3: NEW ACQUIRER SHARES ISSUED ──
    const newSharesIssued = a.sharePrice > 0 ? stockComponent / a.sharePrice : 0;
    const exchangeRatio = t.sharesOutstanding > 0
      ? newSharesIssued / t.sharesOutstanding
      : 0;

    // ── STEP 4: ACQUISITION FINANCING ──
    const debtForCashComponent = cashComponent * (d.newDebtForCashPercent / 100);
    const cashDrawnFromBalance = cashComponent - debtForCashComponent;
    const cashShortfall = cashDrawnFromBalance > a.cash;

    // ── STEP 5: PRO-FORMA SHARES OUTSTANDING ──
    const proFormaSharesOutstanding = a.sharesOutstanding + newSharesIssued;

    // ── STEP 6: GOODWILL CREATED ──
    const goodwillCreated = purchasePriceEquity - t.bookValueOfEquity;
    const isBargainPurchase = goodwillCreated < 0;
    const annualGoodwillAmortization = goodwillCreated / EGYPT_PARAMS.GOODWILL_AMORTIZATION_YEARS;

    // ── STEP 7: INCREMENTAL INTEREST EXPENSE ──
    const interestOnNewDebt = debtForCashComponent * (d.newDebtInterestRate / 100);
    const lostInterestOnCashUsed = cashDrawnFromBalance *
      (EGYPT_PARAMS.CBE_OVERNIGHT_DEPOSIT_RATE * 0.80);
    const totalIncrementalInterestPreTax = interestOnNewDebt + lostInterestOnCashUsed;
    const totalIncrementalInterestAfterTax = totalIncrementalInterestPreTax *
      (1 - d.dealTaxRate);

    // ── STEP 8: AFTER-TAX SYNERGIES ──
    const isPreTax = d.synergiesInputConvention === 'Pre-Tax';
    const afterTaxSynergies = [1, 2, 3].map((year) => {
      const raw = d[`synergiesYear${year}`] || 0;
      return isPreTax ? raw * (1 - d.dealTaxRate) : raw;
    });

    // ── STEP 9: GOODWILL AMORTIZATION AFTER-TAX ──
    const goodwillAmortizationAfterTax = annualGoodwillAmortization * (1 - d.dealTaxRate);

    // ── STEP 10: PRO-FORMA NET INCOME (Years 1-3) ──
    const proFormaNI = afterTaxSynergies.map((synergy) =>
      a.netIncome + t.netIncome + synergy - goodwillAmortizationAfterTax - totalIncrementalInterestAfterTax
    );

    // ── STEP 11: PRO-FORMA EPS ──
    const acquirerStandaloneEPS = a.sharesOutstanding > 0
      ? a.netIncome / a.sharesOutstanding
      : 0;
    const proFormaEPS = proFormaNI.map((ni) =>
      proFormaSharesOutstanding > 0 ? ni / proFormaSharesOutstanding : 0
    );

    // ── STEP 12: ACCRETION / DILUTION ──
    const accretionDilution = proFormaEPS.map((eps) =>
      acquirerStandaloneEPS !== 0
        ? ((eps - acquirerStandaloneEPS) / acquirerStandaloneEPS) * 100
        : 0
    );

    // ── STEP 13: BREAK-EVEN SYNERGIES ──
    const baseProFormaNI_ZeroSynergies =
      a.netIncome + t.netIncome - goodwillAmortizationAfterTax - totalIncrementalInterestAfterTax;
    const requiredNI = acquirerStandaloneEPS * proFormaSharesOutstanding;
    const breakEvenAfterTaxSynergies = requiredNI - baseProFormaNI_ZeroSynergies;

    // ── STEP 14: CONTRIBUTION ANALYSIS ──
    const combinedRevenue = a.revenue + t.revenue;
    const combinedEBITDA = a.ebitda + t.ebitda;
    const combinedNI = a.netIncome + t.netIncome;

    const contribution = {
      acquirerRevenue: combinedRevenue > 0 ? (a.revenue / combinedRevenue) * 100 : 0,
      targetRevenue: combinedRevenue > 0 ? (t.revenue / combinedRevenue) * 100 : 0,
      acquirerEBITDA: combinedEBITDA > 0 ? (a.ebitda / combinedEBITDA) * 100 : 0,
      targetEBITDA: combinedEBITDA > 0 ? (t.ebitda / combinedEBITDA) * 100 : 0,
      acquirerNI: combinedNI > 0 ? (a.netIncome / combinedNI) * 100 : 0,
      targetNI: combinedNI > 0 ? (t.netIncome / combinedNI) * 100 : 0,
      acquirerOwnership: proFormaSharesOutstanding > 0
        ? (a.sharesOutstanding / proFormaSharesOutstanding) * 100 : 0,
      targetOwnership: proFormaSharesOutstanding > 0
        ? (newSharesIssued / proFormaSharesOutstanding) * 100 : 0,
    };

    return {
      // Step 1
      purchasePriceEquity,
      premiumPaid,
      targetEnterpriseValue,
      impliedEVtoEBITDA,
      impliedEVtoRevenue,
      impliedPE,
      // Step 2
      cashComponent,
      stockComponent,
      // Step 3
      newSharesIssued,
      exchangeRatio,
      // Step 4
      debtForCashComponent,
      cashDrawnFromBalance,
      cashShortfall,
      // Step 5
      proFormaSharesOutstanding,
      // Step 6
      goodwillCreated,
      isBargainPurchase,
      annualGoodwillAmortization,
      // Step 7
      interestOnNewDebt,
      lostInterestOnCashUsed,
      totalIncrementalInterestPreTax,
      totalIncrementalInterestAfterTax,
      // Step 8
      afterTaxSynergies,
      // Step 9
      goodwillAmortizationAfterTax,
      // Step 10
      proFormaNI,
      // Step 11
      acquirerStandaloneEPS,
      proFormaEPS,
      // Step 12
      accretionDilution,
      // Step 13
      breakEvenAfterTaxSynergies,
      // Step 14
      contribution,
    };
  }, [acquirer, target, dealTerms]);
}

/**
 * Scenario Matrix Calculator
 * Recalculates accretion/dilution for a grid of premium × synergy combinations
 */
export function useScenarioMatrix(acquirer, target, dealTerms) {
  return useMemo(() => {
    const premiums = [0, 10, 20, 30, 40, 50, 60];
    const synergies = [0, 50, 100, 150, 200, 300, 500];

    if (!target.sharesOutstanding || !target.sharePrice || !acquirer.sharesOutstanding) {
      return null;
    }

    const matrix = premiums.map((premiumPct) => {
      const offerPrice = target.sharePrice * (1 + premiumPct / 100);
      return synergies.map((synAT) => {
        const pp = offerPrice * target.sharesOutstanding;
        const cashComp = pp * (dealTerms.cashPercent / 100);
        const stockComp = pp * (dealTerms.stockPercent / 100);
        const newShares = acquirer.sharePrice > 0 ? stockComp / acquirer.sharePrice : 0;
        const pfShares = acquirer.sharesOutstanding + newShares;

        const debtForCash = cashComp * (dealTerms.newDebtForCashPercent / 100);
        const cashFromBal = cashComp - debtForCash;

        const gw = pp - target.bookValueOfEquity;
        const gwAmortAT = (gw / EGYPT_PARAMS.GOODWILL_AMORTIZATION_YEARS) * (1 - dealTerms.dealTaxRate);

        const intDebt = debtForCash * (dealTerms.newDebtInterestRate / 100);
        const lostInt = cashFromBal * (EGYPT_PARAMS.CBE_OVERNIGHT_DEPOSIT_RATE * 0.80);
        const totalIntAT = (intDebt + lostInt) * (1 - dealTerms.dealTaxRate);

        const pfNI = acquirer.netIncome + target.netIncome + synAT - gwAmortAT - totalIntAT;
        const standaloneEPS = acquirer.netIncome / acquirer.sharesOutstanding;
        const pfEPS = pfShares > 0 ? pfNI / pfShares : 0;
        const ad = standaloneEPS !== 0 ? ((pfEPS - standaloneEPS) / standaloneEPS) * 100 : 0;

        return ad;
      });
    });

    return { premiums, synergies, matrix };
  }, [acquirer, target, dealTerms]);
}
