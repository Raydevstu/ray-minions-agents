import { Gem, FolderOpen, FileText, Link2, Search, Tag, Star, Hash } from 'lucide-react';
import { useState } from 'react';

const vaultFolders = [
  { name: 'AI Research', count: 24, icon: '🧠' },
  { name: 'Projects', count: 18, icon: '🚀' },
  { name: 'Meeting Notes', count: 42, icon: '📋' },
  { name: 'Bookmarks', count: 156, icon: '🔖' },
  { name: 'Templates', count: 8, icon: '📐' },
];

const notes = [
  { id: 1, title: 'Transformer Architecture Deep Dive', folder: 'AI Research', tags: ['ml', 'architecture'], starred: true, modified: '2h ago', links: 5 },
  { id: 2, title: 'RAG Implementation Guide', folder: 'Projects', tags: ['rag', 'implementation'], starred: true, modified: '5h ago', links: 12 },
  { id: 3, title: 'Weekly Standup - Sprint 24', folder: 'Meeting Notes', tags: ['standup', 'sprint'], starred: false, modified: '1d ago', links: 3 },
  { id: 4, title: 'Prompt Engineering Patterns', folder: 'AI Research', tags: ['prompts', 'patterns'], starred: true, modified: '2d ago', links: 8 },
  { id: 5, title: 'Vector Database Comparison', folder: 'AI Research', tags: ['databases', 'comparison'], starred: false, modified: '3d ago', links: 6 },
];

export default function Obsidian() {
  const [selectedNote, setSelectedNote] = useState(1);
  const selectedNoteData = notes.find(n => n.id === selectedNote);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Gem className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Obsidian Vault</h1>
            <p className="text-sm text-slate-500">Networked knowledge with bidirectional linking</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-slate-400 hover:scale-105 transition-all">
          <Search className="w-3.5 h-3.5" /> Quick Switcher
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <h3 className="text-xs font-medium text-slate-400 mb-3 flex items-center gap-2">
            <FolderOpen className="w-3.5 h-3.5 text-purple-400" /> Vault
          </h3>
          <div className="space-y-1 mb-4">
            {vaultFolders.map((f) => (
              <div key={f.name} className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-white/[0.03] cursor-pointer transition-all hover:translate-x-1">
                <span className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{f.icon}</span> {f.name}
                </span>
                <span className="text-[10px] text-slate-600">{f.count}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-3">
            <h4 className="text-[10px] text-slate-600 mb-2 uppercase tracking-wider">Recent Notes</h4>
            <div className="space-y-1">
              {notes.map((note) => (
                <div key={note.id} onClick={() => setSelectedNote(note.id)}
                  className={`px-2 py-1.5 rounded-lg cursor-pointer transition-all hover:translate-x-1 ${
                    selectedNote === note.id ? 'bg-purple-500/10 border border-purple-500/20' : 'hover:bg-white/[0.03]'
                  }`}>
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3 h-3 text-slate-600" />
                    <span className="text-[11px] text-slate-300 truncate">{note.title}</span>
                    {note.starred && <Star className="w-2.5 h-2.5 text-amber-400" fill="currentColor" />}
                  </div>
                  <p className="text-[9px] text-slate-600 ml-4">{note.modified} • {note.links} links</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-2 glass-card overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs text-slate-300 font-medium">{selectedNoteData?.title}</span>
            </div>
            <span className="text-[10px] text-slate-600">{selectedNoteData?.modified}</span>
          </div>
          <div className="p-5 min-h-[400px]">
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white mb-3">{selectedNoteData?.title}</h2>
              <div className="flex gap-2 mb-4">
                {selectedNoteData?.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">
                    <Hash className="w-2.5 h-2.5" /> {tag}
                  </span>
                ))}
              </div>
              <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
                <p>The transformer architecture revolutionized NLP by introducing the <span className="text-purple-400 cursor-pointer hover:underline">[[self-attention mechanism]]</span> as the core building block.</p>
                <p>Key components:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><span className="text-purple-400 cursor-pointer hover:underline">[[Multi-head Attention]]</span> — Parallel attention</li>
                  <li><span className="text-purple-400 cursor-pointer hover:underline">[[Positional Encoding]]</span> — Sequence order</li>
                  <li><span className="text-purple-400 cursor-pointer hover:underline">[[Feed-Forward Networks]]</span> — Per-position transforms</li>
                </ul>
                <p>Related: <span className="text-cyan-400 cursor-pointer hover:underline">[[RAG Guide]]</span> | <span className="text-cyan-400 cursor-pointer hover:underline">[[Prompt Patterns]]</span></p>
                <div className="mt-4 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] text-slate-600 mb-1">📊 Backlinks (5)</p>
                  <div className="flex flex-wrap gap-1">
                    {['Attention', 'BERT', 'GPT', 'Fine-tuning', 'LLM Compare'].map((l) => (
                      <span key={l} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 cursor-pointer hover:text-purple-400 transition-colors">← {l}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Link2 className="w-3.5 h-3.5 text-purple-400" />
            <h3 className="text-xs font-medium text-slate-400">Knowledge Graph</h3>
          </div>
          <div className="relative h-[200px] mb-4">
            <svg className="w-full h-full">
              <circle cx="50%" cy="40%" r="12" fill="rgba(139, 92, 246, 0.15)" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1" />
              <text x="50%" y="40%" textAnchor="middle" dominantBaseline="middle" className="text-[8px] fill-slate-400">Transformers</text>
              <circle cx="30%" cy="25%" r="8" fill="rgba(139, 92, 246, 0.15)" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1" />
              <text x="30%" y="25%" textAnchor="middle" dominantBaseline="middle" className="text-[8px] fill-slate-400">Attention</text>
              <circle cx="70%" cy="35%" r="10" fill="rgba(139, 92, 246, 0.15)" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1" />
              <text x="70%" y="35%" textAnchor="middle" dominantBaseline="middle" className="text-[8px] fill-slate-400">RAG</text>
              <line x1="50%" y1="40%" x2="30%" y2="25%" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" />
              <line x1="50%" y1="40%" x2="70%" y2="35%" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" />
            </svg>
          </div>
          <div className="border-t border-white/5 pt-3">
            <h4 className="text-[10px] text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1">
              <Tag className="w-2.5 h-2.5" /> Tags
            </h4>
            <div className="flex flex-wrap gap-1">
              {['ml', 'rag', 'agents', 'prompts', 'architecture', 'evaluation', 'fine-tuning', 'embeddings'].map((tag) => (
                <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 cursor-pointer hover:text-purple-400 hover:bg-purple-500/10 transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
