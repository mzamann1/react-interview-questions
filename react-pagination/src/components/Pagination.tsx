import React from 'react';
import '../styles/Pagination.css';
import { PaginationProps, PageItem } from '../types/index';
import { usePagination } from '../hooks/usePagination';

/**
 * PageButton component for rendering individual page buttons
 */
const PageButton: React.FC<{
    page: number;
    isActive: boolean;
    onClick: () => void;
    ariaLabel: string;
}> = ({ page, isActive, onClick, ariaLabel }) => (
    <button
        className={`pagination-button page-number ${isActive ? 'active' : ''}`}
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
        aria-label={ariaLabel}
        type="button"
    >
        {page}
    </button>
);

/**
 * NavigationButton component for rendering navigation buttons (prev, next, first, last)
 */
const NavigationButton: React.FC<{
    onClick: () => void;
    disabled: boolean;
    ariaLabel: string;
    className: string;
    icon: string;
}> = ({ onClick, disabled, ariaLabel, className, icon }) => (
    <button
        className={`pagination-button ${className}`}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        type="button"
    >
        <span className="pagination-icon" aria-hidden="true">{icon}</span>
    </button>
);

/**
 * A professional pagination component with multiple variants and customization options.
 */
const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    variant = 'default',
    siblingCount = 1,
    showFirstLast = true,
    className = '',
}) => {
    // Use our custom hook to handle pagination logic
    const { pageItems, handlePageChange, isFirstPage, isLastPage } = usePagination(
        currentPage,
        totalPages,
        onPageChange,
        variant,
        siblingCount
    );

    // Don't render pagination for single page
    if (totalPages <= 1) return null;

    // Prepare class names
    const paginationClasses = ['pagination', variant];
    if (className) paginationClasses.push(className);

    // Render page item (number or ellipsis)
    const renderPageItem = (item: PageItem, index: number) => {
        if (item === 'ellipsis') {
            return (
                <li key={`ellipsis-${index}`} className="pagination-item">
                    <span className="pagination-ellipsis" aria-hidden="true">…</span>
                </li>
            );
        }

        return (
            <li key={`page-${item}`} className="pagination-item">
                <PageButton
                    page={item}
                    isActive={currentPage === item}
                    onClick={() => handlePageChange(item)}
                    ariaLabel={`Page ${item}`}
                />
            </li>
        );
    };

    return (
        <nav className={paginationClasses.join(' ')} aria-label="Pagination">
            <ul className="pagination-list">
                {/* First page button */}
                {showFirstLast && variant !== 'simple' && (
                    <li className="pagination-item">
                        <NavigationButton
                            onClick={() => handlePageChange(1)}
                            disabled={isFirstPage}
                            ariaLabel="Go to first page"
                            className="first"
                            icon="«"
                        />
                    </li>
                )}

                {/* Previous page button */}
                <li className="pagination-item">
                    <NavigationButton
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={isFirstPage}
                        ariaLabel="Go to previous page"
                        className="prev"
                        icon="‹"
                    />
                </li>

                {/* Page numbers */}
                {variant !== 'simple' && pageItems.map(renderPageItem)}

                {/* Current page indicator for simple variant */}
                {variant === 'simple' && (
                    <li className="pagination-item">
                        <span className="pagination-text">
                            Page {currentPage} of {totalPages}
                        </span>
                    </li>
                )}

                {/* Next page button */}
                <li className="pagination-item">
                    <NavigationButton
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={isLastPage}
                        ariaLabel="Go to next page"
                        className="next"
                        icon="›"
                    />
                </li>

                {/* Last page button */}
                {showFirstLast && variant !== 'simple' && (
                    <li className="pagination-item">
                        <NavigationButton
                            onClick={() => handlePageChange(totalPages)}
                            disabled={isLastPage}
                            ariaLabel="Go to last page"
                            className="last"
                            icon="»"
                        />
                    </li>
                )}
            </ul>
        </nav>
    );
};

// Use memo to prevent unnecessary re-renders
export default React.memo(Pagination);