import { Network, Plus, Play, GitBranch, Circle, Bot, Workflow } from 'lucide-react';
import { useState } from 'react';

const agents = [
  { id: 1, name: 'Planner', type: 'orchestrator', status: 'running', x: 50, y: 30, color: '#6366f1' },
  { id: 2, name: 'Researcher', type: 'tool-agent', status: 'running', x: 25, y: 55, color: '#8b5cf6' },
  { id: 3, name: 'Coder', type: 'execution', status: 'idle', x: 50, y: 70, color: '#06b6d4' },
  { id: 4, name: 'Reviewer', type: 'evaluator', status: 'waiting', x: 75, y: 55, color: '#10b981' },
  { id: 5, name: 'Summarizer', type: 'output', status: 'idle', x: 75, y: 80, color: '#f59e0b' },
];

const connections = [
  { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 4 }, { from: 4, to: 5 },
];

const workflows = [
  { name: 'Code Review Pipeline', agents: 4, status: 'active', runs: 127 },
  { name: 'Research & Summarize', agents: 3, status: 'active', runs: 89 },
  { name: 'Data Analysis Flow', agents: 5, status: 'paused', runs: 45 },
  { name: 'Content Generation', agents: 3, status: 'active', runs: 234 },
];

export default function AgentOrchestration() {
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Network className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Agent Orchestration</h1>
            <p className="text-sm text-slate-500">Multi-agent workflows with visual DAG editor</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" /> New Workflow
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-slate-300 hover:scale-105 transition-all">
            <Play className="w-4 h-4" /> Run All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 glass-card p-5 relative overflow-hidden min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Workflow className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-medium text-slate-300">Agent DAG — Code Review Pipeline</h3>
            </div>
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '60px' }}>
            {connections.map((conn, idx) => {
              const f = agents.find(a => a.id === conn.from);
              const t = agents.find(a => a.id === conn.to);
              if (!f || !t) return null;
              return (
                <g key={idx}>
                  <line x1={`${f.x}%`} y1={`${f.y}%`} x2={`${t.x}%`} y2={`${t.y}%`}
                    stroke="rgba(99, 102, 241, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
                  <circle r="3" fill="#6366f1">
                    <animateMotion dur="2s" repeatCount="indefinite"
                      path={`M ${f.x * 8} ${f.y * 4} L ${t.x * 8} ${t.y * 4}`} />
                  </circle>
                </g>
              );
            })}
          </svg>
          {agents.map((agent) => (
            <div key={agent.id} className="absolute cursor-pointer"
              style={{ left: `${agent.x}%`, top: `calc(${agent.y}% + 40px)`, transform: 'translate(-50%, -50%)' }}
              onClick={() => setSelectedAgent(agent.id)}>
              <div className={`relative px-3 py-2 rounded-xl border text-center min-w-[80px] transition-all hover:scale-110 ${
                selectedAgent === agent.id ? 'border-white/20 bg-white/5' : 'border-white/5 bg-white/[0.02]'
              }`}>
                <div className="absolute -top-1 -right-1">
                  <span className={`status-dot ${agent.status === 'running' ? 'active' : ''}`}
                    style={agent.status !== 'running' ? { background: '#64748b' } : {}} />
                </div>
                <Bot className="w-4 h-4 mx-auto mb-1" style={{ color: agent.color }} />
                <p className="text-[10px] font-medium text-slate-300">{agent.name}</p>
                <p className="text-[8px] text-slate-600">{agent.type}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-medium text-slate-300">Active Workflows</h3>
          </div>
          <div className="space-y-2">
            {workflows.map((wf) => (
              <div key={wf.name} className="p-3 rounded-lg border border-white/5 hover:border-white/10 cursor-pointer transition-all hover:translate-x-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-300">{wf.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    wf.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>{wf.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Circle className="w-2 h-2 text-indigo-400" fill="currentColor" />
                    <span className="text-[10px] text-slate-600">{wf.agents} agents</span>
                  </div>
                  <span className="text-[10px] text-slate-600">{wf.runs} runs</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h4 className="text-xs font-medium text-slate-400 mb-3">Available Agents</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Web Scraper', icon: '🌐' },
                { name: 'Code Exec', icon: '⚡' },
                { name: 'DB Query', icon: '🗄️' },
                { name: 'API Call', icon: '🔗' },
              ].map((a) => (
                <div key={a.name} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 cursor-pointer hover:border-indigo-500/20 transition-all hover:scale-105">
                  <span className="text-sm">{a.icon}</span>
                  <span className="text-[10px] text-slate-400">{a.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
