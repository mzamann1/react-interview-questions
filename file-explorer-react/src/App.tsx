import React from 'react';
import FileExplorer from './components/FileExplorer';
import './styles/FileExplorer.css';
import './styles/Button.css';
import './styles/ErrorMessage.css';

/**
 * Main application component
 */
const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React File Explorer</h1>
        <p className="app-description">
          A feature-rich file explorer with CRUD operations, rename functionality, and JSON import.
        </p>
      </header>
      <main className="app-content">
        <FileExplorer />
      </main>
      <footer className="app-footer">
        <p>
          Built with React and TypeScript. 
          <a href="https://github.com/yourusername/file-explorer-react" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
