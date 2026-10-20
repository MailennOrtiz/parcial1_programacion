const editoriales = [
  { idEditorial: "edi-01", nombre: "Ediciones Farolito" },
  { idEditorial: "edi-02", nombre: "La Imprenta del Lobo" }
];

const generos = [
  { idGenero: "gen-01", nombre: "Fantasía" },
  { idGenero: "gen-02", nombre: "Misterio" }
];

const autores = [
  { idAutor: "aut-01", nombre: "Camila Ríos" },
  { idAutor: "aut-02", nombre: "Bruno Sandoval" },
  { idAutor: "aut-03", nombre: "Noelia Peralta" }
];

const libros = [
  { idLibro: "lib-01", titulo: "El farol de medianoche", isbn: "978-987-1001-01-1", idEditorial: "edi-01", idGenero: "gen-01", idsAutores: ["aut-01"], precio: 12990.5 },
  { idLibro: "lib-02", titulo: "Mapas de la ciudad oculta", isbn: "978-987-1001-02-8", idEditorial: "edi-02", idGenero: "gen-02", idsAutores: ["aut-01", "aut-02"], precio: 15400 },
  { idLibro: "lib-03", titulo: "El último tren", isbn: "978-987-1001-03-5", idEditorial: "edi-01", idGenero: "gen-02", idsAutores: ["aut-03"], precio: 11800.75 },
  { idLibro: "lib-04", titulo: "Cuaderno de bordes sueltos", isbn: "978-987-1001-04-2", idEditorial: "edi-02", idGenero: null, idsAutores: ["aut-02"], precio: 8900 },
  { idLibro: "lib-05", titulo: "Cuentos de nieve & ceniza", isbn: "978-987-1001-05-9", idEditorial: "edi-01", idGenero: "gen-01", idsAutores: ["aut-01", "aut-03"], precio: 10250.25 },
  { idLibro: "lib-06", titulo: "Harry y la biblioteca secreta", isbn: "978-987-1001-06-6", idEditorial: "edi-02", idGenero: "gen-01", idsAutores: ["aut-03"], precio: 9990 }
];

const clientes = [
  { idCliente: "cli-01", nombreCompleto: "Lucía Fernández", email: "lucia.fernandez@ejemplo.com" },
  { idCliente: "cli-02", nombreCompleto: "Mateo Quispe", email: "mateo.quispe@ejemplo.com" },
  { idCliente: "cli-03", nombreCompleto: "Sofía Herrera", email: "sofia.herrera@ejemplo.com" }
];
