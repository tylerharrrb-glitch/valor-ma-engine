import { useState, useRef, useEffect } from 'react';
import { useDeal } from '../../context/DealContext';
import { DollarSign } from 'lucide-react';
import ValorMark from '../shared/ValorMark';

export default function Navbar() {
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

  const handleNameBlur = () => {
    setEditingName(false);
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') setEditingName(false);
  };

  const handleFxBlur = () => {
    setEditingFx(false);
  };

  const toggleCurrency = () => {
    dispatch({
      type: 'SET_CURRENCY',
      payload: state.currency === 'EGP' ? 'USD' : 'EGP',
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 border-b"
         style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B' }}>
      {/* Left: Logo */}
      <div className="flex items-center gap-2.5 cursor-pointer select-none">
        <ValorMark size={28} />
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: '1.25rem',
            letterSpacing: '0.15em',
            color: '#C5A44E',
          }}
        >
          VALOR
        </span>
      </div>

      {/* Center: Campaign Name */}
      <div className="flex items-center gap-3">
        {editingName ? (
          <input
            ref={nameRef}
            type="text"
            value={state.campaignName}
            onChange={(e) => dispatch({ type: 'SET_CAMPAIGN_NAME', payload: e.target.value })}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            className="bg-transparent border-b text-center text-sm font-medium px-2 py-1 focus:outline-none"
            style={{ borderColor: '#C5A44E', color: '#F4EDE4', fontFamily: "'Inter', sans-serif" }}
          />
        ) : (
          <button
            onClick={() => setEditingName(true)}
            className="text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer"
            style={{ color: '#F4EDE4' }}
          >
            {state.campaignName}
          </button>
        )}
        <span className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: '#4CAF50', color: '#0B0F1A' }}>
          {state.status}
        </span>
      </div>

      {/* Right: Currency Toggle + FX Rate */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleCurrency}
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded transition-all cursor-pointer"
          style={{
            backgroundColor: state.currency === 'EGP' ? '#C5A44E' : '#2C3E6B',
            color: state.currency === 'EGP' ? '#0B0F1A' : '#F4EDE4',
          }}
        >
          <DollarSign className="w-3.5 h-3.5" />
          {state.currency === 'EGP' ? 'EGP' : 'USD'}
        </button>

        <div className="flex items-center gap-1 text-xs" style={{ color: '#7C8DB0' }}>
          <span>FX:</span>
          {editingFx ? (
            <input
              ref={fxRef}
              type="number"
              step="0.01"
              value={state.fxRateUSDEGP}
              onChange={(e) => dispatch({ type: 'SET_FX_RATE', payload: parseFloat(e.target.value) || 0 })}
              onBlur={handleFxBlur}
              className="w-16 bg-transparent border-b text-center text-xs focus:outline-none"
              style={{ borderColor: '#C5A44E', color: '#F4EDE4', fontFamily: "'IBM Plex Mono', monospace" }}
            />
          ) : (
            <button
              onClick={() => setEditingFx(true)}
              className="font-mono cursor-pointer hover:opacity-80"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}
            >
              {state.fxRateUSDEGP.toFixed(2)}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
