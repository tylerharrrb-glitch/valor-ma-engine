import { useMemo } from 'react';
import { EGYPT_PARAMS } from '../constants/egyptParams';

/**
 * VALOR Synergy Analysis — Full calculation engine
 * Section 6 of Master Guide
 *
 * Revenue synergies, cost synergies with phase-in, integration costs,
 * net synergies, NPV with terminal value, payback period, goodwill coverage.
 */
export function useSynergyCalculations(synergies, goodwillCreated, purchasePriceEquity) {
  return useMemo(() => {
    const s = synergies;
    const taxRate = EGYPT_PARAMS.CORPORATE_TAX_RATE;

    // ── REVENUE SYNERGIES (5 categories × 5 years) ──
    const grossRevenueSynergies = [0, 1, 2, 3, 4].map((yi) =>
      (s.crossSelling[yi] || 0)
      + (s.geoExpansion[yi] || 0)
      + (s.pricingPower[yi] || 0)
      + (s.newProducts[yi] || 0)
      + (s.customerBase[yi] || 0)
    );

    // ── COST SYNERGIES (run-rate before phase-in) ──
    const annualSalarySavings = s.redundantPositions * s.avgAnnualSalary;
    const annualSocialInsuranceSavings = annualSalarySavings * EGYPT_PARAMS.SOCIAL_INSURANCE_EMPLOYER_RATE;
    const grossHeadcountSynergy = annualSalarySavings + annualSocialInsuranceSavings;

    const facilityConsolidationSynergy = s.duplicateFacilities * s.avgRentPerFacility;

    const procurementSynergy = s.combinedProcurementSpend * (s.procurementDiscountPct / 100);

    const itSynergy = s.itSavings;

    const sgaSynergy = s.combinedSGA * (s.sgaOverlapPct / 100);

    const totalRunRateCostSynergy = grossHeadcountSynergy
      + facilityConsolidationSynergy
      + procurementSynergy
      + itSynergy
      + sgaSynergy;

    // ── PHASE-IN APPLIED TO COST SYNERGIES ──
    const grossCostSynergies = [0, 1, 2, 3, 4].map((yi) =>
      totalRunRateCostSynergy * (s.phaseIn[yi] / 100)
    );

    // ── TOTAL GROSS SYNERGIES ──
    const grossSynergies = [0, 1, 2, 3, 4].map((yi) =>
      grossRevenueSynergies[yi] + grossCostSynergies[yi]
    );

    // ── TAX ON SYNERGIES ──
    const taxOnSynergies = grossSynergies.map((g) => g * taxRate);

    // ── NET SYNERGIES ──
    const netSynergies = grossSynergies.map((g) => g * (1 - taxRate));

    // ── INTEGRATION COSTS (ONE-TIME — YEAR 0) ──
    const severanceCosts = s.redundantPositions
      * s.avgAnnualSalary
      * (EGYPT_PARAMS.SEVERANCE_MONTHS_PER_YEAR_OF_SERVICE / 12)
      * (s.avgYearsOfService || 0);

    const totalOneTimeIntegrationCosts = severanceCosts
      + (s.facilityClosureCosts || 0)
      + (s.itIntegrationCosts || 0)
      + (s.rebrandingCosts || 0)
      + (s.otherIntegrationCosts || 0);

    const integrationCostsAfterTax = totalOneTimeIntegrationCosts * (1 - taxRate);

    // ── NPV OF SYNERGIES ──
    const wacc = s.wacc || 0.20;

    let npvSynergies = -integrationCostsAfterTax;
    for (let y = 1; y <= 5; y++) {
      npvSynergies += netSynergies[y - 1] / Math.pow(1 + wacc, y);
    }
    // Terminal value — perpetuity of Year 5 net synergies
    const terminalValue = wacc > 0
      ? (netSynergies[4] / wacc) / Math.pow(1 + wacc, 5)
      : 0;
    npvSynergies += terminalValue;

    // ── SYNERGIES AS % OF PURCHASE PRICE ──
    const synergiesAsPercentOfPP = purchasePriceEquity > 0
      ? (npvSynergies / purchasePriceEquity) * 100
      : 0;

    // ── PAYBACK PERIOD (fractional) ──
    let paybackPeriod = null;
    let cumulative = 0;
    for (let y = 1; y <= 5; y++) {
      const prevCum = cumulative;
      cumulative += netSynergies[y - 1];
      if (cumulative >= integrationCostsAfterTax && integrationCostsAfterTax > 0) {
        // Fractional year: how much of this year's synergy was needed to recover remaining cost
        const remaining = integrationCostsAfterTax - prevCum;
        const fraction = netSynergies[y - 1] > 0 ? remaining / netSynergies[y - 1] : 0;
        paybackPeriod = (y - 1) + fraction;
        break;
      }
    }
    // If integration costs are 0 or negative, payback is immediate
    if (integrationCostsAfterTax <= 0 && totalOneTimeIntegrationCosts <= 0) {
      paybackPeriod = 0;
    }

    // ── GOODWILL COVERAGE RATIO ──
    const goodwillCoverageRatio = goodwillCreated > 0
      ? (npvSynergies / goodwillCreated) * 100
      : null;

    // Adequacy indicator: >100% ✅, 50-100% ⚠️, <50% ❌
    let synergyAdequacy = 'none';
    if (goodwillCoverageRatio !== null) {
      if (goodwillCoverageRatio >= 100) synergyAdequacy = 'strong';
      else if (goodwillCoverageRatio >= 50) synergyAdequacy = 'moderate';
      else synergyAdequacy = 'weak';
    }

    // ── CUMULATIVE NET SYNERGIES (for chart/display) ──
    const cumulativeNetSynergies = [];
    let runningCum = 0;
    for (let y = 0; y < 5; y++) {
      runningCum += netSynergies[y];
      cumulativeNetSynergies.push(runningCum);
    }

    return {
      // Revenue
      grossRevenueSynergies,
      // Cost breakdown
      grossHeadcountSynergy,
      annualSalarySavings,
      annualSocialInsuranceSavings,
      facilityConsolidationSynergy,
      procurementSynergy,
      itSynergy,
      sgaSynergy,
      totalRunRateCostSynergy,
      // Cost with phase-in
      grossCostSynergies,
      // Combined
      grossSynergies,
      taxOnSynergies,
      netSynergies,
      // Integration
      severanceCosts,
      totalOneTimeIntegrationCosts,
      integrationCostsAfterTax,
      // NPV
      npvSynergies,
      terminalValue,
      synergiesAsPercentOfPP,
      // Payback
      paybackPeriod,
      // Goodwill
      goodwillCoverageRatio,
      synergyAdequacy,
      // Cumulative
      cumulativeNetSynergies,
    };
  }, [synergies, goodwillCreated, purchasePriceEquity]);
}
