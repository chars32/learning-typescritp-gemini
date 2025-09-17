import { FilterType } from './models'; // Importamos nuestros tipos
import { saveTasks, loadTasks } from './storage'; // Importamos las funciones de almacenamiento
// El estado de la aplicación vive aquí.
let tasks = loadTasks(); // Se inicializa desde el localStorage
let currentFilter = FilterType.All;
// Funciones para "leer" el estado desde fuera de este módulo.
export const getTasks = () => tasks;
export const getCurrentFilter = () => currentFilter;
// Funciones para "modificar" el estado (lógica de negocio).
export function addTask(description) {
    const newTask = {
        id: crypto.randomUUID(),
        description,
        completed: false
    };
    tasks.push(newTask);
    saveTasks(tasks); // Guardamos el nuevo estado
}
export function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
}
export function toggleTaskCompletion(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
    }
}
export function updateTaskDescription(id, newDescription) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.description = newDescription.trim();
        saveTasks(tasks);
    }
}
export function setFilter(filter) {
    currentFilter = filter;
}
//# sourceMappingURL=state.js.map