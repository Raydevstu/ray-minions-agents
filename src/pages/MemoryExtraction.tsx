import { Brain, Play, Pause, Download, Filter } from 'lucide-react';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const sampleMemories = [
  { id: 1, type: 'profile', title: 'User Name', content: 'John Smith', confidence: 0.92, source: 'conversation-1' },
  { id: 2, type: 'preferences', title: 'Language', content: 'TypeScript, React', confidence: 0.88, source: 'conversation-1' },
  { id: 3, type: 'entities', title: 'Project', content: 'NexusAI Studio', confidence: 0.85, source: 'conversation-2' },
  { id: 4, type: 'events', title: 'Decision', content: 'Use PostgreSQL', confidence: 0.90, source: 'conversation-2' },
  { id: 5, type: 'profile', title: 'Location', content: 'San Francisco', confidence: 0.87, source: 'conversation-3' },
];

const typeDistribution = [
  { name: 'Profile', value: 2, color: '#6366f1' },
  { name: 'Preferences', value: 1, color: '#8b5cf6' },
  { name: 'Entities', value: 1, color: '#06b6d4' },
  { name: 'Events', value: 1, color: '#10b981' },
];

export default function MemoryExtraction() {
  const [isExtracting, setIsExtracting] = useState(false);
  const [memories, setMemories] = useState(sampleMemories);
  const [filter, setFilter] = useState('all');

  const handleExtract = () => {
    setIsExtracting(true);
    setTimeout(() => {
      const newMemory = {
        id: memories.length + 1,
        type: 'preferences',
        title: 'Framework',
        content: 'Next.js',
        confidence: 0.89,
        source: `conversation-${memories.length + 1}`
      };
      setMemories([...memories, newMemory]);
      setIsExtracting(false);
    }, 1500);
  };

  const filteredMemories = filter === 'all' ? memories : memories.filter(m => m.type === filter);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Memory Extraction Dashboard</h1>
            <p className="text-sm text-slate-500">Auto-extract memories from conversations</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExtract} disabled={isExtracting}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:scale-105 transition-all disabled:opacity-50">
            {isExtracting ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isExtracting ? 'Extracting...' : 'Extract Memories'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-slate-300 hover:scale-105 transition-all">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500 mb-1">Total Memories</p>
          <p className="text-2xl font-bold text-white">{memories.length}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500 mb-1">Memory Types</p>
          <p className="text-2xl font-bold text-purple-400">4</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500 mb-1">Avg Confidence</p>
          <p className="text-2xl font-bold text-emerald-400">
            {(memories.reduce((sum, m) => sum + m.confidence, 0) / memories.length * 100).toFixed(1)}%
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500 mb-1">Sources</p>
          <p className="text-2xl font-bold text-cyan-400">
            {new Set(memories.map(m => m.source)).size}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-5">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Memory Type Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={typeDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {typeDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'rgba(18,18,26,0.9)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1">
            {typeDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs text-slate-400">{item.name}</span>
                </div>
                <span className="text-xs text-slate-500">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-300">Extracted Memories</h3>
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <select value={filter} onChange={(e) => setFilter(e.target.value)}
                className="text-xs bg-white/5 border border-white/10 rounded px-2 py-1 text-slate-300 outline-none">
                <option value="all">All Types</option>
                <option value="profile">Profile</option>
                <option value="preferences">Preferences</option>
                <option value="entities">Entities</option>
                <option value="events">Events</option>
              </select>
            </div>
          </div>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredMemories.map((memory) => (
              <div key={memory.id} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: typeDistribution.find(t => t.name.toLowerCase() === memory.type)?.color || '#6366f1' }} />
                    <span className="text-xs font-medium text-slate-300">{memory.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 capitalize">{memory.type}</span>
                  </div>
                  <span className="text-[10px] text-slate-600">{(memory.confidence * 100).toFixed(0)}% confidence</span>
                </div>
                <p className="text-xs text-slate-400 mb-2">{memory.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-600">Source: {memory.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
