import React, { useState, useRef } from 'react';
import FileSystemItem from './FileSystemItem';
import ErrorMessage from './ErrorMessage';
import Button from './Button';
import { FileExplorerProps } from '../types/FileExplorerTypes';
import { FileExplorerProvider, useFileExplorer } from '../context/FileExplorerContext';
import { AddFolderIcon, AddFileIcon, ImportIcon, RefreshIcon } from '../utils/actionIcons';

/**
 * The main file explorer component that renders the file system
 * Uses the FileExplorerProvider for state management
 */
const FileExplorer: React.FC<FileExplorerProps> = ({ initialStructure }) => {
  return (
    <FileExplorerProvider initialStructure={initialStructure}>
      <FileExplorerContent />
    </FileExplorerProvider>
  );
};

/**
 * The content of the file explorer, separated from the provider
 * for better organization and performance
 */
const FileExplorerContent: React.FC = () => {
  const { 
    fileSystem, 
    addNode, 
    refreshFileExplorer, 
    importFileStructure,
    errorMessage
  } = useFileExplorer();
  
  const [showImportForm, setShowImportForm] = useState(false);
  const [importText, setImportText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    setShowImportForm(true);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const structure = JSON.parse(importText);
      importFileStructure(structure);
      setImportText('');
      setShowImportForm(false);
    } catch (error) {
      console.error('Invalid JSON format', error);
      alert('Invalid JSON format. Please check your input.');
    }
  };

  const handleImportCancel = () => {
    setImportText('');
    setShowImportForm(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const structure = JSON.parse(content);
        importFileStructure(structure);
      } catch (error) {
        console.error('Invalid JSON file', error);
        alert('Invalid JSON file. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="file-explorer">
      <div className="file-explorer-header">
        <h2>File Explorer</h2>
        <div className="header-actions">
          <Button
            onClick={() => addNode(null, 'New Folder', 'folder')}
            className="add-root-btn"
            title="Add a new root folder"
            icon={<AddFolderIcon />}
            aria-label="Add folder"
            variant="primary"
            size="small"
            showTextWithIcon={false}
          >
            Add Folder
          </Button>
          <Button
            onClick={() => addNode(null, 'New File.txt', 'file')}
            className="add-root-btn"
            title="Add a new root file"
            icon={<AddFileIcon />}
            aria-label="Add file"
            variant="primary"
            size="small"
            showTextWithIcon={false}
          >
            Add File
          </Button>
          <Button
            onClick={handleImportClick}
            className="import-btn"
            title="Import file structure from JSON"
            icon={<ImportIcon />}
            aria-label="Import JSON"
            variant="secondary"
            size="small"
            showTextWithIcon={false}
          >
            Import
          </Button>
          <Button
            onClick={refreshFileExplorer}
            className="refresh-btn"
            title="Reset file explorer"
            icon={<RefreshIcon />}
            aria-label="Reset"
            variant="secondary"
            size="small"
            showTextWithIcon={false}
          >
            Reset
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept=".json"
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {showImportForm && (
        <div className="import-form">
          <h3>Import File Structure</h3>
          <form onSubmit={handleImportSubmit}>
            <div className="form-group">
              <label htmlFor="importJson">Paste JSON or</label>
              <Button
                type="button"
                onClick={triggerFileInput}
                variant="secondary"
                size="small"
              >
                Upload File
              </Button>
            </div>
            <textarea
              id="importJson"
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              rows={10}
              placeholder='[{"name": "Example Folder", "type": "folder", "children": [{"name": "file.txt", "type": "file", "content": "Hello World"}]}]'
            ></textarea>
            <div className="form-actions">
              <Button type="submit" variant="primary">
                Import
              </Button>
              <Button
                type="button"
                onClick={handleImportCancel}
                variant="secondary"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="file-system-container">
        {fileSystem.length > 0 ? (
          fileSystem.map((node) => (
            <FileSystemItem key={node.id} node={node} />
          ))
        ) : (
          <div className="empty-state">
            <p>No files or folders yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer; 