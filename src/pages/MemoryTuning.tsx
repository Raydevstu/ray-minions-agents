import { Brain, Database, Layers, RefreshCw, Settings, Play, Pause, Activity } from 'lucide-react';
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const memoryData = Array.from({ length: 20 }, (_, i) => ({ step: i, recall: 70 + Math.random() * 25, context: 60 + Math.random() * 35 }));
const memorySlots = [
  { id: 1, name: 'Short-term Buffer', size: '8K tokens', usage: 65, status: 'active' },
  { id: 2, name: 'Episodic Memory', size: '32K tokens', usage: 42, status: 'active' },
  { id: 3, name: 'Semantic Store', size: '128K tokens', usage: 78, status: 'active' },
  { id: 4, name: 'Procedural Cache', size: '16K tokens', usage: 31, status: 'idle' },
  { id: 5, name: 'Vector Index', size: '1M vectors', usage: 56, status: 'active' },
];

export default function MemoryTuning() {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(1);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center"><Brain className="w-5 h-5 text-purple-400" /></div>
          <div><h1 className="text-2xl font-bold text-white">Memory & Eval Tuning</h1><p className="text-sm text-slate-500">Optimize context windows, recall accuracy & memory allocation</p></div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 ${isRunning ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />} {isRunning ? 'Stop Eval' : 'Run Eval'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-slate-300 hover:scale-105 transition-all">
            <Settings className="w-4 h-4" /> Configure
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4"><Database className="w-4 h-4 text-purple-400" /><h3 className="text-sm font-medium text-slate-300">Memory Slots</h3></div>
          <div className="space-y-2">
            {memorySlots.map((slot) => (
              <div key={slot.id} onClick={() => setSelectedSlot(slot.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all hover:translate-x-1 ${selectedSlot === slot.id ? 'bg-purple-500/10 border border-purple-500/20' : 'hover:bg-white/[0.03] border border-transparent'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-300">{slot.name}</span>
                  <span className={`status-dot ${slot.status === 'active' ? 'active' : ''}`} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-600">{slot.size}</span><span className="text-[10px] text-slate-500">{slot.usage}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 animate-bar-grow" style={{ width: `${slot.usage}%`, animationDelay: `${slot.id * 0.1}s` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-cyan-400" /><h3 className="text-sm font-medium text-slate-300">Eval Performance</h3></div>
            <button className="p-1.5 rounded-lg hover:bg-white/5 hover:rotate-180 transition-all duration-500"><RefreshCw className="w-3.5 h-3.5 text-slate-500" /></button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={memoryData}>
              <defs>
                <linearGradient id="rG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} /><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} /></linearGradient>
                <linearGradient id="cG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} /><stop offset="95%" stopColor="#06b6d4" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="step" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[50, 100]} />
              <Tooltip contentStyle={{ background: 'rgba(18,18,26,0.9)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="recall" stroke="#8b5cf6" fill="url(#rG)" strokeWidth={2} />
              <Area type="monotone" dataKey="context" stroke="#06b6d4" fill="url(#cG)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4"><Layers className="w-4 h-4 text-indigo-400" /><h3 className="text-sm font-medium text-slate-300">Tuning Parameters</h3></div>
        <div className="grid grid-cols-4 gap-6">
          {[
            { label: 'Context Window', value: 128, max: 256, unit: 'K tokens', color: '#6366f1' },
            { label: 'Temperature', value: 0.7, max: 2, unit: '', color: '#8b5cf6' },
            { label: 'Top-P', value: 0.9, max: 1, unit: '', color: '#06b6d4' },
            { label: 'Memory Decay', value: 0.15, max: 1, unit: 'λ', color: '#10b981' },
          ].map((param) => (
            <div key={param.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{param.label}</span>
                <span className="text-xs font-mono text-slate-300">{param.value}{param.unit}</span>
              </div>
              <div className="relative h-2 rounded-full bg-white/5">
                <div className="absolute h-full rounded-full animate-bar-grow" style={{ background: param.color, width: `${(param.value / param.max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
