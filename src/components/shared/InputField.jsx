import { useState, useRef, useCallback } from 'react';
import { HelpCircle } from 'lucide-react';

export default function InputField({
  label,
  value,
  onChange,
  suffix = 'EGP M',
  tooltip,
  required = false,
  step = 1,
  min,
  max,
  id,
  disabled = false,
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  const handleChange = useCallback((e) => {
    const raw = e.target.value;
    if (raw === '' || raw === '-') {
      onChange(raw === '-' ? -0 : 0);
      return;
    }
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  }, [onChange]);

  const isNegative = typeof value === 'number' && value < 0;

  return (
    <div className="flex flex-col gap-1">
      {/* Label */}
      <div className="flex items-center gap-1.5">
        <label
          htmlFor={id}
          className="text-xs font-medium"
          style={{ color: '#7C8DB0' }}
        >
          {label}
          {required && <span style={{ color: '#C5A44E' }}> *</span>}
        </label>
        {tooltip && (
          <div className="relative">
            <button
              type="button"
              className="cursor-pointer"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <HelpCircle className="w-3 h-3" style={{ color: '#7C8DB0' }} />
            </button>
            {showTooltip && (
              <div
                ref={tooltipRef}
                className="absolute z-50 left-5 -top-2 w-56 px-3 py-2 text-xs rounded shadow-lg border"
                style={{
                  backgroundColor: '#1A2340',
                  borderColor: '#2C3E6B',
                  color: '#F4EDE4',
                }}
              >
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center rounded border transition-colors focus-within:border-[#C5A44E]"
           style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B' }}>
        <input
          id={id}
          type="number"
          step={step}
          min={min}
          max={max}
          value={value || ''}
          onChange={handleChange}
          disabled={disabled}
          className="flex-1 bg-transparent text-right px-3 py-2 text-sm focus:outline-none disabled:opacity-40"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            color: isNegative ? '#E53935' : '#F4EDE4',
          }}
          placeholder="0"
        />
        {suffix && (
          <span className="pr-3 text-xs whitespace-nowrap" style={{ color: '#7C8DB0' }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
