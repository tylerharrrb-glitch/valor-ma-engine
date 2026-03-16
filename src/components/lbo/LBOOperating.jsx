import { useCallback } from 'react';
import { useDeal } from '../../context/DealContext';
import SectionHeader from '../shared/SectionHeader';
import { TrendingUp } from 'lucide-react';

const YEARS = [1, 2, 3, 4, 5];

const OP_ROWS = [
  { key: 'revenueGrowth', label: 'Revenue Growth', suffix: '%', step: 0.5 },
  { key: 'ebitdaMargin', label: 'EBITDA Margin', suffix: '%', step: 0.5 },
  { key: 'depreciationPct', label: 'Depreciation', suffix: '% rev', step: 0.1 },
  { key: 'capexPct', label: 'CapEx', suffix: '% rev', step: 0.1 },
  { key: 'cogsPct', label: 'COGS', suffix: '% rev', step: 1 },
  { key: 'dsoDays', label: 'DSO', suffix: 'days', step: 1 },
  { key: 'dioDays', label: 'DIO', suffix: 'days', step: 1 },
  { key: 'dpoDays', label: 'DPO', suffix: 'days', step: 1 },
];

export default function LBOOperating({ calc }) {
  const { state, dispatch, formatNumber } = useDeal();
  const l = state.lbo;

  const updateOp = useCallback((yearIdx, key, value) => {
    const operating = l.operating.map((op, i) =>
      i === yearIdx ? { ...op, [key]: value } : op
    );
    dispatch({ type: 'UPDATE_LBO', payload: { operating } });
  }, [l.operating, dispatch]);

  // Apply same value to all years
  const fillAllYears = useCallback((key, value) => {
    const operating = l.operating.map((op) => ({ ...op, [key]: value }));
    dispatch({ type: 'UPDATE_LBO', payload: { operating } });
  }, [l.operating, dispatch]);

  const cellInput = {
    fontFamily: "'IBM Plex Mono', monospace",
    color: '#F0F4FF',
    backgroundColor: '#0A0E17',
    borderColor: '#1E2D45',
  };

  return (
    <div className="space-y-6 mt-8">
      {/* ── 5-YEAR OPERATING MODEL INPUTS ── */}
      <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#141B2D', borderColor: '#1E2D45' }}>
        <div className="px-4 py-3 border-b flex items-center gap-2" style={{ backgroundColor: '#0A0E17', borderColor: '#1E2D45' }}>
          <TrendingUp className="w-4 h-4" style={{ color: '#C9A84C' }} />
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#C9A84C' }}>5-Year Operating Model</h3>
            <p className="text-xs mt-0.5" style={{ color: '#8892A4' }}>Enter assumptions for each year. Double-click a value to apply it to all years.</p>
          </div>
        </div>

        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left px-2 py-2 text-xs font-semibold" style={{ color: '#8892A4', minWidth: '160px' }}>Assumption</th>
                {YEARS.map((y) => (
                  <th key={y} className="text-center px-2 py-2 text-xs font-semibold" style={{ color: '#C9A84C', minWidth: '90px' }}>
                    Year {y}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {OP_ROWS.map((row, ri) => (
                <tr key={row.key} style={{ backgroundColor: ri % 2 === 0 ? '#141B2D' : '#182236' }}>
                  <td className="px-2 py-2 text-xs font-medium" style={{ color: '#F0F4FF' }}>
                    {row.label}
                    <span className="ml-1 text-[10px]" style={{ color: '#8892A4' }}>{row.suffix}</span>
                  </td>
                  {YEARS.map((y, yi) => (
                    <td key={y} className="px-1 py-1">
                      <input
                        type="number"
                        step={row.step}
                        value={l.operating[yi][row.key] || ''}
                        onChange={(e) => updateOp(yi, row.key, parseFloat(e.target.value) || 0)}
                        onDoubleClick={() => fillAllYears(row.key, l.operating[yi][row.key])}
                        className="w-full text-center text-xs px-1 py-1.5 rounded border focus:outline-none focus:border-[#C9A84C] bg-transparent transition-colors"
                        style={cellInput}
                        placeholder="0"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Derived values (read-only) */}
        {calc && (
          <div className="border-t p-4 overflow-x-auto" style={{ borderColor: '#1E2D45' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: '#C9A84C' }}>Derived Financials (EGP M)</p>
            <table className="w-full text-sm">
              <tbody>
                <DerivedRow label="Revenue" values={calc.revenue} formatNumber={formatNumber} />
                <DerivedRow label="EBITDA" values={calc.ebitda} formatNumber={formatNumber} bold />
                <DerivedRow label="Depreciation" values={calc.depreciation} formatNumber={formatNumber} alt negative />
                <DerivedRow label="EBIT" values={calc.ebit} formatNumber={formatNumber} />
                <DerivedRow label="Interest Expense" values={calc.totalInterest} formatNumber={formatNumber} alt negative />
                <DerivedRow label="EBT" values={calc.ebt} formatNumber={formatNumber} />
                <DerivedRow label="Taxes" values={calc.taxes} formatNumber={formatNumber} alt negative />
                <DerivedRow label="Net Income" values={calc.netIncome} formatNumber={formatNumber} bold />
                <DerivedRow label="CapEx" values={calc.capex} formatNumber={formatNumber} alt negative />
                <DerivedRow label="Δ NWC" values={calc.changeInNWC} formatNumber={formatNumber} />
                <DerivedRow label="FCFF" values={calc.fcff} formatNumber={formatNumber} bold highlight />
                <DerivedRow label="FCFE" values={calc.fcfe} formatNumber={formatNumber} alt bold />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function DerivedRow({ label, values, formatNumber, bold = false, alt = false, highlight = false, negative = false }) {
  return (
    <tr style={{ backgroundColor: alt ? '#182236' : '#141B2D' }}>
      <td
        className={`px-2 py-1.5 text-xs ${bold ? 'font-bold' : 'font-medium'}`}
        style={{ color: bold ? '#C9A84C' : '#F0F4FF', minWidth: '160px' }}
      >
        {label}
      </td>
      {values.map((v, i) => (
        <td
          key={i}
          className={`px-2 py-1.5 text-right text-xs ${bold ? 'font-bold' : ''}`}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            color: v < 0 ? '#f87171' : highlight ? '#4ade80' : bold ? '#C9A84C' : '#F0F4FF',
            minWidth: '90px',
          }}
        >
          {negative && v > 0 ? `(${formatNumber(v, 1)})` : formatNumber(v, 1)}
        </td>
      ))}
    </tr>
  );
}
