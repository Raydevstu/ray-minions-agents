import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Brain, Sparkles, Network, BookOpen, Gem, 
  FileText, PenTool, Rocket, GitBranch, Layers, Globe 
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard', color: '#6366f1' },
  { path: '/memory-tuning', icon: Brain, label: 'Memory Tuning', color: '#8b5cf6' },
  { path: '/memory-extraction', icon: Brain, label: 'Memory Extraction', color: '#a855f7' },
  { path: '/knowledge-graph', icon: GitBranch, label: 'Knowledge Graph', color: '#06b6d4' },
  { path: '/context-layers', icon: Layers, label: 'Context Layers', color: '#10b981' },
  { path: '/context-gateway', icon: Globe, label: 'Context Gateway', color: '#6366f1' },
  { path: '/prompt-tuning', icon: Sparkles, label: 'Prompt Tuning', color: '#06b6d4' },
  { path: '/agent-orchestration', icon: Network, label: 'Agents', color: '#10b981' },
  { path: '/llm-wiki', icon: BookOpen, label: 'LLM Wiki', color: '#f59e0b' },
  { path: '/obsidian', icon: Gem, label: 'Obsidian', color: '#a855f7' },
  { path: '/notepad', icon: FileText, label: 'Notepad', color: '#ec4899' },
  { path: '/doc-editor', icon: PenTool, label: 'Doc Editor', color: '#14b8a6' },
  { path: '/deployment', icon: Rocket, label: 'Deploy', color: '#f97316' },
];

export default function Sidebar() {
  return (
    <nav
      className="fixed left-0 top-0 h-screen w-[72px] glass-panel flex flex-col items-center py-6 z-50 animate-slide-in"
      style={{ borderRadius: '0 16px 16px 0' }}
    >
      <div className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `relative group flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                isActive ? 'bg-white/10 shadow-lg' : 'hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="transition-transform duration-200 hover:scale-115 active:scale-95">
                  <item.icon
                    className="w-5 h-5 transition-colors duration-300"
                    style={{ color: isActive ? item.color : '#64748b' }}
                  />
                </div>
                {isActive && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                    style={{ background: item.color }}
                  />
                )}
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-white/10">
                  {item.label}
                </div>
              </>
            )}
          </NavLink>
        ))}
      </div>
      <div className="mt-auto">
        <div className="status-dot active" />
      </div>
    </nav>
  );
}
