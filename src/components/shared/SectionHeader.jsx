export default function SectionHeader({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      {label && (
        <span className="section-label">{label}</span>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p style={{
          fontFamily: 'var(--ff-mono)',
          fontSize: '.85rem',
          color: 'var(--text-secondary)',
          marginTop: '-20px',
          marginBottom: '28px',
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
