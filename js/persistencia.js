"use strict";

// Las colecciones se guardan por separado; nunca se borra almacenamiento ajeno.
const clavesPersistencia = {
  libros: "libreria-nya.libros.v1",
  clientes: "libreria-nya.clientes.v1",
  ventas: "libreria-nya.ventas.v1"
};

const estadoPersistencia = {
  libros: { bloqueada: false, aviso: "" },
  clientes: { bloqueada: false, aviso: "" },
  ventas: { bloqueada: false, aviso: "" }
};

function esObjetoPersistido(valor) {
  return valor !== null && typeof valor === "object" && !Array.isArray(valor);
}

function esTextoPersistido(valor) {
  return typeof valor === "string" && valor.trim() !== "";
}

function esPrecioPersistido(valor) {
  return Number.isFinite(valor) && valor > 0;
}

function esImportePersistido(valor) {
  return Number.isFinite(valor) && valor >= 0;
}

function esLibroPersistido(libro) {
  return esTextoPersistido(libro.titulo) &&
    esTextoPersistido(libro.isbn) && esPrecioPersistido(libro.precio) &&
    editoriales.some((item) => item.idEditorial === libro.idEditorial) &&
    (libro.idGenero === null ||
      generos.some((item) => item.idGenero === libro.idGenero)) &&
    Array.isArray(libro.idsAutores) && libro.idsAutores.length > 0 &&
    libro.idsAutores.every((id) => autores.some((item) => item.idAutor === id));
}

function esClientePersistido(cliente) {
  return esTextoPersistido(cliente.nombreCompleto) &&
    esTextoPersistido(cliente.email);
}

function esVentaPersistida(venta) {
  return esTextoPersistido(venta.fecha) && esObjetoPersistido(venta.cliente) &&
    esTextoPersistido(venta.cliente.id) && esTextoPersistido(venta.cliente.nombre) &&
    esImportePersistido(venta.total) && Array.isArray(venta.renglones) &&
    venta.renglones.length > 0 && venta.renglones.every((renglon) =>
      esObjetoPersistido(renglon) && esTextoPersistido(renglon.titulo) &&
      Number.isInteger(renglon.cantidad) && renglon.cantidad > 0 &&
      esPrecioPersistido(renglon.precioUnitario) &&
      esImportePersistido(renglon.subtotal)
    );
}

function validarColeccionPersistida(tipo, registros) {
  const contratos = {
    libros: { campoId: "idLibro", validar: esLibroPersistido },
    clientes: { campoId: "idCliente", validar: esClientePersistido },
    ventas: { campoId: "idVenta", validar: esVentaPersistida }
  };
  const contrato = contratos[tipo];
  if (!contrato || !Array.isArray(registros)) {
    return false;
  }

  const ids = new Set();
  return registros.every((registro) => {
    if (!esObjetoPersistido(registro)) {
      return false;
    }
    const id = registro[contrato.campoId];
    if (!esTextoPersistido(id) || ids.has(id) || !contrato.validar(registro)) {
      return false;
    }
    ids.add(id);
    return true;
  });
}

function mostrarEstadoPersistencia() {
  const contenedor = document.getElementById("estado-persistencia");
  contenedor.replaceChildren();
  Object.values(estadoPersistencia).forEach((estado) => {
    if (estado.aviso !== "") {
      const parrafo = document.createElement("p");
      parrafo.textContent = estado.aviso;
      contenedor.append(parrafo);
    }
  });
  contenedor.hidden = contenedor.childElementCount === 0;
}

function guardarColeccionPersistida(tipo, registros) {
  const estado = estadoPersistencia[tipo];
  if (estado.bloqueada) {
    return { exito: false, tipo: tipo, motivo: "lectura-bloqueada" };
  }

  try {
    localStorage.setItem(clavesPersistencia[tipo], JSON.stringify(registros));
    estado.aviso = "";
    mostrarEstadoPersistencia();
    return { exito: true, tipo: tipo, motivo: "guardada" };
  } catch {
    estado.aviso = "No se pudieron guardar los últimos cambios de " + tipo +
      ". Podrían perderse al recargar.";
    mostrarEstadoPersistencia();
    return { exito: false, tipo: tipo, motivo: "escritura" };
  }
}

function bloquearColeccionPersistida(tipo, motivo) {
  const estado = estadoPersistencia[tipo];
  estado.bloqueada = true;
  estado.aviso = motivo === "lectura"
    ? "No se pudo acceder al almacenamiento de " + tipo +
      ". Los cambios de esta colección solo estarán disponibles durante esta sesión."
    : "No se pudieron recuperar " + tipo +
      ". Los datos guardados se conservaron sin cambios; " +
      "esta colección funciona solo durante esta sesión.";
  mostrarEstadoPersistencia();
  return { exito: false, tipo: tipo, motivo: motivo };
}

function cargarColeccionPersistida(tipo, destino) {
  let texto;
  try {
    texto = localStorage.getItem(clavesPersistencia[tipo]);
  } catch {
    return bloquearColeccionPersistida(tipo, "lectura");
  }

  if (texto === null) {
    const resultado = guardarColeccionPersistida(tipo, destino);
    return {
      exito: resultado.exito,
      tipo: tipo,
      motivo: resultado.exito ? "inicializada" : resultado.motivo
    };
  }

  let registros;
  try {
    registros = JSON.parse(texto);
  } catch {
    return bloquearColeccionPersistida(tipo, "json-invalido");
  }
  if (!validarColeccionPersistida(tipo, registros)) {
    return bloquearColeccionPersistida(tipo, "estructura-invalida");
  }

  // Preserva las referencias a los arrays const y respeta los arrays vacíos.
  destino.length = 0;
  registros.forEach((registro) => destino.push(registro));
  return { exito: true, tipo: tipo, motivo: "recuperada" };
}

function guardarAltaPersistida(evento) {
  if (evento.detail.tipo === "libro") {
    guardarColeccionPersistida("libros", libros);
  } else if (evento.detail.tipo === "cliente") {
    guardarColeccionPersistida("clientes", clientes);
  }
}

function guardarVentaPersistida() {
  // Este listener se ejecuta tras declarar y modificar el historial en ventas.js.
  guardarColeccionPersistida("ventas", historialVentas);
}

document.addEventListener("libreria:alta", guardarAltaPersistida);
document.addEventListener("libreria:venta-confirmada", guardarVentaPersistida);

// El catálogo renderiza al evaluar su script: estas cargas deben precederlo.
cargarColeccionPersistida("libros", libros);
cargarColeccionPersistida("clientes", clientes);
