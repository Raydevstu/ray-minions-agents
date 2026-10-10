import { BookOpen } from 'lucide-react';
export default function LLMWiki() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-amber-400" /></div>
        <div><h1 className="text-2xl font-bold text-white">LLM Wiki</h1><p className="text-sm text-slate-500">Knowledge base of AI models & comparisons</p></div>
      </div>
      <div className="glass-card p-8 text-center"><p className="text-slate-400">LLM Wiki - Comprehensive knowledge base of AI models</p></div>
    </div>
  );
}
