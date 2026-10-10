import { GitBranch, Search, Filter, Download, Plus } from 'lucide-react';
import { useState } from 'react';

const sampleEntities = [
  { id: 1, type: 'person', title: 'John Smith', description: 'Developer at TechCorp', color: '#6366f1' },
  { id: 2, type: 'project', title: 'NexusAI Studio', description: 'AI routing platform', color: '#8b5cf6' },
  { id: 3, type: 'technology', title: 'React', description: 'Frontend framework', color: '#06b6d4' },
  { id: 4, type: 'technology', title: 'TypeScript', description: 'Programming language', color: '#10b981' },
  { id: 5, type: 'location', title: 'San Francisco', description: 'Tech hub', color: '#f59e0b' },
];

const sampleRelations = [
  { from: 1, to: 2, type: 'works_on', label: 'works on' },
  { from: 2, to: 3, type: 'uses', label: 'uses' },
  { from: 2, to: 4, type: 'uses', label: 'uses' },
  { from: 1, to: 5, type: 'located_in', label: 'located in' },
];

export default function KnowledgeGraph() {
  const [selectedEntity, setSelectedEntity] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntities = sampleEntities.filter(e => {
    const matchesType = filter === 'all' || e.type === filter;
    const matchesSearch = searchQuery === '' || e.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const selectedEntityData = selectedEntity ? sampleEntities.find(e => e.id === selectedEntity) : null;
  const entityRelations = selectedEntity ? sampleRelations.filter(r => r.from === selectedEntity || r.to === selectedEntity) : [];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
            <GitBranch className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Knowledge Graph Explorer</h1>
            <p className="text-sm text-slate-500">Interactive visualization of entities and relationships</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" /> Add Entity
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-slate-300 hover:scale-105 transition-all">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500 mb-1">Entities</p>
          <p className="text-2xl font-bold text-white">{sampleEntities.length}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500 mb-1">Relations</p>
          <p className="text-2xl font-bold text-cyan-400">{sampleRelations.length}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500 mb-1">Entity Types</p>
          <p className="text-2xl font-bold text-purple-400">
            {new Set(sampleEntities.map(e => e.type)).size}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500 mb-1">Sources</p>
          <p className="text-2xl font-bold text-emerald-400">3</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-300">Interactive Graph</h3>
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <input type="text" placeholder="Search entities..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs bg-white/5 border border-white/10 rounded px-2 py-1 text-slate-300 outline-none w-40" />
            </div>
          </div>
          <div className="h-[500px] bg-black/20 rounded-lg overflow-hidden relative">
            <svg className="w-full h-full" viewBox="0 0 800 500">
              {sampleRelations.map((rel, idx) => {
                const from = sampleEntities.find(e => e.id === rel.from);
                const to = sampleEntities.find(e => e.id === rel.to);
                if (!from || !to) return null;
                const fromX = 200 + (rel.from * 100) % 400;
                const fromY = 150 + (rel.from * 80) % 200;
                const toX = 200 + (rel.to * 100) % 400;
                const toY = 150 + (rel.to * 80) % 200;
                return (
                  <g key={idx}>
                    <line x1={fromX} y1={fromY} x2={toX} y2={toY} stroke="rgba(99, 102, 241, 0.3)" strokeWidth="2" />
                    <text x={(fromX + toX) / 2} y={(fromY + toY) / 2} textAnchor="middle" className="text-[8px] fill-slate-500">
                      {rel.label}
                    </text>
                  </g>
                );
              })}
              {sampleEntities.map((entity, idx) => {
                const x = 200 + (idx * 100) % 400;
                const y = 150 + (idx * 80) % 200;
                return (
                  <g key={entity.id} onClick={() => setSelectedEntity(entity.id)} className="cursor-pointer">
                    <circle cx={x} cy={y} r={selectedEntity === entity.id ? 16 : 12} fill={entity.color} fillOpacity={0.2}
                      stroke={entity.color} strokeWidth={selectedEntity === entity.id ? 3 : 1.5} className="transition-all" />
                    <circle cx={x} cy={y} r={4} fill={entity.color} />
                    <text x={x} y={y + 20} textAnchor="middle" className="text-[9px] fill-slate-400 pointer-events-none">
                      {entity.title}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-300">Entities</h3>
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <select value={filter} onChange={(e) => setFilter(e.target.value)}
                className="text-xs bg-white/5 border border-white/10 rounded px-2 py-1 text-slate-300 outline-none">
                <option value="all">All Types</option>
                <option value="person">Person</option>
                <option value="project">Project</option>
                <option value="technology">Technology</option>
                <option value="location">Location</option>
              </select>
            </div>
          </div>

          {selectedEntityData ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: selectedEntityData.color }} />
                  <h4 className="text-sm font-medium text-white">{selectedEntityData.title}</h4>
                </div>
                <p className="text-xs text-slate-400 mb-3">{selectedEntityData.description}</p>
                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] text-slate-600">Type:</span>
                    <span className="text-xs text-slate-400 ml-2 capitalize">{selectedEntityData.type}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedEntity(null)}
                  className="mt-4 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 hover:bg-white/10 transition-all">
                  Back to List
                </button>
              </div>

              <div className="border-t border-white/5 pt-3">
                <h5 className="text-xs font-medium text-slate-400 mb-2">Relations</h5>
                <div className="space-y-1 max-h-[200px] overflow-y-auto">
                  {entityRelations.map((rel, i) => {
                    const otherEntity = sampleEntities.find(e => e.id === (rel.from === selectedEntity ? rel.to : rel.from));
                    if (!otherEntity) return null;
                    const direction = rel.from === selectedEntity ? '→' : '←';
                    return (
                      <div key={i} className="text-[10px] text-slate-500 flex items-center gap-1">
                        <span className="text-cyan-400">{direction}</span>
                        <span className="text-slate-400">{rel.label}</span>
                        <span className="text-slate-300">{otherEntity.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredEntities.map((entity) => (
                <div key={entity.id} onClick={() => setSelectedEntity(entity.id)}
                  className="p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 cursor-pointer transition-all hover:translate-x-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: entity.color }} />
                    <span className="text-xs font-medium text-slate-300">{entity.title}</span>
                  </div>
                  <p className="text-[10px] text-slate-600 line-clamp-1">{entity.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
