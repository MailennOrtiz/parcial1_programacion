# Spec Delta — Estructura y pantallas HTML (Ejercicio 1)

## Purpose

Define la estructura HTML navegable del frontend de la librería «Libreria Nya»: entrada única, cinco vistas con formularios y listados, semántica y estados reservados para el JavaScript de los ejercicios 3 a 5.

## ADDED Requirements

### Requirement: Entrada única y navegación persistente

El sistema SHALL exponer `index.html` como entrada única con un `nav` persistente que enlace a las 5 vistas (Catálogo, Libros, Clientes, Ventas, Historial) mediante anclas a secciones de la misma página.

#### Scenario: Recorrido completo por navegación

- **WHEN** el usuario abre `index.html` y activa cada enlace del `nav`
- **THEN** la vista correspondiente recibe el foco visible y no se produce ninguna página rota ni URL externa

#### Scenario: Navegación por teclado

- **WHEN** el usuario recorre con Tab y activa enlaces con Enter
- **THEN** todas las vistas son alcanzables y operables sin mouse

### Requirement: Vista Catálogo con buscador y campos por libro

La vista Catálogo SHALL contener el título de la librería, un buscador por título (input etiquetado + botón «Buscar») y un listado donde cada libro presenta título, ISBN, editorial, género o el texto literal «Sin clasificar», autores y precio.

#### Scenario: Libro sin género asignado

- **WHEN** se representa un libro sin género
- **THEN** su campo de género muestra exactamente «Sin clasificar»

#### Scenario: Buscador presente y asociado

- **WHEN** se inspecciona el buscador del catálogo
- **THEN** existe un `label` asociado al input, un botón con texto «Buscar» y un contenedor de listado con `id` estable

### Requirement: Vistas Libros y Clientes con formulario y listado

Las vistas Libros y Clientes SHALL contener cada una un formulario de alta y un listado de registros. El formulario de libros SHALL incluir campos para título, ISBN, precio, editorial, género (con opción «Sin clasificar») y autores; el de clientes SHALL incluir nombre completo y email.

#### Scenario: Campos de alta de libro

- **WHEN** se inspecciona el formulario de alta de libro
- **THEN** existen campos etiquetados para título, ISBN, precio, editorial (selector), género (selector con «Sin clasificar») y autores (selección múltiple o equivalente), más un botón «Registrar libro»

#### Scenario: Campos de alta de cliente

- **WHEN** se inspecciona el formulario de alta de cliente
- **THEN** existen campos etiquetados para nombre completo y email, más un botón «Registrar cliente»

### Requirement: Vista Ventas con cliente, renglones y resumen

La vista Ventas SHALL contener un selector de cliente, una zona de composición de renglones (libro + cantidad) y un resumen con subtotales y total.

#### Scenario: Estructura de composición de venta

- **WHEN** se inspecciona la vista Ventas
- **THEN** existe un `select` de cliente etiquetado, controles para libro y cantidad con botón «Agregar renglón», una tabla de renglones (libro, cantidad, precio unitario, subtotal, quitar) y un resumen con total más botón «Confirmar venta»

### Requirement: Vista Historial con listado y detalle

La vista Historial SHALL contener un listado de ventas (identificador, fecha, cliente, total) y un mecanismo de acceso al detalle de renglones de cada venta.

#### Scenario: Historial y detalle

- **WHEN** se inspecciona la vista Historial
- **THEN** existe una tabla con encabezados de identificador, fecha, cliente, total y detalle, un control «Ver detalle» por fila y un contenedor de detalle de venta

### Requirement: Semántica, formularios y tablas accesibles

La página SHALL usar `header` + `nav` + `main` (+ `footer`), un único `h1` («Libreria Nya») y `h2` por vista; cada `input`/`select`/`textarea` SHALL tener `label` con `for`/`id`; cada `button` SHALL tener texto de acción; cada tabla SHALL tener `thead` con `th` de alcance. El documento SHALL declarar `lang="es"`, `meta charset` y `meta viewport` con jerarquía de encabezados sin saltos.

#### Scenario: Inspección de semántica

- **WHEN** se inspecciona el DOM de `index.html`
- **THEN** existen `header`, `nav`, `main` y `footer`, un solo `h1`, un `h2` por sección, todos los campos con `label` asociada y todas las tablas con `thead`/`th`

### Requirement: Estados de listas vacías, sin resultados y resultado de operación

Cada listado SHALL contar con un mensaje previsto de lista vacía, el catálogo SHALL contar con un mensaje de búsqueda sin resultados, y cada formulario/venta SHALL contar con un contenedor de resultado de operación (éxito/rechazo) con `aria-live="polite"` y texto explícito (no solo color).

#### Scenario: Contenedores de estado presentes

- **WHEN** se inspecciona cualquier vista con listado
- **THEN** existe un mensaje de lista vacía visible por defecto, y en el catálogo un mensaje de sin-resultados reservado, y junto a cada formulario un contenedor de resultado con `aria-live`

### Requirement: Funcionamiento local sin dependencias externas

La entrega SHALL funcionar abierta como archivo local (`file://`) sin servidor y sin referencias a CDN, `@import` remoto, `fetch` a backend ni scripts de terceros.

#### Scenario: Apertura sin red ni servidor

- **WHEN** se abre `index.html` por doble clic sin servidor y sin conexión
- **THEN** las 5 vistas y la navegación funcionan y no hay peticiones externas en la inspección de red

### Requirement: Ganchos DOM documentados para ejercicios futuros

El sistema SHALL exponer `id` estables y documentados para los contenedores que consumirá el JavaScript de los Ejercicios 3–5 (buscador, listado del catálogo, selects de editorial/género/autores, selector de cliente, renglones, resumen, historial y detalle), sin implementar comportamiento.

#### Scenario: Contrato de ganchos completo

- **WHEN** se contrasta el spec con el DOM implementado
- **THEN** cada gancho listado en el spec existe con el `id` exacto y sin lógica JS asociada en esta entrega
