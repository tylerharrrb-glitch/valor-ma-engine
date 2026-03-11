import { useState, useMemo, useCallback } from 'react';
import { useDeal } from '../../context/DealContext';
import SectionHeader from '../shared/SectionHeader';
import StatusBadge from '../shared/StatusBadge';
import { Plus, X, Search, ArrowUpDown, Send, Filter, Database } from 'lucide-react';

const SECTORS = ['All', 'Banking', 'Real Estate', 'Real Estate / Development', 'Telecommunications', 'Investment Banking / Financial Services', 'Insurance', 'Consumer', 'Healthcare', 'Industrial', 'Technology', 'Energy', 'Other'];
const COUNTRIES = ['All', 'Egypt', 'UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain', 'Other'];
const STATUSES = ['All', 'Completed', 'Announced', 'Pending'];

const EMPTY_TXN = {
  name: '', announced: '', acquirer: '', acquirerCountry: 'Egypt', target: '',
  targetCountry: 'Egypt', sector: 'Other', dealValueUSD_M: 0, consideration: 'Cash',
  stakeAcquired: 100, status: 'Announced', evRevenue: null, evEBITDA: null,
  premiumPercent: null, notes: '',
};

export default function PrecedentTransactions() {
  const { state, dispatch, formatNumber } = useDeal();
  const txns = state.precedentTransactions;

  // Filters
  const [sectorFilter, setSectorFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('announced');
  const [sortDir, setSortDir] = useState('desc');

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [formData, setFormData] = useState(EMPTY_TXN);

  // Sort
  const toggleSort = useCallback((key) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }, [sortKey]);

  // Filtered + sorted data
  const filtered = useMemo(() => {
    let data = [...txns];
    if (sectorFilter !== 'All') data = data.filter(t => t.sector === sectorFilter);
    if (countryFilter !== 'All') data = data.filter(t => t.acquirerCountry === countryFilter || t.targetCountry === countryFilter);
    if (statusFilter !== 'All') data = data.filter(t => t.status === statusFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(t =>
        t.name?.toLowerCase().includes(q) ||
        t.acquirer?.toLowerCase().includes(q) ||
        t.target?.toLowerCase().includes(q)
      );
    }
    data.sort((a, b) => {
      const va = a[sortKey] ?? '';
      const vb = b[sortKey] ?? '';
      const cmp = typeof va === 'number' ? va - vb : String(va).localeCompare(String(vb));
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return data;
  }, [txns, sectorFilter, countryFilter, statusFilter, searchQuery, sortKey, sortDir]);

  // Analytics
  const analytics = useMemo(() => {
    const evEBITDAs = filtered.filter(t => t.evEBITDA != null).map(t => t.evEBITDA);
    const premia = filtered.filter(t => t.premiumPercent != null).map(t => t.premiumPercent);

    const median = (arr) => {
      if (!arr.length) return null;
      const s = [...arr].sort((a, b) => a - b);
      const mid = Math.floor(s.length / 2);
      return s.length % 2 !== 0 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
    };
    const mean = (arr) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;

    return {
      dealCount: filtered.length,
      totalValueUSD: filtered.reduce((sum, t) => sum + (t.dealValueUSD_M || 0), 0),
      medianEVEBITDA: median(evEBITDAs),
      meanEVEBITDA: mean(evEBITDAs),
      medianPremium: median(premia),
      meanPremium: mean(premia),
    };
  }, [filtered]);

  // CRUD Handlers
  const openAdd = () => {
    setFormData({ ...EMPTY_TXN, id: Date.now() });
    setEditIdx(null);
    setShowModal(true);
  };

  const openEdit = (idx) => {
    setFormData({ ...txns[idx] });
    setEditIdx(idx);
    setShowModal(true);
  };

  const saveTransaction = () => {
    const newList = [...txns];
    if (editIdx !== null) {
      newList[editIdx] = formData;
    } else {
      newList.push(formData);
    }
    dispatch({ type: 'UPDATE_PRECEDENT_TRANSACTIONS', payload: newList });
    setShowModal(false);
  };

  const deleteTransaction = (idx) => {
    const newList = txns.filter((_, i) => i !== idx);
    dispatch({ type: 'UPDATE_PRECEDENT_TRANSACTIONS', payload: newList });
  };

  // Send to Fairness Opinion
  const sendToFairness = useCallback(() => {
    const evEBITDAs = filtered.filter(t => t.evEBITDA != null).map(t => t.evEBITDA);
    if (evEBITDAs.length < 2) return;
    const sorted = [...evEBITDAs].sort((a, b) => a - b);
    const low = sorted[0];
    const high = sorted[sorted.length - 1];

    // Need target EBITDA per share to convert — use raw multiples
    const targetEBITDA = state.target.ebitda;
    const targetShares = state.target.sharesOutstanding;
    if (targetEBITDA > 0 && targetShares > 0) {
      const ebitdaPerShare = targetEBITDA / targetShares;
      dispatch({
        type: 'UPDATE_FAIRNESS',
        payload: {
          precedentLow: Math.round(low * ebitdaPerShare * 100) / 100,
          precedentHigh: Math.round(high * ebitdaPerShare * 100) / 100,
        }
      });
    }
  }, [filtered, state.target, dispatch]);

  const fm = (v, d = 1) => v !== null && v !== undefined ? formatNumber(v, d) : '—';

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Precedent Transactions"
        subtitle="Egypt/MENA M&A transaction database — filter, analyze, and benchmark deal metrics"
      />

      {/* Analytics Cards */}
      <div className="grid grid-cols-6 gap-3">
        <StatCard label="Transactions" value={analytics.dealCount} />
        <StatCard label="Total Value" value={`$${fm(analytics.totalValueUSD, 0)}M`} />
        <StatCard label="Median EV/EBITDA" value={analytics.medianEVEBITDA !== null ? `${fm(analytics.medianEVEBITDA)}x` : '—'} />
        <StatCard label="Mean EV/EBITDA" value={analytics.meanEVEBITDA !== null ? `${fm(analytics.meanEVEBITDA)}x` : '—'} />
        <StatCard label="Median Premium" value={analytics.medianPremium !== null ? `${fm(analytics.medianPremium)}%` : '—'} />
        <StatCard label="Mean Premium" value={analytics.meanPremium !== null ? `${fm(analytics.meanPremium)}%` : '—'} />
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-1.5 rounded border" style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B' }}>
          <Search className="w-3.5 h-3.5" style={{ color: '#7C8DB0' }} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-xs bg-transparent focus:outline-none"
            style={{ color: '#F4EDE4' }}
          />
        </div>

        {/* Filters */}
        <FilterSelect label="Sector" value={sectorFilter} options={SECTORS} onChange={setSectorFilter} />
        <FilterSelect label="Country" value={countryFilter} options={COUNTRIES} onChange={setCountryFilter} />
        <FilterSelect label="Status" value={statusFilter} options={STATUSES} onChange={setStatusFilter} />

        {/* Actions */}
        <button onClick={openAdd} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded transition-colors cursor-pointer" style={{ backgroundColor: '#C5A44E', color: '#0B0F1A' }}>
          <Plus className="w-3.5 h-3.5" />Add
        </button>
        <button onClick={sendToFairness} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded border transition-colors cursor-pointer" style={{ borderColor: '#C5A44E', color: '#C5A44E' }} title="Send EV/EBITDA range to Fairness Opinion">
          <Send className="w-3.5 h-3.5" />Send to Fairness
        </button>
      </div>

      {/* Transaction Table */}
      <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ backgroundColor: '#0B0F1A' }}>
                {[
                  { key: 'name', label: 'Transaction', w: '200px' },
                  { key: 'announced', label: 'Date', w: '70px' },
                  { key: 'acquirer', label: 'Acquirer', w: '140px' },
                  { key: 'targetCountry', label: 'Target Country', w: '90px' },
                  { key: 'sector', label: 'Sector', w: '120px' },
                  { key: 'dealValueUSD_M', label: 'Value ($M)', w: '80px' },
                  { key: 'stakeAcquired', label: 'Stake %', w: '60px' },
                  { key: 'evEBITDA', label: 'EV/EBITDA', w: '70px' },
                  { key: 'premiumPercent', label: 'Premium', w: '70px' },
                  { key: 'status', label: 'Status', w: '80px' },
                ].map((col) => (
                  <th
                    key={col.key}
                    className="text-left px-3 py-2 font-semibold cursor-pointer select-none"
                    style={{ color: '#C5A44E', minWidth: col.w }}
                    onClick={() => toggleSort(col.key)}
                  >
                    <span className="flex items-center gap-1">
                      {col.label}
                      {sortKey === col.key && <ArrowUpDown className="w-3 h-3" />}
                    </span>
                  </th>
                ))}
                <th className="px-3 py-2" style={{ color: '#C5A44E', width: '60px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-8" style={{ color: '#7C8DB0' }}>
                    <Database className="w-6 h-6 inline mb-2" /><br />
                    No transactions match your filters
                  </td>
                </tr>
              ) : (
                filtered.map((t, i) => {
                  const origIdx = txns.indexOf(t);
                  return (
                    <tr key={t.id || i} className="border-b last:border-0 hover:opacity-80 transition-opacity cursor-pointer" style={{ backgroundColor: i % 2 === 0 ? '#1A2340' : '#1e2a4a', borderColor: 'rgba(44, 62, 107, 0.5)' }} onClick={() => openEdit(origIdx)}>
                      <td className="px-3 py-2 font-medium" style={{ color: '#F4EDE4' }}>{t.name}</td>
                      <td className="px-3 py-2" style={{ color: '#7C8DB0' }}>{t.announced}</td>
                      <td className="px-3 py-2" style={{ color: '#F4EDE4' }}>{t.acquirer}</td>
                      <td className="px-3 py-2" style={{ color: '#7C8DB0' }}>{t.targetCountry}</td>
                      <td className="px-3 py-2" style={{ color: '#7C8DB0' }}>{t.sector}</td>
                      <td className="px-3 py-2 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>
                        {t.dealValueUSD_M ? fm(t.dealValueUSD_M, 0) : '—'}
                      </td>
                      <td className="px-3 py-2 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>
                        {t.stakeAcquired ? `${fm(t.stakeAcquired, 0)}%` : '—'}
                      </td>
                      <td className="px-3 py-2 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#C5A44E' }}>
                        {t.evEBITDA ? `${fm(t.evEBITDA)}x` : '—'}
                      </td>
                      <td className="px-3 py-2 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: t.premiumPercent > 0 ? '#4CAF50' : '#F4EDE4' }}>
                        {t.premiumPercent !== null && t.premiumPercent !== undefined ? `${fm(t.premiumPercent)}%` : '—'}
                      </td>
                      <td className="px-3 py-2">
                        <StatusBadge type={t.status === 'Completed' ? 'accretive' : t.status === 'Pending' ? 'caution' : 'neutral'} label={t.status} />
                      </td>
                      <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => deleteTransaction(origIdx)} className="text-xs px-1.5 py-0.5 rounded transition-colors cursor-pointer hover:bg-red-900/30" style={{ color: '#E53935' }}>
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="w-full max-w-xl rounded-lg border p-5 max-h-[80vh] overflow-y-auto" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>{editIdx !== null ? 'Edit Transaction' : 'Add Transaction'}</h3>
              <button onClick={() => setShowModal(false)} className="cursor-pointer" style={{ color: '#7C8DB0' }}><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <ModalInput label="Transaction Name" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} span={2} />
              <ModalInput label="Date (Year or Full)" value={formData.announced} onChange={(v) => setFormData({ ...formData, announced: v })} />
              <ModalInput label="Acquirer" value={formData.acquirer} onChange={(v) => setFormData({ ...formData, acquirer: v })} />
              <ModalInput label="Acquirer Country" value={formData.acquirerCountry} onChange={(v) => setFormData({ ...formData, acquirerCountry: v })} />
              <ModalInput label="Target" value={formData.target} onChange={(v) => setFormData({ ...formData, target: v })} />
              <ModalInput label="Target Country" value={formData.targetCountry} onChange={(v) => setFormData({ ...formData, targetCountry: v })} />
              <ModalSelect label="Sector" value={formData.sector} options={SECTORS.filter(s => s !== 'All')} onChange={(v) => setFormData({ ...formData, sector: v })} />
              <ModalInput label="Deal Value (USD M)" value={formData.dealValueUSD_M} onChange={(v) => setFormData({ ...formData, dealValueUSD_M: parseFloat(v) || 0 })} type="number" />
              <ModalInput label="Stake %" value={formData.stakeAcquired} onChange={(v) => setFormData({ ...formData, stakeAcquired: parseFloat(v) || 0 })} type="number" />
              <ModalSelect label="Consideration" value={formData.consideration} options={['Cash', 'Stock', 'Cash + Stock', 'Asset Swap']} onChange={(v) => setFormData({ ...formData, consideration: v })} />
              <ModalSelect label="Status" value={formData.status} options={['Completed', 'Announced', 'Pending']} onChange={(v) => setFormData({ ...formData, status: v })} />
              <ModalInput label="EV/EBITDA" value={formData.evEBITDA ?? ''} onChange={(v) => setFormData({ ...formData, evEBITDA: v === '' ? null : parseFloat(v) })} type="number" />
              <ModalInput label="EV/Revenue" value={formData.evRevenue ?? ''} onChange={(v) => setFormData({ ...formData, evRevenue: v === '' ? null : parseFloat(v) })} type="number" />
              <ModalInput label="Premium %" value={formData.premiumPercent ?? ''} onChange={(v) => setFormData({ ...formData, premiumPercent: v === '' ? null : parseFloat(v) })} type="number" />
              <ModalInput label="Notes" value={formData.notes} onChange={(v) => setFormData({ ...formData, notes: v })} span={2} />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowModal(false)} className="text-xs px-3 py-1.5 rounded border cursor-pointer" style={{ borderColor: '#2C3E6B', color: '#7C8DB0' }}>Cancel</button>
              <button onClick={saveTransaction} className="text-xs font-semibold px-4 py-1.5 rounded cursor-pointer" style={{ backgroundColor: '#C5A44E', color: '#0B0F1A' }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="p-3 rounded border" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
      <div className="text-[10px] mb-1" style={{ color: '#7C8DB0' }}>{label}</div>
      <div className="text-sm font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>{value}</div>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-xs px-2 py-1.5 rounded border focus:outline-none cursor-pointer"
      style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B', color: '#F4EDE4' }}
      title={label}
    >
      {options.map((o) => <option key={o} value={o}>{o === 'All' ? `${label}: All` : o}</option>)}
    </select>
  );
}

function ModalInput({ label, value, onChange, type = 'text', span = 1 }) {
  return (
    <div className={span === 2 ? 'col-span-2' : ''}>
      <label className="text-[10px] font-medium block mb-1" style={{ color: '#7C8DB0' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-xs px-2 py-1.5 rounded border focus:outline-none focus:border-[#C5A44E] transition-colors"
        style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B', color: '#F4EDE4', fontFamily: type === 'number' ? "'IBM Plex Mono', monospace" : undefined }}
      />
    </div>
  );
}

function ModalSelect({ label, value, options, onChange }) {
  return (
    <div>
      <label className="text-[10px] font-medium block mb-1" style={{ color: '#7C8DB0' }}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-xs px-2 py-1.5 rounded border focus:outline-none cursor-pointer"
        style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B', color: '#F4EDE4' }}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
