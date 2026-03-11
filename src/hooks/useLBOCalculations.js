import { useMemo } from 'react';
import { EGYPT_PARAMS } from '../constants/egyptParams';

/**
 * VALOR LBO Model — Full calculation engine
 * Section 7 of Master Guide
 *
 * Entry assumptions, capital structure, 5-year operating model,
 * debt schedule with cash sweep, exit with Egypt CGT,
 * returns (IRR, MOIC), returns attribution.
 */
export function useLBOCalculations(lbo) {
  return useMemo(() => {
    const l = lbo;
    const taxRate = EGYPT_PARAMS.CORPORATE_TAX_RATE;

    // ── STEP 1: ENTRY ASSUMPTIONS ──
    const impliedEntryEV = l.targetEBITDALTM * l.entryMultiple;
    const purchasePriceEquityLBO = impliedEntryEV - l.targetNetDebtAtClose;
    const totalCapitalRequired = purchasePriceEquityLBO
      + l.targetNetDebtAtClose
      + l.transactionFees;

    // Guard — need minimum inputs
    if (!l.targetEBITDALTM || !l.entryMultiple) {
      return null;
    }

    // ── STEP 2: CAPITAL STRUCTURE ──
    const principalA = l.targetEBITDALTM * l.tlaMultiple;
    const principalB = l.targetEBITDALTM * l.tlbMultiple;
    const principalC = l.targetEBITDALTM * l.seniorNotesMultiple;
    const principalMezz = l.targetEBITDALTM * l.mezzMultiple;

    const totalDebtAtEntry = principalA + principalB + principalC + principalMezz;
    const sponsorEquityLBO = Math.max(0, totalCapitalRequired - totalDebtAtEntry);
    const debtToEBITDAEntry = l.targetEBITDALTM > 0
      ? totalDebtAtEntry / l.targetEBITDALTM : 0;
    const equityPercent = totalCapitalRequired > 0
      ? (sponsorEquityLBO / totalCapitalRequired) * 100 : 0;

    // ── STEP 3: 5-YEAR OPERATING MODEL ──
    const years = 5;
    const revenue = new Array(years);
    const ebitda = new Array(years);
    const depreciation = new Array(years);
    const ebit = new Array(years);
    const cogs = new Array(years);
    const accountsReceivable = new Array(years);
    const inventory = new Array(years);
    const accountsPayable = new Array(years);
    const netWorkingCapital = new Array(years);
    const changeInNWC = new Array(years);
    const capex = new Array(years);

    // Year 0 baselines for NWC (use first year's operating params against LTM)
    const ops0 = l.operating[0];
    const cogs0 = l.targetRevenueLTM * (ops0.cogsPct / 100);
    const nwc0 = (l.targetRevenueLTM * ops0.dsoDays / 365)
      + (cogs0 * ops0.dioDays / 365)
      - (cogs0 * ops0.dpoDays / 365);

    for (let y = 0; y < years; y++) {
      const op = l.operating[y];
      const prevRev = y === 0 ? l.targetRevenueLTM : revenue[y - 1];
      revenue[y] = prevRev * (1 + op.revenueGrowth / 100);
      ebitda[y] = revenue[y] * (op.ebitdaMargin / 100);
      depreciation[y] = revenue[y] * (op.depreciationPct / 100);
      ebit[y] = ebitda[y] - depreciation[y];
      cogs[y] = revenue[y] * (op.cogsPct / 100);
      capex[y] = revenue[y] * (op.capexPct / 100);

      accountsReceivable[y] = revenue[y] * op.dsoDays / 365;
      inventory[y] = cogs[y] * op.dioDays / 365;
      accountsPayable[y] = cogs[y] * op.dpoDays / 365;
      netWorkingCapital[y] = accountsReceivable[y] + inventory[y] - accountsPayable[y];
      const prevNWC = y === 0 ? nwc0 : netWorkingCapital[y - 1];
      changeInNWC[y] = netWorkingCapital[y] - prevNWC;
    }

    // ── STEP 4: DEBT SCHEDULE ──
    // Initialize balances
    const balA = new Array(years + 1).fill(0);
    const balB = new Array(years + 1).fill(0);
    const balC = new Array(years + 1).fill(0);
    const balM = new Array(years + 1).fill(0);

    balA[0] = principalA;
    balB[0] = principalB;
    balC[0] = principalC;
    balM[0] = principalMezz;

    const interestA = new Array(years).fill(0);
    const interestB = new Array(years).fill(0);
    const interestC = new Array(years).fill(0);
    const interestMCash = new Array(years).fill(0);
    const interestMPIK = new Array(years).fill(0);
    const amortA = new Array(years).fill(0);
    const amortB = new Array(years).fill(0);
    const sweepA = new Array(years).fill(0);
    const sweepB = new Array(years).fill(0);
    const sweepC = new Array(years).fill(0);

    // We need interest totals for operating model (EBT), but interest depends on debt
    // which depends on FCFE which depends on NI which depends on interest.
    // Resolution: use beginning-of-year debt balance for interest (per spec).
    const totalInterest = new Array(years).fill(0);
    const totalMandatoryAmort = new Array(years).fill(0);
    const ebt = new Array(years);
    const taxes = new Array(years);
    const netIncome = new Array(years);
    const fcff = new Array(years);
    const fcfe = new Array(years);
    const totalDebt = new Array(years);

    for (let y = 0; y < years; y++) {
      // Interest on beginning balances
      interestA[y] = balA[y] * (l.tlaRate / 100);
      interestB[y] = balB[y] * (l.tlbRate / 100);
      interestC[y] = balC[y] * (l.seniorNotesRate / 100);

      if (l.mezzPIK) {
        interestMCash[y] = 0;
        interestMPIK[y] = balM[y] * (l.mezzRate / 100);
      } else {
        interestMCash[y] = balM[y] * (l.mezzRate / 100);
        interestMPIK[y] = 0;
      }

      // Total cash interest
      totalInterest[y] = interestA[y] + interestB[y] + interestC[y] + interestMCash[y];

      // Operating model — income statement
      ebt[y] = ebit[y] - totalInterest[y] - interestMPIK[y]; // PIK reduces taxable income
      taxes[y] = Math.max(ebt[y], 0) * taxRate;
      netIncome[y] = ebt[y] - taxes[y];

      // Mandatory amortization
      const yearNum = y + 1; // 1-indexed year

      // TLA — amortizing, bullet at maturity
      if (yearNum >= l.tlaMaturity) {
        amortA[y] = balA[y]; // pay off remaining
      } else {
        amortA[y] = Math.min(principalA * (l.tlaAmortPct / 100), balA[y]);
      }

      // TLB — minimal amort, bullet at maturity
      if (yearNum >= l.tlbMaturity) {
        amortB[y] = balB[y];
      } else {
        amortB[y] = Math.min(principalB * (l.tlbAmortPct / 100), balB[y]);
      }

      totalMandatoryAmort[y] = amortA[y] + amortB[y];

      // FCFF & FCFE (before cash sweep)
      fcff[y] = ebitda[y]
        - (Math.max(ebit[y], 0) * taxRate)
        - capex[y]
        - changeInNWC[y];

      fcfe[y] = netIncome[y]
        + depreciation[y]
        - capex[y]
        - changeInNWC[y]
        - totalMandatoryAmort[y];

      // Cash sweep
      const excessCash = Math.max(fcfe[y] - l.minimumCashRetention, 0);
      let cashSweepTotal = excessCash * (l.sweepPercent / 100);

      // Priority: TLA first, then TLB, then Senior Notes
      const remA = Math.max(0, balA[y] - amortA[y]);
      sweepA[y] = Math.min(cashSweepTotal, remA);
      cashSweepTotal -= sweepA[y];

      const remB = Math.max(0, balB[y] - amortB[y]);
      sweepB[y] = Math.min(cashSweepTotal, remB);
      cashSweepTotal -= sweepB[y];

      const remC = balC[y]; // Senior notes — no mandatory amort
      sweepC[y] = Math.min(cashSweepTotal, remC);

      // Ending balances
      balA[y + 1] = Math.max(0, balA[y] - amortA[y] - sweepA[y]);
      balB[y + 1] = Math.max(0, balB[y] - amortB[y] - sweepB[y]);

      // Senior Notes — bullet at maturity, no amort
      if (yearNum >= l.seniorNotesMaturity) {
        balC[y + 1] = 0;
      } else {
        balC[y + 1] = Math.max(0, balC[y] - sweepC[y]);
      }

      // Mezzanine — PIK compounds, or cash-pay with no amort
      if (l.mezzPIK) {
        balM[y + 1] = yearNum >= l.mezzMaturity ? 0 : balM[y] + interestMPIK[y];
      } else {
        balM[y + 1] = yearNum >= l.mezzMaturity ? 0 : balM[y];
      }

      totalDebt[y] = balA[y + 1] + balB[y + 1] + balC[y + 1] + balM[y + 1];
    }

    // Leverage & coverage per year
    const debtToEBITDA = new Array(years);
    const interestCoverageRatio = new Array(years);
    const covenantBreaches = [];

    for (let y = 0; y < years; y++) {
      debtToEBITDA[y] = ebitda[y] > 0 ? totalDebt[y] / ebitda[y] : null;
      interestCoverageRatio[y] = totalInterest[y] > 0
        ? ebitda[y] / totalInterest[y] : null;

      if (debtToEBITDA[y] !== null && debtToEBITDA[y] > l.maxLeverageCovenant) {
        covenantBreaches.push({
          year: y + 1,
          type: 'leverage',
          value: debtToEBITDA[y],
          limit: l.maxLeverageCovenant,
        });
      }
      if (interestCoverageRatio[y] !== null && interestCoverageRatio[y] < l.minICRCovenant) {
        covenantBreaches.push({
          year: y + 1,
          type: 'icr',
          value: interestCoverageRatio[y],
          limit: l.minICRCovenant,
        });
      }
    }

    // ── STEP 5: EXIT ──
    const exitYearIdx = Math.min(l.exitYear, years) - 1;
    const exitEBITDA = ebitda[exitYearIdx] || 0;
    const exitEV = exitEBITDA * l.exitMultiple;
    const cashAtExit = l.minimumCashRetention;
    const netDebtAtExit = (totalDebt[exitYearIdx] || 0) - cashAtExit;
    const equityValueAtExit = exitEV - netDebtAtExit;

    // Capital gains tax per exit route
    let capitalGainsTaxOnExit = 0;
    const gainOnSale = equityValueAtExit - sponsorEquityLBO;
    if (l.exitRoute === 'IPO on EGX') {
      capitalGainsTaxOnExit = 0;
    } else {
      // Strategic Sale or Secondary Buyout
      capitalGainsTaxOnExit = Math.max(gainOnSale, 0)
        * EGYPT_PARAMS.CAPITAL_GAINS_TAX_UNLISTED;
    }
    const equityReturnedToSponsor = equityValueAtExit - capitalGainsTaxOnExit;

    // ── STEP 6: RETURNS ──
    const moic = sponsorEquityLBO > 0
      ? equityReturnedToSponsor / sponsorEquityLBO : 0;

    // IRR — Newton-Raphson
    const sponsorCashFlows = new Array(l.exitYear + 1).fill(0);
    sponsorCashFlows[0] = -sponsorEquityLBO;
    sponsorCashFlows[l.exitYear] = equityReturnedToSponsor;

    const irr = calculateIRR(sponsorCashFlows);

    // Returns Attribution
    const exitEquityIfSameMultiple =
      (exitEBITDA * l.entryMultiple) - netDebtAtExit;
    const ebitdaGrowthContrib = exitEquityIfSameMultiple - sponsorEquityLBO;

    const exitEquityActualMultiple =
      (exitEBITDA * l.exitMultiple) - netDebtAtExit;
    const multipleExpansionContrib = exitEquityActualMultiple - exitEquityIfSameMultiple;

    const debtPaydownContrib = totalDebtAtEntry - (totalDebt[exitYearIdx] || 0);

    return {
      // Entry
      impliedEntryEV,
      purchasePriceEquityLBO,
      totalCapitalRequired,
      // Capital structure
      principalA, principalB, principalC, principalMezz,
      totalDebtAtEntry,
      sponsorEquityLBO,
      debtToEBITDAEntry,
      equityPercent,
      // Operating model
      revenue, ebitda, depreciation, ebit,
      cogs, capex, changeInNWC, netWorkingCapital,
      ebt, taxes, netIncome, fcff, fcfe,
      // Debt schedule
      balA, balB, balC, balM,
      interestA, interestB, interestC, interestMCash, interestMPIK,
      amortA, amortB, sweepA, sweepB, sweepC,
      totalInterest, totalMandatoryAmort, totalDebt,
      // Covenants
      debtToEBITDA, interestCoverageRatio, covenantBreaches,
      // Exit
      exitEBITDA, exitEV, netDebtAtExit, equityValueAtExit,
      capitalGainsTaxOnExit, equityReturnedToSponsor, gainOnSale,
      // Returns
      moic, irr,
      ebitdaGrowthContrib, multipleExpansionContrib, debtPaydownContrib,
    };
  }, [lbo]);
}

/**
 * IRR via Newton-Raphson iteration
 * Returns decimal IRR (e.g., 0.285 = 28.5%) or null if no convergence
 */
function calculateIRR(cashFlows) {
  let r = 0.20;
  const TOLERANCE = 0.000001;
  const MAX_ITER = 1000;

  for (let i = 0; i < MAX_ITER; i++) {
    let npv = 0;
    let dnpv = 0;

    for (let t = 0; t < cashFlows.length; t++) {
      const denom = Math.pow(1 + r, t);
      npv += cashFlows[t] / denom;
      dnpv -= t * cashFlows[t] / Math.pow(1 + r, t + 1);
    }

    if (Math.abs(dnpv) < 1e-12) break; // avoid division by zero
    const rNew = r - npv / dnpv;

    if (Math.abs(rNew - r) < TOLERANCE) {
      return rNew;
    }
    r = rNew;

    // Safety: if r goes wildly out of range, bail
    if (r < -0.99 || r > 100) return null;
  }
  return null;
}

/**
 * LBO Scenario Matrices
 * 3 separate 7×7 grids for sensitivity analysis
 */
export function useLBOScenarioMatrices(lbo, calc) {
  return useMemo(() => {
    if (!calc || !lbo.targetEBITDALTM || !lbo.entryMultiple) return null;

    const taxRate = EGYPT_PARAMS.CORPORATE_TAX_RATE;

    // Helper: Given entry multiple, exit multiple, and exit year, calculate IRR/MOIC quickly
    // Uses simplified approach: entry equity → exit equity based on EBITDA growth from operating model
    function quickReturns(entryMult, exitMult, exitYr, overrideEBITDA) {
      const ebitdaAtExit = overrideEBITDA !== undefined
        ? overrideEBITDA
        : (calc.ebitda[Math.min(exitYr, 5) - 1] || calc.ebitda[calc.ebitda.length - 1]);
      const entryEV = lbo.targetEBITDALTM * entryMult;
      const entryEquity = Math.max(1, entryEV - lbo.targetNetDebtAtClose -
        (calc.totalDebtAtEntry - (entryEV - lbo.targetNetDebtAtClose - lbo.transactionFees > 0
          ? entryEV - lbo.targetNetDebtAtClose - lbo.transactionFees : calc.sponsorEquityLBO)));

      // Use actual sponsor equity calc logic
      const totalCap = entryEV - lbo.targetNetDebtAtClose + lbo.targetNetDebtAtClose + lbo.transactionFees;
      const sponsorEq = Math.max(0, totalCap - calc.totalDebtAtEntry);

      const exitEV = ebitdaAtExit * exitMult;
      const exitYrIdx = Math.min(exitYr, 5) - 1;
      const debtAtExit = calc.totalDebt[exitYrIdx] || 0;
      const eqAtExit = exitEV - debtAtExit + lbo.minimumCashRetention;
      const gain = eqAtExit - sponsorEq;
      let cgt = 0;
      if (lbo.exitRoute !== 'IPO on EGX') {
        cgt = Math.max(gain, 0) * EGYPT_PARAMS.CAPITAL_GAINS_TAX_UNLISTED;
      }
      const eqReturn = eqAtExit - cgt;
      const moic = sponsorEq > 0 ? eqReturn / sponsorEq : 0;

      const cf = new Array(exitYr + 1).fill(0);
      cf[0] = -sponsorEq;
      cf[exitYr] = eqReturn;
      const irr = calculateIRR(cf);

      return { irr, moic };
    }

    // TABLE 1: IRR — Entry Multiple vs Exit Multiple
    const entryMults = [5, 6, 7, 8, 9, 10, 11];
    const exitMults = [5, 6, 7, 8, 9, 10, 11];
    const matrix1 = entryMults.map((em) =>
      exitMults.map((xm) => quickReturns(em, xm, lbo.exitYear).irr)
    );

    // TABLE 2: IRR — Revenue CAGR vs EBITDA Margin Year 5
    const cagrs = [0, 5, 10, 15, 20, 25, 30];
    const margins = [10, 15, 20, 25, 30, 35, 40];
    const matrix2 = cagrs.map((cagr) =>
      margins.map((margin) => {
        // Calculate exit EBITDA from CAGR + margin
        const exitRev = lbo.targetRevenueLTM * Math.pow(1 + cagr / 100, lbo.exitYear);
        const exitEB = exitRev * (margin / 100);
        return quickReturns(lbo.entryMultiple, lbo.exitMultiple, lbo.exitYear, exitEB).irr;
      })
    );

    // TABLE 3: MOIC — Entry Multiple vs Exit Year
    const exitYears = [3, 4, 5, 6, 7];
    const matrix3 = entryMults.map((em) =>
      exitYears.map((yr) => quickReturns(em, lbo.exitMultiple, yr).moic)
    );

    return {
      // Table 1
      entryMults, exitMults, matrix1,
      // Table 2
      cagrs, margins, matrix2,
      // Table 3
      exitYears, matrix3,
    };
  }, [lbo, calc]);
}
