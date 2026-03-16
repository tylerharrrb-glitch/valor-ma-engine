export default function MetricCard({ title, value, subtitle, accentColor, icon: Icon }) {
  const goldColor = 'var(--accent-gold)';
  const accent = accentColor || goldColor;

  return (
    <div className="card" style={{ padding: '24px', borderLeft: `3px solid ${accent}` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{
          fontFamily: 'var(--ff-mono)',
          fontSize: '.72rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: 'var(--text-secondary)',
        }}>
          {title}
        </span>
        {Icon && <Icon style={{ width: 16, height: 16, color: accent }} />}
      </div>
      <div style={{
        fontFamily: 'var(--ff-display)',
        fontWeight: 900,
        fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
        color: goldColor,
        lineHeight: 1.2,
      }}>
        {value}
      </div>
      {subtitle && (
        <span style={{
          fontFamily: 'var(--ff-mono)',
          fontSize: '.7rem',
          color: 'var(--text-muted)',
          marginTop: '6px',
          display: 'block',
        }}>
          {subtitle}
        </span>
      )}
    </div>
  );
}
