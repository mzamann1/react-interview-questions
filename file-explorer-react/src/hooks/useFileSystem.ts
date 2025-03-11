import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  FileSystemNode, 
  FileType, 
  ImportFileStructure, 
  ActionResult 
} from '../types/FileExplorerTypes';

/**
 * Custom hook for managing file system operations
 * Separates business logic from UI components
 */
export const useFileSystem = (initialData?: ImportFileStructure[]) => {
  // Core state
  const [fileSystem, setFileSystem] = useState<FileSystemNode[]>(() => {
    if (initialData) {
      return convertImportToFileSystem(initialData);
    }
    return [];
  });
  
  // UI state
  const [lastCreatedNodeId, setLastCreatedNodeId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Convert import structure to file system nodes with IDs
  const convertImportToFileSystem = useCallback((importStructure: ImportFileStructure[]): FileSystemNode[] => {
    return importStructure.map(item => convertImportItemToNode(item));
  }, []);

  const convertImportItemToNode = useCallback((item: ImportFileStructure): FileSystemNode => {
    return {
      id: uuidv4(),
      name: item.name,
      type: item.type,
      content: item.content,
      children: item.children ? item.children.map(child => convertImportItemToNode(child)) : undefined
    };
  }, []);

  // Node operations
  const findNode = useCallback((id: string, nodes: FileSystemNode[]): FileSystemNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNode(id, node.children);
        if (found) return found;
      }
    }
    return null;
  }, []);

  const isNameUnique = useCallback((name: string, siblings: FileSystemNode[]): boolean => {
    return !siblings.some(node => node.name === name);
  }, []);

  const addNode = useCallback((parentId: string | null, name: string, type: FileType): string | null => {
    const newNodeId = uuidv4();
    const newNode: FileSystemNode = {
      id: newNodeId,
      name,
      type,
      children: type === 'folder' ? [] : undefined,
    };

    let isSuccess = true;
    let nodeId: string | null = null;

    setFileSystem(prevSystem => {
      if (!parentId) {
        // Adding to root level
        if (!isNameUnique(name, prevSystem)) {
          setErrorMessage(`A ${type} with name "${name}" already exists at this level.`);
          isSuccess = false;
          return prevSystem;
        }
        nodeId = newNodeId;
        return [...prevSystem, newNode];
      }

      const newSystem = [...prevSystem];
      let nameExists = false;

      const updateChildren = (nodes: FileSystemNode[]): FileSystemNode[] => {
        return nodes.map(node => {
          if (node.id === parentId) {
            if (!isNameUnique(name, node.children || [])) {
              nameExists = true;
              return node;
            }
            nodeId = newNodeId;
            return {
              ...node,
              children: [...(node.children || []), newNode],
            };
          }
          if (node.children) {
            return {
              ...node,
              children: updateChildren(node.children),
            };
          }
          return node;
        });
      };

      const result = updateChildren(newSystem);
      
      if (nameExists) {
        setErrorMessage(`A ${type} with name "${name}" already exists at this level.`);
        isSuccess = false;
        return prevSystem;
      }
      
      return result;
    });

    // Set the last created node ID so we can auto-focus it
    if (isSuccess && nodeId) {
      setLastCreatedNodeId(nodeId);
      return nodeId;
    }
    
    return null;
  }, [isNameUnique]);

  const deleteNode = useCallback((id: string): void => {
    setFileSystem(prevSystem => {
      const deleteFromChildren = (nodes: FileSystemNode[]): FileSystemNode[] => {
        return nodes.filter(node => {
          if (node.id === id) return false;
          if (node.children) {
            node.children = deleteFromChildren(node.children);
          }
          return true;
        });
      };

      return deleteFromChildren(prevSystem);
    });
  }, []);

  const updateNode = useCallback((id: string, newName: string): boolean => {
    let success = true;
    
    setFileSystem(prevSystem => {
      // First, find the parent of the node to check siblings
      const findParentAndSiblings = (nodes: FileSystemNode[], nodeId: string): { parent: FileSystemNode | null, siblings: FileSystemNode[] } | null => {
        for (const node of nodes) {
          if (node.children) {
            if (node.children.some(child => child.id === nodeId)) {
              return { parent: node, siblings: node.children };
            }
            const result = findParentAndSiblings(node.children, nodeId);
            if (result) return result;
          }
        }
        return null;
      };

      // For root level nodes
      const isRootNode = prevSystem.some(node => node.id === id);
      if (isRootNode) {
        const otherRootNodes = prevSystem.filter(node => node.id !== id);
        if (!isNameUnique(newName, otherRootNodes)) {
          setErrorMessage(`A node with name "${newName}" already exists at this level.`);
          success = false;
          return prevSystem;
        }
      } else {
        // For nested nodes
        const parentAndSiblings = findParentAndSiblings(prevSystem, id);
        if (parentAndSiblings) {
          const otherSiblings = parentAndSiblings.siblings.filter(node => node.id !== id);
          if (!isNameUnique(newName, otherSiblings)) {
            setErrorMessage(`A node with name "${newName}" already exists at this level.`);
            success = false;
            return prevSystem;
          }
        }
      }

      // If we get here, the name is unique, so update it
      const updateInChildren = (nodes: FileSystemNode[]): FileSystemNode[] => {
        return nodes.map(node => {
          if (node.id === id) {
            return { ...node, name: newName };
          }
          if (node.children) {
            return {
              ...node,
              children: updateInChildren(node.children),
            };
          }
          return node;
        });
      };

      return updateInChildren(prevSystem);
    });

    return success;
  }, [isNameUnique]);

  const getNode = useCallback((id: string): FileSystemNode | null => {
    return findNode(id, fileSystem);
  }, [findNode, fileSystem]);

  // File system operations
  const importFileStructure = useCallback((structure: ImportFileStructure[]): void => {
    setFileSystem(convertImportToFileSystem(structure));
    setLastCreatedNodeId(null);
    setErrorMessage(null);
  }, [convertImportToFileSystem]);

  const refreshFileExplorer = useCallback((): void => {
    setFileSystem([]);
    setLastCreatedNodeId(null);
    setErrorMessage(null);
  }, []);

  // UI state operations
  const clearLastCreatedNodeId = useCallback((): void => {
    setLastCreatedNodeId(null);
  }, []);

  const clearErrorMessage = useCallback((): void => {
    setErrorMessage(null);
  }, []);

  return {
    // Data
    fileSystem,
    
    // Core operations
    addNode,
    deleteNode,
    updateNode,
    getNode,
    
    // File system operations
    importFileStructure,
    refreshFileExplorer,
    
    // UI state
    lastCreatedNodeId,
    clearLastCreatedNodeId,
    errorMessage,
    clearErrorMessage,
  };
}; 