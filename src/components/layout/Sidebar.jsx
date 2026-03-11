import { useState } from 'react';
import { useDeal } from '../../context/DealContext';
import {
  LayoutDashboard, GitMerge, Building2, Link2,
  BarChart3, Scale, Landmark, ClipboardCheck, FileText, ChevronLeft, ChevronRight
} from 'lucide-react';

const modules = [
  { id: 'command-center', label: 'Command Center', icon: LayoutDashboard, emoji: '⚔️' },
  { id: 'merger', label: 'Merger Model', icon: GitMerge, emoji: '♟️' },
  { id: 'sources-uses', label: 'Sources & Uses', icon: Building2, emoji: '🏗️' },
  { id: 'synergies', label: 'Synergy Analysis', icon: Link2, emoji: '🔗' },
  { id: 'lbo', label: 'LBO Model', icon: BarChart3, emoji: '📊' },
  { id: 'fairness', label: 'Fairness Opinion', icon: Scale, emoji: '⚖️' },
  { id: 'precedents', label: 'Precedents', icon: Landmark, emoji: '🏛️' },
  { id: 'regulatory', label: 'Regulatory', icon: ClipboardCheck, emoji: '📋' },
  { id: 'export', label: 'Dispatch PDF', icon: FileText, emoji: '📄' },
];

export default function Sidebar() {
  const { state, dispatch } = useDeal();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="fixed left-0 top-14 bottom-0 z-40 flex flex-col border-r transition-all duration-300"
      style={{
        backgroundColor: '#1A2340',
        borderColor: '#2C3E6B',
        width: collapsed ? '56px' : '200px',
      }}
    >
      {/* Module Navigation */}
      <div className="flex-1 py-3 overflow-y-auto">
        {modules.map((mod) => {
          const isActive = state.activeModule === mod.id;
          const Icon = mod.icon;
          return (
            <button
              key={mod.id}
              onClick={() => dispatch({ type: 'SET_ACTIVE_MODULE', payload: mod.id })}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all cursor-pointer hover:bg-[#223058]"
              style={{
                color: isActive ? '#C5A44E' : '#7C8DB0',
                backgroundColor: isActive ? 'rgba(197, 164, 78, 0.1)' : 'transparent',
                borderLeft: isActive ? '3px solid #C5A44E' : '3px solid transparent',
              }}
              title={collapsed ? mod.label : undefined}
            >
              <Icon className="w-4.5 h-4.5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{mod.label}</span>}
            </button>
          );
        })}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center py-3 border-t transition-colors cursor-pointer hover:bg-[#223058]"
        style={{ borderColor: '#2C3E6B', color: '#7C8DB0' }}
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
