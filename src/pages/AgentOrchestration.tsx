import { Network } from 'lucide-react';
export default function AgentOrchestration() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><Network className="w-5 h-5 text-emerald-400" /></div>
        <div><h1 className="text-2xl font-bold text-white">Agent Orchestration</h1><p className="text-sm text-slate-500">Multi-agent workflows with visual DAG editor</p></div>
      </div>
      <div className="glass-card p-8 text-center"><p className="text-slate-400">Agent Orchestration - Visual DAG editor for multi-agent workflows</p></div>
    </div>
  );
}
