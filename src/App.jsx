import { useState, useMemo, useEffect, useRef } from 'react';
import { DealProvider, useDeal } from './context/DealContext';
import Navbar from './components/layout/Navbar';
import ModuleBar from './components/layout/ModuleBar';
import HeroStrip from './components/layout/HeroStrip';
import CommandCenter from './components/dashboard/CommandCenter';
import MergerModel from './components/merger/MergerModel';
import SourcesUses from './components/sources-uses/SourcesUses';
import SynergyInputs from './components/synergies/SynergyInputs';
import SynergyOutputs from './components/synergies/SynergyOutputs';
import LBOEntry from './components/lbo/LBOEntry';
import LBOOperating from './components/lbo/LBOOperating';
import LBOOutputs from './components/lbo/LBOOutputs';
import { useLBOCalculations } from './hooks/useLBOCalculations';
import FootballField from './components/fairness/FootballField';
import PrecedentTransactions from './components/precedents/PrecedentTransactions';
import RegulatoryChecklist from './components/regulatory/RegulatoryChecklist';
import DispatchPDF from './components/dispatch/DispatchPDF';
import ValorAnalyst from './components/analyst/ValorAnalyst';

function LBOModule() {
  const { state } = useDeal();
  const calc = useLBOCalculations(state.lbo);
  return <><LBOEntry calc={calc} /><LBOOperating calc={calc} /><LBOOutputs calc={calc} /></>;
}

// Scroll-reveal observer
function useReveal() {
  const containerRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    if (containerRef.current) {
      containerRef.current.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  });
  return containerRef;
}

function AppContent() {
  const { state } = useDeal();
  const [analystOpen, setAnalystOpen] = useState(false);
  const containerRef = useReveal();

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

  const renderModule = () => {
    switch (state.activeModule) {
      case 'command-center':
        return <CommandCenter />;
      case 'merger':
        return <MergerModel />;
      case 'sources-uses':
        return <SourcesUses />;
      case 'synergies':
        return <><SynergyInputs /><SynergyOutputs /></>;
      case 'lbo':
        return <LBOModule />;
      case 'fairness':
        return <FootballField />;
      case 'precedents':
        return <PrecedentTransactions />;
      case 'regulatory':
        return <RegulatoryChecklist />;
      case 'export':
        return <DispatchPDF />;
      default:
        return <CommandCenter />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar analystOpen={analystOpen} setAnalystOpen={setAnalystOpen} />
      {/* Spacer for fixed navbar */}
      <div style={{ height: 64 }} />
      <ModuleBar />

      {/* Hero strip — show on dashboard */}
      {state.activeModule === 'command-center' && <HeroStrip />}

      <main
        ref={containerRef}
        style={{
          paddingTop: state.activeModule === 'command-center' ? '0' : '32px',
          marginRight: analystOpen ? '420px' : '0',
          transition: 'margin-right 0.2s ease',
        }}
      >
        <div className="valor-container" style={{ paddingTop: '32px', paddingBottom: '80px' }}>
          {renderModule()}
        </div>

        {/* Section Divider */}
        <div className="section-divider" style={{ margin: '0 auto 0' }}></div>

        {/* Footer */}
        <footer style={{ padding: '40px 0', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
          <p style={{
            fontFamily: 'var(--ff-mono)',
            fontSize: '.78rem',
            color: 'var(--text-secondary)',
            margin: 0,
          }}>
            VALOR M&A Engine · Built by{' '}
            <a
              href="https://ahmedwael.pages.dev"
              style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}
            >
              Ahmed Wael Metwally
            </a>
            {' '}· Cairo, Egypt
          </p>
          <p style={{
            fontFamily: 'var(--ff-mono)',
            fontSize: '.68rem',
            color: 'var(--text-muted)',
            marginTop: '8px',
          }}>
            Merger Modeling · LBO Analysis · Synergy Quantification · Calibrated to Egyptian Law & FRA Requirements
          </p>
        </footer>
      </main>

      <ValorAnalyst
        dealData={dealData}
        isOpen={analystOpen}
        onClose={() => setAnalystOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <DealProvider>
      <AppContent />
    </DealProvider>
  );
}
