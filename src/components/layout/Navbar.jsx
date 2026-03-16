import { useState, useRef, useEffect } from 'react';
import { useDeal } from '../../context/DealContext';
import { DollarSign } from 'lucide-react';

export default function Navbar({ analystOpen, setAnalystOpen }) {
  const { state, dispatch } = useDeal();
  const [editingName, setEditingName] = useState(false);
  const [editingFx, setEditingFx] = useState(false);
  const nameRef = useRef(null);
  const fxRef = useRef(null);

  useEffect(() => {
    if (editingName && nameRef.current) nameRef.current.focus();
  }, [editingName]);

  useEffect(() => {
    if (editingFx && fxRef.current) fxRef.current.focus();
  }, [editingFx]);

  const handleNameBlur = () => setEditingName(false);
  const handleNameKeyDown = (e) => { if (e.key === 'Enter') setEditingName(false); };
  const handleFxBlur = () => setEditingFx(false);

  const toggleCurrency = () => {
    dispatch({ type: 'SET_CURRENCY', payload: state.currency === 'EGP' ? 'USD' : 'EGP' });
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
          fontFamily: "var(--ff-display)",
          fontWeight: 700,
          fontSize: '1.25rem',
          letterSpacing: '0.15em',
          color: 'var(--accent-gold)',
        }}>
          VALOR
        </span>
        <span style={{
          fontFamily: "var(--ff-mono)",
          fontSize: '.72rem',
          color: 'var(--text-muted)',
          letterSpacing: '1px',
        }}>
          M&A Engine
        </span>
      </div>

      {/* Center: Campaign Name + Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {editingName ? (
          <input
            ref={nameRef}
            type="text"
            value={state.campaignName}
            onChange={(e) => dispatch({ type: 'SET_CAMPAIGN_NAME', payload: e.target.value })}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid var(--accent-gold)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--ff-body)',
              fontSize: '.85rem',
              textAlign: 'center',
              padding: '4px 8px',
              outline: 'none',
            }}
          />
        ) : (
          <button
            onClick={() => setEditingName(true)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-primary)',
              fontFamily: 'var(--ff-body)',
              fontSize: '.85rem',
              fontWeight: 400,
              transition: 'opacity .2s',
            }}
            onMouseEnter={(e) => e.target.style.opacity = '.8'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            {state.campaignName}
          </button>
        )}
        <span style={{
          fontSize: '.6rem',
          fontFamily: 'var(--ff-mono)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: '#4ade80',
          background: 'rgba(74,222,128,.1)',
          padding: '3px 10px',
          borderRadius: '20px',
          border: '1px solid rgba(74,222,128,.25)',
        }}>
          {state.status}
        </span>
      </div>

      {/* Right: Analyst + Currency + FX + Back to Portfolio */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => setAnalystOpen(prev => !prev)}
          className={analystOpen ? 'btn-gold' : 'btn-outline'}
          style={{
            padding: '6px 14px',
            fontSize: '.7rem',
            letterSpacing: '1px',
          }}
        >
          {analystOpen ? 'CLOSE ANALYST' : 'ANALYST'}
        </button>

        <button
          onClick={toggleCurrency}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            fontFamily: 'var(--ff-mono)',
            fontSize: '.72rem',
            fontWeight: 500,
            letterSpacing: '1px',
            padding: '6px 14px',
            borderRadius: '4px',
            border: '1px solid var(--border)',
            background: state.currency === 'EGP' ? 'var(--accent-gold)' : 'transparent',
            color: state.currency === 'EGP' ? 'var(--bg-primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all .3s var(--ease)',
          }}
        >
          <DollarSign style={{ width: 14, height: 14 }} />
          {state.currency}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--ff-mono)', fontSize: '.72rem', color: 'var(--text-muted)' }}>
          <span>FX:</span>
          {editingFx ? (
            <input
              ref={fxRef}
              type="number"
              step="0.01"
              value={state.fxRateUSDEGP}
              onChange={(e) => dispatch({ type: 'SET_FX_RATE', payload: parseFloat(e.target.value) || 0 })}
              onBlur={handleFxBlur}
              style={{
                width: 56, background: 'transparent',
                border: 'none', borderBottom: '1px solid var(--accent-gold)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--ff-mono)', fontSize: '.72rem',
                textAlign: 'center', outline: 'none',
              }}
            />
          ) : (
            <button
              onClick={() => setEditingFx(true)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--ff-mono)', fontSize: '.72rem',
                color: 'var(--text-primary)',
              }}
            >
              {state.fxRateUSDEGP.toFixed(2)}
            </button>
          )}
        </div>

        <a
          href="https://ahmedwael.pages.dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--ff-mono)',
            fontSize: '.75rem',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'color .3s',
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--accent-gold)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
        >
          ← Portfolio
        </a>
      </div>
    </nav>
  );
}
