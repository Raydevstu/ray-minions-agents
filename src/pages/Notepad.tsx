import { FileText } from 'lucide-react';
export default function Notepad() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center"><FileText className="w-5 h-5 text-pink-400" /></div>
        <div><h1 className="text-2xl font-bold text-white">Notepad</h1><p className="text-sm text-slate-500">Quick capture & organize thoughts</p></div>
      </div>
      <div className="glass-card p-8 text-center"><p className="text-slate-400">Notepad - Quick note-taking interface</p></div>
    </div>
  );
}
