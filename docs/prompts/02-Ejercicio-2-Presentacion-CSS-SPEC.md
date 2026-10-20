# Prompt SDD (Active-Stack) — Ejercicio 2 · Presentación con CSS y uso adaptable

> Uso: pegar este prompt completo como mensaje al agente. Es la entrega 2 de 6 del parcial. Cubre UNICAMENTE el Ejercicio 2. No autoriza trabajo de los Ejercicios 1, 3–6.

---

## Rol

Actuá como diseñador frontend senior, con experiencia en CSS nativo, layouts adaptables y accesibilidad básica y responsabilidad sobre la especificación verificable del Ejercicio 2, su correspondencia con la consigna y la aplicación de estilos sin romper la estructura HTML del Ejercicio 1 ni implementar JavaScript.

## Metodología

- Metodología a utilizar: SDD (Spec-Driven Development) con framework Active-Stack (active-orchestrator + OpenSpec).
- Herramientas y convenciones: lectura del repositorio actual, `docs/Consigna Primer Parcial.pdf` (pág. 2, Ejercicio 2 completo; pág. 6 criterios: Ejercicio 2 = 20 pts → coherencia y organización 8 + adaptación 8 + accesibilidad básica 4), `docs/prompts/Plantilla Prompts.md`, convención OpenSpec (`openspec/changes/<change>/proposal.md` + `tasks.md`), CSS nativo en archivos externos, Flexbox o Grid, sin build tools.
- Respetá las fases SPEC → PLAN → IMPLEMENTACIÓN descritas abajo, adaptando sus entregables a SDD + OpenSpec.
- No escribas código ni modifiques el producto antes de completar la especificación y obtener mi aprobación explícita de ella. La creación de los documentos SPEC y PLAN solicitados sí forma parte del trabajo autorizado.
- Si las herramientas o convenciones indicadas no están disponibles, informalo y proponé una alternativa antes de depender de ella.

## Contexto del proyecto

- Nombre o identificador: parcial1_programacion — frontend de librería «Libreria Nya» (Parcial 1, Programación III).
- Propósito y usuarios: presentar catálogo de librería y registrar libros, clientes y ventas de forma simulada en el navegador. Usuarios: docente evaluador y estudiantes que operan la interfaz.
- Ubicación o repositorio: `C:\Users\maria\Documents\00. FACULTAD 2026\Programación III - Torres\Trabajos Prácticos\parcial1\parcial1_programacion`.
- Estado actual verificado: Ejercicio 1 implementado. Existe `index.html` en raíz con `header` + `nav` (5 enlaces a `#vista-catalogo`, `#vista-libros`, `#vista-clientes`, `#vista-ventas`, `#vista-historial`) + `main` con 5 `section` + `footer`; formularios `form-alta-libro`, `form-alta-cliente`, `form-renglon`, `buscador-catalogo`; tablas `tabla-renglones` y `tabla-historial`; contenedores de estado (`mensaje-catalogo-vacio`, `mensaje-sin-resultados`, `resultado-alta-libro`, `resultado-alta-cliente`, `resultado-venta`, `aria-live="polite"`). NO existe carpeta `css/` ni ningún `.css` externo; NO existe carpeta `js/`; `index.html` no tiene `<link rel="stylesheet">` ni `<style>` (verificado por inspección directa del repo). Spec aprobado del Ejercicio 1 en `openspec/specs/estructura-pantallas-html/spec.md` y change archivado en `openspec/changes/archive/2026-10-16-ejercicio-1-estructura-pantallas/`. Todo el Ejercicio 2 está pendiente.
- Fuentes de requisitos: `docs/Consigna Primer Parcial.pdf` (pág. 1 contexto/alcance, pág. 2 Ejercicio 2 completo, pág. 6 criterios del Ejercicio 2); `index.html` actual (estructura a estilizar, no a reestructurar); `openspec/specs/estructura-pantallas-html/spec.md` (contrato de ids/ganchos a preservar); estado del repo verificado por inspección directa.
- Tecnologías y dependencias permitidas: CSS nativo puro en uno o más archivos externos dentro de `css/` (p. ej. `css/styles.css`); Flexbox y/o Grid; tipografías del sistema o fuentes locales del proyecto; HTML existente del Ejercicio 1 sin cambios estructurales salvo ajustes mínimos justificados; apertura directa de `index.html` en navegador sin npm.
- Tecnologías y dependencias excluidas: librerías, frameworks y CDNs de CSS o JavaScript (incluye Bootstrap, Tailwind y equivalentes); `@import` remoto; preprocesadores y herramientas de compilación; JavaScript funcional nuevo; API, base de datos, servidor o backend; dependencias instaladas.
- Punto de entrada o componente afectado: `index.html` (solo para enlazar la hoja externa vía `<link>`, sin reestructurar secciones) y la nueva hoja `css/styles.css` (u organización equivalente dentro de `css/`) que estiliza las 5 vistas: Catálogo (tarjetas/listado), Libros, Clientes (formularios + listados), Ventas (renglones + resumen) e Historial (tablas + detalle).
- Condiciones del entorno: apertura vía `file://` (doble clic en `index.html`), sin servidor ni npm; verificación en Chrome/Firefox actuales; anchos de referencia obligatorios 320 px y 1280 px; navegación completa por teclado.

## Alcance estricto

### Objetivo de esta entrega

Obtener la especificación aprobada (Fase 1) —y luego plan e implementación solo tras aprobación— de la identidad visual CSS adaptable y accesible del Ejercicio 2, aplicada sobre el HTML existente sin romper sus ganchos DOM para el JavaScript futuro (Ej. 3–5).

### Incluido

- Identidad visual propia y coherente: paleta de colores, tipografía, espaciado, tarjetas del catálogo, formularios, botones y tablas definidos una sola vez y aplicados de forma consistente en las 5 vistas.
- CSS en archivo(s) externo(s) dentro de `css/` enlazado(s) desde `index.html` con `<link>`; clases reutilizables para elementos equivalentes (botones, tarjetas, campos, mensajes, tablas); cero `<style>` inline estructural y cero CSS embebido salvo justificación documentada.
- Layout con Flexbox o Grid (declarar cuál y dónde en el SPEC); organización del contenido principal, navegación, listados y formularios.
- Adaptación verificada a 320 px y 1280 px: textos y controles legibles, sin desplazamiento horizontal de toda la página (`body`/`html` sin scroll-x); si una tabla necesita más ancho, se desplaza dentro de su propio contenedor (`overflow-x: auto` sobre el wrapper de la tabla, no sobre la página).
- Foco visible preservado y reforzado (`:focus-visible`) en enlaces, campos, botones y selects; recorrido completo por teclado sin trampas de foco.
- Mensajes de error/estado expresados con texto explícito (además de color, nunca solo color); se reutilizan los contenedores con `aria-live` del Ejercicio 1.
- Tratamiento de imágenes: si se usan, las informativas llevan `alt` descriptivo y las decorativas llevan `alt=""` o se implementan como fondo CSS; si no se usan imágenes, decisión explícita documentada en el SPEC.
- Preservación total de los `id`, `name`, estructura semántica y jerarquía de encabezados del Ejercicio 1.

### Excluido

- Ejercicio 1 (reestructuración del HTML, cambio de vistas, renombrado de ids, alteración de formularios/tablas más allá del enlace al CSS y wrappers mínimos de scroll para tablas si el SPEC los justifica).
- Ejercicio 3 (arrays/objetos de datos, renderizado del catálogo por JS, filtro funcional).
- Ejercicio 4 (validaciones funcionales de alta de libros/clientes, `preventDefault`, actualización dinámica).
- Ejercicio 5 (cálculos de subtotal/total, duplicados, confirmación de venta, historial inmutable).
- Ejercicio 6 (localStorage, casos manuales, README).
- Cualquier JavaScript funcional, edición/eliminación de registros, gestión de stock/cobros/facturación, paginación, autenticación, modo oscuro adicional, animaciones que comprometan legibilidad o foco, internacionalización.

No agregues funcionalidades, dependencias, integraciones ni refactorizaciones ajenas a esta entrega. Si detectás una necesidad fuera de alcance, describila como propuesta pendiente; no la implementes sin autorización.

## Requisitos

| ID | Grupo | Requisito verificable |
| --- | --- | --- |
| R-01 | Funcional | La identidad visual es propia y coherente: paleta, tipografía, espaciado, tarjetas, formularios, botones y tablas se definen una vez y se aplican igual en las 5 vistas; inspección visual muestra los mismos estilos para elementos equivalentes. |
| R-02 | Estructura e interfaces | El CSS vive en archivo(s) externo(s) bajo `css/` enlazado(s) con `<link rel="stylesheet">` desde `index.html`; no hay `<style>` estructural ni referencias a CDN/`@import` remoto; las clases se reutilizan (p. ej. una clase de botón, una de tarjeta, una de mensaje) en lugar de duplicar reglas por vista. |
| R-03 | Estructura e interfaces | El layout usa Flexbox o Grid (declarado en el SPEC con secciones afectadas); `header`/`nav`/`main`/`section`/`footer` del Ejercicio 1 se mantienen; cualquier wrapper agregado (p. ej. contenedor con `overflow-x: auto` alrededor de `tabla-renglones` / `tabla-historial`) se documenta y no cambia ids ni semántica. |
| R-04 | Datos y estados | A 320 px y 1280 px los textos y controles son legibles y la página completa no genera scroll horizontal; las tablas anchas generan scroll solo dentro de su contenedor propio; se verifica con DevTools a ambos anchos vía `file://`. |
| R-05 | Calidad | Los controles interactivos conservan foco visible (`:focus-visible` u equivalente reforzado, nunca `outline: none` sin reemplazo) y toda la interfaz se recorre y opera por teclado (Tab/Shift+Tab/Enter/Espacio) sin trampas. |
| R-06 | Calidad | Los mensajes de error/estado usan texto explícito además de color (contraste suficiente, no dependen solo del color); se reutilizan los contenedores `aria-live="polite"` existentes (`resultado-alta-libro`, `resultado-alta-cliente`, `resultado-venta`, `mensaje-sin-resultados`). |
| R-07 | Calidad | Imágenes: cada imagen informativa tiene `alt` descriptivo; cada decorativa usa `alt=""` o fondo CSS; si no se incluye ninguna imagen, el SPEC lo declara explícitamente y no se exige `alt`. |
| R-08 | Compatibilidad | Todo funciona abierto como archivo local sin servidor ni red: cero peticiones externas en la pestaña Network; verificado en Chrome/Firefox actuales a 320 px y 1280 px. |
| R-09 | Convenciones | Archivos en `css/` con minúsculas y guiones (p. ej. `css/styles.css`); CSS organizado por secciones comentadas (base, layout, componentes, vistas, responsive, foco/accesibilidad); nombres de clases comprensibles; separación estricta estructura (HTML) / presentación (CSS) / comportamiento (JS futuro). |
| R-10 | Preparación futura, si aplica | No se rompen los ganchos DOM de los Ej. 3–5 (ids de buscador, listados, selects, renglones, resumen, historial, detalle); el CSS no oculta (`display: none` permanente) ni deshabilita contenido funcional; los puntos de extensión visual (nuevas tarjetas/filas generadas por JS) quedan cubiertos por las clases definidas. |

Datos de ejemplo, si se necesitan: solo los textos ficticios ya presentes en `index.html` (p. ej. el `article` de ejemplo estructural del catálogo). No inventar el catálogo definitivo de 6 libros, ni clientes ni ventas reales (eso es Ej. 3–5). No presentar capturas o descripciones de color como datos reales sin mostrar el CSS que las produce.

## Fase 1 — SPEC

Hacé esta fase primero. Inspeccioná las fuentes y el estado existente dentro del alcance autorizado antes de definir la solución.

Generá `openspec/changes/ejercicio-2-presentacion-css/proposal.md` con:

1. Problema, objetivo y resultado esperado.
2. Contexto verificado y referencias concretas a las fuentes consultadas.
3. Alcance incluido y exclusiones explícitas.
4. Requisitos identificados y escenarios observables, incluidos los casos límite relevantes.
5. Estructura o componentes propuestos, interfaces y datos necesarios, con el detalle proporcional al alcance.
6. Estados y manejo de errores aplicables.
7. Restricciones técnicas y convenciones que condicionan la solución.
8. Criterios de aceptación vinculados a los requisitos.
9. Supuestos declarados, información pendiente y decisiones que requieren mi respuesta.

Si falta una decisión que impide especificar correctamente, formulá una pregunta concreta y esperá la respuesta. No cierres esa decisión por tu cuenta.

Al terminar, presentá la especificación para revisión y detenete. No avances a PLAN ni IMPLEMENTACIÓN en esta primera respuesta.

## Fase 2 — PLAN

Cuando autorice avanzar, generá `openspec/changes/ejercicio-2-presentacion-css/tasks.md` con un checklist de tareas atómicas. Para cada tarea indicá:

- Identificador y resultado esperado.
- Requisito o criterio de aceptación que cubre.
- Archivos, componentes o entregables a crear o modificar.
- Dependencias y orden de ejecución.
- Comprobación concreta que permitirá darla por terminada.

Incluí solo trabajo dentro del alcance. Respetá la estructura existente y justificá los cambios estructurales necesarios. Si el plan exige cambiar la especificación, proponé el ajuste y obtené su aprobación antes de implementar.

## Fase 3 — IMPLEMENTACIÓN

Iniciá esta fase únicamente después de mi aprobación explícita de la especificación y mi autorización para implementar.

- Ejecutá las tareas del plan dentro del alcance aprobado.
- Aplicá convenciones CSS legible: indentación de 2 espacios, minúsculas, clases con guiones, organización base → layout → componentes → responsive → accesibilidad; sin `!important` salvo justificación documentada.
- Respetá verificación manual reproducible y sin frameworks: apertura de `index.html` vía `file://`; captura o registro de 320 px y 1280 px sin scroll horizontal de página; recorrido completo por teclado con foco visible; inspección de Network sin peticiones externas; comprobación de tablas con scroll propio.
- Usá solo las tecnologías, dependencias e integraciones autorizadas.
- No implementes las etapas futuras ni las funcionalidades excluidas.
- Verificá cada resultado con los controles aplicables y registrá su evidencia.
- Si aparece un impedimento o una contradicción que cambie la solución aprobada, informalo y consultame antes de ampliar el alcance.

Entregá `css/styles.css` (u organización equivalente dentro de `css/`) + ajuste mínimo de `<link>` en `index.html` funcionando por apertura directa, junto con un resumen de cambios, comprobaciones realizadas, limitaciones y pendientes.

## Criterios de aceptación

- [ ] CA-01 — Identidad coherente y CSS externo con clases reutilizables: mismos botones/tarjetas/formularios/tablas en las 5 vistas, un solo lugar de definición por componente, cero CDN/inline estructural (cubre R-01, R-02, R-09; 8 pts coherencia y organización).
- [ ] CA-02 — Layout Flexbox/Grid declarado y adaptación 320/1280 px: contenido legible, página sin scroll horizontal, tablas con scroll propio verificable en DevTools vía `file://` (cubre R-03, R-04, R-08; 8 pts adaptación).
- [ ] CA-03 — Foco visible + teclado + errores con texto + imágenes con `alt`/decisión explícita, verificable por recorrido Tab y lectura de mensajes (cubre R-05, R-06, R-07; 4 pts accesibilidad básica).
- [ ] CA-04 — Estructura del Ejercicio 1 intacta y ganchos JS futuros preservados: mismos ids/semántica/encabezados, `aria-live` reutilizados, sin contenido funcional oculto (cubre R-10).
- [ ] Se cubre todo el alcance aprobado y no se incorpora trabajo excluido.
- [ ] Se respetan las tecnologías, dependencias y convenciones permitidas.
- [ ] Las comprobaciones exigidas se ejecutaron y sus resultados se informan con evidencia.
- [ ] Se distinguen los controles aprobados, fallidos, omitidos y pendientes; ningún control no ejecutado se presenta como aprobado.
- [ ] Los supuestos, placeholders pendientes y limitaciones quedan identificados.

## Restricciones anti-alucinación

- No inventes requisitos, funcionalidades, archivos existentes, APIs, contratos, credenciales, datos reales ni resultados de comprobaciones.
- Diferenciá los hechos verificados, los supuestos y las propuestas. Atribuí los hechos a las fuentes consultadas cuando corresponda.
- Si falta un dato no bloqueante, usá `{{DATO_PENDIENTE: descripción}}` y declaralo como pendiente. No lo reemplaces con un valor que parezca real.
- Si el dato faltante afecta el alcance, una decisión esencial o la validez de la solución, preguntá antes de avanzar con el trabajo afectado.
- No afirmes haber leído una fuente, ejecutado una herramienta o validado un resultado si no ocurrió. Si no tenés acceso, informalo.
- Usá datos ficticios solo cuando estén autorizados y señalalos como ejemplos.
- Ante requisitos contradictorios, señalá la contradicción y pedí una decisión; no elijas silenciosamente.
- No declares completa la entrega si quedan criterios sin verificar. Enumerá los pendientes y sus motivos.

## Instrucción de inicio

Empezá ahora únicamente por la **Fase 1 — SPEC**. Generá el documento de especificación indicado, presentalo para revisión y esperá mi respuesta. No avances automáticamente a PLAN ni IMPLEMENTACIÓN. Antes de implementar, solicitá mi aprobación explícita de la especificación y mi autorización para iniciar la Fase 3.
