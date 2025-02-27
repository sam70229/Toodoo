# Project Task Management

A modern task management application built with React and shadcn/ui to track multi-phase project development.

## Features

- **Multi-Phase Project Management**
  - Organize tasks across different project phases
  - Track progress for each phase
  - Separate views for different project stages

- **Priority-Based Organization**
  - Tasks grouped by priority levels
  - Clear visual hierarchy
  - Easy task management
  - Priority-based filtering

- **Task Management**
  - Add new tasks to active phase
  - Mark tasks as complete/incomplete
  - Delete tasks when needed
  - Scrollable task lists for better organization
  - Task categorization by priority

## Tech Stack

- React
- TypeScript
- shadcn/ui components
- Tailwind CSS

## Project Structure

```
src/
├── components/
│   ├── ui/          # shadcn/ui components
│   ├── AddTodo.tsx  # New task input component
│   ├── TodoItem.tsx # Individual task component
│   └── TodoList.tsx # Main task management component
├── todo.json        # Project configuration
└── App.tsx         # Root component
```

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

MIT License
