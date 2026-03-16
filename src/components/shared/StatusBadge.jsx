export default function StatusBadge({ type, label }) {
  const styles = {
    accretive: 'tag-green',
    dilutive: 'tag-red',
    neutral: 'tag',
    gold: 'tag-gold',
  };

  return (
    <span className={`tag ${styles[type] || 'tag'}`}>
      {label}
    </span>
  );
}
