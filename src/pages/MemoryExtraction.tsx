import { Brain } from 'lucide-react';
export default function MemoryExtraction() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center"><Brain className="w-5 h-5 text-purple-400" /></div>
        <div><h1 className="text-2xl font-bold text-white">Memory Extraction Dashboard</h1><p className="text-sm text-slate-500">Auto-extract memories from conversations</p></div>
      </div>
      <div className="glass-card p-8 text-center"><p className="text-slate-400">Memory Extraction Dashboard - Visual memory extraction interface</p></div>
    </div>
  );
}
