# Ejercicio 6 — Persistencia, verificación y documentación

**Estado:** SPEC y PLAN aprobados; implementación autorizada y realizada. Verificación manual y cierre pendientes, según `tasks.md` y README.
**Fecha:** 20 de octubre de 2026.
**Proyecto:** Libreria Nya · Parcial 1 · Programación III.

## 1. Problema y objetivo

Las altas de libros y clientes y las ventas confirmadas existen solamente en memoria. Al recargar se vuelve a los ejemplos y se pierde el historial. Tampoco existe un README para abrir, verificar y entregar el trabajo.

Se propone conservar las tres colecciones con localStorage, recuperarlas antes de representarlas y completar la documentación y el registro de los ocho casos manuales exigidos. Las ventas recuperadas conservarán sus descriptivos e importes históricos, independientemente del precio actual del catálogo.

La Fase 1 produjo este documento, posteriormente aprobado por el usuario. Los comportamientos siguientes constituyen el alcance aprobado; no son funcionalidades ya incorporadas ni pruebas aprobadas.

## 2. Fuentes y contexto verificado

### Fuentes

- `docs/prompts/06-Ejercicio-6-Persistencia-Verificacion-Documentacion-SPEC.md`: instrucciones de esta fase y requisitos R-01 a R-11.
- `docs/prompts/Plantilla Prompts.md`: estructura SPEC → PLAN → IMPLEMENTACIÓN.
- Transcripción completa de la consigna aportada por el usuario: página 1, alcance técnico; página 5, Ejercicio 6; página 6, evaluación y entrega. Para esta fase se utiliza esa transcripción; no se realizó una nueva extracción del PDF local.
- `openspec/config.yaml`: esquema `spec-driven`, sin reglas adicionales activas para los artefactos.
- `openspec/specs/ventas-e-historial/spec.md`: contrato de ventas, duplicados rechazados, fecha dd/mm/yyyy, detalle histórico y ausencia de edición de ventas.
- Código inspeccionado: `index.html`, `css/styles.css`, `js/datos.js`, `js/catalogo.js`, `js/altas.js` y `js/ventas.js`; revalidación de inicialización, eventos y datos en esta fase.

### Hechos comprobados por inspección

| Componente | Estado existente relevante |
| --- | --- |
| Entrada | `index.html` contiene cinco secciones y scripts clásicos con `defer`, en orden datos → catálogo → altas → ventas. |
| Ejemplos | `datos.js` declara arrays `const`: 6 libros, 3 clientes, 2 editoriales, 2 géneros y 3 autores. Género opcional mediante `null`. |
| Catálogo | `catalogo.js` ejecuta su primer render al evaluarse; el filtro aplica `trim`, minúsculas y coincidencia parcial. |
| Altas | `altas.js` agrega a arrays existentes, actualiza listados/selectores y emite `libreria:alta` con `{ tipo, registro }` al completar el alta. Su inicialización escucha `DOMContentLoaded`. |
| Ventas | `ventas.js` declara `const historialVentas = []` y un borrador separado. `registrarVentaConfirmada()` agrega al historial; no emite un evento de confirmación. |
| Historial | Guarda fecha como texto dd/mm/yyyy, cliente descriptivo, títulos, cantidades, precios unitarios, subtotales y total; el detalle no busca precios en el catálogo. |
| Presentación | Hay reglas de foco y wrappers de tablas con `overflow-x: auto`. El detalle genera su tabla sin wrapper `.tabla-contenedor`. Esto debe observarse en M-08, no declararse aprobado por lectura. |
| Persistencia y documentación | No existe README en raíz y los scripts actuales no usan localStorage. |

La existencia de specs y capturas previas no equivale a verificar el funcionamiento de la versión final. No se ejecutaron casos manuales en esta fase.

## 3. Alcance

### Incluido

- Persistencia y recuperación de libros, clientes y ventas confirmadas.
- Primer inicio sin duplicados, preservación de arrays guardados vacíos e identificadores estables.
- Integración mínima de carga, eventos de alta y confirmación, sin alterar las reglas comerciales existentes.
- Tratamiento explícito de almacenamiento inaccesible, JSON inválido, estructura incompatible y fallos de escritura.
- README, protocolo de pruebas y registro de resultados reales en la futura implementación.
- Prueba guiada de precio histórico sobre una copia y datos ficticios, modificando exclusivamente el catálogo guardado.

### Fuera de alcance

- Reimplementación de Ejercicios 1–5, rediseño, nuevas validaciones comerciales o correcciones generales detectadas al probar.
- Persistencia de borradores, filtros, preferencias, editoriales, géneros y autores.
- Edición de precios o ventas desde la interfaz, importación/exportación, sincronización entre pestañas y migraciones de datos.
- Servidores, APIs, autenticación, stock, cobros, facturación, librerías, frameworks, CDNs y compilación.

Si un caso revela un defecto previo ajeno a esta integración, se registra como fallido y se solicita autorización para corregirlo. La documentación no ocultará el fallo ni lo resolverá cambiando el resultado esperado.

## 4. Requisitos verificables

Se conservan los identificadores del prompt de origen.

| ID | Requisito de esta propuesta |
| --- | --- |
| R-01 | Guardar y recuperar las tres colecciones en el mismo navegador, perfil y ubicación de apertura. |
| R-02 | Usar ejemplos solo ante ausencia de la clave correspondiente; recuperar reemplazando contenido, nunca concatenando; respetar `[]`. |
| R-03 | Restaurar antes del render, guardar altas correctas y ventas confirmadas y no escribir por operaciones rechazadas. Conservar los eventos y selectores existentes. |
| R-04 | Serializar y recuperar la venta completa, sin reconstruir descriptivos o importes desde libros/clientes vigentes. |
| R-05 | Definir claves y JSON explícitos; documentar en README el contrato implementado y la ruta al precio del catálogo. |
| R-06 | Capturar fallos de lectura/escritura y datos inválidos; preservar el valor almacenado ilegible y advertir cuándo los cambios son solo de sesión. |
| R-07 | Crear README con integrantes, apertura, navegación, funcionalidades y pendientes, estructura, ejemplos, almacenamiento, pruebas e imágenes; entregar archivos locales sin dependencias instaladas. |
| R-08 | Explicar dependencia de navegador/perfil/ubicación, borrado y restricciones, ausencia de intercambio entre usuarios y variabilidad de `file://`. |
| R-09 | Registrar los ocho casos con pasos, datos usados, esperado, observado, estado, fecha y entorno; no aprobar casos no ejecutados. |
| R-10 | Comprobar precio histórico en copia de prueba modificando solo el campo `precio` del catálogo guardado y consultando el historial después de recargar. |
| R-11 | Mantener apertura directa sin npm, recursos locales, separación HTML/CSS/JS, ids, mensajes como texto y convenciones de nombres e indentación de 2 espacios. |

## 5. Diseño propuesto de almacenamiento

### 5.1. Claves y estructura

Se proponen tres claves independientes, cuyos valores son arrays JSON sin envoltorio. Estas claves aún no existen en el código.

| Clave propuesta | Array de destino | Contenido |
| --- | --- | --- |
| `libreria-nya.libros.v1` | `libros` | Catálogo completo, incluidos ejemplos y altas. |
| `libreria-nya.clientes.v1` | `clientes` | Clientes completos, incluidos ejemplos y altas. |
| `libreria-nya.ventas.v1` | `historialVentas` | Solo ventas confirmadas; inicialmente `[]`. |

El sufijo `v1` identifica el contrato; no incorpora migraciones automáticas. Se escribe exclusivamente la colección afectada por una operación. No se utiliza `localStorage.clear()` ni se modifican claves ajenas.

Ejemplo estructural de libro (ilustrativo; no agrega datos iniciales):

```json
[
  {
    "idLibro": "lib-01",
    "titulo": "El farol de medianoche",
    "isbn": "978-987-1001-01-1",
    "idEditorial": "edi-01",
    "idGenero": "gen-01",
    "idsAutores": ["aut-01"],
    "precio": 12990.5
  }
]
```

Forma de cliente: `{ idCliente, nombreCompleto, email }`. Forma de venta: `{ idVenta, fecha, cliente: { id, nombre }, renglones: [{ titulo, cantidad, precioUnitario, subtotal }], total }`. Se mantienen nombres y tipos actuales. Los importes se guardan como números y se presentan con dos decimales; no se convierten a cadenas monetarias en JSON.

El historial no necesita un `idLibro` nuevo para recuperar su detalle: ya contiene el título y los valores históricos. No se exige que un cliente o libro histórico siga presente en las colecciones actuales.

### 5.2. Carga por colección

1. Leer la clave dentro de manejo de errores.
2. Si `getItem` devuelve `null`, conservar los ejemplos actuales de esa colección e intentar guardarlos. Para ventas, conservar y guardar `[]`.
3. Si existe un valor, interpretar JSON y validar estructura antes de modificar el array de destino.
4. Si es válido, reemplazar el contenido del array existente mediante mutación; no reasignar los `const` ni agregar el contenido al final. `[]` reemplaza por cero registros y no dispara carga de ejemplos.
5. No reescribir automáticamente colecciones válidas durante una recarga.
6. Si el valor no puede interpretarse o es incompatible, aplicar la política de la sección 7.

La validación de carga protege los campos que necesita el render: array de objetos, ids de texto no vacíos y sin duplicados por colección, textos necesarios, números finitos, precios positivos y cantidades enteras positivas. Para libros se comprueban editorial existente, autores existentes no vacíos y género `null` o existente. Para ventas se comprueban cliente descriptivo, renglones no vacíos, subtotales y total numéricos no negativos. No se recalculan ni corrigen importes históricos durante la carga. Un solo registro incompatible invalida la colección completa; no se descartan filas silenciosamente.

No se ejecutan las funciones de alta para restaurar: crearían ids nuevos, aplicarían eventos de usuario y podrían duplicar datos. Esta validación estructural no agrega nuevas reglas a los formularios.

### 5.3. Funciones e interfaces propuestas

| Interfaz propuesta | Responsabilidad |
| --- | --- |
| `cargarColeccionPersistida(tipo, destino)` | Resolver clave, leer, validar, conservar ejemplos si falta o reemplazar contenido. Registrar estado de la colección y devolver resultado. |
| `guardarColeccionPersistida(tipo, registros)` | Serializar y escribir solo la clave correspondiente; devolver resultado explícito y actualizar advertencias. |
| `validarColeccionPersistida(tipo, registros)` | Validación estructural acotada, sin reconstruir datos históricos ni reutilizar operaciones de alta. |
| `mostrarEstadoPersistencia()` | Mostrar avisos de sesión por colección con `textContent`; ocultar el contenedor si no hay avisos. |
| Listener `libreria:alta` | Guardar `libros` o `clientes` según `detail.tipo`; no volver a agregarlos ni duplicar render. |
| Listener nuevo `libreria:venta-confirmada` | Guardar `historialVentas` tras la incorporación de una venta confirmada. |

El resultado de carga/guardado distinguirá éxito, clave ausente inicializada y error, junto con motivo y tipo de colección. Los nombres podrán ajustarse en PLAN por estilo, sin cambiar el contrato observable aprobado.

## 6. Orden de ejecución e integración

### Scripts propuestos

`datos.js` → **`persistencia.js`** → `catalogo.js` → `altas.js` → `ventas.js`, todos con `defer`.

1. `datos.js` declara ejemplos y relaciones.
2. El nuevo `persistencia.js` define helpers, estados y listeners; restaura libros y clientes inmediatamente. El DOM ya está parseado por el uso de `defer`.
3. `catalogo.js` realiza su render inmediato con los libros ya recuperados.
4. `altas.js` conserva su inicialización mediante `DOMContentLoaded`; las opciones se generan con colecciones recuperadas.
5. `ventas.js` declara `historialVentas`. Al principio de `iniciarVentas()`, antes de sus renders, llama a `cargarColeccionPersistida("ventas", historialVentas)`.
6. No se intenta acceder al historial desde `persistencia.js` durante su evaluación: su declaración todavía no se ejecutó. El listener de venta solo lo consulta cuando el evento posterior ocurre.

### Guardado de operaciones

- Altas: consumir `libreria:alta`, que ya se emite únicamente después de un alta correcta. No requiere cambiar las validaciones ni insertar otro registro.
- Ventas: agregar la emisión síncrona de `libreria:venta-confirmada` con `detail: { venta }` después de `historialVentas.push(venta)` en `registrarVentaConfirmada()`, antes de devolver la venta. Este evento es nuevo y evita acoplar serialización con cálculos/render.
- Un guardado fallido no revierte una operación ya válida en memoria. Se conserva la experiencia actual y se muestra una advertencia persistente separada, según sección 7. El mensaje de alta/confirmación significa registro en sesión, y no debe afirmar durabilidad cuando hay un aviso de fallo.
- No se guarda al cerrar la pestaña ni se depende de `beforeunload`: cada operación correcta intenta escribir de inmediato.
- Los generadores actuales de ids examinan los arrays recuperados; no se reinician ids a partir de un contador aislado.

## 7. Estados y fallos

Se propone agregar dentro de `main`, antes de las vistas, un contenedor `#estado-persistencia` con clases de mensaje existentes y `aria-live="polite"`. Debe admitir avisos simultáneos por colección, permanecer visible mientras correspondan y no ser borrado por mensajes de altas o ventas.

| Situación | Estado en memoria y guardado | Mensaje observable |
| --- | --- | --- |
| Clave ausente | Ejemplos de esa colección o historial vacío; intento de guardado inicial. | Sin advertencia si se guarda; aviso de fallo si no se guarda. |
| Valor válido, incluido `[]` | Sustituir contenido del array, conservar valores; habilitar escrituras posteriores. | Sin advertencia. |
| JSON o estructura inválidos | Mantener ejemplos o historial vacío solo en memoria; bloquear escrituras sobre esa clave durante esta sesión para conservar el original. Las otras colecciones siguen independientes. | «No se pudieron recuperar [colección]. Los datos guardados se conservaron sin cambios; esta colección funciona solo durante esta sesión». |
| Acceso/lectura rechazado | Continuar con datos en memoria; bloquear escrituras de la colección durante la sesión porque no pudo comprobarse su contenido previo. | «No se pudo acceder al almacenamiento de [colección]. Los cambios de esta colección solo estarán disponibles durante esta sesión». |
| Escritura rechazada, por ejemplo cuota | Conservar operación en memoria y valor previo almacenado. Intentar de nuevo en la siguiente operación correcta de esa colección; no borrar datos para liberar espacio. | «No se pudieron guardar los últimos cambios de [colección]. Podrían perderse al recargar». |
| Escritura posterior exitosa | Guardar la colección completa en memoria y retirar únicamente su aviso de escritura pendiente. | Resto de avisos permanece. |

No se ofrece un botón de reinicio ni reparación automática. El README explica que los valores ilegibles deben revisarse en DevTools en una copia de prueba; recargar después de corregirlos permite una nueva lectura. No se solicita borrar almacenamiento del usuario como paso de verificación.

## 8. Escenarios observables

- **S-01 · Primer inicio:** sin las tres claves en un contexto de prueba nuevo, abrir la página. Se muestran 6 libros, 3 clientes y 0 ventas y quedan guardadas las tres colecciones si el navegador permite escribir.
- **S-02 · Recuperación repetida:** dar altas y confirmar venta, anotar ids y cantidades, recargar dos veces y reabrir. Se conserva exactamente la misma cantidad, sin combinar ejemplos con datos guardados.
- **S-03 · Colección vacía:** guardar `[]` en una clave de un contexto descartable, recargar. Se muestra la colección vacía y su mensaje correspondiente; no reaparecen ejemplos.
- **S-04 · Operación rechazada:** enviar ISBN duplicado, email inválido o venta inválida. La colección guardada no incorpora ningún registro.
- **S-05 · Integración:** un alta correcta aparece sin recargar en listados y selectores y se conserva después de recargar.
- **S-06 · Historial independiente:** confirmar una venta de total 5000, cambiar solo un precio del catálogo guardado y recargar. El catálogo cambia; la venta conserva sus precios, subtotales, total, fecha y cliente.
- **S-07 · Valor inválido:** en contexto descartable, usar JSON mal formado y después un JSON de estructura incorrecta. Se advierte el fallo, se conserva literalmente la clave original y las operaciones en esa colección no la sobrescriben.
- **S-08 · Fallo de escritura:** provocar de forma controlada un rechazo en contexto de prueba. La operación permanece en la sesión, aparece el aviso y no se informa que quedó guardada permanentemente. Identificar método usado para provocar el fallo; no llenar ni borrar almacenamiento real del usuario.
- **S-09 · Identificadores:** tras recuperar altas y ventas, crear otros registros. Sus ids no colisionan con los recuperados.
- **S-10 · Borrador:** componer sin confirmar y recargar. No se agrega una venta al historial; el borrador no se conserva.

## 9. README y protocolo de comprobación

### Contenidos previstos del README

1. Nombre del proyecto, materia e integrantes: `{{DATO_PENDIENTE: nombres completos de quienes realizan el trabajo}}`.
2. Apertura: descomprimir conservando carpetas y abrir `index.html` con doble clic en navegador; no instalar npm ni ejecutar servidor.
3. Navegación por los cinco enlaces y funciones de cada vista.
4. Funcionalidades implementadas, límites y pendientes reales al entregar.
5. Árbol breve de archivos, ejemplos ficticios en `js/datos.js` y separación de responsabilidades.
6. Funcionamiento de localStorage: claves definitivas, arrays JSON, primer inicio, guardado, recuperación, errores, dependencia de navegador/perfil/ruta, modo privado y eliminación al borrar datos. No comparte información entre usuarios ni constituye seguridad de servidor.
7. Registro de casos manuales con entorno, fecha y evidencia disponible.
8. Procedimiento guiado de precio histórico, con clave y campo exactos.
9. Procedencia de imágenes ajenas, si se incorporaron. En el HTML/CSS inspeccionado no hay recursos gráficos usados por la interfaz; volver a comprobar al entregar. Las capturas de documentación no implican imágenes de catálogo.
10. Archivos necesarios para entrega, sin dependencias instaladas ni herramientas de compilación.

### Matriz manual obligatoria

Todos los casos están **pendientes de ejecución** en esta fase. El README futuro añadirá resultado observado, estado, fecha, navegador/versión y evidencia o motivo del pendiente. Una ejecución parcial debe identificar cada subcaso faltante.

| Caso | Pasos reproducibles previstos | Resultado esperado |
| --- | --- | --- |
| M-01 | En catálogo buscar `  FAROL  `, borrar la entrada y buscar `zzzinexistente987`. | Coincidencia parcial sin distinguir mayúsculas ni espacios exteriores; catálogo completo al vaciar; mensaje sin coincidencias al final. |
| M-02 | Intentar alta con ISBN inicial `9789871001011`; después registrar «Prueba persistencia A», ISBN ficticio nuevo `PRUEBA-E6-1500`, precio 1500, editorial `edi-01`, autor `aut-01`, género sin clasificar. | Duplicado rechazado; libro nuevo visible en catálogo y selector de venta. Si ese ISBN de prueba ya existe, usar otro y anotarlo. |
| M-03 | Intentar `correo-invalido`, luego `LUCIA.FERNANDEZ@EJEMPLO.COM`, luego cliente «Cliente de prueba E6» con email ficticio nuevo `prueba.e6@ejemplo.com`. | Primeros dos rechazados; cliente nuevo en listado y selector. Adaptar email nuevo si ya existe y registrar el usado. |
| M-04 | Con renglón válido intentar confirmar sin cliente; con cliente probar cantidad 0, -1 y 1.5 al agregar y al cambiar un renglón; repetir un libro ya agregado. | Ninguna venta inválida se confirma; mensajes explícitos; duplicado no crea un segundo renglón. Registrar por separado cada subcaso y comprobar que historial no crece por intentos rechazados. |
| M-05 | Registrar «Prueba persistencia B», ISBN nuevo `PRUEBA-E6-2000`, precio 2000, relaciones válidas. Vender 2 unidades de A y 1 de B a cliente existente. | Subtotales `3000.00` y `2000.00`, total `5000.00`; historial y detalle conservan la venta; formulario queda preparado para otra. |
| M-06 | En copia de prueba y con guía docente, confirmar venta como M-05, anotar importes y modificar solamente `precio` de A en la clave de libros; recargar y abrir detalle. | Catálogo muestra el precio nuevo; la venta mantiene precios 1500 y 2000, subtotales 3000 y 2000 y total 5000. |
| M-07 | Anotar ids y cantidades tras altas y venta; recargar dos veces y reabrir mismo archivo con mismo navegador/perfil. | Mismos libros, clientes y ventas; opciones y detalle recuperados; ningún ejemplo o venta duplicado. |
| M-08 | A 320 px y 1280 px recorrer cinco vistas y detalle; usar Tab/Shift+Tab, Enter y Espacio según control; operar selects y cantidad. | Foco visible, controles utilizables, sin scroll horizontal global y tablas con scroll propio si necesitan ancho. Registrar problemas reales de la versión final. |

Los precios iniciales no son 1500 y 2000: se usan altas ficticias para reproducir el caso exacto sin cambiar `datos.js`. Se trabajará con copia y perfil/contexto de prueba identificados; bajo `file://` se comprobará el aislamiento en el navegador usado y no se asumirá que copiar archivos basta para separar el almacenamiento.

### Procedimiento preciso para M-06

1. En la copia de prueba, confirmar una venta con los datos de M-05 y anotar `idVenta`, precios, subtotales y total del detalle.
2. Abrir DevTools → Application/Aplicación o Storage/Almacenamiento → Local Storage/Almacenamiento local, según navegador.
3. Identificar la ubicación de apertura y la clave propuesta `libreria-nya.libros.v1`.
4. Dentro de su array JSON, identificar por `idLibro` el libro de precio 1500 y cambiar solamente ese campo `precio` por 9000, manteniéndolo numérico.
5. No modificar `libreria-nya.ventas.v1`, clientes, identificadores ni `datos.js`. Conservar el resto del catálogo intacto.
6. Recargar, verificar el precio 9000 en catálogo y abrir el detalle de la venta anterior.
7. Registrar lo observado: la venta debe conservar 1500 como precio unitario de ese libro, subtotal 3000 y total 5000. No recalcular manualmente valores guardados para hacer coincidir la prueba.
8. Si la instancia guiada docente no se realizó, marcar M-06 pendiente de esa instancia aunque exista una comprobación técnica complementaria.

## 10. Archivos afectados e impacto propuesto

| Archivo | Cambio previsto tras autorización |
| --- | --- |
| `js/persistencia.js` — nuevo | Claves, validación estructural, carga/guardado, estados y listeners. Recuperación inmediata de libros/clientes. |
| `index.html` | Enlace del script entre datos y catálogo; contenedor accesible de avisos de persistencia. Preservar ids y estructura de vistas. |
| `js/ventas.js` | Recuperación de historial antes de render; emisión del nuevo evento después de agregar una venta confirmada. |
| `README.md` — nuevo | Apertura, uso, almacenamiento y límites, entrega y resultados reales de comprobaciones. |

No se prevén cambios en `datos.js`, `catalogo.js`, `altas.js` ni en CSS: se reutilizan el contrato de arrays, el evento de alta y las clases de mensajes. Si la implementación requiere ampliar este impacto, se justificará antes de cambiar el alcance.

Capacidad nueva propuesta: `persistencia-verificacion-documentacion`. La capacidad existente `ventas-e-historial` se amplía en su integración con carga/guardado, conservando el contrato funcional de ventas y el formato de fecha. La separación de artefactos de implementación se resolverá en la fase autorizada; este documento no crea todavía tasks ni código.

## 11. Criterios de aceptación

| ID | Condición observable | Requisitos y evidencia futura |
| --- | --- | --- |
| CA-01 | Inicio con 6 libros, 3 clientes y 0 ventas en contexto nuevo; claves creadas si se puede guardar; recargas sin duplicados y `[]` respetado. | R-01, R-02; S-01, S-02, S-03, M-07. |
| CA-02 | Primer render y selectores usan datos recuperados; altas y ventas correctas persisten; rechazadas no crean registros; ids nuevos no colisionan. | R-03; S-04, S-05, S-09, M-02 a M-05 y M-07. |
| CA-03 | Detalle tras recarga usa datos históricos y mantiene todos los importes al cambiar solo precio de catálogo. | R-04, R-10; M-05 y M-06 guiado. |
| CA-04 | README identifica claves, arrays y ruta al precio coincidentes con la implementación entregada. | R-05; inspección final y reproducción de M-06. |
| CA-05 | Lecturas/escrituras fallidas e información inválida muestran avisos; ninguna clave ilegible se sobrescribe y no se promete guardado durable ante fallo. | R-06; S-07, S-08 y prueba de recuperación de escritura. |
| CA-06 | README incluye los contenidos de sección 9, límites reales e integrantes o pendiente visible; carpeta funciona sin npm ni servidor. | R-07, R-08, R-11; apertura local e inspección documental. |
| CA-07 | Ocho casos registrados, con subcasos, esperado/observado, estado y entorno reales. Nada sin ejecutar figura aprobado. | R-09; matriz final del README. |
| CA-08 | Apertura, recursos locales, navegación, teclado y anchos 320/1280 se verifican sobre la versión final; fallos pendientes se declaran. | R-11; M-08 y revisión final. |

La evaluación se organiza conforme a la consigna: persistencia 4 puntos, pruebas manuales registradas 3 y documentación/entrega 3. Documentar un pendiente no convierte un criterio funcional en aprobado.

## 12. Supuestos, pendientes y observaciones

- **Decisiones propuestas para aprobación:** tres claves separadas, guardado por eventos, restauración temprana de libros/clientes y carga del historial al iniciar ventas; ante fallo se conserva la operación en sesión con aviso, y las claves inválidas quedan protegidas durante la sesión.
- **Integrantes:** `{{DATO_PENDIENTE: nombres completos de quienes realizan el trabajo}}`. No bloquea la aprobación técnica; debe resolverse para la entrega identificada.
- **Entorno final:** `{{DATO_PENDIENTE: navegador, versión, perfil/contexto y fecha efectiva de pruebas}}`. No se declara compatibilidad comprobada en esta fase.
- **Instancia docente:** M-06 debe registrar la prueba guiada o quedar pendiente explícitamente.
- **Observaciones de código previo, aún no fallos reproducidos:** el estado de cantidad inválida se concentra en una bandera global y el detalle no usa el wrapper de tablas. M-04 y M-08 deben comprobar sus efectos, sin corrección automática fuera de alcance.
- **Limitación conocida del diseño:** no hay sincronización entre pestañas ni transacciones entre las tres claves. La consigna no las exige; usar una sola sesión de operación durante las pruebas.
- **Compatibilidad de archivos locales:** el comportamiento de localStorage bajo `file://` debe comprobarse en el entorno real y documentarse, no extrapolarse a todos los navegadores.
- **Verificación efectuada en esta fase:** lectura del prompt, código y configuración/spec existente; revisión del alcance documental. No se implementó persistencia, no se creó README y no se ejecutaron pruebas manuales.

## 13. Puerta de aprobación

El usuario aprobó explícitamente esta SPEC, luego el PLAN y autorizó la **Fase 3 — IMPLEMENTACIÓN**. El progreso real y sus comprobaciones se registran en `tasks.md` y en `README.md`. Se implementó el alcance de producto; las pruebas manuales, instancia guiada y defectos previos allí documentados siguen pendientes. La autorización no equivale a aprobación de pruebas ni permite ampliar silenciosamente el alcance.
