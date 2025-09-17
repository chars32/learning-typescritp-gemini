/**
 * EL ORQUESTADOR
 * Su única responsabilidad es conectar los eventos del usuario 
 * con la lógica de la aplicación.
 */

// Importamos los tipos y enums que necesitamos.
import { FilterType } from './models';

// Importamos las funciones que modifican el estado.
import { addTask, setFilter } from './state';

// Importamos los elementos del DOM y la función para renderizar.
import { taskForm, taskInput, renderTasks } from './ui';

// --- CONFIGURACIÓN DE EVENT LISTENERS ---

// 1. Evento para agregar una nueva tarea.
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newDescription = taskInput.value.trim();

    if (newDescription) {
        addTask(newDescription); // Llama a la función del módulo de estado
        taskInput.value = '';
        renderTasks(); // Llama a la función del módulo de UI para actualizar la vista
    }
});

// 2. Eventos para los botones de filtro.
document.getElementById('filter-all')?.addEventListener('click', () => {
    setFilter(FilterType.All);
    renderTasks();
});

document.getElementById('filter-completed')?.addEventListener('click', () => {
    setFilter(FilterType.Completed);
    renderTasks();
});

document.getElementById('filter-pending')?.addEventListener('click', () => {
    setFilter(FilterType.Pending);
    renderTasks();
});


// --- INICIALIZACIÓN ---

// Renderiza las tareas por primera vez cuando la página carga.
renderTasks();
