// src/main.ts

// Obtener referencias a los elementos del DOM
// Usamos el operador "as" para aegurar a TypeScript el tipo de elemento HTML
const form = document.getElementById('new-task-form') as HTMLFormElement;
const input = document.getElementById('new-task-input') as HTMLInputElement;
const taskList = document.getElementById('task-list') as HTMLUListElement;

// Definimos una interfaz para nuestras tareas
interface Task {
    id: string; // Un identificador único para cada tarea
    description: string;
    completed: boolean;
}

// Array para almacenar nuestras tareas
const tasks: Task[] = []; // Declaramos que 'tasks' será un array de objetos 'Task'

// Verificamos que los elementos existan (buena práctica para evitar errores en runtime)
if (!form || !input || !taskList) {
    console.error('No se pudieron encontrar todos los elementos del DOM necesarios.');
    // Podrías deshabilitar el formulario o mostrar un mensaje al usuario
} else {
    // Aquí es donde añadiremos la lógica de nuestra aplicación
    
    // Manejar el envio de formulario
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault() // Prevenir el comportamiento por defecto del formulario (recargar la pagina)

        const description = input.value.trim(); // Obtener el valor del input y eiiminar espacios en blanco
        
        if (description === '') {
            return; // No añadir tareas vacías 
        }

        const newTask: Task = {
            id: new Date().getTime().toString(), // Generar un ID único simple
            description: description,
            completed: false,
        };

        tasks.push(newTask); //Añadir la nueva tarea al array
        renderTask(newTask); // Renderizar la nueva tarea del DOM
        input.value = '';
    });
}
