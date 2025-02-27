import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scrollArea";
import { AddTodo } from './AddTodo';
import { TodoItem } from './TodoItem';
import todoData from '@/todo.json';

interface Priority {
  priorityLevel?: number;
  name: string;
  description: string;
  tasks?: string[];
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: number;
  priorityName: string;
  phase: string;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const baseTime = Date.now();
    let currentId = baseTime;

    // Phase 1 todos
    const phase1Todos = todoData.implementationPlan.phase1.priorities.flatMap(
      (priority: Priority, priorityIndex: number) => 
        priority.tasks?.map((task: string) => ({
          id: currentId++,
          text: task,
          completed: false,
          priority: priority.priorityLevel || priorityIndex + 1,
          priorityName: priority.name,
          phase: "Phase 1: MVP"
        })) || []
    );

    // Technical Foundation todos
    const technicalTodos = todoData.implementationPlan.technicalFoundation.priorities.map(
      (priority: Priority, index: number) => ({
        id: currentId++,
        text: priority.description,
        completed: false,
        priority: index + 1,
        priorityName: priority.name,
        phase: "Technical Foundation"
      })
    );

    // Risk Mitigation todos
    const riskTodos = todoData.implementationPlan.riskMitigation.priorities.map(
      (priority: Priority, index: number) => ({
        id: currentId++,
        text: priority.description,
        completed: false,
        priority: index + 1,
        priorityName: priority.name,
        phase: "Risk Mitigation"
      })
    );

    // Phase 2 todos
    const phase2Todos = todoData.implementationPlan.phase2.sequence.map(
      (task: string, index: number) => ({
        id: currentId++,
        text: task,
        completed: false,
        priority: index + 1,
        priorityName: "Enhancement",
        phase: "Phase 2: Enhanced Features"
      })
    );

    setTodos([...phase1Todos, ...technicalTodos, ...riskTodos, ...phase2Todos]);
  }, []);

  const addTodo = (text: string) => {
    const maxId = Math.max(...todos.map(todo => todo.id), 0);
    setTodos([...todos, { 
      id: maxId + 1, 
      text, 
      completed: false,
      priority: 1,
      priorityName: "Custom Task",
      phase: "Phase 1: MVP"
    }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Group todos by phase and priority
  const todosByPhase = todos.reduce((acc, todo) => {
    if (!acc[todo.phase]) {
      acc[todo.phase] = {};
    }
    if (!acc[todo.phase][todo.priority]) {
      acc[todo.phase][todo.priority] = [];
    }
    acc[todo.phase][todo.priority].push(todo);
    return acc;
  }, {} as Record<string, Record<number, Todo[]>>);

  return (
    <div className="container mx-auto p-4 grid gap-6">
      <h1 className="text-3xl font-bold text-center mb-6">{todoData.projectName}</h1>
      
      {Object.entries(todosByPhase).map(([phase, priorities]) => (
        <Card key={phase} className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{phase}</CardTitle>
            {phase === "Phase 1: MVP" && (
              <CardDescription>Minimum Viable Product</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {phase === "Phase 1: MVP" && <AddTodo onAdd={addTodo} />}
            <ScrollArea className="h-[300px] mt-4">
              {Object.entries(priorities)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([priority, priorityTodos]) => (
                  <div key={priority} className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                      {priorityTodos[0]?.priorityName}
                    </h3>
                    {priorityTodos.map(todo => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                      />
                    ))}
                  </div>
                ))}
            </ScrollArea>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 