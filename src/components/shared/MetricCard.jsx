export default function MetricCard({ title, value, subtitle, accentColor, icon: Icon }) {
  return (
    <div
      className="rounded-lg p-4 border-l-3 flex flex-col gap-1 animate-fade-in"
      style={{
        backgroundColor: '#1A2340',
        borderLeftColor: accentColor || '#C5A44E',
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#7C8DB0' }}>
          {title}
        </span>
        {Icon && <Icon className="w-4 h-4" style={{ color: accentColor || '#C5A44E' }} />}
      </div>
      <div
        className="text-xl font-bold"
        style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}
      >
        {value}
      </div>
      {subtitle && (
        <span className="text-xs" style={{ color: '#7C8DB0' }}>
          {subtitle}
        </span>
      )}
    </div>
  );
}
