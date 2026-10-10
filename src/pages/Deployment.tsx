import { Rocket } from 'lucide-react';
export default function Deployment() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center"><Rocket className="w-5 h-5 text-orange-400" /></div>
        <div><h1 className="text-2xl font-bold text-white">Deployment Center</h1><p className="text-sm text-slate-500">Deploy across Docker, MCP, Plugins & Cloud</p></div>
      </div>
      <div className="glass-card p-8 text-center"><p className="text-slate-400">Deployment Center - Multi-platform deployment interface</p></div>
    </div>
  );
}
