export default function StatusBadge({ type, label }) {
  const styles = {
    accretive: { bg: '#4CAF50', text: '#0B0F1A' },
    dilutive: { bg: '#E53935', text: '#FFFFFF' },
    balanced: { bg: '#C5A44E', text: '#0B0F1A' },
    imbalanced: { bg: '#E53935', text: '#FFFFFF' },
    neutral: { bg: '#2C3E6B', text: '#F4EDE4' },
    warning: { bg: '#FF9800', text: '#0B0F1A' },
  };

  const style = styles[type] || styles.neutral;

  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {type === 'accretive' && '✅ '}
      {type === 'dilutive' && '❌ '}
      {type === 'balanced' && '✅ '}
      {type === 'imbalanced' && '❌ '}
      {label}
    </span>
  );
}
