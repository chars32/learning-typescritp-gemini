import { type Task, FilterType } from './models'; // Importamos nuestros tipos
import { saveTasks, loadTasks } from './storage'; // Importamos las funciones de almacenamiento

// El estado de la aplicación vive aquí.
let tasks: Task[] = loadTasks(); // Se inicializa desde el localStorage
let currentFilter: FilterType = FilterType.All;

// Funciones para "leer" el estado desde fuera de este módulo.
export const getTasks = () => tasks;
export const getCurrentFilter = () => currentFilter;

// Funciones para "modificar" el estado (lógica de negocio).

export function addTask(description: string): void {
    const newTask: Task = {
        id: crypto.randomUUID(),
        description,
        completed: false
    };
    tasks.push(newTask);
    saveTasks(tasks); // Guardamos el nuevo estado
}

export function deleteTask(id: string): void {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
}

export function toggleTaskCompletion(id: string): void {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
    }
}

export function updateTaskDescription(id: string, newDescription: string): void {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.description = newDescription.trim();
        saveTasks(tasks);
    }
}

export function setFilter(filter: FilterType): void {
    currentFilter = filter;
}
