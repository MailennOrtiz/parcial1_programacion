# Tasks — ejercicio-3-catalogo-datos-js

> Fase 2 — PLAN (formato exigido por `docs/prompts/punto-3.md`, Fase 2). Cada tarea indica: identificador + resultado esperado, requisito/CA cubierto, archivos a crear/modificar, dependencias/orden y comprobación concreta de cierre (línea del checkbox).
>
> Alcance: solo Ejercicio 3. **HTML/CSS: sin cambios excepto los dos `<script defer>` en `index.html`** (T-3.1); `css/styles.css` sin modificaciones. Sin tests automatizados (verificable): **Strict TDD no aplica** — JS puro por `file://`, sin npm ni runner; la verificación es manual (Grupo 4). Dataset aprobado: `design.md` (D-3).

## 1. Datos en memoria

- [x] 1.1 Crear `js/datos.js` con los cinco arrays `const` del dataset aprobado en `design.md` (6 libros, 2 editoriales, 2 géneros, 3 autores, 3 clientes ficticios declarados como ejemplos de práctica, identificadores estables, sin comentarios, indentación 2 espacios) — Comprobación: el archivo existe en `js/`, declara exactamente esos volúmenes sin entidades adicionales, y cada `idEditorial`/`idGenero` (no nulo)/`idsAutores` de `libros` existe en su array (revisión manual cruzada, sin referencias colgantes).
  - Cubre: R-01, R-08, CA-01
  - Archivos: crear `js/datos.js`
  - Deps/orden: apruebe primero el dataset de `design.md`; primera tarea de ejecución

## 2. Comportamiento del catálogo (`js/catalogo.js`)

- [x] 2.1 Crear `js/catalogo.js` con `obtenerLibros`, `construirIndiceEditoriales`, `construirIndiceGeneros`, `construirIndiceAutores`, `resolverNombreEditorial`, `resolverGenero` (fallback «Sin clasificar») y `resolverNombresAutores` (unión con `, `), más la construcción de los tres índices una vez — Comprobación: por inspección del código, cada función tiene una sola responsabilidad, nombres en español, está declarada antes de usarse, usa 2 espacios y no hay comentarios.
  - Cubre: R-01, R-02 (resolución), R-05, R-08
  - Archivos: crear `js/catalogo.js`
  - Deps/orden: requiere T-1.1
- [x] 2.2 Agregar `normalizarTexto` (`trim` + minúsculas) y `filtrarPorTitulo` (búsqueda parcial sobre el título normalizado) — Comprobación: por inspección del código, la normalización se aplica tanto a la entrada como a los títulos y el filtrado no tokeniza ni usa regex/red.
  - Cubre: R-03, R-05, R-07 (sin red)
  - Archivos: modificar `js/catalogo.js`
  - Deps/orden: requiere T-2.1
- [x] 2.3 Agregar `crearTarjetaLibro` (estructura exacta del ejemplo HTML: `article.tarjeta-libro` + `h3` + 6 `p>span` — Título, ISBN, Editorial, Género, Autores, Precio con `toFixed(2)`, solo `createElement`/`textContent`) y `renderizarCatalogo` (vacia `#listado-catalogo` con `replaceChildren` y repuebla) — Comprobación: por inspección del código, no hay `innerHTML`/`insertAdjacentHTML` y el orden de campos coincide con el `article` de ejemplo de `index.html`.
  - Cubre: R-02, R-06, R-05
  - Archivos: modificar `js/catalogo.js`
  - Deps/orden: requiere T-2.1
- [x] 2.4 Agregar `mostrarSinResultados` (mensaje visible + `#listado-catalogo` con `hidden`), `ocultarSinResultados` (inverso) y el orquestador `actualizarCatalogo(textoBusqueda)` (normalizar → filtrar → renderizar → alternar mensajes; `#mensaje-catalogo-vacio` solo si `libros.length === 0`) — Comprobación: por inspección del código, `actualizarCatalogo` es la única ruta que define los estados de la tabla de estados de `design.md` y los handlers no contienen lógica de filtrado.
  - Cubre: R-03, R-05, estados (E-08/E-16)
  - Archivos: modificar `js/catalogo.js`
  - Deps/orden: requiere T-2.2 y T-2.3
- [x] 2.5 Agregar `manejarEnvioBusqueda` (con `preventDefault`), `manejarEntradaBusqueda`, `registrarEventos` (listener `submit` en `#buscador-catalogo` + listener `input` en `#busqueda-titulo`) y el arranque al final del archivo (`actualizarCatalogo("")` + `registrarEventos()`) — Comprobación: por inspección del código, ambas vías delegan en `actualizarCatalogo`, el `submit` llama `preventDefault` y el arranque es la última línea (con `defer` el DOM ya existe).
  - Cubre: R-03, R-04, R-05, CA-03; D-1 (filtro en vivo)
  - Archivos: modificar `js/catalogo.js`
  - Deps/orden: requiere T-2.4

## 3. Enlace desde `index.html`

- [x] 3.1 Agregar exactamente dos tags antes de `</body>`: `<script src="js/datos.js" defer></script>` y luego `<script src="js/catalogo.js" defer></script>` — **Única modificación de HTML de todo el change; sin ningún otro cambio en HTML y cero cambios en `css/styles.css`** — Comprobación: diff de `index.html` muestra solo esas dos líneas (y nada más), ids/name/semántica/clases intactos, `css/styles.css` sin diff.
  - Cubre: R-04, R-08, CA-03
  - Archivos: modificar `index.html`; `css/styles.css` sin cambios
  - Deps/orden: requiere T-1.1 y T-2.1..T-2.5 (los archivos deben existir antes de enlazarlos)

## 4. Verificación manual (matriz CA-01..CA-05)

Abrir `index.html` por doble clic (`file://`) en Chrome/Firefox con DevTools. Registrar evidencia en cada tarea (ningún control no ejecutado se da por aprobado).

- [x] 4.1 **CA-01 — Catálogo y relaciones en el DOM:** 6 `article.tarjeta-libro` sin el artículo de ejemplo; por tarjeta: título, ISBN, editorial resuelta, género o «Sin clasificar» (`lib-04`), autores resueltos (1 autor en `lib-01`; 2 autores en `lib-02`/`lib-05`) y precio — Comprobación: inspección del DOM en DevTools coincide con el dataset de `design.md`.
  - Cubre: R-01, R-02
  - Evidencia (Fase 3): ESTÁTICA + HARNESS NODE (sin navegador; harness fuera del repo con stub de DOM, 18/18 PASS): arranque con 6 tarjetas y el ejemplo eliminado (`replaceChildren`), campos en orden Título/ISBN/Editorial/Género/Autores/Precio (p. ej. `12990.50`), `lib-04` → «Sin clasificar», `lib-01` 1 autor, `lib-02`/`lib-05` 2 autores unidos con `, `, volúmenes 6/2/2/3/3 y cero referencias colgantes. **VERIFICACIÓN DE NAVEGADOR (usuario, 2026-10-20):** el usuario ejecutó la inspección visual del DOM en DevTools y confirmó el resultado con aprobación de cierre («perfecto, prosigue»). Atribución: verificación estática + harness Node por el agente; verificación de navegador por el usuario.
- [x] 4.2 **CA-02 — Matriz de filtro + D-1:** vacía → 6 libros; solo espacios → 6 libros; «harry»/«HARRY» → mismos resultados; parcial inicio («Cuaderno»), medio («biblioteca»), final («medianoche») → solo el libro correspondiente; «zzzz» → `#mensaje-sin-resultados` visible y `#listado-catalogo` oculto; reiterar vacío vuelve al completo; filtro en vivo: escribir/borrar en el input refiltra con cada tecla y da idénticos resultados que el envío del formulario — Comprobación: las 5 entradas de CA-02 + tecleo en vivo ejecutadas y observadas sin recargar.
  - Cubre: R-03, CA-02; D-1
  - Evidencia (Fase 3): ESTÁTICA + HARNESS NODE (sin navegador): matriz completa PASS — vacía→6; «   »→6; «harry»≡«HARRY» (1: Harry y la biblioteca secreta); «Cuaderno»→lib-04; «biblioteca»→lib-06; «medianoche»→lib-01; «zzzz»→0 con `#mensaje-sin-resultados` visible y `#listado-catalogo` con `hidden`; reiterar vacío→6; `submit` e `input` delegan en `actualizarCatalogo` con idénticos resultados. **VERIFICACIÓN DE NAVEGADOR (usuario, 2026-10-20):** el usuario ejecutó las 5 entradas + tecleo en vivo en navegador y confirmó el resultado («perfecto, prosigue»). Atribución: verificación estática + harness Node por el agente; verificación de navegador por el usuario. **LIMITACIÓN ACEPTADA — opción (a) (usuario, 2026-10-20):** `#listado-catalogo` fija `display: grid` (CSS autor) y el atributo `hidden` se implementa como presentational hint débil (Firefox `html.css` y WHATWG #7650) → el contenedor puede quedar con `display: grid` calculado en DevTools; con cero resultados el contenedor se vacía con `replaceChildren` y nada queda visible, por lo que se acepta **sin tocar `css/styles.css`** (opción (a)). La opción (b), `[hidden] { display: none !important; }`, queda como posible fix futuro de una línea, **NO aplicado**.
- [x] 4.3 **CA-03 — Estructura, ganchos, sin recarga y código:** dos `<script defer>` en `index.html` (datos primero); ganchos `#buscador-catalogo`, `#busqueda-titulo`, `#listado-catalogo`, `#mensaje-sin-resultados`, `#mensaje-catalogo-vacio` con sus ids exactos; «Buscar»/Enter no recarga la página; funciones con responsabilidades reconocibles por inspección — Comprobación: recorrido de envío con DevTools abierto (sin navegación) + revisión de código de `js/catalogo.js`.
  - Cubre: R-04, R-05, R-08
  - Evidencia (Fase 3): ESTÁTICA: `git diff index.html` = exactamente 2 líneas (`js/datos.js` antes que `js/catalogo.js`, ambos `defer`, antes de `</body>`; solo 2 `<script>` en todo el documento); `git diff css/styles.css` vacío; los 5 ganchos con su id exacto presentes en `index.html` (verificado por regex `id="…"`); `preventDefault` en `manejarEnvioBusqueda` (`js/catalogo.js:135`); 17 funciones en español con responsabilidad única, declaradas antes de usarse (declaraciones líneas 1–149, arranque 151–152); `node --check` OK en ambos archivos. **VERIFICACIÓN DE NAVEGADOR (usuario, 2026-10-20):** el usuario verificó «Buscar»/Enter sin recarga en navegador con DevTools abierto y confirmó («perfecto, prosigue»). Atribución: verificación estática por el agente; verificación de navegador por el usuario.
- [x] 4.4 **CA-04 — Caracteres especiales:** buscar `<`, `>`, `&` y comillas (p. ej. `Harry & <algo>`) → sin ejecución de marcado, sin errores de consola, interfaz intacta; título de `lib-05` («Cuentos de nieve & ceniza») visible literalmente como nodo de texto en el DOM — Comprobación: búsquedas ejecutadas + inspección del nodo en DevTools + consola limpia durante la prueba.
  - Cubre: R-06
  - Evidencia (Fase 3): ESTÁTICA + HARNESS NODE: grep de `js/` sin `innerHTML`/`insertAdjacentHTML`/`outerHTML`; el stub del harness lanza excepción si se asignara `innerHTML` y no se lanzó; búsquedas «&», «Harry & <algo>» y con comillas se ejecutan sin error y matchean/no según el título; el título de `lib-05` llega como `textContent` literal «Cuentos de nieve & ceniza». **VERIFICACIÓN DE NAVEGADOR (usuario, 2026-10-20):** el usuario ejecutó las búsquedas en navegador con consola abierta e inspeccionó el nodo en DevTools, confirmando resultado («perfecto, prosigue»). Atribución: verificación estática + harness Node por el agente; verificación de navegador por el usuario.
- [x] 4.5 **CA-05 — Apertura local sin red:** recorrido completo del catálogo y el filtro con DevTools → Network sin `fetch`/XHR/peticiones (solo archivos locales `index.html`, CSS y los 2 JS), consola sin errores en Chrome y Firefox — Comprobación: captura/registro de Network y consola durante todo el recorrido.
  - Cubre: R-07
  - Evidencia (Fase 3): ESTÁTICA: cero `fetch`/XHR/WebSocket/`localStorage`/`sessionStorage`/`console` en `js/` (grep); sin imports/exports ni CDNs; solo 2 `<script src` locales con `defer` en `index.html`. **VERIFICACIÓN DE NAVEGADOR (usuario, 2026-10-20):** el usuario recorrió catálogo y filtro con pestaña Network y consola abiertos (Chrome/Firefox vía `file://`), confirmando cero peticiones externas y consola limpia («perfecto, prosigue»). Atribución: verificación estática por el agente; verificación de navegador por el usuario.
- [x] 4.6 **Cierre del change:** checklist final de `proposal.md` revisado — alcance completo y sin trabajo excluido (Ej. 4/5/6, ABM, red, librerías, orden/paginación), convenciones cumplidas (2 espacios, español, sin comentarios, minúsculas-con-guiones), `css/styles.css` y specs aprobados intactos, pendientes identificados ({{DATO_PENDIENTE: página y puntaje del Ejercicio 3 en el PDF}}; desfase de escenarios de specs quedando como pendiente de sync posterior según D-4) y evidencias de T-4.1..T-4.5 registradas — Comprobación: ningún control figura aprobado sin evidencia; fallidos/omitidos/pendientes listados explícitos.
  - Cubre: checklist adicional de cierre (fuente autoritativa)
  - Evidencia (Fase 3): REVISIÓN DE CIERRE completada — alcance completo y sin trabajo excluido (grep: sin `localStorage`, sin altas/ventas/ABM, sin orden/paginación; no se tocó nada de Ej. 4/5/6); convenciones cumplidas (2 espacios, sin tabs ni espacios finales, sin comentarios, identificadores en español, archivos en minúsculas); `css/styles.css` y los specs aprobados intactos (`git diff` vacío en ambos); pendientes identificados: {{DATO_PENDIENTE: página y puntaje del Ejercicio 3}}, desfase de specs por D-4 (queda como sync posterior, sin modificar los specs existentes) y limitación `hidden` vs `display:grid` aceptada como opción (a) (ver T-4.2). Verificación de navegador de T-4.1..T-4.5 **CERRADA** el 2026-10-20: ejecutada por el usuario y confirmada con «perfecto, prosigue»; el agente no ejecutó navegador (evidencia estática + harness Node por el agente, navegador por el usuario).
