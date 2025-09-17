import { getTasks } from './state';

const MAX_LENGTH = 100; // Longitud máxima permitida para una tarea

/**
 * Valida la descripción de una tarea.
 * @param description - El texto de la tarea a validar.
 * @returns Un objeto que indica si es válido y un mensaje de error si no lo es.
 */
export function validateDescription(description: string): { isValid: boolean; message?: string } {
    const trimmedDescription = description.trim();

    if (trimmedDescription.length === 0) {
        return { isValid: false, message: 'La descripción de la tarea no puede estar vacía.' };
    }

    if (trimmedDescription.length > MAX_LENGTH) {
        return { isValid: false, message: `La descripción no puede exceder los ${MAX_LENGTH} caracteres.` };
    }

    // Comprobamos si ya existe una tarea con la misma descripción (insensible a mayúsculas/minúsculas)
    const tasks = getTasks();
    if (tasks.some(task => task.description.toLowerCase() === trimmedDescription.toLowerCase())) {
        return { isValid: false, message: 'Esa tarea ya existe en la lista.' };
    }

    return { isValid: true };
}
