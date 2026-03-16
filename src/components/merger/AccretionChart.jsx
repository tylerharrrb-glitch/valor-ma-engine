import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine, ResponsiveContainer, LabelList } from 'recharts';

export default function AccretionChart({ calc, acquirerName }) {
  if (!calc) return null;

  const pfEPS = calc.proFormaEPS[0];
  const delta = pfEPS - calc.acquirerStandaloneEPS;

  const waterfallData = [
    {
      name: acquirerName ? `${acquirerName} EPS` : 'Standalone EPS',
      base: 0,
      value: calc.acquirerStandaloneEPS,
      total: calc.acquirerStandaloneEPS,
      fill: '#C9A84C',
      label: `EGP ${calc.acquirerStandaloneEPS.toFixed(4)}`,
    },
    {
      name: 'Net Deal Impact',
      base: Math.min(calc.acquirerStandaloneEPS, pfEPS),
      value: Math.abs(delta),
      total: pfEPS,
      fill: delta >= 0 ? '#4ade80' : '#f87171',
      label: `${delta >= 0 ? '+' : ''}${delta.toFixed(4)}`,
    },
    {
      name: 'Pro-Forma EPS Y1',
      base: 0,
      value: pfEPS,
      total: pfEPS,
      fill: calc.accretionDilution[0] >= 0 ? '#4ade80' : '#f87171',
      label: `EGP ${pfEPS.toFixed(4)}`,
    },
  ];

  return (
    <div className="card" style={{ padding: '24px' }}>
      <span className="section-label" style={{ marginBottom: '16px' }}>EPS BRIDGE</span>
      <h3 style={{
        fontFamily: 'var(--ff-body)',
        fontSize: '.85rem',
        color: 'var(--text-secondary)',
        marginBottom: '16px',
      }}>
        Year 1 Accretion / Dilution Waterfall
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={waterfallData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis
            dataKey="name"
            tick={{ fill: '#8892A4', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
            axisLine={{ stroke: '#1E2D45' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#8892A4', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
            axisLine={{ stroke: '#1E2D45' }}
            tickLine={false}
            tickFormatter={(v) => `${v.toFixed(2)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F1623', border: '1px solid #1E2D45',
              color: '#F0F4FF', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12,
              borderRadius: '4px',
            }}
            formatter={(value, name) => [`EGP ${value.toFixed(4)}`, name]}
          />
          <Bar dataKey="base" stackId="a" fill="transparent" />
          <Bar dataKey="value" stackId="a" radius={[3, 3, 0, 0]}>
            {waterfallData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
            <LabelList
              dataKey="label"
              position="top"
              style={{ fill: '#F0F4FF', fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }}
            />
          </Bar>
          <ReferenceLine y={0} stroke="#1E2D45" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
