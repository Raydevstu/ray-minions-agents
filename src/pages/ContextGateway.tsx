import { Globe } from 'lucide-react';
export default function ContextGateway() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center"><Globe className="w-5 h-5 text-indigo-400" /></div>
        <div><h1 className="text-2xl font-bold text-white">Context Gateway</h1><p className="text-sm text-slate-500">Universal LLM API proxy with memory injection</p></div>
      </div>
      <div className="glass-card p-8 text-center"><p className="text-slate-400">Context Gateway - Universal LLM API proxy interface</p></div>
    </div>
  );
}
