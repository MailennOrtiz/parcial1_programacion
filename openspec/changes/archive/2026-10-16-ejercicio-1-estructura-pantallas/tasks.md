# Tasks — Ejercicio 1 · Estructura y pantallas HTML

## 1. Base del documento

- [x] 1.1 Crear `index.html` con `lang="es"`, `meta charset` + `viewport`, `<title>Libreria Nya — Catálogo y gestión</title>`, `header` (h1 «Libreria Nya» + `nav` con 5 anclas) y `main` + `footer`; verificar que abre por doble clic (`file://`) sin errores.
- [x] 1.2 Crear las 5 `section` (`#vista-catalogo`, `#vista-libros`, `#vista-clientes`, `#vista-ventas`, `#vista-historial`) cada una con su `h2`, y verificar que cada ancla del `nav` lleva a su sección.

## 2. Vistas de lectura

- [x] 2.1 Estructurar el Catálogo (`form#buscador-catalogo` con label+input+botón «Buscar», `p#mensaje-sin-resultados`, `div#listado-catalogo` con un artículo de ejemplo estructural marcado como ejemplo, cada libro con título, ISBN, editorial, género/«Sin clasificar», autores y precio) y verificar los 6 campos por libro más el texto «Sin clasificar» (cubre R-02, CA-02).
- [x] 2.2 Estructurar el Historial (`table#tabla-historial` con `thead` id/fecha/cliente/total/detalle, botón «Ver detalle» por fila, `div#detalle-venta`, `p#mensaje-historial-vacio`) y verificar encabezados y contenedor de detalle (cubre R-03, CA-04).

## 3. Formularios y venta

- [x] 3.1 Estructurar Libros (`form#form-alta-libro` con título, ISBN, precio, editorial, género con «Sin clasificar», autores + botón «Registrar libro», `div#listado-libros`, `p#mensaje-libros-vacio`, `div#resultado-alta-libro[aria-live]`) y verificar cada campo con `label for/id` (cubre R-03, R-04, CA-04).
- [x] 3.2 Estructurar Clientes (`form#form-alta-cliente` con nombre y email + botón «Registrar cliente», `div#listado-clientes`, `p#mensaje-clientes-vacio`, `div#resultado-alta-cliente[aria-live]`) y verificar labels y tipos (`text`, `email`) (cubre R-03, R-04, CA-04).
- [x] 3.3 Estructurar Ventas (`select#venta-cliente`, `form#form-renglon` con libro+cantidad+«Agregar renglón», `table#tabla-renglones` libro/cantidad/precio/subtotal/quitar, `div#resumen-venta` con total, botón «Confirmar venta», `div#resultado-venta[aria-live]`) y verificar la cadena completa selector→renglones→resumen (cubre R-03, CA-04).

## 4. Verificación de aceptación

- [x] 4.1 Verificar semántica y compatibilidad: un solo `h1`, `header/nav/main/footer`, tablas con `thead/th`, cero referencias externas (buscar `http`, `cdn`, `fetch`, `@import` sin resultados) y apertura `file://` funcional (cubre R-04, R-06, R-07, CA-03, CA-05).
- [x] 4.2 Verificar recorrido integral CA-01–CA-05 por teclado y clic (las 5 vistas, estados de lista vacía/sin resultados/resultado presentes, contrato de ids del spec completo) y registrar evidencia y pendientes sin declarar aprobado lo no ejecutado.
