import { useMemo, useCallback } from 'react';
import { useDeal } from '../../context/DealContext';
import { EGYPT_PARAMS } from '../../constants/egyptParams';
import InputField from '../shared/InputField';
import SectionHeader from '../shared/SectionHeader';
import StatusBadge from '../shared/StatusBadge';
import { Calculator } from 'lucide-react';

export default function SourcesUses() {
  const { state, dispatch, formatNumber, formatCurrency } = useDeal();
  const su = state.sourcesUses;

  const update = useCallback((field, value) => {
    dispatch({ type: 'UPDATE_SOURCES_USES', payload: { [field]: value } });
  }, [dispatch]);

  // Auto-link equity purchase price from merger model
  const equityPurchasePrice = useMemo(() => {
    const t = state.target;
    const d = state.dealTerms;
    return d.offerPricePerShare * t.sharesOutstanding;
  }, [state.target, state.dealTerms]);

  const calcs = useMemo(() => {
    // Sources
    const totalSources = su.revolverDraw + su.termLoanA + su.termLoanB +
      su.seniorNotes + su.subordinatedNotes + su.mezzanineFinancing +
      su.sellerFinancing + su.sponsorEquity + su.rolloverEquity + su.cashOnHand;

    // Uses
    const totalUses = equityPurchasePrice + su.refinanceTargetDebt + su.refinanceAcquirerDebt +
      su.advisoryFees + su.financingFees + su.legalDueDiligenceFees +
      su.fraFilingFee + su.ecaFilingFee + su.stampDuty + su.cashToBalanceSheet;

    const balance = totalSources - totalUses;
    const isBalanced = Math.abs(balance) < 0.01;

    // Leverage metrics
    const totalDebtRaised = su.revolverDraw + su.termLoanA + su.termLoanB +
      su.seniorNotes + su.subordinatedNotes + su.mezzanineFinancing;
    const totalEquity = su.sponsorEquity + su.rolloverEquity;
    const debtToTotalCap = (totalDebtRaised + totalEquity) > 0
      ? totalDebtRaised / (totalDebtRaised + totalEquity) : 0;
    const equityToTotalCap = (totalDebtRaised + totalEquity) > 0
      ? totalEquity / (totalDebtRaised + totalEquity) : 0;

    const targetEBITDA = state.target.ebitda;
    const leverageAtEntry = targetEBITDA > 0 ? totalDebtRaised / targetEBITDA : 0;

    // Stamp duty auto-calc
    const stampDutyAuto = equityPurchasePrice * EGYPT_PARAMS.STAMP_DUTY_RATE_PER_SIDE * 2;

    // Fee suggestions
    const isLargeDeal = equityPurchasePrice >= 500;
    const advisorySuggested = equityPurchasePrice * (isLargeDeal ? 0.01 : 0.015);
    const financingSuggested = totalDebtRaised * 0.015;
    const legalSuggested = equityPurchasePrice * 0.005;
    const ddSuggested = equityPurchasePrice * 0.0025;

    return {
      totalSources, totalUses, balance, isBalanced,
      totalDebtRaised, totalEquity, debtToTotalCap, equityToTotalCap,
      leverageAtEntry, stampDutyAuto,
      advisorySuggested, financingSuggested, legalSuggested, ddSuggested,
    };
  }, [su, equityPurchasePrice, state.target.ebitda]);

  const autoFillFees = useCallback(() => {
    dispatch({
      type: 'UPDATE_SOURCES_USES',
      payload: {
        advisoryFees: Math.round(calcs.advisorySuggested * 100) / 100,
        financingFees: Math.round(calcs.financingSuggested * 100) / 100,
        legalDueDiligenceFees: Math.round((calcs.legalSuggested + calcs.ddSuggested) * 100) / 100,
        stampDuty: Math.round(calcs.stampDutyAuto * 100) / 100,
      }
    });
  }, [dispatch, calcs]);

  return (
    <div className="animate-fade-in space-y-6">
      <SectionHeader
        title="Sources & Uses of Funds"
        subtitle="Every transaction requires a balanced funding table. Total Sources must equal Total Uses."
      />

      {/* Balance Indicator */}
      <div className="flex items-center justify-between p-4 rounded-lg border" style={{
        backgroundColor: calcs.isBalanced ? 'rgba(76, 175, 80, 0.1)' : 'rgba(229, 57, 53, 0.1)',
        borderColor: calcs.isBalanced ? '#4CAF50' : '#E53935',
      }}>
        <div className="flex items-center gap-3">
          <StatusBadge
            type={calcs.isBalanced ? 'balanced' : 'imbalanced'}
            label={calcs.isBalanced ? 'BALANCED' : `IMBALANCED (Δ EGP ${formatNumber(calcs.balance)}M)`}
          />
          <span className="text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>
            Sources: {formatCurrency(calcs.totalSources)} | Uses: {formatCurrency(calcs.totalUses)}
          </span>
        </div>
        <button
          onClick={autoFillFees}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded transition-colors cursor-pointer"
          style={{ backgroundColor: '#C5A44E', color: '#0B0F1A' }}
        >
          <Calculator className="w-3.5 h-3.5" />
          Calculate Fees
        </button>
      </div>

      {/* S&U Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Sources */}
        <div className="p-4 rounded-lg border" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: '#C5A44E' }}>Sources</h3>
          <div className="space-y-3">
            <InputField label="Revolving Credit Facility" value={su.revolverDraw} onChange={(v) => update('revolverDraw', v)} tooltip="Revolver draw at close" />
            <InputField label="Term Loan A (Senior Secured)" value={su.termLoanA} onChange={(v) => update('termLoanA', v)} tooltip="Amortizing senior secured term loan" />
            <InputField label="Term Loan B (Senior Secured)" value={su.termLoanB} onChange={(v) => update('termLoanB', v)} tooltip="Bullet maturity term loan" />
            <InputField label="Senior Notes" value={su.seniorNotes} onChange={(v) => update('seniorNotes', v)} tooltip="Senior unsecured / high yield notes" />
            <InputField label="Subordinated Notes" value={su.subordinatedNotes} onChange={(v) => update('subordinatedNotes', v)} />
            <InputField label="Mezzanine Financing" value={su.mezzanineFinancing} onChange={(v) => update('mezzanineFinancing', v)} tooltip="Hybrid instrument — may include PIK component" />
            <InputField label="Seller Financing" value={su.sellerFinancing} onChange={(v) => update('sellerFinancing', v)} tooltip="Seller note / deferred consideration" />
            <InputField label="Sponsor Equity" value={su.sponsorEquity} onChange={(v) => update('sponsorEquity', v)} tooltip="PE sponsor equity contribution" />
            <InputField label="Rollover Equity" value={su.rolloverEquity} onChange={(v) => update('rolloverEquity', v)} tooltip="Management / seller equity retained" />
            <InputField label="Cash on Hand" value={su.cashOnHand} onChange={(v) => update('cashOnHand', v)} tooltip="Existing cash used for acquisition" />
            <div className="pt-2 border-t flex justify-between" style={{ borderColor: '#2C3E6B' }}>
              <span className="text-sm font-semibold" style={{ color: '#C5A44E' }}>Total Sources</span>
              <span className="text-sm font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>
                {formatCurrency(calcs.totalSources)}
              </span>
            </div>
          </div>
        </div>

        {/* Uses */}
        <div className="p-4 rounded-lg border" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: '#C5A44E' }}>Uses</h3>
          <div className="space-y-3">
            <InputField label="Equity Purchase Price" value={equityPurchasePrice} onChange={() => {}} disabled tooltip="Auto-linked from Merger Model" />
            <InputField label="Refinance Target Debt" value={su.refinanceTargetDebt} onChange={(v) => update('refinanceTargetDebt', v)} tooltip="Target's existing debt repaid at close" />
            <InputField label="Refinance Acquirer Debt" value={su.refinanceAcquirerDebt} onChange={(v) => update('refinanceAcquirerDebt', v)} />
            <InputField label="Advisory Fees" value={su.advisoryFees} onChange={(v) => update('advisoryFees', v)} tooltip={`Suggested: EGP ${formatNumber(calcs.advisorySuggested)}M`} />
            <InputField label="Financing Fees" value={su.financingFees} onChange={(v) => update('financingFees', v)} tooltip={`Suggested: EGP ${formatNumber(calcs.financingSuggested)}M`} />
            <InputField label="Legal & DD Fees" value={su.legalDueDiligenceFees} onChange={(v) => update('legalDueDiligenceFees', v)} />
            <InputField label="FRA Filing Fee" value={su.fraFilingFee} onChange={(v) => update('fraFilingFee', v)} />
            <InputField label="ECA Filing Fee" value={su.ecaFilingFee} onChange={(v) => update('ecaFilingFee', v)} />
            <InputField label="Stamp Duty" value={su.stampDuty} onChange={(v) => update('stampDuty', v)} tooltip={`Auto-calc: EGP ${formatNumber(calcs.stampDutyAuto)}M (0.125% × 2 sides)`} />
            <InputField label="Cash to Balance Sheet" value={su.cashToBalanceSheet} onChange={(v) => update('cashToBalanceSheet', v)} tooltip="Minimum working capital / cash buffer post-close" />
            <div className="pt-2 border-t flex justify-between" style={{ borderColor: '#2C3E6B' }}>
              <span className="text-sm font-semibold" style={{ color: '#C5A44E' }}>Total Uses</span>
              <span className="text-sm font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>
                {formatCurrency(calcs.totalUses)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Leverage Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <MetricBox label="Total Debt Raised" value={formatCurrency(calcs.totalDebtRaised)} />
        <MetricBox label="Total Equity" value={formatCurrency(calcs.totalEquity)} />
        <MetricBox label="Debt / Total Cap" value={`${formatNumber(calcs.debtToTotalCap * 100, 1)}%`} />
        <MetricBox
          label="Leverage at Entry"
          value={`${formatNumber(calcs.leverageAtEntry, 1)}x`}
          warning={calcs.leverageAtEntry > 5.0}
        />
      </div>
    </div>
  );
}

function MetricBox({ label, value, warning = false }) {
  return (
    <div className="p-3 rounded border" style={{
      backgroundColor: '#1A2340',
      borderColor: warning ? '#FF9800' : '#2C3E6B',
    }}>
      <div className="text-xs mb-1" style={{ color: '#7C8DB0' }}>{label}</div>
      <div className="text-sm font-bold" style={{
        fontFamily: "'IBM Plex Mono', monospace",
        color: warning ? '#FF9800' : '#F4EDE4',
      }}>
        {value}
        {warning && ' ⚠️'}
      </div>
    </div>
  );
}
