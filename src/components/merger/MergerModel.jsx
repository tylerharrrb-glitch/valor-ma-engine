import { useMemo, useCallback } from 'react';
import { useDeal } from '../../context/DealContext';
import { useMergerCalculations, useScenarioMatrix } from '../../hooks/useMergerCalculations';
import InputField from '../shared/InputField';
import SectionHeader from '../shared/SectionHeader';
import StatusBadge from '../shared/StatusBadge';
import ScenarioMatrix from './ScenarioMatrix';
import AccretionChart from './AccretionChart';
import { AlertTriangle } from 'lucide-react';

export default function MergerModel() {
  const { state, dispatch, formatNumber, formatCurrency } = useDeal();
  const { acquirer, target, dealTerms } = state;

  const calc = useMergerCalculations(acquirer, target, dealTerms);
  const scenario = useScenarioMatrix(acquirer, target, dealTerms);

  const updateAcq = useCallback((field, value) => {
    dispatch({ type: 'UPDATE_ACQUIRER', payload: { [field]: value } });
  }, [dispatch]);

  const updateTgt = useCallback((field, value) => {
    dispatch({ type: 'UPDATE_TARGET', payload: { [field]: value } });
  }, [dispatch]);

  const updateDeal = useCallback((field, value) => {
    dispatch({ type: 'UPDATE_DEAL_TERMS', payload: { [field]: value } });
  }, [dispatch]);

  // Syncing stock + cash = 100%
  const handleCashPctChange = useCallback((val) => {
    const capped = Math.min(100, Math.max(0, val));
    dispatch({ type: 'UPDATE_DEAL_TERMS', payload: { cashPercent: capped, stockPercent: 100 - capped } });
  }, [dispatch]);

  const handleStockPctChange = useCallback((val) => {
    const capped = Math.min(100, Math.max(0, val));
    dispatch({ type: 'UPDATE_DEAL_TERMS', payload: { stockPercent: capped, cashPercent: 100 - capped } });
  }, [dispatch]);

  return (
    <div className="animate-fade-in space-y-8">
      <SectionHeader
        title="Merger Model — Accretion / Dilution"
        subtitle="Determine whether the proposed acquisition is accretive or dilutive to the acquirer's EPS"
      />

      {/* ── INPUTS ── */}
      <div className="grid grid-cols-3 gap-6">
        {/* Acquirer */}
        <div className="p-4 rounded-lg border" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>Acquirer</h3>
            <input
              className="text-sm bg-transparent border-b px-1 focus:outline-none"
              style={{ borderColor: '#2C3E6B', color: '#F4EDE4' }}
              placeholder="Company Name"
              value={state.acquirerName}
              onChange={(e) => dispatch({ type: 'SET_ACQUIRER_NAME', payload: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <InputField label="Revenue LTM" value={acquirer.revenue} onChange={(v) => updateAcq('revenue', v)} tooltip="Last Twelve Months total revenue" />
            <InputField label="EBITDA LTM" value={acquirer.ebitda} onChange={(v) => updateAcq('ebitda', v)} tooltip="Earnings Before Interest, Tax, Depreciation & Amortization" />
            <InputField label="EBIT LTM" value={acquirer.ebit} onChange={(v) => updateAcq('ebit', v)} tooltip="EBITDA minus Depreciation & Amortization" />
            <InputField label="Net Income LTM" value={acquirer.netIncome} onChange={(v) => updateAcq('netIncome', v)} tooltip="Net income attributable to common shareholders" required />
            <InputField label="Shares Outstanding" value={acquirer.sharesOutstanding} onChange={(v) => updateAcq('sharesOutstanding', v)} suffix="M shares" tooltip="Diluted shares outstanding" required />
            <InputField label="Share Price" value={acquirer.sharePrice} onChange={(v) => updateAcq('sharePrice', v)} suffix="EGP" tooltip="Current closing share price" required />
            <InputField label="Existing Debt" value={acquirer.existingDebt} onChange={(v) => updateAcq('existingDebt', v)} tooltip="Total gross financial debt" />
            <InputField label="Cash & Equivalents" value={acquirer.cash} onChange={(v) => updateAcq('cash', v)} tooltip="Unrestricted cash and cash equivalents" />
            <InputField label="Tax Rate" value={acquirer.taxRate * 100} onChange={(v) => updateAcq('taxRate', v / 100)} suffix="%" tooltip="Effective corporate tax rate" step={0.1} />
            <InputField label="Interest Rate on Debt" value={acquirer.interestRateOnDebt * 100} onChange={(v) => updateAcq('interestRateOnDebt', v / 100)} suffix="%" tooltip="Weighted average cost of existing debt" step={0.1} />
          </div>
        </div>

        {/* Target */}
        <div className="p-4 rounded-lg border" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>Target</h3>
            <input
              className="text-sm bg-transparent border-b px-1 focus:outline-none"
              style={{ borderColor: '#2C3E6B', color: '#F4EDE4' }}
              placeholder="Company Name"
              value={state.targetName}
              onChange={(e) => dispatch({ type: 'SET_TARGET_NAME', payload: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <InputField label="Revenue LTM" value={target.revenue} onChange={(v) => updateTgt('revenue', v)} tooltip="Last Twelve Months total revenue" />
            <InputField label="EBITDA LTM" value={target.ebitda} onChange={(v) => updateTgt('ebitda', v)} />
            <InputField label="EBIT LTM" value={target.ebit} onChange={(v) => updateTgt('ebit', v)} />
            <InputField label="Net Income LTM" value={target.netIncome} onChange={(v) => updateTgt('netIncome', v)} required />
            <InputField label="Shares Outstanding" value={target.sharesOutstanding} onChange={(v) => updateTgt('sharesOutstanding', v)} suffix="M shares" required />
            <InputField label="Share Price" value={target.sharePrice} onChange={(v) => updateTgt('sharePrice', v)} suffix="EGP" tooltip="Current market price or implied value per share" />
            <InputField label="Existing Debt" value={target.existingDebt} onChange={(v) => updateTgt('existingDebt', v)} />
            <InputField label="Cash & Equivalents" value={target.cash} onChange={(v) => updateTgt('cash', v)} />
            <InputField label="Tax Rate" value={target.taxRate * 100} onChange={(v) => updateTgt('taxRate', v / 100)} suffix="%" step={0.1} />
            <InputField label="Book Value of Equity" value={target.bookValueOfEquity} onChange={(v) => updateTgt('bookValueOfEquity', v)} tooltip="From most recent balance sheet" required />
          </div>
        </div>

        {/* Deal Terms */}
        <div className="p-4 rounded-lg border" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: '#C5A44E' }}>Deal Terms</h3>
          <div className="space-y-3">
            <InputField label="Offer Price per Share" value={dealTerms.offerPricePerShare} onChange={(v) => updateDeal('offerPricePerShare', v)} suffix="EGP" required />
            <InputField label="Cash Consideration" value={dealTerms.cashPercent} onChange={handleCashPctChange} suffix="%" tooltip="% of purchase price paid in cash" step={1} min={0} max={100} />
            <InputField label="Stock Consideration" value={dealTerms.stockPercent} onChange={handleStockPctChange} suffix="%" tooltip="% of purchase price paid in acquirer stock" step={1} min={0} max={100} />
            <InputField label="New Debt for Cash %" value={dealTerms.newDebtForCashPercent} onChange={(v) => updateDeal('newDebtForCashPercent', v)} suffix="%" tooltip="% of cash component funded by new acquisition debt" step={1} />
            <InputField label="New Debt Interest Rate" value={dealTerms.newDebtInterestRate} onChange={(v) => updateDeal('newDebtInterestRate', v)} suffix="%" tooltip="Annual interest rate on acquisition financing" step={0.1} />

            <div className="pt-2 border-t" style={{ borderColor: '#2C3E6B' }}>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-medium" style={{ color: '#7C8DB0' }}>Synergy Convention</label>
                <select
                  value={dealTerms.synergiesInputConvention}
                  onChange={(e) => updateDeal('synergiesInputConvention', e.target.value)}
                  className="text-xs px-2 py-1 rounded border focus:outline-none cursor-pointer"
                  style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B', color: '#F4EDE4' }}
                >
                  <option value="Pre-Tax">Pre-Tax</option>
                  <option value="After-Tax">After-Tax</option>
                </select>
              </div>
              <InputField label={`Synergies Year 1 (${dealTerms.synergiesInputConvention})`} value={dealTerms.synergiesYear1} onChange={(v) => updateDeal('synergiesYear1', v)} />
              <InputField label={`Synergies Year 2 (${dealTerms.synergiesInputConvention})`} value={dealTerms.synergiesYear2} onChange={(v) => updateDeal('synergiesYear2', v)} />
              <InputField label={`Synergies Year 3 (${dealTerms.synergiesInputConvention})`} value={dealTerms.synergiesYear3} onChange={(v) => updateDeal('synergiesYear3', v)} />
            </div>

            <InputField label="Deal Tax Rate" value={dealTerms.dealTaxRate * 100} onChange={(v) => updateDeal('dealTaxRate', v / 100)} suffix="%" step={0.1} tooltip="Tax rate used for deal adjustments (default: 22.5% per Egyptian law)" />
          </div>
        </div>
      </div>

      {/* ── ALERTS ── */}
      {calc?.cashShortfall && (
        <div className="flex items-center gap-2 px-4 py-3 rounded border" style={{ backgroundColor: 'rgba(229, 57, 53, 0.1)', borderColor: '#E53935' }}>
          <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: '#E53935' }} />
          <span className="text-sm font-medium" style={{ color: '#E53935' }}>
            Attention Required: Cash drawn (EGP {formatNumber(calc.cashDrawnFromBalance)}M) exceeds available balance (EGP {formatNumber(acquirer.cash)}M)
          </span>
        </div>
      )}

      {calc?.isBargainPurchase && (
        <div className="flex items-center gap-2 px-4 py-3 rounded border" style={{ backgroundColor: 'rgba(76, 175, 80, 0.1)', borderColor: '#4CAF50' }}>
          <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: '#4CAF50' }} />
          <span className="text-sm font-medium" style={{ color: '#4CAF50' }}>
            Bargain Purchase: Negative goodwill of EGP {formatNumber(Math.abs(calc.goodwillCreated))}M — record as gain
          </span>
        </div>
      )}

      {/* ── OUTPUTS ── */}
      {calc && (
        <div className="space-y-6">
          {/* Deal Metrics */}
          <div className="grid grid-cols-2 gap-6">
            <OutputPanel title="Deal Metrics">
              <OutputRow label="Purchase Price (Equity Value)" value={formatCurrency(calc.purchasePriceEquity)} />
              <OutputRow label="Enterprise Value of Target" value={formatCurrency(calc.targetEnterpriseValue)} />
              <OutputRow label="Premium to Market Price" value={`${formatNumber(calc.premiumPaid, 2)}%`} />
              <OutputRow label="EV / EBITDA Multiple Paid" value={calc.impliedEVtoEBITDA !== null ? `${formatNumber(calc.impliedEVtoEBITDA, 2)}x` : '—'} />
              <OutputRow label="EV / Revenue Multiple Paid" value={calc.impliedEVtoRevenue !== null ? `${formatNumber(calc.impliedEVtoRevenue, 2)}x` : '—'} />
              <OutputRow label="Price / Earnings Multiple Paid" value={calc.impliedPE !== null ? `${formatNumber(calc.impliedPE, 2)}x` : '—'} />
            </OutputPanel>

            <OutputPanel title="Deal Structure">
              <OutputRow label="Cash Consideration" value={`${formatCurrency(calc.cashComponent)} (${formatNumber(dealTerms.cashPercent, 0)}%)`} />
              <OutputRow label="Stock Consideration" value={`${formatCurrency(calc.stockComponent)} (${formatNumber(dealTerms.stockPercent, 0)}%)`} />
              <OutputRow label="New Shares Issued" value={`${formatNumber(calc.newSharesIssued, 3)}M shares`} />
              <OutputRow label="Exchange Ratio" value={`${formatNumber(calc.exchangeRatio, 4)}x`} />
              <OutputRow label="New Acquisition Debt" value={formatCurrency(calc.debtForCashComponent)} />
              <OutputRow label="Cash Drawn from Balance" value={formatCurrency(calc.cashDrawnFromBalance)} highlight={calc.cashShortfall} />
            </OutputPanel>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <OutputPanel title="Combined Entity">
              <OutputRow label="Pro-Forma Shares Outstanding" value={`${formatNumber(calc.proFormaSharesOutstanding, 3)}M shares`} />
              <OutputRow label="Goodwill Created" value={formatCurrency(calc.goodwillCreated)} highlight={calc.isBargainPurchase} />
              <OutputRow label="Annual Goodwill Amortization" value={`${formatCurrency(calc.annualGoodwillAmortization)}/year (10yr, EAS No. 19)`} />
              <OutputRow label="Net Incremental Interest (A/T)" value={`${formatCurrency(calc.totalIncrementalInterestAfterTax)}/year`} />
              <OutputRow label="Break-Even Synergies Required" value={`${formatCurrency(calc.breakEvenAfterTaxSynergies)} (after-tax)`} />
            </OutputPanel>

            <OutputPanel title="EPS Analysis">
              <OutputRow label="Acquirer Standalone EPS" value={`EGP ${formatNumber(calc.acquirerStandaloneEPS, 4)}`} />
              {calc.proFormaEPS.map((eps, i) => (
                <OutputRow
                  key={i}
                  label={`Pro-Forma EPS — Year ${i + 1}`}
                  value={`EGP ${formatNumber(eps, 4)}`}
                />
              ))}
              {calc.accretionDilution.map((ad, i) => (
                <OutputRow
                  key={`ad-${i}`}
                  label={`Accretion / (Dilution) — Year ${i + 1}`}
                  value={
                    <span className="flex items-center gap-2">
                      <span style={{ color: ad >= 0 ? '#4CAF50' : '#E53935', fontFamily: "'IBM Plex Mono', monospace" }}>
                        {ad >= 0 ? '+' : ''}{formatNumber(ad, 2)}%
                      </span>
                      <StatusBadge
                        type={ad >= 0 ? 'accretive' : 'dilutive'}
                        label={ad >= 0 ? 'ACCRETIVE' : 'DILUTIVE'}
                      />
                    </span>
                  }
                />
              ))}
            </OutputPanel>
          </div>

          {/* Contribution Analysis */}
          <OutputPanel title="Contribution Analysis">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: '#0B0F1A' }}>
                    <th className="text-left px-4 py-2 font-semibold" style={{ color: '#C5A44E' }}>Metric</th>
                    <th className="text-right px-4 py-2 font-semibold" style={{ color: '#C5A44E' }}>{state.acquirerName || 'Acquirer'}</th>
                    <th className="text-right px-4 py-2 font-semibold" style={{ color: '#C5A44E' }}>{state.targetName || 'Target'}</th>
                    <th className="text-right px-4 py-2 font-semibold" style={{ color: '#C5A44E' }}>Combined</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Revenue', a: calc.contribution.acquirerRevenue, t: calc.contribution.targetRevenue },
                    { label: 'EBITDA', a: calc.contribution.acquirerEBITDA, t: calc.contribution.targetEBITDA },
                    { label: 'Net Income', a: calc.contribution.acquirerNI, t: calc.contribution.targetNI },
                    { label: 'Ownership', a: calc.contribution.acquirerOwnership, t: calc.contribution.targetOwnership },
                  ].map((row, i) => (
                    <tr key={row.label} style={{ backgroundColor: i % 2 === 0 ? '#1A2340' : '#1e2a4a' }}>
                      <td className="px-4 py-2 font-medium" style={{ color: '#F4EDE4' }}>{row.label}</td>
                      <td className="px-4 py-2 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>{formatNumber(row.a, 1)}%</td>
                      <td className="px-4 py-2 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>{formatNumber(row.t, 1)}%</td>
                      <td className="px-4 py-2 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#C5A44E' }}>100.0%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </OutputPanel>

          {/* EPS Bridge Chart */}
          <AccretionChart calc={calc} acquirerName={state.acquirerName} />

          {/* Scenario Matrix */}
          {scenario && (
            <ScenarioMatrix
              data={scenario}
              currentPremium={calc.premiumPaid}
              currentSynergy={calc.afterTaxSynergies[0]}
            />
          )}
        </div>
      )}
    </div>
  );
}

function OutputPanel({ title, children }) {
  return (
    <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
      <div className="px-4 py-2 border-b" style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B' }}>
        <h3 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>{title}</h3>
      </div>
      <div className="p-4 space-y-2">
        {children}
      </div>
    </div>
  );
}

function OutputRow({ label, value, highlight = false }) {
  return (
    <div className="flex items-center justify-between py-1 border-b last:border-0" style={{ borderColor: 'rgba(44, 62, 107, 0.5)' }}>
      <span className="text-xs" style={{ color: '#7C8DB0' }}>{label}</span>
      <span
        className="text-sm font-medium"
        style={{
          fontFamily: typeof value === 'string' ? "'IBM Plex Mono', monospace" : undefined,
          color: highlight ? '#E53935' : '#F4EDE4',
        }}
      >
        {value}
      </span>
    </div>
  );
}
