import { type Task, FilterType } from './models'; // Importamos nuestros tipos
import { saveTasks, loadTasks } from './storage'; // Importamos las funciones de almacenamiento
import { validateDescription } from './validation'; // 1. Importamos la función

// El estado de la aplicación vive aquí.
let tasks: Task[] = loadTasks(); // Se inicializa desde el localStorage
let currentFilter: FilterType = FilterType.All;

// Funciones para "leer" el estado desde fuera de este módulo.
export const getTasks = () => tasks;
export const getCurrentFilter = () => currentFilter;

// Funciones para "modificar" el estado (lógica de negocio).

/**
 * 2. Modificamos addTask para que valide y devuelva un posible error.
 * @param description - La descripción de la nueva tarea.
 * @returns Un mensaje de error si la validación falla, de lo contrario null.
 */
export function addTask(description: string): string | null {
    const validation = validateDescription(description);
    if (!validation.isValid) {
        return validation.message || 'Error de validación desconocido.';
    }

    const newTask: Task = {
        id: crypto.randomUUID(),
        description: description.trim(),
        completed: false
    };
    tasks.push(newTask);
    saveTasks(tasks);
    return null; // Éxito, no hay error
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

/**
 * 3. Modificamos updateTaskDescription de la misma manera.
 * @param id - El ID de la tarea a actualizar.
 * @param newDescription - La nueva descripción.
 * @returns Un mensaje de error o null.
 */
export function updateTaskDescription(id: string, newDescription: string): string | null {
    const validation = validateDescription(newDescription);
    if (!validation.isValid) {
        return validation.message || 'Error de validación desconocido.';
    }

    const task = tasks.find(task => task.id === id);
    if (task) {
        task.description = newDescription.trim();
        saveTasks(tasks);
    }
    return null; // Éxito
}

export function setFilter(filter: FilterType): void {
    currentFilter = filter;
}
