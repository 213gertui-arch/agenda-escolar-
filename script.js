function agregarTarea() {
    let tarea = document.getElementById("tarea").value;
    let fecha = document.getElementById("fecha").value;

    if (tarea === "") {
        alert("Escribe una tarea");
        return;
    }

    let item = {
        tarea: tarea,
        fecha: fecha,
        completada: false
    };

    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.push(item);

    localStorage.setItem("tareas", JSON.stringify(tareas));

    mostrarTareas();

    document.getElementById("tarea").value = "";
    document.getElementById("fecha").value = "";
}

function mostrarTareas() {
    let lista = document.getElementById("lista");
    let archivadas = document.getElementById("archivadas");

    lista.innerHTML = "";
    archivadas.innerHTML = "";

    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    tareas.forEach((tarea, indice) => {
        let item = document.createElement("li");

        item.innerHTML = `
            <b>${tarea.tarea}</b><br>
            Fecha: ${tarea.fecha}<br>
        `;

        if (!tarea.completada) {
            let boton = document.createElement("button");
            boton.textContent = "✔ Completada";
            boton.onclick = () => completarTarea(indice);

            item.appendChild(boton);
            lista.appendChild(item);
        } else {
            item.innerHTML += "✅ Archivada";
            archivadas.appendChild(item);
        }
    });
}

function completarTarea(indice) {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    tareas[indice].completada = true;

    localStorage.setItem("tareas", JSON.stringify(tareas));

    mostrarTareas();
}

window.onload = mostrarTareas;