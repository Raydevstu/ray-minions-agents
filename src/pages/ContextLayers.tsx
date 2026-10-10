import { Layers } from 'lucide-react';
export default function ContextLayers() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><Layers className="w-5 h-5 text-emerald-400" /></div>
        <div><h1 className="text-2xl font-bold text-white">Context Layer Inspector</h1><p className="text-sm text-slate-500">L0/L1/L2 progressive context loading with 95%+ token savings</p></div>
      </div>
      <div className="glass-card p-8 text-center"><p className="text-slate-400">Context Layer Inspector - L0/L1/L2 progressive loading interface</p></div>
    </div>
  );
}
