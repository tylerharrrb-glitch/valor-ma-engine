import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine, ResponsiveContainer, LabelList } from 'recharts';

export default function AccretionChart({ calc, acquirerName }) {
  if (!calc) return null;

  const data = [
    {
      name: acquirerName || 'Standalone',
      value: calc.acquirerStandaloneEPS,
      fill: '#C5A44E',
    },
    {
      name: 'Target NI Add',
      value: calc.proFormaEPS[0] - calc.acquirerStandaloneEPS + calc.goodwillAmortizationAfterTax / calc.proFormaSharesOutstanding + calc.totalIncrementalInterestAfterTax / calc.proFormaSharesOutstanding - calc.afterTaxSynergies[0] / calc.proFormaSharesOutstanding,
      fill: '#4CAF50',
    },
    {
      name: 'Synergies Y1',
      value: calc.afterTaxSynergies[0] / calc.proFormaSharesOutstanding,
      fill: '#2E7D32',
    },
    {
      name: 'Goodwill Drag',
      value: -(calc.goodwillAmortizationAfterTax / calc.proFormaSharesOutstanding),
      fill: '#E53935',
    },
    {
      name: 'Interest Drag',
      value: -(calc.totalIncrementalInterestAfterTax / calc.proFormaSharesOutstanding),
      fill: '#FF9800',
    },
    {
      name: 'Share Dilution',
      value: 0, // The dilution effect is already embedded in the denominator change
      fill: '#7C8DB0',
    },
    {
      name: 'Pro-Forma Y1',
      value: calc.proFormaEPS[0],
      fill: calc.accretionDilution[0] >= 0 ? '#4CAF50' : '#E53935',
    },
  ].filter(d => d.name !== 'Share Dilution'); // Remove zero entry

  // Build waterfall data
  const waterfallData = [];
  let runningTotal = 0;

  // Standalone EPS
  waterfallData.push({
    name: acquirerName ? `${acquirerName} EPS` : 'Standalone EPS',
    base: 0,
    value: calc.acquirerStandaloneEPS,
    total: calc.acquirerStandaloneEPS,
    fill: '#C5A44E',
    label: `EGP ${calc.acquirerStandaloneEPS.toFixed(4)}`,
  });
  runningTotal = calc.acquirerStandaloneEPS;

  // Build bridge items
  const targetContrib = calc.proFormaNI[0] - calc.acquirerStandaloneEPS * calc.proFormaSharesOutstanding;
  // Actually let's show a clean bridge from standalone EPS to PF EPS
  const pfEPS = calc.proFormaEPS[0];
  const delta = pfEPS - calc.acquirerStandaloneEPS;

  waterfallData.push({
    name: 'Net Deal Impact',
    base: Math.min(calc.acquirerStandaloneEPS, pfEPS),
    value: Math.abs(delta),
    total: pfEPS,
    fill: delta >= 0 ? '#4CAF50' : '#E53935',
    label: `${delta >= 0 ? '+' : ''}${delta.toFixed(4)}`,
  });

  waterfallData.push({
    name: 'Pro-Forma EPS Y1',
    base: 0,
    value: pfEPS,
    total: pfEPS,
    fill: calc.accretionDilution[0] >= 0 ? '#4CAF50' : '#E53935',
    label: `EGP ${pfEPS.toFixed(4)}`,
  });

  return (
    <div className="rounded-lg border p-4" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: '#C5A44E' }}>
        EPS Bridge — Year 1
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={waterfallData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis
            dataKey="name"
            tick={{ fill: '#7C8DB0', fontSize: 11 }}
            axisLine={{ stroke: '#2C3E6B' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#7C8DB0', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
            axisLine={{ stroke: '#2C3E6B' }}
            tickLine={false}
            tickFormatter={(v) => `${v.toFixed(2)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0B0F1A', border: '1px solid #2C3E6B',
              color: '#F4EDE4', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12,
            }}
            formatter={(value, name) => [`EGP ${value.toFixed(4)}`, name]}
          />
          {/* Invisible base */}
          <Bar dataKey="base" stackId="a" fill="transparent" />
          {/* Value bar */}
          <Bar dataKey="value" stackId="a" radius={[3, 3, 0, 0]}>
            {waterfallData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
            <LabelList
              dataKey="label"
              position="top"
              style={{ fill: '#F4EDE4', fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }}
            />
          </Bar>
          <ReferenceLine y={0} stroke="#2C3E6B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
