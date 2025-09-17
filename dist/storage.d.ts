import type { Task } from './models';
/**
 * Guarda el array de tareas actual en el Local Storage.
 * @param tasks - El array de tareas que se va a guardar.
 */
export declare function saveTasks(tasks: Task[]): void;
/**
 * Carga las tareas desde el Local Storage.
 * @returns Un array de tareas o un array vacío si no hay nada guardado.
 */
export declare function loadTasks(): Task[];
//# sourceMappingURL=storage.d.ts.map