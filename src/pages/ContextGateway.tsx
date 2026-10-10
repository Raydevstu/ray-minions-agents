import { Globe, Play, Settings, Activity, Key, Server, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const providers = [
  { id: 'openai', name: 'OpenAI', color: '#10b981', protocols: ['Chat Completions', 'Responses'] },
  { id: 'anthropic', name: 'Anthropic', color: '#8b5cf6', protocols: ['Messages'] },
  { id: 'deepseek', name: 'DeepSeek', color: '#06b6d4', protocols: ['Chat Completions', 'Messages'] },
  { id: 'google', name: 'Google', color: '#f59e0b', protocols: ['Chat Completions'] },
];

export default function ContextGateway() {
  const [selectedProvider, setSelectedProvider] = useState('openai');
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const config = {
    provider: selectedProvider,
    protocol: 'chat-completions',
    baseUrl: 'https://api.openai.com/v1',
    apiKey: 'sk-...',
    model: 'gpt-4o',
    memoryInjection: memoryEnabled,
    maxMemoryTokens: 2000
  };

  const stats = {
    totalRequests: 127,
    totalMemoryTokens: 45230,
    avgMemoryTokens: 356,
    memoryInjectionRate: memoryEnabled ? 100 : 0,
  };

  const logs = [
    { id: 'chatcmpl-1', memoryInjected: true, memoryTokens: 420, timestamp: new Date() },
    { id: 'chatcmpl-2', memoryInjected: true, memoryTokens: 380, timestamp: new Date() },
    { id: 'chatcmpl-3', memoryInjected: true, memoryTokens: 450, timestamp: new Date() },
  ];

  const handleTest = () => {
    setIsTesting(true);
    setTimeout(() => {
      setTestResult(JSON.stringify({
        id: 'chatcmpl-test-123',
        choices: [{ message: { role: 'assistant', content: 'Based on the context and memories, here is my response.' }, finish_reason: 'stop' }],
        usage: { prompt_tokens: 150, completion_tokens: 45, total_tokens: 195 },
        gatewayMeta: { memoryInjected: memoryEnabled, memoryTokens: 420, timestamp: new Date() }
      }, null, 2));
      setIsTesting(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Context Gateway</h1>
            <p className="text-sm text-slate-500">Universal LLM API proxy with memory injection</p>
          </div>
        </div>
        <button onClick={handleTest} disabled={isTesting}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:scale-105 transition-all disabled:opacity-50">
          <Play className="w-4 h-4" /> {isTesting ? 'Testing...' : 'Test Gateway'}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500 mb-1">Total Requests</p>
          <p className="text-2xl font-bold text-white">{stats.totalRequests}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500 mb-1">Memory Tokens</p>
          <p className="text-2xl font-bold text-indigo-400">{stats.totalMemoryTokens.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500 mb-1">Avg Memory/Req</p>
          <p className="text-2xl font-bold text-cyan-400">{stats.avgMemoryTokens}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500 mb-1">Injection Rate</p>
          <p className="text-2xl font-bold text-emerald-400">{stats.memoryInjectionRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-medium text-slate-300">Providers</h3>
          </div>
          <div className="space-y-2">
            {providers.map((p) => (
              <div key={p.id} onClick={() => setSelectedProvider(p.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all hover:translate-x-1 ${
                  selectedProvider === p.id ? 'bg-indigo-500/10 border border-indigo-500/20' : 'hover:bg-white/[0.03] border border-transparent'
                }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-300">{p.name}</span>
                  <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.protocols.map((proto) => (
                    <span key={proto} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500">{proto}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-medium text-slate-300">Gateway Configuration</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Provider</label>
              <input type="text" value={config.provider} readOnly className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300" />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Model</label>
              <input type="text" value={config.model} readOnly className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300" />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Base URL</label>
              <input type="text" value={config.baseUrl} readOnly className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300" />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">API Key</label>
              <div className="flex items-center gap-2">
                <input type="password" value={config.apiKey} readOnly className="flex-1 bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300" />
                <Key className="w-3.5 h-3.5 text-slate-500" />
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              <span className="text-xs text-slate-300">Memory Injection</span>
            </div>
            <button onClick={() => setMemoryEnabled(!memoryEnabled)}
              className={`w-10 h-5 rounded-full transition-colors ${memoryEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${memoryEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>
      </div>

      {testResult && (
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-medium text-slate-300">Test Response</h3>
          </div>
          <pre className="text-[10px] font-mono text-slate-400 bg-black/20 rounded-lg p-4 overflow-auto max-h-[300px]">
            {testResult}
          </pre>
        </div>
      )}

      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-medium text-slate-300">Request Log</h3>
        </div>
        <div className="space-y-2">
          {logs.map((log, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-300">{log.id}</span>
                <span className="text-[10px] text-slate-600">{log.timestamp.toLocaleTimeString()}</span>
              </div>
              <div className="flex gap-4 text-[10px] text-slate-500">
                <span>Memory: {log.memoryInjected ? '✓' : '✗'}</span>
                <span>Tokens: {log.memoryTokens}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
