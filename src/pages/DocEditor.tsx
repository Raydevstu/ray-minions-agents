import { PenTool } from 'lucide-react';
export default function DocEditor() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center"><PenTool className="w-5 h-5 text-teal-400" /></div>
        <div><h1 className="text-2xl font-bold text-white">Document Editor</h1><p className="text-sm text-slate-500">Rich text editor with AI writing assistance</p></div>
      </div>
      <div className="glass-card p-8 text-center"><p className="text-slate-400">Document Editor - Rich text editing with AI assistance</p></div>
    </div>
  );
}
