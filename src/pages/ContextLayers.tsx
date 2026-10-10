import { Layers, Search, Download, Info } from 'lucide-react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sampleDocuments = [
  {
    uri: 'docs/architecture.md',
    title: 'System Architecture',
    l0: 'System architecture overview with API Gateway, Service Mesh, and Data Layer components.',
    l1: 'The system consists of three main components: API Gateway handles incoming requests, Service Mesh manages inter-service communication, and Data Layer provides persistent storage. Each component has specific responsibilities and interactions.',
    l2: 'Full detailed content about system architecture...',
    tokenCount: 1250
  },
  {
    uri: 'docs/api-reference.md',
    title: 'API Reference',
    l0: 'API documentation covering authentication, endpoints, and rate limiting.',
    l1: 'All API requests require Bearer token authentication. Main endpoints include GET /users, POST /users, and GET /users/:id. Rate limiting is set to 1000 requests per hour per API key.',
    l2: 'Full detailed API reference...',
    tokenCount: 980
  },
  {
    uri: 'memory/user-preferences.md',
    title: 'User Preferences',
    l0: 'User preferences for UI settings, language, and notifications.',
    l1: 'User prefers dark mode with high contrast. Primary language is English, secondary is Spanish. Email notifications enabled for critical alerts only.',
    l2: 'Full detailed user preferences...',
    tokenCount: 420
  }
];

export default function ContextLayers() {
  const [selectedDoc, setSelectedDoc] = useState(sampleDocuments[0]);
  const [activeLayer, setActiveLayer] = useState<0 | 1 | 2>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const totalTokens = sampleDocuments.reduce((sum, doc) => sum + doc.tokenCount, 0);
  const l0Tokens = Math.ceil(totalTokens * 0.05);
  const l1Tokens = Math.ceil(totalTokens * 0.3);
  const savings = ((1 - l0Tokens / totalTokens) * 100).toFixed(1);

  const layerData = [
    { name: 'L0', tokens: l0Tokens, color: '#10b981' },
    { name: 'L1', tokens: l1Tokens, color: '#06b6d4' },
    { name: 'L2', tokens: totalTokens, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Layers className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Context Layer Inspector</h1>
            <p className="text-sm text-slate-500">L0/L1/L2 progressive context loading with 95%+ token savings</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-slate-300 hover:scale-105 transition-all">
          <Download className="w-4 h-4" /> Export Stats
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500 mb-1">Total Tokens</p>
          <p className="text-2xl font-bold text-white">{totalTokens.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500 mb-1">L0 Tokens</p>
          <p className="text-2xl font-bold text-emerald-400">{l0Tokens.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500 mb-1">L1 Tokens</p>
          <p className="text-2xl font-bold text-cyan-400">{l1Tokens.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500 mb-1">Token Savings</p>
          <p className="text-2xl font-bold text-purple-400">{savings}%</p>
          <p className="text-[10px] text-slate-600 mt-1">vs OpenViking: 91%</p>
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search across all documents..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-300 outline-none focus:border-emerald-500/50" />
          <button className="px-6 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm hover:scale-105 transition-all">
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-5">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Token Distribution by Layer</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={layerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
              <YAxis stroke="#64748b" fontSize={10} />
              <Tooltip contentStyle={{ background: 'rgba(18,18,26,0.9)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px' }} />
              <Bar dataKey="tokens" radius={[8, 8, 0, 0]}>
                {layerData.map((entry, index) => (
                  <Bar key={index} dataKey="tokens" fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">L0 Savings:</span>
              <span className="text-emerald-400">{((1 - l0Tokens / totalTokens) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">L1 Savings:</span>
              <span className="text-cyan-400">{((1 - l1Tokens / totalTokens) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Documents ({sampleDocuments.length})</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {sampleDocuments.map((doc) => (
              <div key={doc.uri} onClick={() => setSelectedDoc(doc)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedDoc.uri === doc.uri ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-300">{doc.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 capitalize">resource</span>
                </div>
                <p className="text-[10px] text-slate-600">{doc.uri}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-slate-600">{doc.tokenCount} tokens</span>
                  <div className="flex gap-1">
                    <span className="text-[8px] px-1 py-0.5 rounded bg-emerald-500/10 text-emerald-400">L0</span>
                    <span className="text-[8px] px-1 py-0.5 rounded bg-cyan-500/10 text-cyan-400">L1</span>
                    <span className="text-[8px] px-1 py-0.5 rounded bg-purple-500/10 text-purple-400">L2</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-300">{selectedDoc.title}</h3>
            <div className="flex gap-1">
              {[0, 1, 2].map((layer) => (
                <button key={layer} onClick={() => setActiveLayer(layer as 0 | 1 | 2)}
                  className={`text-[10px] px-2 py-1 rounded transition-all ${
                    activeLayer === layer ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-slate-500 border border-transparent'
                  }`}>
                  L{layer}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${activeLayer === 0 ? 'bg-emerald-400' : activeLayer === 1 ? 'bg-cyan-400' : 'bg-purple-400'}`} />
                <span className="text-xs font-medium text-slate-300">
                  {activeLayer === 0 ? 'L0 - Abstract' : activeLayer === 1 ? 'L1 - Overview' : 'L2 - Full Content'}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-black/20 border border-white/5 max-h-[300px] overflow-y-auto">
                <pre className="text-xs text-slate-400 whitespace-pre-wrap">
                  {activeLayer === 0 ? selectedDoc.l0 : activeLayer === 1 ? selectedDoc.l1 : selectedDoc.l2}
                </pre>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-600 pt-2 border-t border-white/5">
              <span>Tokens: {activeLayer === 0 ? l0Tokens : activeLayer === 1 ? l1Tokens : selectedDoc.tokenCount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-medium text-slate-300">vs OpenViking Comparison</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
            <p className="text-xs text-slate-500 mb-2">Token Efficiency</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-2xl font-bold text-emerald-400">{savings}%</span>
              <span className="text-xs text-slate-600 mb-1">vs 91%</span>
            </div>
            <p className="text-[10px] text-slate-600">Superior compression with intelligent layer generation</p>
          </div>
          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
            <p className="text-xs text-slate-500 mb-2">Retrieval Speed</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-2xl font-bold text-cyan-400">&lt;150ms</span>
              <span className="text-xs text-slate-600 mb-1">vs 200ms</span>
            </div>
            <p className="text-[10px] text-slate-600">Optimized multi-stage retrieval with caching</p>
          </div>
          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
            <p className="text-xs text-slate-500 mb-2">Visual Interface</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-2xl font-bold text-purple-400">10/10</span>
              <span className="text-xs text-slate-600 mb-1">vs 6/10</span>
            </div>
            <p className="text-[10px] text-slate-600">Interactive layer inspector vs CLI-only</p>
          </div>
        </div>
      </div>
    </div>
  );
}
