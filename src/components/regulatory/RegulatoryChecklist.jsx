import { useState, useMemo, useCallback } from 'react';
import { useDeal } from '../../context/DealContext';
import SectionHeader from '../shared/SectionHeader';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Calendar, AlertTriangle } from 'lucide-react';

const CHECKLIST_ITEMS = [
  {
    category: 'Mandatory for All Transactions',
    items: [
      { key: 'eca', label: 'Egyptian Competition Authority (ECA) Merger Notification',
        detail: 'Required if combined annual revenue > EGP 100M. Filing deadline: Prior to closing (suspensory). Phase 1: 30 days, Phase 2: up to 90 additional days.',
        source: 'Competition Law No. 3 of 2005' },
      { key: 'gafi', label: 'GAFI Registration (General Authority for Investment)',
        detail: 'Required for foreign acquirers in restricted sectors: media, real estate in certain zones, some utilities. Timeline: Concurrent with other regulatory approvals.',
        source: 'Investment Law' },
      { key: 'shareholderApproval', label: 'Shareholder Approval (EGM)',
        detail: 'Required for listed acquirer if transaction exceeds 25% of total assets. EGM notice period: minimum 21 days. Quorum: typically 50%+ of outstanding shares.',
        source: 'Companies Law' },
    ],
  },
  {
    category: 'For EGX-Listed Targets',
    items: [
      { key: 'fraPreNotification', label: 'FRA Pre-Notification',
        detail: 'MUST be filed BEFORE any public announcement of intent to acquire. Contents: identity of acquirer, proposed offer price, financing sources, conditions, timetable.',
        source: 'Capital Market Law No. 95 of 1992, Article 4' },
      { key: 'mandatoryTenderOffer', label: 'Mandatory Tender Offer (MTO)',
        detail: 'Triggered when acquirer will hold ≥ 33% of voting shares. Offer to ALL remaining shareholders. Price: Higher of (a) offer price or (b) highest price paid in prior 12 months. Acceptance period: minimum 30 days.',
        source: 'Capital Market Law' },
      { key: 'fairnessOpinionFiled', label: 'Independent Fairness Opinion',
        detail: 'Required for related-party transactions and MTO situations. Provider must be licensed investment bank approved by FRA. Must cover: DCF, comparable companies, comparable transactions.',
        source: 'FRA Regulations' },
    ],
  },
  {
    category: 'For Banking Sector Targets',
    items: [
      { key: 'cbeApproval', label: 'Central Bank of Egypt (CBE) Approval',
        detail: '> 10% stake: prior CBE notification. > 33% (control): full CBE board review. Review period: 60–120 business days. Required: KYC, 3-year business plan, AML compliance, source of funds, management CVs.',
        source: 'Banking Law' },
      { key: 'cbeFXApproval', label: 'Foreign Currency Repatriation Approval (CBE)',
        detail: 'Required for cross-border deals where purchase price is remitted abroad. Acquirer banks must coordinate with CBE FX operations. Timeline: Variable — critical bottleneck in practice.',
        source: 'CBE Regulations' },
    ],
  },
  {
    category: 'For Insurance / Financial Services',
    items: [
      { key: 'fraInsurance', label: 'FRA Approval (Insurance Companies)',
        detail: 'Threshold: > 10% acquisition of insurance company. Review period: 60–90 days. Also required for: leasing, factoring, mortgage finance, microfinance entities.',
        source: 'FRA Insurance Regulations' },
    ],
  },
  {
    category: 'Post-Signing Requirements',
    items: [
      { key: 'commercialRegistry', label: 'Commercial Registry Update',
        detail: 'Ministry of Commerce and Industry. Deadline: Within 30 days of closing.',
        source: 'Commercial Registry Law' },
      { key: 'taxAuthority', label: 'Egyptian Tax Authority (ETA) Notification',
        detail: 'File capital gains tax declaration on acquisition. Deadline: Within 30 days of closing.',
        source: 'Income Tax Law' },
      { key: 'laborAuthority', label: 'Labor Authority Notification',
        detail: 'Required if > 200 employees are being restructured. Must file: Workforce plan, timeline for changes, social insurance arrangements.',
        source: 'Labor Law No. 12 of 2003' },
      { key: 'cbeRegistration', label: 'CBE Registration (Cross-Border Payments)',
        detail: 'For USD/EUR-denominated deals: register FX transactions with CBE.',
        source: 'CBE Regulations' },
    ],
  },
];

const TIMELINE_PHASES = [
  { label: 'Preparation & Info', start: 0, duration: 3 },
  { label: 'Due Diligence', start: 2, duration: 6 },
  { label: 'SPA Negotiation', start: 6, duration: 4 },
  { label: 'Regulatory (ECA Only)', start: 9, duration: 8, variant: 'eca' },
  { label: 'Regulatory (CBE + ECA)', start: 9, duration: 16, variant: 'cbe' },
  { label: 'Shareholder Approval', start: 12, duration: 4 },
  { label: 'Condition Satisfaction', start: 14, duration: 8 },
  { label: 'Closing & Funding', start: 22, duration: 1 },
  { label: 'Post-Close Integration', start: 23, duration: 52 },
];

export default function RegulatoryChecklist() {
  const { state, dispatch } = useDeal();
  const reg = state.regulatoryChecklist;

  const update = useCallback((payload) => {
    dispatch({ type: 'UPDATE_REGULATORY', payload });
  }, [dispatch]);

  const [expanded, setExpanded] = useState({});
  const [regulatoryType, setRegulatoryType] = useState('eca'); // 'eca' or 'cbe'

  const toggleExpand = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalItems = CHECKLIST_ITEMS.reduce((sum, cat) => sum + cat.items.length, 0);
  const completedItems = CHECKLIST_ITEMS.reduce(
    (sum, cat) => sum + cat.items.filter(item => reg[item.key]).length, 0
  );
  const progressPct = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  // Timeline calculations
  const dealStartDate = reg.dealStartDate ? new Date(reg.dealStartDate) : null;
  const maxWeek = regulatoryType === 'cbe' ? 75 : 75;

  const getWeekDate = (weekOffset) => {
    if (!dealStartDate) return null;
    const d = new Date(dealStartDate);
    d.setDate(d.getDate() + weekOffset * 7);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
  };

  const filteredPhases = TIMELINE_PHASES.filter(p => {
    if (!p.variant) return true;
    return p.variant === regulatoryType;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <SectionHeader
        title="Regulatory Checklist & Deal Timeline"
        subtitle="Egyptian M&A regulatory requirements — track approvals and monitor critical path milestones"
      />

      {/* Progress Bar */}
      <div className="rounded-lg border p-4" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold" style={{ color: '#C5A44E' }}>
            Regulatory Progress: {completedItems} / {totalItems} items
          </span>
          <span className="text-xs font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: progressPct === 100 ? '#4CAF50' : '#F4EDE4' }}>
            {Math.round(progressPct)}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#0B0F1A' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%`, backgroundColor: progressPct === 100 ? '#4CAF50' : '#C5A44E' }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-4">
        {CHECKLIST_ITEMS.map((cat) => (
          <div key={cat.category} className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
            <div className="px-4 py-2 border-b" style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B' }}>
              <h3 className="text-xs font-semibold" style={{ color: '#C5A44E' }}>{cat.category}</h3>
            </div>
            <div className="divide-y" style={{ borderColor: 'rgba(44, 62, 107, 0.5)' }}>
              {cat.items.map((item) => (
                <div key={item.key}>
                  <div className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none hover:opacity-90 transition-opacity" onClick={() => toggleExpand(item.key)}>
                    {/* Checkbox */}
                    <button
                      onClick={(e) => { e.stopPropagation(); update({ [item.key]: !reg[item.key] }); }}
                      className="flex-shrink-0 cursor-pointer"
                    >
                      {reg[item.key]
                        ? <CheckCircle2 className="w-5 h-5" style={{ color: '#4CAF50' }} />
                        : <Circle className="w-5 h-5" style={{ color: '#7C8DB0' }} />
                      }
                    </button>

                    {/* Label */}
                    <span className={`text-sm flex-1 ${reg[item.key] ? 'line-through opacity-60' : ''}`} style={{ color: '#F4EDE4' }}>
                      {item.label}
                    </span>

                    {/* Expand icon */}
                    {expanded[item.key]
                      ? <ChevronDown className="w-4 h-4" style={{ color: '#7C8DB0' }} />
                      : <ChevronRight className="w-4 h-4" style={{ color: '#7C8DB0' }} />
                    }
                  </div>

                  {/* Expanded detail */}
                  {expanded[item.key] && (
                    <div className="px-4 pb-3 pl-12 space-y-1">
                      <p className="text-xs leading-relaxed" style={{ color: '#7C8DB0' }}>{item.detail}</p>
                      <p className="text-[10px] italic" style={{ color: '#C5A44E' }}>Source: {item.source}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Deal Timeline Gantt */}
      <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
        <div className="px-4 py-3 border-b flex items-center justify-between" style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B' }}>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" style={{ color: '#C5A44E' }} />
            <h3 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>Deal Timeline</h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs" style={{ color: '#7C8DB0' }}>Start Date</label>
              <input
                type="date"
                value={reg.dealStartDate || ''}
                onChange={(e) => update({ dealStartDate: e.target.value })}
                className="text-xs px-2 py-1 rounded border focus:outline-none cursor-pointer"
                style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B', color: '#F4EDE4' }}
              />
            </div>
            <select
              value={regulatoryType}
              onChange={(e) => setRegulatoryType(e.target.value)}
              className="text-xs px-2 py-1 rounded border focus:outline-none cursor-pointer"
              style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B', color: '#F4EDE4' }}
            >
              <option value="eca">ECA Only (17 weeks)</option>
              <option value="cbe">CBE + ECA (25 weeks)</option>
            </select>
          </div>
        </div>

        <div className="p-4 overflow-x-auto">
          <div style={{ minWidth: '800px' }}>
            {filteredPhases.map((phase, i) => {
              const barLeft = (phase.start / maxWeek) * 100;
              const barWidth = (phase.duration / maxWeek) * 100;
              const isActive = true; // All shown for now
              return (
                <div key={i} className="flex items-center gap-3 mb-2">
                  <div className="text-xs text-right flex-shrink-0" style={{ color: '#F4EDE4', width: '180px' }}>
                    {phase.label}
                  </div>
                  <div className="flex-1 relative h-6 rounded" style={{ backgroundColor: '#0B0F1A' }}>
                    <div
                      className="absolute h-full rounded transition-all"
                      style={{
                        left: `${barLeft}%`,
                        width: `${barWidth}%`,
                        backgroundColor: phase.label.includes('Post-Close') ? '#2C3E6B' : '#C5A44E',
                        opacity: 0.85,
                      }}
                    />
                    <div className="absolute h-full flex items-center text-[10px] font-bold" style={{
                      left: `${barLeft + barWidth / 2}%`,
                      transform: 'translateX(-50%)',
                      color: '#0B0F1A',
                    }}>
                      Wk {phase.start}–{phase.start + phase.duration}
                    </div>
                  </div>
                  <div className="text-[10px] flex-shrink-0" style={{ color: '#7C8DB0', width: '80px' }}>
                    {dealStartDate ? getWeekDate(phase.start) : `Week ${phase.start}`}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Week scale */}
          <div className="flex items-center gap-3 mt-2">
            <div style={{ width: '180px' }} />
            <div className="flex-1 flex justify-between text-[10px]" style={{ color: '#7C8DB0' }}>
              {[0, 10, 20, 30, 40, 50, 60, 70].map(w => (
                <span key={w}>Wk {w}</span>
              ))}
            </div>
            <div style={{ width: '80px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
