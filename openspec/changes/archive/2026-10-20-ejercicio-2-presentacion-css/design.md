# Design

## Context

Ver `proposal.md` (Why / What Changes). Estado verificado: `index.html` (168 líneas, 5 vistas, `header`/`nav`/`main`/`footer`, sin `<link>` ni `<style>`); no existe `css/`; contrato inviolable en `openspec/specs/estructura-pantallas-html/spec.md`. Alcance: solo capa de presentación externa + `<link>` + wrappers mínimos de scroll para `tabla-renglones`/`tabla-historial`. Stack: CSS nativo puro, Flexbox/Grid, tipografías del sistema, apertura `file://`, sin npm/servidor. Usuario aprobó el proposal sin responder P-01..P-06 → se aplican defaults S-01..S-04 y paleta/tipografía propuestas quedan pendientes de confirmación antes de Fase 3.

## Goals / Non-Goals

**Goals:**

- Una sola hoja `css/styles.css` con secciones comentadas base → layout → componentes → vistas → responsive → foco/accesibilidad, verificable a 320 px y 1280 px vía `file://`.
- Layout declarado por zona: Flexbox en `header`/`nav`/formularios, Grid en `listado-catalogo`, wrapper `overflow-x: auto` en tablas.

**Non-Goals:**

- JS nuevo, validaciones, cálculos, localStorage, README, reestructuración del HTML, catálogo definitivo de datos (reservado a Ej. 3–6). Sin modo oscuro adicional, animaciones que afecten legibilidad/foco, ni recursos externos.

## Decisions

- **D-01 Una sola hoja `css/styles.css` (default S-02).** Alternativa considerada: `base/layout/componentes.css` por separado — descartada por defecto salvo que el usuario la pida (añade un `<link>` por archivo sin beneficio para este tamaño). Un solo `<link rel="stylesheet" href="css/styles.css">` en `<head>`.
- **D-02 Wrappers mínimos de scroll (default S-03).** `div.tabla-contenedor` con `overflow-x: auto` alrededor de `tabla-renglones` y `tabla-historial`; `min-width` solo en la `table` interior si hace falta, nunca en `body`/`html`. Alternativa (scroll directo en `table`) descartada: peor soporte de `overflow` en tablas. Sin tocar `id`, `thead`/`th`, `aria`.
- **D-03 Cero imágenes con declaración explícita (default S-04).** Alternativa (agregar imágenes) descartada sin decisión del usuario (P-04): la consigna exige `alt` solo «si se usan». El CSS no referencia imágenes externas; Network queda limpio.
- **D-04 Paleta «tinta y verde-ledger» (rediseño 2026-10-17 bajo la skill `.agents/skills/frontend-design/SKILL.md`, por pedido del usuario: «diseño moderno de nivel de producción, rechazando la estética genérica»; reemplaza a la paleta crema/borgoña v1, que la skill identifica como tell #1 de diseño generado — crema + serif + acento terracota).** Valores: papel `#f1f4f7` (fondo, papel frío), superficie `#FFFFFF`, tinta `#16202e` (texto/titulos/banda de cabecera/botón primario), tinta-suave `#56627a`, acento `#0e6b4f` (filetes de sección, enlaces), borde `#dbe1e8`, borde-campo `#c6cfdb`, error `#b3261e`, éxito `#157a46`, foco `#2457d6` (anillo blanco dentro de la banda tinta). Contraste verificado: texto/papel 14.86:1, botón 16.4:1, nav 13.82:1, cabecera tabla 16.4:1.
- **D-05 Tipografía: una sola familia del sistema con tratamiento como personalidad.** `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`; display 700 con tracking negativo (h1 −0.02em, h2/h3 −0.01em), cuerpo 400, labels 600 en caja de oración (sin ALL-CAPS), **cifras tabulares** (`font-variant-numeric: tabular-nums`) en precios, tablas y total — detalle propio de un sistema de ventas. Nada externo, nada descargado.
- **D-06 Espaciado, radios y layout (jerarquía por variable, no uniforme).** Escala 4/8/12/16/24/32/48; `max-width: 1080px`; radios variables: campos/botones 4 px, paneles 6 px; una sola pieza de gran contraste (banda `header` tinta `position: sticky`) — el resto quieto: paneles blancos con hairline, sin sombras; h2 con filete verde izquierdo como dispositivo estructural; `scroll-margin-top` en secciones por el header sticky; `prefers-reduced-motion` respetado. Layout por zona sin cambios: Flexbox header/nav/formularios, Grid en catálogo, wrapper scroll en tablas.
- **D-07 Layout combinado (ex P-06, según sección 5 del proposal).** `header`+`nav ul`: Flexbox fila a 1280 px → columna apilada a 320 px; `listado-catalogo`: Grid (`repeat(auto-fill, minmax(240px, 1fr))`, 1 columna a 320 px); formularios: Flexbox columna (label sobre campo), `buscador-catalogo` en fila solo a 1280 px; `footer` y `resumen-venta`: bloque centrado.
- **D-08 Estados con texto + icono/borde además de color.** Clases `mensaje` + `mensaje-error`/`mensaje-exito`/`mensaje-vacio` sobre los `aria-live` existentes; `:focus-visible` con `outline: 3px solid #1A73E8` + `outline-offset: 2px`; prohibido `outline: none` sin reemplazo y `display: none` permanente.

## Risks / Trade-offs

- [Paleta/tipografía propuestas sin confirmación] → Mitigación: marcadas como propuesta en tasks 1.1 y en este diseño; Fase 3 NO inicia sin confirmación del usuario.
- [Tablas de 5 columnas a 320 px pueden seguir apretadas] → Mitigación: scroll propio del wrapper + `min-width` interior; la página nunca entra en scroll-x.
- [`hidden` del HTML vs CSS] → Mitigación: el CSS nunca fuerza `display` sobre `mensaje-sin-resultados` ni los `mensaje-*-vacio`; su alternancia la hará el JS futuro (R-10).
- [Foco en navegadores que no soportan `:focus-visible`] → Mitigación: regla de respaldo con `:focus` del mismo estilo.

## Migration Plan

Sin despliegue: crear `css/styles.css`, añadir `<link>` + 2 wrappers en `index.html`, verificar vía `file://`. Rollback: quitar el `<link>` y los wrappers restaura el estado previo (sin dependencias).

## Open Questions

Ninguna que cambie specs, enfoque o tareas. Solo confirmaciones de valores antes de Fase 3: paleta D-04, tipografía D-05, espaciado/ancho D-06.
