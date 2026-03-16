=============================================================================
VALOR M&A ENGINE — AI ANALYST PANEL
Add Groq-powered "Valor Analyst" chat sidebar
Claude Opus 4.6 (Thinking) | Google Antigravity
"Courage Meets Capital"
=============================================================================

CONTEXT:
VALOR M&A Engine is live at https://valor-ma-engine.pages.dev/
You are adding an AI Analyst chat panel powered by the Groq API.
The analyst will have full context of the current deal data and answer
M&A-specific questions, verify calculations, and flag deal risks.

⚠️  CRITICAL — READ BEFORE WRITING ANY FILE:
VALOR uses JAVASCRIPT (JSX), NOT TypeScript.
The project has NO tsconfig.json, NO TypeScript compiler, NO .ts files.
Language: JavaScript (JSX) ES2024 — pure .js and .jsx files ONLY.
If you write a .ts or .tsx file it will NOT compile. Use .js and .jsx.

DO NOT MODIFY any of these files under any circumstances:
  src/hooks/useMergerCalculations.js   ← verified financial logic
  src/hooks/useSynergyCalculations.js  ← verified financial logic
  src/hooks/useLBOCalculations.js      ← verified financial logic
  src/context/DealContext.jsx          ← state management
  src/constants/egyptParams.js         ← Egyptian parameters

Only ADD new files and make targeted additions to App.jsx and layout.

=============================================================================
STEP 1 — ENVIRONMENT VARIABLE
=============================================================================

Create file: .env (in project root, same level as package.json)

Content:
VITE_GROQ_API_KEY=gsk_YOUR_KEY_HERE

Also create: .env.example (safe to commit to GitHub)

Content:
# Get your free key at https://console.groq.com
VITE_GROQ_API_KEY=gsk_YOUR_KEY_HERE

Verify .gitignore already contains ".env" — if not, add it.
The .env.example file IS committed. The .env file is NEVER committed.

=============================================================================
STEP 2 — CREATE src/services/maAnalyst.js
=============================================================================

FILE: src/services/maAnalyst.js  ← NOTE: .js NOT .ts

Create this file with EXACTLY the following content:

─────────────────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a CFA-grade M&A and valuation analyst
embedded in the Valor M&A Engine — an institutional-grade deal platform
calibrated to Egyptian capital markets law (FRA, CBE, ECA, Labor Law).

Your role:
1. Verify M&A valuation calculations (DCF, Comps, Precedent Transactions, LBO)
2. Check accretion/dilution analysis
3. Verify synergy assumptions and present value of synergies
4. Check purchase price allocation (PPA) and goodwill calculations
5. Verify LBO returns (IRR, MOIC, cash-on-cash)
6. Explain M&A deal structures and valuation methodology
7. Flag Egyptian regulatory issues (ECA, FRA, CBE, MTO thresholds)

Key M&A formulas:
- Enterprise Value = Equity Value + Net Debt
- Net Debt = Total Debt - Cash & Equivalents
- Equity Value = Shares Outstanding × Price Per Share
- EV/EBITDA, EV/Revenue, P/E — standard trading comps multiples
- Offer Price = Unaffected Price × (1 + Control Premium)
- Goodwill = Purchase Price - Book Value of Equity
- Annual Goodwill Amortization = Goodwill ÷ 10 (EAS No. 19, Egypt)
- Accretion/(Dilution) = (Pro Forma EPS - Standalone EPS) / Standalone EPS
- Pro Forma EPS = Pro Forma Net Income / Pro Forma Shares Outstanding
- Pro Forma NI = Acquirer NI + Target NI + After-Tax Synergies
                 - Goodwill Amort (A/T) - Incremental Interest (A/T)
- New Shares Issued = Stock Component / Acquirer Share Price
- Pro Forma Shares = Acquirer Shares + New Shares Issued
- Incremental Interest (A/T) = (Debt Interest + Lost Cash Interest) × (1 - Tax Rate)
- Break-Even Synergies = Required NI for EPS-neutral deal - Base Pro Forma NI
- LBO IRR: solve for r where NPV of cash flows = 0 (Newton-Raphson)
- MOIC = Exit Equity Returned / Sponsor Equity
- Exit Equity = Exit EV - Exit Net Debt
- Capital Gains Tax (Egypt, unlisted): 22.5% on gain

Synergy mechanics (Egypt-specific):
- Severance = Positions × Salary × (2 months/12) × Years of Service
  (Egyptian Labor Law No. 12/2003, Article 120)
- Social Insurance (Employer): 18.75% (Law 148/2019)
- Phase-in: Y1=50%, Y2=75%, Y3+=100% (standard assumption)
- NPV of Synergies = -Integration Costs (A/T) + Σ[Net Synergies/(1+WACC)^t] + Terminal Value
- Goodwill Coverage Ratio = NPV of Synergies / Goodwill Created × 100
  (<50% = RED impairment risk, 50-100% = AMBER, >100% = GREEN)

Sources & Uses:
- INVARIANT: Total Sources = Total Uses (must always balance exactly)
- Stamp Duty (Egypt) = 0.125% per side = 0.25% total on listed securities
  (Stamp Tax Law No. 111/1980)
- ECA filing required if combined revenue > EGP 100M
  (Competition Law No. 3/2005)

LBO mechanics:
- Entry Leverage = Total Debt / EBITDA (safe: ≤4×; aggressive: 4-6×; risky: >6×)
- Interest on beginning-of-year balance (not ending)
- Mandatory amortization first, then cash sweep
- Cash sweep priority: TLA → TLB → Senior Notes → Mezz
- PIK Mezzanine: compounds, no cash outflow
- Covenant flag: ICR < 2.5× = breach warning

Behavioral rules:
1. Always show full calculation steps with numbers from the deal data
2. Flag deal risks: premium >40% = overpaying, leverage >6× = aggressive
3. Reference Egyptian law where relevant (EAS No. 19, Labor Law 12/2003, etc.)
4. Be specific about pre-tax vs after-tax in every step
5. IRR >25% = excellent; 20-25% = strong; 15-20% = acceptable; <15% = weak

Response format (use exactly):
✅ [Module] — [Status]
Expected: [formula + calculation]
Valor shows: [reported value]
Verdict: ✅ Confirmed / ⚠️ Review / ❌ Error

For general questions: answer directly with clear structured analysis.`;

const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function callMAAnalyst(userMessage, dealData, history = []) {
  if (!GROQ_KEY || GROQ_KEY === 'gsk_YOUR_KEY_HERE') {
    throw new Error('GROQ_API_KEY not configured. Add VITE_GROQ_API_KEY to your .env file.');
  }

  const contextMessage = dealData && Object.keys(dealData).length > 0
    ? `Current deal data from Valor M&A Engine:\n${JSON.stringify(dealData, null, 2)}\n\nAnalyst question: ${userMessage}`
    : userMessage;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 2000,
      temperature: 0.1,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history.slice(-6),
        { role: 'user', content: contextMessage }
      ]
    })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`Groq API error: ${err.error?.message || JSON.stringify(err)}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

─────────────────────────────────────────────────────────────────────────────

NOTE ON MODEL: Using llama-3.3-70b-versatile instead of llama-3.1-8b-instant.
The 70B model produces substantially better financial analysis for M&A work.
It is still free on Groq and fast enough for this use case.

=============================================================================
STEP 3 — CREATE src/components/analyst/ValorAnalyst.jsx
=============================================================================

FILE: src/components/analyst/ValorAnalyst.jsx  ← NOTE: .jsx NOT .tsx

Create the directory src/components/analyst/ first if it doesn't exist.

The component receives these props:
  dealData  — object with all current deal state (passed from App.jsx)
  isOpen    — boolean, whether the panel is visible
  onClose   — function to close the panel

─────────────────────────────────────────────────────────────────────────────

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

─────────────────────────────────────────────────────────────────────────────

=============================================================================
STEP 4 — WIRE INTO App.jsx
=============================================================================

Open: src/App.jsx

Make EXACTLY these three targeted additions — nothing else:

ADDITION 4A — Import the new component and the useMemo hook.

Find the existing imports at the top of App.jsx.
Add these two lines alongside the other imports:

  import { useMemo } from 'react';
  import ValorAnalyst from './components/analyst/ValorAnalyst';

NOTE: If useMemo is already imported in App.jsx (e.g., alongside useState),
just add it to the existing React import — do not duplicate.

ADDITION 4B — Add analyst panel state.

Find where the existing useState hooks are declared in App.jsx.
Add this line alongside the other state declarations:

  const [analystOpen, setAnalystOpen] = useState(false);

ADDITION 4C — Build the dealData object from context.

Find where the component reads from DealContext (the useContext call).
After the existing state destructuring, add:

  const dealData = useMemo(() => ({
    campaign: {
      name: state.campaignName,
      status: state.status,
      currency: state.currency,
      fxRate: state.fxRateUSDEGP,
    },
    acquirer: state.acquirer,
    target: state.target,
    dealTerms: state.dealTerms,
    sourcesUses: state.sourcesUses,
    synergies: state.synergies,
    lbo: state.lbo,
    fairness: state.fairness,
  }), [state]);

ADDITION 4D — Add the analyst toggle button to the Navbar.

Open: src/components/layout/Navbar.jsx

Find the right side of the Navbar (where the EGP/USD toggle and FX rate are).
Add a button BEFORE the currency toggle:

  <button
    onClick={() => setAnalystOpen(prev => !prev)}
    style={{
      padding: '6px 14px',
      backgroundColor: analystOpen ? '#C5A44E' : '#1A2340',
      color: analystOpen ? '#0B0F1A' : '#C5A44E',
      border: '1px solid #C5A44E',
      borderRadius: '5px',
      fontWeight: 700,
      fontSize: '11px',
      letterSpacing: '0.08em',
      cursor: 'pointer',
      transition: 'all 0.15s',
    }}
  >
    {analystOpen ? 'CLOSE ANALYST' : 'ANALYST'}
  </button>

To pass analystOpen and setAnalystOpen down from App.jsx to Navbar.jsx:
  - In App.jsx, pass them as props to Navbar: <Navbar analystOpen={analystOpen} setAnalystOpen={setAnalystOpen} ... />
  - In Navbar.jsx, destructure them from props: ({ analystOpen, setAnalystOpen, ... })

ADDITION 4E — Render the panel in App.jsx.

Find the main return statement in App.jsx.
Add the ValorAnalyst panel as the LAST element before the closing tag:

  <ValorAnalyst
    dealData={dealData}
    isOpen={analystOpen}
    onClose={() => setAnalystOpen(false)}
  />

ADDITION 4F — Add right padding when panel is open.

Find the main content area in App.jsx (the div that contains the module content).
Add a conditional style for right padding when the panel is open:

  style={{
    ...existingStyles,
    marginRight: analystOpen ? '420px' : '0',
    transition: 'margin-right 0.2s ease',
  }}

This prevents the main content from being hidden behind the panel.

=============================================================================
STEP 5 — LOCAL TESTING
=============================================================================

Run:
  npm run dev

Open: http://localhost:5173

TEST 1 — Panel opens and closes:
  Click "ANALYST" button in the top-right navbar.
  Expected: Gold sidebar slides in from the right.
  Click "CLOSE ANALYST" or ×.
  Expected: Panel closes, main content returns to full width.

TEST 2 — Empty state display:
  With no deal data entered, click "ANALYST" then "⚔ Full Deal Verification".
  Expected: Message appears on right, loading indicator shows, then analyst
  responds explaining no deal data is present and what data to enter.

TEST 3 — With deal data:
  Enter the test deal: Acquirer shares=1000, price=10, Target shares=100,
  price=20, offer=25, cash%=60, stock%=40, new debt%=80, rate=18%.
  Click "ANALYST" → "Check Accretion/Dilution".
  Expected: Analyst correctly identifies:
    Purchase Price = EGP 2,500M
    New Shares = 100M
    Pro Forma Shares = 1,100M
    Goodwill = EGP 2,200M
    Accretion/Dilution Year 1 = −52.47% (DILUTIVE)

TEST 4 — Free-form question:
  Type: "What does a goodwill coverage ratio of 26.6% mean for this deal?"
  Expected: Analyst explains impairment risk, compares to >50% threshold.

TEST 5 — Quick action buttons all work:
  Test each of the 4 secondary buttons. Each should send its pre-written
  message and receive a relevant response.

TEST 6 — Chat history:
  Send 3+ messages. Verify responses reference previous messages correctly
  (the history.slice(-6) sends last 6 messages for context).

TEST 7 — Clear button:
  After sending messages, click "Clear".
  Expected: All messages removed, empty state reappears.

TEST 8 — Error handling:
  Temporarily set VITE_GROQ_API_KEY=invalid_key in .env.
  Click any action button.
  Expected: Error message appears in chat: "⚠️ Intelligence Unavailable — Groq API error: ..."
  Restore correct key after test.

=============================================================================
STEP 6 — DEPLOY TO CLOUDFLARE PAGES
=============================================================================

After local testing passes:

6A — Push code to GitHub:
  git add .
  git commit -m "Add Valor Analyst AI panel (Groq/LLaMA-3.3-70B)

  - src/services/maAnalyst.js: Groq API client with M&A system prompt
  - src/components/analyst/ValorAnalyst.jsx: Chat panel UI
  - App.jsx: wired panel with deal context + toggle button
  - Navbar.jsx: ANALYST toggle button
  - Egyptian law + CFA-grade M&A formulas in system prompt"
  git push origin main

6B — Add environment variable to Cloudflare Pages:
  Go to: https://dash.cloudflare.com
  Workers & Pages → valor-ma-engine → Settings → Environment Variables
  Click "Add variable":
    Variable name:  VITE_GROQ_API_KEY
    Value:          gsk_[your actual key from console.groq.com]
  Click "Encrypt" (recommended for API keys)
  Click "Save"

  IMPORTANT: After adding the variable, trigger a new deployment:
  Go to Deployments tab → click "Retry deployment" on the latest deployment
  OR push any small change to GitHub to trigger an auto-rebuild.

  WHY THIS IS REQUIRED:
  Vite bakes environment variables at BUILD TIME into the JavaScript bundle.
  The variable must exist during the Cloudflare build, not just at runtime.
  Simply setting it in Cloudflare is not enough — a rebuild is required.

6C — Verify live:
  Open https://valor-ma-engine.pages.dev/
  Click "ANALYST" in the navbar.
  Send a test message.
  Expected: Analyst responds correctly.

=============================================================================
COMPLETE FILE CHANGE SUMMARY
=============================================================================

Files to CREATE (new):
  .env                                    ← local only, never committed
  .env.example                            ← committed, safe template
  src/services/maAnalyst.js               ← Groq API client
  src/components/analyst/ValorAnalyst.jsx ← Chat panel UI component

Files to MODIFY (targeted additions only):
  src/App.jsx                             ← import, state, dealData, render
  src/components/layout/Navbar.jsx        ← ANALYST toggle button

Files NOT to touch (zero changes):
  src/hooks/useMergerCalculations.js
  src/hooks/useSynergyCalculations.js
  src/hooks/useLBOCalculations.js
  src/context/DealContext.jsx
  src/constants/egyptParams.js
  All other existing components

=============================================================================
DESIGN NOTES — VALOR BRAND COMPLIANCE
=============================================================================

The panel uses the full Valor brand system:
  Background:         #0B0F1A (Valor Black)
  Card surfaces:      #1A2340 (Valor Navy)
  Primary accent:     #C5A44E (Valor Gold)
  Body text:          #F4EDE4 (Valor Ivory)
  Financial data font: IBM Plex Mono (assistant messages)
  UI font:            Inter (inputs, labels)
  Heading font:       Playfair Display (VALOR ANALYST wordmark)

Valor voice applied:
  "Intelligence Ready"    (empty state — instead of "No messages yet")
  "VALOR ANALYST"         (label on responses — instead of "AI")
  "Intelligence Unavailable" (error — instead of "Error")
  "PROCESSING"            (loading — instead of "Loading...")
  "Campaign"              (referenced in deal context object)

The panel width is 420px — wide enough to display full calculation trails
from the 70B model without line-wrapping numbers awkwardly.

=============================================================================
GROQ API NOTES
=============================================================================

Free tier limits (as of early 2026):
  llama-3.3-70b-versatile: 1,000 requests/day, 6,000 tokens/minute
  Response speed: typically 2-5 seconds for 2,000 token responses

Get your free API key:
  https://console.groq.com
  Sign in → API Keys → Create API Key
  Copy the key starting with "gsk_"

The system prompt is ~900 tokens.
Each user message with deal context is ~500-1500 tokens.
Each response is up to 2,000 tokens.
A full deal verification session (5-6 exchanges) ≈ 15,000-20,000 tokens.
Well within free tier limits for professional use.

=============================================================================
END OF PROMPT
VALOR M&A ENGINE — VALOR ANALYST
"Courage Meets Capital"
=============================================================================
