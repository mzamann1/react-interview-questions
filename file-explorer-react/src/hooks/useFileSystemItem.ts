import { useState, useRef, useEffect, useCallback } from 'react';
import { FileSystemNode } from '../types/FileExplorerTypes';
import { useFileExplorer } from '../context/FileExplorerContext';

/**
 * Custom hook for managing file system item operations
 * Separates UI logic from the component
 */
export const useFileSystemItem = (node: FileSystemNode) => {
  // State
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(node.name);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Context
  const { 
    addNode, 
    deleteNode, 
    updateNode, 
    lastCreatedNodeId, 
    clearLastCreatedNodeId,
    clearErrorMessage
  } = useFileExplorer();

  // Check if this node was just created and should be in edit mode
  useEffect(() => {
    if (lastCreatedNodeId === node.id) {
      setIsEditing(true);
      if (node.type === 'folder') {
        setIsExpanded(true);
      }
      clearLastCreatedNodeId();
    }
  }, [lastCreatedNodeId, node.id, node.type, clearLastCreatedNodeId]);

  // Focus the input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Handlers
  const handleAddItem = useCallback((type: 'file' | 'folder') => {
    const name = type === 'file' ? 'New File.txt' : 'New Folder';
    const newNodeId = addNode(node.id, name, type);
    
    // Only expand if the node was successfully added
    if (newNodeId && !isExpanded) {
      setIsExpanded(true);
    }
  }, [node.id, addNode, isExpanded]);

  const handleDelete = useCallback(() => {
    if (node.type === 'folder' && node.children && node.children.length > 0) {
      setShowDeleteConfirm(true);
    } else {
      deleteNode(node.id);
    }
  }, [node.id, node.type, node.children, deleteNode]);

  const confirmDelete = useCallback(() => {
    deleteNode(node.id);
    setShowDeleteConfirm(false);
  }, [node.id, deleteNode]);

  const cancelDelete = useCallback(() => {
    setShowDeleteConfirm(false);
  }, []);

  const handleNameSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    clearErrorMessage();
    
    if (newName.trim() && newName !== node.name) {
      const success = updateNode(node.id, newName.trim());
      if (!success) {
        // If update failed, revert to original name
        setNewName(node.name);
      }
    } else {
      setNewName(node.name);
    }
    setIsEditing(false);
  }, [node.id, node.name, newName, updateNode, clearErrorMessage]);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setNewName(node.name);
      setIsEditing(false);
    }
  }, [node.name]);

  const toggleExpand = useCallback((e: React.MouseEvent) => {
    if (node.type === 'folder' && !isEditing) {
      setIsExpanded(!isExpanded);
      e.stopPropagation();
    } else if (node.type === 'file' && !isEditing) {
      setShowContent(!showContent);
      e.stopPropagation();
    }
  }, [node.type, isEditing, isExpanded, showContent]);

  const startRenaming = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setShowActions(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowActions(false);
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(false);
    }
  }, [showDeleteConfirm]);

  return {
    // State
    isEditing,
    newName,
    isExpanded,
    showActions,
    showDeleteConfirm,
    showContent,
    
    // Refs
    inputRef,
    
    // Handlers
    handleAddItem,
    handleDelete,
    confirmDelete,
    cancelDelete,
    handleNameSubmit,
    handleNameChange,
    handleKeyDown,
    toggleExpand,
    startRenaming,
    handleMouseEnter,
    handleMouseLeave,
  };
}; 