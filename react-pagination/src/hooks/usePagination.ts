import { useMemo, useCallback } from 'react';
import { PageItem, PaginationVariant, UsePaginationReturn } from '../types/index';

/**
 * Custom hook to handle pagination logic
 * 
 * @param currentPage - Current active page number
 * @param totalPages - Total number of pages
 * @param onPageChange - Callback function when page changes
 * @param variant - Visual style variant
 * @param siblingCount - Number of page buttons to show on each side of current page
 * @returns Pagination state and handlers
 */
export function usePagination(
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void,
    variant: PaginationVariant,
    siblingCount: number = 1
): UsePaginationReturn {
    // Handle page navigation with boundary checks
    const handlePageChange = useCallback((page: number) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    }, [onPageChange, totalPages]);

    // Calculate page items (numbers and ellipsis)
    const pageItems = useMemo((): PageItem[] => {
        if (totalPages <= 1 || variant === 'simple') return [];

        // Show all pages if there aren't too many
        if (totalPages <= 5 + siblingCount * 2) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

        // Different patterns based on current page position
        if (!shouldShowLeftDots && shouldShowRightDots) {
            // Near the start
            const leftItemCount = 3 + 2 * siblingCount;
            return [
                ...Array.from({ length: leftItemCount }, (_, i) => i + 1),
                'ellipsis',
                totalPages,
            ];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            // Near the end
            const rightItemCount = 3 + 2 * siblingCount;
            return [
                1,
                'ellipsis',
                ...Array.from(
                    { length: rightItemCount },
                    (_, i) => totalPages - rightItemCount + i + 1
                ),
            ];
        }

        // In the middle
        return [
            1,
            'ellipsis',
            ...Array.from(
                { length: rightSiblingIndex - leftSiblingIndex + 1 },
                (_, i) => leftSiblingIndex + i
            ),
            'ellipsis',
            totalPages,
        ];
    }, [currentPage, totalPages, siblingCount, variant]);

    // Determine if we're on the first or last page
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return {
        pageItems,
        handlePageChange,
        isFirstPage,
        isLastPage
    };
}