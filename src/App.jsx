import { useState } from 'react';
import { DealProvider, useDeal } from './context/DealContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
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

function LBOModule() {
  const { state } = useDeal();
  const calc = useLBOCalculations(state.lbo);
  return <><LBOEntry calc={calc} /><LBOOperating calc={calc} /><LBOOutputs calc={calc} /></>;
}

function AppContent() {
  const { state } = useDeal();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
    <div className="min-h-screen" style={{ backgroundColor: '#0B0F1A' }}>
      <Navbar />
      <Sidebar />
      <main
        className="pt-14 transition-all duration-300"
        style={{ marginLeft: '200px' }}
      >
        <div className="p-6 max-w-[1400px] mx-auto">
          {renderModule()}
        </div>

        {/* Footer */}
        <footer className="mt-12 px-6 py-4 border-t text-center" style={{ borderColor: '#2C3E6B' }}>
          <p className="text-xs" style={{ color: '#7C8DB0' }}>
            Valor parameters are calibrated to Egyptian law and CBE rates as of Q4 2024. Tax rates, regulatory thresholds,
            and CBE interest rates are subject to change. Users must verify current rates with qualified legal and tax advisors
            before relying on this engine for actual transactions. This engine does not constitute legal, tax, or financial advisory services.
          </p>
          <p className="text-xs mt-2" style={{ color: '#2C3E6B' }}>
            ⟐ Valor M&A Engine | Part of the Wolf Financial Suite
          </p>
        </footer>
      </main>
    </div>
  );
}

function PlaceholderModule({ name, desc }) {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center py-20">
      <div className="text-4xl mb-4">🔒</div>
      <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#C5A44E' }}>
        {name}
      </h2>
      <p className="text-sm text-center max-w-md" style={{ color: '#7C8DB0' }}>
        {desc}
      </p>
      <p className="text-xs mt-4 px-3 py-1.5 rounded" style={{ backgroundColor: '#1A2340', color: '#7C8DB0' }}>
        Module deployment scheduled — next session
      </p>
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
