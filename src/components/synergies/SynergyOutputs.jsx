import { useDeal } from '../../context/DealContext';
import { EGYPT_PARAMS } from '../../constants/egyptParams';
import { useMergerCalculations } from '../../hooks/useMergerCalculations';
import { useSynergyCalculations } from '../../hooks/useSynergyCalculations';
import { CheckCircle2, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const YEARS = [1, 2, 3, 4, 5];

export default function SynergyOutputs() {
  const { state, formatNumber, formatCurrency } = useDeal();
  const { acquirer, target, dealTerms, synergies } = state;

  // Get goodwill from merger calculations
  const mergerCalc = useMergerCalculations(acquirer, target, dealTerms);
  const goodwillCreated = mergerCalc?.goodwillCreated || 0;
  const purchasePriceEquity = mergerCalc?.purchasePriceEquity || 0;

  const calc = useSynergyCalculations(synergies, goodwillCreated, purchasePriceEquity);

  if (!calc) return null;

  // Check if any synergies are entered
  const hasData = calc.grossSynergies.some((v) => v > 0) || calc.totalOneTimeIntegrationCosts > 0;

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center py-16 rounded-lg border" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
        <TrendingUp className="w-8 h-8 mb-3" style={{ color: '#7C8DB0' }} />
        <p className="text-sm" style={{ color: '#7C8DB0' }}>Enter synergy inputs above to generate analysis</p>
      </div>
    );
  }

  // Chart data
  const chartData = YEARS.map((y, yi) => ({
    name: `Year ${y}`,
    'Revenue Synergies': calc.grossRevenueSynergies[yi],
    'Cost Synergies': calc.grossCostSynergies[yi],
    'Net Synergies': calc.netSynergies[yi],
  }));

  const adequacyConfig = {
    strong: { icon: CheckCircle2, label: 'Synergies more than justify goodwill', color: '#4CAF50' },
    moderate: { icon: AlertTriangle, label: 'Synergies partially justify goodwill', color: '#FF9800' },
    weak: { icon: XCircle, label: 'Goodwill at significant impairment risk', color: '#E53935' },
    none: { icon: AlertTriangle, label: 'No goodwill data (enter merger model inputs)', color: '#7C8DB0' },
  };

  const adequacy = adequacyConfig[calc.synergyAdequacy];
  const AdequacyIcon = adequacy.icon;

  return (
    <div className="space-y-6 mt-8">
      {/* ── SYNERGY SUMMARY TABLE ── */}
      <OutputPanel title="Synergy Summary (EGP M)">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#0B0F1A' }}>
                <th className="text-left px-4 py-2 text-xs font-semibold" style={{ color: '#C5A44E' }}>Metric</th>
                {YEARS.map((y) => (
                  <th key={y} className="text-right px-4 py-2 text-xs font-semibold" style={{ color: '#C5A44E' }}>Year {y}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <SummaryRow label="Gross Revenue Synergies" values={calc.grossRevenueSynergies} formatNumber={formatNumber} />
              <SummaryRow label="Gross Cost Synergies (phased)" values={calc.grossCostSynergies} formatNumber={formatNumber} alt />
              <SummaryRow label="Total Gross Synergies" values={calc.grossSynergies} formatNumber={formatNumber} bold />
              <SummaryRow label={`Tax @ ${(EGYPT_PARAMS.CORPORATE_TAX_RATE * 100).toFixed(1)}%`} values={calc.taxOnSynergies} formatNumber={formatNumber} alt negative />
              <SummaryRow label="Net Synergies (After-Tax)" values={calc.netSynergies} formatNumber={formatNumber} bold highlight />
              <SummaryRow label="Cumulative Net Synergies" values={calc.cumulativeNetSynergies} formatNumber={formatNumber} alt />
            </tbody>
          </table>
        </div>
      </OutputPanel>

      {/* ── COST BREAKDOWN + INTEGRATION COSTS ── */}
      <div className="grid grid-cols-2 gap-6">
        <OutputPanel title="Cost Synergy Breakdown (Run-Rate)">
          <OutputRow label="Headcount Reduction" value={`${formatNumber(calc.grossHeadcountSynergy, 1)}M`} />
          <OutputRow label="  └ Salary Savings" value={`${formatNumber(calc.annualSalarySavings, 1)}M`} sub />
          <OutputRow label="  └ Social Insurance Savings" value={`${formatNumber(calc.annualSocialInsuranceSavings, 1)}M`} sub />
          <OutputRow label="Facility Consolidation" value={`${formatNumber(calc.facilityConsolidationSynergy, 1)}M`} />
          <OutputRow label="Procurement Savings" value={`${formatNumber(calc.procurementSynergy, 1)}M`} />
          <OutputRow label="Technology Consolidation" value={`${formatNumber(calc.itSynergy, 1)}M`} />
          <OutputRow label="SG&A Overlap" value={`${formatNumber(calc.sgaSynergy, 1)}M`} />
          <OutputRow label="Total Run-Rate" value={`${formatNumber(calc.totalRunRateCostSynergy, 1)}M`} bold />
        </OutputPanel>

        <OutputPanel title="Integration Costs (Year 0)">
          <OutputRow label="Severance Costs" value={`${formatNumber(calc.severanceCosts, 1)}M`} />
          <OutputRow label="Facility Closure Costs" value={`${formatNumber(synergies.facilityClosureCosts, 1)}M`} />
          <OutputRow label="IT Integration Costs" value={`${formatNumber(synergies.itIntegrationCosts, 1)}M`} />
          <OutputRow label="Rebranding Costs" value={`${formatNumber(synergies.rebrandingCosts, 1)}M`} />
          <OutputRow label="Other Integration Costs" value={`${formatNumber(synergies.otherIntegrationCosts, 1)}M`} />
          <OutputRow label="Total (Pre-Tax)" value={`${formatNumber(calc.totalOneTimeIntegrationCosts, 1)}M`} bold />
          <OutputRow label="Total (After-Tax)" value={`${formatNumber(calc.integrationCostsAfterTax, 1)}M`} bold highlight />
        </OutputPanel>
      </div>

      {/* ── VALUATION METRICS ── */}
      <OutputPanel title="Synergy Valuation">
        <div className="grid grid-cols-2 gap-x-8">
          <div className="space-y-2">
            <OutputRow label="NPV of Synergies" value={formatCurrency(calc.npvSynergies)} bold />
            <OutputRow label="Synergies as % of Purchase Price" value={`${formatNumber(calc.synergiesAsPercentOfPP, 1)}%`} />
            <OutputRow
              label="Payback Period"
              value={
                calc.paybackPeriod === 0
                  ? 'Immediate'
                  : calc.paybackPeriod !== null
                    ? `~${calc.paybackPeriod.toFixed(2)} years`
                    : '> 5 Years'
              }
            />
          </div>
          <div className="space-y-2">
            <OutputRow
              label="Goodwill Coverage Ratio"
              value={
                calc.goodwillCoverageRatio !== null
                  ? `${formatNumber(calc.goodwillCoverageRatio, 1)}%`
                  : '—'
              }
              bold
            />
            {/* Adequacy Indicator */}
            <div className="flex items-center gap-2 py-2 px-3 rounded mt-2" style={{ backgroundColor: `${adequacy.color}15` }}>
              <AdequacyIcon className="w-4 h-4 flex-shrink-0" style={{ color: adequacy.color }} />
              <span className="text-xs font-medium" style={{ color: adequacy.color }}>
                {adequacy.label}
              </span>
            </div>
          </div>
        </div>
      </OutputPanel>

      {/* ── SYNERGY CHART ── */}
      <OutputPanel title="Synergy Build-Up">
        <div style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2C3E6B" />
              <XAxis dataKey="name" tick={{ fill: '#7C8DB0', fontSize: 12 }} />
              <YAxis tick={{ fill: '#7C8DB0', fontSize: 12, fontFamily: "'IBM Plex Mono', monospace" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A2340',
                  borderColor: '#2C3E6B',
                  borderRadius: '8px',
                  color: '#F4EDE4',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '12px',
                }}
                formatter={(value) => [`${value.toFixed(1)}M`, undefined]}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px', color: '#7C8DB0' }}
              />
              <Bar dataKey="Revenue Synergies" stackId="gross" fill="#C5A44E" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Cost Synergies" stackId="gross" fill="#4CAF50" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Net Synergies" fill="rgba(197, 164, 78, 0.3)" stroke="#C5A44E" strokeWidth={1} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </OutputPanel>
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
      <div className="p-4 space-y-2">
        {children}
      </div>
    </div>
  );
}

function OutputRow({ label, value, bold = false, highlight = false, sub = false }) {
  return (
    <div className="flex items-center justify-between py-1 border-b last:border-0" style={{ borderColor: 'rgba(44, 62, 107, 0.5)' }}>
      <span
        className={`text-xs ${bold ? 'font-semibold' : ''}`}
        style={{ color: sub ? '#5a6d94' : '#7C8DB0', paddingLeft: sub ? '8px' : '0' }}
      >
        {label}
      </span>
      <span
        className={`text-sm ${bold ? 'font-bold' : 'font-medium'}`}
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          color: highlight ? '#4CAF50' : bold ? '#C5A44E' : '#F4EDE4',
        }}
      >
        {value}
      </span>
    </div>
  );
}

function SummaryRow({ label, values, formatNumber, bold = false, alt = false, highlight = false, negative = false }) {
  return (
    <tr style={{ backgroundColor: alt ? '#1e2a4a' : '#1A2340' }}>
      <td
        className={`px-4 py-2 text-xs ${bold ? 'font-bold' : 'font-medium'}`}
        style={{ color: bold ? '#C5A44E' : '#F4EDE4' }}
      >
        {label}
      </td>
      {values.map((v, i) => (
        <td
          key={i}
          className={`px-4 py-2 text-right text-xs ${bold ? 'font-bold' : ''}`}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            color: highlight ? '#4CAF50' : negative ? '#E53935' : bold ? '#C5A44E' : '#F4EDE4',
          }}
        >
          {negative ? `(${formatNumber(v, 1)})` : formatNumber(v, 1)}
        </td>
      ))}
    </tr>
  );
}
