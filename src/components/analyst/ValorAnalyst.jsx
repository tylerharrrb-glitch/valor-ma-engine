import { useState, useRef, useEffect } from 'react';
import { callMAAnalyst } from '../../services/maAnalyst';

const QUICK_ACTIONS = [
  {
    id: 'verify_full',
    label: '⚔ Full Deal Verification',
    primary: true,
    message: 'Verify the full deal analysis. Check: (1) EV bridge and purchase price metrics, (2) accretion/dilution for all 3 years, (3) NPV of synergies and goodwill coverage ratio, (4) full LBO debt schedule with IRR and MOIC, (5) Sources = Uses balance. Show all calculation steps and flag any issues.'
  },
  {
    id: 'accretion',
    label: 'Check Accretion/Dilution',
    primary: false,
    message: 'Verify the accretion/dilution analysis. Check: new shares issued, exchange ratio, goodwill and amortization, incremental interest (pre and after-tax), pro forma net income for all 3 years, pro forma EPS, and the accretion/dilution percentage. Also verify the break-even synergies calculation.'
  },
  {
    id: 'lbo',
    label: 'Verify LBO Returns',
    primary: false,
    message: 'Verify the LBO model. Check: entry EV and capital structure, leverage ratios, the full 5-year debt schedule (interest on beginning balances, mandatory amortization, cash sweep waterfall), exit equity value after CGT at 22.5%, MOIC, and IRR. Flag any covenant breaches.'
  },
  {
    id: 'synergies',
    label: 'Review Synergies',
    primary: false,
    message: 'Verify the synergy analysis. Check: headcount synergy including 18.75% social insurance, severance using Egyptian Labor Law (2 months × years of service), phase-in schedule, after-tax conversion, NPV at the given WACC, goodwill coverage ratio, and payback period.'
  },
  {
    id: 'premium',
    label: 'Sanity Check Premium',
    primary: false,
    message: 'Sanity check the deal premium and valuation. Is the premium reasonable vs MENA precedent transactions? Is the EV/EBITDA multiple justified? What are the key deal risks — overpayment, integration risk, financing risk? Give a clear verdict on deal attractiveness.'
  }
];

export default function ValorAnalyst({ dealData, isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;

    const userMsg = { role: 'user', content: text.trim() };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const reply = await callMAAnalyst(text.trim(), dealData, messages);
      setMessages([...newHistory, { role: 'assistant', content: reply }]);
    } catch (err) {
      setError(err.message);
      setMessages([...newHistory, {
        role: 'assistant',
        content: `⚠️ Intelligence Unavailable\n\n${err.message}`
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '420px',
      height: '100vh',
      backgroundColor: '#0B0F1A',
      borderLeft: '1px solid #1A2340',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      boxShadow: '-4px 0 24px rgba(0,0,0,0.5)',
    }}>

      {/* ── HEADER ── */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #1A2340',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0B0F1A',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px',
            backgroundColor: '#1A2340',
            border: '1px solid #C5A44E',
            borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#C5A44E', fontSize: '14px', fontWeight: 700,
          }}>V</div>
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700, fontSize: '15px', color: '#C5A44E',
              letterSpacing: '0.08em',
            }}>VALOR ANALYST</div>
            <div style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '0.1em' }}>
              CFA-GRADE · M&A INTELLIGENCE
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              style={{
                background: 'none', border: '1px solid #1A2340',
                color: '#6b7280', borderRadius: '4px',
                padding: '4px 8px', fontSize: '11px', cursor: 'pointer',
              }}
            >Clear</button>
          )}
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none',
              color: '#6b7280', fontSize: '20px', cursor: 'pointer',
              lineHeight: 1, padding: '2px 6px',
            }}
          >×</button>
        </div>
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #1A2340',
        flexShrink: 0,
      }}>
        {/* Primary verify button */}
        <button
          onClick={() => sendMessage(QUICK_ACTIONS[0].message)}
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px 16px',
            backgroundColor: loading ? '#1A2340' : '#C5A44E',
            color: loading ? '#6b7280' : '#0B0F1A',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '12px',
            letterSpacing: '0.05em',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '8px',
            transition: 'background-color 0.15s',
          }}
        >
          {loading ? 'INTELLIGENCE PROCESSING...' : QUICK_ACTIONS[0].label}
        </button>

        {/* Secondary quick action buttons */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '6px',
        }}>
          {QUICK_ACTIONS.slice(1).map(action => (
            <button
              key={action.id}
              onClick={() => sendMessage(action.message)}
              disabled={loading}
              style={{
                padding: '7px 10px',
                backgroundColor: '#1A2340',
                color: loading ? '#4b5563' : '#F4EDE4',
                border: '1px solid #2a3350',
                borderRadius: '5px',
                fontSize: '10px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                textAlign: 'center',
                letterSpacing: '0.02em',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => { if (!loading) e.target.style.borderColor = '#C5A44E'; }}
              onMouseLeave={e => { e.target.style.borderColor = '#2a3350'; }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── MESSAGES ── */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        {messages.length === 0 && (
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '24px',
          }}>
            <div style={{
              width: '48px', height: '48px',
              border: '1px solid #1A2340',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#C5A44E', fontSize: '20px',
              marginBottom: '12px',
            }}>V</div>
            <div style={{
              color: '#C5A44E', fontSize: '13px',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600, marginBottom: '8px',
            }}>Intelligence Ready</div>
            <div style={{ color: '#4b5563', fontSize: '11px', lineHeight: 1.6 }}>
              Run a full deal verification or ask a specific question about the current campaign.
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
          }}>
            <div style={{
              maxWidth: '90%',
              padding: '10px 14px',
              borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
              backgroundColor: msg.role === 'user' ? '#1A2340' : '#111827',
              border: msg.role === 'user' ? '1px solid #2a3350' : '1px solid #1A2340',
              color: '#F4EDE4',
              fontSize: '12px',
              lineHeight: '1.65',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily: msg.role === 'assistant' ? "'IBM Plex Mono', monospace" : 'Inter, sans-serif',
            }}>
              {msg.role === 'assistant' && (
                <div style={{
                  fontSize: '9px', color: '#C5A44E',
                  letterSpacing: '0.15em', fontWeight: 700,
                  marginBottom: '6px', fontFamily: 'Inter, sans-serif',
                }}>VALOR ANALYST</div>
              )}
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '10px 16px',
              backgroundColor: '#111827',
              border: '1px solid #1A2340',
              borderRadius: '12px 12px 12px 2px',
              color: '#C5A44E',
              fontSize: '11px',
              letterSpacing: '0.1em',
            }}>
              ● ● ● PROCESSING
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── INPUT ── */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid #1A2340',
        flexShrink: 0,
        backgroundColor: '#0B0F1A',
      }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask the analyst..."
            disabled={loading}
            style={{
              flex: 1,
              padding: '9px 12px',
              backgroundColor: '#1A2340',
              border: '1px solid #2a3350',
              borderRadius: '6px',
              color: '#F4EDE4',
              fontSize: '12px',
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
            }}
            onFocus={e => { e.target.style.borderColor = '#C5A44E'; }}
            onBlur={e => { e.target.style.borderColor = '#2a3350'; }}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            style={{
              padding: '9px 14px',
              backgroundColor: input.trim() && !loading ? '#C5A44E' : '#1A2340',
              color: input.trim() && !loading ? '#0B0F1A' : '#4b5563',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '12px',
              cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.15s',
              whiteSpace: 'nowrap',
            }}
          >Send</button>
        </form>
        <div style={{
          marginTop: '6px', fontSize: '9px', color: '#374151',
          textAlign: 'center', letterSpacing: '0.08em',
        }}>
          VALOR ANALYST · POWERED BY GROQ · FOR REFERENCE ONLY
        </div>
      </div>
    </div>
  );
}
