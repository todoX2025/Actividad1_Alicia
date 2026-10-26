"use strict";

// EJERCICIO 1: poción mágica.
const formPocion = document.getElementById("formPocion");
const resultadoPocion = document.getElementById("resultadoPocion");
const ALTURA_PUERTA = 120;
const FACTOR_POCION = 2;

formPocion.addEventListener("submit", function (evento) {
  evento.preventDefault(); // Evita que la página se recargue.
  calcularPocion();
});

function calcularPocion() {
  const altura = Number(document.getElementById("altura").value);
  const cantidad = Number(document.getElementById("cantidadPocion").value);

  if (!Number.isFinite(altura) || !Number.isFinite(cantidad) || altura <= 0 || cantidad < 0 || cantidad > 100) {
    mostrarResultado(resultadoPocion, "Corrige los datos: la altura debe ser positiva y la poción debe estar entre 0 y 100 ml.", "error");
    return;
  }

  const alturaCalculada = altura - (cantidad * FACTOR_POCION);
  const alturaFinal = Math.max(0, alturaCalculada);

  if (alturaCalculada < 0) {
    mostrarResultado(resultadoPocion, "La poción es demasiado fuerte. Para el cálculo, la altura final se limita a 0 cm.", "error");
  } else if (alturaFinal <= ALTURA_PUERTA) {
    mostrarResultado(resultadoPocion, `¡Maravilloso, Alicia! Tu altura final es ${alturaFinal.toFixed(2)} cm. La puerta mide ${ALTURA_PUERTA} cm: puedes pasar.`, "exito");
  } else {
    mostrarResultado(resultadoPocion, `Alicia mide ${alturaFinal.toFixed(2)} cm y la puerta mide ${ALTURA_PUERTA} cm. Todavía no puedes pasar; necesitas reducir tu tamaño.`, "error");
  }
}

// EJERCICIO 2: merienda del Sombrerero Loco.
const formMerienda = document.getElementById("formMerienda");
const resultadoMerienda = document.getElementById("resultadoMerienda");
formMerienda.addEventListener("submit", function (evento) {
  evento.preventDefault();
  calcularMerienda();
});

function calcularMerienda() {
  const nombre = document.getElementById("nombreInvitado").value.trim();
  const bebida = document.getElementById("bebida").value;
  const tazas = Number(document.getElementById("tazas").value);
  let precioUnitario = 0;
  let nombreBebida = "";

  if (nombre === "") {
    mostrarResultado(resultadoMerienda, "Escribe el nombre del invitado.", "error");
    return;
  }
  if (!Number.isInteger(tazas) || tazas < 1 || tazas > 20) {
    mostrarResultado(resultadoMerienda, "La cantidad debe ser un número entero entre 1 y 20.", "error");
    return;
  }

  // switch selecciona el precio de acuerdo con la bebida elegida.
  switch (bebida) {
    case "te":
      precioUnitario = 5;
      nombreBebida = "Té";
      break;
    case "cafe":
      precioUnitario = 7;
      nombreBebida = "Café";
      break;
    case "chocolate":
      precioUnitario = 8;
      nombreBebida = "Chocolate";
      break;
    case "limonada":
      precioUnitario = 4;
      nombreBebida = "Limonada";
      break;
    default:
      mostrarResultado(resultadoMerienda, "Selecciona una bebida válida.", "error");
      return;
  }

  const subtotal = precioUnitario * tazas;
  const descuento = tazas >= 4 ? subtotal * 0.10 : 0;
  const total = subtotal - descuento;

  mostrarResultado(
    resultadoMerienda,
    `${nombre}: ${nombreBebida}. Cantidad: ${tazas} taza(s). Precio unitario: £${precioUnitario.toFixed(2)}. Subtotal: £${subtotal.toFixed(2)}. Descuento: £${descuento.toFixed(2)}. Total: £${total.toFixed(2)}.`,
    "exito"
  );
}

// EJERCICIO 3: desafío de la Reina.
const formReina = document.getElementById("formReina");
const resultadoReina = document.getElementById("resultadoReina");
formReina.addEventListener("submit", function (evento) {
  evento.preventDefault();
  analizarCartas();
});

function analizarCartas() {
  const cantidad = Number(document.getElementById("numeroCartas").value);
  if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 50) {
    mostrarResultado(resultadoReina, "Introduce un número entero entre 1 y 50.", "error");
    return;
  }

  let pares = [];
  let impares = [];
  let sumaPares = 0;
  let sumaImpares = 0;

  for (let numero = 1; numero <= cantidad; numero++) {
    if (numero % 2 === 0) {
      pares.push(numero);
      sumaPares += numero;
    } else {
      impares.push(numero);
      sumaImpares += numero;
    }
  }

  let ganador;
  if (sumaPares > sumaImpares) {
    ganador = "La suma de los pares es mayor.";
  } else if (sumaImpares > sumaPares) {
    ganador = "La suma de los impares es mayor.";
  } else {
    ganador = "Hay empate entre las sumas.";
  }

  resultadoReina.className = "resultado exito";
  resultadoReina.textContent = "";
  const detalle = document.createElement("div");
  detalle.innerHTML =
    `<p><strong>Secuencia:</strong> del 1 al ${cantidad}</p>
     <p><strong>Pares (${pares.length}):</strong> ${pares.join(", ") || "ninguno"}</p>
     <p><strong>Suma de pares:</strong> ${sumaPares}</p>
     <p><strong>Impares (${impares.length}):</strong> ${impares.join(", ") || "ninguno"}</p>
     <p><strong>Suma de impares:</strong> ${sumaImpares}</p>
     <p><strong>Resultado:</strong> ${ganador}</p>`;
  resultadoReina.appendChild(detalle);
}

// Muestra mensajes dentro de la página.
function mostrarResultado(elemento, mensaje, tipo) {
  elemento.className = "resultado " + tipo;
  elemento.textContent = mensaje;
}
