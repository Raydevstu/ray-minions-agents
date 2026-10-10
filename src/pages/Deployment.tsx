import { Rocket, Container, Plug, Cloud, Server, CheckCircle2, Circle, Download, Terminal, Globe, Shield, Cpu } from 'lucide-react';
import { useState } from 'react';

const deployTargets = [
  { id: 'docker', name: 'Docker', icon: Container, description: 'Containerized deployment with GPU support', color: '#0db7ed', status: 'ready', platforms: ['Linux', 'macOS', 'Windows'] },
  { id: 'mcp', name: 'MCP Server', icon: Plug, description: 'Model Context Protocol integration', color: '#8b5cf6', status: 'ready', platforms: ['Claude', 'OpenAI', 'Local'] },
  { id: 'plugin', name: 'Plugin System', icon: Globe, description: 'Extensible plugin architecture', color: '#10b981', status: 'ready', platforms: ['VS Code', 'Cursor', 'Custom'] },
  { id: 'cloud', name: 'Cloud Deploy', icon: Cloud, description: 'One-click cloud deployment', color: '#f59e0b', status: 'beta', platforms: ['AWS', 'GCP', 'Azure'] },
];

const dockerConfig = `# docker-compose.yml
version: '3.8'
services:
  nexus-ai:
    image: nexusai/studio:latest
    ports:
      - "3000:3000"
      - "8080:8080"
    environment:
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - ANTHROPIC_API_KEY=\${ANTHROPIC_API_KEY}
      - MODEL_ROUTER=auto
      - MEMORY_BACKEND=redis
    volumes:
      - ./config:/app/config
      - .//app/data
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  vector-db:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"`;

const mcpConfig = `# MCP Server Configuration
{
  "name": "nexus-ai-studio",
  "version": "1.0.0",
  "description": "Multi-App AI Routing Platform",
  "tools": [
    {
      "name": "route_request",
      "description": "Route AI request to optimal model",
      "parameters": {
        "model": "string",
        "prompt": "string",
        "context": "object"
      }
    },
    {
      "name": "tune_memory",
      "description": "Configure memory allocation",
      "parameters": {
        "window_size": "number",
        "strategy": "string"
      }
    }
  ],
  "resources": [
    {
      "uri": "nexus://models",
      "name": "Available Models"
    }
  ]
}`;

export default function Deployment() {
  const [selectedTarget, setSelectedTarget] = useState('docker');
  const [deployProgress, setDeployProgress] = useState(0);
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    setDeployProgress(0);
    const interval = setInterval(() => {
      setDeployProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDeploying(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Deployment Center</h1>
            <p className="text-sm text-slate-500">Deploy across Docker, MCP, Plugins & Cloud</p>
          </div>
        </div>
        <button onClick={handleDeploy} disabled={isDeploying}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20 hover:scale-105 transition-all disabled:opacity-50">
          <Rocket className="w-4 h-4" /> {isDeploying ? 'Deploying...' : 'Deploy Now'}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {deployTargets.map((target) => (
          <div key={target.id} onClick={() => setSelectedTarget(target.id)}
            className={`glass-card p-4 cursor-pointer transition-all hover:-translate-y-1 ${
              selectedTarget === target.id ? 'ring-1 ring-orange-500/30' : ''
            }`}>
            <div className="flex items-center justify-between mb-3">
              <target.icon className="w-6 h-6" style={{ color: target.color }} />
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                target.status === 'ready' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
              }`}>{target.status}</span>
            </div>
            <h3 className="text-sm font-medium text-white mb-1">{target.name}</h3>
            <p className="text-[10px] text-slate-500 mb-3">{target.description}</p>
            <div className="flex flex-wrap gap-1">
              {target.platforms.map((p) => (
                <span key={p} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500">{p}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-medium text-slate-300">
                {selectedTarget === 'docker' ? 'docker-compose.yml' : 'mcp-config.json'}
              </span>
            </div>
            <button className="p-1 rounded hover:bg-white/5 transition-all">
              <Download className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
          <div className="p-4 max-h-[400px] overflow-auto">
            <pre className="text-[11px] font-mono text-slate-400 leading-relaxed whitespace-pre-wrap">
              {selectedTarget === 'docker' ? dockerConfig : mcpConfig}
            </pre>
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-medium text-slate-300">Deployment Status</h3>
          </div>

          {isDeploying && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">Deploying to {selectedTarget}...</span>
                <span className="text-xs text-orange-400">{Math.min(100, Math.round(deployProgress))}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, deployProgress)}%` }} />
              </div>
            </div>
          )}

          {!isDeploying && deployProgress >= 100 && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-emerald-400 font-medium">Deployment Successful!</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">All services are running and healthy.</p>
            </div>
          )}

          <div className="space-y-2">
            {[
              { label: 'Environment variables configured', done: true },
              { label: 'API keys validated', done: true },
              { label: 'GPU drivers detected', done: true },
              { label: 'Network ports available', done: true },
              { label: 'Volume mounts configured', done: deployProgress >= 50 },
              { label: 'Health checks passing', done: deployProgress >= 100 },
              { label: 'SSL certificates ready', done: deployProgress >= 100 },
            ].map((check, idx) => (
              <div key={check.label} className="flex items-center gap-2">
                {check.done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-slate-600" />
                )}
                <span className={`text-xs ${check.done ? 'text-slate-300' : 'text-slate-600'}`}>{check.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5">
            <h4 className="text-xs font-medium text-slate-400 mb-3">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Shield, label: 'Security Scan', color: '#ef4444' },
                { icon: Cpu, label: 'GPU Status', color: '#10b981' },
                { icon: Globe, label: 'Network Test', color: '#6366f1' },
                { icon: Download, label: 'Pull Images', color: '#f59e0b' },
              ].map((action) => (
                <button key={action.label}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all hover:scale-105">
                  <action.icon className="w-3.5 h-3.5" style={{ color: action.color }} />
                  <span className="text-[10px] text-slate-400">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
