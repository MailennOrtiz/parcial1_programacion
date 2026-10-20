# Prompt SDD (Active-Stack) — Ejercicio 5 · Composición de ventas, cálculos y historial inmutable

> Uso: pegar este prompt completo como mensaje al agente. Es la entrega 5 de 6 del parcial. Cubre UNICAMENTE el Ejercicio 5. No autoriza trabajo de los Ejercicios 1–4 ni del 6.

---

## Rol

Actuá como desarrollador frontend senior, con experiencia en JavaScript nativo, modelado de estado en memoria (venta en curso vs. historial inmutable), manipulación segura del DOM y responsabilidad sobre la especificación verificable del Ejercicio 5, su correspondencia con la consigna y la implementación del flujo de ventas sin romper la estructura HTML, los estilos ni el JavaScript ya aprobados de los Ejercicios 1–4.

## Metodología

- Metodología a utilizar: SDD (Spec-Driven Development) con framework Active-Stack (active-orchestrator + OpenSpec).
- Herramientas y convenciones: lectura del repositorio actual, `docs/Consigna Primer Parcial.pdf` (página 4, Ejercicio 5 ), `docs/prompts/Plantilla Prompts.md`, consigna textual del Ejercicio 5 provista en el pedido, convención OpenSpec (`openspec/changes/<change>/proposal.md` + `tasks.md`), JavaScript nativo en archivo externo, sin build tools.
- Respetá las fases SPEC → PLAN → IMPLEMENTACIÓN descritas abajo, adaptando sus entregables a SDD + OpenSpec.
- No escribas código ni modifiques el producto antes de completar la especificación y obtener mi aprobación explícita de ella. La creación de los documentos SPEC y PLAN solicitados sí forma parte del trabajo autorizado.
- Si las herramientas o convenciones indicadas no están disponibles, informalo y proponé una alternativa antes de depender de ella.

## Contexto del proyecto

- Nombre o identificador: parcial1_programacion — frontend de librería «Libreria Nya» (Parcial 1, Programación III).
- Propósito y usuarios: presentar catálogo de librería y registrar libros, clientes y ventas de forma simulada en el navegador. Usuarios: docente evaluador y estudiantes que operan la interfaz.
- Ubicación o repositorio: `C:\Users\walas\Desktop\parcial1_programacion`.
- Estado actual verificado: Ejercicios 1–4 implementados. `index.html` con `header` + `nav` de 5 vistas + `main` con 5 `section` + `footer`. `css/styles.css` enlazado. `js/datos.js` (arrays en memoria: 2 editoriales, 2 géneros, 3 autores, 6 libros con integridad referencial, 3 clientes), `js/catalogo.js` (render del catálogo y filtro por título) y `js/altas.js` (altas de libros y clientes con validaciones; al completarse un alta dispara `document.dispatchEvent(new CustomEvent("libreria:alta", { detail: { tipo, registro } }))` y refresca los selects `#venta-cliente` y `#renglon-libro` vía `cargarOpcionesAlta`). La vista Ventas existe estructuralmente con `select#venta-cliente`, `form#form-renglon` (`select#renglon-libro`, `input#renglon-cantidad` con `min="1"` `step="1"` `value="1"`, botón «Agregar renglón»), `table#tabla-renglones` (thead: Libro, Cantidad, Precio unitario, Subtotal, Quitar; tbody vacío), `p#mensaje-renglones-vacio`, `div#resumen-venta` con `span#venta-total` = `0.00`, `button#boton-confirmar-venta` y `div#resultado-venta` (`aria-live="polite"`). La vista Historial existe estructuralmente con `p#mensaje-historial-vacio`, `table#tabla-historial` (thead: Identificador, Fecha, Cliente, Total, Detalle; tbody vacío) y `div#detalle-venta`. NO existe ningún archivo JS de ventas ni historial; no hay lógica de renglones, cálculos, confirmación ni historial (verificado por inspección directa del repo). Specs aprobados en `openspec/specs/estructura-pantallas-html/spec.md`, `openspec/specs/presentacion-css-adaptable/spec.md` y `openspec/specs/catalogo-datos-y-filtro/spec.md`, con changes archivados en `openspec/changes/archive/` (ejercicios 1, 2 y 3); el Ejercicio 4 está implementado y mergeado (commits `71e2ce2`, `a344cc7`, merge PR #1) sin change archivado observable en `openspec/changes/archive/`. Todo el Ejercicio 5 está pendiente.
- Fuentes de requisitos: consigna textual del Ejercicio 5 provista en el pedido (seleccionar cliente existente y agregar al menos un renglón con libro existente y cantidad entera mayor que cero; no se admiten libros repetidos dentro de la misma venta — se modifica la cantidad del renglón existente o se informa el duplicado; antes de confirmar se permite cambiar cantidades y quitar renglones; cada renglón muestra libro, cantidad, precio unitario y subtotal; subtotal = cantidad × precio y total = suma de subtotales, importes con dos decimales; se impide confirmar una venta sin cliente, sin renglones o con cantidades inválidas; al confirmar se registran identificador, fecha, cliente, renglones y total; el precio unitario se copia al renglón como valor histórico y no se obtiene nuevamente desde el precio actual del catálogo al consultar el historial; se conservan los datos descriptivos necesarios para leer esa venta; el historial muestra identificador, fecha, cliente y total y permite consultar los renglones; las ventas confirmadas no se editan ni se eliminan desde la interfaz; la confirmación limpia el formulario para una nueva venta y muestra un mensaje de resultado); `docs/Consigna Primer Parcial.pdf` (`página 4, Ejercicio 5, 20 puntos`); `index.html` actual (ganchos DOM de Ventas e Historial); `js/datos.js`, `js/catalogo.js` y `js/altas.js` (datos, helpers y evento `libreria:alta` existentes); `css/styles.css` (clases existentes `tabla`, `tabla-contenedor`, `boton`, `mensaje`, `mensaje-vacio`); estado del repo verificado por inspección directa.
- Tecnologías y dependencias permitidas: JavaScript nativo (ES moderno sin módulos ni transpilación) en archivo(s) externo(s) dentro de `js/`, DOM API estándar, reutilización de los arrays globales de `js/datos.js` y de las funciones existentes de `js/catalogo.js` cuando corresponda, apertura directa de `index.html` en navegador sin npm.
- Tecnologías y dependencias excluidas: librerías, frameworks y CDNs de JavaScript (jQuery, Lodash, React, etc.); `fetch`, XHR, WebSockets, cualquier red o backend; almacenamiento persistente (localStorage/sessionStorage — eso es Ejercicio 6); preprocesadores y herramientas de compilación; modificaciones de CSS salvo justificación mínima; modificación de la lógica de altas de `js/altas.js` más allá de lo indispensable; alta/baja/modificación de editoriales, géneros o autores; edición o eliminación de libros o clientes desde las vistas de ventas.
- Punto de entrada o componente afectado: `index.html` (solo para enlazar el script nuevo), el nuevo archivo `js/` (p. ej. `js/ventas.js`, o un único archivo si el SPEC lo justifica) y las vistas Ventas (`#vista-ventas`, `#venta-cliente`, `#form-renglon`, `#renglon-libro`, `#renglon-cantidad`, `#tabla-renglones`, `#mensaje-renglones-vacio`, `#resumen-venta`, `#venta-total`, `#boton-confirmar-venta`, `#resultado-venta`) e Historial (`#vista-historial`, `#mensaje-historial-vacio`, `#tabla-historial`, `#detalle-venta`).
- Condiciones del entorno: apertura vía `file://` (doble clic en `index.html`), sin servidor ni npm; verificación en Chrome/Firefox actuales; DevTools para inspección de consola, DOM y estado de los nodos.

## Alcance estricto

### Objetivo de esta entrega

Obtener la especificación aprobada (Fase 1) —y luego plan e implementación solo tras aprobación— de la composición de la venta en curso (renglones, cálculos y validaciones), la confirmación con precio histórico y el historial de ventas inmutable del Ejercicio 5, sobre el HTML/CSS/JS existentes sin reestructurar.

### Incluido

- Estado en memoria de la venta en curso: cliente seleccionado y lista de renglones (libro, cantidad, precio unitario al momento de agregar, subtotal), separada del historial de ventas confirmadas.
- Selección de un cliente existente desde `#venta-cliente` (poblado por `altas.js` y refrescado por el evento `libreria:alta`).
- Alta de renglón desde `#form-renglon`: libro existente desde `#renglon-libro` y cantidad entera mayor que cero; `preventDefault` sin recarga.
- Regla de no duplicados dentro de la misma venta: el SPEC deberá elegir y justificar una de las dos estrategias admitidas por la consigna — (a) modificar la cantidad del renglón existente o (b) informar el duplicado y no agregarlo — y documentarla como decisión sometida a aprobación.
- Edición pre-confirmación: cambiar cantidades de renglones existentes y quitar renglones, con recálculo de subtotales y total.
- Presentación de la venta en curso en `#tabla-renglones` (libro, cantidad, precio unitario, subtotal, quitar) reutilizando la clase `tabla` existente, con `#mensaje-renglones-vacio` y `#mensaje-renglones-vacio` solo cuando no haya renglones.
- Cálculos: subtotal = cantidad × precio unitario; total = suma de subtotales; todos los importes presentados con dos decimales en `#venta-total` y en la tabla.
- Validaciones de confirmación: se impide confirmar sin cliente seleccionado, sin renglones o con cantidades inválidas, informando el motivo en `#resultado-venta`.
- Confirmación de venta: registro en el historial con identificador estable, fecha, cliente (id + datos descriptivos necesarios para leer la venta sin volver a los selects), renglones (título del libro descriptivo + cantidad + precio unitario + subtotal copiados como valores) y total. El precio unitario se copia al renglón como valor histórico: tras confirmar, consultar el historial no debe depender del precio actual del catálogo (verificable cambiando el precio de un libro en `datos.js` y recargando: la venta del historial conserva el precio original).
- Limpieza del formulario tras confirmar (selector de cliente, renglones, total y estado de la venta en curso) para iniciar una nueva venta, con mensaje de resultado en `#resultado-venta` (`aria-live`).
- Historial en `#tabla-historial` (identificador, fecha, cliente, total) con acceso al detalle de renglones de cada venta en `#detalle-venta`; `#mensaje-historial-vacio` solo cuando no haya ventas confirmadas.
- Inmutabilidad desde la interfaz: las ventas confirmadas no se editan ni se eliminan (no hay botones ni acciones de modificación/baja de ventas).
- Arquitectura de código: eventos y funciones con responsabilidades reconocibles (estado de la venta en curso, validación de renglón, cálculo de subtotales/total, render de renglones, render del resumen, validación de confirmación, registro de venta con precio histórico, render del historial, render del detalle, registro de listeners).
- Inserción segura de datos: todo texto generado y toda entrada de usuario se insertan como texto en el DOM (`textContent` o `createElement`), sin interpretación de marcado.
- Enlace del script desde `index.html` (preferentemente `defer`, después de `datos.js`, `catalogo.js` y `altas.js`) sin alterar ids, semántica ni clases existentes.
- Integración mínima con lo existente: reutilizar los arrays de `datos.js`, las funciones útiles de `catalogo.js` si corresponde y reaccionar al evento `libreria:alta` de `altas.js` para refrescar `#venta-cliente` y `#renglon-libro` sin duplicar su lógica.

### Excluido

- Ejercicio 1 (reestructuración del HTML, cambio de vistas, renombrado de ids).
- Ejercicio 2 (cambios de identidad visual, layout, responsive, foco o clases más allá de reutilizar las existentes).
- Ejercicio 3 (modificaciones del catálogo o del filtro por título más allá de lo estrictamente necesario para resolver precios vigentes al agregar renglones).
- Ejercicio 4 (modificación de las altas de libros/clientes, sus validaciones o el evento `libreria:alta`, salvo el consumo del evento para refrescar selects).
- Ejercicio 6 (localStorage/sessionStorage, persistencia entre recargas, casos manuales, README).
- Descuentos, impuestos, moneda configurable, gestión de stock, cobros, facturación, impresión o exportación; edición o eliminación de ventas confirmadas desde la interfaz; búsqueda, ordenamiento o paginación del historial; datos iniciales de ventas precargados (el historial arranca vacío); fetch o cualquier red; librerías y frameworks.

No agregues funcionalidades, dependencias, integraciones ni refactorizaciones ajenas a esta entrega. Si detectás una necesidad fuera de alcance, describila como propuesta pendiente; no la implementes sin autorización.

## Requisitos

| ID | Grupo | Requisito verificable |
| --- | --- | --- |
| R-01 | Datos y estados | Existen en memoria, por separado, la venta en curso (cliente seleccionado + renglones) y el historial de ventas confirmadas; cada venta confirmada almacena identificador estable, fecha, cliente (id + datos descriptivos), renglones (libro + cantidad + precio unitario + subtotal) y total; el precio unitario de cada renglón confirmado es un valor copiado al momento de confirmar y su consulta posterior no depende del precio actual del catálogo. |
| R-02 | Funcional | Se puede seleccionar un cliente existente y agregar al menos un renglón con un libro existente y una cantidad entera mayor que cero; no se admiten libros repetidos dentro de la misma venta, aplicando y documentando en el SPEC una de las estrategias admitidas (modificar la cantidad del renglón existente o informar el duplicado); la cantidad rechazada no es entera ni mayor que cero. |
| R-03 | Funcional | Cada renglón presentado muestra libro, cantidad, precio unitario y subtotal; el subtotal se calcula como cantidad por precio unitario y el total como suma de subtotales; todos los importes se presentan con dos decimales, tanto en la tabla de renglones como en `#venta-total`. |
| R-04 | Funcional | Antes de confirmar, se permite cambiar la cantidad de un renglón existente y quitar un renglón, con recálculo inmediato de los subtotales afectados, del total y del estado vacío de la tabla. |
| R-05 | Funcional | Se impide confirmar la venta cuando no hay cliente seleccionado, cuando no hay renglones o cuando alguna cantidad es inválida; en cada caso se informa el motivo en `#resultado-venta` y no se registra ninguna venta en el historial. |
| R-06 | Funcional | Al confirmar una venta válida se registra en el historial su identificador, fecha, cliente, renglones y total; la confirmación limpia el formulario de la venta en curso (selector de cliente, renglones, total y mensajes de la tabla) para una nueva venta y muestra un mensaje de resultado de éxito en `#resultado-venta`. |
| R-07 | Funcional | El historial muestra por cada venta su identificador, fecha, cliente y total, y permite consultar los renglones de esa venta en `#detalle-venta`; `#mensaje-historial-vacio` se muestra solo cuando no hay ventas confirmadas; las ventas confirmadas no se editan ni se eliminan desde la interfaz (no existen acciones de modificación o baja de ventas). |
| R-08 | Estructura e interfaces | El JS vive en archivo(s) externo(s) bajo `js/` enlazado(s) desde `index.html` después de `datos.js`, `catalogo.js` y `altas.js`; se reutilizan los ganchos existentes (`#venta-cliente`, `#form-renglon`, `#renglon-libro`, `#renglon-cantidad`, `#tabla-renglones`, `#mensaje-renglones-vacio`, `#resumen-venta`, `#venta-total`, `#boton-confirmar-venta`, `#resultado-venta`, `#mensaje-historial-vacio`, `#tabla-historial`, `#detalle-venta`) sin renombrarlos; el envío de `#form-renglon` usa `preventDefault` y no recarga la página. |
| R-09 | Calidad | El código está organizado en funciones con responsabilidades reconocibles (estado de la venta, validación, cálculos, render de renglones, resumen, confirmación, historial, detalle, registro de eventos), sin lógica monolítica dentro de los handlers; todo texto generado y toda entrada de usuario se insertan como texto en el DOM (`textContent`/`createElement`) sin `innerHTML` con datos; entradas con caracteres especiales no rompen la interfaz ni generan errores en consola. |
| R-10 | Compatibilidad | Funciona abierto como archivo local sin servidor ni red: cero `fetch`/XHR/peticiones; verificado en Chrome/Firefox actuales vía `file://` con consola sin errores. |
| R-11 | Convenciones | Archivos en `js/` con minúsculas y guiones; nombres de funciones y variables comprensibles en español; indentación de 2 espacios; separación estricta estructura (HTML) / presentación (CSS) / comportamiento (JS); HTML y CSS existentes sin cambios salvo el `<script>` enlazado y ajustes mínimos justificados en el SPEC. |
| R-12 | Preparación e integración | La vista de ventas reacciona al evento `libreria:alta` (disparado por `altas.js` al registrar un libro o cliente) refrescando los selects correspondientes sin duplicar la lógica de altas; los datos de `datos.js` se reutilizan sin duplicar arrays; no se implementan funcionalidades de los Ejercicios 1–4 ni del 6. |

Datos de ejemplo, si se necesitan: no se autorizan datos precargados de ventas ni de historial; el historial debe arrancar vacío y poblarse únicamente por confirmaciones del usuario durante la prueba. Cualquier texto ilustrativo del SPEC debe marcarse como ejemplo estructural y no presentarse como venta real.

## Fase 1 — SPEC

Hacé esta fase primero. Inspeccioná las fuentes y el estado existente dentro del alcance autorizado antes de definir la solución.

Generá `openspec/changes/ejercicio-5-ventas-renglones-historial/proposal.md` con:

1. Problema, objetivo y resultado esperado.
2. Contexto verificado y referencias concretas a las fuentes consultadas.
3. Alcance incluido y exclusiones explícitas.
4. Requisitos identificados y escenarios observables, incluidos los casos límite relevantes (sin cliente; sin renglones; cantidad cero, negativa, decimal o vacía; libro repetido en la misma venta según la estrategia elegida; quitar el único renglón; quitar un renglón intermedio; cambiar cantidad y recalcular; total con decimales; confirmar dos ventas seguidas y verificar que el formulario queda limpio y el historial acumula ambas; precio histórico: precio vigente al agregar el renglón vs. precio del catálogo después de confirmar; detalle de una venta del historial sin depender del catálogo actual; caracteres especiales en títulos/nombres).
5. Estructura o componentes propuestos, interfaces y datos necesarios, con el detalle proporcional al alcance (esquema de la venta en curso y de la venta confirmada, cómo se copia el precio histórico y los descriptivos, cómo se resuelve la estrategia de duplicados, funciones y eventos previstos, integración con `libreria:alta`).
6. Estados y manejo de errores aplicables (venta vacía, venta con renglones, error de confirmación, confirmación exitosa, historial vacío, historial con ventas y detalle visible/oculto).
7. Restricciones técnicas y convenciones que condicionan la solución (sin fetch, sin librerías, texto en el DOM, sin persistencia, sin edición/eliminación de ventas, sin modificar altas).
8. Criterios de aceptación vinculados a los requisitos.
9. Supuestos declarados, información pendiente y decisiones que requieren mi respuesta — en particular, la elección de la estrategia de no duplicados (modificar cantidad vs. informar duplicado) y el formato exacto de presentación de la fecha en el historial, si no está fijado por la consigna.

Si falta una decisión que impide especificar correctamente, formulá una pregunta concreta y esperá la respuesta. No cierres esa decisión por tu cuenta.

Al terminar, presentá la especificación para revisión y detenete. No avances a PLAN ni IMPLEMENTACIÓN en esta primera respuesta.

## Fase 2 — PLAN

Cuando autorice avanzar, generá `openspec/changes/ejercicio-5-ventas-renglones-historial/tasks.md` con un checklist de tareas atómicas. Para cada tarea indicá:

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
- Respetá verificación manual reproducible y sin frameworks: apertura de `index.html` vía `file://`; recorrido de los casos del flujo (agregar renglón válido, cantidad inválida, duplicado según estrategia aprobada, cambiar cantidad, quitar renglón, confirmar sin cliente, confirmar sin renglones, confirmar válida, verificar total con dos decimales, verificar limpieza del formulario y mensaje de éxito, verificar historial con detalle de renglones, verificar inmutabilidad, verificar precio histórico tras cambiar el precio en `datos.js` y recargar, verificar refresco de selects tras un alta nueva); inspección de consola sin errores; inspección del DOM para confirmar inserción como texto; comprobación de que la página no se recarga al agregar renglones; sin pruebas automatizadas exigidas en este ejercicio.
- Usá solo las tecnologías, dependencias e integraciones autorizadas.
- No implementes las etapas futuras ni las funcionalidades excluidas.
- Verificá cada resultado con los controles aplicables y registrá su evidencia.
- Si aparece un impedimento o una contradicción que cambie la solución aprobada, informalo y consultame antes de ampliar el alcance.

Entregá el archivo JS nuevo + el `<script>` enlazado en `index.html` funcionando por apertura directa, junto con un resumen de cambios, comprobaciones realizadas, limitaciones y pendientes.

## Criterios de aceptación

- [ ] CA-01 — Renglones agregados con cliente y libro existentes y cantidad entera > 0; no-duplicados implementados con la estrategia aprobada y verificable repitiendo la carga del mismo libro; cantidad inválida rechazada con mensaje (cubre R-02, R-05).
- [ ] CA-02 — Subtotales y total calculados correctamente y presentados con dos decimales en `#tabla-renglones` y `#venta-total`; cambiar cantidad o quitar renglón actualiza los cálculos de inmediato (cubre R-03, R-04).
- [ ] CA-03 — Confirmación bloqueada sin cliente, sin renglones o con cantidades inválidas, con motivo informado en `#resultado-venta` y sin registro en el historial (cubre R-05).
- [ ] CA-04 — Confirmación válida: venta registrada con identificador, fecha, cliente, renglones y total; formulario de venta en curso limpio para una nueva venta; mensaje de éxito visible; segunda venta seguida acumula correctamente en el historial (cubre R-01, R-06).
- [ ] CA-05 — Precio histórico: después de confirmar, modificar el precio de un libro en `datos.js` y recargar no altera el precio unitario, los subtotales ni el total de la venta en el historial ni en su detalle (cubre R-01, R-07).
- [ ] CA-06 — Historial muestra identificador, fecha, cliente y total por venta con `#mensaje-historial-vacio` solo si está vacío; el detalle permite leer los renglones de cada venta; no existen acciones de edición ni eliminación de ventas (cubre R-07).
- [ ] CA-07 — JS externo en `js/` enlazado después de los scripts existentes, ganchos intactos, envío sin recarga, `libreria:alta` refresca los selects sin duplicar lógica, funciones con responsabilidades reconocibles e inserción como texto verificables por inspección (cubre R-08, R-09, R-12).
- [ ] CA-08 — Apertura local sin red: cero `fetch`/XHR/peticiones en Network, consola limpia en Chrome/Firefox vía `file://` (cubre R-10).
- [ ] Se cubre todo el alcance aprobado y no se incorpora trabajo excluido.
- [ ] Se respetan las tecnologías, dependencias y convenciones permitidas.
- [ ] Las comprobaciones exigidas se ejecutaron y sus resultados se informan con evidencia.
- [ ] Se distinguen los controles aprobados, fallidos, omitidos y pendientes; ningún control no ejecutado se presenta como aprobado.
- [ ] Los supuestos, placeholders pendientes y limitaciones quedan identificados.

## Restricciones anti-alucinación

- No inventes requisitos, funcionalidades, archivos existentes, APIs, contratos, credenciales, datos reales ni resultados de comprobaciones.
- Diferenciá los hechos verificados, los supuestos y las propuestas. Atribuí los hechos a las fuentes consultadas cuando corresponda.
- Si falta un dato no bloqueante, usá `Se selecciona un cliente existente y se agrega al menos un renglón con un libro existente y una cantidad entera mayor que cero. No se admiten libros repetidos dentro de la misma venta: se modifica la cantidad del renglón existente o se informa el duplicado. Antes de confirmar, se permite cambiar cantidades y quitar renglones. Cada renglón muestra libro, cantidad, precio unitario y subtotal. Se calcula subtotal como cantidad por precio y total como suma de subtotales; los importes se presentan con dos decimales. Se impide confirmar una venta sin cliente, sin renglones o con cantidades inválidas. Al confirmar, se registra un identificador, fecha, cliente, renglones y total. El precio unitario se copia al renglón como valor histórico, de modo que no se obtiene nuevamente desde el precio actual del catálogo al consultar el historial. Se conservan también los datos descriptivos necesarios para leer esa venta. El historial muestra identificador, fecha, cliente y total, y permite consultar los renglones Las ventas confirmadas no se editan ni eliminan desde la interfaz. La confirmación limpia el formulario para una nueva venta y muestra un mensaje de resultado.` y declaralo como pendiente. No lo reemplaces con un valor que parezca real.
- Si el dato faltante afecta el alcance, una decisión esencial o la validez de la solución, preguntá antes de avanzar con el trabajo afectado.
- No afirmes haber leído una fuente, ejecutado una herramienta o validado un resultado si no ocurrió. Si no tenés acceso, informalo.
- Usá datos ficticios solo cuando estén autorizados y señalalos como ejemplos; no presentes ventas de ejemplo como datos precargados reales del producto.
- Ante requisitos contradictorios, señalá la contradicción y pedí una decisión; no elijas silenciosamente.
- No declares completa la entrega si quedan criterios sin verificar. Enumerá los pendientes y sus motivos.

## Instrucción de inicio

Empezá ahora únicamente por la **Fase 1 — SPEC**. Generá el documento de especificación indicado, presentalo para revisión y esperá mi respuesta. No avances automáticamente a PLAN ni IMPLEMENTACIÓN. Antes de implementar, solicitá mi aprobación explícita de la especificación y mi autorización para iniciar la Fase 3.
