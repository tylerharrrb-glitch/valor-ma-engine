import { useCallback } from 'react';
import { useDeal } from '../../context/DealContext';
import InputField from '../shared/InputField';
import SectionHeader from '../shared/SectionHeader';
import { Target, Layers, Shield, AlertTriangle } from 'lucide-react';

export default function LBOEntry({ calc }) {
  const { state, dispatch, formatNumber, formatCurrency } = useDeal();
  const l = state.lbo;

  const update = useCallback((payload) => {
    dispatch({ type: 'UPDATE_LBO', payload });
  }, [dispatch]);

  return (
    <div className="space-y-8 animate-fade-in">
      <SectionHeader
        title="LBO Model — Leveraged Buyout"
        subtitle="Model a PE acquisition: entry, operating model, debt schedule, exit returns analysis"
      />

      {/* ── ENTRY ASSUMPTIONS + CAPITAL STRUCTURE ── */}
      <div className="grid grid-cols-2 gap-6">
        {/* Entry Assumptions */}
        <div className="rounded-lg border p-4" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4" style={{ color: '#C5A44E' }} />
            <h4 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>Entry Assumptions</h4>
          </div>
          <div className="space-y-3">
            <InputField label="Target Revenue LTM" value={l.targetRevenueLTM} onChange={(v) => update({ targetRevenueLTM: v })} tooltip="Last Twelve Months revenue of the LBO target" />
            <InputField label="Target EBITDA LTM" value={l.targetEBITDALTM} onChange={(v) => update({ targetEBITDALTM: v })} tooltip="Last Twelve Months EBITDA" required />
            <InputField label="Entry EV/EBITDA Multiple" value={l.entryMultiple} onChange={(v) => update({ entryMultiple: v })} suffix="x" tooltip="Entry EV/EBITDA multiple" step={0.1} required />
            <InputField label="Target Net Debt at Close" value={l.targetNetDebtAtClose} onChange={(v) => update({ targetNetDebtAtClose: v })} tooltip="Gross Debt − Cash & Equivalents at closing" />
            <InputField label="Transaction & Financing Fees" value={l.transactionFees} onChange={(v) => update({ transactionFees: v })} tooltip="All-in advisory + financing fees" />

            {/* Auto-calculated entry metrics */}
            {calc && (
              <div className="mt-3 px-3 py-2 rounded space-y-1.5" style={{ backgroundColor: '#0B0F1A' }}>
                <MetricRow label="Implied Entry EV" value={formatCurrency(calc.impliedEntryEV)} />
                <MetricRow label="Purchase Price (Equity)" value={formatCurrency(calc.purchasePriceEquityLBO)} />
                <MetricRow label="Total Capital Required" value={formatCurrency(calc.totalCapitalRequired)} bold />
              </div>
            )}
          </div>
        </div>

        {/* Capital Structure */}
        <div className="rounded-lg border p-4" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4" style={{ color: '#C5A44E' }} />
            <h4 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>Debt Tranches</h4>
          </div>

          {/* Tranche headers */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left px-1 py-1 font-semibold" style={{ color: '#7C8DB0', width: '120px' }}>Tranche</th>
                  <th className="text-center px-1 py-1 font-semibold" style={{ color: '#7C8DB0' }}>× EBITDA</th>
                  <th className="text-center px-1 py-1 font-semibold" style={{ color: '#7C8DB0' }}>Rate %</th>
                  <th className="text-center px-1 py-1 font-semibold" style={{ color: '#7C8DB0' }}>Amort %</th>
                  <th className="text-center px-1 py-1 font-semibold" style={{ color: '#7C8DB0' }}>Mat. Yr</th>
                  <th className="text-right px-1 py-1 font-semibold" style={{ color: '#7C8DB0' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* TLA */}
                <TrancheRow
                  label="Term Loan A"
                  multiple={l.tlaMultiple} rate={l.tlaRate} amort={l.tlaAmortPct} maturity={l.tlaMaturity}
                  amount={calc?.principalA}
                  onMultiple={(v) => update({ tlaMultiple: v })}
                  onRate={(v) => update({ tlaRate: v })}
                  onAmort={(v) => update({ tlaAmortPct: v })}
                  onMaturity={(v) => update({ tlaMaturity: v })}
                  formatNumber={formatNumber}
                />
                {/* TLB */}
                <TrancheRow
                  label="Term Loan B"
                  multiple={l.tlbMultiple} rate={l.tlbRate} amort={l.tlbAmortPct} maturity={l.tlbMaturity}
                  amount={calc?.principalB}
                  onMultiple={(v) => update({ tlbMultiple: v })}
                  onRate={(v) => update({ tlbRate: v })}
                  onAmort={(v) => update({ tlbAmortPct: v })}
                  onMaturity={(v) => update({ tlbMaturity: v })}
                  formatNumber={formatNumber}
                />
                {/* Senior Notes */}
                <TrancheRow
                  label="Senior Notes"
                  multiple={l.seniorNotesMultiple} rate={l.seniorNotesRate} maturity={l.seniorNotesMaturity}
                  amount={calc?.principalC}
                  onMultiple={(v) => update({ seniorNotesMultiple: v })}
                  onRate={(v) => update({ seniorNotesRate: v })}
                  onMaturity={(v) => update({ seniorNotesMaturity: v })}
                  formatNumber={formatNumber}
                  hideAmort
                />
                {/* Mezzanine */}
                <TrancheRow
                  label="Mezzanine"
                  multiple={l.mezzMultiple} rate={l.mezzRate} maturity={l.mezzMaturity}
                  amount={calc?.principalMezz}
                  onMultiple={(v) => update({ mezzMultiple: v })}
                  onRate={(v) => update({ mezzRate: v })}
                  onMaturity={(v) => update({ mezzMaturity: v })}
                  formatNumber={formatNumber}
                  hideAmort
                />
              </tbody>
            </table>
          </div>

          {/* PIK toggle */}
          <div className="mt-3 flex items-center gap-2">
            <input
              type="checkbox"
              id="mezz-pik"
              checked={l.mezzPIK}
              onChange={(e) => update({ mezzPIK: e.target.checked })}
              className="rounded cursor-pointer"
              style={{ accentColor: '#C5A44E' }}
            />
            <label htmlFor="mezz-pik" className="text-xs cursor-pointer" style={{ color: '#7C8DB0' }}>
              Mezzanine PIK (interest compounds onto principal)
            </label>
          </div>

          {/* Summary metrics */}
          {calc && (
            <div className="mt-4 px-3 py-2 rounded space-y-1.5" style={{ backgroundColor: '#0B0F1A' }}>
              <MetricRow label="Total Debt at Entry" value={formatCurrency(calc.totalDebtAtEntry)} />
              <MetricRow label="Sponsor Equity (Residual)" value={formatCurrency(calc.sponsorEquityLBO)} bold highlight />
              <MetricRow label="Debt / EBITDA at Entry" value={`${formatNumber(calc.debtToEBITDAEntry, 1)}x`} warn={calc.debtToEBITDAEntry > 5.0} />
              <MetricRow label="Equity Contribution" value={`${formatNumber(calc.equityPercent, 1)}%`} warn={calc.equityPercent < 30} />
            </div>
          )}

          {/* Warnings */}
          {calc && calc.debtToEBITDAEntry > 5.0 && (
            <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded text-xs" style={{ backgroundColor: 'rgba(255, 152, 0, 0.1)', color: '#FF9800' }}>
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
              Leverage {formatNumber(calc.debtToEBITDAEntry, 1)}x exceeds 5.0x — aggressive for Egyptian bank market
            </div>
          )}
          {calc && calc.equityPercent < 30 && (
            <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded text-xs" style={{ backgroundColor: 'rgba(255, 152, 0, 0.1)', color: '#FF9800' }}>
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
              Equity {formatNumber(calc.equityPercent, 1)}% is below 30% — undercapitalized for Egyptian banks
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TrancheRow({
  label, multiple, rate, amort, maturity, amount,
  onMultiple, onRate, onAmort, onMaturity,
  formatNumber, hideAmort = false,
}) {
  const cellStyle = {
    fontFamily: "'IBM Plex Mono', monospace",
    color: '#F4EDE4',
    backgroundColor: '#0B0F1A',
    borderColor: '#2C3E6B',
  };

  return (
    <tr className="border-b last:border-0" style={{ borderColor: 'rgba(44, 62, 107, 0.5)' }}>
      <td className="px-1 py-2 font-medium" style={{ color: '#F4EDE4' }}>{label}</td>
      <td className="px-1 py-1">
        <input type="number" step={0.1} value={multiple || ''} onChange={(e) => onMultiple(parseFloat(e.target.value) || 0)}
          className="w-full text-center text-xs px-1 py-1 rounded border focus:outline-none focus:border-[#C5A44E] bg-transparent transition-colors"
          style={cellStyle} placeholder="0" />
      </td>
      <td className="px-1 py-1">
        <input type="number" step={0.5} value={rate || ''} onChange={(e) => onRate(parseFloat(e.target.value) || 0)}
          className="w-full text-center text-xs px-1 py-1 rounded border focus:outline-none focus:border-[#C5A44E] bg-transparent transition-colors"
          style={cellStyle} placeholder="0" />
      </td>
      <td className="px-1 py-1">
        {hideAmort ? (
          <span className="block text-center text-xs" style={{ color: '#7C8DB0' }}>—</span>
        ) : (
          <input type="number" step={1} value={amort || ''} onChange={(e) => onAmort(parseFloat(e.target.value) || 0)}
            className="w-full text-center text-xs px-1 py-1 rounded border focus:outline-none focus:border-[#C5A44E] bg-transparent transition-colors"
            style={cellStyle} placeholder="0" />
        )}
      </td>
      <td className="px-1 py-1">
        <input type="number" step={1} min={1} max={10} value={maturity || ''} onChange={(e) => onMaturity(parseInt(e.target.value) || 1)}
          className="w-full text-center text-xs px-1 py-1 rounded border focus:outline-none focus:border-[#C5A44E] bg-transparent transition-colors"
          style={cellStyle} placeholder="5" />
      </td>
      <td className="px-1 py-2 text-right text-xs font-medium" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#C5A44E' }}>
        {amount ? `${formatNumber(amount, 1)}M` : '—'}
      </td>
    </tr>
  );
}

function MetricRow({ label, value, bold = false, highlight = false, warn = false }) {
  return (
    <div className="flex justify-between text-xs">
      <span style={{ color: '#7C8DB0' }}>{label}</span>
      <span className={bold ? 'font-bold' : 'font-medium'} style={{
        fontFamily: "'IBM Plex Mono', monospace",
        color: warn ? '#FF9800' : highlight ? '#4CAF50' : bold ? '#C5A44E' : '#F4EDE4',
      }}>
        {value}{warn ? ' ⚠️' : ''}
      </span>
    </div>
  );
}
