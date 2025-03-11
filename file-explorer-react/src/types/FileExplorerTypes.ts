export type FileType = 'file' | 'folder';

// Base interface for common properties
export interface BaseNode {
  name: string;
  type: FileType;
  children?: FileSystemNode[];
  content?: string;
}

export interface FileSystemNode extends BaseNode {
  id: string;
}

export interface ImportFileStructure extends BaseNode {
  // Import structure doesn't have IDs as they're generated on import
}

// Action result types for better error handling
export interface ActionResult {
  success: boolean;
  message?: string;
  data?: any;
}

// Context types with more specific return types
export interface FileExplorerContextType {
  // Core CRUD operations
  addNode: (parentId: string | null, name: string, type: FileType) => string | null;
  deleteNode: (id: string) => void;
  updateNode: (id: string, newName: string) => boolean;
  getNode: (id: string) => FileSystemNode | null;
  
  // File system operations
  importFileStructure: (structure: ImportFileStructure[]) => void;
  refreshFileExplorer: () => void;
  
  // UI state management
  lastCreatedNodeId: string | null;
  clearLastCreatedNodeId: () => void;
  errorMessage: string | null;
  clearErrorMessage: () => void;
  
  // Data
  fileSystem: FileSystemNode[];
}

// Props interfaces for components
export interface FileExplorerProps {
  initialStructure?: ImportFileStructure[];
}

export interface FileSystemItemProps {
  node: FileSystemNode;
} 