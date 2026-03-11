import { useCallback } from 'react';
import { useDeal } from '../../context/DealContext';
import InputField from '../shared/InputField';
import SectionHeader from '../shared/SectionHeader';
import { EGYPT_PARAMS } from '../../constants/egyptParams';
import { Users, Building2, ShoppingCart, Monitor, PieChart } from 'lucide-react';

const REVENUE_CATEGORIES = [
  { key: 'crossSelling', label: 'Cross-Selling / Upselling' },
  { key: 'geoExpansion', label: 'Geographic Expansion (MENA)' },
  { key: 'pricingPower', label: 'Pricing Power' },
  { key: 'newProducts', label: 'New Products (Combined)' },
  { key: 'customerBase', label: 'Customer Base Expansion' },
];

const YEARS = [1, 2, 3, 4, 5];

export default function SynergyInputs() {
  const { state, dispatch, formatNumber } = useDeal();
  const syn = state.synergies;

  const update = useCallback((payload) => {
    dispatch({ type: 'UPDATE_SYNERGIES', payload });
  }, [dispatch]);

  const updateRevCategory = useCallback((key, yearIndex, value) => {
    const arr = [...syn[key]];
    arr[yearIndex] = value;
    update({ [key]: arr });
  }, [syn, update]);

  const updatePhaseIn = useCallback((yearIndex, value) => {
    const arr = [...syn.phaseIn];
    arr[yearIndex] = Math.min(100, Math.max(0, value));
    update({ phaseIn: arr });
  }, [syn.phaseIn, update]);

  // Auto-calc display for severance
  const severanceAuto = syn.redundantPositions
    * syn.avgAnnualSalary
    * (EGYPT_PARAMS.SEVERANCE_MONTHS_PER_YEAR_OF_SERVICE / 12)
    * (syn.avgYearsOfService || 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <SectionHeader
        title="Synergy Analysis"
        subtitle="Quantify, phase-in, tax-effect, and NPV-discount synergies created by the combination"
      />

      {/* ── REVENUE SYNERGIES GRID ── */}
      <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
        <div className="px-4 py-3 border-b" style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B' }}>
          <h3 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>Revenue Synergies (EGP M)</h3>
          <p className="text-xs mt-0.5" style={{ color: '#7C8DB0' }}>Enter incremental revenue by category for each year</p>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left px-2 py-2 text-xs font-semibold" style={{ color: '#7C8DB0', minWidth: '180px' }}>Category</th>
                {YEARS.map((y) => (
                  <th key={y} className="text-center px-2 py-2 text-xs font-semibold" style={{ color: '#C5A44E', minWidth: '100px' }}>
                    Year {y}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REVENUE_CATEGORIES.map((cat, ri) => (
                <tr key={cat.key} style={{ backgroundColor: ri % 2 === 0 ? '#1A2340' : '#1e2a4a' }}>
                  <td className="px-2 py-2 text-xs font-medium" style={{ color: '#F4EDE4' }}>{cat.label}</td>
                  {YEARS.map((y, yi) => (
                    <td key={y} className="px-1 py-1">
                      <input
                        type="number"
                        step={1}
                        value={syn[cat.key][yi] || ''}
                        onChange={(e) => {
                          const v = parseFloat(e.target.value) || 0;
                          updateRevCategory(cat.key, yi, v);
                        }}
                        className="w-full bg-transparent text-right px-2 py-1.5 text-xs rounded border focus:outline-none focus:border-[#C5A44E] transition-colors"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          color: '#F4EDE4',
                          borderColor: '#2C3E6B',
                          backgroundColor: '#0B0F1A',
                        }}
                        placeholder="0"
                      />
                    </td>
                  ))}
                </tr>
              ))}
              {/* Totals row */}
              <tr style={{ borderTop: '2px solid #C5A44E' }}>
                <td className="px-2 py-2 text-xs font-bold" style={{ color: '#C5A44E' }}>Total Revenue Synergies</td>
                {YEARS.map((y, yi) => {
                  const total = REVENUE_CATEGORIES.reduce((sum, cat) => sum + (syn[cat.key][yi] || 0), 0);
                  return (
                    <td key={y} className="px-2 py-2 text-right text-xs font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#C5A44E' }}>
                      {formatNumber(total, 1)}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── COST SYNERGIES ── */}
      <div className="grid grid-cols-2 gap-6">
        {/* Headcount */}
        <div className="rounded-lg border p-4" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4" style={{ color: '#C5A44E' }} />
            <h4 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>Headcount Reduction</h4>
          </div>
          <div className="space-y-3">
            <InputField label="Redundant Positions" value={syn.redundantPositions} onChange={(v) => update({ redundantPositions: v })} suffix="roles" tooltip="Number of redundant roles to be eliminated" />
            <InputField label="Avg Annual Salary" value={syn.avgAnnualSalary} onChange={(v) => update({ avgAnnualSalary: v })} tooltip="Average annual gross salary per role (EGP M)" />
            <div className="mt-2 px-3 py-2 rounded text-xs" style={{ backgroundColor: '#0B0F1A' }}>
              <div className="flex justify-between" style={{ color: '#7C8DB0' }}>
                <span>Salary Savings</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>
                  {formatNumber(syn.redundantPositions * syn.avgAnnualSalary, 1)}M
                </span>
              </div>
              <div className="flex justify-between mt-1" style={{ color: '#7C8DB0' }}>
                <span>Social Insurance ({(EGYPT_PARAMS.SOCIAL_INSURANCE_EMPLOYER_RATE * 100).toFixed(2)}%)</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>
                  {formatNumber(syn.redundantPositions * syn.avgAnnualSalary * EGYPT_PARAMS.SOCIAL_INSURANCE_EMPLOYER_RATE, 1)}M
                </span>
              </div>
              <div className="flex justify-between mt-1 pt-1 border-t" style={{ borderColor: '#2C3E6B', color: '#C5A44E' }}>
                <span className="font-semibold">Run-Rate Synergy</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {formatNumber(syn.redundantPositions * syn.avgAnnualSalary * (1 + EGYPT_PARAMS.SOCIAL_INSURANCE_EMPLOYER_RATE), 1)}M
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div className="rounded-lg border p-4" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-4 h-4" style={{ color: '#C5A44E' }} />
            <h4 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>Facility Consolidation</h4>
          </div>
          <div className="space-y-3">
            <InputField label="Duplicate Facilities" value={syn.duplicateFacilities} onChange={(v) => update({ duplicateFacilities: v })} suffix="sites" tooltip="Number of offices/warehouses to close" />
            <InputField label="Avg Annual Rent/Facility" value={syn.avgRentPerFacility} onChange={(v) => update({ avgRentPerFacility: v })} tooltip="Average annual rental cost per facility (EGP M)" />
            <div className="mt-2 px-3 py-2 rounded text-xs" style={{ backgroundColor: '#0B0F1A' }}>
              <div className="flex justify-between" style={{ color: '#C5A44E' }}>
                <span className="font-semibold">Run-Rate Synergy</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {formatNumber(syn.duplicateFacilities * syn.avgRentPerFacility, 1)}M
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Procurement */}
        <div className="rounded-lg border p-4" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-4 h-4" style={{ color: '#C5A44E' }} />
            <h4 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>Procurement Savings</h4>
          </div>
          <div className="space-y-3">
            <InputField label="Combined Procurement Spend" value={syn.combinedProcurementSpend} onChange={(v) => update({ combinedProcurementSpend: v })} tooltip="Combined annual COGS + procurement spend" />
            <InputField label="Procurement Discount" value={syn.procurementDiscountPct} onChange={(v) => update({ procurementDiscountPct: v })} suffix="%" tooltip="% discount from volume leverage" step={0.1} />
            <div className="mt-2 px-3 py-2 rounded text-xs" style={{ backgroundColor: '#0B0F1A' }}>
              <div className="flex justify-between" style={{ color: '#C5A44E' }}>
                <span className="font-semibold">Run-Rate Synergy</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {formatNumber(syn.combinedProcurementSpend * (syn.procurementDiscountPct / 100), 1)}M
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* IT + SG&A */}
        <div className="rounded-lg border p-4" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="w-4 h-4" style={{ color: '#C5A44E' }} />
                <h4 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>Technology Consolidation</h4>
              </div>
              <InputField label="Annual IT Savings" value={syn.itSavings} onChange={(v) => update({ itSavings: v })} tooltip="Licenses, maintenance, duplicate systems" />
            </div>
            <div className="pt-3 border-t" style={{ borderColor: '#2C3E6B' }}>
              <div className="flex items-center gap-2 mb-3">
                <PieChart className="w-4 h-4" style={{ color: '#C5A44E' }} />
                <h4 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>SG&A Overlap</h4>
              </div>
              <div className="space-y-3">
                <InputField label="Combined SG&A" value={syn.combinedSGA} onChange={(v) => update({ combinedSGA: v })} tooltip="Combined annual SG&A of both entities" />
                <InputField label="Overlap Percentage" value={syn.sgaOverlapPct} onChange={(v) => update({ sgaOverlapPct: v })} suffix="%" tooltip="% of combined SG&A that is redundant" step={0.1} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PHASE-IN SCHEDULE ── */}
      <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
        <div className="px-4 py-3 border-b" style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B' }}>
          <h3 className="text-sm font-semibold" style={{ color: '#C5A44E' }}>Cost Synergy Phase-In Schedule</h3>
          <p className="text-xs mt-0.5" style={{ color: '#7C8DB0' }}>Percentage of run-rate cost synergies realized each year</p>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-5 gap-4">
            {YEARS.map((y, yi) => (
              <div key={y} className="text-center">
                <label className="text-xs font-medium block mb-2" style={{ color: '#7C8DB0' }}>Year {y}</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={5}
                  value={syn.phaseIn[yi]}
                  onChange={(e) => updatePhaseIn(yi, parseFloat(e.target.value) || 0)}
                  className="w-full text-center px-2 py-2 text-sm rounded border focus:outline-none focus:border-[#C5A44E] transition-colors"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: '#F4EDE4',
                    borderColor: '#2C3E6B',
                    backgroundColor: '#0B0F1A',
                  }}
                />
                <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#0B0F1A' }}>
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${syn.phaseIn[yi]}%`,
                      backgroundColor: syn.phaseIn[yi] >= 100 ? '#4CAF50' : syn.phaseIn[yi] >= 75 ? '#C5A44E' : '#FF9800',
                    }}
                  />
                </div>
                <span className="text-xs mt-1 block" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#7C8DB0' }}>
                  {syn.phaseIn[yi]}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── INTEGRATION COSTS ── */}
      <div className="rounded-lg border p-4" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: '#C5A44E' }}>Integration Costs (One-Time — Year 0)</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-3">
            <InputField label="Avg Years of Service" value={syn.avgYearsOfService} onChange={(v) => update({ avgYearsOfService: v })} suffix="years" tooltip="Average tenure for redundant employees" step={0.5} />
            <div className="px-3 py-2 rounded text-xs" style={{ backgroundColor: '#0B0F1A' }}>
              <div className="flex justify-between" style={{ color: '#7C8DB0' }}>
                <span>Severance (auto-calc)</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#F4EDE4' }}>
                  {formatNumber(severanceAuto, 1)}M
                </span>
              </div>
              <p className="text-[10px] mt-1" style={{ color: '#7C8DB0' }}>
                Egyptian Labor Law Art. 120 — {EGYPT_PARAMS.SEVERANCE_MONTHS_PER_YEAR_OF_SERVICE} months/year
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <InputField label="Facility Closure Costs" value={syn.facilityClosureCosts} onChange={(v) => update({ facilityClosureCosts: v })} tooltip="Lease breakage, removal, relocation costs" />
            <InputField label="IT Integration Costs" value={syn.itIntegrationCosts} onChange={(v) => update({ itIntegrationCosts: v })} tooltip="System migration, ERP integration" />
          </div>
          <div className="space-y-3">
            <InputField label="Rebranding Costs" value={syn.rebrandingCosts} onChange={(v) => update({ rebrandingCosts: v })} tooltip="Signage, collateral, marketing" />
            <InputField label="Other Integration Costs" value={syn.otherIntegrationCosts} onChange={(v) => update({ otherIntegrationCosts: v })} tooltip="Consultants, training, other" />
          </div>
        </div>

        {/* WACC Input */}
        <div className="mt-4 pt-4 border-t" style={{ borderColor: '#2C3E6B' }}>
          <div className="max-w-xs">
            <InputField label="WACC (for NPV)" value={(syn.wacc || 0) * 100} onChange={(v) => update({ wacc: v / 100 })} suffix="%" tooltip="Weighted Average Cost of Capital — used to discount synergies" step={0.5} />
          </div>
        </div>
      </div>
    </div>
  );
}
