# Design — ejercicio-3-catalogo-datos-js

## Context

Ver `proposal.md` (Why) — aquí solo lo necesario para decidir el cómo. Estado verificado: Ej. 1 y 2 aprobados (`index.html` con los ganchos de la vista Catálogo; `css/styles.css` con `.tarjeta-libro`, `#listado-catalogo` Grid, `.mensaje`/`.mensaje-error`/`.mensaje-vacio`); sin carpeta `js/`, sin archivos `.js`, sin `<script>` en `index.html` [Verificado — lectura de archivos]. Entorno: `file://`, JavaScript nativo ES moderno sin módulos, sin npm ni servidor. Decisiones del usuario ya resueltas: D-1 (filtro en vivo vía `input` además del `submit`), D-2 (dos archivos JS), D-3 (dataset concreto aprobable ahora, definido abajo), D-4 (specs aprobados intactos, desfase anotado como pendiente de sync).

## Goals / Non-Goals

**Goals:**
- Catálogo renderizado desde el array de libros con relaciones resueltas, filtro por título por ambas vías (envío y tecleo) compartiendo una sola lógica, e inserción segura en el DOM.
- Dataset mínimo autorizado con integridad referencial estricta, declarado como ejemplos de práctica y aprobable junto con este PLAN.
- Dejar los datos y ganchos reutilizables para Ej. 4–5 sin comportamiento de altas/ventas.

**Non-Goals:**
- Todo lo excluido del proposal (Ej. 4/5/6, ABM, fetch/red, librerías, ordenamiento, paginación, tokenización).
- Modificar `css/styles.css` o los specs aprobados `estructura-pantallas-html` y `presentacion-css-adaptable` (D-4: desfases quedan como pendiente de sync posterior, anotados en el proposal).
- Tests automatizados: **Strict TDD no aplica** — no hay test runner ni npm (JS puro por `file://`); la verificación es manual según el prompt (Fase 3), detallada al final.

## Decisions

1. **Dos archivos JS con `defer` (D-2).** `js/datos.js` solo declara arrays; `js/catalogo.js` concentra índices, resolución, filtro, render, mensajes y eventos. *Alternativa descartada:* un único archivo — separa menos datos/comportamiento y complica la reutilización futura (Ej. 4–5 leen datos sin importar comportamiento del catálogo). Ambos con `<script defer>` antes de `</body>`, **datos.js primero**; `defer` garantiza DOM parseado y orden secuencial de ejecución sin `DOMContentLoaded` explícito.
2. **Índices id→nombre construidos una vez al arranque.** `construirIndiceEditoriales/Generos/Autores` devuelven mapas simples (objetos literales `{ id: nombre }`) que los `resolver*` consultan en O(1). *Alternativa descartada:* `find()` por tarjeta — funciona con 6 libros pero acopla resolución a búsquedas lineales repetidas.
3. **Una sola lógica de filtrado/render para ambas vías (D-1).** El handler `submit` (con `preventDefault`) y el handler `input` (tecleo) son funciones delgadas que solo delegan en `actualizarCatalogo(texto)`. *Alternativa descartada:* duplicar filtrado en cada handler — viola R-05 y genera divergencias de comportamiento.
4. **Filtrado por `trim` + `toLowerCase()` + `includes()` sobre el título.** Suficiente para parcial inicio/medio/final y case-insensitive, sin tokenización (excluida). *Alternativa descartada:* regex — complejidad innecesaria y riesgo con caracteres especiales de la búsqueda.
5. **DOM solo con `textContent` / `createElement` / `replaceChildren`**; prohibido `innerHTML`/`insertAdjacentHTML` con datos o entrada de usuario (R-06). La tarjeta replica exactamente la estructura del `article` de ejemplo (h3 + 6 `p>span`: Título, ISBN, Editorial, Género, Autores, Precio), porque ese es el campo esperado por `estructura-pantallas-html`. Precio con dos decimales (`toFixed(2)`), coherente con el `0.00` del ejemplo.
6. **Estado «sin resultados» = mensaje visible + listado oculto.** `mostrarSinResultados()` quita `hidden` a `#mensaje-sin-resultados` y agrega `hidden` a `#listado-catalogo` (y viceversa `ocultarSinResultados()`), alineado con R-03 («oculta el listado de resultados»). El render vacía siempre el contenedor (el `article` de ejemplo y su comentario HTML desaparecen en el primer render) y lo repuebla.
7. **Convenciones del proyecto:** indentación de 2 espacios, identificadores en español, archivos en minúsculas con guiones, una responsabilidad por función, funciones declaradas antes de usarse, **sin comentarios en el código fuente** (regla del proyecto), sin módulos (`type="module"` no aplica en `file://`).
8. **Verificación manual, sin TDD estricto** (ver sección «Verification (manual)»): no existe runner de tests ni `package.json`; el prompt exige verificación manual reproducible en Fase 3.

## Entidades y datos (R-01, D-3)

### Esquemas (identificadores estables tipo string con prefijo y número)

| Entidad | Esquema | Notas |
| --- | --- | --- |
| Editorial | `{ idEditorial: string, nombre: string }` | exactamente 2 |
| Género | `{ idGenero: string, nombre: string }` | exactamente 2 |
| Autor | `{ idAutor: string, nombre: string }` | exactamente 3 |
| Libro | `{ idLibro: string, titulo: string, isbn: string, idEditorial: string, idGenero: string \| null, idsAutores: string[], precio: number }` | exactamente 6; `idGenero: null` = sin género; `idsAutores` con ≥1 id |
| Cliente | `{ idCliente: string, nombreCompleto: string, email: string }` | exactamente 3; sin uso funcional en Ej. 3 (R-09) |

### Reglas de integridad referencial

1. Todo `idEditorial` de un libro existe en `editoriales` (1 editorial por libro, obligatoria).
2. Todo id de `idsAutores` existe en `autores` y el array tiene ≥1 elemento.
3. `idGenero` es `null` o referencia un género existente.
4. Sin entidades fuera del mínimo (6/2/2/3/3) y sin referencias colgantes.
5. Cobertura obligatoria dentro del mínimo: ≥1 libro sin género, ≥1 libro con varios autores, ≥1 libro con un solo autor, ≥1 título con carácter especial.
6. Defensiva (no presente en el dataset): si un id no resolviera, se muestra texto alternativo sin lanzar excepción — editorial → «Editorial no encontrada», género → «Sin clasificar», autor no encontrado → se omite.

### Resolución de relaciones en el render

- Editorial: índice id→nombre → `resolverNombreEditorial` muestra `nombre`.
- Género: `null` o sin match → literal «Sin clasificar»; si existe → `nombre` (`resolverGenero`).
- Autores: `idsAutores` → nombres vía índice, unidos con `, ` (`resolverNombresAutores`).

### Dataset concreto (ejemplos de práctica — requiere aprobación con este PLAN)

> Todo el contenido siguiente es **ficticio y de práctica** (D-3): no son datos reales, ni autores/editoriales reales; es el conjunto mínimo autorizado, sin datos adicionales. Pertenecerá a `js/datos.js` como declaraciones `const` en ámbito global de script clásico.

```js
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
```

Cobertura de casos dentro del mínimo:

| Caso | Dónde queda cubierto |
| --- | --- |
| Libro sin género → «Sin clasificar» | `lib-04` (`idGenero: null`) |
| Varios autores | `lib-02` (2), `lib-05` (2) |
| Un solo autor | `lib-01`, `lib-03`, `lib-04`, `lib-06` |
| Carácter especial en datos (`&`) | `lib-05` («Cuentos de nieve & ceniza») |
| Entrada CA-02 «harry»/«HARRY» con match real | `lib-06` («Harry y la biblioteca secreta») |
| Parcial inicio / medio / final | ej.: «Cuaderno…» / «biblioteca» / «…medianoche» |
| Ambas editoriales y ambos géneros en uso | edi-01: lib-01/03/05 · edi-02: lib-02/04/06 · gen-01: lib-01/05/06 · gen-02: lib-02/03 |
| Los 3 autores en uso | aut-01: lib-01/02/05 · aut-02: lib-02/04 · aut-03: lib-03/05/06 |

## Arquitectura de archivos (R-04, R-08)

| Archivo | Rol | Estado |
| --- | --- | --- |
| `js/datos.js` | Solo los cinco arrays (`const`, ámbito global de script clásico) — accesibles para Ej. 4–5 sin IIFE ni módulos | nuevo |
| `js/catalogo.js` | Índices, resolución, normalización, filtrado, render, mensajes, eventos y arranque | nuevo |
| `index.html` | **Única modificación:** dos `<script defer>` antes de `</body>`, en orden: `js/datos.js` luego `js/catalogo.js`; nada más cambia (ids, name, semántica, clases intactos) | modificar (2 tags) |
| `css/styles.css` | **Sin cambios** — se reutilizan `.tarjeta-libro`, `#listado-catalogo`, `.mensaje*` y el manejo de `hidden` del HTML | sin cambios |

## Funciones (R-05) — responsabilidad única, en español, declaradas antes de usarse

Orden sugerido de declaración en `js/catalogo.js` (los índices se construyen una vez, al inicio del comportamiento):

| # | Función | Responsabilidad |
| --- | --- | --- |
| 1 | `obtenerLibros()` | Devolver el array de libros (punto único de acceso a los datos). |
| 2 | `construirIndiceEditoriales()` | Devolver mapa id→nombre de `editoriales`. |
| 3 | `construirIndiceGeneros()` | Devolver mapa id→nombre de `generos`. |
| 4 | `construirIndiceAutores()` | Devolver mapa id→nombre de `autores`. |
| 5 | `resolverNombreEditorial(libro)` | Nombre de la editorial del libro (fallback «Editorial no encontrada»). |
| 6 | `resolverGenero(libro)` | Nombre del género o literal «Sin clasificar». |
| 7 | `resolverNombresAutores(libro)` | Nombres de autores resueltos y unidos por `, `. |
| 8 | `normalizarTexto(texto)` | `trim()` + `toLowerCase()` de la entrada. |
| 9 | `filtrarPorTitulo(libros, textoNormalizado)` | Libros cuyo título (normalizado) contiene el texto normalizado. |
| 10 | `crearTarjetaLibro(libro)` | Un `article.tarjeta-libro` con `createElement`/`textContent` (h3 con el título + 6 `p>span`, precio `toFixed(2)`). |
| 11 | `renderizarCatalogo(librosAMostrar)` | Vaciar `#listado-catalogo` (`replaceChildren`) y agregar una tarjeta por libro. |
| 12 | `mostrarSinResultados()` | Estado «sin resultados»: quitar `hidden` a `#mensaje-sin-resultados`, agregar `hidden` a `#listado-catalogo`. |
| 13 | `ocultarSinResultados()` | Inverso del anterior (mensaje oculto, listado visible). |
| 14 | `actualizarCatalogo(textoBusqueda)` | Orquestador único: normalizar → filtrar → renderizar → alternar estados/mensajes (incluye `#mensaje-catalogo-vacio` solo si el array de libros estuviera vacío). |
| 15 | `manejarEnvioBusqueda(evento)` | Handler delgado: `evento.preventDefault()` + delegar en `actualizarCatalogo` con el valor del input. |
| 16 | `manejarEntradaBusqueda(evento)` | Handler delgado del `input`: delegar en `actualizarCatalogo` con `evento.target.value`. |
| 17 | `registrarEventos()` | Asociar `submit` a `#buscador-catalogo` e `input` a `#busqueda-titulo`. |
| — | (arranque, al final del archivo) | `actualizarCatalogo("")` + `registrarEventos()` — con `defer` el DOM ya existe. |

## Eventos (D-1)

- `submit` sobre `#buscador-catalogo` [gancho verificado] → `manejarEnvioBusqueda` con `preventDefault` (sin recarga; `action="#"` no se sigue).
- `input` sobre `#busqueda-titulo` [gancho verificado] → `manejarEntradaBusqueda` (filtrado en vivo).
- Ambos delegan en `actualizarCatalogo` → misma lógica garantizada por construcción.

## Estados

| Estado | Condición | `#listado-catalogo` | `#mensaje-sin-resultados` | `#mensaje-catalogo-vacio` |
| --- | --- | --- | --- | --- |
| Catálogo completo | Al cargar; búsqueda vacía o solo espacios | Visible, con todos los libros | Oculto (`hidden`) | Oculto |
| Con resultados | Filtro con ≥1 coincidencia | Visible, solo los coincidentes | Oculto | Oculto |
| Sin resultados | Filtro sin coincidencia | Oculto (`hidden`) y vacío | Visible (sin `hidden`) | Oculto |
| Catálogo vacío (defensivo) | `libros.length === 0` | Vacío | Oculto | Visible |

Nota de verificación [Verificado por lectura de `css/styles.css`]: ninguna regla fija `display` sobre `.mensaje` fuera de `.mensaje:empty` (el mensaje de sin-resultados tiene texto, así que alternar `hidden` lo muestra/oculta correctamente); `hidden` global sobre el `div#listado-catalogo` no tiene regla que lo anule. Confirmar en Fase 3.

## Inserción segura (R-06)

- Todo texto (títulos, ISBN, nombres, precios, cualquier entrada de usuario) entra al DOM vía `textContent` o `createElement`.
- Prohibido `innerHTML`/`insertAdjacentHTML` con datos o entrada.
- La búsqueda nunca se inserta en el DOM como marcado: solo se compara; si se mostrara, se mostraría como texto (caso E-12 cubierto por el filtro, no por render).

## Risks / Trade-offs

- [`hidden` podría no ocultar si una regla CSS futura fija `display`] → leído hoy: no existe tal regla; re-verificar en Fase 3 con DevTools.
- [Sustituir el `article` de ejemplo rompe la referencia estructural] → la tarjeta renderizada replica exactamente el mismo patrón de campos (h3 + 6 `p>span`); el comentario HTML del ejemplo también se elimina al vaciar el contenedor.
- [Doble disparo (`input` + `submit`) podría duplicar trabajo] → el `submit` con Enter vuelve a ejecutar la misma lógica sobre el mismo estado: resultado idéntico e inocuo (render es idempotente); se conserva porque R-04 exige `preventDefault` del envío.
- [Archivos `js/` bloqueados bajo `file://`] → comportamiento estándar de Chrome/Firefox es permitir `<script src>` relativos; supuesto declarado en el proposal, se confirma en Fase 3.
- [Dataset aprobado vs. datos futuros del Ej. 4] → arrays abiertos (sin `Object.freeze`): el Ej. 4 podrá agregar libros/clientes; aquí no se alteran.

## Accepted limitation

`#listado-catalogo` declara `display: grid` en `css/styles.css`, lo que anula el presentational hint débil del atributo `hidden` (Firefox `html.css`; WHATWG #7650): al buscar sin coincidencias el contenedor puede conservar `display: grid` calculado en DevTools. Con cero resultados el contenedor se vacía con `replaceChildren`, de modo que nada queda visible. **Opción (a) aceptada por el usuario (2026-10-20):** sin cambio de CSS. La opción (b), `[hidden] { display: none !important; }`, queda como posible fix futuro de una línea, **NO aplicado**.

## Migration Plan

Despliegue = crear `js/datos.js`, `js/catalogo.js` y agregar dos tags `<script defer>` en `index.html`. Rollback = eliminar los dos tags (o los archivos): la página vuelve exactamente al estado aprobado Ej. 1/2. Sin datos persistentes, sin red, sin dependencias.

## Verification (manual)

Sin runner de tests (JS puro por `file://`, sin npm): **Strict TDD no aplica**; verificación manual reproducible en Chrome/Firefox, registrando evidencia en `tasks.md`:

1. **Apertura `file://`**: doble clic en `index.html` → consola sin errores; `#listado-catalogo` con 6 tarjetas y sin el artículo de ejemplo (CA-01).
2. **Relaciones (CA-01)**: por tarjeta, editorial/género/autores resueltos desde arrays; `lib-04` muestra «Sin clasificar»; `lib-02`/`lib-05` muestran dos autores; `lib-01` muestra uno.
3. **Matriz de filtro CA-02**: vacía → 6 libros; solo espacios → 6 libros; «harry» y «HARRY» → mismos resultados (1 libro); parcial inicio («Cuaderno»), medio («biblioteca»), final («medianoche») → solo el libro correspondiente; «zzzz» → `#mensaje-sin-resultados` visible y listado oculto.
4. **Filtro en vivo (D-1)**: escribir/borrar sin presionar «Buscar» refiltra con cada tecla; misma entrada vía `input` y vía `submit` → mismos resultados.
5. **Caracteres especiales (CA-04)**: buscar `<`, `>`, `&`, comillas → sin ejecución de marcado, sin errores de consola; título de `lib-05` («&») visible literal en el DOM (nodo de texto).
6. **Sin recarga (CA-03)**: «Buscar»/Enter no recarga (marcador de red/consola estable, scroll y valor del input sin reset).
7. **Network/consola (CA-05)**: DevTools → Network sin `fetch`/XHR (solo archivos locales); consola limpia en Chrome y Firefox.
8. **Inspección de código (CA-03)**: ganchos intactos, funciones con responsabilidades reconocibles, solo 2 tags `<script defer>` agregados, `css/styles.css` sin diff.

## Open Questions

Ninguna. El dataset concreto está definido arriba y su aprobación forma parte de la aprobación de este PLAN (D-3). El único dato pendiente no bloqueante (`{{DATO_PENDIENTE: página y puntaje del Ejercicio 3 en el PDF}}`) queda documentado en `proposal.md` y no afecta este diseño.
