# React Pagination Component

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A professional, highly customizable, and accessible pagination component for React applications. Built with TypeScript and modern React practices, this component offers multiple variants and extensive customization options.

## Features

- 🎨 Multiple design variants (Default, Rounded, Buttons, Modern, Minimal, Outlined, Compact, Simple)
- 🌗 Dark mode support
- ♿ Fully accessible (ARIA compliant)
- 📱 Responsive design
- 🎯 TypeScript support
- ⚡ Optimized performance with React.memo
- 🔧 Highly customizable
- 🎭 Easy to style and extend

## Installation

```bash
# npm
npm install react-pagination-component

# yarn
yarn add react-pagination-component

# pnpm
pnpm add react-pagination-component
```

## Quick Start

```tsx
import { Pagination } from 'react-pagination-component';
import { useState } from 'react';

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      variant="default"
      siblingCount={1}
      showFirstLast={true}
    />
  );
}
```

## Available Variants

The component comes with 8 beautiful variants to match your application's design:

- **default**: Classic pagination style with borders
- **rounded**: Circular buttons for a modern look
- **buttons**: Elevated design with shadows
- **modern**: Clean, flat design
- **minimal**: Subtle styling with color accents
- **outlined**: Border-focused design
- **compact**: Space-efficient design
- **simple**: Minimalist prev/next only design

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| currentPage | number | - | Current active page number |
| totalPages | number | - | Total number of pages |
| onPageChange | (page: number) => void | - | Callback function when page changes |
| variant | PaginationVariant | 'default' | Visual style variant |
| siblingCount | number | 1 | Number of page buttons to show on each side |
| showFirstLast | boolean | true | Show/hide first/last page buttons |
| className | string | - | Additional CSS class names |

## Customization

### CSS Variables

You can customize the appearance by overriding these CSS variables:

```css
:root {
  --pagination-bg: #ffffff;
  --pagination-text: #1e293b;
  --pagination-border: #e2e8f0;
  --pagination-hover-bg: #f1f5f9;
  --pagination-active-bg: #3b82f6;
  --pagination-active-text: #ffffff;
  --pagination-disabled-opacity: 0.4;
  --pagination-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --pagination-radius: 0.5rem;
  --pagination-transition: all 0.2s ease;
}
```

### Dark Mode

The component automatically supports dark mode using CSS media queries. You can override the dark mode variables:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --pagination-bg: #1e293b;
    --pagination-text: #f1f5f9;
    --pagination-border: #334155;
    --pagination-hover-bg: #334155;
  }
}
```

## Examples

### Basic Usage

```tsx
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => console.log(`Page changed to ${page}`)}
/>
```

### Custom Variant

```tsx
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={handlePageChange}
  variant="modern"
  siblingCount={2}
  showFirstLast={true}
/>
```

### With Custom Styling

```tsx
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={handlePageChange}
  className="my-custom-pagination"
  variant="outlined"
/>
```

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Vite](https://vitejs.dev/)
- Styled with modern CSS features
- Inspired by Material Design and Tailwind CSS

## Support

If you have any questions or need help integrating the component, please [open an issue](https://github.com/yourusername/react-pagination-component/issues). 