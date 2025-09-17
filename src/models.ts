/**
 * Define la estructura de un objeto de Tarea.
 * Al exportar la interfaz, podemos importarla y usarla en otros archivos.
 */
export interface Task {
    id: string;
    description: string;
    completed: boolean;
}

/**
 * Define los tipos de filtro posibles para una mejor legibilidad del código.
 * Al exportar el enum, podemos acceder a sus valores desde otros módulos.
 */
export enum FilterType {
    All,
    Completed,
    Pending
}
