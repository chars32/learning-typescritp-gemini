import { FilterType } from './models';
import { getTasks, getCurrentFilter, toggleTaskCompletion, updateTaskDescription, deleteTask, setFilter } from './state';
// Referencias a elementos del DOM que necesitamos manipular.
export const taskForm = document.getElementById('new-task-form');
export const taskInput = document.getElementById('new-task-input');
const taskList = document.getElementById('task-list');
const filterAllBtn = document.getElementById('filter-all');
const filterCompletedBtn = document.getElementById('filter-completed');
const filterPendingBtn = document.getElementById('filter-pending');
/**
 * Renderiza (dibuja) la lista de tareas en el DOM.
 */
export function renderTasks() {
    taskList.innerHTML = ''; // Limpiamos la lista
    const tasks = getTasks();
    const currentFilter = getCurrentFilter();
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === FilterType.Completed)
            return task.completed;
        if (currentFilter === FilterType.Pending)
            return !task.completed;
        return true;
    });
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            toggleTaskCompletion(task.id);
            renderTasks(); // Re-renderizamos para reflejar el cambio
        });
        const textSpan = document.createElement('span');
        textSpan.textContent = task.description;
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'edit-btn';
        editButton.addEventListener('click', () => {
            const newDescription = prompt('Edita tu tarea:', task.description);
            if (newDescription !== null && newDescription.trim() !== '') {
                updateTaskDescription(task.id, newDescription);
                renderTasks();
            }
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            deleteTask(task.id);
            renderTasks();
        });
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
    updateFilterButtons();
}
function updateFilterButtons() {
    const currentFilter = getCurrentFilter();
    filterAllBtn.classList.toggle('active', currentFilter === FilterType.All);
    filterCompletedBtn.classList.toggle('active', currentFilter === FilterType.Completed);
    filterPendingBtn.classList.toggle('active', currentFilter === FilterType.Pending);
}
//# sourceMappingURL=ui.js.map