# Prompt SDD (Active-Stack) — Ejercicio 1 · Estructura y pantallas HTML

> Uso: pegar este prompt completo como mensaje al agente. Es la entrega 1 de 6 del parcial. Cubre UNICAMENTE el Ejercicio 1. No autoriza trabajo de los Ejercicios 2–6.

---

## Rol

Actuá como arquitecto frontend senior, con experiencia en HTML semántico y diseño de estructuras navegables para aplicaciones sin backend y responsabilidad sobre la especificación verificable del Ejercicio 1, su correspondencia con la consigna y la preparación de la estructura para el JavaScript futuro (sin implementarlo).

## Metodología

- Metodología a utilizar: SDD (Spec-Driven Development) con framework Active-Stack (active-orchestrator + OpenSpec).
- Herramientas y convenciones: lectura del repositorio actual, `docs/Consigna Primer Parcial.pdf` (pág. 2, Ejercicio 1), `docs/prompts/Plantilla Prompts.md`, convención OpenSpec (`openspec/changes/<change>/proposal.md` + `tasks.md`), HTML5 semántico, sin build tools.
- Respetá las fases SPEC → PLAN → IMPLEMENTACIÓN descritas abajo, adaptando sus entregables a SDD + OpenSpec.
- No escribas código ni modifiques el producto antes de completar la especificación y obtener mi aprobación explícita de ella. La creación de los documentos SPEC y PLAN solicitados sí forma parte del trabajo autorizado.
- Si las herramientas o convenciones indicadas no están disponibles, informalo y proponé una alternativa antes de depender de ella.

## Contexto del proyecto

- Nombre o identificador: parcial1_programacion — frontend de librería (Parcial 1, Programación III).
- Propósito y usuarios: presentar catálogo de librería y registrar libros, clientes y ventas de forma simulada en el navegador. Usuarios: docente evaluador y estudiantes que operan la interfaz.
- Ubicación o repositorio: `C:\Users\GonziChan\Desktop\FACULTAD\Programacion III\Primer Parcial\parcial1_programacion`.
- Estado actual verificado: proyecto vacío/inicial. Existe `openspec/config.yaml` (schema: spec-driven), carpetas vacías `css/` y `js/`, `docs/Consigna Primer Parcial.pdf`, `docs/prompts/Plantilla Prompts.md`. NO existe `index.html`. No hay vistas, formularios ni navegación implementados. Todo el Ejercicio 1 está pendiente.
- Fuentes de requisitos: `docs/Consigna Primer Parcial.pdf` (pág. 1 contexto/alcance, pág. 2 Ejercicio 1 completo, pág. 6 criterios: Ejercicio 1 = 20 pts → vistas y navegación 10 + semántica/formularios/estados 10); estado del repo verificado por inspección directa.
- Tecnologías y dependencias permitidas: HTML5 semántico puro para esta entrega. Stack global del parcial (solo como contexto, no a implementar ahora): HTML + CSS + JavaScript nativos, archivos externos, recursos locales, apertura directa de `index.html` en navegador sin npm.
- Tecnologías y dependencias excluidas: librerías, frameworks y CDNs de CSS o JavaScript; API, base de datos, servidor, conexión con backend; inicio de sesión real; fetch de datos; herramientas de compilación; dependencias instaladas.
- Punto de entrada o componente afectado: `index.html` (a especificar; actual inexistente) y las 5 vistas bajo su navegación: Catálogo, Libros, Clientes, Ventas, Historial — ya sea como páginas múltiples o secciones de una misma página.
- Condiciones del entorno: apertura vía `file://` (doble clic en `index.html`), sin servidor ni npm; verificación en Chrome/Firefox actuales; anchos de referencia 320 px y 1280 px solo como contexto futuro (no se exige CSS en esta entrega).

## Alcance estricto

### Objetivo de esta entrega

Obtener la especificación aprobada (Fase 1) —y luego plan e implementación solo tras aprobación— de la estructura HTML y navegación del Ejercicio 1, lista para que los Ejercicios 3–5 conecten su JavaScript sin reestructurar.

### Incluido

- `index.html` como entrada única del proyecto, con encabezado, navegación y contenido principal con etiquetas semánticas (`header`, `nav`, `main`, `section`/`article`, `footer`).
- Navegación clara entre las 5 vistas: Catálogo, Libros, Clientes, Ventas, Historial (definir si serán páginas separadas o secciones + justificar la decisión en el SPEC).
- Vista Catálogo: título de la librería, buscador por título (campo + botón) y listado de libros donde cada libro expone título, ISBN, editorial, género (o texto literal «Sin clasificar» si no tiene), autores y precio.
- Vista Libros: formulario de alta (campos para título, ISBN, precio, editorial, género, autores) + listado de libros registrados.
- Vista Clientes: formulario de alta (nombre completo, email) + listado de clientes registrados.
- Vista Ventas: selección de cliente, composición de renglones (libro + cantidad) y resumen de la venta (subtotales y total).
- Vista Historial: listado de ventas (identificador, fecha, cliente, total) y acceso a sus detalles (renglones).
- Formularios: cada campo con `label` asociada (`for`/`id`), `name`, tipo apropiado; botones con textos que describen su acción (ej. «Registrar libro», «Buscar», «Confirmar venta»).
- Tablas/listados con encabezados (`thead`/`th` o encabezados equivalentes si se usan tarjetas/listas).
- Mensajes/estados estructurales: listas vacías, búsquedas sin resultados, operaciones correctas o rechazadas (contenedores con roles/ids reservados, p. ej. `aria-live`).
- Estructura que contempla los campos, ids, contenedores y estados que utilizará JavaScript en Ej. 3–5 (contrato de ganchos DOM), sin implementar la lógica.

### Excluido

- Ejercicio 2 (identidad visual CSS, Flexbox/Grid, adaptación 320/1280 px, foco visible, estilos).
- Ejercicio 3 (arrays/objetos de datos, renderizado del catálogo por JS, filtro funcional).
- Ejercicio 4 (validaciones de alta de libros/clientes, `preventDefault`, actualización dinámica sin recarga).
- Ejercicio 5 (cálculos de subtotal/total, duplicados, confirmación de venta, historial inmutable con precio histórico).
- Ejercicio 6 (localStorage, casos manuales, README).
- Cualquier JavaScript funcional, cualquier CSS final, edición/eliminación de registros, gestión de stock/cobros/facturación, paginación, autenticación, internacionalización.

No agregues funcionalidades, dependencias, integraciones ni refactorizaciones ajenas a esta entrega. Si detectás una necesidad fuera de alcance, describila como propuesta pendiente; no la implementes sin autorización.

## Requisitos

| ID | Grupo | Requisito verificable |
| --- | --- | --- |
| R-01 | Funcional | `index.html` es la entrada y la navegación expone enlaces/botones visibles y persistentes a las 5 vistas (Catálogo, Libros, Clientes, Ventas, Historial); desde cualquier vista se llega a las otras sin URL externas ni callejones sin salida. |
| R-02 | Funcional | La vista Catálogo contiene: título de la librería, un buscador por título (input etiquetado + botón «Buscar») y un listado donde cada libro presenta título, ISBN, editorial, género o «Sin clasificar», autores y precio. |
| R-03 | Funcional | Las vistas Libros y Clientes contienen cada una un formulario de alta y un listado; Ventas contiene selector de cliente + zona de renglones + resumen; Historial contiene listado (id, fecha, cliente, total) + mecanismo de acceso al detalle de cada venta. |
| R-04 | Estructura e interfaces | La página usa `header` + `nav` + `main` (+ `footer`); cada vista es una `section` con heading jerárquico (`h1` único por página, `h2` por vista); cada `input`/`select`/`textarea` tiene `label` con `for`/`id`; cada `button` tiene texto de acción; cada tabla tiene `thead` con `th` de alcance. |
| R-05 | Datos y estados | Existen contenedores/mensajes previstos para: lista vacía, búsqueda sin resultados y resultado de operación (éxito/rechazo); cada listado y formulario define `id`/`name` estables para los campos que usará JS (título, ISBN, precio, editorial, género, autores, nombre, email, cliente, libro, cantidad, resumen/total, id/fecha/cliente/total de venta). |
| R-06 | Calidad | HTML válido y legible: `lang="es"`, `meta charset` + `viewport`, jerarquía de encabezados sin saltos, atributos `alt` previstos para imágenes informativas (o decisión explícita de no usar imágenes), código indentado con nombres comprensibles. |
| R-07 | Compatibilidad | La estructura funciona abierta como archivo local sin servidor ni dependencias externas; no hay referencias a CDN, `@import` remoto, `fetch` a backend ni scripts de terceros. |
| R-08 | Convenciones | Archivos: `index.html` en raíz (+ páginas adicionales solo si el SPEC lo justifica); carpetas `css/`, `js/` reservadas pero no usadas en esta entrega; nombres en minúsculas con guiones; ids en formato estable y documentado en el SPEC. |
| R-09 | Preparación futura, si aplica | El SPEC define los ganchos DOM que consumirán los Ej. 3–5 (ids de contenedores de catálogo, buscador, selects de editorial/género/autores con opción «Sin clasificar», selector de cliente, contenedor de renglones, resumen, historial y detalle) como puntos de extensión, sin implementar comportamiento JS. |

Datos de ejemplo, si se necesitan: solo texto ficticio mínimo para ilustrar la estructura en el SPEC (p. ej. 1–2 tarjetas/filas de ejemplo marcadas como «ejemplo estructural», sin presentarlas como datos reales del catálogo). No inventar el catálogo definitivo de 6 libros (eso es Ej. 3).

## Fase 1 — SPEC

Hacé esta fase primero. Inspeccioná las fuentes y el estado existente dentro del alcance autorizado antes de definir la solución.

Generá `openspec/changes/ejercicio-1-estructura-pantallas/proposal.md` con:

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

Cuando autorice avanzar, generá `openspec/changes/ejercicio-1-estructura-pantallas/tasks.md` con un checklist de tareas atómicas. Para cada tarea indicá:

- Identificador y resultado esperado.
- Requisito o criterio de aceptación que cubre.
- Archivos, componentes o entregables a crear o modificar.
- Dependencias y orden de ejecución.
- Comprobación concreta que permitirá darla por terminada.

Incluí solo trabajo dentro del alcance. Respetá la estructura existente y justificá los cambios estructurales necesarios. Si el plan exige cambiar la especificación, proponé el ajuste y obtené su aprobación antes de implementar.

## Fase 3 — IMPLEMENTACIÓN

Iniciá esta fase únicamente después de mi aprobación explícita de la especificación y mi autorización para implementar.

- Ejecutá las tareas del plan dentro del alcance aprobado.
- Aplicá convenciones HTML5 semántico, indentación de 2 espacios, comillas dobles, minúsculas, `label for/id` y botones con verbo de acción.
- Respetá verificación manual reproducible y sin frameworks: apertura de `index.html` vía `file://`, recorrido de las 5 vistas por navegación, inspección de etiquetas/encabezados de tabla y presencia de mensajes de estado; sin pruebas automatizadas exigidas en este ejercicio.
- Usá solo las tecnologías, dependencias e integraciones autorizadas.
- No implementes las etapas futuras ni las funcionalidades excluidas.
- Verificá cada resultado con los controles aplicables y registrá su evidencia.
- Si aparece un impedimento o una contradicción que cambie la solución aprobada, informalo y consultame antes de ampliar el alcance.

Entregá `index.html` (y páginas adicionales solo si el plan aprobado las incluye) funcionando por apertura directa, junto con un resumen de cambios, comprobaciones realizadas, limitaciones y pendientes.

## Criterios de aceptación

- [ ] CA-01 — Navegación a las 5 vistas desde `index.html`, verificable por clic/teclado sin páginas rotas (cubre R-01, R-03).
- [ ] CA-02 — Catálogo expone título de librería + buscador etiquetado + listado con los 6 campos por libro incluyendo «Sin clasificar» (cubre R-02).
- [ ] CA-03 — Estructura semántica, labels, botones descriptivos y tablas con encabezados verificables por inspección del DOM (cubre R-04, R-06).
- [ ] CA-04 — Formularios de Libros/Clientes, composición de Venta e Historial con campos/contenedores e ids documentados, más mensajes de lista vacía / sin resultados / éxito-rechazo (cubre R-03, R-05, R-09).
- [ ] CA-05 — Apertura local sin servidor ni dependencias externas; cero referencias a CDN/fetch/backend (cubre R-07, R-08).
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
