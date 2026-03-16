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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <label
          htmlFor={id}
          className="valor-label"
        >
          {label}
          {required && <span style={{ color: 'var(--accent-gold)' }}> *</span>}
        </label>
        {tooltip && (
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <HelpCircle style={{ width: 12, height: 12, color: 'var(--text-muted)' }} />
            </button>
            {showTooltip && (
              <div
                ref={tooltipRef}
                style={{
                  position: 'absolute',
                  zIndex: 50,
                  left: '20px',
                  top: '-8px',
                  width: '220px',
                  padding: '8px 12px',
                  fontSize: '.72rem',
                  fontFamily: 'var(--ff-mono)',
                  borderRadius: '4px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  boxShadow: '0 8px 24px rgba(0,0,0,.4)',
                }}
              >
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        border: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
        transition: 'border-color .3s',
      }}>
        <input
          id={id}
          type="number"
          step={step}
          min={min}
          max={max}
          value={value || ''}
          onChange={handleChange}
          disabled={disabled}
          placeholder="0"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            textAlign: 'right',
            padding: '10px 14px',
            fontSize: '.85rem',
            fontFamily: 'var(--ff-mono)',
            color: isNegative ? '#f87171' : 'var(--text-primary)',
            outline: 'none',
            opacity: disabled ? 0.4 : 1,
            width: '100%',
          }}
        />
        {suffix && (
          <span style={{
            paddingRight: '12px',
            fontSize: '.72rem',
            fontFamily: 'var(--ff-mono)',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
          }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
