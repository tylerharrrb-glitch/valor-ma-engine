import { useMemo } from 'react';

export default function ScenarioMatrix({ data, currentPremium, currentSynergy }) {
  if (!data) return null;

  const { premiums, synergies, matrix } = data;

  const closestPremiumIdx = useMemo(() => {
    let minDist = Infinity;
    let idx = 0;
    premiums.forEach((p, i) => {
      const dist = Math.abs(p - (currentPremium || 0));
      if (dist < minDist) { minDist = dist; idx = i; }
    });
    return idx;
  }, [premiums, currentPremium]);

  const closestSynergyIdx = useMemo(() => {
    let minDist = Infinity;
    let idx = 0;
    synergies.forEach((s, i) => {
      const dist = Math.abs(s - (currentSynergy || 0));
      if (dist < minDist) { minDist = dist; idx = i; }
    });
    return idx;
  }, [synergies, currentSynergy]);

  const getCellColor = (val) => {
    if (val > 5) return '#22c55e';
    if (val >= 0) return '#4ade80';
    if (val >= -5) return '#FF9800';
    return '#f87171';
  };

  return (
    <div className="card" style={{ padding: '24px' }}>
      <span className="section-label" style={{ marginBottom: '8px' }}>SCENARIO ANALYSIS</span>
      <h3 style={{
        fontFamily: 'var(--ff-body)',
        fontSize: '.85rem',
        color: 'var(--text-primary)',
        marginBottom: '4px',
      }}>
        Year 1 Accretion / Dilution (%)
      </h3>
      <p style={{
        fontFamily: 'var(--ff-mono)',
        fontSize: '.72rem',
        color: 'var(--text-muted)',
        marginBottom: '16px',
      }}>
        Rows: Offer Premium (%) | Columns: After-Tax Synergies (EGP M)
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table className="fin-table" style={{ fontSize: '.72rem' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Premium ↓ / Syn →</th>
              {synergies.map((s, j) => (
                <th key={j} style={{ textAlign: 'center' }}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {premiums.map((p, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'var(--ff-mono)', fontWeight: 600 }}>{p}%</td>
                {synergies.map((s, j) => {
                  const val = matrix[i][j];
                  const isCurrent = i === closestPremiumIdx && j === closestSynergyIdx;
                  return (
                    <td
                      key={j}
                      style={{
                        textAlign: 'center',
                        fontWeight: 500,
                        backgroundColor: getCellColor(val),
                        color: '#FFFFFF',
                        border: isCurrent ? '2px solid var(--accent-gold)' : '1px solid rgba(30,45,69,.3)',
                        boxShadow: isCurrent ? '0 0 8px rgba(201,168,76,.5)' : 'none',
                      }}
                    >
                      {val >= 0 ? '+' : ''}{val.toFixed(1)}%
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
