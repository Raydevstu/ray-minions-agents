import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MemoryTuning from './pages/MemoryTuning';
import MemoryExtraction from './pages/MemoryExtraction';
import KnowledgeGraph from './pages/KnowledgeGraph';
import ContextLayers from './pages/ContextLayers';
import ContextGateway from './pages/ContextGateway';
import PromptTuning from './pages/PromptTuning';
import AgentOrchestration from './pages/AgentOrchestration';
import LLMWiki from './pages/LLMWiki';
import Obsidian from './pages/Obsidian';
import Notepad from './pages/Notepad';
import DocEditor from './pages/DocEditor';
import Deployment from './pages/Deployment';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/memory-tuning" element={<MemoryTuning />} />
          <Route path="/memory-extraction" element={<MemoryExtraction />} />
          <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
          <Route path="/context-layers" element={<ContextLayers />} />
          <Route path="/context-gateway" element={<ContextGateway />} />
          <Route path="/prompt-tuning" element={<PromptTuning />} />
          <Route path="/agent-orchestration" element={<AgentOrchestration />} />
          <Route path="/llm-wiki" element={<LLMWiki />} />
          <Route path="/obsidian" element={<Obsidian />} />
          <Route path="/notepad" element={<Notepad />} />
          <Route path="/doc-editor" element={<DocEditor />} />
          <Route path="/deployment" element={<Deployment />} />
        </Routes>
      </Layout>
    </Router>
  );
}
