import React, { useEffect } from 'react';
import { useFileExplorer } from '../context/FileExplorerContext';

interface ErrorMessageProps {
  message: string | null;
  autoHideDuration?: number;
}

/**
 * A reusable error message component that automatically dismisses after a specified duration
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  autoHideDuration = 5000 
}) => {
  const { clearErrorMessage } = useFileExplorer();

  // Auto-dismiss the error after the specified duration
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearErrorMessage();
      }, autoHideDuration);
      
      return () => clearTimeout(timer);
    }
  }, [message, autoHideDuration, clearErrorMessage]);

  if (!message) return null;

  return (
    <div className="error-message" role="alert">
      <div className="error-content">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width="24" 
          height="24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="error-icon"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>{message}</span>
        <button 
          onClick={clearErrorMessage} 
          className="close-button" 
          aria-label="Close error message"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="18" 
            height="18" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage; 