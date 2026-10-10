import { GitBranch } from 'lucide-react';
export default function KnowledgeGraph() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center"><GitBranch className="w-5 h-5 text-cyan-400" /></div>
        <div><h1 className="text-2xl font-bold text-white">Knowledge Graph Explorer</h1><p className="text-sm text-slate-500">Interactive visualization of entities and relationships</p></div>
      </div>
      <div className="glass-card p-8 text-center"><p className="text-slate-400">Knowledge Graph Explorer - Interactive entity relationship visualization</p></div>
    </div>
  );
}
