# Proposal — Ejercicio 1 · Estructura y pantallas HTML

## Why

El proyecto está vacío (sin `index.html`, vistas ni navegación) y el Parcial 1 exige, como primer paso, la estructura HTML con sus 5 vistas navegables. Sin esta base no se pueden conectar los datos locales ni el JavaScript de los Ejercicios 3–5. Esta entrega crea únicamente esa base estructural, cumpliendo los 20 puntos del Ejercicio 1 (vistas y navegación 10 + semántica/formularios/estados 10).

## What Changes

- Crea `index.html` como entrada única del proyecto (actualmente inexistente).
- Incorpora `header` + `nav` + `main` (+ `footer`) con navegación persistente a las 5 vistas: Catálogo, Libros, Clientes, Ventas, Historial.
- Estructura la vista Catálogo: título de la librería («Libreria Nya»), buscador por título (input etiquetado + botón «Buscar») y listado donde cada libro expone título, ISBN, editorial, género (o texto literal «Sin clasificar»), autores y precio.
- Estructura Libros (formulario de alta + listado), Clientes (formulario de alta + listado), Ventas (selector de cliente + zona de renglones + resumen) e Historial (listado id/fecha/cliente/total + acceso al detalle).
- Asocia cada campo con su `label` (`for`/`id`), define `name` y tipos apropiados, y usa botones con verbo de acción. Cada tabla/lista lleva encabezados (`thead`/`th` o equivalente).
- Reserva contenedores con `id` estables para los 3 estados exigidos: lista vacía, búsqueda sin resultados, resultado de operación (éxito/rechazo, con `aria-live`).
- Define el contrato de ganchos DOM que usará el JS de Ej. 3–5 (ids documentados), sin implementar lógica JS ni estilos CSS finales.
- No cambia comportamiento existente porque no hay producto previo; no toca `css/`, `js/` ni agrega dependencias.

## Capabilities

### New Capabilities

- `estructura-pantallas-html`: estructura HTML y navegación de las 5 vistas del Ejercicio 1, incluyendo semántica, formularios, tablas y estados. Cubre R-01–R-09 y CA-01–CA-05. Dará lugar a `specs/estructura-pantallas-html/spec.md`.

### Modified Capabilities

- Ninguna (no existen specs previas; `openspec list --specs` devuelve vacío).

## Impact

- Archivos afectados: `index.html` (nuevo, en raíz); opcionalmente páginas adicionales solo si se aprueba la variante multipágina (ver decisión pendiente D-01). `css/`, `js/` quedan reservadas e intactas en esta entrega.
- APIs/dependencias/sistemas: ninguno. Cero CDN, cero `fetch`, cero backend. Apertura vía `file://`.
- Riesgo de alcance: el resto del parcial (Ej. 2–6: CSS, datos JS, validaciones, ventas, localStorage, README) queda explícitamente fuera; cualquier necesidad detectada se registra como propuesta pendiente.

---

## 1. Problema, objetivo y resultado esperado

**Problema:** no existe entrada ni navegación; la consigna (pág. 2, Ejercicio 1) exige 5 vistas conectadas con formularios, listados y estados, y la evaluación (pág. 6) asigna 20 puntos a este ejercicio.

**Objetivo:** especificar la estructura HTML completa y verificable del Ejercicio 1, dejando el contrato DOM listo para Ej. 3–5 sin reestructurar después.

**Resultado esperado:** `proposal.md` aprobado (este documento) → luego `specs/estructura-pantallas-html/spec.md` + `tasks.md` → luego `index.html` implementado y verificable por apertura directa y recorrido de las 5 vistas.

## 2. Contexto verificado y fuentes

- Fuente primaria: `docs/Consigna Primer Parcial.pdf` — pág. 1 (alcance: solo frontend, HTML+CSS+JS nativos, sin librerías/frameworks/CDN, sin API/DB/servidor, datos ficticios), pág. 2 (Ejercicio 1 completo), pág. 6 (criterios: Ej. 1 = 20 pts).
- Fuente metodológica: `docs/prompts/01-Ejercicio-1-Estructura-y-Pantallas-SPEC.md` (define R-01–R-09, CA-01–CA-05, rutas OpenSpec).
- Estado del repo verificado por inspección directa (2026-10-16): `openspec/config.yaml` (schema spec-driven), carpetas vacías `css/` y `js/`, sin ningún `*.html` (glob confirma 0 archivos), `openspec/changes/` solo con `archive/`. Hecho: todo el Ejercicio 1 está pendiente. Propuesta: nada que reutilizar, todo es creación nueva.
- Nota de herramientas: `openspec --version` vía `cmd.exe` responde `1.13.2` (en PowerShell 5.1 los `*.ps1` están bloqueados por ExecutionPolicy; alternativa adoptada: invocar `openspec` a través de `cmd.exe /c`).

## 3. Alcance incluido y exclusiones explícitas

Incluido: lo listado en «What Changes» (entrada, 5 vistas, semántica, labels, tablas, 3 estados, ganchos DOM).

Excluido (reservado a futuras entregas, no implementar ni diseñar en detalle ahora):
- Ej. 2: identidad visual, Flexbox/Grid, adaptación 320/1280 px, foco visible.
- Ej. 3: modelo de datos (6 libros, 2 editoriales, 2 géneros, 3 autores, 3 clientes), renderizado y filtro funcional.
- Ej. 4: validaciones de alta, `preventDefault`, actualización sin recarga.
- Ej. 5: subtotal/total con 2 decimales, duplicados, precio histórico, historial inmutable.
- Ej. 6: localStorage, casos manuales, README.
- Editar/eliminar registros, stock/cobros/facturación, paginación, autenticación, i18n.

## 4. Requisitos y escenarios observables (trazan a R-01–R-09)

- R-01 Navegación: 5 enlaces persistentes en `nav`; escenarios: clic a cada vista llega sin 404; teclado (Tab+Enter) recorre todo el `nav`.
- R-02 Catálogo: título librería + buscador etiquetado + botón «Buscar» + listado con 6 campos/libro; caso límite: libro sin género muestra literal «Sin clasificar».
- R-03 Vistas operativas: Libros/Clientes con formulario + listado; Ventas con selector cliente + renglones + resumen; Historial con tabla (id, fecha, cliente, total) + control «Ver detalle» por fila.
- R-04 Semántica: `header/nav/main/footer`, `h1` único, `h2` por vista; todo `input/select/textarea` con `label for/id`; tablas con `thead/th scope`.
- R-05 Estados: contenedores `lista-vacia`, `sin-resultados`, `resultado-operacion` (con `aria-live="polite"`); ids estables para título, ISBN, precio, editorial, género, autores, nombre, email, cliente, libro, cantidad, resumen/total, id/fecha/cliente/total de venta.
- R-06 Calidad: `lang="es"`, `meta charset+viewport`, jerarquía sin saltos, `alt` o decisión documentada de no usar imágenes, indentación 2 espacios.
- R-07 Compatibilidad: apertura `file://` sin servidor; prohibido CDN/`@import` remoto/`fetch`/scripts terceros.
- R-08 Convenciones: `index.html` en raíz; minúsculas con guiones; ids documentados en el spec.
- R-09 Preparación futura: ganchos DOM listados como extensión permitida, sin comportamiento.

## 5. Estructura propuesta (sin código aún)

- `index.html` con `header` (título «Libreria Nya» + `nav` con 5 anclas a secciones de la misma página), `main` con 5 `section` (`#vista-catalogo`, `#vista-libros`, `#vista-clientes`, `#vista-ventas`, `#vista-historial`), `footer`.
- Catálogo: `form#buscador-catalogo` (label+input+button) + `p#mensaje-sin-resultados` + `div#listado-catalogo` (tabla o tarjetas con encabezados).
- Libros: `form#form-alta-libro` (título, ISBN, precio, editorial select, género select con «Sin clasificar», autores multi) + `div#listado-libros` + `p#mensaje-libros-vacio` + `div#resultado-alta-libro`.
- Clientes: `form#form-alta-cliente` (nombre, email) + `div#listado-clientes` + estados equivalentes.
- Ventas: `select#venta-cliente` + `form#form-renglon` (libro+cantidad+agregar) + `tabla#tabla-renglones` (libro, cantidad, precio, subtotal, quitar) + `div#resumen-venta` (total) + botón confirmar + `div#resultado-venta`.
- Historial: `tabla#tabla-historial` (id, fecha, cliente, total, detalle) + `div#detalle-venta` + `p#mensaje-historial-vacio`.
- Contradicción detectada y resuelta (D-01, decisión del usuario 2026-10-16): la consigna permite «varias páginas o secciones de una misma página». Se adopta **una sola página con 5 secciones**; los ids del contrato DOM viven en el único `index.html`.

## 6. Estados y manejo de errores (estructural, sin JS)

- Lista vacía: mensaje visible por defecto en cada listado (se ocultará por JS en Ej. 3–5).
- Búsqueda sin resultados: `p#mensaje-sin-resultados` oculto por defecto, reservado para Ej. 3.
- Operación correcta/rechazada: `div#resultado-*` con `aria-live`, texto (no solo color — anticipa Ej. 2).
- Sin JS en esta entrega estos mensajes son estáticos/ocultos; su activación es responsabilidad de Ej. 3–5.

## 7. Restricciones técnicas y convenciones

- Solo HTML5 en esta entrega; `css/` y `js/` intactas y vacías; sin dependencias; sin `fetch`; `file://` como único modo de apertura.
- Convenciones: 2 espacios, comillas dobles, minúsculas, `label for/id`, botones con verbo («Registrar libro», «Registrar cliente», «Buscar», «Agregar renglón», «Confirmar venta», «Ver detalle»).
- Validación humana: inspección DOM + recorrido de vistas; sin tests automatizados exigidos.

## 8. Criterios de aceptación (vinculados)

- CA-01 (R-01, R-03): las 5 vistas se alcanzan por clic y teclado sin roturas.
- CA-02 (R-02): catálogo expone los 6 campos + «Sin clasificar».
- CA-03 (R-04, R-06): semántica, labels, botones y encabezados verificables en DOM.
- CA-04 (R-03, R-05, R-09): formularios, selectores, renglones, historial/detalle e ids/estados presentes y documentados.
- CA-05 (R-07, R-08): cero dependencias externas; apertura local.
- Más las 5 cláusulas transversales de la plantilla (alcance cubierto, stack respetado, evidencia informada, controles clasificados, supuestos identificados).

## 9. Supuestos, pendientes y decisiones requeridas

- S-01: se asume apertura `file://` con Chrome/Firefox actuales; no se ensaya otro navegador en esta entrega.
- S-02: se asume que basta HTML estático con mensajes ocultos; la interactividad real llega en Ej. 3–5.
- S-03: nombre de la librería definido por el usuario: **«Libreria Nya»**; será el `h1` y el `<title>` (ej. `<title>Libreria Nya — Catálogo y gestión</title>`).
- **D-01 (resuelta por el usuario 2026-10-16): una sola página con 5 secciones en `index.html`** (navegación por anclas). El spec detallado y `tasks.md` asumirán esta variante; la alternativa multipágina queda descartada para este change.
- Propuestas fuera de alcance (no implementar): paleta/tipografía (Ej. 2), datos de ejemplo definitivos (Ej. 3), reglas de validación (Ej. 4), formato de importes (Ej. 5), clave de localStorage (Ej. 6).
