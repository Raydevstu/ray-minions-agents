import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts';
import { Brain, Sparkles, Network, BookOpen, Rocket, TrendingUp, Activity, Cpu, Database, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const performanceData = [
  { time: '00:00', latency: 45, throughput: 1200 }, { time: '04:00', latency: 38, throughput: 1400 },
  { time: '08:00', latency: 52, throughput: 1800 }, { time: '12:00', latency: 61, throughput: 2200 },
  { time: '16:00', latency: 55, throughput: 2000 }, { time: '20:00', latency: 42, throughput: 1600 },
  { time: '24:00', latency: 35, throughput: 1100 },
];
const modelUsageData = [
  { name: 'GPT-4o', value: 35, color: '#6366f1' }, { name: 'Claude 3.5', value: 28, color: '#8b5cf6' },
  { name: 'Gemini Pro', value: 20, color: '#06b6d4' }, { name: 'Llama 3', value: 12, color: '#10b981' },
  { name: 'Mistral', value: 5, color: '#f59e0b' },
];
const radialData = [
  { name: 'Memory', value: 78, fill: '#6366f1' }, { name: 'Prompt', value: 92, fill: '#8b5cf6' },
  { name: 'Agents', value: 65, fill: '#06b6d4' }, { name: 'Deploy', value: 88, fill: '#10b981' },
];
const tokenData = [
  { day: 'Mon', input: 4200, output: 3800 }, { day: 'Tue', input: 5100, output: 4200 },
  { day: 'Wed', input: 4800, output: 4600 }, { day: 'Thu', input: 6200, output: 5100 },
  { day: 'Fri', input: 5800, output: 5400 }, { day: 'Sat', input: 3200, output: 2800 },
  { day: 'Sun', input: 2900, output: 2400 },
];
const quickApps = [
  { icon: Brain, label: 'Memory Tuning', desc: 'Context window optimization', color: '#8b5cf6', path: '/memory-tuning' },
  { icon: Sparkles, label: 'Prompt Tuning', desc: 'Template & chain builder', color: '#06b6d4', path: '/prompt-tuning' },
  { icon: Network, label: 'Agent Orch.', desc: 'Multi-agent workflows', color: '#10b981', path: '/agent-orchestration' },
  { icon: BookOpen, label: 'LLM Wiki', desc: 'Model knowledge base', color: '#f59e0b', path: '/llm-wiki' },
  { icon: Rocket, label: 'Deploy', desc: 'MCP / Docker / Plugin', color: '#f97316', path: '/deployment' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">NexusAI Studio</h1>
          <p className="text-slate-500 mt-1">Multi-App AI Routing & Tuning Platform</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="text-sm text-emerald-400 font-medium">All Systems Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Cpu, label: 'Active Models', value: '12', change: '+2', up: true, color: '#6366f1' },
          { icon: Database, label: 'Memory Usage', value: '78%', change: '-5%', up: false, color: '#8b5cf6' },
          { icon: Zap, label: 'API Calls/hr', value: '24.8K', change: '+12%', up: true, color: '#06b6d4' },
          { icon: TrendingUp, label: 'Avg Latency', value: '42ms', change: '-8ms', up: false, color: '#10b981' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-card p-4 relative overflow-hidden hover:scale-102 hover:-translate-y-0.5 transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5" style={{ background: stat.color, filter: 'blur(20px)' }} />
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              <span className={`flex items-center gap-0.5 text-xs ${stat.up ? 'text-emerald-400' : 'text-cyan-400'}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />} {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-300">System Performance</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="cL" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
                <linearGradient id="cT" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} /><stop offset="95%" stopColor="#06b6d4" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ background: 'rgba(18,18,26,0.9)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="latency" stroke="#6366f1" fill="url(#cL)" strokeWidth={2} />
              <Area type="monotone" dataKey="throughput" stroke="#06b6d4" fill="url(#cT)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Module Health</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={radialData} startAngle={180} endAngle={-180}>
              <RadialBar dataKey="value" cornerRadius={10} background={{ fill: 'rgba(255,255,255,0.03)' }} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-5">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Token Usage (7d)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={tokenData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ background: 'rgba(18,18,26,0.9)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '8px' }} />
              <Bar dataKey="input" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="output" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Model Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={modelUsageData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {modelUsageData.map((entry, idx) => (<Cell key={idx} fill={entry.color} />))}
              </Pie>
              <Tooltip contentStyle={{ background: 'rgba(18,18,26,0.9)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Quick Access</h3>
          <div className="space-y-2">
            {quickApps.map((app) => (
              <a key={app.label} href={`#${app.path}`} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-white/[0.03] hover:translate-x-1 transition-all duration-200">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${app.color}15` }}>
                  <app.icon className="w-4 h-4" style={{ color: app.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-300">{app.label}</p>
                  <p className="text-[10px] text-slate-600">{app.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-slate-300">Live Activity Stream</h3>
          <div className="flex items-center gap-2"><span className="status-dot active" /><span className="text-xs text-slate-500">Real-time</span></div>
        </div>
        <div className="flex gap-1 h-12 items-end">
          {Array.from({ length: 60 }, (_, idx) => {
            const h = Math.random() * 100;
            return <div key={idx} className="flex-1 rounded-t-sm animate-bar-grow" style={{ background: `linear-gradient(to top, ${h > 70 ? '#6366f1' : h > 40 ? '#8b5cf6' : '#06b6d4'}, transparent)`, opacity: 0.6, animationDelay: `${idx * 0.02}s` }} />;
          })}
        </div>
      </div>
    </div>
  );
}
