export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2
        className="text-lg font-bold tracking-wide"
        style={{ fontFamily: "'Playfair Display', serif", color: '#F4EDE4' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs mt-1" style={{ color: '#7C8DB0' }}>
          {subtitle}
        </p>
      )}
      <div className="mt-2 h-px w-16" style={{ backgroundColor: '#C5A44E' }} />
    </div>
  );
}
