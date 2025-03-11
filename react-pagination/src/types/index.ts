/**
 * Pagination component props interface
 */
interface PaginationProps {
    /** Current active page number */
    currentPage: number;
    /** Total number of pages */
    totalPages: number;
    /** Callback function when page changes */
    onPageChange: (page: number) => void;
    /** Visual style variant */
    variant?: PaginationVariant;
    /** Number of page buttons to show on each side of current page */
    siblingCount?: number;
    /** Whether to show first/last page buttons */
    showFirstLast?: boolean;
    /** Additional CSS class names */
    className?: string;
}

type PaginationVariant =
    | 'default'    // Classic style
    | 'compact'    // Smaller version
    | 'simple'     // Minimal version
    | 'rounded'    // Rounded style
    | 'buttons'    // Button-like style
    | 'modern'     // Modern flat style
    | 'minimal'    // Super minimal style
    | 'outlined';  // Outlined style

/**
 * Page number type - can be a number or a string (for ellipsis)
 */
type PageItem = number | 'ellipsis';

/**
 * Return type for the usePagination hook
 */
interface UsePaginationReturn {
    /** Array of page numbers and ellipsis markers */
    pageItems: PageItem[];
    /** Function to handle page changes */
    handlePageChange: (page: number) => void;
    /** Whether the current page is the first page */
    isFirstPage: boolean;
    /** Whether the current page is the last page */
    isLastPage: boolean;
}


/**
 * Interface for pagination demo state
 */
interface PaginationDemoState {
    currentPage: number;
    variant: 'default' | 'compact' | 'simple';
    totalPages: number;
    siblingCount: number;
    showFirstLast: boolean;
}

/**
 * Interface for pagination demo handlers
 */
interface PaginationDemoHandlers {
    handlePageChange: (page: number) => void;
    handleVariantChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleTotalPagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSiblingCountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleShowFirstLastChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Interface for example items
 */
interface ExampleItem {
    id: number;
    title: string;
    description: string;
}

/**
 * Return type for the usePaginationDemo hook
 */
interface UsePaginationDemoReturn extends PaginationDemoState, PaginationDemoHandlers {
    exampleItems: ExampleItem[];
    codeExample: string;
}



export type { PaginationProps, PaginationDemoState, PaginationDemoHandlers, UsePaginationDemoReturn, ExampleItem, PaginationVariant, PageItem, UsePaginationReturn };