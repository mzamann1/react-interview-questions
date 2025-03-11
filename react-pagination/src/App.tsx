import React from 'react';
import ConfigSection from './components/ConfigSection';
import { usePaginationDemo } from './hooks/usePaginationDemo';
import DemoSection from './components/DemoSection';
import CodeSection from './components/CodeSection';
import './App.css';





/**
 * Main pagination demo component
 */
const App: React.FC = () => {
  // Use our custom hook to manage state and logic
  const paginationDemo = usePaginationDemo();

  return (
    <div className="container">
      <header className="header">
        <h1>React Pagination Component</h1>
        <p className="subtitle">A professional, accessible, and customizable pagination solution for modern React applications</p>
      </header>

      <main>
        <ConfigSection {...paginationDemo} />
        <DemoSection {...paginationDemo} />
        <CodeSection codeExample={paginationDemo.codeExample} />
      </main>

      <footer>
        <p>Created with React + TypeScript</p>
      </footer>
    </div>
  );
};

export default App;