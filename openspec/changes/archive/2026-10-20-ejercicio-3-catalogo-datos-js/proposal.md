# Proposal — ejercicio-3-catalogo-datos-js

> Change: `openspec/changes/ejercicio-3-catalogo-datos-js/` · Schema: spec-driven
> Fase 1 — SPEC (aprobada) · Fase 2 — PLAN (en curso, autorizada). Las decisiones D-1..D-4 fueron resueltas por el usuario (ver «Decisiones resueltas»); el dataset ficticio concreto se define en `design.md` para aprobación junto con este PLAN.

## Why

El frontend «Libreria Nya» tiene la vista Catálogo con su estructura HTML (Ej. 1, aprobado) y su presentación CSS (Ej. 2, aprobado), pero no existe JavaScript: no hay carpeta `js/`, ni archivos `.js`, ni `<script>` en `index.html` [Verificado — `index.html`, `css/styles.css`, inspección del repo]. Sin datos ni comportamiento, el catálogo muestra únicamente un `article` de ejemplo estructural y el buscador no filtra nada. El Ejercicio 3 del parcial (entrega 3 de 6) exige presentar el catálogo generado desde datos en memoria y filtrar por título, dejando ganchos y datos reutilizables para los Ejercicios 4–5 sin reestructurar lo aprobado.

**Objetivo:** especificar (y luego implementar solo tras aprobación) los arrays de datos con integridad referencial, el renderizado del catálogo en `#listado-catalogo` y el filtro por título case-insensitive/parcial/`trim`, sobre el HTML/CSS existentes.

**Resultado esperado:** al abrir `index.html` por `file://`, la vista Catálogo muestra los libros reales del array con todas sus relaciones resueltas; el buscador filtra por título sin recarga, al enviar el formulario y también mientras se escribe (D-1); los estados vacío/sin-resultados se manejan con los ganchos existentes; consola limpia; cero red; HTML y CSS prácticamente intactos (solo los dos `<script defer>` enlazados).

## What Changes

- **Nuevos archivos JS** (aprobado — D-2): `js/datos.js` (arrays de datos en memoria) y `js/catalogo.js` (índices, relaciones, filtro, render, mensajes, eventos), en minúsculas con guiones, indentación de 2 espacios, nombres en español, sin comentarios (convención del proyecto), sin módulos ni build.
- **`index.html`: modificación mínima y justificada** — solo agregar los dos `<script ... defer>` que enlazan los archivos JS nuevos (datos.js antes que catalogo.js, antes de `</body>`); ids, name, semántica, clases y ganchos permanecen intactos [aprobado; coincide con R-04/R-08].
- **`css/styles.css`: sin cambios** — el render reutiliza `.tarjeta-libro`, `#listado-catalogo` (Grid), `.mensaje`/`.mensaje-error`/`.mensaje-vacio` y el manejo de `hidden` del HTML; no se agregan ni modifican reglas [propuesta; verificado que las clases necesarias existen en `css/styles.css`].
- **Contenido de `#listado-catalogo`**: el `article.tarjeta-libro` de ejemplo estructural existente (y su comentario HTML) es sustituido por los artículos generados desde el array de libros al cargarse la página (R-02); el render inicial vacía el contenedor completo y lo repuebla [resuelto en `design.md`].
- **Datos ficticios de práctica**: exactamente el conjunto mínimo autorizado (6 libros, 2 editoriales, 2 géneros, 3 autores, 3 clientes), declarados como ejemplos y no como datos reales; el contenido concreto está definido en `design.md` para su aprobación junto con este PLAN (aprobado — D-3).
- **Sin cambios en specs existentes** (ver Capabilities): no se modifican requisitos de `estructura-pantallas-html` ni `presentacion-css-adaptable` en este change; las tensiones detectadas se difieren (ver «Tensiones detectadas»).

## Capabilities

### New Capabilities

- `catalogo-datos-y-filtro`: catálogo de libros renderizado en memoria con relaciones resueltas (editorial, género o «Sin clasificar», autores) y filtro por título sobre el buscador existente; cubre datos, render, estados del filtro e inserción segura en el DOM. Cada capability nuevo generará `openspec/specs/catalogo-datos-y-filtro/spec.md` en la Fase 2/3 correspondiente.

### Modified Capabilities

- Ninguno. Los specs existentes no pierden ni cambian requisitos: `estructura-pantallas-html` exige los ganchos y campos del catálogo (ya presentes) y `presentacion-css-adaptable` exige reutilizar clases y preservar ganchos (se cumple sin tocar CSS). Los escenarios de esos specs que today describen la entrega Ej. 1/2 sin JS se comentan como tensión diferida más abajo; este proposal no los modifica.

## Impact

- **Archivos nuevos:** `js/datos.js`, `js/catalogo.js` (aprobado — D-2).
- **Archivos modificados:** `index.html` (solo dos tags `<script defer>`, en ese orden).
- **Archivos no modificados:** `css/styles.css`, resto del HTML.
- **Dependencias:** cero. Sin npm, sin CDNs, sin red, sin librerías; ejecución por doble clic (`file://`).
- **Specs existentes:** sin modificación de requisitos en este change; posibles ajustes de escenario posteriores diferidos (ver «Tensiones detectadas»).
- **Alcance parcial:** solo Ejercicio 3. Los ganchos de altas (`#form-alta-libro`, `#form-alta-cliente`), ventas e historial quedan intactos y sin comportamiento (Ej. 4–5).

## Contexto verificado

Hechos verificados por lectura directa de archivos (nada de este listado es supuesto):

- `index.html` [Verificado]: entrada única con `header` + `nav` (5 anclas: Catálogo, Libros, Clientes, Ventas, Historial), `main.contenedor-principal` con 5 `section`, `footer`. Vista Catálogo (`#vista-catalogo`): `form#buscador-catalogo` (`action="#"`, `method="get"`) con `label.etiqueta-campo` + `input#busqueda-titulo.campo` + `button.boton.boton-primario` «Buscar»; `p#mensaje-sin-resultados.mensaje.mensaje-error` con `aria-live="polite"` y atributo `hidden`; `div#listado-catalogo` con un `article.tarjeta-libro` de ejemplo estructural (h3 + 6 campos `p>span`: Título, ISBN, Editorial, Género «Sin clasificar», Autores, Precio); `p#mensaje-catalogo-vacio.mensaje.mensaje-vacio` con `hidden`. Sin `<script>` en el documento.
- Repo [Verificado]: no existe carpeta `js/`; no existe ningún archivo `.js`.
- `css/styles.css` [Verificado]: `#listado-catalogo` es Grid `repeat(auto-fill, minmax(240px, 1fr))`; `.tarjeta-libro` (card) con estilos para `h3`, `p` y `p span`; `.mensaje`, `.mensaje-error`, `.mensaje-vacio`, `.mensaje:empty { display: none }`; `#buscador-catalogo` en Flex column (row a ≥1280 px); foco visible `:focus-visible`. Ninguna regla sobreescribe el atributo `hidden` del HTML (`.mensaje` no fija `display` fuera de `:empty`), por lo que alternar `hidden` desde JS muestra/oculta correctamente [Verificado por lectura; se confirmará en implementación].
- `openspec/specs/estructura-pantallas-html/spec.md` [Verificado, leído completo]: exige campos por libro (título, ISBN, editorial, género o literal «Sin clasificar», autores, precio), buscador asociado con label + botón «Buscar», mensaje de sin-resultados reservado, ganchos DOM estables y funcionamiento `file://`.
- `openspec/specs/presentacion-css-adaptable/spec.md` [Verificado, leído completo]: exige CSS externo con clases reutilizables, ganchos preservados, contenedores `aria-live` (incluye `mensaje-sin-resultados`), cero peticiones externas, convenciones CSS.
- Inventario de specs [Verificado vía `openspec list --specs`]: exactamente 2 capabilities (`estructura-pantallas-html` 9 requisitos, `presentacion-css-adaptable` 10 requisitos). Changes archivados en `openspec/changes/archive/`.
- `docs/Consigna Primer Parcial.pdf` [Existe, 336 215 bytes]: NO pudo extraerse su texto — no hay `pdftotext` ni librerías PDF en la Python disponible (pypdf/PyPDF2/pdfminer/fitz ausentes); no se instala nada (requiere autorización). Página y puntaje del Ejercicio 3 quedan como pendiente (ver más abajo).
- Consigna textual del Ejercicio 3 [Fuente autoritativa: `docs/prompts/prompt-punto-3.md`, leído completo]: define requisitos R-01..R-09, criterios CA-01..CA-05, alcance, exclusiones y restricciones anti-alucinación aplicados en este documento.

Supuestos (no verificados, declarados):

- [Supuesto] El navegador del evaluador es Chrome o Firefox actual con JS habilitado y sin bloqueo de scripts locales (`file://` permite cargar `<script src>` relativos — comportamiento estándar, se verificará en Fase 3).
- [Supuesto] La consigna textual del prompt coincide con la del PDF; el PDF solo aportaría página y puntaje, hoy ilegibles.

## Alcance

### Incluido

- Modelado de datos en arrays de objetos con identificadores estables: 6 libros, 2 editoriales, 2 géneros, 3 autores, 3 clientes ficticios (conjunto mínimo exacto, declarado como ejemplos de práctica).
- Integridad referencial: cada libro referencia por id una editorial existente y ≥1 autores existentes; género opcional (`null` ausente) y, si existe, referencia un género existente; sin referencias colgantes.
- Resolución de relaciones en el render: nombre de editorial, nombres de autores, género o texto literal «Sin clasificar».
- Generación de `#listado-catalogo` desde el array de libros con los campos del HTML del Ej. 1 (título, ISBN, editorial, género o «Sin clasificar», autores, precio), reutilizando `.tarjeta-libro` y sustituyendo el `article` de ejemplo.
- Filtro por título: case-insensitive, coincidencia parcial, `trim`; vacío o solo espacios → catálogo completo; sin coincidencias → `#mensaje-sin-resultados` visible; con coincidencias → mensaje oculto y listado visible.
- Envío de `#buscador-catalogo` con `preventDefault` (sin recarga) y filtrado en vivo con el evento `input` sobre `#busqueda-titulo`; ambas vías comparten la misma lógica de filtrado/render (aprobado — D-1).
- Funciones con responsabilidades reconocibles (datos, relaciones, normalización, filtrado, render, mensajes, eventos).
- Inserción segura: todo texto generado/usuario vía `textContent`/`createElement`; nunca `innerHTML` con datos.
- Enlace de los scripts (datos.js y catalogo.js) desde `index.html` con `defer`, sin alterar ids ni semántica.

### Excluido

- Ej. 1: reestructuración del HTML, cambios de vistas, renombrado de ids.
- Ej. 2: cambios de identidad visual, layout, responsive, foco o clases más allá de reutilizar las existentes (cero cambios de CSS).
- Ej. 4: altas de libros/clientes, validaciones de formularios, `preventDefault` de esas altas, listados de alta dinámicos, población de los `select` de editorial/género/autores.
- Ej. 5: renglones, subtotales/totales, duplicados, confirmación de venta, historial inmutable.
- Ej. 6: localStorage, casos manuales, README.
- ABM de editoriales/géneros/autores; edición o eliminación de libros; búsqueda por campos distintos del título; ordenamiento, paginación o tokenización avanzada; fetch/red; librerías/frameworks; almacenamiento persistente; build tools.

## Requisitos

Requisitos verificables identificados (tomados textualmente de la fuente autoritativa `docs/prompts/prompt-punto-3.md`):

| ID | Grupo | Requisito |
| --- | --- | --- |
| R-01 | Datos y estados | Existen arrays de objetos con identificadores estables para ≥6 libros, ≥2 editoriales, ≥2 géneros, ≥3 autores y ≥3 clientes ficticios; cada libro apunta a una editorial existente y a ≥1 autores existentes; su género es opcional y, si está presente, apunta a un género existente; no hay referencias colgantes. |
| R-02 | Funcional | `#listado-catalogo` se genera a partir del array de libros y cada libro muestra título, ISBN, editorial, género o «Sin clasificar», autores y precio; el `article` de ejemplo estructural no permanece como contenido del catálogo renderizado. |
| R-03 | Funcional | El filtro por título ignora mayúsculas/minúsculas, encuentra coincidencias parciales y aplica `trim`; entrada vacía o solo espacios muestra el catálogo completo; entrada sin coincidencias muestra `#mensaje-sin-resultados` visible y oculta el listado de resultados; con coincidencias se oculta el mensaje y se muestra el listado. |
| R-04 | Estructura e interfaces | El JS vive en archivo(s) externo(s) bajo `js/` enlazado(s) desde `index.html`; se reutilizan los ganchos existentes (`#buscador-catalogo`, `#busqueda-titulo`, `#listado-catalogo`, `#mensaje-sin-resultados`, `#mensaje-catalogo-vacio`) sin renombrarlos; el envío del buscador usa `preventDefault` y no recarga la página. |
| R-05 | Funcional | El código está organizado en funciones con responsabilidades reconocibles (datos, relaciones, normalización de la búsqueda, filtrado, renderizado, mensajes, registro de eventos), sin lógica monolítica dentro de los handlers. |
| R-06 | Calidad | Todo texto generado y toda entrada de usuario se insertan como texto en el DOM (`textContent`/`createElement`); no se asigna entrada de usuario a `innerHTML`; búsquedas con caracteres especiales (`<`, `>`, `&`, comillas) se muestran literalmente y no rompen la interfaz ni generan errores en consola. |
| R-07 | Compatibilidad | Funciona abierto como archivo local sin servidor ni red: cero `fetch`/XHR/peticiones; verificado en Chrome/Firefox actuales vía `file://` con consola sin errores. |
| R-08 | Convenciones | Archivos en `js/` con minúsculas y guiones; nombres de funciones y variables comprensibles en español; indentación de 2 espacios; separación estricta estructura (HTML) / presentación (CSS) / comportamiento (JS); HTML y CSS existentes sin cambios salvo el `<script>` enlazado y ajustes mínimos justificados en el SPEC. |
| R-09 | Preparación futura, si aplica | Los datos y los ganchos quedan expuestos de forma reutilizable para los Ej. 4–5 (acceso a arrays, selects y listados existentes intactos); no se implementa comportamiento de altas ni de ventas. |

### Escenarios observables y casos límite

Todos asumen apertura por `file://` con el catálogo ya renderizado al cargar la página:

| # | Caso | Entrada / condición | Resultado observable |
| --- | --- | --- | --- |
| E-01 | Render inicial | Cargar la página | `#listado-catalogo` contiene 6 `article.tarjeta-libro` (uno por libro del array); el artículo de ejemplo no está; cada tarjeta muestra título, ISBN, editorial resuelta, género o «Sin clasificar», autores resueltos y precio. |
| E-02 | Búsqueda vacía | Enviar el formulario con el input vacío (`""`) | Catálogo completo (6 libros); `#mensaje-sin-resultados` oculto; sin recarga de página. |
| E-03 | Solo espacios | Enviar con `"   "` (espacios) | Igual que E-02: `trim` lo reduce a vacío → catálogo completo. |
| E-04 | Case-insensitive | Buscar `"harry"` y luego `"HARRY"` (y variantes mixtas) | Exactamente los mismos libros coincidentes en ambos casos. |
| E-05 | Coincidencia parcial al inicio | Texto que coincide con el inicio de un título | Se muestra solo ese libro (y cualquier otro que cumpla). |
| E-06 | Coincidencia parcial al medio | Texto del medio de un título | Se muestra solo ese libro. |
| E-07 | Coincidencia parcial al final | Texto del final de un título | Se muestra solo ese libro. |
| E-08 | Sin coincidencias | Texto que no matchea ningún título (p. ej. `"zzzz"`) | `#mensaje-sin-resultados` visible (sin `hidden`); el listado de resultados oculto (`hidden`) y sin artículos. |
| E-09 | Volver al completo | Tras E-08, buscar vacío o con match | Mensaje oculto de nuevo; listado con los libros correspondientes. |
| E-10 | Libro sin género | Inspeccionar la tarjeta de un libro con género `null` | Su campo Género muestra literalmente «Sin clasificar»; los demás libros muestran su género real. |
| E-11 | Un autor vs. varios autores | Inspeccionar tarjetas de libro de 1 autor y de ≥2 autores | El de un autor muestra un nombre; el de varios muestra los nombres concatenados (p. ej. separados por `, `), sin duplicados ni referencias colgantes. |
| E-12 | Caracteres especiales en la búsqueda | Buscar `<`, `>`, `&`, comillas (p. ej. `"Harry & <algo>"`) | No se ejecuta marcado, no hay errores de consola, la UI no se rompe; el filtro simplemente matchea o no según el título. |
| E-13 | Caracteres especiales en los datos | Tarjeta de un libro cuyo título/autor contiene carácter especial (p. ej. `&`) | Se muestra literalmente como texto (inspección del DOM: nodo de texto, no HTML interpretado). |
| E-14 | Envío sin recarga | Presionar «Buscar» o Enter en el input | No se recarga la página (no hay navegación; el `action="#"` no se sigue); el filtro se aplica. |
| E-15 | Filtro en vivo (D-1) | Escribir/borrar en `#busqueda-titulo` sin presionar «Buscar» | Cada evento `input` refiltra el catálogo con exactamente la misma lógica que el `submit` (mismos resultados para la misma entrada). |
| E-16 | Array de libros vacío (caso defensivo) | Condición hipotética `libros.length === 0` | `#mensaje-catalogo-vacio` visible y `#listado-catalogo` sin artículos. Con el dataset aprobado este estado NO ocurre en la práctica; se cubre porque el requisito lo exige. |

## Estructura propuesta: datos, interfaces y comportamiento

Todo lo de esta sección es **propuesta** (aún no implementada), salvo donde se cite un gancho verificado.

### Esquemas de datos (arrays en `js/datos.js`)

Identificadores estables de tipo string con prefijo y número (p. ej. `"edi-01"`, `"lib-03"`) [propuesta de formato]:

| Entidad | Esquema | Notas |
| --- | --- | --- |
| Editorial | `{ idEditorial: string, nombre: string }` | ≥2; nombres ficticios de práctica. |
| Género | `{ idGenero: string, nombre: string }` | ≥2; ficticios. |
| Autor | `{ idAutor: string, nombre: string }` | ≥3; ficticios. |
| Libro | `{ idLibro: string, titulo: string, isbn: string, idEditorial: string, idGenero: string \| null, idsAutores: string[], precio: number }` | ≥6; `idGenero: null` = sin género; `idsAutores` con ≥1 id; precio numérico. |
| Cliente | `{ idCliente: string, nombreCompleto: string, email: string }` | ≥3; ficticios; sin uso funcional en Ej. 3 (R-09). |

### Volúmenes e integridad referencial (R-01)

- Volúmenes exactos del mínimo autorizado: **6 libros, 2 editoriales, 2 géneros, 3 autores, 3 clientes ficticios**, declarados explícitamente como ejemplos de práctica en un bloque de declaración de datos (no son datos reales). Sin entidades adicionales fuera de ese mínimo.
- Cobertura de casos dentro del mismo mínimo (sin inventar datos extra): ≥1 libro con `idGenero: null` (E-10); ≥1 libro con un solo autor y ≥1 con dos autores (E-11); ≥1 título con carácter especial (p. ej. `&`) (E-13).
- Integridad: todo `idEditorial`/`idGenero`/`idsAutores[]` de un libro existe en su array; ninguna referencia colgante. El filtro y el render toleran defensivamente un id no encontrado mostrando «Sin clasificar»/texto alternativo, pero el dataset aprobado no los contiene.

### Cómo se resuelven las relaciones (en el render)

- Editorial: buscar en `editoriales` por `idEditorial` → mostrar `nombre`.
- Género: `idGenero === null` o sin match → literal «Sin clasificar» (coincide con el spec `estructura-pantallas-html` y el `<option>` «Sin clasificar» ya presente en el HTML); si existe → `nombre`.
- Autores: mapear `idsAutores` a sus `nombre` y unirlos con `, ` [propuesta de separador].

### Archivos y exposición de datos (R-04, R-08, R-09)

- `js/datos.js`: solo declaraciones de datos (los cinco arrays como `const` en el ámbito léxico global de script clásico — accesibles desde `js/catalogo.js` y futuros scripts de Ej. 4–5 sin envolver en IIFE ni módulos) [aprobado — D-2].
- `js/catalogo.js`: comportamiento de la vista Catálogo (índices, resolución de relaciones, normalización, filtrado, render, mensajes, eventos).
- `index.html`: `<script src="js/datos.js" defer></script>` y `<script src="js/catalogo.js" defer></script>` antes de `</body>` [aprobado; el orden datos → catálogo y el uso de `defer` garantizan datos disponibles al registrarse los eventos].
- Los `select` de la vista Libros (`#libro-editorial`, `#libro-genero`, `#libro-autores`) y demás ganchos de Ej. 4–5 quedan intactos y sin poblar (población = Ej. 4, excluido).

### Funciones previstas (R-05) — una responsabilidad por función, declaradas antes de usarse

Nombres definitivos (fijados en Fase 2, coherentes con `design.md`):

| Función | Responsabilidad |
| --- | --- |
| `obtenerLibros()` | Devolver el array de libros (punto único de acceso a los datos para el catálogo). |
| `construirIndiceEditoriales()` / `construirIndiceGeneros()` / `construirIndiceAutores()` | Devolver un mapa id → nombre por entidad (índices construidos una vez al arrancar). |
| `resolverNombreEditorial(libro, indice)` | Devolver el nombre de la editorial del libro. |
| `resolverGenero(libro, indice)` | Devolver el nombre del género o «Sin clasificar». |
| `resolverNombresAutores(libro, indice)` | Devolver los nombres de autores unidos por `, `. |
| `normalizarTexto(texto)` | `trim` + conversión a minúsculas de la entrada. |
| `filtrarPorTitulo(libros, textoNormalizado)` | Devolver los libros cuyo título (normalizado) contiene el texto normalizado. |
| `crearTarjetaLibro(libro, indices)` | Construir un `article.tarjeta-libro` con `createElement`/`textContent` (mismos campos que el ejemplo HTML; precio con dos decimales [propuesta, coherente con `0.00`]). |
| `renderizarCatalogo(librosAMostrar)` | Vaciar `#listado-catalogo` y agregar una tarjeta por libro (o dejarlo vacío). |
| `mostrarSinResultados()` / `ocultarSinResultados()` | Alternar `hidden` de `#mensaje-sin-resultados`. |
| `actualizarCatalogo(textoBusqueda)` | Orquestador compartido: normalizar → filtrar → renderizar → mensajes (una sola lógica para ambas vías, D-1). |
| `manejarEnvioBusqueda(evento)` | Handler delgado: `preventDefault` + delegar en `actualizarCatalogo`. |
| `manejarEntradaBusqueda(evento)` | Handler delgado del `input`: delegar en `actualizarCatalogo`. |
| `registrarEventos()` | Asociar los listeners `submit` del formulario e `input` del campo. |
| (arranque) | Render inicial del catálogo completo + `registrarEventos()` al ejecutarse el script (con `defer` el DOM ya está parseado). |

### Eventos previstos

- `submit` sobre `#buscador-catalogo` [gancho verificado] → `manejarEnvioBusqueda` con `preventDefault` (E-14).
- `input` sobre `#busqueda-titulo` [gancho verificado] → `manejarEntradaBusqueda`, filtrado en vivo con la misma lógica (E-15; aprobado — D-1).

### Inserción segura en el DOM (R-06)

Todo texto (títulos, ISBN, nombres, precios, y cualquier entrada de usuario si se mostrara) se inserta exclusivamente con `textContent` o `createElement`; prohibido `innerHTML`/`insertAdjacentHTML` con datos. Búsquedas con `<`, `>`, `&`, comillas no se interpretan como marcado (E-12, E-13).

## Estados y manejo de errores

| Estado | Condición | `#listado-catalogo` | `#mensaje-sin-resultados` | `#mensaje-catalogo-vacio` |
| --- | --- | --- | --- | --- |
| Catálogo completo | Al cargar; o búsqueda vacía/solo espacios | Todos los libros (o el subconjunto filtrado) | Oculto (`hidden`) | Oculto |
| Con resultados | Filtro con ≥1 coincidencia | Solo los coincidentes | Oculto | Oculto |
| Sin resultados | Filtro sin coincidencia | Sin artículos y oculto (`hidden`) | Visible (sin `hidden`) | Oculto |
| Catálogo vacío (defensivo) | `libros.length === 0` | Sin artículos | Oculto | Visible |

Errores: no hay red, asíncronismo ni parsing externo; el único modo de fallo esperado es un error de programación (consola). Casos límite de datos (id colgante) se toleran mostrando «Sin clasificar»/texto alternativo sin lanzar excepción, pero no forman parte del dataset aprobado. No se implementan validaciones de formulario de alta (Ej. 4).

## Restricciones técnicas y convenciones

- JavaScript nativo ES moderno **sin módulos** (`type="module"` no aplica por `file://` y por convención del repo), sin transpilación, sin npm/build.
- Sin `fetch`/XHR/WebSockets/red, sin librerías ni CDNs, sin `localStorage`/`sessionStorage` (Ej. 6).
- Sin ABM de editoriales/géneros/autores; sin edición/eliminación de libros.
- Separiación estricta HTML/CSS/JS; archivos en `js/` minúsculas-con-guiones; funciones/variables en español; indentación de 2 espacios; una responsabilidad por función; funciones declaradas antes de usarse; sin comentarios en el código fuente salvo petición (convención del proyecto).
- Reutilizar ganchos e ids existentes sin renombrar; HTML y CSS sin cambios salvo el `<script>` enlazado (R-08).
- Verificación manual sin frameworks: apertura por `file://`, recorrido de los casos E-01..E-16, consola limpia, Network sin peticiones externas, DOM inspeccionado para confirmar inserción como texto.

## Criterios de aceptación

Vinculados a los requisitos (fuente autoritativa: `docs/prompts/prompt-punto-3.md`):

| ID | Verificación | Cubre |
| --- | --- | --- |
| CA-01 | Catálogo generado desde el array de libros con todos los campos por libro y relaciones (editorial, autores, género o «Sin clasificar») resueltas desde los arrays, verificable en el DOM. | R-01, R-02 |
| CA-02 | Filtro verificado con las 5 entradas: vacía → catálogo completo; solo espacios → completo; «harry»/«HARRY» → mismas coincidencias; coincidencia parcial al inicio/medio/final; sin coincidencias → `#mensaje-sin-resultados` visible. | R-03 |
| CA-03 | JS externo en `js/` enlazado desde `index.html`, ganchos existentes intactos, envío sin recarga (`preventDefault`) y funciones con responsabilidades reconocibles verificables por inspección del código. | R-04, R-05, R-08 |
| CA-04 | Entrada de usuario con `<`, `>`, `&` y comillas mostrada literalmente en el DOM sin errores de consola ni ejecución de marcado. | R-06 |
| CA-05 | Apertura local sin red: cero `fetch`/XHR/peticiones en Network, consola limpia en Chrome/Firefox vía `file://`. | R-07 |

Checklist adicional de cierre (fuente autoritativa idem):

- [ ] Se cubre todo el alcance aprobado y no se incorpora trabajo excluido.
- [ ] Se respetan las tecnologías, dependencias y convenciones permitidas.
- [ ] Las comprobaciones exigidas se ejecutaron y sus resultados se informan con evidencia.
- [ ] Se distinguen los controles aprobados, fallidos, omitidos y pendientes; ningún control no ejecutado se presenta como aprobado.
- [ ] Los supuestos, placeholders pendientes y limitaciones quedan identificados.

## Supuestos, pendientes y decisiones

### Supuestos declarados

- Los scripts locales se cargan bajo `file://` en Chrome/Firefox actuales (comportamiento estándar; se verificará en Fase 3 — aún no ejecutado).
- El contenido ficticio concreto de los 6 libros/2 editoriales/2 géneros/3 autores/3 clientes está definido ahora en `design.md` (conjunto mínimo marcado explícitamente como ejemplos de práctica, con integridad referencial estricta) para aprobación junto con este PLAN — D-3 resuelta: se aprueba antes de implementar, no al implementar.
- «Sin clasificar» es el literal exacto exigido por el spec `estructura-pantallas-html` y ya presente en el HTML; no se usa ningún otro texto de relleno.

### Información pendiente

- `{{DATO_PENDIENTE: número de página y puntaje del Ejercicio 3 — el PDF no pudo leerse}}` — `docs/Consigna Primer Parcial.pdf` existe (336 215 bytes) pero no hay método de extracción de texto disponible en el entorno (sin `pdftotext`; sin pypdf/PyPDF2/pdfminer/fitz en la Python instalada) y no se instalaron dependencias por falta de autorización. El dato queda pendiente salvo que el PDF llegue a leerse en el futuro (nueva herramienta o entrega del archivo en texto); no bloquea el alcance ni la validez de esta entrega porque la fuente autoritativa del Ejercicio 3 es `docs/prompts/prompt-punto-3.md`. No se inventa página ni puntaje.
- Sync diferido de escenarios de los specs existentes (D-4): el desfase de `estructura-pantallas-html` («sin lógica JS asociada en esta entrega») y de `presentacion-css-adaptable` (Network «solo HTML y CSS») queda como **pendiente de sync posterior** tras el archivado de este change; los specs existentes NO se modifican acá.

### Limitación aceptada (2026-10-20)

`#listado-catalogo` declara `display: grid` en el CSS autor, lo que anula el presentational hint débil de `hidden` (WHATWG #7650): en el estado «sin resultados» el contenedor puede conservar `display: grid` calculado en DevTools. Con cero resultados se vacía con `replaceChildren`, por lo que nada queda visible. **Opción (a) aceptada:** sin cambio de CSS. La opción (b), `[hidden] { display: none !important; }`, queda como posible fix futuro de una línea, **NO aplicado**.

### Tensiones detectadas con specs existentes (no resueltas acá, sin modificar specs)

1. `presentacion-css-adaptable` → escenario «Apertura sin red»: «en Network solo aparecen `index.html` y el CSS local». Al agregar `<script src>` locales, Network mostrará además las filas de los JS locales. La exigencia de fondo (cero peticiones **externas**, todo local) se preserva; el escenario quedará desactualizado. **D-4 (resuelta):** NO se modifican `presentacion-css-adaptable` ni `estructura-pantallas-html` en este change; el desfase queda anotado como **pendiente de sync posterior** tras implementar.
2. `estructura-pantallas-html` → escenario «Contrato de ganchos completo»: los hooks existen «sin lógica JS asociada en esta entrega» (entrega = Ej. 1). El Ej. 3 agrega comportamiento a esos hooks sin tocar estructura; el contrato de ids se mantiene intacto. También queda como pendiente de sync posterior (mismo criterio D-4).

Ninguno de los dos se resuelve acá; los specs aprobados no se editan en este change.

### Decisiones resueltas (aprobadas por el usuario en Fase 2)

- **D-1 — Filtro mientras se escribe:** APROBADO. Además del `submit` de `#buscador-catalogo` con `preventDefault`, el catálogo reacciona al evento `input` de `#busqueda-titulo` (filtrado en vivo). Ambas vías comparten la misma lógica de filtrado/render (`actualizarCatalogo`). Ver E-15.
- **D-2 — Cantidad de archivos JS:** APROBADO en dos archivos: `js/datos.js` (solo arrays de datos) + `js/catalogo.js` (comportamiento), minúsculas con guiones; enlazados con `defer`, datos primero.
- **D-3 — Contenido del dataset ficticio:** APROBADO definirlo YA en Fase 2: el conjunto mínimo completo (6 libros, 2 editoriales, 2 géneros, 3 autores, 3 clientes) está especificado en `design.md`, declarado como ejemplos de práctica, con integridad referencial estricta y sin datos fuera de ese mínimo; se aprueba junto con este PLAN.
- **D-4 — Tensión con el escenario de Network del spec CSS:** APROBADO diferirla. Los specs aprobados `estructura-pantallas-html` y `presentacion-css-adaptable` NO se modifican en este change; el desfase de los escenarios afectados queda anotado como pendiente de sync posterior (ver «Tensiones detectadas») y no se resuelve aquí.

---

*SPEC aprobada y Fase 2 — PLAN autorizada. Artefactos del PLAN: `design.md`, delta en `specs/catalogo-datos-y-filtro/spec.md` y `tasks.md`. La Fase 3 — IMPLEMENTACIÓN no inicia sin aprobación explícita de este PLAN.*
