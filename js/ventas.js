"use strict";

/* ============================================================
   Ejercicio 5 — Ventas, cálculos e historial inmutable
   Estado en memoria separado: venta en curso vs. historial.
   ============================================================ */

let ventaEnCurso = {
  idCliente: null,
  renglones: []
};

const historialVentas = [];

let cantidadInvalidaPendiente = false;

/* ------------------------------------------------------------
   Helpers de datos y formatos
   ------------------------------------------------------------ */

function resolverPorId(registros, campoId, valorBuscado) {
  return registros.find(function (registro) {
    return registro[campoId] === valorBuscado;
  });
}

function generarIdVenta() {
  let numero = historialVentas.length + 1;
  let id = "ven-" + String(numero).padStart(2, "0");

  while (historialVentas.some(function (venta) {
    return venta.idVenta === id;
  })) {
    numero++;
    id = "ven-" + String(numero).padStart(2, "0");
  }

  return id;
}

function formatearImporte(valor) {
  return valor.toFixed(2);
}

function formatearFecha(fecha) {
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = String(fecha.getFullYear());

  return dia + "/" + mes + "/" + anio;
}

function esCantidadValida(valor) {
  const cantidad = Number(valor);
  return Number.isInteger(cantidad) && cantidad > 0;
}

function calcularSubtotal(renglon) {
  return renglon.cantidad * renglon.precioUnitario;
}

function calcularTotalVenta(renglones) {
  let total = 0;

  renglones.forEach(function (renglon) {
    total += calcularSubtotal(renglon);
  });

  return total;
}

/* ------------------------------------------------------------
   Estado de la venta en curso
   ------------------------------------------------------------ */

function agregarRenglon(idLibro, cantidad) {
  const errores = [];

  const libro = resolverPorId(libros, "idLibro", idLibro);

  if (libro === undefined) {
    errores.push("Seleccioná un libro del catálogo.");
    return { renglon: null, errores: errores };
  }

  if (!esCantidadValida(cantidad)) {
    errores.push(
      "La cantidad debe ser un número entero mayor que cero."
    );
    return { renglon: null, errores: errores };
  }

  const duplicado = ventaEnCurso.renglones.some(function (renglon) {
    return renglon.idLibro === idLibro;
  });

  if (duplicado) {
    errores.push(
      "El libro \"" + libro.titulo + "\" ya está en la venta."
    );
    return { renglon: null, errores: errores };
  }

  const renglon = {
    idLibro: idLibro,
    titulo: libro.titulo,
    cantidad: Number(cantidad),
    precioUnitario: libro.precio
  };

  ventaEnCurso.renglones.push(renglon);
  return { renglon: renglon, errores: [] };
}

function cambiarCantidadRenglon(idLibro, nuevaCantidad) {
  const renglon = resolverPorId(
    ventaEnCurso.renglones, "idLibro", idLibro
  );

  if (renglon === undefined) {
    return false;
  }

  if (!esCantidadValida(nuevaCantidad)) {
    return false;
  }

  renglon.cantidad = Number(nuevaCantidad);
  return true;
}

function quitarRenglon(idLibro) {
  ventaEnCurso.renglones = ventaEnCurso.renglones.filter(
    function (renglon) {
      return renglon.idLibro !== idLibro;
    }
  );
}

function limpiarVentaEnCurso() {
  ventaEnCurso = {
    idCliente: null,
    renglones: []
  };
  cantidadInvalidaPendiente = false;
  document.getElementById("venta-cliente").value = "";
}

/* ------------------------------------------------------------
   Validación de confirmación
   ------------------------------------------------------------ */

function validarConfirmarVenta() {
  const errores = [];

  const cliente = resolverPorId(
    clientes, "idCliente", ventaEnCurso.idCliente
  );

  if (cliente === undefined) {
    errores.push("Seleccioná un cliente existente para la venta.");
  }

  if (ventaEnCurso.renglones.length === 0) {
    errores.push("La venta no tiene renglones: agregá al menos uno.");
  }

  if (cantidadInvalidaPendiente) {
    errores.push(
      "Hay cantidades inválidas: la cantidad debe ser un " +
      "número entero mayor que cero."
    );
  }

  return errores;
}

/* ------------------------------------------------------------
   Confirmación de la venta
   ------------------------------------------------------------ */

function registrarVentaConfirmada() {
  const cliente = resolverPorId(
    clientes, "idCliente", ventaEnCurso.idCliente
  );

  const renglonesCopiados = ventaEnCurso.renglones.map(
    function (renglon) {
      return {
        titulo: renglon.titulo,
        cantidad: renglon.cantidad,
        precioUnitario: renglon.precioUnitario,
        subtotal: calcularSubtotal(renglon)
      };
    }
  );

  const venta = {
    idVenta: generarIdVenta(),
    fecha: formatearFecha(new Date()),
    cliente: {
      id: cliente.idCliente,
      nombre: cliente.nombreCompleto
    },
    renglones: renglonesCopiados,
    total: calcularTotalVenta(ventaEnCurso.renglones)
  };

  historialVentas.push(venta);
  return venta;
}

/* ------------------------------------------------------------
   Render de la venta en curso
   ------------------------------------------------------------ */

function renderTablaRenglones() {
  const cuerpo = document.getElementById("tabla-renglones")
    .querySelector("tbody");
  const filas = [];

  ventaEnCurso.renglones.forEach(function (renglon) {
    const fila = document.createElement("tr");

    const celdaLibro = document.createElement("td");
    celdaLibro.textContent = renglon.titulo;

    const celdaCantidad = document.createElement("td");
    const inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.min = "1";
    inputCantidad.step = "1";
    inputCantidad.value = String(renglon.cantidad);
    inputCantidad.className = "campo cantidad-renglon";
    inputCantidad.setAttribute("data-idlibro", renglon.idLibro);
    celdaCantidad.append(inputCantidad);

    const celdaPrecio = document.createElement("td");
    celdaPrecio.textContent = formatearImporte(renglon.precioUnitario);

    const celdaSubtotal = document.createElement("td");
    celdaSubtotal.textContent =
      formatearImporte(calcularSubtotal(renglon));

    const celdaQuitar = document.createElement("td");
    const botonQuitar = document.createElement("button");
    botonQuitar.type = "button";
    botonQuitar.className = "boton";
    botonQuitar.textContent = "Quitar";
    botonQuitar.setAttribute("data-idlibro", renglon.idLibro);
    celdaQuitar.append(botonQuitar);

    fila.append(
      celdaLibro, celdaCantidad, celdaPrecio,
      celdaSubtotal, celdaQuitar
    );
    filas.push(fila);
  });

  cuerpo.replaceChildren(...filas);
}

function renderResumenVenta() {
  const total = document.getElementById("venta-total");
  total.textContent = formatearImporte(
    calcularTotalVenta(ventaEnCurso.renglones)
  );

  document.getElementById("mensaje-renglones-vacio").hidden =
    ventaEnCurso.renglones.length > 0;
}

function renderVentaEnCurso() {
  renderTablaRenglones();
  renderResumenVenta();
}

/* ------------------------------------------------------------
   Render del historial y del detalle
   ------------------------------------------------------------ */

function renderHistorial() {
  const cuerpo = document.getElementById("tabla-historial")
    .querySelector("tbody");
  const filas = [];

  historialVentas.forEach(function (venta) {
    const fila = document.createElement("tr");

    const celdaId = document.createElement("td");
    celdaId.textContent = venta.idVenta;

    const celdaFecha = document.createElement("td");
    celdaFecha.textContent = venta.fecha;

    const celdaCliente = document.createElement("td");
    celdaCliente.textContent = venta.cliente.nombre;

    const celdaTotal = document.createElement("td");
    celdaTotal.textContent = formatearImporte(venta.total);

    const celdaDetalle = document.createElement("td");
    const botonDetalle = document.createElement("button");
    botonDetalle.type = "button";
    botonDetalle.className = "boton";
    botonDetalle.textContent = "Ver detalle";
    botonDetalle.setAttribute("data-idventa", venta.idVenta);
    celdaDetalle.append(botonDetalle);

    fila.append(
      celdaId, celdaFecha, celdaCliente, celdaTotal, celdaDetalle
    );
    filas.push(fila);
  });

  cuerpo.replaceChildren(...filas);
  document.getElementById("mensaje-historial-vacio").hidden =
    historialVentas.length > 0;
}

function renderDetalleVenta(idVenta) {
  const contenedor = document.getElementById("detalle-venta");
  const venta = resolverPorId(
    historialVentas, "idVenta", idVenta
  );

  if (venta === undefined) {
    contenedor.replaceChildren();
    return;
  }

  const titulo = document.createElement("h3");
  titulo.textContent =
    "Detalle de la venta " + venta.idVenta;

  const datosVenta = document.createElement("p");
  datosVenta.textContent =
    "Fecha: " + venta.fecha + " — Cliente: " + venta.cliente.nombre;

  const tabla = document.createElement("table");
  tabla.className = "tabla";

  const encabezado = document.createElement("thead");
  const filaEncabezado = document.createElement("tr");

  ["Libro", "Cantidad", "Precio unitario", "Subtotal"]
    .forEach(function (texto) {
      const columna = document.createElement("th");
      columna.scope = "col";
      columna.textContent = texto;
      filaEncabezado.append(columna);
    });

  encabezado.append(filaEncabezado);

  const cuerpo = document.createElement("tbody");
  const filas = [];

  venta.renglones.forEach(function (renglon) {
    const fila = document.createElement("tr");

    const celdaLibro = document.createElement("td");
    celdaLibro.textContent = renglon.titulo;

    const celdaCantidad = document.createElement("td");
    celdaCantidad.textContent = String(renglon.cantidad);

    const celdaPrecio = document.createElement("td");
    celdaPrecio.textContent = formatearImporte(renglon.precioUnitario);

    const celdaSubtotal = document.createElement("td");
    celdaSubtotal.textContent = formatearImporte(renglon.subtotal);

    fila.append(
      celdaLibro, celdaCantidad, celdaPrecio, celdaSubtotal
    );
    filas.push(fila);
  });

  cuerpo.replaceChildren(...filas);
  tabla.append(encabezado, cuerpo);

  const total = document.createElement("p");
  total.textContent = "Total: " + formatearImporte(venta.total);

  contenedor.replaceChildren(titulo, datosVenta, tabla, total);
}

/* ------------------------------------------------------------
   Mensajes de resultado
   ------------------------------------------------------------ */

function mostrarResultadoVenta(mensajes, esExito) {
  const resultado = document.getElementById("resultado-venta");
  resultado.replaceChildren();
  resultado.classList.remove("mensaje-error", "mensaje-exito");
  resultado.classList.add(esExito ? "mensaje-exito" : "mensaje-error");

  if (mensajes.length === 1) {
    const aviso = document.createElement("p");
    aviso.textContent = mensajes[0];
    resultado.append(aviso);
    return;
  }

  const resumen = document.createElement("p");
  resumen.textContent = "No se completó la operación. Revisá estos datos:";

  const lista = document.createElement("ul");

  mensajes.forEach(function (mensaje) {
    const item = document.createElement("li");
    item.textContent = mensaje;
    lista.append(item);
  });

  resultado.append(resumen, lista);
}

/* ------------------------------------------------------------
   Handlers de eventos
   ------------------------------------------------------------ */

function manejarAgregarRenglon(evento) {
  evento.preventDefault();

  const respuesta = agregarRenglon(
    document.getElementById("renglon-libro").value,
    document.getElementById("renglon-cantidad").value
  );

  if (respuesta.errores.length > 0) {
    mostrarResultadoVenta(respuesta.errores, false);
    return;
  }

  document.getElementById("renglon-cantidad").value = "1";
  document.getElementById("resultado-venta").replaceChildren();
  document.getElementById("resultado-venta")
    .classList.remove("mensaje-error", "mensaje-exito");

  renderVentaEnCurso();
}

function manejarConfirmarVenta() {
  ventaEnCurso.idCliente =
    document.getElementById("venta-cliente").value;

  const errores = validarConfirmarVenta();

  if (errores.length > 0) {
    mostrarResultadoVenta(errores, false);
    return;
  }

  const venta = registrarVentaConfirmada();
  limpiarVentaEnCurso();

  renderVentaEnCurso();
  renderHistorial();

  mostrarResultadoVenta(
    ["Venta confirmada correctamente. Identificador: " + venta.idVenta + "."],
    true
  );
}

/* ------------------------------------------------------------
   Delegación de eventos en las tablas
   ------------------------------------------------------------ */

function manejarClicTablaRenglones(evento) {
  const boton = evento.target.closest("button");

  if (boton === null) {
    return;
  }

  const idLibro = boton.getAttribute("data-idlibro");

  if (idLibro === null) {
    return;
  }

  quitarRenglon(idLibro);
  renderVentaEnCurso();
}

function manejarCambioCantidad(evento) {
  const input = evento.target;

  const idLibro = input.getAttribute("data-idlibro");

  if (idLibro === null || input.type !== "number") {
    return;
  }

  const actualizado = cambiarCantidadRenglon(idLibro, input.value);

  if (actualizado) {
    input.removeAttribute("aria-invalid");
    cantidadInvalidaPendiente = false;
    renderVentaEnCurso();
    return;
  }

  input.setAttribute("aria-invalid", "true");
  cantidadInvalidaPendiente = true;
  mostrarResultadoVenta(
    ["La cantidad debe ser un número entero mayor que cero."],
    false
  );
}

function manejarClicTablaHistorial(evento) {
  const boton = evento.target.closest("button");

  if (boton === null) {
    return;
  }

  const idVenta = boton.getAttribute("data-idventa");

  if (idVenta === null) {
    return;
  }

  renderDetalleVenta(idVenta);
}

/* ------------------------------------------------------------
   Integración con altas (evento libreria:alta)
   ------------------------------------------------------------ */

function refrescarSelectsVenta() {
  cargarOpcionesAlta(
    "venta-cliente", clientes,
    "idCliente", "nombreCompleto", "Seleccioná un cliente"
  );
  cargarOpcionesAlta(
    "renglon-libro", libros,
    "idLibro", "titulo", "Seleccioná un libro"
  );
}

function manejarAltaEnLibreria() {
  refrescarSelectsVenta();
}

/* ------------------------------------------------------------
   Inicialización
   ------------------------------------------------------------ */

function iniciarVentas() {
  const formularioRenglon = document.getElementById("form-renglon");

  formularioRenglon.noValidate = true;

  formularioRenglon.addEventListener("submit", manejarAgregarRenglon);

  document.getElementById("boton-confirmar-venta")
    .addEventListener("click", manejarConfirmarVenta);

  document.getElementById("tabla-renglones").querySelector("tbody")
    .addEventListener("click", manejarClicTablaRenglones);
  document.getElementById("tabla-renglones").querySelector("tbody")
    .addEventListener("change", manejarCambioCantidad);

  document.getElementById("tabla-historial").querySelector("tbody")
    .addEventListener("click", manejarClicTablaHistorial);

  document.addEventListener("libreria:alta", manejarAltaEnLibreria);

  renderVentaEnCurso();
  renderHistorial();
}

document.addEventListener("DOMContentLoaded", iniciarVentas);
