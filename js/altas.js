"use strict";

function normalizarISBN(isbn) {
  return String(isbn ?? "").replace(/[\s-]/g, "");
}

function normalizarEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

function generarIdAlta(registros, campoId, prefijo) {
  let numero = registros.length + 1;
  let id = prefijo + "-" + String(numero).padStart(2, "0");

  while (registros.some((registro) => registro[campoId] === id)) {
    numero++;
    id = prefijo + "-" + String(numero).padStart(2, "0");
  }

  return id;
}

function registrarLibro(entrada) {
  const errores = [];
  const titulo = String(entrada.titulo ?? "").trim();
  const isbn = normalizarISBN(entrada.isbn);
  const precio = Number(entrada.precio);
  const idsAutores = Array.isArray(entrada.idsAutores)
    ? entrada.idsAutores : [];
  const idGenero = entrada.idGenero === "" || entrada.idGenero == null
    ? null : entrada.idGenero;

  if (titulo === "") {
    errores.push({
      campo: "libro-titulo",
      mensaje: "Ingresá el título."
    });
  }

  if (isbn === "") {
    errores.push({
      campo: "libro-isbn",
      mensaje: "Ingresá el ISBN."
    });
  } else if (libros.some((libro) => normalizarISBN(libro.isbn) === isbn)) {
    errores.push({
      campo: "libro-isbn",
      mensaje: "Ya existe un libro con ese ISBN."
    });
  }

  if (!Number.isFinite(precio) || precio <= 0) {
    errores.push({
      campo: "libro-precio",
      mensaje: "El precio debe ser un número mayor que cero."
    });
  }

  if (!editoriales.some(
    (editorial) => editorial.idEditorial === entrada.idEditorial
  )) {
    errores.push({
      campo: "libro-editorial",
      mensaje: "Seleccioná una editorial existente."
    });
  }

  if (idGenero !== null && !generos.some(
    (genero) => genero.idGenero === idGenero
  )) {
    errores.push({
      campo: "libro-genero",
      mensaje: "Seleccioná un género existente o Sin clasificar."
    });
  }

  if (idsAutores.length === 0) {
    errores.push({
      campo: "libro-autores",
      mensaje: "Seleccioná al menos un autor."
    });
  } else if (!idsAutores.every(
    (id) => autores.some((autor) => autor.idAutor === id)
  )) {
    errores.push({
      campo: "libro-autores",
      mensaje: "Todos los autores seleccionados deben existir."
    });
  }

  if (errores.length > 0) {
    return { registro: null, errores: errores };
  }

  const libro = {
    idLibro: generarIdAlta(libros, "idLibro", "lib"),
    titulo: titulo,
    isbn: isbn,
    idEditorial: entrada.idEditorial,
    idGenero: idGenero,
    idsAutores: Array.from(new Set(idsAutores)),
    precio: precio
  };

  libros.push(libro);
  return { registro: libro, errores: [] };
}

function registrarCliente(entrada) {
  const errores = [];
  const nombreCompleto = String(entrada.nombreCompleto ?? "").trim();
  const email = normalizarEmail(entrada.email);

  if (nombreCompleto === "") {
    errores.push({
      campo: "cliente-nombre",
      mensaje: "Ingresá el nombre completo."
    });
  }

  if (email === "") {
    errores.push({
      campo: "cliente-email",
      mensaje: "Ingresá el email."
    });
  } else if (!/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(email)) {
    errores.push({
      campo: "cliente-email",
      mensaje: "Ingresá un email válido, por ejemplo nombre@correo.com."
    });
  } else if (clientes.some(
    (cliente) => normalizarEmail(cliente.email) === email
  )) {
    errores.push({
      campo: "cliente-email",
      mensaje: "Ya existe un cliente con ese email."
    });
  }

  if (errores.length > 0) {
    return { registro: null, errores: errores };
  }

  const cliente = {
    idCliente: generarIdAlta(clientes, "idCliente", "cli"),
    nombreCompleto: nombreCompleto,
    email: email
  };

  clientes.push(cliente);
  return { registro: cliente, errores: [] };
}

function cargarOpcionesAlta(
  idSelector, registros, campoId, campoNombre, textoInicial
) {
  const selector = document.getElementById(idSelector);
  const seleccionados = Array.from(
    selector.selectedOptions, (opcion) => opcion.value
  );
  const opciones = [];

  if (textoInicial !== null) {
    const opcion = document.createElement("option");
    opcion.value = "";
    opcion.textContent = textoInicial;
    opciones.push(opcion);
  }

  registros.forEach((registro) => {
    const opcion = document.createElement("option");
    opcion.value = registro[campoId];
    opcion.textContent = registro[campoNombre];
    opcion.selected = seleccionados.includes(opcion.value);
    opciones.push(opcion);
  });

  selector.replaceChildren(...opciones);
}

function actualizarVistasAltas() {
  cargarOpcionesAlta(
    "libro-editorial", editoriales,
    "idEditorial", "nombre", "Seleccioná una editorial"
  );
  cargarOpcionesAlta(
    "libro-genero", generos,
    "idGenero", "nombre", "Sin clasificar"
  );
  cargarOpcionesAlta(
    "libro-autores", autores,
    "idAutor", "nombre", null
  );
  cargarOpcionesAlta(
    "venta-cliente", clientes,
    "idCliente", "nombreCompleto", "Seleccioná un cliente"
  );
  cargarOpcionesAlta(
    "renglon-libro", libros,
    "idLibro", "titulo", "Seleccioná un libro"
  );

  const listadoLibros = document.getElementById("listado-libros");
  listadoLibros.replaceChildren(
    ...libros.map((libro) => crearTarjetaLibro(libro))
  );
  document.getElementById("mensaje-libros-vacio").hidden =
    libros.length > 0;

  const listadoClientes = document.getElementById("listado-clientes");
  listadoClientes.replaceChildren();

  clientes.forEach((cliente) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-libro";

    const nombre = document.createElement("h3");
    nombre.textContent = cliente.nombreCompleto;

    const email = document.createElement("p");
    email.textContent = "Email: " + cliente.email;

    tarjeta.append(nombre, email);
    listadoClientes.append(tarjeta);
  });

  document.getElementById("mensaje-clientes-vacio").hidden =
    clientes.length > 0;

  actualizarCatalogo(
    document.getElementById("busqueda-titulo").value
  );
}

function limpiarResultadoAlta(formulario, resultado) {
  resultado.replaceChildren();
  resultado.classList.remove("mensaje-error", "mensaje-exito");

  formulario.querySelectorAll("[aria-invalid]").forEach((campo) => {
    campo.removeAttribute("aria-invalid");
  });
}

function mostrarErroresAlta(resultado, errores) {
  resultado.classList.add("mensaje-error");

  const resumen = document.createElement("p");
  resumen.textContent = "No se guardó el registro. Revisá estos datos:";

  const lista = document.createElement("ul");

  errores.forEach((error) => {
    const item = document.createElement("li");
    item.textContent = error.mensaje;
    lista.append(item);

    document.getElementById(error.campo)
      .setAttribute("aria-invalid", "true");
  });

  resultado.append(resumen, lista);
  document.getElementById(errores[0].campo).focus();
}

function completarAlta(
  formulario, resultado, respuesta, tipo, primerCampo
) {
  if (respuesta.errores.length > 0) {
    mostrarErroresAlta(resultado, respuesta.errores);
    return;
  }

  formulario.reset();
  actualizarVistasAltas();

  resultado.classList.add("mensaje-exito");
  resultado.textContent = tipo === "libro"
    ? "Libro registrado correctamente."
    : "Cliente registrado correctamente.";

  document.getElementById(primerCampo).focus();

  document.dispatchEvent(new CustomEvent("libreria:alta", {
    detail: { tipo: tipo, registro: respuesta.registro }
  }));
}

function manejarAltaLibro(evento) {
  evento.preventDefault();

  const formulario = document.getElementById("form-alta-libro");
  const resultado = document.getElementById("resultado-alta-libro");
  limpiarResultadoAlta(formulario, resultado);

  const respuesta = registrarLibro({
    titulo: document.getElementById("libro-titulo").value,
    isbn: document.getElementById("libro-isbn").value,
    precio: document.getElementById("libro-precio").value,
    idEditorial: document.getElementById("libro-editorial").value,
    idGenero: document.getElementById("libro-genero").value,
    idsAutores: Array.from(
      document.getElementById("libro-autores").selectedOptions,
      (opcion) => opcion.value
    )
  });

  completarAlta(
    formulario, resultado, respuesta, "libro", "libro-titulo"
  );
}

function manejarAltaCliente(evento) {
  evento.preventDefault();

  const formulario = document.getElementById("form-alta-cliente");
  const resultado = document.getElementById("resultado-alta-cliente");
  limpiarResultadoAlta(formulario, resultado);

  const respuesta = registrarCliente({
    nombreCompleto: document.getElementById("cliente-nombre").value,
    email: document.getElementById("cliente-email").value
  });

  completarAlta(
    formulario, resultado, respuesta, "cliente", "cliente-nombre"
  );
}

function iniciarAltas() {
  const formularioLibro = document.getElementById("form-alta-libro");
  const formularioCliente = document.getElementById("form-alta-cliente");

  formularioLibro.noValidate = true;
  formularioCliente.noValidate = true;
  document.getElementById("libro-precio").step = "any";

  formularioLibro.querySelectorAll("input, select").forEach((campo) => {
    campo.setAttribute("aria-describedby", "resultado-alta-libro");
  });

  formularioCliente.querySelectorAll("input, select").forEach((campo) => {
    campo.setAttribute("aria-describedby", "resultado-alta-cliente");
  });

  formularioLibro.addEventListener("submit", manejarAltaLibro);
  formularioCliente.addEventListener("submit", manejarAltaCliente);

  actualizarVistasAltas();
}

document.addEventListener("DOMContentLoaded", iniciarAltas);
