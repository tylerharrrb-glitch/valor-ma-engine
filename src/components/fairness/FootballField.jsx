import { useMemo, useCallback } from 'react';
import { useDeal } from '../../context/DealContext';
import InputField from '../shared/InputField';
import SectionHeader from '../shared/SectionHeader';
import { Scale, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Cell } from 'recharts';

const METHODOLOGIES = [
  { key: 'dcf', label: 'DCF Valuation', lowKey: 'dcfLow', highKey: 'dcfHigh' },
  { key: 'comps', label: 'Trading Comparables', lowKey: 'compsLow', highKey: 'compsHigh' },
  { key: 'precedent', label: 'Precedent Transactions', lowKey: 'precedentLow', highKey: 'precedentHigh' },
  { key: 'week52', label: '52-Week Trading Range', lowKey: 'week52Low', highKey: 'week52High' },
  { key: 'analyst', label: 'Analyst Price Targets', lowKey: 'analystLow', highKey: 'analystHigh' },
  { key: 'lbo', label: 'LBO Floor Valuation', lowKey: 'lboLow', highKey: 'lboHigh' },
];

export default function FootballField() {
  const { state, dispatch, formatNumber } = useDeal();
  const f = state.fairness;
  const offerPrice = state.dealTerms.offerPricePerShare;

  const update = useCallback((payload) => {
    dispatch({ type: 'UPDATE_FAIRNESS', payload });
  }, [dispatch]);

  const analysis = useMemo(() => {
    const methods = METHODOLOGIES
      .filter((m) => f[m.lowKey] > 0 || f[m.highKey] > 0)
      .map((m) => {
        const low = f[m.lowKey] || 0;
        const high = f[m.highKey] || 0;
        const midpoint = (low + high) / 2;
        const premiumToMidpoint = midpoint > 0
          ? ((offerPrice / midpoint) - 1) * 100
          : 0;
        const isWithinRange = offerPrice >= low && offerPrice <= high;

        // Bar color logic
        let barColor = '#C5A44E'; // within range
        if (offerPrice < low) barColor = '#2C3E6B'; // below range
        if (offerPrice > high) barColor = '#4CAF50'; // above range

        return {
          ...m,
          low, high, midpoint,
          premiumToMidpoint,
          isWithinRange,
          barColor,
          // For chart: spacer = low, visible bar = (high - low)
          spacer: low,
          range: high - low,
        };
      });

    const totalMethodologies = methods.length;
    const methodologiesInRange = methods.filter((m) => m.isWithinRange).length;
    const isFair = totalMethodologies > 0
      && methodologiesInRange >= Math.ceil(totalMethodologies * 0.6);

    return { methods, totalMethodologies, methodologiesInRange, isFair };
  }, [f, offerPrice]);

  const hasData = analysis.totalMethodologies > 0 && offerPrice > 0;

  return (
    <div className="space-y-8 animate-fade-in">
      <SectionHeader
        title="Fairness Opinion"
        subtitle="Multi-methodology valuation range analysis — required by FRA for mandatory tender offers on EGX-listed targets"
      />

      {/* ── VALUATION RANGE INPUTS ── */}
      <div className="rounded-lg border p-4" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
        <div className="flex items-center gap-2 mb-4">
          <Scale className="w-4 h-4" style={{ color: '#C5A44E' }} />
          <h4 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>Valuation Ranges (EGP per Share)</h4>
          <span className="ml-auto text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#0B0F1A', color: '#7C8DB0' }}>
            Offer Price: <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: offerPrice > 0 ? '#C5A44E' : '#7C8DB0' }}>
              {offerPrice > 0 ? `EGP ${formatNumber(offerPrice, 2)}` : '— (set in Merger Model)'}
            </span>
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {METHODOLOGIES.map((m) => (
            <div key={m.key} className="p-3 rounded border" style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B' }}>
              <p className="text-xs font-medium mb-2" style={{ color: '#F4EDE4' }}>{m.label}</p>
              <div className="grid grid-cols-2 gap-2">
                <InputField label="Low" value={f[m.lowKey]} onChange={(v) => update({ [m.lowKey]: v })} suffix="EGP" step={0.1} />
                <InputField label="High" value={f[m.highKey]} onChange={(v) => update({ [m.highKey]: v })} suffix="EGP" step={0.1} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTBALL FIELD CHART ── */}
      {hasData && (
        <>
          <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
            <div className="px-4 py-2 border-b" style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B' }}>
              <h3 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>Football Field Chart</h3>
            </div>
            <div className="p-4" style={{ height: 60 + analysis.methods.length * 55 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analysis.methods}
                  layout="vertical"
                  barSize={28}
                  margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2C3E6B" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fill: '#7C8DB0', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
                    tickFormatter={(v) => `${v.toFixed(0)}`}
                    label={{ value: 'EGP per Share', position: 'insideBottom', offset: -5, fill: '#7C8DB0', fontSize: 11 }}
                  />
                  <YAxis
                    dataKey="label"
                    type="category"
                    width={170}
                    tick={{ fill: '#F4EDE4', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1A2340', borderColor: '#2C3E6B', borderRadius: '8px',
                      color: '#F4EDE4', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px',
                    }}
                    formatter={(value, name) => {
                      if (name === 'spacer') return [null, null];
                      return [`EGP ${value.toFixed(2)}`, 'Range Width'];
                    }}
                    labelFormatter={(label) => label}
                  />
                  {/* Invisible spacer bar from 0 to low */}
                  <Bar dataKey="spacer" stackId="a" fill="transparent" />
                  {/* Visible bar from low to high */}
                  <Bar dataKey="range" stackId="a" radius={[0, 4, 4, 0]}>
                    {analysis.methods.map((entry, i) => (
                      <Cell key={i} fill={entry.barColor} />
                    ))}
                  </Bar>
                  {/* Offer price reference line */}
                  <ReferenceLine
                    x={offerPrice}
                    stroke="#E53935"
                    strokeWidth={2}
                    strokeDasharray="5 3"
                    label={{
                      value: `Offer: ${formatNumber(offerPrice, 2)}`,
                      position: 'top',
                      fill: '#E53935',
                      fontSize: 11,
                      fontWeight: 'bold',
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── PER-METHODOLOGY ANALYSIS TABLE ── */}
          <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
            <div className="px-4 py-2 border-b" style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B' }}>
              <h3 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>Per-Methodology Analysis</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: '#0B0F1A' }}>
                    <th className="text-left px-4 py-2 text-xs font-semibold" style={{ color: '#C5A44E' }}>Methodology</th>
                    <th className="text-right px-4 py-2 text-xs font-semibold" style={{ color: '#C5A44E' }}>Low</th>
                    <th className="text-right px-4 py-2 text-xs font-semibold" style={{ color: '#C5A44E' }}>Midpoint</th>
                    <th className="text-right px-4 py-2 text-xs font-semibold" style={{ color: '#C5A44E' }}>High</th>
                    <th className="text-right px-4 py-2 text-xs font-semibold" style={{ color: '#C5A44E' }}>Premium / (Discount)</th>
                    <th className="text-center px-4 py-2 text-xs font-semibold" style={{ color: '#C5A44E' }}>Within Range</th>
                  </tr>
                </thead>
                <tbody>
                  {analysis.methods.map((m, i) => (
                    <tr key={m.key} style={{ backgroundColor: i % 2 === 0 ? '#1A2340' : '#1e2a4a' }}>
                      <td className="px-4 py-2 text-xs font-medium" style={{ color: '#F4EDE4' }}>{m.label}</td>
                      <td className="px-4 py-2 text-right text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>
                        {formatNumber(m.low, 2)}
                      </td>
                      <td className="px-4 py-2 text-right text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#7C8DB0' }}>
                        {formatNumber(m.midpoint, 2)}
                      </td>
                      <td className="px-4 py-2 text-right text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>
                        {formatNumber(m.high, 2)}
                      </td>
                      <td className="px-4 py-2 text-right text-xs font-medium" style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: m.premiumToMidpoint >= 0 ? '#4CAF50' : '#E53935',
                      }}>
                        {m.premiumToMidpoint >= 0 ? '+' : ''}{formatNumber(m.premiumToMidpoint, 1)}%
                      </td>
                      <td className="px-4 py-2 text-center">
                        {m.isWithinRange
                          ? <CheckCircle2 className="w-4 h-4 inline" style={{ color: '#4CAF50' }} />
                          : <XCircle className="w-4 h-4 inline" style={{ color: '#E53935' }} />
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── FAIRNESS DETERMINATION ── */}
          <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
            <div className="px-4 py-2 border-b" style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B' }}>
              <h3 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>Fairness Determination</h3>
            </div>
            <div className="p-6">
              {/* Verdict */}
              <div className="flex items-center gap-3 mb-4">
                {analysis.isFair ? (
                  <CheckCircle2 className="w-8 h-8" style={{ color: '#4CAF50' }} />
                ) : (
                  <XCircle className="w-8 h-8" style={{ color: '#E53935' }} />
                )}
                <div>
                  <span className="text-lg font-bold" style={{
                    fontFamily: "'Playfair Display', serif",
                    color: analysis.isFair ? '#4CAF50' : '#E53935',
                  }}>
                    {analysis.isFair ? 'FAIR ✅' : 'OUTSIDE FAIR RANGE ❌'}
                  </span>
                  <p className="text-xs mt-1" style={{ color: '#7C8DB0' }}>
                    {analysis.methodologiesInRange} of {analysis.totalMethodologies} methodologies
                    ({analysis.totalMethodologies > 0
                      ? formatNumber((analysis.methodologiesInRange / analysis.totalMethodologies) * 100, 0)
                      : 0}%) contain the offer price — threshold: ≥60%
                  </p>
                </div>
              </div>

              {/* Opinion Text */}
              <div className="px-4 py-3 rounded border" style={{
                backgroundColor: analysis.isFair ? 'rgba(76, 175, 80, 0.08)' : 'rgba(229, 57, 53, 0.08)',
                borderColor: analysis.isFair ? 'rgba(76, 175, 80, 0.3)' : 'rgba(229, 57, 53, 0.3)',
              }}>
                <p className="text-sm italic" style={{ color: '#F4EDE4', lineHeight: 1.6 }}>
                  {analysis.isFair
                    ? '"Based on our analyses, the consideration to be received is fair from a financial point of view to the shareholders."'
                    : '"The consideration falls outside the majority of value ranges derived from our financial analyses."'
                  }
                </p>
              </div>

              {/* Regulatory Disclosure */}
              <div className="mt-4 flex items-start gap-2 px-3 py-2 rounded" style={{ backgroundColor: '#0B0F1A' }}>
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#FF9800' }} />
                <p className="text-[11px] leading-relaxed" style={{ color: '#7C8DB0' }}>
                  This analysis is prepared in reference to the requirements of the Financial Regulatory Authority
                  (FRA) under Capital Market Law No. 95 of 1992 and its executive regulations. This analysis does
                  not constitute a formal fairness opinion and should not be relied upon as such without independent
                  professional review.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Empty state */}
      {!hasData && (
        <div className="flex flex-col items-center justify-center py-16 rounded-lg border" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
          <Scale className="w-8 h-8 mb-3" style={{ color: '#7C8DB0' }} />
          <p className="text-sm" style={{ color: '#7C8DB0' }}>
            Enter valuation ranges above and set an offer price in the Merger Model to generate fairness analysis
          </p>
        </div>
      )}
    </div>
  );
}
