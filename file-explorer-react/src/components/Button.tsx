import React, { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'icon';
  size?: 'small' | 'medium' | 'large';
  icon?: ReactNode;
  isLoading?: boolean;
  showTextWithIcon?: boolean;
}

/**
 * A reusable button component with consistent styling and behavior
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  isLoading = false,
  className = '',
  disabled,
  showTextWithIcon = true,
  ...rest
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const loadingClass = isLoading ? 'btn-loading' : '';
  const disabledClass = disabled ? 'btn-disabled' : '';
  const iconOnlyClass = icon && !showTextWithIcon ? 'btn-icon-only' : '';
  const hasIconClass = icon ? 'has-icon' : '';
  
  const combinedClassName = [
    baseClass,
    variantClass,
    sizeClass,
    loadingClass,
    disabledClass,
    iconOnlyClass,
    hasIconClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={combinedClassName}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && (
        <span className="btn-spinner" aria-hidden="true">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="16" 
            height="16" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v2"></path>
          </svg>
        </span>
      )}
      {icon && <span className="btn-icon">{icon}</span>}
      {(showTextWithIcon || !icon) && <span className="btn-text">{children}</span>}
    </button>
  );
};

export default Button; 