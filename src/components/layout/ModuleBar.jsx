import { useDeal } from '../../context/DealContext';

const modules = [
  { id: 'command-center', num: '00', label: 'Dashboard' },
  { id: 'merger',         num: '01', label: 'Merger Model' },
  { id: 'sources-uses',   num: '02', label: 'Sources & Uses' },
  { id: 'synergies',      num: '03', label: 'Synergy Engine' },
  { id: 'lbo',            num: '04', label: 'LBO Analysis' },
  { id: 'fairness',       num: '05', label: 'Fairness Opinion' },
  { id: 'precedents',     num: '06', label: 'Precedents' },
  { id: 'regulatory',     num: '07', label: 'Regulatory' },
  { id: 'export',         num: '08', label: 'Dispatch' },
];

export default function ModuleBar() {
  const { state, dispatch } = useDeal();

  return (
    <div className="module-bar">
      <div style={{ padding: '0 24px' }}>
        {modules.map((mod) => (
          <button
            key={mod.id}
            className={`module-tab${state.activeModule === mod.id ? ' active' : ''}`}
            onClick={() => dispatch({ type: 'SET_ACTIVE_MODULE', payload: mod.id })}
          >
            <span className="tab-number">{mod.num}</span>
            {mod.label}
          </button>
        ))}
      </div>
    </div>
  );
}
