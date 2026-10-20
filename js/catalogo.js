function obtenerLibros() {
  return libros;
}

function construirIndiceEditoriales() {
  const indice = {};
  editoriales.forEach((editorial) => {
    indice[editorial.idEditorial] = editorial.nombre;
  });
  return indice;
}

function construirIndiceGeneros() {
  const indice = {};
  generos.forEach((genero) => {
    indice[genero.idGenero] = genero.nombre;
  });
  return indice;
}

function construirIndiceAutores() {
  const indice = {};
  autores.forEach((autor) => {
    indice[autor.idAutor] = autor.nombre;
  });
  return indice;
}

const indiceEditoriales = construirIndiceEditoriales();
const indiceGeneros = construirIndiceGeneros();
const indiceAutores = construirIndiceAutores();

function resolverNombreEditorial(libro) {
  return indiceEditoriales[libro.idEditorial] || "Editorial no encontrada";
}

function resolverGenero(libro) {
  if (libro.idGenero === null) {
    return "Sin clasificar";
  }
  return indiceGeneros[libro.idGenero] || "Sin clasificar";
}

function resolverNombresAutores(libro) {
  const nombres = [];
  libro.idsAutores.forEach((idAutor) => {
    const nombre = indiceAutores[idAutor];
    if (nombre) {
      nombres.push(nombre);
    }
  });
  return nombres.join(", ");
}

function normalizarTexto(texto) {
  return texto.trim().toLowerCase();
}

function filtrarPorTitulo(libros, textoNormalizado) {
  return libros.filter(
    (libro) => normalizarTexto(libro.titulo).includes(textoNormalizado)
  );
}

function crearTarjetaLibro(libro) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta-libro";

  const encabezado = document.createElement("h3");
  encabezado.textContent = libro.titulo;
  tarjeta.appendChild(encabezado);

  const campos = [
    { etiqueta: "Título", valor: libro.titulo },
    { etiqueta: "ISBN", valor: libro.isbn },
    { etiqueta: "Editorial", valor: resolverNombreEditorial(libro) },
    { etiqueta: "Género", valor: resolverGenero(libro) },
    { etiqueta: "Autores", valor: resolverNombresAutores(libro) },
    { etiqueta: "Precio", valor: libro.precio.toFixed(2) }
  ];

  campos.forEach((campo) => {
    const parrafo = document.createElement("p");
    parrafo.textContent = campo.etiqueta + ": ";
    const valor = document.createElement("span");
    valor.textContent = campo.valor;
    parrafo.appendChild(valor);
    tarjeta.appendChild(parrafo);
  });

  return tarjeta;
}

function renderizarCatalogo(librosAMostrar) {
  const listado = document.getElementById("listado-catalogo");
  const tarjetas = librosAMostrar.map((libro) => crearTarjetaLibro(libro));
  listado.replaceChildren(...tarjetas);
}

function mostrarSinResultados() {
  document.getElementById("mensaje-sin-resultados").hidden = false;
  document.getElementById("listado-catalogo").hidden = true;
}

function ocultarSinResultados() {
  document.getElementById("mensaje-sin-resultados").hidden = true;
  document.getElementById("listado-catalogo").hidden = false;
}

function actualizarCatalogo(textoBusqueda) {
  const librosDelCatalogo = obtenerLibros();
  const mensajeCatalogoVacio = document.getElementById("mensaje-catalogo-vacio");

  if (librosDelCatalogo.length === 0) {
    mensajeCatalogoVacio.hidden = false;
    ocultarSinResultados();
    renderizarCatalogo([]);
    return;
  }

  mensajeCatalogoVacio.hidden = true;

  const textoNormalizado = normalizarTexto(textoBusqueda);
  const librosFiltrados = filtrarPorTitulo(librosDelCatalogo, textoNormalizado);
  renderizarCatalogo(librosFiltrados);

  if (librosFiltrados.length === 0) {
    mostrarSinResultados();
  } else {
    ocultarSinResultados();
  }
}

function manejarEnvioBusqueda(evento) {
  evento.preventDefault();
  const campoBusqueda = document.getElementById("busqueda-titulo");
  actualizarCatalogo(campoBusqueda.value);
}

function manejarEntradaBusqueda(evento) {
  actualizarCatalogo(evento.target.value);
}

function registrarEventos() {
  const buscador = document.getElementById("buscador-catalogo");
  const campoBusqueda = document.getElementById("busqueda-titulo");
  buscador.addEventListener("submit", manejarEnvioBusqueda);
  campoBusqueda.addEventListener("input", manejarEntradaBusqueda);
}

actualizarCatalogo("");
registrarEventos();
