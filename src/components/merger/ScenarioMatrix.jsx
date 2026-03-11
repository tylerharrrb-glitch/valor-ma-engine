import { useMemo } from 'react';

export default function ScenarioMatrix({ data, currentPremium, currentSynergy }) {
  if (!data) return null;

  const { premiums, synergies, matrix } = data;

  // Find the cell closest to current scenario
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
    if (val > 5) return '#2E7D32';      // Dark green
    if (val >= 0) return '#4CAF50';      // Light green
    if (val >= -5) return '#FF9800';     // Amber
    return '#E53935';                     // Red
  };

  return (
    <div className="rounded-lg border p-4" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
      <h3 className="text-sm font-semibold mb-1" style={{ color: '#C5A44E' }}>
        Scenario Matrix — Year 1 Accretion / Dilution (%)
      </h3>
      <p className="text-xs mb-4" style={{ color: '#7C8DB0' }}>
        Rows: Offer Premium (%) | Columns: After-Tax Synergies (EGP M)
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <thead>
            <tr>
              <th className="px-2 py-2 text-left font-semibold" style={{ color: '#C5A44E', backgroundColor: '#0B0F1A' }}>
                Premium ↓ / Syn →
              </th>
              {synergies.map((s, j) => (
                <th key={j} className="px-2 py-2 text-center font-semibold" style={{ color: '#C5A44E', backgroundColor: '#0B0F1A' }}>
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {premiums.map((p, i) => (
              <tr key={i}>
                <td className="px-2 py-2 font-semibold" style={{ color: '#F4EDE4', backgroundColor: '#0B0F1A' }}>
                  {p}%
                </td>
                {synergies.map((s, j) => {
                  const val = matrix[i][j];
                  const isCurrent = i === closestPremiumIdx && j === closestSynergyIdx;
                  return (
                    <td
                      key={j}
                      className="px-2 py-2 text-center font-medium"
                      style={{
                        backgroundColor: getCellColor(val),
                        color: '#FFFFFF',
                        border: isCurrent ? '2px solid #C5A44E' : '1px solid rgba(44, 62, 107, 0.3)',
                        boxShadow: isCurrent ? '0 0 8px rgba(197, 164, 78, 0.5)' : 'none',
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
