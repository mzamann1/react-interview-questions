import React from 'react';
import { usePaginationDemo } from '../hooks/usePaginationDemo';

/**
 * Configuration section component with improved UI
 */
const ConfigSection: React.FC<ReturnType<typeof usePaginationDemo>> = ({
    variant,
    totalPages,
    siblingCount,
    showFirstLast,
    handleVariantChange,
    handleTotalPagesChange,
    handleSiblingCountChange,
    handleShowFirstLastChange
}) => (
    <section className="config-section">
        <h2>Configuration</h2>
        <div className="config-grid">
            <div className="config-item">
                <label htmlFor="variant">Variant</label>
                <div className="select-wrapper">
                    <select
                        id="variant"
                        value={variant}
                        onChange={handleVariantChange}
                    >
                        <option value="default">Default</option>
                        <option value="rounded">Rounded</option>
                        <option value="buttons">Buttons</option>
                        <option value="modern">Modern</option>
                        <option value="minimal">Minimal</option>
                        <option value="outlined">Outlined</option>
                        <option value="compact">Compact</option>
                        <option value="simple">Simple</option>
                    </select>
                </div>
            </div>

            <div className="config-item">
                <label htmlFor="totalPages">Total Pages</label>
                <input
                    id="totalPages"
                    type="number"
                    min="1"
                    max="100"
                    value={totalPages}
                    onChange={handleTotalPagesChange}
                />
            </div>

            <div className="config-item">
                <label htmlFor="siblingCount">Sibling Count</label>
                <input
                    id="siblingCount"
                    type="number"
                    min="0"
                    max="3"
                    value={siblingCount}
                    onChange={handleSiblingCountChange}
                />
            </div>

            <div className="config-item checkbox">
                <label>
                    <input
                        type="checkbox"
                        checked={showFirstLast}
                        onChange={handleShowFirstLastChange}
                    />
                    Show First/Last Buttons
                </label>
            </div>
        </div>
    </section>
);

export default ConfigSection;