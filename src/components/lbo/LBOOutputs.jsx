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
      <div className="flex flex-col items-center justify-center py-16 rounded-lg border mt-8" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
        <TrendingDown className="w-8 h-8 mb-3" style={{ color: '#7C8DB0' }} />
        <p className="text-sm" style={{ color: '#7C8DB0' }}>Enter operating model assumptions to generate LBO analysis</p>
      </div>
    );
  }

  // Returns attribution chart data
  const attributionData = [
    { name: 'EBITDA Growth', value: calc.ebitdaGrowthContrib, color: '#C5A44E' },
    { name: 'Multiple Expansion', value: calc.multipleExpansionContrib, color: '#2C3E6B' },
    { name: 'Debt Paydown', value: calc.debtPaydownContrib, color: '#4CAF50' },
  ];

  // IRR color
  const irrColor = calc.irr !== null
    ? calc.irr >= 0.25 ? '#4CAF50' : calc.irr >= 0.20 ? '#4CAF50' : calc.irr >= 0.15 ? '#FF9800' : '#E53935'
    : '#7C8DB0';

  const moicColor = calc.moic >= 3.0 ? '#4CAF50' : calc.moic >= 2.5 ? '#4CAF50' : calc.moic >= 2.0 ? '#FF9800' : '#E53935';

  return (
    <div className="space-y-6 mt-8">
      {/* ── COVENANT ALERTS ── */}
      {calc.covenantBreaches.map((b, i) => (
        <div key={i} className="flex items-center gap-2 px-4 py-3 rounded border" style={{ backgroundColor: 'rgba(229, 57, 53, 0.1)', borderColor: '#E53935' }}>
          <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: '#E53935' }} />
          <span className="text-sm font-medium" style={{ color: '#E53935' }}>
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
              <tr style={{ backgroundColor: '#0B0F1A' }}>
                <th className="text-left px-3 py-2 font-semibold" style={{ color: '#C5A44E', minWidth: '180px' }}>Tranche / Metric</th>
                <th className="text-right px-3 py-2 font-semibold" style={{ color: '#C5A44E' }}>Entry</th>
                {YEARS.map((y) => (
                  <th key={y} className="text-right px-3 py-2 font-semibold" style={{ color: '#C5A44E' }}>Yr {y}</th>
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
              <tr style={{ backgroundColor: '#1e2a4a' }}>
                <td className="px-3 py-1.5 font-semibold" style={{ color: '#F4EDE4' }}>Mezzanine</td>
                <td className="px-3 py-1.5 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>
                  {formatNumber(calc.balM[0], 1)}
                </td>
                {YEARS.map((y, yi) => (
                  <td key={y} className="px-3 py-1.5 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>
                    {formatNumber(calc.balM[yi + 1], 1)}
                  </td>
                ))}
              </tr>
              {l.mezzPIK && (
                <tr>
                  <td className="px-3 py-1 pl-6" style={{ color: '#7C8DB0' }}>PIK Interest</td>
                  <td></td>
                  {YEARS.map((y, yi) => (
                    <td key={y} className="px-3 py-1 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#FF9800' }}>
                      {formatNumber(calc.interestMPIK[yi], 1)}
                    </td>
                  ))}
                </tr>
              )}

              {/* Totals */}
              <tr style={{ borderTop: '2px solid #C5A44E' }}>
                <td className="px-3 py-2 font-bold" style={{ color: '#C5A44E' }}>Total Debt</td>
                <td className="px-3 py-2 text-right font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#C5A44E' }}>
                  {formatNumber(calc.totalDebtAtEntry, 1)}
                </td>
                {YEARS.map((y, yi) => (
                  <td key={y} className="px-3 py-2 text-right font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#C5A44E' }}>
                    {formatNumber(calc.totalDebt[yi], 1)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-3 py-1.5" style={{ color: '#7C8DB0' }}>Debt / EBITDA</td>
                <td className="px-3 py-1.5 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>
                  {formatNumber(calc.debtToEBITDAEntry, 1)}x
                </td>
                {YEARS.map((y, yi) => (
                  <td key={y} className="px-3 py-1.5 text-right" style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: calc.debtToEBITDA[yi] > l.maxLeverageCovenant ? '#E53935' : '#F4EDE4',
                  }}>
                    {calc.debtToEBITDA[yi] !== null ? `${formatNumber(calc.debtToEBITDA[yi], 1)}x` : '—'}
                  </td>
                ))}
              </tr>
              <tr style={{ backgroundColor: '#1e2a4a' }}>
                <td className="px-3 py-1.5" style={{ color: '#7C8DB0' }}>Interest Coverage</td>
                <td></td>
                {YEARS.map((y, yi) => (
                  <td key={y} className="px-3 py-1.5 text-right" style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: calc.interestCoverageRatio[yi] !== null && calc.interestCoverageRatio[yi] < l.minICRCovenant ? '#E53935' : '#F4EDE4',
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
              <label className="text-xs font-medium" style={{ color: '#7C8DB0' }}>Exit Year</label>
              <select
                value={l.exitYear}
                onChange={(e) => update({ exitYear: parseInt(e.target.value) })}
                className="text-xs px-2 py-1 rounded border focus:outline-none cursor-pointer"
                style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B', color: '#F4EDE4' }}
              >
                {[3, 4, 5, 6, 7].map((y) => (
                  <option key={y} value={y}>Year {y}</option>
                ))}
              </select>
            </div>
            <InputField label="Exit EV/EBITDA Multiple" value={l.exitMultiple} onChange={(v) => update({ exitMultiple: v })} suffix="x" step={0.1} tooltip="Expected exit EV/EBITDA multiple" />
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium" style={{ color: '#7C8DB0' }}>Exit Route</label>
              <select
                value={l.exitRoute}
                onChange={(e) => update({ exitRoute: e.target.value })}
                className="text-xs px-2 py-1 rounded border focus:outline-none cursor-pointer"
                style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B', color: '#F4EDE4' }}
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
            <div className="mt-3 px-3 py-2 rounded space-y-1.5" style={{ backgroundColor: '#0B0F1A' }}>
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
              <div className="p-3 rounded text-center" style={{ backgroundColor: '#0B0F1A' }}>
                <div className="text-xs mb-1" style={{ color: '#7C8DB0' }}>MOIC</div>
                <div className="text-2xl font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: moicColor }}>
                  {formatNumber(calc.moic, 2)}x
                </div>
                <div className="text-[10px] mt-1" style={{ color: '#7C8DB0' }}>
                  Target: 2.5x–4.0x
                </div>
              </div>
              <div className="p-3 rounded text-center" style={{ backgroundColor: '#0B0F1A' }}>
                <div className="text-xs mb-1" style={{ color: '#7C8DB0' }}>IRR</div>
                <div className="text-2xl font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: irrColor }}>
                  {calc.irr !== null ? `${formatNumber(calc.irr * 100, 1)}%` : 'N/A'}
                </div>
                <div className="text-[10px] mt-1" style={{ color: '#7C8DB0' }}>
                  Target: 20–30%
                </div>
              </div>
            </div>

            <div className="px-3 py-2 rounded space-y-1.5" style={{ backgroundColor: '#0B0F1A' }}>
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
              <CartesianGrid strokeDasharray="3 3" stroke="#2C3E6B" />
              <XAxis type="number" tick={{ fill: '#7C8DB0', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
                tickFormatter={(v) => `${v.toFixed(0)}M`} />
              <YAxis dataKey="name" type="category" width={140}
                tick={{ fill: '#F4EDE4', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A2340', borderColor: '#2C3E6B', borderRadius: '8px',
                  color: '#F4EDE4', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px',
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
    <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
      <div className="px-4 py-2 border-b" style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B' }}>
        <h3 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>{title}</h3>
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
      <span style={{ color: '#7C8DB0' }}>{label}</span>
      <span className={bold ? 'font-bold' : 'font-medium'} style={{
        fontFamily: "'IBM Plex Mono', monospace",
        color: negative ? '#E53935' : highlight ? '#4CAF50' : bold ? '#C5A44E' : '#F4EDE4',
      }}>
        {value}
      </span>
    </div>
  );
}

function ScheduleSection({ label, balances, interest, amort, sweep, formatNumber }) {
  return (
    <>
      <tr style={{ backgroundColor: '#1e2a4a' }}>
        <td className="px-3 py-1.5 font-semibold" style={{ color: '#F4EDE4' }}>{label}</td>
        <td className="px-3 py-1.5 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>
          {formatNumber(balances[0], 1)}
        </td>
        {YEARS.map((y, yi) => (
          <td key={y} className="px-3 py-1.5 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>
            {formatNumber(balances[yi + 1], 1)}
          </td>
        ))}
      </tr>
      {interest && (
        <tr>
          <td className="px-3 py-1 pl-6" style={{ color: '#7C8DB0' }}>Interest</td>
          <td></td>
          {YEARS.map((y, yi) => (
            <td key={y} className="px-3 py-1 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#E53935' }}>
              ({formatNumber(interest[yi], 1)})
            </td>
          ))}
        </tr>
      )}
      {amort && (
        <tr>
          <td className="px-3 py-1 pl-6" style={{ color: '#7C8DB0' }}>Amortization</td>
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
          <td className="px-3 py-1 pl-6" style={{ color: '#7C8DB0' }}>Cash Sweep</td>
          <td></td>
          {YEARS.map((y, yi) => (
            <td key={y} className="px-3 py-1 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#4CAF50' }}>
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
              <th className="px-2 py-2 text-left font-semibold" style={{ color: '#7C8DB0' }}>
                {rowLabel} ↓ / {colLabel} →
              </th>
              {cols.map((c) => (
                <th key={c} className="px-2 py-2 text-center font-semibold" style={{ color: '#C5A44E' }}>
                  {c}{colSuffix}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={r}>
                <td className="px-2 py-1.5 font-semibold" style={{ color: '#C5A44E' }}>
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
                        color: '#F4EDE4',
                        backgroundColor: bg,
                        border: isCurrent ? '2px solid #C5A44E' : 'none',
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
