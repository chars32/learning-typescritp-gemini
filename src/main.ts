// ============================================================================
// 1. INTERFACES Y TIPOS
// ============================================================================

/**
 * Define la estructura de un objeto de Tarea.
 */
interface Task {
    id: string;
    description: string;
    completed: boolean;
}

/**
 * Define los tipos de filtro posibles para una mejor legibilidad del código.
 */
enum FilterType {
    All,
    Completed,
    Pending
}

// ============================================================================
// 2. ESTADO DE LA APLICACIÓN
// ============================================================================

// El array que contendrá todas nuestras tareas. Se inicializa desde localStorage.
let tasks: Task[] = loadTasks();

// Variable para mantener el estado del filtro actual, por defecto muestra todas.
let currentFilter: FilterType = FilterType.All;

// ============================================================================
// 3. REFERENCIAS A ELEMENTOS DEL DOM
// ============================================================================

// Referencia al formulario para agregar nuevas tareas.
const taskForm = document.getElementById('new-task-form') as HTMLFormElement;
// Referencia al input donde se escribe la nueva tarea.
const taskInput = document.getElementById('new-task-input') as HTMLInputElement;
// Referencia a la lista <ul> donde se mostrarán las tareas.
const taskList = document.getElementById('task-list') as HTMLUListElement;

// Referencias a los botones de filtro.
const filterAllBtn = document.getElementById('filter-all') as HTMLButtonElement;
const filterCompletedBtn = document.getElementById('filter-completed') as HTMLButtonElement;
const filterPendingBtn = document.getElementById('filter-pending') as HTMLButtonElement;

// ============================================================================
// 4. FUNCIONES PRINCIPALES
// ============================================================================

/**
 * Renderiza (dibuja) la lista de tareas en el DOM.
 * Aplica el filtro actual antes de mostrar las tareas.
 */
function renderTasks(): void {
    // Limpia la lista actual para evitar duplicados al re-renderizar.
    taskList.innerHTML = '';

    // Filtra el array de tareas basándose en el `currentFilter`.
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === FilterType.Completed) {
            return task.completed;
        }
        if (currentFilter === FilterType.Pending) {
            return !task.completed;
        }
        // Si el filtro es 'All', no se filtra nada y se retorna true para todos.
        return true;
    });

    // Itera sobre el array ya filtrado para crear los elementos <li>.
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        // Checkbox para marcar/desmarcar la tarea.
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));

        // Span para el texto de la tarea.
        const textSpan = document.createElement('span');
        textSpan.textContent = task.description;

        // Botón para editar la tarea.
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'edit-btn';
        editButton.addEventListener('click', () => {
            const newDescription = prompt('Edita tu tarea:', task.description);
            if (newDescription !== null && newDescription.trim() !== '') {
                updateTaskDescription(task.id, newDescription);
            }
        });

        // Botón para eliminar la tarea.
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        // Añade todos los elementos al <li>.
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        // Añade el <li> a la lista <ul>.
        taskList.appendChild(li);
    });

    // Actualiza el estilo visual de los botones de filtro.
    updateFilterButtons();
}

/**
 * Agrega una nueva tarea a la lista.
 * @param description - El texto de la nueva tarea.
 */
function addTask(description: string): void {
    const newTask: Task = {
        id: crypto.randomUUID(), // Genera un ID único.
        description: description,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
}

/**
 * Elimina una tarea de la lista por su ID.
 * @param id - El ID de la tarea a eliminar.
 */
function deleteTask(id: string): void {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

/**
 * Cambia el estado 'completed' de una tarea.
 * @param id - El ID de la tarea a modificar.
 */
function toggleTaskCompletion(id: string): void {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

/**
 * Actualiza la descripción de una tarea.
 * @param id - El ID de la tarea a actualizar.
 * @param newDescription - El nuevo texto para la descripción.
 */
function updateTaskDescription(id: string, newDescription: string): void {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.description = newDescription.trim();
        saveTasks();
        renderTasks();
    }
}

/**
 * Actualiza la clase 'active' en los botones de filtro.
 */
function updateFilterButtons(): void {
    filterAllBtn.classList.toggle('active', currentFilter === FilterType.All);
    filterCompletedBtn.classList.toggle('active', currentFilter === FilterType.Completed);
    filterPendingBtn.classList.toggle('active', currentFilter === FilterType.Pending);
}


// ============================================================================
// 5. LOCALSTORAGE (PERSISTENCIA DE DATOS)
// ============================================================================

/**
 * Guarda el array de tareas actual en el Local Storage.
 */
function saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Carga las tareas desde el Local Storage.
 * @returns Un array de tareas o un array vacío si no hay nada guardado.
 */
function loadTasks(): Task[] {
    const tasksJson = localStorage.getItem('tasks');
    return tasksJson ? JSON.parse(tasksJson) : [];
}

// ============================================================================
// 6. EVENT LISTENERS
// ============================================================================

// Listener para el envío del formulario.
taskForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que la página se recargue.
    const newDescription = taskInput.value.trim();

    if (newDescription) {
        addTask(newDescription);
        taskInput.value = ''; // Limpia el input después de agregar.
    }
});

// Listeners para los botones de filtro.
filterAllBtn.addEventListener('click', () => {
    currentFilter = FilterType.All;
    renderTasks();
});

filterCompletedBtn.addEventListener('click', () => {
    currentFilter = FilterType.Completed;
    renderTasks();
});

filterPendingBtn.addEventListener('click', () => {
    currentFilter = FilterType.Pending;
    renderTasks();
});

// ============================================================================
// 7. INICIALIZACIÓN
// ============================================================================

// Renderiza las tareas por primera vez cuando el script se carga.
renderTasks();