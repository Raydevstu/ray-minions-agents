import { BookOpen, Search, Star, ExternalLink, Tag, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const models = [
  { id: 1, name: 'GPT-4o', provider: 'OpenAI', category: 'Multimodal', contextWindow: '128K', pricing: '$2.50/1M', rating: 4.8, strengths: ['Vision', 'Reasoning', 'Code'], status: 'stable', description: 'Most capable OpenAI model with vision and advanced reasoning.' },
  { id: 2, name: 'Claude 3.5 Sonnet', provider: 'Anthropic', category: 'Constitutional AI', contextWindow: '200K', pricing: '$3.00/1M', rating: 4.9, strengths: ['Analysis', 'Writing', 'Safety'], status: 'stable', description: 'Excellent balance of intelligence and speed.' },
  { id: 3, name: 'Gemini 1.5 Pro', provider: 'Google', category: 'Multimodal', contextWindow: '1M', pricing: '$1.25/1M', rating: 4.6, strengths: ['Long Context', 'Multimodal', 'Code'], status: 'stable', description: 'Industry-leading 1M token context window.' },
  { id: 4, name: 'Llama 3.1 405B', provider: 'Meta', category: 'Open Source', contextWindow: '128K', pricing: 'Self-hosted', rating: 4.5, strengths: ['Open Source', 'Customizable', 'Privacy'], status: 'stable', description: 'Largest open-source model.' },
  { id: 5, name: 'Mistral Large', provider: 'Mistral AI', category: 'Efficient', contextWindow: '128K', pricing: '$2.00/1M', rating: 4.4, strengths: ['Speed', 'Efficiency', 'Multilingual'], status: 'beta', description: 'High-performance European model.' },
  { id: 6, name: 'Command R+', provider: 'Cohere', category: 'RAG-Optimized', contextWindow: '128K', pricing: '$2.50/1M', rating: 4.3, strengths: ['RAG', 'Grounding', 'Enterprise'], status: 'stable', description: 'Purpose-built for RAG with citations.' },
];

const categories = ['All', 'Multimodal', 'Open Source', 'Constitutional AI', 'Efficient', 'RAG-Optimized'];

export default function LLMWiki() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = models.filter(m =>
    (selectedCategory === 'All' || m.category === selectedCategory) &&
    (searchQuery === '' || m.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">LLM Wiki</h1>
            <p className="text-sm text-slate-500">Knowledge base of AI models & comparisons</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.02]">
          <Search className="w-4 h-4 text-slate-500" />
          <input type="text" placeholder="Search models..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-slate-300 placeholder-slate-600 w-full" />
        </div>
        <div className="flex gap-1">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all hover:scale-105 ${
                selectedCategory === cat ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-slate-500 hover:text-slate-300 border border-transparent'
              }`}>{cat}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filtered.map((model) => (
          <div key={model.id} className="glass-card p-5 cursor-pointer group hover:-translate-y-1 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors">{model.name}</h3>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    model.status === 'stable' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>{model.status}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{model.provider} • {model.category}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
                <span className="text-xs text-amber-400 font-medium">{model.rating}</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-3">{model.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {model.strengths.map((s) => (
                <span key={s} className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
                  <Tag className="w-2.5 h-2.5" /> {s}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="flex gap-4">
                <span className="text-[10px] text-slate-500">Context: <span className="text-slate-300">{model.contextWindow}</span></span>
                <span className="text-[10px] text-slate-500">Price: <span className="text-slate-300">{model.pricing}</span></span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-medium text-slate-300">Comparison Matrix</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-2 px-3 text-slate-500 font-medium">Model</th>
                <th className="text-center py-2 px-3 text-slate-500 font-medium">Context</th>
                <th className="text-center py-2 px-3 text-slate-500 font-medium">Speed</th>
                <th className="text-center py-2 px-3 text-slate-500 font-medium">Reasoning</th>
                <th className="text-center py-2 px-3 text-slate-500 font-medium">Code</th>
                <th className="text-center py-2 px-3 text-slate-500 font-medium">Vision</th>
                <th className="text-center py-2 px-3 text-slate-500 font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-all">
                  <td className="py-2.5 px-3 text-slate-300 font-medium">{m.name}</td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="inline-block w-16 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-amber-500" style={{ width: m.contextWindow === '1M' ? '100%' : m.contextWindow === '200K' ? '80%' : '60%' }} />
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-400">{'●'.repeat(Math.floor(Math.random() * 2 + 3))}</td>
                  <td className="py-2.5 px-3 text-center text-slate-400">{'●'.repeat(Math.floor(Math.random() * 2 + 3))}</td>
                  <td className="py-2.5 px-3 text-center text-slate-400">{'●'.repeat(Math.floor(Math.random() * 2 + 3))}</td>
                  <td className="py-2.5 px-3 text-center text-slate-400">{m.strengths.includes('Vision') ? '✓' : '—'}</td>
                  <td className="py-2.5 px-3 text-center text-amber-400">{m.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
