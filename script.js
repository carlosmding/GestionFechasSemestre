/*
* Este archivo Selecciona los elementos del DOM correspondientes al botón "Guardar",
* el botón "Consultar" y el div donde se mostrarán las fechas consultadas.
*Agrega un event listener al botón "Guardar" que envía una solicitud POST al backend para
* * guardar las fechas ingresadas en el formulario.
*Agrega un event listener al botón "Consultar" que envía una solicitud GET al backend para
* obtener las fechas almacenadas en la base de datos y muestra los resultados en el div
* correspondiente.
 Utiliza la API Fetch para enviar y recibir datos del backend en formato JSON.
* */

const guardarBtn = document.getElementById('guardar');
const consultarBtn = document.getElementById('consultar');
const fechasDiv = document.getElementById('fechas');

guardarBtn.addEventListener('click', async () => 
{
    const semestre = {
        fechaInicio: document.getElementById('fechaInicio').value,
        fechaFinal: document.getElementById('fechaFinal').value,
        fechaEvaluacion: document.getElementById('fechaEvaluacion').value,
        fechaExamenes: document.getElementById('fechaExamenes').value,
        fechaHabilitaciones: document.getElementById('fechaHabilitaciones').value
    };
    await fetch('/semestres', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(semestre)
    });
    alert('Fechas guardadas correctamente');
});

consultarBtn.addEventListener('click', async () => {
    const response = await fetch('/semestres');
    const fechas = await response.json();
    fechasDiv.innerHTML = '';
    if (fechas.length === 0) 
    {
        fechasDiv.innerHTML = 'No se encontraron fechas';
        return;
    }
    const ul = document.createElement('ul');
    for (const fecha of fechas) {
        const li = document.createElement('li');
        li.textContent = `${fecha.tipo}: ${fecha.fecha}`;
        ul.appendChild(li);
    }
    fechasDiv.appendChild(ul);
});
