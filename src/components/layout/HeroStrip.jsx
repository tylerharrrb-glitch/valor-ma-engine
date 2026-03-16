export default function HeroStrip() {
  return (
    <section className="hero-strip">
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Mono label */}
        <span style={{
          fontFamily: "var(--ff-mono)",
          fontSize: '.75rem',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--accent-gold)',
          marginBottom: '12px',
          display: 'block',
        }}>
          M&A ANALYSIS · EGYPTIAN MARKET · FRA CALIBRATED
        </span>

        {/* Main title */}
        <h1 style={{
          fontFamily: "var(--ff-display)",
          fontWeight: 900,
          fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
          color: 'var(--text-primary)',
          margin: 0,
          lineHeight: 1.2,
        }}>
          VALOR M&A Engine
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "var(--ff-mono)",
          fontSize: '.9rem',
          color: 'var(--text-secondary)',
          marginTop: '10px',
          marginBottom: 0,
        }}>
          Merger Modeling · LBO Analysis · Synergy Quantification · Fairness Opinions
        </p>

        {/* Badges row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '24px', alignItems: 'center' }}>
          <span className="stat-badge">7 Integrated Modules</span>
          <span className="stat-badge">Egyptian Law Calibrated</span>
          <span className="stat-badge">CBE Rate Integration</span>
          <span className="stat-badge">FRA Regulatory Framework</span>

          <div className="egypt-badge">
            <span className="dot"></span>
            <span>Calibrated · Egyptian Law · CBE Rates · FRA Requirements</span>
          </div>

          <div className="badge-live">
            <span className="dot"></span>
            LIVE
          </div>
        </div>
      </div>
    </section>
  );
}
