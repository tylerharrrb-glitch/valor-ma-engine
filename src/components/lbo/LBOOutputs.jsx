import { useCallback } from 'react';
import { useDeal } from '../../context/DealContext';
import { useLBOScenarioMatrices } from '../../hooks/useLBOCalculations';
import InputField from '../shared/InputField';
import { AlertTriangle, CheckCircle2, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const YEARS = [1, 2, 3, 4, 5];

export default function LBOOutputs({ calc }) {
  const { state, dispatch, formatNumber, formatCurrency } = useDeal();
  const l = state.lbo;
  const scenarios = useLBOScenarioMatrices(l, calc);

  const update = useCallback((payload) => {
    dispatch({ type: 'UPDATE_LBO', payload });
  }, [dispatch]);

  if (!calc) return null;

  const hasData = calc.ebitda.some((v) => v > 0);
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center py-16 rounded-lg border mt-8" style={{ backgroundColor: '#141B2D', borderColor: '#1E2D45' }}>
        <TrendingDown className="w-8 h-8 mb-3" style={{ color: '#8892A4' }} />
        <p className="text-sm" style={{ color: '#8892A4' }}>Enter operating model assumptions to generate LBO analysis</p>
      </div>
    );
  }

  // Returns attribution chart data
  const attributionData = [
    { name: 'EBITDA Growth', value: calc.ebitdaGrowthContrib, color: '#C9A84C' },
    { name: 'Multiple Expansion', value: calc.multipleExpansionContrib, color: '#1E2D45' },
    { name: 'Debt Paydown', value: calc.debtPaydownContrib, color: '#4ade80' },
  ];

  // IRR color
  const irrColor = calc.irr !== null
    ? calc.irr >= 0.25 ? '#4ade80' : calc.irr >= 0.20 ? '#4ade80' : calc.irr >= 0.15 ? '#FF9800' : '#f87171'
    : '#8892A4';

  const moicColor = calc.moic >= 3.0 ? '#4ade80' : calc.moic >= 2.5 ? '#4ade80' : calc.moic >= 2.0 ? '#FF9800' : '#f87171';

  return (
    <div className="space-y-6 mt-8">
      {/* ── COVENANT ALERTS ── */}
      {calc.covenantBreaches.map((b, i) => (
        <div key={i} className="flex items-center gap-2 px-4 py-3 rounded border" style={{ backgroundColor: 'rgba(229, 57, 53, 0.1)', borderColor: '#f87171' }}>
          <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: '#f87171' }} />
          <span className="text-sm font-medium" style={{ color: '#f87171' }}>
            {b.type === 'leverage'
              ? `Attention Required: Leverage covenant breach in Year ${b.year} — Debt/EBITDA ${formatNumber(b.value, 1)}x > ${formatNumber(b.limit, 1)}x`
              : `Attention Required: ICR covenant breach in Year ${b.year} — EBITDA/Interest ${formatNumber(b.value, 1)}x < ${formatNumber(b.limit, 1)}x`
            }
          </span>
        </div>
      ))}

      {/* ── DEBT SCHEDULE TABLE ── */}
      <OutputPanel title="Debt Schedule (EGP M)">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ backgroundColor: '#0A0E17' }}>
                <th className="text-left px-3 py-2 font-semibold" style={{ color: '#C9A84C', minWidth: '180px' }}>Tranche / Metric</th>
                <th className="text-right px-3 py-2 font-semibold" style={{ color: '#C9A84C' }}>Entry</th>
                {YEARS.map((y) => (
                  <th key={y} className="text-right px-3 py-2 font-semibold" style={{ color: '#C9A84C' }}>Yr {y}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* TLA */}
              <ScheduleSection label="Term Loan A"
                balances={calc.balA} interest={calc.interestA} amort={calc.amortA} sweep={calc.sweepA}
                formatNumber={formatNumber} />
              {/* TLB */}
              <ScheduleSection label="Term Loan B"
                balances={calc.balB} interest={calc.interestB} amort={calc.amortB} sweep={calc.sweepB}
                formatNumber={formatNumber} />
              {/* Senior Notes */}
              <ScheduleSection label="Senior Notes"
                balances={calc.balC} interest={calc.interestC} sweep={calc.sweepC}
                formatNumber={formatNumber} />
              {/* Mezzanine */}
              <tr style={{ backgroundColor: '#182236' }}>
                <td className="px-3 py-1.5 font-semibold" style={{ color: '#F0F4FF' }}>Mezzanine</td>
                <td className="px-3 py-1.5 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F0F4FF' }}>
                  {formatNumber(calc.balM[0], 1)}
                </td>
                {YEARS.map((y, yi) => (
                  <td key={y} className="px-3 py-1.5 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F0F4FF' }}>
                    {formatNumber(calc.balM[yi + 1], 1)}
                  </td>
                ))}
              </tr>
              {l.mezzPIK && (
                <tr>
                  <td className="px-3 py-1 pl-6" style={{ color: '#8892A4' }}>PIK Interest</td>
                  <td></td>
                  {YEARS.map((y, yi) => (
                    <td key={y} className="px-3 py-1 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#FF9800' }}>
                      {formatNumber(calc.interestMPIK[yi], 1)}
                    </td>
                  ))}
                </tr>
              )}

              {/* Totals */}
              <tr style={{ borderTop: '2px solid #C9A84C' }}>
                <td className="px-3 py-2 font-bold" style={{ color: '#C9A84C' }}>Total Debt</td>
                <td className="px-3 py-2 text-right font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#C9A84C' }}>
                  {formatNumber(calc.totalDebtAtEntry, 1)}
                </td>
                {YEARS.map((y, yi) => (
                  <td key={y} className="px-3 py-2 text-right font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#C9A84C' }}>
                    {formatNumber(calc.totalDebt[yi], 1)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-3 py-1.5" style={{ color: '#8892A4' }}>Debt / EBITDA</td>
                <td className="px-3 py-1.5 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F0F4FF' }}>
                  {formatNumber(calc.debtToEBITDAEntry, 1)}x
                </td>
                {YEARS.map((y, yi) => (
                  <td key={y} className="px-3 py-1.5 text-right" style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: calc.debtToEBITDA[yi] > l.maxLeverageCovenant ? '#f87171' : '#F0F4FF',
                  }}>
                    {calc.debtToEBITDA[yi] !== null ? `${formatNumber(calc.debtToEBITDA[yi], 1)}x` : '—'}
                  </td>
                ))}
              </tr>
              <tr style={{ backgroundColor: '#182236' }}>
                <td className="px-3 py-1.5" style={{ color: '#8892A4' }}>Interest Coverage</td>
                <td></td>
                {YEARS.map((y, yi) => (
                  <td key={y} className="px-3 py-1.5 text-right" style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: calc.interestCoverageRatio[yi] !== null && calc.interestCoverageRatio[yi] < l.minICRCovenant ? '#f87171' : '#F0F4FF',
                  }}>
                    {calc.interestCoverageRatio[yi] !== null ? `${formatNumber(calc.interestCoverageRatio[yi], 1)}x` : '—'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </OutputPanel>

      {/* ── EXIT + RETURNS ── */}
      <div className="grid grid-cols-2 gap-6">
        {/* Exit Assumptions */}
        <OutputPanel title="Exit Assumptions">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-xs font-medium" style={{ color: '#8892A4' }}>Exit Year</label>
              <select
                value={l.exitYear}
                onChange={(e) => update({ exitYear: parseInt(e.target.value) })}
                className="text-xs px-2 py-1 rounded border focus:outline-none cursor-pointer"
                style={{ backgroundColor: '#0A0E17', borderColor: '#1E2D45', color: '#F0F4FF' }}
              >
                {[3, 4, 5, 6, 7].map((y) => (
                  <option key={y} value={y}>Year {y}</option>
                ))}
              </select>
            </div>
            <InputField label="Exit EV/EBITDA Multiple" value={l.exitMultiple} onChange={(v) => update({ exitMultiple: v })} suffix="x" step={0.1} tooltip="Expected exit EV/EBITDA multiple" />
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium" style={{ color: '#8892A4' }}>Exit Route</label>
              <select
                value={l.exitRoute}
                onChange={(e) => update({ exitRoute: e.target.value })}
                className="text-xs px-2 py-1 rounded border focus:outline-none cursor-pointer"
                style={{ backgroundColor: '#0A0E17', borderColor: '#1E2D45', color: '#F0F4FF' }}
              >
                <option value="Strategic Sale">Strategic Sale</option>
                <option value="IPO on EGX">IPO on EGX</option>
                <option value="Secondary Buyout">Secondary Buyout</option>
              </select>
            </div>
            <InputField label="Minimum Cash Retention" value={l.minimumCashRetention} onChange={(v) => update({ minimumCashRetention: v })} tooltip="Cash buffer retained post-exit" />
            <InputField label="Cash Sweep %" value={l.sweepPercent} onChange={(v) => update({ sweepPercent: v })} suffix="%" step={5} tooltip="% of excess cash applied to debt prepayment" />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Max Leverage Covenant" value={l.maxLeverageCovenant} onChange={(v) => update({ maxLeverageCovenant: v })} suffix="x" step={0.1} />
              <InputField label="Min ICR Covenant" value={l.minICRCovenant} onChange={(v) => update({ minICRCovenant: v })} suffix="x" step={0.1} />
            </div>

            {/* Auto-calc exit metrics */}
            <div className="mt-3 px-3 py-2 rounded space-y-1.5" style={{ backgroundColor: '#0A0E17' }}>
              <MetricRow label="Exit EBITDA" value={formatCurrency(calc.exitEBITDA)} />
              <MetricRow label="Exit Enterprise Value" value={formatCurrency(calc.exitEV)} />
              <MetricRow label="Net Debt at Exit" value={formatCurrency(calc.netDebtAtExit)} />
              <MetricRow label="Equity Value at Exit" value={formatCurrency(calc.equityValueAtExit)} bold />
              {calc.capitalGainsTaxOnExit > 0 && (
                <MetricRow label={`CGT (${l.exitRoute === 'IPO on EGX' ? '0%' : '22.5%'})`} value={`(${formatCurrency(calc.capitalGainsTaxOnExit)})`} negative />
              )}
              <MetricRow label="Equity Returned to Sponsor" value={formatCurrency(calc.equityReturnedToSponsor)} bold highlight />
            </div>
          </div>
        </OutputPanel>

        {/* Returns */}
        <OutputPanel title="Returns Analysis">
          <div className="space-y-4">
            {/* Key metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded text-center" style={{ backgroundColor: '#0A0E17' }}>
                <div className="text-xs mb-1" style={{ color: '#8892A4' }}>MOIC</div>
                <div className="text-2xl font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: moicColor }}>
                  {formatNumber(calc.moic, 2)}x
                </div>
                <div className="text-[10px] mt-1" style={{ color: '#8892A4' }}>
                  Target: 2.5x–4.0x
                </div>
              </div>
              <div className="p-3 rounded text-center" style={{ backgroundColor: '#0A0E17' }}>
                <div className="text-xs mb-1" style={{ color: '#8892A4' }}>IRR</div>
                <div className="text-2xl font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: irrColor }}>
                  {calc.irr !== null ? `${formatNumber(calc.irr * 100, 1)}%` : 'N/A'}
                </div>
                <div className="text-[10px] mt-1" style={{ color: '#8892A4' }}>
                  Target: 20–30%
                </div>
              </div>
            </div>

            <div className="px-3 py-2 rounded space-y-1.5" style={{ backgroundColor: '#0A0E17' }}>
              <MetricRow label="Equity Invested" value={formatCurrency(calc.sponsorEquityLBO)} />
              <MetricRow label="Equity Returned" value={formatCurrency(calc.equityReturnedToSponsor)} bold highlight />
              <MetricRow label="Total Gain" value={formatCurrency(calc.gainOnSale)} />
              <MetricRow label="Hold Period" value={`${l.exitYear} years`} />
            </div>

            {/* Returns benchmark indicator */}
            <div className="flex items-center gap-2 py-2 px-3 rounded" style={{ backgroundColor: `${irrColor}15` }}>
              {calc.irr !== null && calc.irr >= 0.20 ? (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: irrColor }} />
              ) : (
                <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: irrColor }} />
              )}
              <span className="text-xs font-medium" style={{ color: irrColor }}>
                {calc.irr === null
                  ? 'IRR calculation did not converge'
                  : calc.irr >= 0.30 ? 'Exceptional returns — above Egypt/MENA PE benchmark'
                  : calc.irr >= 0.20 ? 'Solid returns — within Egypt/MENA PE target range'
                  : calc.irr >= 0.15 ? 'Below hurdle rate — review operating assumptions'
                  : 'Returns below minimum threshold'}
              </span>
            </div>
          </div>
        </OutputPanel>
      </div>

      {/* ── RETURNS ATTRIBUTION CHART ── */}
      <OutputPanel title="Returns Attribution Bridge">
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attributionData} layout="vertical" barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" />
              <XAxis type="number" tick={{ fill: '#8892A4', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
                tickFormatter={(v) => `${v.toFixed(0)}M`} />
              <YAxis dataKey="name" type="category" width={140}
                tick={{ fill: '#F0F4FF', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#141B2D', borderColor: '#1E2D45', borderRadius: '8px',
                  color: '#F0F4FF', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px',
                }}
                formatter={(value) => [`${formatNumber(value, 1)}M`, undefined]}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {attributionData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </OutputPanel>

      {/* ── SCENARIO MATRICES ── */}
      {scenarios && (
        <div className="space-y-6">
          <ScenarioTable
            title="IRR — Entry Multiple vs. Exit Multiple"
            rowLabel="Entry EV/EBITDA"
            colLabel="Exit EV/EBITDA"
            rows={scenarios.entryMults}
            cols={scenarios.exitMults}
            matrix={scenarios.matrix1}
            formatValue={(v) => v !== null ? `${(v * 100).toFixed(1)}%` : 'N/A'}
            colorFn={irrColorFn}
            currentRow={l.entryMultiple}
            currentCol={l.exitMultiple}
            rowSuffix="x"
            colSuffix="x"
          />
          <ScenarioTable
            title="IRR — Revenue CAGR vs. EBITDA Margin Year 5"
            rowLabel="Revenue CAGR"
            colLabel="EBITDA Margin Y5"
            rows={scenarios.cagrs}
            cols={scenarios.margins}
            matrix={scenarios.matrix2}
            formatValue={(v) => v !== null ? `${(v * 100).toFixed(1)}%` : 'N/A'}
            colorFn={irrColorFn}
            rowSuffix="%"
            colSuffix="%"
          />
          <ScenarioTable
            title="MOIC — Entry Multiple vs. Exit Year"
            rowLabel="Entry EV/EBITDA"
            colLabel="Exit Year"
            rows={scenarios.entryMults}
            cols={scenarios.exitYears}
            matrix={scenarios.matrix3}
            formatValue={(v) => `${v.toFixed(2)}x`}
            colorFn={moicColorFn}
            currentRow={l.entryMultiple}
            currentCol={l.exitYear}
            rowSuffix="x"
            colSuffix=""
          />
        </div>
      )}
    </div>
  );
}

// ── Helper components ──

function OutputPanel({ title, children }) {
  return (
    <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#141B2D', borderColor: '#1E2D45' }}>
      <div className="px-4 py-2 border-b" style={{ backgroundColor: '#0A0E17', borderColor: '#1E2D45' }}>
        <h3 className="text-sm font-semibold" style={{ color: '#C9A84C' }}>{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

function MetricRow({ label, value, bold = false, highlight = false, negative = false }) {
  return (
    <div className="flex justify-between text-xs">
      <span style={{ color: '#8892A4' }}>{label}</span>
      <span className={bold ? 'font-bold' : 'font-medium'} style={{
        fontFamily: "'IBM Plex Mono', monospace",
        color: negative ? '#f87171' : highlight ? '#4ade80' : bold ? '#C9A84C' : '#F0F4FF',
      }}>
        {value}
      </span>
    </div>
  );
}

function ScheduleSection({ label, balances, interest, amort, sweep, formatNumber }) {
  return (
    <>
      <tr style={{ backgroundColor: '#182236' }}>
        <td className="px-3 py-1.5 font-semibold" style={{ color: '#F0F4FF' }}>{label}</td>
        <td className="px-3 py-1.5 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F0F4FF' }}>
          {formatNumber(balances[0], 1)}
        </td>
        {YEARS.map((y, yi) => (
          <td key={y} className="px-3 py-1.5 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F0F4FF' }}>
            {formatNumber(balances[yi + 1], 1)}
          </td>
        ))}
      </tr>
      {interest && (
        <tr>
          <td className="px-3 py-1 pl-6" style={{ color: '#8892A4' }}>Interest</td>
          <td></td>
          {YEARS.map((y, yi) => (
            <td key={y} className="px-3 py-1 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#f87171' }}>
              ({formatNumber(interest[yi], 1)})
            </td>
          ))}
        </tr>
      )}
      {amort && (
        <tr>
          <td className="px-3 py-1 pl-6" style={{ color: '#8892A4' }}>Amortization</td>
          <td></td>
          {YEARS.map((y, yi) => (
            <td key={y} className="px-3 py-1 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#FF9800' }}>
              {amort[yi] > 0 ? `(${formatNumber(amort[yi], 1)})` : '—'}
            </td>
          ))}
        </tr>
      )}
      {sweep && (
        <tr>
          <td className="px-3 py-1 pl-6" style={{ color: '#8892A4' }}>Cash Sweep</td>
          <td></td>
          {YEARS.map((y, yi) => (
            <td key={y} className="px-3 py-1 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#4ade80' }}>
              {sweep[yi] > 0 ? `(${formatNumber(sweep[yi], 1)})` : '—'}
            </td>
          ))}
        </tr>
      )}
    </>
  );
}

function ScenarioTable({ title, rowLabel, colLabel, rows, cols, matrix, formatValue, colorFn, currentRow, currentCol, rowSuffix = '', colSuffix = '' }) {
  return (
    <OutputPanel title={title}>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="px-2 py-2 text-left font-semibold" style={{ color: '#8892A4' }}>
                {rowLabel} ↓ / {colLabel} →
              </th>
              {cols.map((c) => (
                <th key={c} className="px-2 py-2 text-center font-semibold" style={{ color: '#C9A84C' }}>
                  {c}{colSuffix}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={r}>
                <td className="px-2 py-1.5 font-semibold" style={{ color: '#C9A84C' }}>
                  {r}{rowSuffix}
                </td>
                {cols.map((c, ci) => {
                  const val = matrix[ri][ci];
                  const bg = colorFn(val);
                  const isCurrent = r === currentRow && c === currentCol;
                  return (
                    <td
                      key={c}
                      className="px-2 py-1.5 text-center font-medium"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: '#F0F4FF',
                        backgroundColor: bg,
                        border: isCurrent ? '2px solid #C9A84C' : 'none',
                      }}
                    >
                      {formatValue(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </OutputPanel>
  );
}

function irrColorFn(irr) {
  if (irr === null) return 'rgba(124, 141, 176, 0.2)';
  const pct = irr * 100;
  if (pct > 25) return 'rgba(46, 125, 50, 0.4)';
  if (pct >= 20) return 'rgba(76, 175, 80, 0.3)';
  if (pct >= 15) return 'rgba(255, 152, 0, 0.3)';
  return 'rgba(229, 57, 53, 0.3)';
}

function moicColorFn(moic) {
  if (moic > 3.0) return 'rgba(46, 125, 50, 0.4)';
  if (moic >= 2.5) return 'rgba(76, 175, 80, 0.3)';
  if (moic >= 2.0) return 'rgba(255, 152, 0, 0.3)';
  return 'rgba(229, 57, 53, 0.3)';
}
