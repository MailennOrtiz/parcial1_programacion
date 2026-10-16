# Design — Ejercicio 1 · Estructura y pantallas HTML

## Context

Ver `proposal.md` (Why). Estado actual: repo vacío, sin `index.html`; `css/` y `js/` vacías e intactas en esta entrega. Restricciones: HTML5 puro, apertura `file://`, cero dependencias externas, sin JS funcional. Decisión del usuario (2026-10-16): una sola página con 5 secciones + nombre «Libreria Nya». Requisitos en `specs/estructura-pantallas-html/spec.md`.

## Goals / Non-Goals

**Goals:**

- Definir cómo se organiza el único `index.html` (semántica, secciones, formularios, tablas, ids) para cumplir el spec sin reestructurar en Ej. 3–5.
- Fijar el contrato de ganchos DOM que consumirá el JS futuro.

**Non-Goals:**

- Estilos visuales y adaptación (Ej. 2), modelo de datos y filtro (Ej. 3), validaciones (Ej. 4), cálculos e historial inmutable (Ej. 5), localStorage y README (Ej. 6). Este diseño no especifica ninguno de ellos.

## Decisions

- **Una sola página con 5 `section` + `nav` por anclas (descartada multipágina).** Por qué: un solo archivo que abrir (cumple «apertura directa» de la entrega), navegación sin recarga, DOM y ganchos centralizados para el JS futuro. Multipágina obligaría a duplicar `header`/`nav`/`footer` y repartir ids por archivo. Alternativa considerada: 5 archivos HTML — rechazada por el usuario.
- **Listados operativos (Libros, Clientes, Ventas, Historial) como `table` con `thead`/`th`; catálogo como lista de `article`.** Por qué: las tablas dan encabezados nativos exigidos por la consigna para datos tabulares; el catálogo es contenido heterogéneo por libro y se beneficia de tarjetas/arts. Alternativa (todo con tablas): rechazada por rigidez del catálogo.
- **Formularios con `label for/id` + `name` + tipos nativos (`text`, `email`, `number`, `select`, `select multiple`), botones con verbo.** Por qué: prepara validación nativa y el `FormData`/selectores del JS futuro sin agregar nada externo.
- **Estados como elementos reales ocultos (`hidden`) con `aria-live="polite"` en resultados.** Por qué: existen en el DOM desde el día uno (inspeccionables y testeables por Ej. 6 / navegación por teclado) y el JS solo los alternará. Alternativa (crear estados por JS): rechazada porque la consigna del Ej. 1 exige que la estructura contemple los estados.
- **Cero `class` de diseño final en esta entrega; solo `id` funcionales.** Por qué: evita adelantar el Ej. 2 y mantiene el diff del Ej. 1 puramente estructural.

## Risks / Trade-offs

- [Página larga con 5 secciones] → Mitigación: `nav` persistente con anclas + `h2` por vista; la paginación/estilos llegan en Ej. 2.
- [Ids fijados ahora condicionan Ej. 3–5] → Mitigación: el spec congela el contrato de ids y `tasks.md` incluye verificación cruzada spec↔DOM.
- [Tablas en 320 px podrían desbordar] → Mitigación: fuera de alcance del Ej. 1; se anota como pendiente para el Ej. 2 (contenedor con desplazamiento propio).
