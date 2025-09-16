// src/main.ts
// Obtener referencias a los elementos del DOM
// Usamos el operador "as" para aegurar a TypeScript el tipo de elemento HTML
const form = document.getElementById('new-task-form');
const input = document.getElementById('new-task-input');
const taskList = document.getElementById('task-list');
// Verificamos que los elementos existan (buena práctica para evitar errores en runtime)
if (!form || !input || !taskList) {
    console.error('No se pudieron encontrar todos los elementos del DOM necesarios.');
    // Podrías deshabilitar el formulario o mostrar un mensaje al usuario
}
else {
    // Aquí es donde añadiremos la lógica de nuestra aplicación
    console.log('Todos los elementos del DOM han sido cargados correctamente.');
}
export {};
//# sourceMappingURL=main.js.map