import { Sparkles, Copy, Play, Save, Wand2, Layers } from 'lucide-react';
import { useState } from 'react';

const templates = [
  { id: 1, name: 'Chain of Thought', category: 'Reasoning', tokens: 245, rating: 4.8 },
  { id: 2, name: 'Few-Shot Classifier', category: 'Classification', tokens: 180, rating: 4.6 },
  { id: 3, name: 'RAG Pipeline', category: 'Retrieval', tokens: 420, rating: 4.9 },
  { id: 4, name: 'Code Generator', category: 'Coding', tokens: 310, rating: 4.7 },
  { id: 5, name: 'Summarizer', category: 'NLP', tokens: 150, rating: 4.5 },
  { id: 6, name: 'Agent Planner', category: 'Planning', tokens: 380, rating: 4.8 },
];

const promptExamples = [
  { role: 'system', content: 'You are an expert AI assistant specialized in {{domain}}. Follow these guidelines:\n1. Be precise and factual\n2. Cite sources when possible\n3. Use structured outputs' },
  { role: 'user', content: 'Analyze the following {{data_type}} and provide insights:\n\n{{input_data}}\n\nFormat your response as JSON with keys: analysis, confidence, recommendations' }
];

export default function PromptTuning() {
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'test'>('editor');

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Prompt Tuning Studio</h1>
            <p className="text-sm text-slate-500">Design, test & optimize prompt templates</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:scale-105 transition-all">
            <Wand2 className="w-4 h-4" /> Auto-Optimize
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-slate-300 hover:scale-105 transition-all">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-medium text-slate-300">Templates</h3>
          </div>
          <div className="space-y-1.5">
            {templates.map((t) => (
              <div key={t.id} onClick={() => setSelectedTemplate(t.id)}
                className={`p-2.5 rounded-lg cursor-pointer transition-all hover:translate-x-1 ${
                  selectedTemplate === t.id ? 'bg-cyan-500/10 border border-cyan-500/20' : 'hover:bg-white/[0.03] border border-transparent'
                }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">{t.name}</span>
                  <span className="text-[10px] text-slate-600">⭐ {t.rating}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-cyan-400/60">{t.category}</span>
                  <span className="text-[10px] text-slate-600">{t.tokens} tok</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-3 glass-card overflow-hidden">
          <div className="flex items-center border-b border-white/5 px-4">
            {(['editor', 'preview', 'test'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-xs font-medium capitalize relative transition-colors ${
                  activeTab === tab ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
                }`}>
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <button className="p-1.5 rounded hover:bg-white/5 transition-all"><Copy className="w-3.5 h-3.5 text-slate-500" /></button>
              <button className="p-1.5 rounded hover:bg-white/5 transition-all"><Play className="w-3.5 h-3.5 text-emerald-400" /></button>
            </div>
          </div>
          <div className="p-5 min-h-[400px]">
            {activeTab === 'editor' && (
              <div className="space-y-4">
                {promptExamples.map((msg, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        msg.role === 'system' ? 'bg-purple-500/10 text-purple-400' : 'bg-cyan-500/10 text-cyan-400'
                      }`}>{msg.role}</span>
                      <div className="flex-1 h-px bg-white/5" />
                    </div>
                    <pre className="text-xs text-slate-400 font-mono bg-white/[0.02] border border-white/5 rounded-lg p-4 whitespace-pre-wrap leading-relaxed">
                      {msg.content.split(/(\{\{[^}]+\}\})/).map((part, i) =>
                        part.match(/\{\{[^}]+\}\}/) ? (
                          <span key={i} className="text-cyan-400 bg-cyan-500/10 px-1 rounded font-semibold">{part}</span>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </pre>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'preview' && (
              <div className="space-y-4">
                <div className="glass-card p-4 border-l-2 border-l-emerald-500">
                  <p className="text-xs text-slate-400">You are an expert AI assistant specialized in <span className="text-emerald-400 font-medium">data analysis</span>. Follow these guidelines:</p>
                  <ol className="mt-2 space-y-1 text-xs text-slate-500 list-decimal list-inside">
                    <li>Be precise and factual</li>
                    <li>Cite sources when possible</li>
                    <li>Use structured outputs</li>
                  </ol>
                </div>
                <div className="glass-card p-4 border-l-2 border-l-cyan-500">
                  <p className="text-xs text-slate-400">Analyze the following <span className="text-cyan-400 font-medium">quarterly report</span> and provide insights:</p>
                  <div className="mt-2 p-2 bg-white/[0.02] rounded border border-dashed border-white/10">
                    <p className="text-[10px] text-slate-600 font-mono">[Input data rendered here]</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'test' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-500 mb-2 block">Test Input</label>
                    <textarea className="w-full h-32 bg-white/[0.02] border border-white/10 rounded-lg p-3 text-xs text-slate-300 resize-none outline-none focus:border-cyan-500/30"
                      defaultValue='{"revenue": 2.4M, "growth": 15%}' />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-2 block">Model Response</label>
                    <div className="h-32 bg-white/[0.02] border border-white/10 rounded-lg p-3 text-xs text-slate-400 overflow-auto">
                      <p className="text-emerald-400 font-mono text-[10px] mb-2">✓ Analysis Complete</p>
                      <p>Based on the quarterly data, revenue shows strong 15% growth...</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Tokens', value: '1,247', color: 'text-cyan-400' },
                    { label: 'Latency', value: '342ms', color: 'text-emerald-400' },
                    { label: 'Quality', value: '94/100', color: 'text-purple-400' },
                  ].map((m) => (
                    <div key={m.label} className="glass-card p-3 text-center">
                      <p className={`text-lg font-bold ${m.color}`}>{m.value}</p>
                      <p className="text-[10px] text-slate-600">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
