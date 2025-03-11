import { useState, useCallback, useMemo } from 'react';
import { PaginationVariant, UsePaginationDemoReturn } from '../types';

/**
 * Custom hook to manage pagination demo state and logic
 * 
 * @returns Pagination demo state and handlers
 */
export function usePaginationDemo(): UsePaginationDemoReturn {
    // State
    const [currentPage, setCurrentPage] = useState(1);
    const [variant, setVariant] = useState<PaginationVariant>('default');
    const [totalPages, setTotalPages] = useState(10);
    const [siblingCount, setSiblingCount] = useState(1);
    const [showFirstLast, setShowFirstLast] = useState(true);

    // Handlers
    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const handleVariantChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setVariant(e.target.value as PaginationVariant);
    }, []);

    const handleTotalPagesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 1;
        setTotalPages(value);
        if (currentPage > value) {
            setCurrentPage(value);
        }
    }, [currentPage]);

    const handleSiblingCountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSiblingCount(parseInt(e.target.value) || 0);
    }, []);

    const handleShowFirstLastChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setShowFirstLast(e.target.checked);
    }, []);

    // Generate example data for the current page
    const exampleItems = useMemo(() => {
        const startItem = (currentPage - 1) * 5 + 1;
        return Array.from({ length: 5 }, (_, i) => ({
            id: startItem + i,
            title: `Item ${startItem + i}`,
            description: `This is example item ${startItem + i} on page ${currentPage}`
        }));
    }, [currentPage]);

    // Generate code example
    const codeExample = useMemo(() => {
        return `import Pagination from './components/Pagination';

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(${currentPage});
  const totalPages = ${totalPages};

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      variant="${variant}"
      siblingCount={${siblingCount}}
      showFirstLast={${showFirstLast}}
    />
  );
}`;
    }, [currentPage, totalPages, variant, siblingCount, showFirstLast]);

    return {
        currentPage,
        variant,
        totalPages,
        siblingCount,
        showFirstLast,
        handlePageChange,
        handleVariantChange,
        handleTotalPagesChange,
        handleSiblingCountChange,
        handleShowFirstLastChange,
        exampleItems,
        codeExample
    };
}