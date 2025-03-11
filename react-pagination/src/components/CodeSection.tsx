/**
 * Code example section component
 */
const CodeSection: React.FC<{ codeExample: string }> = ({ codeExample }) => (
    <section className="code-section">
        <h2>Usage</h2>
        <div className="code-block">
            <pre>{codeExample}</pre>
        </div>
    </section>
);

export default CodeSection;