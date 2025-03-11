import React, { memo } from 'react';
import { FileSystemItemProps } from '../types/FileExplorerTypes';
import { useFileSystemItem } from '../hooks/useFileSystemItem';
import Button from './Button';
import { getFolderIcon, getFileIcon, getExpandIcon } from '../utils/fileIcons';
import { AddFileItemIcon, AddFolderItemIcon, DeleteIcon } from '../utils/actionIcons';

/**
 * Renders a file or folder item in the file explorer
 * Memoized to prevent unnecessary re-renders
 */
const FileSystemItem: React.FC<FileSystemItemProps> = memo(({ node }) => {
  const {
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
  } = useFileSystemItem(node);

  return (
    <div className="file-system-item">
      <div
        className="item-header"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="item-name">
          {node.type === 'folder' && (
            <span className="expand-icon" onClick={toggleExpand}>
              {getExpandIcon(isExpanded)}
            </span>
          )}
          <span className="icon" onClick={toggleExpand}>
            {node.type === 'folder' 
              ? getFolderIcon(isExpanded)
              : getFileIcon(node.name)
            }
          </span>
          {isEditing ? (
            <form onSubmit={handleNameSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={newName}
                onChange={handleNameChange}
                onBlur={handleNameSubmit}
                onKeyDown={handleKeyDown}
                onClick={(e) => e.stopPropagation()}
                aria-label="Edit name"
              />
            </form>
          ) : (
            <span
              onDoubleClick={startRenaming}
              title="Double click to rename"
              className="item-text"
            >
              {node.name}
            </span>
          )}
        </div>
        {showActions && !showDeleteConfirm && (
          <div className="item-actions">
            {node.type === 'folder' && (
              <>
                <Button 
                  onClick={() => handleAddItem('file')} 
                  title="Add file"
                  className="action-btn add-file-btn"
                  variant="icon"
                  size="small"
                  aria-label="Add file"
                  showTextWithIcon={false}
                  icon={<AddFileItemIcon />}
                >
                  Add File
                </Button>
                <Button 
                  onClick={() => handleAddItem('folder')} 
                  title="Add folder"
                  className="action-btn add-folder-btn"
                  variant="icon"
                  size="small"
                  aria-label="Add folder"
                  showTextWithIcon={false}
                  icon={<AddFolderItemIcon />}
                >
                  Add Folder
                </Button>
              </>
            )}
            <Button 
              onClick={handleDelete} 
              title="Delete"
              className="action-btn delete-btn"
              variant="icon"
              size="small"
              aria-label="Delete"
              showTextWithIcon={false}
              icon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
        )}
        {showDeleteConfirm && (
          <div className="delete-confirm">
            <span>Delete folder and all contents?</span>
            <div className="confirm-actions">
              <Button 
                onClick={confirmDelete} 
                variant="danger"
                size="small"
              >
                Yes
              </Button>
              <Button 
                onClick={cancelDelete} 
                variant="secondary"
                size="small"
              >
                No
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {node.type === 'folder' && isExpanded && node.children && node.children.length > 0 && (
        <div className="item-children">
          {node.children.map(childNode => (
            <FileSystemItem key={childNode.id} node={childNode} />
          ))}
        </div>
      )}
      
      {node.type === 'file' && showContent && node.content && (
        <div className="file-content">
          <pre>{node.content}</pre>
        </div>
      )}
    </div>
  );
});

// Display name for debugging
FileSystemItem.displayName = 'FileSystemItem';

export default FileSystemItem; 