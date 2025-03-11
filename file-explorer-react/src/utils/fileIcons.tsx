import React, { ReactElement } from 'react';

/**
 * Get the appropriate icon for a file based on its extension
 * @param fileName - The name of the file
 * @param isOpen - Whether the file/folder is open (for folders only)
 * @returns ReactElement with the appropriate icon
 */
export const getFileIcon = (fileName: string, isOpen = false): ReactElement => {
  // For folders, return the appropriate folder icon
  if (fileName.includes('/folder')) {
    return isOpen ? getOpenFolderIcon() : getClosedFolderIcon();
  }

  // For files, determine the icon based on extension
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch(extension) {
    case 'txt':
      return getTextFileIcon();
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
      return getJavaScriptIcon();
    case 'html':
      return getHtmlIcon();
    case 'css':
      return getCssIcon();
    case 'json':
      return getJsonIcon();
    case 'md':
      return getMarkdownIcon();
    default:
      return getDefaultFileIcon();
  }
};

/**
 * Get the appropriate icon for a folder
 * @param isOpen - Whether the folder is open
 * @returns ReactElement with the appropriate folder icon
 */
export const getFolderIcon = (isOpen: boolean): ReactElement => {
  return isOpen ? getOpenFolderIcon() : getClosedFolderIcon();
};

// Individual icon components
const getClosedFolderIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
    <path 
      d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" 
      fill="#90CDF4" 
      stroke="#2C5282" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const getOpenFolderIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
    <path 
      d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" 
      fill="#4299E1" 
      stroke="#2C5282" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const getTextFileIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
    <path 
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" 
      fill="#E9EEF2" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <polyline 
      points="14 2 14 8 20 8" 
      fill="none" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <line 
      x1="8" y1="13" x2="16" y2="13" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <line 
      x1="8" y1="17" x2="16" y2="17" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const getJavaScriptIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
    <path 
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" 
      fill="#F7DF1E" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <polyline 
      points="14 2 14 8 20 8" 
      fill="none" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 16v-4" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M8 12v4c0 1 .5 2 2 2" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M16 12v4c0 1-.5 2-2 2" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const getHtmlIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
    <path 
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" 
      fill="#E34F26" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <polyline 
      points="14 2 14 8 20 8" 
      fill="none" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 16l3-8 3 8" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M8 12h8" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const getCssIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
    <path 
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" 
      fill="#264DE4" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <polyline 
      points="14 2 14 8 20 8" 
      fill="none" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 12c-1 0-2 .5-2 2s1 2 2 2 2 .5 2 2-1 2-2 2" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const getJsonIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
    <path 
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" 
      fill="#FFCA28" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <polyline 
      points="14 2 14 8 20 8" 
      fill="none" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 12c-1 0-2 .5-2 2s1 2 2 2 2 .5 2 2-1 2-2 2" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const getMarkdownIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
    <path 
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" 
      fill="#FFFFFF" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <polyline 
      points="14 2 14 8 20 8" 
      fill="none" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M8 13h2.5l1.5 1.5 1.5-1.5H16" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M8 17h8" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const getDefaultFileIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
    <path 
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" 
      fill="#E2E8F0" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <polyline 
      points="14 2 14 8 20 8" 
      fill="none" 
      stroke="#4A5568" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Action button icons
export const getAddFolderIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" fill="#90CDF4" stroke="#2C5282"></path>
    <line x1="12" y1="11" x2="12" y2="17"></line>
    <line x1="9" y1="14" x2="15" y2="14"></line>
  </svg>
);

export const getAddFileIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#C6F6D5" stroke="#276749"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="12" y1="18" x2="12" y2="12"></line>
    <line x1="9" y1="15" x2="15" y2="15"></line>
  </svg>
);

export const getImportIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" fill="#D6BCFA" stroke="#553C9A"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

export const getRefreshIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#C05621" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"></polyline>
    <polyline points="23 20 23 14 17 14"></polyline>
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
  </svg>
);

export const getExpandIcon = (isExpanded: boolean): ReactElement => {
  return isExpanded ? (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}; 