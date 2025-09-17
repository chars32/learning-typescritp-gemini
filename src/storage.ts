import type { Task } from './models'; // Importamos la definición de Task

/**
 * Guarda el array de tareas actual en el Local Storage.
 * @param tasks - El array de tareas que se va a guardar.
 */
export function saveTasks(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Carga las tareas desde el Local Storage.
 * @returns Un array de tareas o un array vacío si no hay nada guardado.
 */
export function loadTasks(): Task[] {
    const tasksJson = localStorage.getItem('tasks');
    return tasksJson ? JSON.parse(tasksJson) : [];
}
