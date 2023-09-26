const alumnos = [];
let totalAlumnos;

function sacarPromedio(num1, num2) {
  return (num2 + num1) / 2;
}

function guardarAlumnos() {
  totalAlumnos = document.getElementById("totalAlumnos").value;
  if (totalAlumnos > 0 && totalAlumnos <= 25) {
    document.getElementById("enviarBoton").disabled = true;
    crearFormulario(totalAlumnos);
  } else {
    alert("El numero ingresado es incorrecto");
  }
}

function mostrarDatos(alumnos) {
  const container = document.getElementById("jsonContainer");
  container.innerHTML = "";

  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    const valor = localStorage.getItem(key);
    const objetoJSON = JSON.parse(valor);
    console.log(`Clave: ${key}, Valor: ${valor}`);

    let lista = document.createElement("ul");
    let nombreItem = document.createElement("li");
    let promedioItem = document.createElement("li");

    nombreItem.textContent = "Alumno: " + key;
    promedioItem.textContent = "Promedio: " + objetoJSON.promedio;

    lista.appendChild(nombreItem);
    lista.appendChild(promedioItem);
    container.appendChild(lista);
  });
}

function crearFormulario(totalAlumnos) {
  let form = document.createElement("form");

  for (let i = 1; i <= totalAlumnos; i++) {
    let nombre = document.createElement("input");
    nombre.type = "text";
    nombre.placeholder = "Nombre del alumno " + i;
    nombre.name = "nombre" + i;
    form.appendChild(nombre);

    let nota1 = document.createElement("input");
    nota1.type = "number";
    nota1.placeholder = "Nota 1 del alumno " + i;
    nota1.name = "nota1" + i;
    form.appendChild(nota1);

    let nota2 = document.createElement("input");
    nota2.type = "number";
    nota2.placeholder = "Nota 2 del alumno " + i;
    nota2.name = "nota2" + i;
    form.appendChild(nota2);

    saltoDeLinea = document.createElement("br");
    form.appendChild(saltoDeLinea);
  }

  let submitButton = document.createElement("button");
  submitButton.type = "button";
  submitButton.textContent = "Enviar";
  submitButton.id = "botonAlumnos";
  form.appendChild(submitButton);

  let container = document.getElementById("container");
  container.appendChild(form);

  submitButton.addEventListener("click", function () {
    let valid = true;
    let alumnos = [];
    for (let i = 1; i <= totalAlumnos; i++) {
      let nombre = document.querySelector(
        'input[name="nombre' + i + '"]'
      ).value;
      let nota1 = parseFloat(
        document.querySelector('input[name="nota1' + i + '"]').value
      );
      let nota2 = parseFloat(
        document.querySelector('input[name="nota2' + i + '"]').value
      );

      if (
        nombre === "" ||
        isNaN(nota1) ||
        isNaN(nota2) ||
        nota1 <= 0 ||
        nota1 > 10 ||
        nota2 <= 0 ||
        nota2 > 10
      ) {
        alert(
          "Por favor, complete todos los campos correctamente para el alumno " +
            i
        );
        valid = false;
        break;
      }
      let alumno = {
        nombre: nombre,
        nota1: nota1,
        nota2: nota2,
        promedio: sacarPromedio(nota1, nota2),
      };
      alumnos.push(alumno);
      localStorage.setItem(alumno.nombre, JSON.stringify(alumno));
    }
    if (valid) {
      document.getElementById("botonAlumnos").disabled = true;
      const container = document.getElementById("container");
      container.innerHTML = "";
      document.getElementById("enviarBoton").disabled = false;
      //console.log(alumnos)
      mostrarDatos(alumnos);
    }
  });
}
