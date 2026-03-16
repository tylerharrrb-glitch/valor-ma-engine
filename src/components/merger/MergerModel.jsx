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

  const handleCashPctChange = useCallback((val) => {
    const capped = Math.min(100, Math.max(0, val));
    dispatch({ type: 'UPDATE_DEAL_TERMS', payload: { cashPercent: capped, stockPercent: 100 - capped } });
  }, [dispatch]);

  const handleStockPctChange = useCallback((val) => {
    const capped = Math.min(100, Math.max(0, val));
    dispatch({ type: 'UPDATE_DEAL_TERMS', payload: { stockPercent: capped, cashPercent: 100 - capped } });
  }, [dispatch]);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <SectionHeader
        label="01 — MERGER MODEL"
        title="Accretion / Dilution Analysis"
        subtitle="Determine whether the proposed acquisition is accretive or dilutive to the acquirer's EPS"
      />

      {/* ── INPUTS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {/* Acquirer */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span className="section-label" style={{ marginBottom: 0 }}>Acquirer</span>
            <input
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--ff-body)',
                fontSize: '.85rem',
                padding: '2px 4px',
                outline: 'none',
              }}
              placeholder="Company Name"
              value={state.acquirerName}
              onChange={(e) => dispatch({ type: 'SET_ACQUIRER_NAME', payload: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span className="section-label" style={{ marginBottom: 0 }}>Target</span>
            <input
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--ff-body)',
                fontSize: '.85rem',
                padding: '2px 4px',
                outline: 'none',
              }}
              placeholder="Company Name"
              value={state.targetName}
              onChange={(e) => dispatch({ type: 'SET_TARGET_NAME', payload: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
        <div className="card" style={{ padding: '24px' }}>
          <span className="section-label" style={{ marginBottom: '16px' }}>Deal Terms</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <InputField label="Offer Price per Share" value={dealTerms.offerPricePerShare} onChange={(v) => updateDeal('offerPricePerShare', v)} suffix="EGP" required />
            <InputField label="Cash Consideration" value={dealTerms.cashPercent} onChange={handleCashPctChange} suffix="%" tooltip="% of purchase price paid in cash" step={1} min={0} max={100} />
            <InputField label="Stock Consideration" value={dealTerms.stockPercent} onChange={handleStockPctChange} suffix="%" tooltip="% of purchase price paid in acquirer stock" step={1} min={0} max={100} />
            <InputField label="New Debt for Cash %" value={dealTerms.newDebtForCashPercent} onChange={(v) => updateDeal('newDebtForCashPercent', v)} suffix="%" tooltip="% of cash component funded by new acquisition debt" step={1} />
            <InputField label="New Debt Interest Rate" value={dealTerms.newDebtInterestRate} onChange={(v) => updateDeal('newDebtInterestRate', v)} suffix="%" tooltip="Annual interest rate on acquisition financing" step={0.1} />

            <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <label className="valor-label" style={{ marginBottom: 0 }}>Synergy Convention</label>
                <select
                  value={dealTerms.synergiesInputConvention}
                  onChange={(e) => updateDeal('synergiesInputConvention', e.target.value)}
                  style={{
                    fontFamily: 'var(--ff-mono)',
                    fontSize: '.72rem',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
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
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '12px 16px', borderRadius: '8px',
          background: 'rgba(248,113,113,.08)',
          border: '1px solid rgba(248,113,113,.25)',
        }}>
          <AlertTriangle style={{ width: 16, height: 16, color: '#f87171', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '.82rem', color: '#f87171' }}>
            Attention Required: Cash drawn (EGP {formatNumber(calc.cashDrawnFromBalance)}M) exceeds available balance (EGP {formatNumber(acquirer.cash)}M)
          </span>
        </div>
      )}

      {calc?.isBargainPurchase && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '12px 16px', borderRadius: '8px',
          background: 'rgba(74,222,128,.08)',
          border: '1px solid rgba(74,222,128,.25)',
        }}>
          <AlertTriangle style={{ width: 16, height: 16, color: '#4ade80', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '.82rem', color: '#4ade80' }}>
            Bargain Purchase: Negative goodwill of EGP {formatNumber(Math.abs(calc.goodwillCreated))}M — record as gain
          </span>
        </div>
      )}

      {/* ── OUTPUTS ── */}
      {calc && (
        <>
          {/* Deal Metrics & Structure */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
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
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: ad >= 0 ? '#4ade80' : '#f87171', fontFamily: 'var(--ff-mono)' }}>
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
            <div style={{ overflowX: 'auto' }}>
              <table className="fin-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Metric</th>
                    <th>{state.acquirerName || 'Acquirer'}</th>
                    <th>{state.targetName || 'Target'}</th>
                    <th>Combined</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Revenue', a: calc.contribution.acquirerRevenue, t: calc.contribution.targetRevenue },
                    { label: 'EBITDA', a: calc.contribution.acquirerEBITDA, t: calc.contribution.targetEBITDA },
                    { label: 'Net Income', a: calc.contribution.acquirerNI, t: calc.contribution.targetNI },
                    { label: 'Ownership', a: calc.contribution.acquirerOwnership, t: calc.contribution.targetOwnership },
                  ].map((row) => (
                    <tr key={row.label}>
                      <td>{row.label}</td>
                      <td>{formatNumber(row.a, 1)}%</td>
                      <td>{formatNumber(row.t, 1)}%</td>
                      <td style={{ color: 'var(--accent-gold)' }}>100.0%</td>
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
        </>
      )}
    </div>
  );
}

function OutputPanel({ title, children }) {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
      }}>
        <h3 style={{
          fontFamily: 'var(--ff-mono)',
          fontSize: '.72rem',
          fontWeight: 500,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--accent-gold)',
          margin: 0,
        }}>{title}</h3>
      </div>
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {children}
      </div>
    </div>
  );
}

function OutputRow({ label, value, highlight = false }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6px 0',
      borderBottom: '1px solid rgba(30,45,69,.4)',
    }}>
      <span style={{
        fontFamily: 'var(--ff-body)',
        fontSize: '.82rem',
        color: 'var(--text-secondary)',
      }}>{label}</span>
      <span style={{
        fontFamily: 'var(--ff-mono)',
        fontSize: '.85rem',
        fontWeight: 500,
        color: highlight ? '#f87171' : 'var(--text-primary)',
      }}>
        {value}
      </span>
    </div>
  );
}
