# Prompt SDD (Active-Stack) — Ejercicio 6 · Persistencia, verificación y documentación

> Uso: pegar este prompt completo como mensaje al agente. Es la entrega 6 de 6 del parcial. Cubre el Ejercicio 6 y la documentación de entrega indicada en la consigna. Las comprobaciones recorren los Ejercicios 1–5; no autorizan su reimplementación. Este archivo es un prompt de trabajo, no una especificación aprobada ni evidencia de pruebas ejecutadas.

---

## Rol

Actuá como desarrollador frontend senior, con experiencia en JavaScript nativo, persistencia con localStorage, verificación manual reproducible y documentación técnica. Tu responsabilidad es especificar y, tras aprobación, completar el Ejercicio 6 de «Libreria Nya», integrando la persistencia con las altas y las ventas existentes, conservando sus datos históricos y documentando exclusivamente resultados realmente observados.

## Metodología

- Metodología a utilizar: SDD (Spec-Driven Development), siguiendo las convenciones Active-Stack + OpenSpec ya presentes en el repositorio.
- Herramientas y convenciones: inspección del repositorio actual, `docs/prompts/Plantilla Prompts.md`, `docs/Consigna Primer Parcial.pdf` (página 5: Ejercicio 6; página 6: evaluación y entrega), consigna textual provista por el usuario y documentos existentes bajo `openspec/`.
- Respetá las fases SPEC → PLAN → IMPLEMENTACIÓN descritas abajo.
- No escribas código ni modifiques el producto antes de completar la especificación y obtener mi aprobación explícita y autorización para implementar.
- Si alguna herramienta no está disponible, informalo antes de depender de ella. No reinicialices el proyecto ni regeneres su documentación base para resolver este ejercicio.

## Contexto del proyecto

- Nombre: frontend de librería «Libreria Nya», Parcial 1 de Programación III.
- Ubicación al redactar este prompt: `D:\parcial1programacion`. Al utilizarlo en otro equipo, trabajá sobre la raíz real del repositorio, sin copiar rutas personales de prompts anteriores.
- Propósito: catálogo y registro simulado de libros, clientes y ventas con datos ficticios en el navegador.
- Estado verificado por lectura del código al redactar este prompt; debe revalidarse antes de especificar:
  - `index.html` contiene las cinco vistas como secciones enlazadas: Catálogo, Libros, Clientes, Ventas e Historial.
  - `css/styles.css` contiene la presentación, foco visible y contenedores de tablas con desplazamiento propio. Existen capturas del Ejercicio 2 en `docs/`; su existencia no demuestra el comportamiento de la versión actual.
  - `js/datos.js` declara arrays globales `const`: 2 editoriales, 2 géneros, 3 autores, 6 libros y 3 clientes. Los libros usan `idLibro`, `titulo`, `isbn`, `idEditorial`, `idGenero`, `idsAutores` y `precio`; los clientes usan `idCliente`, `nombreCompleto` y `email`.
  - `js/catalogo.js` genera el catálogo y filtra títulos con `trim` y minúsculas. Ejecuta `actualizarCatalogo("")` y registra eventos al evaluar el archivo, no dentro de `DOMContentLoaded`.
  - `js/altas.js` valida y agrega registros a `libros` y `clientes`. Tras un alta correcta actualiza vistas y emite `libreria:alta` sobre `document`, con `detail: { tipo, registro }`. Inicializa mediante `DOMContentLoaded`.
  - `js/ventas.js` mantiene `ventaEnCurso` y `const historialVentas = []` por separado; registra ventas con `registrarVentaConfirmada()`. Rechaza libros repetidos con un mensaje. Inicializa mediante `DOMContentLoaded`.
  - La venta confirmada contiene `idVenta`, `fecha`, `cliente: { id, nombre }`, `renglones: [{ titulo, cantidad, precioUnitario, subtotal }]` y `total`. El detalle usa esos valores históricos, sin consultar el precio actual del catálogo.
  - Los scripts actuales se enlazan con `defer`, en orden: datos → catálogo → altas → ventas.
  - No existe `README.md` en la raíz ni persistencia implementada en los cuatro scripts inspeccionados. Al recargar se pierden las altas y el historial.
  - Existen specs en `openspec/specs/estructura-pantallas-html/`, `presentacion-css-adaptable/`, `catalogo-datos-y-filtro/` y `ventas-e-historial/`, además de changes archivados. Inspeccionalos si condicionan la integración; no supongas aprobación de funcionalidades por la sola existencia del archivo.
- Fuentes de requisitos: Ejercicio 6 completo, límites técnicos de la página 1 y formato de entrega de la página 6. Los prompts anteriores son antecedentes, no reemplazan la consigna.
- Tecnologías permitidas: HTML, CSS y JavaScript nativos, JSON y localStorage; scripts externos clásicos, recursos locales y apertura directa de `index.html` sin npm.
- Entorno de comprobación: navegador real, apertura `file://`, DevTools, teclado y anchos de 320 px y 1280 px. Registrar navegador y versión usados, sin asumir compatibilidad no comprobada.

## Alcance estricto

### Objetivo de esta entrega

Obtener primero la especificación de la persistencia de libros, clientes y ventas y del cierre documental. Tras aprobación, integrar la carga y el guardado sin duplicar ejemplos, ejecutar los ocho casos manuales de la consigna y producir un README que permita abrir, usar, verificar y entregar el proyecto.

### Incluido

- Guardar y recuperar libros, clientes y ventas confirmadas con localStorage.
- Cargar ejemplos solamente cuando no existan datos guardados para el conjunto correspondiente. Un array guardado vacío no equivale a una clave ausente.
- Recuperar datos antes de que el catálogo, los listados, los selectores y el historial los representen. Definir explícitamente el orden de ejecución necesario.
- Integración mínima con altas y confirmación de ventas: guardar cada operación correcta sin exigir una acción extra al usuario; no guardar operaciones rechazadas.
- Mantener identificadores estables, relaciones de libros y datos descriptivos e importes históricos de ventas al serializar y recuperar.
- README en la raíz con todos los contenidos exigidos por el formato de entrega.
- Ejecución y registro honesto de los ocho casos manuales, incluidos fallos y pendientes.
- Procedimiento guiado de precio histórico en una copia de prueba, modificando exclusivamente el precio del catálogo en localStorage.
- Especificar una respuesta mínima y comprensible ante fallos de lectura, JSON inválido o guardado no disponible, sin borrar silenciosamente los datos existentes ni anunciar persistencia exitosa si falló.

### Excluido

- Rehacer las vistas, el diseño, el filtro, las validaciones de altas o el flujo de ventas de los Ejercicios 1–5.
- Corregir automáticamente defectos ajenos a la integración: si las pruebas los detectan, registrar el comportamiento real y proponer su corrección para autorización.
- Persistir el borrador de venta, la búsqueda o preferencias de interfaz; persistir editoriales, géneros y autores no es requisito de este ejercicio.
- Backend, API, base de datos, autenticación real, stock, cobros o facturación.
- Librerías, frameworks, CDNs, dependencias instaladas y herramientas de compilación en la entrega.
- Pantallas para editar precios, ventas confirmadas o almacenamiento; importación/exportación, sincronización entre pestañas o migraciones complejas.

## Requisitos

| ID | Grupo | Requisito verificable |
| --- | --- | --- |
| R-01 | Persistencia | Libros, clientes y ventas confirmadas se conservan en localStorage y se recuperan al recargar o reabrir en el mismo contexto de almacenamiento. |
| R-02 | Inicialización | En un primer inicio se cargan los ejemplos de `js/datos.js` y el historial comienza vacío. En aperturas posteriores se recupera el estado guardado sin concatenar ni duplicar ejemplos, altas o ventas. Los arrays guardados vacíos se respetan. |
| R-03 | Integración | La restauración ocurre antes del primer render que consume cada colección. Las altas correctas y ventas confirmadas se guardan; las operaciones rechazadas no agregan registros persistidos. No se rompen los eventos ni los selectores existentes. |
| R-04 | Datos históricos | La serialización conserva id, fecha, cliente, renglones y total de cada venta. Al recuperar no se reconstruyen precios, subtotales, títulos o cliente desde el catálogo o los datos actuales. |
| R-05 | Contrato | El SPEC define claves exactas, estructura JSON, correspondencia con arrays y funciones de carga/guardado. El README final describe el contrato realmente implementado y dónde cambiar solamente `precio` del catálogo para la prueba guiada. |
| R-06 | Errores | Los fallos de acceso, lectura o guardado se manejan sin errores no controlados ni sobrescritura silenciosa de información ilegible. El comportamiento elegido y sus límites se especifican y documentan; una operación solo en memoria no se presenta como guardada permanentemente. |
| R-07 | README y entrega | El README identifica integrantes; explica apertura sin npm, navegación, funcionalidades implementadas y pendientes, estructura de archivos, ubicación de ejemplos, persistencia, pruebas y procedencia de imágenes ajenas si existen. La entrega funciona con archivos locales y sin dependencias instaladas. |
| R-08 | Límites | El README explica que el almacenamiento depende del navegador, perfil y ubicación de apertura; no comparte información entre usuarios. Cambiar ruta o navegador puede dar otro almacenamiento; borrar datos del navegador lo elimina; el modo privado o restricciones pueden limitarlo. No se promete un comportamiento uniforme de localStorage bajo `file://` sin verificarlo. |
| R-09 | Pruebas | El README contiene los ocho casos de la tabla siguiente con pasos reproducibles, resultado esperado, resultado observado y estado real; registra entorno y fecha de ejecución. Ningún caso sin ejecutar figura aprobado. |
| R-10 | Precio histórico | En una copia de prueba se confirma una venta, se anotan sus importes, se cambia únicamente el precio del catálogo guardado con DevTools y se recarga. El detalle conserva precio unitario, subtotales y total originales. No se modifica ni borra la colección de ventas. |
| R-11 | Compatibilidad y estilo | Se mantiene la apertura directa sin servidor ni npm, recursos locales y separación HTML/CSS/JS. Archivos JS bajo `js/`, indentación de 2 espacios y nombres comprensibles en español. Se preservan ids y se insertan mensajes como texto. |

## Casos manuales obligatorios

La tabla define lo que debe comprobarse; no contiene resultados observados. En el README agregar columnas de pasos/datos usados, resultado observado y estado (`Aprobado`, `Fallido` o `Pendiente`). Si se ejecuta solo una parte, identificarla y mantener explícitos los subcasos pendientes.

| Caso | Pasos o datos de prueba | Resultado esperado |
| --- | --- | --- |
| M-01 · Búsqueda | Buscar `  FAROL  `, luego dejar la búsqueda vacía y después ingresar un título inexistente. | Coincidencias parciales sin distinguir mayúsculas y con espacios exteriores ignorados; catálogo completo al vaciar; mensaje sin resultados al final. |
| M-02 · Libros | Intentar un ISBN existente, incluyendo una variante sin guiones/espacios, y luego registrar un libro válido con ISBN nuevo, editorial existente y al menos un autor. | Duplicado rechazado; alta válida visible en catálogo y selector de venta sin recargar. |
| M-03 · Clientes | Intentar email inválido, email existente en mayúsculas y email nuevo válido. | Se rechazan los dos primeros; el nuevo aparece en listado y selector de cliente. |
| M-04 · Venta inválida | Intentar confirmar sin cliente; agregar o cambiar cantidades a cero, negativa y decimal; repetir un libro en una misma venta. | No se confirma una venta inválida; el duplicado se informa y no crea otro renglón. Identificar cada subcaso ejecutado. |
| M-05 · Venta válida | Crear dos libros ficticios de prueba desde el formulario, con ISBN nuevos y precios 1500 y 2000; seleccionar cliente y vender dos unidades del primero y una del segundo. | Subtotales `3000.00` y `2000.00`, total `5000.00`; venta confirmada y detalle conservado en historial. |
| M-06 · Precio histórico | En copia de prueba y con guía docente: confirmar venta, anotar importes y modificar solo el precio de uno de sus libros en el catálogo guardado; recargar y abrir el detalle anterior. | Catálogo refleja el nuevo precio; precio unitario, subtotales y total de la venta anterior conservan los importes confirmados. |
| M-07 · Recarga | Después de altas y una venta, anotar ids y cantidades de registros; recargar y reabrir en el mismo navegador, perfil y ubicación. Repetir la recarga. | Altas y venta recuperadas en listados, selectores e historial sin duplicación de ejemplos ni ventas. |
| M-08 · Teclado y adaptación | Recorrer enlaces, formularios, selectores y botones con Tab/Shift+Tab y operar con teclado; revisar todas las vistas y el detalle a 320 px y 1280 px. | Foco visible y controles utilizables; página sin desplazamiento horizontal general; tablas con desplazamiento propio cuando lo necesitan. |

Para M-05 los libros iniciales no tienen los precios 1500 y 2000: usar altas de prueba permite reproducir exactamente el caso sin cambiar los ejemplos del proyecto. Para M-06 documentar la clave y ruta JSON definitivas después de implementar, no una clave inventada como si ya existiera.

## Fase 1 — SPEC

Inspeccioná primero las fuentes y el código actual. Generá `openspec/changes/ejercicio-6-persistencia-verificacion-documentacion/proposal.md` con:

1. Problema, objetivo, contexto verificado y referencias a las fuentes.
2. Alcance y requisitos R-01 a R-11, escenarios observables y criterios de aceptación vinculados.
3. Diseño propuesto de almacenamiento: claves, JSON y correspondencia con `libros`, `clientes` e `historialVentas`. Identificá las decisiones como propuestas, no como implementación existente.
4. Estrategia para distinguir ausencia, array vacío y contenido inválido; carga inicial sin duplicar ejemplos y recuperación sin perder referencias a arrays `const`.
5. Orden de carga/inicialización. Considerá que `catalogo.js` renderiza al evaluarse, mientras altas y ventas usan `DOMContentLoaded`, y que `historialVentas` se declara en `ventas.js`.
6. Puntos mínimos de integración para guardar altas y ventas, reutilizando `libreria:alta` cuando resulte adecuado. Si se necesita un evento de confirmación, definirlo como nuevo y justificarlo; actualmente no existe.
7. Tratamiento de fallos y mensajes, sin borrar claves ajenas ni sobrescribir datos ilegibles automáticamente.
8. Estructura prevista del README y protocolo de los ocho casos, incluida la copia de prueba y la modificación exclusiva del catálogo en localStorage.
9. Archivos propuestos: por ejemplo `js/persistencia.js`, enlace en `index.html`, ajustes mínimos de integración en scripts existentes y `README.md`. Justificar el orden de scripts; los nombres y claves propuestos no son hechos existentes.
10. Supuestos, pendientes y riesgos concretos detectados por inspección. Integrantes: `{{DATO_PENDIENTE: nombres completos de quienes realizan el trabajo}}`; no inferirlos de rutas, usuarios de Git o equipos.

Si falta una decisión bloqueante, formulá una pregunta concreta. Al terminar, presentá la especificación y detenete para revisión. No avances a PLAN ni IMPLEMENTACIÓN automáticamente.

## Fase 2 — PLAN

Cuando autorice avanzar, generá `openspec/changes/ejercicio-6-persistencia-verificacion-documentacion/tasks.md` con tareas atómicas y checklist. Cada tarea debe indicar identificador, resultado, requisito/criterio cubierto, archivos afectados, dependencias y comprobación concreta.

Ordená el trabajo según sus dependencias: contrato y carga inicial → integración de guardados → recuperación de historial → README y protocolo → ejecución de casos y registro final. Si el plan cambia la especificación, solicitá aprobación del ajuste antes de implementar.

## Fase 3 — IMPLEMENTACIÓN

Iniciá únicamente tras aprobación explícita de la especificación y autorización para implementar.

- Ejecutá el plan aprobado con JavaScript nativo y cambios mínimos sobre los scripts existentes.
- Verificá primer inicio, guardado, recarga repetida, arrays vacíos guardados y precio histórico, además de los ocho casos manuales de la consigna.
- Usá datos ficticios y un contexto de prueba identificable; no borres datos existentes del usuario para preparar las pruebas.
- Para M-06 seguí el procedimiento guiado en copia de prueba: DevTools → almacenamiento local → clave de catálogo → modificar solo `precio` → recargar → consultar detalle histórico. No cambiar `js/datos.js`, ventas guardadas, subtotal ni total para simular esta comprobación.
- En el README registrá navegador/versión, fecha, datos usados, pasos, resultados observados, estado y evidencia disponible. Distinguir pruebas manuales de cualquier control automatizado complementario.
- Si no hay acceso a navegador o falta la instancia guiada por el docente, dejá los casos correspondientes pendientes con motivo y pasos preparados; no reemplaces su resultado por una conclusión obtenida solo leyendo el código.
- Si un caso falla por un defecto previo ajeno a la persistencia, documentá lo observado y proponé la corrección antes de ampliar el alcance.
- Completá el README con integrantes confirmados o placeholder visible, apertura de `index.html` sin npm, navegación, funcionalidades y pendientes reales, ejemplos en `js/datos.js`, contrato de almacenamiento implementado y sus límites, resultados manuales y procedencia de imágenes si corresponde. El HTML/CSS inspeccionado no usa imágenes; volver a comprobarlo antes de afirmarlo en la entrega.
- Entregá los archivos locales del proyecto y README; no incluyas dependencias instaladas ni herramientas de compilación.

## Criterios de aceptación

- [ ] CA-01 — Primer inicio carga ejemplos y guarda el estado inicial; recargas posteriores recuperan registros sin duplicarlos y respetan arrays vacíos (R-01, R-02).
- [ ] CA-02 — Altas válidas y ventas confirmadas persisten y aparecen al reabrir; operaciones rechazadas no crean registros; la restauración precede al render correspondiente (R-03).
- [ ] CA-03 — Historial recuperado conserva todos sus datos e importes; M-06 demuestra que cambiar solo el precio del catálogo guardado no altera la venta anterior (R-04, R-10).
- [ ] CA-04 — Claves, estructuras y procedimiento de cambio de precio documentados coinciden con el código entregado (R-05).
- [ ] CA-05 — Los fallos de almacenamiento siguen la política aprobada y no se presentan como persistencia exitosa ni destruyen silenciosamente datos previos (R-06).
- [ ] CA-06 — README con integrantes o pendientes explícitos, apertura, navegación, funcionalidades, ejemplos, límites, pruebas e imágenes según corresponda; entrega sin dependencias instaladas ni build (R-07, R-08, R-11).
- [ ] CA-07 — Los ocho casos tienen resultados observados o pendientes con motivo; navegador, fecha y fallos quedan identificados; no hay aprobados sin ejecución (R-09).
- [ ] CA-08 — Apertura directa conserva vistas, altas, ventas y recursos locales; teclado y anchos 320/1280 se comprueban sobre la versión final (R-11, M-08).
- [ ] La evaluación del Ejercicio 6 se refleja en la entrega: persistencia 4 puntos, pruebas manuales registradas 3 y documentación/entrega 3.

## Restricciones anti-alucinación

- No inventes integrantes, claves ya implementadas, APIs, archivos existentes, resultados de pruebas ni compatibilidad entre navegadores.
- Diferenciá hechos verificados, propuestas, supuestos y pendientes. Usá `{{DATO_PENDIENTE: descripción}}` para información no confirmada.
- No reutilices los estados antiguos de los prompts 1–5 como diagnóstico actual.
- El prompt del Ejercicio 5 menciona cambiar `datos.js` para probar precios históricos. Para el cierre prevalece la consigna del Ejercicio 6: modificar únicamente el catálogo guardado en localStorage, conservar ventas y recargar en copia de prueba.
- Leer código, encontrar capturas anteriores o comprobar cálculos por separado no equivale a ejecutar los casos manuales en navegador.
- Si no se puede leer el PDF, indicá que se usa la transcripción aportada; no afirmes haber inspeccionado un archivo inaccesible.
- No declares completo el ejercicio si quedan criterios fallidos o sin verificar. Enumeralos y explicá lo que falta.

## Instrucción de inicio

Empezá únicamente por la **Fase 1 — SPEC**: verificá el estado actual, generá `openspec/changes/ejercicio-6-persistencia-verificacion-documentacion/proposal.md`, presentalo para revisión y esperá mi respuesta. No avances automáticamente a PLAN ni IMPLEMENTACIÓN.
