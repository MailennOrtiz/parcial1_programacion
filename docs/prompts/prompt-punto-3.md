# Prompt SDD (Active-Stack) — Ejercicio 3 · Catálogo con datos y filtro en JavaScript

> Uso: pegar este prompt completo como mensaje al agente. Es la entrega 3 de 6 del parcial. Cubre UNICAMENTE el Ejercicio 3. No autoriza trabajo de los Ejercicios 1, 2, 4–6.

---

## Rol

Actuá como desarrollador frontend senior, con experiencia en JavaScript nativo, modelado de datos en memoria y manipulación segura del DOM y responsabilidad sobre la especificación verificable del Ejercicio 3, su correspondencia con la consigna y la implementación del catálogo filtrable sin romper la estructura HTML ni los estilos ya aprobados.

## Metodología

- Metodología a utilizar: SDD (Spec-Driven Development) con framework Active-Stack (active-orchestrator + OpenSpec).
- Herramientas y convenciones: lectura del repositorio actual, `docs/Consigna Primer Parcial.pdf` (Ejercicio 3 completo; `{{DATO_PENDIENTE: número de página y puntaje del Ejercicio 3}}`), `docs/prompts/Plantilla Prompts.md`, consigna textual del Ejercicio 3 provista en el pedido, convención OpenSpec (`openspec/changes/<change>/proposal.md` + `tasks.md`), JavaScript nativo en archivo externo, sin build tools.
- Respetá las fases SPEC → PLAN → IMPLEMENTACIÓN descritas abajo, adaptando sus entregables a SDD + OpenSpec.
- No escribas código ni modifiques el producto antes de completar la especificación y obtener mi aprobación explícita de ella. La creación de los documentos SPEC y PLAN solicitados sí forma parte del trabajo autorizado.
- Si las herramientas o convenciones indicadas no están disponibles, informalo y proponé una alternativa antes de depender de ella.

## Contexto del proyecto

- Nombre o identificador: parcial1_programacion — frontend de librería «Libreria Nya» (Parcial 1, Programación III).
- Propósito y usuarios: presentar catálogo de librería y registrar libros, clientes y ventas de forma simulada en el navegador. Usuarios: docente evaluador y estudiantes que operan la interfaz.
- Ubicación o repositorio: `C:\Users\leo\OneDrive\Desktop\Parcial-1\parcial1_programacion`.
- Estado actual verificado: Ejercicio 1 implementado (`index.html` con `header` + `nav` de 5 vistas + `main` con 5 `section` + `footer`) y Ejercicio 2 implementado (`css/styles.css` enlazado con `<link>`). En la vista Catálogo existen `form#buscador-catalogo` con `input#busqueda-titulo` y botón «Buscar», `p#mensaje-sin-resultados` (`aria-live="polite"`, `hidden`), `div#listado-catalogo` con un `article.tarjeta-libro` de ejemplo estructural y `p#mensaje-catalogo-vacio`. NO existe carpeta `js/`; NO existe ningún archivo `.js`; `index.html` no tiene `<script>` (verificado por inspección directa del repo). Specs aprobados en `openspec/specs/estructura-pantallas-html/spec.md` y `openspec/specs/presentacion-css-adaptable/spec.md`, con changes archivados en `openspec/changes/archive/`. Todo el Ejercicio 3 está pendiente.
- Fuentes de requisitos: consigna textual del Ejercicio 3 provista en el pedido (arrays/objetos con ids estables, ≥6 libros, ≥2 editoriales, ≥2 géneros, ≥3 autores, ≥3 clientes ficticios; cada libro con editorial existente y uno o más autores existentes; género opcional que, si existe, apunta a un género existente; catálogo generado desde el array de libros; filtro por título case-insensitive, parcial y con `trim`; búsqueda vacía muestra todo; sin coincidencias muestra mensaje claro; eventos y funciones con responsabilidades reconocibles; datos de usuarios insertados como texto en el DOM; sin fetch ni ABM de editoriales/géneros/autores); `docs/Consigna Primer Parcial.pdf` (`{{DATO_PENDIENTE: página y puntaje del Ejercicio 3 — el PDF no pudo leerse}}`); `index.html` actual (ganchos DOM a reutilizar); `css/styles.css` (clases existentes a reutilizar); estado del repo verificado por inspección directa.
- Tecnologías y dependencias permitidas: JavaScript nativo (ES moderno sin módulos ni transpilación) en archivo(s) externo(s) dentro de `js/`, DOM API estándar, apertura directa de `index.html` en navegador sin npm.
- Tecnologías y dependencias excluidas: librerías, frameworks y CDNs de JavaScript (jQuery, Lodash, React, etc.); `fetch`, XHR, WebSockets, cualquier red o backend; almacenamiento persistente (localStorage/sessionStorage); preprocesadores y herramientas de compilación; modificaciones de CSS salvo justificación mínima; alta/baja/modificación de editoriales, géneros o autores.
- Punto de entrada o componente afectado: `index.html` (solo para enlazar el script nuevo), el nuevo archivo `js/` (nombres en minúsculas con guiones, p. ej. `js/datos.js` y `js/catalogo.js`, o un único archivo si el SPEC lo justifica) y la vista Catálogo (`#vista-catalogo`, `#buscador-catalogo`, `#busqueda-titulo`, `#listado-catalogo`, `#mensaje-sin-resultados`, `#mensaje-catalogo-vacio`).
- Condiciones del entorno: apertura vía `file://` (doble clic en `index.html`), sin servidor ni npm; verificación en Chrome/Firefox actuales; DevTools para inspección de consola y DOM.

## Alcance estricto

### Objetivo de esta entrega

Obtener la especificación aprobada (Fase 1) —y luego plan e implementación solo tras aprobación— de los datos en memoria, el renderizado del catálogo y el filtro por título del Ejercicio 3, sobre el HTML/CSS existentes, dejando ganchos y datos listos para los Ejercicios 4–5 sin reestructurar.

### Incluido

- Modelado de datos en arrays de objetos con identificadores estables: al menos 6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes ficticios, declarados como ejemplos.
- Integridad referencial: cada libro referencia una editorial existente y uno o más autores existentes por identificador; el género es opcional y, cuando existe, referencia un género existente. Relaciones resueltas en el render (nombre de editorial, nombres de autores, género o texto «Sin clasificar»).
- Generación del catálogo en `#listado-catalogo` a partir del array de libros, con los mismos campos que define el HTML de la Ejercicio 1 (título, ISBN, editorial, género o «Sin clasificar», autores, precio), reutilizando las clases existentes (`tarjeta-libro`) y sustituyendo el `article` de ejemplo estructural.
- Filtro por título: ignora diferencias entre mayúsculas y minúsculas, busca coincidencias parciales y elimina espacios sobrantes en los extremos (`trim`).
- Estados del filtro: búsqueda vacía o solo espacios muestra todo el catálogo; búsqueda sin coincidencias muestra mensaje claro reutilizando `#mensaje-sin-resultados`; con coincidencias se oculta el mensaje.
- Manejo del envío del formulario `#buscador-catalogo` con `preventDefault` (sin recarga de página) y, si el SPEC lo incluye, reacción al escribir en `#busqueda-titulo`.
- Arquitectura de código: eventos y funciones con responsabilidades reconocibles y nombradas en consecuencia (p. ej. obtener datos, resolver relaciones, normalizar la búsqueda, filtrar, renderizar, mostrar/ocultar mensajes, registrar listeners).
- Inserción segura de datos de usuarios: todo texto escrito por usuarios y todo contenido generado se inserta como texto en el DOM (`textContent` o `createElement`), sin interpretación de marcado.
- Enlace del script desde `index.html` (preferentemente `defer`) sin alterar ids, semántica ni clases existentes.

### Excluido

- Ejercicio 1 (reestructuración del HTML, cambio de vistas, renombrado de ids).
- Ejercicio 2 (cambios de identidad visual, layout, responsive, foco o clases más allá de reutilizar las existentes).
- Ejercicio 4 (altas de libros y clientes, validaciones de formularios, `preventDefault` de esas altas, actualización dinámica de listados de alta, población de selects de editorial/género/autores para cargas).
- Ejercicio 5 (renglones, subtotales y totales, duplicados, confirmación de venta, historial inmutable con precio histórico).
- Ejercicio 6 (localStorage, casos manuales, README).
- Altas, bajas o modificaciones de editoriales, géneros o autores; edición o eliminación de libros; búsqueda por campos distintos del título; ordenamiento, paginación o tokenización avanzada; fetch o cualquier red; librerías y frameworks.

No agregues funcionalidades, dependencias, integraciones ni refactorizaciones ajenas a esta entrega. Si detectás una necesidad fuera de alcance, describila como propuesta pendiente; no la implementes sin autorización.

## Requisitos

| ID | Grupo | Requisito verificable |
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

Datos de ejemplo, si se necesitan: los datos ficticios autorizados son el conjunto mínimo del requisito (6 libros, 2 editoriales, 2 géneros, 3 autores, 3 clientes), declarados explícitamente como ejemplos de práctica y no como datos reales. No inventar datos adicionales fuera de ese conjunto mínimo salvo que el SPEC lo declare y lo presente a aprobación.

## Fase 1 — SPEC

Hacé esta fase primero. Inspeccioná las fuentes y el estado existente dentro del alcance autorizado antes de definir la solución.

Generá `openspec/changes/ejercicio-3-catalogo-datos-js/proposal.md` con:

1. Problema, objetivo y resultado esperado.
2. Contexto verificado y referencias concretas a las fuentes consultadas.
3. Alcance incluido y exclusiones explícitas.
4. Requisitos identificados y escenarios observables, incluidos los casos límite relevantes (búsqueda vacía, solo espacios, mayúsculas/minúsculas, coincidencia parcial al inicio/medio/final, sin coincidencias, libro sin género, libro con un autor vs. varios autores, entrada con caracteres especiales).
5. Estructura o componentes propuestos, interfaces y datos necesarios, con el detalle proporcional al alcance (esquema de cada entidad, cómo se resuelven las relaciones, funciones y eventos previstos).
6. Estados y manejo de errores aplicables (catálogo completo, con resultados, sin resultados, `#mensaje-catalogo-vacio` solo si el array de libros estuviera vacío).
7. Restricciones técnicas y convenciones que condicionan la solución (sin fetch, sin librerías, texto en el DOM, sin ABM de editoriales/géneros/autores).
8. Criterios de aceptación vinculados a los requisitos.
9. Supuestos declarados, información pendiente y decisiones que requieren mi respuesta.

Si falta una decisión que impide especificar correctamente, formulá una pregunta concreta y esperá la respuesta. No cierres esa decisión por tu cuenta.

Al terminar, presentá la especificación para revisión y detenete. No avances a PLAN ni IMPLEMENTACIÓN en esta primera respuesta.

## Fase 2 — PLAN

Cuando autorice avanzar, generá `openspec/changes/ejercicio-3-catalogo-datos-js/tasks.md` con un checklist de tareas atómicas. Para cada tarea indicá:

- Identificador y resultado esperado.
- Requisito o criterio de aceptación que cubre.
- Archivos, componentes o entregables a crear o modificar.
- Dependencias y orden de ejecución.
- Comprobación concreta que permitirá darla por terminada.

Incluí solo trabajo dentro del alcance. Respetá la estructura existente y justificá los cambios estructurales necesarios. Si el plan exige cambiar la especificación, proponé el ajuste y obtené su aprobación antes de implementar.

## Fase 3 — IMPLEMENTACIÓN

Iniciá esta fase únicamente después de mi aprobación explícita de la especificación y mi autorización para implementar.

- Ejecutá las tareas del plan dentro del alcance aprobado.
- Aplicá convenciones JS legibles: indentación de 2 espacios, minúsculas con guiones en archivos, nombres comprensibles en español, una responsabilidad por función, funciones declaradas antes de usarse.
- Respetá verificación manual reproducible y sin frameworks: apertura de `index.html` vía `file://`; recorrido de los casos del filtro (vacío, espacios, mayúsculas/minúsculas, parcial, sin coincidencias, caracteres especiales); inspección de consola sin errores; inspección del DOM para confirmar inserción como texto; comprobación de que la página no se recarga al buscar; sin pruebas automatizadas exigidas en este ejercicio.
- Usá solo las tecnologías, dependencias e integraciones autorizadas.
- No implementes las etapas futuras ni las funcionalidades excluidas.
- Verificá cada resultado con los controles aplicables y registrá su evidencia.
- Si aparece un impedimento o una contradicción que cambie la solución aprobada, informalo y consultame antes de ampliar el alcance.

Entregá los archivos JS nuevos + el `<script>` enlazado en `index.html` funcionando por apertura directa, junto con un resumen de cambios, comprobaciones realizadas, limitaciones y pendientes.

## Criterios de aceptación

- [ ] CA-01 — Catálogo generado desde el array de libros con todos los campos por libro y relaciones (editorial, autores, género o «Sin clasificar») resueltas desde los arrays, verificable en el DOM (cubre R-01, R-02).
- [ ] CA-02 — Filtro verificado con las 5 entradas: vacía → catálogo completo; solo espacios → completo; «harry»/«HARRY» → mismas coincidencias; coincidencia parcial al inicio/medio/final; sin coincidencias → `#mensaje-sin-resultados` visible (cubre R-03).
- [ ] CA-03 — JS externo en `js/` enlazado desde `index.html`, ganchos existentes intactos, envío sin recarga (`preventDefault`) y funciones con responsabilidades reconocibles verificables por inspección del código (cubre R-04, R-05, R-08).
- [ ] CA-04 — Entrada de usuario con `<`, `>`, `&` y comillas mostrada literalmente en el DOM sin errores de consola ni ejecución de marcado (cubre R-06).
- [ ] CA-05 — Apertura local sin red: cero `fetch`/XHR/peticiones en Network, consola limpia en Chrome/Firefox vía `file://` (cubre R-07).
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
