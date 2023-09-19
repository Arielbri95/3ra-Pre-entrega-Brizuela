const alumnos = [];
let totalAlumnos;
let formularioActual = 0;

class promedioAlumno {
  constructor(nombre, nota1, nota2) {
    this.nombre = nombre;
    this.nota1 = parseInt(nota1);
    this.nota2 = parseInt(nota2);
  }
}

function sacarPromedio(num1, num2) {
  return (num2 + num1) / 2;
}

function guardarAlumnos() {
  totalAlumnos = document.getElementById("totalAlumnos").value;
  crearFormulario();
}

function mostrarDatos() {
  let resultado = "";

  for (i = 0; i < alumnos.length; i++) {
    let promedio = sacarPromedio(alumnos[i].nota1, alumnos[i].nota2);

    let vista = {
      nombre: alumnos[i].nombre,
      nota1: alumnos[i].nota1,
      nota2: alumnos[i].nota2,
      promedio: promedio,
    };

    const jsonString = JSON.stringify(vista);

    resultado += jsonString + "\n";
  }

  const container = document.getElementById("jsonContainer");
  container.textContent = resultado;
}

function crearFormulario() {
  if (formularioActual < totalAlumnos) {
    let form = document.createElement("form");

    let nombre = document.createElement("input");
    nombre.type = "text";
    nombre.placeholder = "Nombre del alumno";
    form.appendChild(nombre);

    let nota1 = document.createElement("input");
    nota1.type = "number";
    nota1.placeholder = "Nota 1";
    form.appendChild(nota1);

    let nota2 = document.createElement("input");
    nota2.type = "number";
    nota2.placeholder = "Nota 2";
    form.appendChild(nota2);

    let submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.textContent = "Enviar";
    form.appendChild(submitButton);

    let container = document.getElementById("container");
    container.appendChild(form);

    submitButton.addEventListener("click", function () {
      let nombreAlumno = nombre.value;
      let nota1Alumno = parseFloat(nota1.value);
      let nota2Alumno = parseFloat(nota2.value);

      let alumno = new promedioAlumno(nombreAlumno, nota1Alumno, nota2Alumno);

      alumnos.push(alumno);
      formularioActual++;
      container.removeChild(form);

      if (formularioActual < totalAlumnos) {
        crearFormulario();
      } else {
        mostrarDatos();
      }
    });
  }
}
