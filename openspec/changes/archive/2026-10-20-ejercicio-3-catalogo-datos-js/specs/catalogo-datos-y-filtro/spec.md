# Spec Delta

## Purpose

Permite presentar el catálogo de la librería generado desde datos en memoria con relaciones resueltas (editorial, género o «Sin clasificar», autores) y filtrarlo por título de forma segura sobre el HTML/CSS ya aprobados, sin red, sin librerías y por apertura directa `file://`.

## ADDED Requirements

### Requirement: Dataset en memoria con identificadores estables e integridad referencial

El sistema SHALL exponer arrays de objetos con identificadores estables para 6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes ficticios, declarados explícitamente como ejemplos de práctica. Cada libro SHALL referenciar por id una editorial existente y uno o más autores existentes; su género SHALL ser opcional y, de estar presente, referenciar un género existente. No se permiten datos fuera de ese conjunto mínimo ni referencias colgantes.

#### Scenario: Volúmenes mínimos exactos

- **GIVEN** los arrays de datos del catálogo
- **WHEN** se contabiliza cada entidad
- **THEN** hay exactamente 6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes ficticios marcados como ejemplos de práctica, sin entidades adicionales

#### Scenario: Sin referencias colgantes

- **GIVEN** cada libro del array
- **WHEN** se contrastan su editorial, su género (cuando no es nulo) y sus autores contra los arrays correspondientes
- **THEN** todos los identificadores referenciados existen y ningún libro queda con una referencia colgante

#### Scenario: Cobertura de casos de relaciones dentro del mínimo

- **GIVEN** el conjunto de libros aprobado
- **WHEN** se inspeccionan sus relaciones
- **THEN** hay al menos un libro sin género, al menos un libro con un solo autor y al menos un libro con varios autores, sin crear entidades adicionales para lograrlo

### Requirement: Catálogo renderizado desde el array de libros con relaciones resueltas

El sistema SHALL generar `#listado-catalogo` a partir del array de libros al cargar la página, sustituyendo el `article` de ejemplo estructural. Cada libro presentará título, ISBN, editorial, género o el texto literal «Sin clasificar», autores y precio, con las relaciones resueltas desde los arrays.

#### Scenario: Render inicial completo

- **GIVEN** `index.html` abierto por `file://`
- **WHEN** termina de cargarse la página
- **THEN** `#listado-catalogo` contiene un `article.tarjeta-libro` por cada libro del array y el `article` de ejemplo estructural no permanece como contenido del catálogo renderizado

#### Scenario: Campos por libro con relaciones resueltas

- **GIVEN** una tarjeta renderizada
- **WHEN** se inspeccionan sus campos en el DOM
- **THEN** presenta título, ISBN, editorial (nombre resuelto desde el array de editoriales), género o «Sin clasificar», autores (nombres resueltos desde el array de autores) y precio

#### Scenario: Libro sin género muestra el literal exacto

- **GIVEN** un libro cuyo género es nulo
- **WHEN** se renderiza su tarjeta
- **THEN** su campo de género muestra exactamente «Sin clasificar» y los demás libros muestran su género real

#### Scenario: Un autor versus varios autores

- **GIVEN** libros con un solo autor y libros con varios autores
- **WHEN** se renderizan sus tarjetas
- **THEN** el libro de un autor muestra un nombre y el libro de varios autores muestra todos sus nombres concatenados, sin duplicados ni referencias rotas

#### Scenario: Catálogo vacío (estado defensivo)

- **GIVEN** un array de libros vacío
- **WHEN** el catálogo intenta renderizar
- **THEN** `#mensaje-catalogo-vacio` queda visible y `#listado-catalogo` queda sin artículos

### Requirement: Filtro por título sin distinción de mayúsculas, con coincidencia parcial y trim

El sistema SHALL filtrar el catálogo por título ignorando mayúsculas/minúsculas, encontrando coincidencias parciales en cualquier posición y eliminando espacios sobrantes de los extremos. Una entrada vacía o solo espacios SHALL mostrar el catálogo completo; una entrada sin coincidencias SHALL mostrar `#mensaje-sin-resultados` y ocultar el listado; con coincidencias SHALL ocultar el mensaje y mostrar el listado.

#### Scenario: Búsqueda vacía muestra el catálogo completo

- **GIVEN** el catálogo renderizado
- **WHEN** se envía el buscador con el campo vacío
- **THEN** se muestran todos los libros, `#mensaje-sin-resultados` queda oculto y no hay recarga de página

#### Scenario: Búsqueda solo con espacios muestra el catálogo completo

- **GIVEN** el catálogo renderizado
- **WHEN** se envía el buscador con una entrada de solo espacios
- **THEN** tras aplicar `trim` el resultado es el catálogo completo, idéntico al de la búsqueda vacía

#### Scenario: Mayúsculas y minúsculas producen los mismos resultados

- **GIVEN** el catálogo renderizado
- **WHEN** se busca «harry» y luego «HARRY»
- **THEN** ambas entradas devuelven exactamente los mismos libros coincidentes

#### Scenario: Coincidencia parcial al inicio del título

- **GIVEN** el catálogo renderizado
- **WHEN** se escribe un texto que coincide con el inicio de un título
- **THEN** se muestra solo ese libro y los demás que cumplan la misma condición

#### Scenario: Coincidencia parcial en el medio del título

- **GIVEN** el catálogo renderizado
- **WHEN** se escribe un texto contenido en el medio de un título
- **THEN** se muestra solo el libro que contiene esa subcadena

#### Scenario: Coincidencia parcial al final del título

- **GIVEN** el catálogo renderizado
- **WHEN** se escribe un texto que coincide con el final de un título
- **THEN** se muestra solo el libro cuyo título termina en esa subcadena

#### Scenario: Sin coincidencias muestra el mensaje y oculta el listado

- **GIVEN** el catálogo renderizado
- **WHEN** se escribe un texto que no coincide con ningún título
- **THEN** `#mensaje-sin-resultados` queda visible sin `hidden` y `#listado-catalogo` queda oculto y sin artículos

#### Scenario: Volver al catálogo completo tras una búsqueda sin resultados

- **GIVEN** el estado sin resultados
- **WHEN** se limpia la búsqueda o se escribe un texto con coincidencias
- **THEN** `#mensaje-sin-resultados` vuelve a ocultarse, el listado vuelve a mostrarse y contiene los libros correspondientes

### Requirement: Envío del buscador sin recarga y filtrado en vivo con la misma lógica

El sistema SHALL procesar el `submit` de `#buscador-catalogo` con `preventDefault` (sin recarga de página) y SHALL reaccionar al evento `input` de `#busqueda-titulo` filtrando en vivo mientras se escribe. Ambas vías SHALL compartir exactamente la misma lógica de filtrado, renderizado y mensajes.

#### Scenario: El envío no recarga la página

- **GIVEN** el catálogo renderizado
- **WHEN** el usuario presiona «Buscar» o envía el formulario con Enter
- **THEN** se aplica el filtro, no se produce navegación ni recarga (el `action="#"` no se sigue) y la consola no registra errores

#### Scenario: El filtro en vivo refiltra con cada tecla

- **GIVEN** el catálogo renderizado
- **WHEN** el usuario escribe o borra en `#busqueda-titulo` sin presionar «Buscar»
- **THEN** cada evento `input` actualiza el listado, el mensaje de sin-resultados y el estado del listado

#### Scenario: Ambas vías producen resultados equivalentes

- **GIVEN** una misma entrada de búsqueda
- **WHEN** se aplica vía `submit` y vía `input`
- **THEN** el catálogo renderizado y los estados de los mensajes son idénticos en ambos casos

### Requirement: Scripts externos enlazados y ganchos existentes preservados

El sistema SHALL vivir en archivos externos bajo `js/` enlazados desde `index.html` con `defer`, en orden: datos antes que comportamiento. Los ganchos existentes (`#buscador-catalogo`, `#busqueda-titulo`, `#listado-catalogo`, `#mensaje-sin-resultados`, `#mensaje-catalogo-vacio`) SHALL permanecer sin renombrar, y los datos quedarán expuestos para su reutilización en los Ejercicios 4–5 sin implementar altas ni ventas.

#### Scenario: Scripts enlazados con defer y en orden

- **GIVEN** `index.html`
- **WHEN** se inspecciona el final del documento
- **THEN** existen exactamente dos `<script>` locales con `defer` que cargan `js/datos.js` antes que `js/catalogo.js`, sin alterar ids, name, semántica ni clases

#### Scenario: Ganchos intactos y datos reutilizables

- **GIVEN** el DOM tras el change
- **WHEN** se contrasta con la lista de ganchos
- **THEN** los cinco ganchos del catálogo existen con su id exacto, los arrays de datos quedan accesibles para futuros scripts y no se implementa comportamiento de altas ni de ventas

### Requirement: Código organizado en funciones con responsabilidades reconocibles

El sistema SHALL organizar el código en funciones unitarias con responsabilidades reconocibles: acceso a datos, construcción de índices, resolución de relaciones, normalización de la búsqueda, filtrado, renderizado, manejo de mensajes y registro de eventos; los handlers de eventos SHALL ser delgados y delegar en esas funciones.

#### Scenario: Inspección de responsabilidades

- **GIVEN** el código fuente de los archivos JS
- **WHEN** se revisa su estructura
- **THEN** cada responsabilidad mencionada reside en una o más funciones con nombres comprensibles en español, declaradas antes de usarse, y no hay lógica monolítica dentro de los handlers

### Requirement: Inserción segura de datos y de la búsqueda en el DOM

El sistema SHALL insertar todo texto generado (datos de libros) y toda entrada de usuario exclusivamente como texto en el DOM (`textContent` o `createElement`), sin interpretación de marcado. No SHALL asignarse entrada de usuario ni datos a `innerHTML`.

#### Scenario: Caracteres especiales en la búsqueda no rompen la interfaz

- **GIVEN** el catálogo renderizado
- **WHEN** se escribe una búsqueda con `<`, `>`, `&` y comillas
- **THEN** no se ejecuta marcado, no hay errores en consola, la interfaz no se rompe y el filtro matchea o no únicamente según los títulos

#### Scenario: Datos con caracteres especiales se muestran literalmente

- **GIVEN** un libro cuyo título contiene un carácter especial (p. ej. `&`)
- **WHEN** se inspecciona su tarjeta en el DOM
- **THEN** el texto aparece literalmente en un nodo de texto, no como HTML interpretado

### Requirement: Funcionamiento local sin red

El sistema SHALL funcionar abierto como archivo local (`file://`) sin servidor ni red: cero `fetch`, XHR o peticiones, verificado en Chrome/Firefox actuales con la consola sin errores.

#### Scenario: Apertura local sin peticiones ni errores

- **GIVEN** `index.html` abierto por doble clic
- **WHEN** se usa el catálogo y el filtro con DevTools abierto
- **THEN** Network no registra `fetch`/XHR y la consola queda limpia

### Requirement: Convenciones de código y cambios mínimos de HTML y CSS

Los archivos JS SHALL residir bajo `js/` en minúsculas con guiones, con indentación de 2 espacios, nombres de funciones y variables en español y sin comentarios en el código fuente. `index.html` SHALL cambiar solo por la inclusión de los dos `<script defer>`; `css/styles.css` SHALL quedar sin cambios, reutilizando las clases existentes.

#### Scenario: Inspección de convenciones

- **GIVEN** los archivos JS nuevos
- **WHEN** se abren
- **THEN** los nombres de archivo cumplen minúsculas-con-guiones, el código usa indentación de 2 espacios, identificadores en español y no contiene comentarios

#### Scenario: HTML y CSS prácticamente intactos

- **GIVEN** el diff de `index.html` y `css/styles.css`
- **WHEN** se revisa
- **THEN** `index.html` solo agrega los dos tags `<script defer>` y `css/styles.css` no tiene modificaciones
