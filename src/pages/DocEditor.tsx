import { PenTool, Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight, Image, Link, Code, Table, Type, Heading1, Heading2 } from 'lucide-react';
import { useState } from 'react';

const toolbarGroups = [
  { name: 'Text', tools: [{ icon: Type, label: 'Normal' }, { icon: Heading1, label: 'H1' }, { icon: Heading2, label: 'H2' }] },
  { name: 'Format', tools: [{ icon: Bold, label: 'Bold' }, { icon: Italic, label: 'Italic' }, { icon: Underline, label: 'Underline' }, { icon: Code, label: 'Code' }] },
  { name: 'Align', tools: [{ icon: AlignLeft, label: 'Left' }, { icon: AlignCenter, label: 'Center' }, { icon: AlignRight, label: 'Right' }] },
  { name: 'Insert', tools: [{ icon: List, label: 'List' }, { icon: Table, label: 'Table' }, { icon: Image, label: 'Image' }, { icon: Link, label: 'Link' }] },
];

export default function DocEditor() {
  const [activeFormat, setActiveFormat] = useState<string[]>(['Bold']);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
            <PenTool className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Document Editor</h1>
            <p className="text-sm text-slate-500">Rich text editor with AI writing assistance</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-slate-400 hover:scale-105 transition-all">Export PDF</button>
          <button className="px-4 py-2 rounded-xl text-xs bg-teal-500/10 text-teal-400 border border-teal-500/20 hover:scale-105 transition-all">✨ AI Assist</button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="px-4 py-2 border-b border-white/5 flex items-center gap-1 overflow-x-auto">
          {toolbarGroups.map((group, gIdx) => (
            <div key={group.name} className="flex items-center gap-0.5">
              {gIdx > 0 && <div className="w-px h-5 bg-white/10 mx-2" />}
              {group.tools.map((tool) => (
                <button key={tool.label} onClick={() => setActiveFormat(prev => prev.includes(tool.label) ? prev.filter(f => f !== tool.label) : [...prev, tool.label])}
                  className={`p-1.5 rounded transition-all hover:scale-110 ${
                    activeFormat.includes(tool.label) ? 'bg-teal-500/10 text-teal-400' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                  }`} title={tool.label}>
                  <tool.icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          ))}
          <div className="w-px h-5 bg-white/10 mx-2" />
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-[10px] text-slate-600">Font: Inter</span>
            <span className="text-[10px] text-slate-600">Size: 14px</span>
          </div>
        </div>

        <div className="p-8 min-h-[500px] max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white mb-6">AI Platform Architecture Document</h1>
            <div className="flex items-center gap-3 mb-6 text-xs text-slate-500">
              <span>Last edited: Today at 14:32</span>
              <span>•</span>
              <span>3 collaborators</span>
              <span>•</span>
              <span className="text-emerald-400">Auto-saved</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-200 mt-8">1. Overview</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              This document outlines the architecture for our multi-model AI routing platform. The system supports seamless switching between LLM providers while maintaining consistent API contracts.
            </p>
            <h2 className="text-xl font-semibold text-slate-200 mt-8">2. Core Components</h2>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { title: 'Router Layer', desc: 'Intelligent request routing based on model capabilities, cost, and latency.' },
                { title: 'Memory Manager', desc: 'Context window optimization, conversation history, and semantic caching.' },
                { title: 'Agent Framework', desc: 'Multi-agent orchestration with tool use, planning, and execution.' },
                { title: 'Eval Pipeline', desc: 'Automated evaluation for model performance, safety, and alignment.' },
              ].map((comp) => (
                <div key={comp.title} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-teal-500/20 transition-all">
                  <h4 className="text-xs font-medium text-teal-400 mb-1">{comp.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{comp.desc}</p>
                </div>
              ))}
            </div>
            <h2 className="text-xl font-semibold text-slate-200 mt-8">3. Deployment Strategy</h2>
            <p className="text-sm text-slate-400 leading-relaxed">The platform supports multiple deployment targets:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-sm text-slate-400">
              <li><span className="text-teal-400">Docker Containers</span> — Self-hosted with GPU passthrough</li>
              <li><span className="text-teal-400">MCP Protocol</span> — Model Context Protocol for tool integration</li>
              <li><span className="text-teal-400">Plugin System</span> — Extensible architecture for custom providers</li>
              <li><span className="text-teal-400">Edge Deployment</span> — Low-latency inference at the edge</li>
            </ul>
            <div className="mt-8 p-4 rounded-lg bg-teal-500/5 border border-teal-500/10">
              <p className="text-xs text-teal-400 font-medium mb-1">💡 AI Suggestion</p>
              <p className="text-xs text-slate-400">Consider adding a section on security considerations and data privacy compliance (SOC2, GDPR).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
