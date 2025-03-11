# React File Explorer

A feature-rich file explorer component built with React and TypeScript. This component provides a complete file system interface with CRUD operations, drag-and-drop functionality, and JSON import/export capabilities.

## Features

- 📁 Create, read, update, and delete files and folders
- 🔄 Rename files and folders with validation
- 🌲 Nested folder structure with expandable/collapsible folders
- 🎨 Professional and colorful file type icons
- 📤 Import file structures from JSON
- 🔍 Preview file contents
- ⚠️ Error handling with user-friendly messages
- ♿ Accessibility features for keyboard navigation
- 🎯 Auto-focus on newly created items
- 🚫 Duplicate name prevention

## Installation

```bash
# Clone the repository
git clone https://github.com/mzamann1/react-interview-questions.git

# Navigate to the project directory
cd file-explorer-react

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

```jsx
import React from 'react';
import FileExplorer from './components/FileExplorer';

// Optional initial file structure
const initialStructure = [
  {
    name: 'Project Files',
    type: 'folder',
    children: [
      {
        name: 'src',
        type: 'folder',
        children: [
          { name: 'index.js', type: 'file', content: 'console.log("Hello World");' }
        ]
      },
      { name: 'README.md', type: 'file', content: '# Project\nThis is a sample project.' }
    ]
  }
];

function App() {
  return (
    <div className="App">
      <h1>React File Explorer</h1>
      <FileExplorer initialStructure={initialStructure} />
    </div>
  );
}

export default App;
```

## Project Structure

```
src/
├── components/         # React components
│   ├── Button.tsx      # Reusable button component
│   ├── ErrorMessage.tsx # Error message component
│   ├── FileExplorer.tsx # Main file explorer component
│   └── FileSystemItem.tsx # Individual file/folder component
├── context/
│   └── FileExplorerContext.tsx # Context provider for file system state
├── hooks/
│   ├── useFileSystem.ts # Custom hook for file system operations
│   └── useFileSystemItem.ts # Custom hook for file system item operations
├── styles/
│   ├── Button.css      # Button component styles
│   ├── ErrorMessage.css # Error message component styles
│   └── FileExplorer.css # File explorer component styles
├── types/
│   └── FileExplorerTypes.ts # TypeScript type definitions
├── utils/
│   └── fileIcons.tsx   # File icon utilities
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Technologies Used

- React 18
- TypeScript
- Vite
- CSS3

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
