import { useMemo } from 'react';
import { useDeal } from '../../context/DealContext';
import { EGYPT_PARAMS } from '../../constants/egyptParams';
import SectionHeader from '../shared/SectionHeader';
import MetricCard from '../shared/MetricCard';
import {
  DollarSign, TrendingUp, TrendingDown, BarChart3,
  GitMerge, Building2, Link2, Scale, Landmark, ClipboardCheck, FileText, Percent
} from 'lucide-react';

const quickActions = [
  { id: 'merger', label: 'Merger Model', desc: 'Accretion / Dilution Analysis', icon: GitMerge },
  { id: 'sources-uses', label: 'Sources & Uses', desc: 'Balanced transaction funding', icon: Building2 },
  { id: 'synergies', label: 'Synergy Analysis', desc: 'Revenue & cost synergies', icon: Link2 },
  { id: 'lbo', label: 'LBO Model', desc: 'Leveraged buyout returns', icon: BarChart3 },
  { id: 'fairness', label: 'Fairness Opinion', desc: 'Football field valuation', icon: Scale },
  { id: 'precedents', label: 'Precedents', desc: 'Transaction database', icon: Landmark },
];

export default function CommandCenter() {
  const { state, dispatch, formatCurrency, formatNumber } = useDeal();

  // Compute Merger Model values for KPI cards
  const mergerMetrics = useMemo(() => {
    const a = state.acquirer;
    const t = state.target;
    const d = state.dealTerms;

    if (!t.sharesOutstanding || !d.offerPricePerShare) {
      return { dealValue: 0, premium: 0, epsImpact: 0, isAccretive: false };
    }

    const purchasePrice = d.offerPricePerShare * t.sharesOutstanding;
    const premium = t.sharePrice > 0 ? (d.offerPricePerShare / t.sharePrice - 1) * 100 : 0;

    // Quick EPS calculation for dashboard
    const stockComponent = purchasePrice * (d.stockPercent / 100);
    const newShares = a.sharePrice > 0 ? stockComponent / a.sharePrice : 0;
    const proFormaShares = a.sharesOutstanding + newShares;

    const cashComponent = purchasePrice * (d.cashPercent / 100);
    const debtForCash = cashComponent * (d.newDebtForCashPercent / 100);
    const cashFromBalance = cashComponent - debtForCash;

    const goodwill = purchasePrice - t.bookValueOfEquity;
    const goodwillAmort = goodwill / EGYPT_PARAMS.GOODWILL_AMORTIZATION_YEARS;
    const goodwillAmortAT = goodwillAmort * (1 - d.dealTaxRate);

    const interestOnDebt = debtForCash * (d.newDebtInterestRate / 100);
    const lostInterest = cashFromBalance * (EGYPT_PARAMS.CBE_OVERNIGHT_DEPOSIT_RATE * 0.80);
    const totalIncrInterest = (interestOnDebt + lostInterest) * (1 - d.dealTaxRate);

    const synY1 = d.synergiesInputConvention === 'Pre-Tax'
      ? d.synergiesYear1 * (1 - d.dealTaxRate)
      : d.synergiesYear1;

    const proFormaNI = a.netIncome + t.netIncome + synY1 - goodwillAmortAT - totalIncrInterest;
    const standaloneEPS = a.sharesOutstanding > 0 ? a.netIncome / a.sharesOutstanding : 0;
    const proFormaEPS = proFormaShares > 0 ? proFormaNI / proFormaShares : 0;
    const epsImpact = standaloneEPS !== 0 ? ((proFormaEPS - standaloneEPS) / standaloneEPS) * 100 : 0;

    return {
      dealValue: purchasePrice,
      premium,
      epsImpact,
      isAccretive: epsImpact > 0,
    };
  }, [state.acquirer, state.target, state.dealTerms]);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: '#C5A44E' }}>
          Command Center
        </h1>
        <p className="text-sm" style={{ color: '#7C8DB0' }}>
          {state.acquirerName && state.targetName
            ? `${state.acquirerName} × ${state.targetName}`
            : 'Configure your transaction parameters to begin analysis.'
          }
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <MetricCard
          title="Deal Value"
          value={mergerMetrics.dealValue > 0 ? formatCurrency(mergerMetrics.dealValue) : '—'}
          icon={DollarSign}
        />
        <MetricCard
          title="Premium Paid"
          value={mergerMetrics.premium !== 0 ? `${formatNumber(mergerMetrics.premium, 1)}%` : '—'}
          icon={Percent}
          accentColor={mergerMetrics.premium > 40 ? '#FF9800' : '#C5A44E'}
        />
        <MetricCard
          title="EPS Impact — Year 1"
          value={mergerMetrics.epsImpact !== 0
            ? `${mergerMetrics.epsImpact > 0 ? '+' : ''}${formatNumber(mergerMetrics.epsImpact, 2)}%`
            : '—'}
          subtitle={mergerMetrics.epsImpact !== 0
            ? (mergerMetrics.isAccretive ? 'Accretive ✅' : 'Dilutive ❌')
            : null}
          icon={mergerMetrics.isAccretive ? TrendingUp : TrendingDown}
          accentColor={mergerMetrics.isAccretive ? '#4CAF50' : '#E53935'}
        />
        <MetricCard title="LBO IRR" value="—" subtitle="Configure LBO model" icon={BarChart3} />
        <MetricCard title="MOIC" value="—" subtitle="Configure LBO model" icon={TrendingUp} />
        <MetricCard title="NPV Synergies" value="—" subtitle="Configure synergy analysis" icon={DollarSign} />
      </div>

      {/* Quick Actions */}
      <SectionHeader title="Modules" subtitle="Select a module to begin configuration" />
      <div className="grid grid-cols-3 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => dispatch({ type: 'SET_ACTIVE_MODULE', payload: action.id })}
              className="flex items-center gap-3 p-4 rounded-lg border text-left transition-all cursor-pointer hover:border-[#C5A44E] group"
              style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}
            >
              <div className="p-2 rounded" style={{ backgroundColor: 'rgba(197, 164, 78, 0.1)' }}>
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: '#C5A44E' }} />
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: '#F4EDE4' }}>{action.label}</div>
                <div className="text-xs" style={{ color: '#7C8DB0' }}>{action.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
