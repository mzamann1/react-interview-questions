import React, { createContext, useContext, ReactNode } from 'react';
import { useFileSystem } from '../hooks/useFileSystem';
import { FileExplorerContextType, ImportFileStructure } from '../types/FileExplorerTypes';

// Create context with null as initial value
const FileExplorerContext = createContext<FileExplorerContextType | null>(null);

// Props for the provider component
interface FileExplorerProviderProps {
  children: ReactNode;
  initialStructure?: ImportFileStructure[];
}

/**
 * Provider component that wraps the application and provides file system context
 */
export const FileExplorerProvider: React.FC<FileExplorerProviderProps> = ({ 
  children, 
  initialStructure 
}) => {
  // Use our custom hook to get all file system operations and state
  const fileSystemOperations = useFileSystem(initialStructure);
  
  return (
    <FileExplorerContext.Provider value={fileSystemOperations}>
      {children}
    </FileExplorerContext.Provider>
  );
};

/**
 * Custom hook to use the file explorer context
 * Throws an error if used outside of a FileExplorerProvider
 */
export const useFileExplorer = (): FileExplorerContextType => {
  const context = useContext(FileExplorerContext);
  
  if (!context) {
    throw new Error('useFileExplorer must be used within a FileExplorerProvider');
  }
  
  return context;
}; 