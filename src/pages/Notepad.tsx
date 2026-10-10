import { FileText, Plus, Clock, Pin, Trash2, Search, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

const noteItems = [
  { id: 1, title: 'API Integration Notes', content: 'REST endpoints for the new AI service...\n- POST /v1/chat/completions\n- Headers: Authorization Bearer\n- Rate limits: 60 req/min', pinned: true, modified: '10 min ago', color: '#6366f1' },
  { id: 2, title: 'Meeting Action Items', content: 'Sprint Planning 2024-Q4:\n✓ Finalize model selection\n□ Set up eval pipeline\n□ Deploy staging', pinned: true, modified: '1h ago', color: '#8b5cf6' },
  { id: 3, title: 'Quick Ideas', content: '• Implement streaming responses\n• Add context window indicator\n• Build prompt version control\n• Create agent marketplace', pinned: false, modified: '3h ago', color: '#06b6d4' },
  { id: 4, title: 'Debug Log', content: 'Issue: Token count mismatch\nRoot cause: Encoding difference\nFix: Use tiktoken\nStatus: Resolved ✓', pinned: false, modified: '5h ago', color: '#10b981' },
  { id: 5, title: 'Research Links', content: 'Papers to read:\n- "Attention Is All You Need"\n- "Constitutional AI"\n- "Chain-of-Thought Prompting"', pinned: false, modified: '1d ago', color: '#f59e0b' },
];

export default function Notepad() {
  const [selectedNote, setSelectedNote] = useState(1);
  const [editContent, setEditContent] = useState(noteItems[0].content);
  const activeNote = noteItems.find(n => n.id === selectedNote);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-pink-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Notepad</h1>
            <p className="text-sm text-slate-500">Quick capture & organize thoughts</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-pink-500/10 text-pink-400 border border-pink-500/20 hover:scale-105 transition-all">
          <Plus className="w-4 h-4" /> New Note
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3 px-2">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <input type="text" placeholder="Search notes..." className="bg-transparent border-none outline-none text-xs text-slate-300 placeholder-slate-600 w-full" />
          </div>
          <div className="space-y-1.5">
            {noteItems.map((note) => (
              <div key={note.id} onClick={() => { setSelectedNote(note.id); setEditContent(note.content); }}
                className={`p-3 rounded-lg cursor-pointer transition-all hover:translate-x-1 ${
                  selectedNote === note.id ? 'bg-white/5 border border-white/10' : 'hover:bg-white/[0.02] border border-transparent'
                }`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    {note.pinned && <Pin className="w-2.5 h-2.5 text-amber-400" />}
                    <span className="text-xs font-medium text-slate-300">{note.title}</span>
                  </div>
                  <div className="w-2 h-2 rounded-full" style={{ background: note.color }} />
                </div>
                <p className="text-[10px] text-slate-600 line-clamp-2">{note.content.split('\n')[0]}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Clock className="w-2.5 h-2.5 text-slate-700" />
                  <span className="text-[9px] text-slate-700">{note.modified}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 glass-card overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: activeNote?.color }} />
              <input type="text" defaultValue={activeNote?.title} className="bg-transparent border-none outline-none text-sm font-medium text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-600">{activeNote?.modified}</span>
              <button className="p-1 rounded hover:bg-white/5 transition-all"><MoreHorizontal className="w-3.5 h-3.5 text-slate-500" /></button>
              <button className="p-1 rounded hover:bg-white/5 transition-all"><Trash2 className="w-3.5 h-3.5 text-slate-600" /></button>
            </div>
          </div>
          <div className="p-5">
            <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-[400px] bg-transparent border-none outline-none text-sm text-slate-300 resize-none font-mono leading-relaxed"
              spellCheck={false} />
          </div>
          <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-slate-600">Words: {editContent.split(/\s+/).length}</span>
              <span className="text-[10px] text-slate-600">Lines: {editContent.split('\n').length}</span>
              <span className="text-[10px] text-slate-600">Chars: {editContent.length}</span>
            </div>
            <span className="text-[10px] text-emerald-400">Auto-saved</span>
          </div>
        </div>
      </div>
    </div>
  );
}
