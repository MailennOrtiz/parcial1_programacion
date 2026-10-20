# Proposal — Ejercicio 2 · Presentación con CSS y uso adaptable

## Why

El Ejercicio 1 dejó la base estructural completa (`index.html` con 5 vistas navegables, semántica y ganchos DOM documentados en `openspec/specs/estructura-pantallas-html/spec.md`), pero el proyecto hoy se presenta sin estilos: `index.html` no enlaza ninguna hoja (`<link rel="stylesheet">` ausente, `<style>` ausente — verificado por lectura directa) y no existe carpeta `css/` (verificado con `Test-Path`). La consigna (pág. 2, Ejercicio 2) exige identidad visual propia y coherente, layout con Flexbox o Grid, adaptación verificada a 320 px y 1280 px sin scroll horizontal de página, foco visible con teclado completo, errores con texto explícito y tratamiento de imágenes. La evaluación (pág. 6) asigna a este ejercicio 20 puntos (coherencia y organización 8 + adaptación 8 + accesibilidad básica 4). Sin este change, las 5 vistas siguen funcionales pero sin presentación ni adaptación exigible. Esta entrega especifica ÚNICAMENTE esa capa de presentación, sin romper la estructura del Ejercicio 1 ni implementar JavaScript (Ej. 3–5) ni persistencia/README (Ej. 6).

## What Changes

- Enlaza `index.html` con hoja(s) externa(s) en `css/` mediante `<link rel="stylesheet">` (único cambio HTML autorizado, más wrappers mínimos de scroll para tablas solo si el SPEC los justifica y documenta).
- Crea la capa de presentación externa en `css/` (p. ej. `css/styles.css` u organización equivalente dentro de `css/`): paleta, tipografía, espaciado, tarjetas del catálogo, formularios, botones, tablas y mensajes, definidos una sola vez y aplicados igual en las 5 vistas.
- Declara el layout con Flexbox y/o Grid por zona (qué técnica en header/nav, main/secciones, listados, formularios, tablas).
- Garantiza adaptación a 320 px y 1280 px: página sin scroll-x; tablas anchas con scroll propio dentro de su contenedor (`overflow-x: auto` sobre el wrapper, nunca sobre `body`/`html`).
- Refuerza `:focus-visible` en enlaces, campos, botones y selects; recorrido completo por teclado sin trampas.
- Reutiliza los contenedores `aria-live="polite"` del Ejercicio 1 para errores/estados con texto explícito (nunca solo color).
- Decide explícitamente el tratamiento de imágenes (`alt` descriptivo / `alt=""` o fondo CSS / no usar imágenes).
- Preserva todos los `id`, `name`, semántica, jerarquía de encabezados y ganchos DOM de los Ej. 3–5; el CSS no oculta ni deshabilita contenido funcional (`display: none` permanente prohibido).
- No implementa JavaScript funcional nuevo, ni validaciones, ni cálculos, ni localStorage, ni README.

## Capabilities

### New Capabilities

- `presentacion-css-adaptable`: identidad visual CSS externa, coherente y adaptable de las 5 vistas (componentes reutilizables, layout Flexbox/Grid declarado, responsive 320/1280 px, foco visible, errores con texto, tratamiento de imágenes), aplicada sobre el HTML del Ejercicio 1 sin romper sus ganchos. Cubre R-01–R-10 y CA-01–CA-04. Dará lugar a `specs/presentacion-css-adaptable/spec.md` (o delta equivalente definido en PLAN).

### Modified Capabilities

- Ninguna. La capability existente `estructura-pantallas-html` NO cambia: sus REQUIREMENTS quedan intactos (CA-04). Cualquier wrapper mínimo de scroll para tablas se documenta como ajuste de marcado autorizado, sin alterar ids ni semántica.

## Impact

- Archivos afectados: `index.html` (solo adición de `<link>` + wrappers mínimos de scroll para `tabla-renglones`/`tabla-historial` si se aprueban; sin reestructurar secciones ni renombrar ids); `css/` (nuevo: p. ej. `css/styles.css` u organización equivalente dentro de `css/`). `js/`, datos, validaciones, ventas e historial funcional quedan intactos/fuera.
- APIs/dependencias/sistemas: ninguno. Cero CDN, cero `@import` remoto, cero `fetch`, cero backend. Apertura vía `file://` en Chrome/Firefox actuales.
- Riesgo de alcance: Ej. 1 (reestructuración), Ej. 3 (datos/filtro), Ej. 4 (validaciones), Ej. 5 (cálculos/historial), Ej. 6 (localStorage/README) quedan explícitamente fuera; cualquier necesidad detectada se registra como propuesta pendiente.

---

## 1. Problema, objetivo y resultado esperado

**Problema (hecho verificado):** el frontend «Libreria Nya» tiene estructura pero no presentación. Fuentes: lectura directa de `index.html` (168 líneas, sin `<link>` ni `<style>`); `Test-Path` confirma que no existe carpeta `css/` ni `js/`; `openspec list --json` devolvía `changes: []` y `openspec status --change "ejercicio-2-presentacion-css"` devolvía error «Change not found» antes de crear este change. La consigna pág. 2 (Ejercicio 2) y los criterios pág. 6 (20 pts) exigen resolverlo.

**Objetivo (propuesta):** especificar la identidad visual CSS adaptable y accesible del Ejercicio 2, verificable manualmente vía `file://` a 320 px y 1280 px, aplicada sobre el HTML existente sin romper sus ganchos DOM para el JavaScript futuro (Ej. 3–5).

**Resultado esperado (propuesta):** este `proposal.md` aprobado → luego `tasks.md` (Fase 2, solo tras aprobación) → luego `css/` + `<link>` mínimo en `index.html`, verificable por apertura directa: mismos componentes en las 5 vistas, página sin scroll-x, tablas con scroll propio, foco visible por teclado, Network sin peticiones externas.

## 2. Contexto verificado y referencias concretas a fuentes consultadas

Hechos verificados (con atribución; lo no verificado se marca como supuesto/propuesta):

- `index.html` en raíz (lectura directa completa, 168 líneas): `header` con `h1` «Libreria Nya» + `nav aria-label="Navegación principal"` con 5 enlaces (`#vista-catalogo`, `#vista-libros`, `#vista-clientes`, `#vista-ventas`, `#vista-historial`); `main` con 5 `section` con esos mismos `id` y `aria-labelledby`; `footer`. Formularios: `buscador-catalogo` (input `busqueda-titulo` + botón «Buscar»), `form-alta-libro` (título, ISBN, precio, editorial, género con «Sin clasificar», autores múltiple, botón «Registrar libro»), `form-alta-cliente` (nombre, email, botón «Registrar cliente»), `form-renglon` (libro, cantidad, botón «Agregar renglón»). Tablas: `tabla-renglones` (Libro, Cantidad, Precio unitario, Subtotal, Quitar) y `tabla-historial` (Identificador, Fecha, Cliente, Total, Detalle). Contenedores de estado: `mensaje-sin-resultados` (hidden), `mensaje-catalogo-vacio` (hidden), `mensaje-libros-vacio`, `mensaje-clientes-vacio`, `mensaje-renglones-vacio`, `mensaje-historial-vacio`, y `aria-live="polite"` en `resultado-alta-libro`, `resultado-alta-cliente`, `resultado-venta`; además `listado-catalogo` (con un `article` de ejemplo estructural), `listado-libros`, `listado-clientes`, `resumen-venta` (`venta-total`), `boton-confirmar-venta`, `detalle-venta`, `venta-cliente`. Verificado además: NO hay `<link rel="stylesheet">`, NO hay `<style>`.
- `openspec/specs/estructura-pantallas-html/spec.md` (re-lectura directa, 102 líneas): contrato a preservar — entrada única, 5 vistas, semántica (`header`/`nav`/`main`/`footer`, un `h1`, `h2` por vista, `label for/id`, `thead`/`th scope`, `lang="es"`, `meta charset`+`viewport`), 3 estados (vacía / sin resultados / resultado con `aria-live`), funcionamiento `file://` sin dependencias, ganchos DOM para Ej. 3–5. Es la restricción inviolable de este change (CA-04).
- `docs/Consigna Primer Parcial.pdf` — LEGIBLE vía Read (6 páginas, texto extraído correctamente; NO se aplica fallback). Verificado: pág. 1 (solo frontend, HTML+CSS+JS nativos, sin librerías/frameworks/CDN, sin API/DB/servidor, datos ficticios); pág. 2 Ejercicio 2 completo (identidad propia y coherente; CSS externo con clases reutilizables; Flexbox o Grid; 320 px y 1280 px legibles sin scroll-x de página; tablas con scroll propio; foco visible + teclado; errores con texto no solo color; imágenes con `alt` o decorativas sin información redundante); pág. 6 criterios (Ej. 2 = 20 pts → coherencia y organización 8 + adaptación 8 + accesibilidad básica 4). Los R-01..R-10 y CA-01..CA-04 del briefing son fieles a esta fuente.
- `openspec/changes/archive/2026-10-16-ejercicio-1-estructura-pantallas/proposal.md` (lectura directa, 113 líneas): usado SOLO como referencia de formato (encabezado Why/What Changes/Capabilities/Impact + 9 secciones numeradas). De él se hereda la convención, no contenido funcional.
- `docs/prompts/Plantilla Prompts.md` (lectura directa, 140 líneas): convención de prompts aplicada — 9 secciones SPEC, placeholders `{{DATO_PENDIENTE: …}}`, preguntas abiertas sin cerrar, distinción hechos/supuestos/propuestas.
- `docs/prompts/02-Ejercicio-2-Presentacion-CSS-SPEC.md` (lectura directa, 147 líneas): briefing operativo de este change (R-01..R-10, CA-01..CA-04, inclusiones/exclusiones, convenciones CSS de Fase 3). Es la fuente de los requisitos citados en la sección 4.
- Estado CLI verificado por ejecución directa: `openspec list --json` → `{"changes": []}`; `openspec status --change "ejercicio-2-presentacion-css"` → error «Change not found» (antes de crear); `Test-Path css/js` → `False`/`False`. Change creado con `openspec new change "ejercicio-2-presentacion-css"` (nunca manualmente). Nota de herramientas: `openspec instructions proposal --change … --json` y `openspec instructions proposal --json` devuelven error «No changes found / Change not found» cuando no hay change; el formato esperado se obtuvo en su lugar del template resuelto por `openspec templates` en `schemas/spec-driven/templates/proposal.md` (secciones Why / What Changes / Capabilities / Impact), combinado con las 9 secciones exigidas por el briefing.
- Project Standards: `Test-Path` de `.atl/skill-registry.md` y `.agents/SKILLS.md` → ambos `False` (no existen). Se omite esta sección por inexistencia, declarado aquí explícitamente.

## 3. Alcance incluido y exclusiones explícitas

**Incluido (propuesta, traza a R-01..R-10):**

- Identidad visual propia y coherente aplicada a las 5 vistas: paleta, tipografía, espaciado, tarjetas del catálogo, formularios, botones, tablas y mensajes — definidos una vez, reutilizados en todos los elementos equivalentes (R-01, R-02, R-09).
- CSS en archivo(s) externo(s) bajo `css/` enlazado(s) con `<link rel="stylesheet">`; cero `<style>` estructural; cero CDN/`@import` remoto (R-02, R-08).
- Layout con Flexbox o Grid declarado por zona en la sección 5 (R-03).
- Adaptación 320 px y 1280 px: página sin scroll-x; tablas anchas con scroll propio en su wrapper (R-04).
- `:focus-visible` reforzado + teclado completo sin trampas (R-05).
- Errores/estados con texto explícito reutilizando los `aria-live` existentes (R-06).
- Tratamiento de imágenes con `alt` o decisión explícita documentada de no usar (R-07).
- Preservación de ganchos DOM Ej. 3–5, sin `display: none` permanente (R-10).

**Excluido explícitamente (no especificar en detalle ni implementar en este change):**

- Ej. 1: reestructuración del HTML, cambio de vistas, renombrado de ids, alteración de formularios/tablas más allá del `<link>` y wrappers mínimos de scroll justificados.
- Ej. 3: arrays/objetos, renderizado del catálogo por JS, filtro funcional.
- Ej. 4: validaciones funcionales, `preventDefault`, actualización dinámica.
- Ej. 5: subtotal/total, duplicados, confirmación, historial inmutable, precio histórico.
- Ej. 6: localStorage, casos manuales, README.
- JS funcional nuevo de cualquier tipo; edición/eliminación de registros; stock/cobros/facturación; paginación; autenticación; modo oscuro adicional; animaciones que comprometan legibilidad o foco; internacionalización.

## 4. Requisitos y escenarios observables + casos límite

Fuente de cada requisito: `docs/prompts/02-Ejercicio-2-Presentacion-CSS-SPEC.md` (fiel a la consigna pág. 2). Los escenarios son observables manualmente vía `file://` en Chrome/Firefox actuales. Ningún escenario se presenta como ejecutado (esta fase es SPEC, sin implementación).

- R-01 Identidad coherente en 5 vistas: paleta, tipografía, espaciado, tarjetas, formularios, botones y tablas definidos una vez y aplicados igual. Escenario: recorrer Catálogo → Libros → Clientes → Ventas → Historial y comprobar que cada tipo de elemento equivalente luce igual. Caso límite: el `article` de ejemplo estructural del catálogo debe usar las mismas clases de tarjeta que usarán las filas generadas por JS en Ej. 3 (cobertura futura, sin implementar JS).
- R-02 CSS externo con clases reutilizables: hoja(s) en `css/` + `<link>`; cero `<style>` estructural; cero CDN/`@import` remoto; una clase de botón / tarjeta / campo / mensaje / tabla reutilizada en lugar de reglas duplicadas por vista. Escenario: inspeccionar `index.html` (un `<link>` presente, ningún `<style>`) y DevTools → Sources muestra solo CSS local.
- R-03 Layout Flexbox o Grid declarado: el SPEC declara qué técnica en cada zona (ver sección 5); `header`/`nav`/`main`/`section`/`footer` intactos; wrappers `overflow-x: auto` alrededor de `tabla-renglones`/`tabla-historial` —si aplican— documentados sin cambiar ids ni semántica. Escenario: identificar en el CSS la regla de layout por zona y en el DOM que los ids de tablas y secciones son los mismos del Ejercicio 1.
- R-04 Adaptación 320/1280 px: textos y controles legibles; `html`/`body` sin scroll-x en ambos anchos; tablas anchas con scroll solo en su contenedor. Casos límite: 320 px (viewport mínimo, nav y formularios apilados, sin scroll-x de página), 1280 px (aprovechamiento del ancho sin dispersión), tabla con 5 columnas a 320 px (scroll propio del wrapper, página fija). Verificación prevista: DevTools a ambos anchos vía `file://` (Fase 3, no ejecutada en SPEC).
- R-05 Foco y teclado: `:focus-visible` reforzado (nunca `outline: none` sin reemplazo) en enlaces, campos, botones y selects; recorrido Tab / Shift+Tab / Enter / Espacio opera todo sin trampas. Caso límite: tabular desde el primer enlace del `nav` hasta el `footer` sin perder el foco de vista y con indicador siempre visible.
- R-06 Errores con texto + `aria-live`: mensajes con texto explícito además de color; se reutilizan `resultado-alta-libro`, `resultado-alta-cliente`, `resultado-venta`, `mensaje-sin-resultados` (todos con `aria-live="polite"` existentes). Caso límite: mensaje de error solo por color queda prohibido; el texto debe leerse sin interpretar el color.
- R-07 Imágenes: informativas con `alt` descriptivo; decorativas con `alt=""` o fondo CSS; si no hay imágenes, decisión explícita documentada y no se exige `alt`. Caso límite: cero imágenes es válido solo si el SPEC lo declara (ver decisión P-04 pendiente).
- R-08 `file://` sin peticiones externas: cero filas en Network distintas del propio `index.html` y CSS local; verificado en Chrome/Firefox a 320 px y 1280 px (Fase 3, no ejecutado en SPEC).
- R-09 Convenciones: `css/` en minúsculas con guiones (p. ej. `css/styles.css`); CSS organizado por secciones comentadas (base → layout → componentes → vistas → responsive → foco/accesibilidad); clases comprensibles con guiones; separación estructura / presentación / comportamiento. Escenario: abrir el CSS y encontrar las secciones comentadas en ese orden.
- R-10 Ganchos Ej. 3–5 preservados: mismos ids de buscador (`buscador-catalogo`, `busqueda-titulo`, `listado-catalogo`), selects (`libro-editorial`, `libro-genero`, `libro-autores`, `venta-cliente`, `renglon-libro`, `renglon-cantidad`), renglones (`tabla-renglones`, `resumen-venta`, `venta-total`, `boton-confirmar-venta`), historial (`tabla-historial`, `detalle-venta`) y estados; sin `display: none` permanente ni deshabilitación funcional. Caso límite: el CSS no debe ocultar `mensaje-*-vacio` de forma irreversible (su alternancia la hará el JS futuro).

## 5. Estructura/componentes propuestos, interfaces y datos

Propuesta (no implementada; detalle proporcional al alcance; sin código en esta fase):

- Organización `css/`: un archivo `css/styles.css` como opción por defecto; alternativa de varios archivos (p. ej. `css/base.css`, `css/layout.css`, `css/componentes.css`) solo si el usuario la elige (ver P-03). En cualquier caso, todo bajo `css/` en minúsculas con guiones, con secciones comentadas en este orden: base → layout → componentes → vistas → responsive → foco/accesibilidad (anticipa la convención de Fase 3: indentación 2 espacios, minúsculas, clases con guiones, sin `!important` salvo justificación documentada).
- Enlace/interface con el HTML: única adición estructural autorizada en `index.html`: `<link rel="stylesheet" href="css/styles.css">` (ruta exacta según organización elegida) en `<head>`; más, solo si se aprueba, un wrapper mínimo por tabla (`div.tabla-contenedor` con `overflow-x: auto` alrededor de `tabla-renglones` y `tabla-historial`) sin tocar `id`, `thead`/`th` ni `aria`. Sin otros cambios de marcado.
- Layout declarado por zona (propuesta por defecto, ajustable en PLAN tras respuestas):
  - `header` + `nav ul`: Flexbox en fila a 1280 px (título + 5 enlaces en línea), columna apilada a 320 px.
  - `main` + 5 `section`: bloque centrado con ancho máximo y espaciado uniforme; Grid reservado para `listado-catalogo` (tarjetas en retícula que colapsa a 1 columna a 320 px).
  - Formularios (`buscador-catalogo`, `form-alta-libro`, `form-alta-cliente`, `form-renglon`): Flexbox en columna (label sobre campo); a 1280 px se permite fila solo para `buscador-catalogo` (input + botón).
  - Tablas: bloque con wrapper de scroll propio (`overflow-x: auto`).
  - `footer`: bloque centrado. La elección final Flexbox/Grid por zona queda fijada en el SPEC detallado tras la respuesta a P-06.
- Clases reutilizables (una definición, uso en las 5 vistas; nombres ilustrativos con guiones, no código final): `boton` (+ variantes `boton-primario`), `tarjeta-libro`, `campo` / `etiqueta-campo`, `mensaje` (+ `mensaje-error`, `mensaje-vacio`, `mensaje-exito`), `tabla` (+ `tabla-contenedor` para el wrapper de scroll), `barra-navegacion`, `contenedor-principal`, `resumen-venta`. Los puntos de extensión visual para Ej. 3–5 (nuevas tarjetas/filas generadas por JS) quedan cubiertos por estas mismas clases.
- Datos: este change no crea ni consume datos. Solo reutiliza los textos ficticios ya presentes en `index.html` (p. ej. el `article` de ejemplo estructural). Queda prohibido inventar el catálogo definitivo de 6 libros, clientes o ventas reales (reservado a Ej. 3–5). No se presentan capturas ni descripciones de color como datos reales sin el CSS que las produce.
- Paleta/tipografía/espaciado concretos: pendientes de decisión del usuario (P-01, P-02); en el SPEC se expresan hasta entonces como `{{DATO_PENDIENTE: paleta de colores elegida}}`, `{{DATO_PENDIENTE: tipografía del sistema o fuente local elegida}}` y `{{DATO_PENDIENTE: escala de espaciado}}`.

## 6. Estados y manejo de errores

Sin JS nuevo en este change, los estados son presentacionales; su activación funcional corresponde a Ej. 3–5. Lo que este change sí especifica es su estilo:

- Lista vacía (`mensaje-catalogo-vacio`, `mensaje-libros-vacio`, `mensaje-clientes-vacio`, `mensaje-renglones-vacio`, `mensaje-historial-vacio`): estilo de `mensaje-vacio` con texto legible y contraste suficiente; visibles por defecto en el HTML actual; el CSS no los oculta de forma permanente.
- Búsqueda sin resultados (`mensaje-sin-resultados`, `hidden` por defecto): estilo de `mensaje-error`/`mensaje-vacio` con texto explícito; se reutiliza en Ej. 3.
- Resultado de operación (`resultado-alta-libro`, `resultado-alta-cliente`, `resultado-venta`, todos `aria-live="polite"`): estilos `mensaje-exito` / `mensaje-error` diferenciados por texto + icono/borde además de color (nunca solo color); contraste suficiente.
- Foco y teclado como «estado» transversal: `:focus-visible` con contorno de alto contraste en todos los interactivos; sin trampas de foco; el CSS nunca elimina el contorno sin reemplazo.
- Tablas desbordadas: estado de scroll propio del wrapper (`tabla-contenedor`) con indicador de desplazamiento; la página nunca entra en scroll-x por este motivo.

## 7. Restricciones técnicas y convenciones

- Stack autorizado: HTML existente del Ejercicio 1 + CSS nativo puro externo en `css/`; Flexbox y/o Grid; tipografías del sistema o fuentes locales del proyecto. Apertura directa `index.html` vía `file://`, sin npm/servidor; verificación en Chrome/Firefox actuales a 320 px y 1280 px.
- Prohibidos: Bootstrap/Tailwind/CDN, `@import` remoto, preprocesadores/compiladores, JS funcional nuevo, backend/API/DB/servidor, dependencias instaladas.
- HTML: solo `<link>` + wrappers mínimos de scroll justificados; prohibido reestructurar secciones, renombrar `id`/`name`, alterar jerarquía `h1`/`h2`, o cambiar `label`/`thead`/`th`/`aria-live`.
- CSS (anticipa convenciones de Fase 3, no implementa): indentación 2 espacios, minúsculas, clases con guiones, organización base → layout → componentes → responsive → accesibilidad con secciones comentadas, sin `!important` salvo justificación documentada; separación estricta estructura (HTML) / presentación (CSS) / comportamiento (JS futuro).
- Verificación manual reproducible y sin frameworks (Fase 3): apertura `file://`; registro a 320 px y 1280 px sin scroll-x de página; recorrido completo por teclado con foco visible; Network sin peticiones externas; tablas con scroll propio. En esta fase SPEC no se ejecuta ni se declara aprobada ninguna comprobación.

## 8. Criterios de aceptación vinculados a requisitos

- [ ] CA-01 — Identidad coherente y CSS externo con clases reutilizables: mismos botones/tarjetas/formularios/tablas en las 5 vistas, un solo lugar de definición por componente, cero CDN/inline estructural (cubre R-01, R-02, R-09; 8 pts coherencia y organización).
- [ ] CA-02 — Layout Flexbox/Grid declarado y adaptación 320/1280 px: contenido legible, página sin scroll-x, tablas con scroll propio verificable en DevTools vía `file://` (cubre R-03, R-04, R-08; 8 pts adaptación).
- [ ] CA-03 — Foco visible + teclado + errores con texto + imágenes con `alt`/decisión explícita, verificable por recorrido Tab y lectura de mensajes (cubre R-05, R-06, R-07; 4 pts accesibilidad básica).
- [ ] CA-04 — Estructura del Ejercicio 1 intacta y ganchos JS futuros preservados: mismos ids/semántica/encabezados, `aria-live` reutilizados, sin contenido funcional oculto (cubre R-10).
- [ ] Se cubre todo el alcance aprobado y no se incorpora trabajo excluido.
- [ ] Se respetan las tecnologías, dependencias y convenciones permitidas.
- [ ] Las comprobaciones exigidas se ejecutaron y sus resultados se informan con evidencia (pendiente en SPEC; se ejecuta en Fase 3).
- [ ] Se distinguen los controles aprobados, fallidos, omitidos y pendientes; ningún control no ejecutado se presenta como aprobado.
- [ ] Los supuestos, placeholders pendientes y limitaciones quedan identificados (ver sección 9).

## 9. Supuestos, información pendiente y decisiones que requieren respuesta del usuario

**Supuestos declarados (no verificados, adoptados para poder especificar):**

- S-01: se asume apertura `file://` con doble clic en Chrome/Firefox actuales como único entorno de verificación; no se ensaya otro navegador en esta entrega (fuente: consigna pág. 2 + briefing).
- S-02: se asume una sola hoja `css/styles.css` como opción por defecto hasta respuesta de P-03; el SPEC detallado y `tasks.md` asumirán esa variante salvo indicación contraria.
- S-03: se asume que basta con wrappers mínimos de scroll para las 2 tablas si a 320 px desbordan; cualquier otro cambio de marcado requeriría re-aprobación del SPEC.
- S-04: se asume que cero imágenes es aceptable si se declara explícitamente (la consigna lo permite al exigir `alt` solo «si se usan»).

**Información pendiente no bloqueante (placeholders autorizados):**

- `{{DATO_PENDIENTE: paleta de colores elegida (fondos, texto, acentos, estados)}}`.
- `{{DATO_PENDIENTE: tipografía elegida (familia del sistema o fuente local + tamaños base)}}`.
- `{{DATO_PENDIENTE: escala de espaciado y ancho máximo del contenido}}`.
- `{{DATO_PENDIENTE: decisión final de imágenes (usar con procedencia y alt, o no usar con declaración explícita)}}`.
- `{{DATO_PENDIENTE: elección Flexbox vs Grid por zona si el usuario no fija preferencia}}`.

**Preguntas concretas que requieren respuesta del usuario (SIN cerrar por mi cuenta; impiden fijar el SPEC detallado hasta responder):**

- P-01 Paleta: ¿tenés colores preferidos para «Libreria Nya» (o autorizás que proponga una paleta propia y coherente en PLAN)? No asumo ningún color hasta tu respuesta.
- P-02 Tipografía: ¿uso pilas de tipografías del sistema (p. ej. sans-serif del sistema) o proveés fuentes locales del proyecto? No descargo ni enlazo nada externo sin tu indicación.
- P-03 Organización `css/`: ¿un solo `css/styles.css` o varios archivos (p. ej. base/layout/componentes)? No creo ninguna variante hasta tu elección.
- P-04 Imágenes: ¿incluyo imágenes (indicando cuáles, su procedencia y su `alt`) o declaro explícitamente que no se usan? No agrego ningún recurso gráfico sin tu decisión.
- P-05 Wrappers de scroll: ¿autorizás agregar un `div.tabla-contenedor` con `overflow-x: auto` alrededor de `tabla-renglones` y `tabla-historial` (sin tocar ids ni semántica) si a 320 px desbordan? No modifico el marcado hasta tu autorización.
- P-06 Layout: ¿preferís Flexbox, Grid o la combinación propuesta en la sección 5 (Flexbox en header/nav/formularios, Grid en catálogo)? No fijo la declaración final hasta tu respuesta.
