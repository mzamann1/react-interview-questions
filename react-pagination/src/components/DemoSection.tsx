import { usePaginationDemo } from "../hooks/usePaginationDemo";
import Pagination from "./pagination";
import VariantDescription from "./VariantDescription";

/**
 * Demo preview section component
 */
const DemoSection: React.FC<ReturnType<typeof usePaginationDemo>> = ({
    currentPage,
    totalPages,
    variant,
    siblingCount,
    showFirstLast,
    handlePageChange,
    exampleItems
}) => (
    <section className="demo-section">
        <h2>Preview</h2>
        <VariantDescription variant={variant} />
        <div className="example-content">
            <div className="example-header">
                <h3>Page {currentPage} of {totalPages}</h3>
            </div>

            <ul className="example-items">
                {exampleItems.map(item => (
                    <li key={item.id} className="example-item">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                    </li>
                ))}
            </ul>

            <div className="pagination-container">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    variant={variant}
                    siblingCount={siblingCount}
                    showFirstLast={showFirstLast}
                />
            </div>
        </div>
    </section>
);

export default DemoSection;