// src/main.ts
// Obtener referencias a los elementos del DOM
// Usamos el operador "as" para aegurar a TypeScript el tipo de elemento HTML
const form = document.getElementById('new-task-form');
const input = document.getElementById('new-task-input');
const taskList = document.getElementById('task-list');
// Array para almacenar nuestras tareas
const tasks = []; // Declaramos que 'tasks' será un array de objetos 'Task'
// Verificamos que los elementos existan (buena práctica para evitar errores en runtime)
if (!form || !input || !taskList) {
    console.error('No se pudieron encontrar todos los elementos del DOM necesarios.');
    // Podrías deshabilitar el formulario o mostrar un mensaje al usuario
}
else {
    // Aquí es donde añadiremos la lógica de nuestra aplicación
    // Manejar el envio de formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario (recargar la pagina)
        const description = input.value.trim(); // Obtener el valor del input y eiiminar espacios en blanco
        if (description === '') {
            return; // No añadir tareas vacías 
        }
        const newTask = {
            id: new Date().getTime().toString(), // Generar un ID único simple
            description: description,
            completed: false,
        };
        tasks.push(newTask); //Añadir la nueva tarea al array
        renderTask(newTask); // Renderizar la nueva tarea del DOM
        input.value = '';
    });
}
// Función para renderizar una tarea en el DOM
function renderTask(task) {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item'); // Añadimos una clase para estilos
    // Si la tarea está completada, añadimos una clase
    if (task.completed) {
        listItem.classList.add('completed');
    }
    // Checkbox para completar/descompletar
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked; // Actualizar el estado de la tarea
        listItem.classList.toggle('completed', task.completed); // Toggle de la clase visual
        // Aquí podrías añadir lógica para persistir el estado (localStorage)
    });
    // Texto de la tarea
    const taskText = document.createElement('span');
    taskText.textContent = task.description;
    // Botón para eliminar la tarea
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', () => {
        // Eliminar del DOM
        taskList.removeChild(listItem);
        // Eliminar del array (filtrando el array para excluir la tarea eliminada)
        const taskIndex = tasks.findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
        }
        // Aquí podrías añadir lógica para persistir los cambios (localStorage)
    });
    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}
export {};
//# sourceMappingURL=main.js.map