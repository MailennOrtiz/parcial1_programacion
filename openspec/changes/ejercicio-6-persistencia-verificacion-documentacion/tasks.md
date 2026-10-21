# PLAN — Ejercicio 6: persistencia, verificación y documentación

**Estado:** PLAN aprobado e implementación autorizada por el usuario. Código y documentación implementados; cierre pendiente de pruebas manuales, instancia docente y defectos previos registrados.
**Base:** `proposal.md`, SPEC aprobada explícitamente por el usuario.
**Seguimiento:** las casillas reflejan ejecución real. Las pruebas automatizadas en Chrome se distinguen del recorrido manual pendiente.

## Reglas de ejecución y cierre

- Iniciar las tareas solo tras autorización explícita de IMPLEMENTACIÓN.
- Cada tarea indica resultado, trazabilidad, archivos, dependencias y comprobación. Marcarla terminada solo después de obtener su resultado y completar la comprobación indicada.
- Registrar los controles de navegador en README con fecha efectiva, navegador/versión, ubicación/contexto, datos usados, esperado, observado y estado. Los controles técnicos complementarios no sustituyen los casos manuales.
- Si falta navegador o instancia docente, dejar la verificación afectada pendiente, con motivo y pasos. No marcar como completa una tarea de ejecución por haber documentado el pendiente.
- No corregir defectos previos de Ejercicios 1–5 automáticamente. Registrar fallos y solicitar autorización para cambios fuera de la SPEC.
- Respetar las tres claves y el diseño aprobados. Cualquier cambio sustantivo exige ajustar y aprobar la SPEC antes de implementar.

## 1. Contrato y persistencia base

- [x] **T-01 — Definir claves y estado por colección.**
  - **Resultado:** crear `js/persistencia.js` con las claves `libreria-nya.libros.v1`, `libreria-nya.clientes.v1` y `libreria-nya.ventas.v1`, y estado independiente de lectura bloqueada/aviso de escritura para cada colección. Definir resultados explícitos de las operaciones.
  - **Cubre:** R-05, R-06, R-11; CA-04, CA-05.
  - **Archivos:** nuevo `js/persistencia.js`.
  - **Depende de:** autorización de implementación.
  - **Comprobación:** inspeccionar claves y correspondencia con arrays; verificar que no se accede aún a `historialVentas` al evaluar este archivo, ni se borran claves ajenas.

- [x] **T-02 — Validar estructuras antes de recuperar.**
  - **Resultado:** implementar `validarColeccionPersistida(tipo, registros)` según SPEC §5.2: arrays, objetos, campos/tipos necesarios, ids no vacíos sin duplicados, relaciones de libros y números válidos; aceptar `[]`. Validar ventas sin reconstruirlas desde catálogo/clientes y sin corregir importes históricos.
  - **Cubre:** R-02, R-04, R-06; CA-01, CA-03, CA-05.
  - **Archivos:** `js/persistencia.js`.
  - **Depende de:** T-01.
  - **Comprobación:** usar ejemplos válidos y casos inválidos representativos: objeto en vez de array, registro `null`, ids duplicados, relaciones inexistentes y venta con renglones incompletos. Comprobar rechazo completo sin alterar los datos de entrada y aceptación de ventas descriptivas sin referencias actuales.

- [x] **T-03 — Implementar guardado con protección y reintento.**
  - **Resultado:** implementar `guardarColeccionPersistida(tipo, registros)` con JSON y escritura de una sola clave. Proteger las colecciones bloqueadas por lectura/estructura; ante fallo conservar memoria y valor previo, registrar aviso y permitir reintento en siguiente operación válida si solo falló la escritura.
  - **Cubre:** R-01, R-05, R-06; CA-04, CA-05.
  - **Archivos:** `js/persistencia.js`.
  - **Depende de:** T-01.
  - **Comprobación:** comprobar escritura de un array completo y que no cambia otras claves; con fallo controlado observar resultado de error, sin excepción no controlada; escritura posterior exitosa retira solo su aviso.

- [x] **T-04 — Implementar recuperación sin duplicados.**
  - **Resultado:** implementar `cargarColeccionPersistida(tipo, destino)`: distinguir `null` de `[]`, guardar ejemplos únicamente si la clave falta, reemplazar contenido por mutación del array existente y no reescribir valores válidos. Ante lectura/JSON/estructura inválidos, conservar memoria y proteger la clave durante la sesión.
  - **Cubre:** R-01, R-02, R-04, R-06; CA-01, CA-03, CA-05.
  - **Archivos:** `js/persistencia.js`.
  - **Depende de:** T-02, T-03.
  - **Comprobación:** probar clave ausente, array guardado con registros, `[]`, JSON mal formado y estructura incompatible; verificar identidad del array destino, ausencia de concatenación y conservación literal del valor ilegible.

## 2. Inicialización, avisos e integración

- [x] **T-05 — Enlazar persistencia y restaurar libros/clientes antes del catálogo.**
  - **Resultado:** enlazar el nuevo script con `defer` entre `datos.js` y `catalogo.js`; ejecutar recuperación inmediata de libros/clientes desde persistencia. Mantener intactos los ganchos de vistas.
  - **Cubre:** R-02, R-03, R-11; CA-01, CA-02, CA-08.
  - **Archivos:** `index.html`, `js/persistencia.js`.
  - **Depende de:** T-04.
  - **Comprobación:** abrir mediante `file://` con un libro/cliente guardado distinguible; comprobar que catálogo y selectores muestran los recuperados sin un render inicial de ejemplos; consola sin errores de orden o declaraciones.

- [x] **T-06 — Presentar avisos accesibles por colección.**
  - **Resultado:** agregar `#estado-persistencia` antes de las vistas dentro de `main`, con clases existentes y `aria-live="polite"`; implementar `mostrarEstadoPersistencia()` usando texto, admitiendo varios avisos simultáneos y ocultándolo cuando no haya avisos.
  - **Cubre:** R-06, R-11; CA-05, CA-08.
  - **Archivos:** `index.html`, `js/persistencia.js`.
  - **Depende de:** T-01, T-05.
  - **Comprobación:** generar dos avisos distintos; comprobar que un alta/venta no los borra y que resolver una escritura no elimina el otro. Verificar que los mensajes diferencian sesión de guardado durable y no se insertan como HTML.

- [x] **T-07 — Guardar altas mediante el evento existente.**
  - **Resultado:** consumir `libreria:alta`, seleccionar `libros` o `clientes` por `detail.tipo` y guardar su array completo una sola vez por evento, sin volver a insertar registros ni duplicar render/listeners.
  - **Cubre:** R-01, R-03; CA-02.
  - **Archivos:** `js/persistencia.js`; consumo del contrato existente de `js/altas.js`, sin modificarlo.
  - **Depende de:** T-03, T-05, T-06.
  - **Comprobación:** alta válida de cada tipo cambia solo su clave; duplicados/entradas inválidas no agregan datos guardados. Tras recarga aparecen ambos registros y opciones relacionadas.

- [x] **T-08 — Recuperar historial antes de representarlo.**
  - **Resultado:** llamar a `cargarColeccionPersistida("ventas", historialVentas)` al comienzo de `iniciarVentas()`, antes de renders; conservar el array `const` y el formato de fecha/importes históricos.
  - **Cubre:** R-01, R-02, R-03, R-04; CA-01, CA-02, CA-03.
  - **Archivos:** `js/ventas.js`.
  - **Depende de:** T-04, T-05, T-06.
  - **Comprobación:** recargar con historial guardado y abrir sus detalles; cotejar ids, fecha, cliente, títulos e importes con JSON. Probar también historial vacío guardado y clave ausente.

- [x] **T-09 — Guardar cada venta confirmada por evento nuevo.**
  - **Resultado:** emitir `libreria:venta-confirmada` con `detail: { venta }` después de `historialVentas.push(venta)` y antes del retorno en `registrarVentaConfirmada()`; consumirlo desde persistencia para guardar historial completo. Mantener limpieza de borrador y mensaje de confirmación existentes.
  - **Cubre:** R-01, R-03, R-04, R-06; CA-02, CA-03, CA-05.
  - **Archivos:** `js/ventas.js`, `js/persistencia.js`.
  - **Depende de:** T-03, T-06, T-07, T-08.
  - **Comprobación:** confirmar dos ventas válidas y comprobar dos registros e ids distintos; intentos rechazados no emiten evento ni agregan ventas; fallo de escritura deja venta en memoria con aviso persistente.

## 3. README y preparación de pruebas

- [x] **T-10 — Redactar instrucciones de apertura, uso y entrega.**
  - **Resultado:** crear README con título/materia, integrantes confirmados o placeholder visible, apertura sin npm, cinco vistas, funcionalidades y pendientes reales, árbol breve, ejemplos ficticios en `datos.js`, recursos e imágenes según inspección y archivos de entrega.
  - **Cubre:** R-07, R-11; CA-06.
  - **Archivos:** nuevo `README.md`.
  - **Depende de:** T-09 para describir el alcance ya implementado.
  - **Comprobación:** seguir los pasos desde apertura directa; contrastar rutas y funciones con archivos existentes. No inferir integrantes ni afirmar ausencia de imágenes sin revisar la versión final.

- [x] **T-11 — Documentar contrato y límites de almacenamiento.**
  - **Resultado:** incluir tres claves exactas, formas JSON, ubicación del precio, inicialización, recuperación, guardado por evento, errores y protección de claves. Explicar navegador/perfil/ruta, `file://`, modo privado, borrado y ausencia de datos compartidos entre usuarios.
  - **Cubre:** R-05, R-06, R-08; CA-04, CA-05, CA-06.
  - **Archivos:** `README.md`.
  - **Depende de:** T-10.
  - **Comprobación:** cotejar cada clave/campo/política con código final; confirmar que no se promete persistencia universal ni seguridad de servidor.

- [x] **T-12 — Preparar matriz y contexto de verificación.**
  - **Resultado:** incorporar los ocho protocolos de SPEC §9 al README con esperado, observado, estado y entorno; preparar una copia/contexto descartable identificable con datos ficticios A/B a 1500/2000 y cliente de prueba. Inicialmente usar «Pendiente», sin resultados inventados.
  - **Cubre:** R-09, R-10, R-11; CA-07, CA-08.
  - **Archivos:** `README.md`; copia/contexto de prueba, sin incorporar herramientas o dependencias al producto.
  - **Depende de:** T-11.
  - **Comprobación:** confirmar aislamiento del almacenamiento en el navegador elegido, registrar ruta y perfil/contexto y no borrar datos del usuario; cada caso debe tener pasos reproducibles y espacio para resultados reales.

## 4. Verificación y registro de resultados

- [x] **T-13 — Ejecutar primer inicio, recuperación y estados vacíos.**
  - **Resultado:** verificar S-01, S-02, S-03, S-09 y S-10 en contexto de prueba: inicial 6/3/0, arrays vacíos para cada colección, recargas/reapertura sin duplicación, ids nuevos sin colisiones y borrador sin persistir. Registrar también cualquier limitación del entorno.
  - **Cubre:** R-01, R-02, R-03, R-11; CA-01, CA-02, CA-08.
  - **Archivos/entregables:** `README.md`, registros del contexto de prueba.
  - **Depende de:** T-12.
  - **Comprobación:** cotejar conteos/ids antes y después con DevTools y DOM; `[]` permanece vacío, no se repueblan ejemplos. Registrar entorno y observado, sin sustituir navegador por lectura de código.

- [x] **T-14 — Ejecutar fallos de almacenamiento y recuperación de escritura.**
  - **Resultado:** verificar S-07/S-08: JSON inválido, estructura incorrecta y rechazo de acceso/lectura protegen claves; fallo solo de escritura permite reintento, sin revertir memoria ni borrar otros avisos. Incluir fallo de guardado inicial de clave ausente.
  - **Cubre:** R-06; CA-05.
  - **Archivos/entregables:** `README.md`, evidencia técnica del contexto descartable.
  - **Depende de:** T-12.
  - **Comprobación:** en copia/contexto de prueba provocar errores con instrumentación temporal de `Storage.prototype.getItem/setItem` que lance excepciones controladas, restaurando métodos al terminar; registrar método y diferenciar simulación de fallo real del navegador. Comparar valores previos/posteriores, avisos y memoria. No agregar controles de simulación al producto ni llenar la cuota real del usuario. Si la instrumentación no es viable, dejar el control afectado pendiente con motivo.

- [ ] **T-15 — Ejecutar M-01, M-02 y M-03.**
  - **Avance observado:** controles automatizados en Chrome correctos; falta recorrido manual y su registro como tal. Ver README.
  - **Resultado:** comprobar búsqueda parcial/mayúsculas/espacios, búsqueda vacía y sin resultados; ISBN duplicado y nuevo; email inválido, duplicado en mayúsculas y nuevo. Verificar actualización de listados y selectores.
  - **Cubre:** R-03, R-09; CA-02, CA-07.
  - **Archivos/entregables:** `README.md`, evidencia manual disponible.
  - **Depende de:** T-12.
  - **Comprobación:** ejecutar cada subcaso de SPEC §9, registrar datos usados y rechazo/alta realmente observados; cotejar que solo altas válidas cambian almacenamiento.

- [ ] **T-16 — Ejecutar M-04 y M-05.**
  - **Avance observado:** controles automatizados de casos básicos correctos y venta de total 5000 conservada. Caso adicional fallido: quitar renglón inválido deja la bandera global bloqueando el restante válido. Falta recorrido manual y autorización para corregir defecto previo.
  - **Resultado:** comprobar confirmación sin cliente, cantidades 0/-1/1.5 al agregar y editar, libro duplicado; confirmar después 2 unidades a 1500 y 1 a 2000.
  - **Cubre:** R-03, R-04, R-09; CA-02, CA-03, CA-07.
  - **Archivos/entregables:** `README.md`, evidencia manual disponible.
  - **Depende de:** T-15 para altas ficticias de prueba; registrar el libro B de precio 2000 según protocolo.
  - **Comprobación:** intentos inválidos no aumentan historial; venta válida muestra 3000.00/2000.00/5000.00, datos descriptivos correctos y formulario limpio. Registrar por separado los subcasos, incluidos fallos previos que aparezcan.

- [ ] **T-17 — Ejecutar M-07: recarga tras altas y venta.**
  - **Avance observado:** dos recargas y reapertura automatizadas conservaron estado idéntico de 8 libros, 4 clientes y 1 venta. Falta ejecución manual.
  - **Resultado:** verificar recuperación en catálogo, listados, selectores e historial después de dos recargas y reapertura del mismo archivo/contexto.
  - **Cubre:** R-01, R-02, R-03, R-04, R-09; CA-01, CA-02, CA-03, CA-07.
  - **Archivos/entregables:** `README.md`, conteos/ids y detalle observados.
  - **Depende de:** T-16.
  - **Comprobación:** cotejar registros y venta antes/después; ningún ejemplo, alta o venta se duplica y todos los importes históricos permanecen.

- [ ] **T-18 — Documentar y realizar M-06 guiado: precio histórico.**
  - **Avance observado:** protocolo documentado y control automatizado correcto: catálogo a 9000, venta a 1500/2000 y total 5000, clave de ventas idéntica. Instancia guiada docente pendiente.
  - **Resultado:** incluir el procedimiento exacto de SPEC §9 y realizar la instancia guiada por docente en copia de prueba. Cambiar únicamente `precio` de A de 1500 a 9000 en `libreria-nya.libros.v1`, preservando ventas y demás datos.
  - **Cubre:** R-04, R-05, R-09, R-10; CA-03, CA-04, CA-07.
  - **Archivos/entregables:** `README.md`, evidencia de instancia guiada y almacenamiento de la copia.
  - **Depende de:** T-17 y disponibilidad de instancia docente.
  - **Comprobación:** tras recargar, catálogo a 9000 y detalle anterior a 1500, subtotal 3000, total 5000; comprobar que la clave de ventas no fue editada. Si solo se hizo un control técnico sin docente, identificarlo por separado y mantener M-06 y esta tarea pendientes de la instancia guiada.

- [ ] **T-19 — Ejecutar M-08: teclado y adaptación final.**
  - **Avance observado:** medición automatizada fallida a 320 px (ancho de contenido global 439 px); a 1280 px sin desborde global. Tab desde buscador enfocó Buscar con outline sólido 3 px. Recorrido manual completo y corrección autorizada del defecto previo pendientes.
  - **Resultado:** recorrer las cinco vistas y detalle a 320 px y 1280 px; usar teclado para enlaces, formularios, selects y botones; comprobar foco visible y desplazamiento propio de tablas.
  - **Cubre:** R-09, R-11; CA-07, CA-08.
  - **Archivos/entregables:** `README.md`, capturas o notas del recorrido si se obtienen.
  - **Depende de:** T-16, con una venta que permita consultar detalle.
  - **Comprobación:** registrar ambos anchos, ausencia/presencia real de scroll global y usabilidad del detalle. Revisar especialmente el wrapper de detalle y los efectos de la bandera global de cantidad inválida observados en M-04; no corregirlos sin autorización si son defectos ajenos a integración.

## 5. Revisión y cierre

- [x] **T-20 — Conciliar evidencia, documentación y alcance entregado.**
  - **Resultado:** actualizar funcionalidades, pendientes y matriz final con resultados reales; identificar integrantes confirmados o pendiente visible; revisar trazabilidad CA-01 a CA-08 y correspondencia README/código.
  - **Cubre:** R-05, R-07, R-08, R-09, R-11; CA-04, CA-06, CA-07, CA-08.
  - **Archivos:** `README.md`, este `tasks.md` para progreso real; revisión de `js/persistencia.js`, `index.html` y `js/ventas.js`.
  - **Depende de:** registrar resultado o motivo de bloqueo de T-13 a T-19. Una tarea de verificación bloqueada no se marca completa por este cierre documental.
  - **Comprobación:** revisar diff y apertura local, rutas/recursos y ausencia de dependencias instaladas/build. Confirmar que los cambios de producto se limitan a los cuatro archivos aprobados y no quedan instrumentaciones de prueba. Emitir resumen de aprobados, fallidos y pendientes sin declarar terminado el ejercicio si hay criterios pendientes.

## Orden de dependencias

```text
Autorización de IMPLEMENTACIÓN
  └─ T-01
      ├─ T-02 ─┐
      └─ T-03 ─┴─ T-04 → T-05 → T-06
                                 ├─ T-07 ─┐
                                 └─ T-08 → T-09
                                          └─ T-10 → T-11 → T-12
                                                               ├─ T-13
                                                               ├─ T-14
                                                               └─ T-15 → T-16
                                                                            ├─ T-17 → T-18 (docente)
                                                                            └─ T-19
Registro de resultados o bloqueos de T-13 a T-19 → T-20
```

T-09 presupone la integración de altas T-07 antes de pasar a documentación y recorrido completo. Las ramas representan independencia de comprobaciones, no autorización para delegación ni requisito de trabajo paralelo.

## Cobertura resumida

| Criterio de SPEC | Tareas principales |
| --- | --- |
| CA-01 · Inicio y recuperación | T-02, T-04, T-05, T-08, T-13, T-17 |
| CA-02 · Integración y operaciones | T-05, T-07, T-08, T-09, T-13, T-15, T-16, T-17 |
| CA-03 · Historial y precio | T-02, T-04, T-08, T-09, T-16, T-17, T-18 |
| CA-04 · Contrato documentado | T-01, T-03, T-11, T-18, T-20 |
| CA-05 · Errores | T-01 a T-04, T-06, T-09, T-11, T-14 |
| CA-06 · README y entrega | T-10, T-11, T-20 |
| CA-07 · Casos registrados | T-12, T-15 a T-20 |
| CA-08 · Apertura y usabilidad | T-05, T-06, T-12, T-13, T-19, T-20 |

## Pendientes de autorización o información

- El usuario autorizó explícitamente la Fase 3 — IMPLEMENTACIÓN. No se amplió el alcance a correcciones de CSS o lógica comercial previa.
- Integrantes: `{{DATO_PENDIENTE: nombres completos de quienes realizan el trabajo}}`.
- Entorno y resultados: Chrome 155.0.8059.85 headless con protocolo de depuración, Windows, apertura `file://`, perfil temporal nuevo. Registro de ejecución terminado en `2026-10-21T02:17:53.576Z` (UTC), fecha local de las ventas 20/10/2026. Evidencia y protocolos en README; pruebas manuales no realizadas.
- Instancia docente de M-06: pendiente de coordinación; no impide implementar el almacenamiento ni preparar su protocolo.
- No se modificaron specs canónicas ni se archivó el change mientras hay verificaciones pendientes. El script de comprobación e instrumentación viven fuera de la entrega, en el directorio temporal autorizado; no se agregaron dependencias al proyecto.

## Evidencia de ejecución y límites del cierre

- T-01 a T-09: inspección del código y recorrido automatizado de DOM/localStorage en Chrome real. Sin excepciones de página durante las comprobaciones; sintaxis de `persistencia.js` y `ventas.js` válida mediante `node --check`.
- T-10/T-11: README contrastado con rutas, claves, tipos y políticas implementadas; apertura local real verificada mediante navegador automatizado. Integrantes conservan placeholder visible.
- T-12: matriz preparada y perfil temporal independiente `e6-chrome-1792549067986`, fuera de la carpeta de entrega. No se usó el perfil habitual del usuario.
- T-13: controles automatizados de primer inicio, recargas/reapertura, arrays vacíos, nuevos ids sin colisiones y descarte del borrador correctos. Esto no completa el caso manual M-07, que permanece en T-17.
- T-14: excepciones controladas simuladas mediante reemplazo temporal de métodos `Storage.prototype`; originales restaurados. JSON/estructura inválidos protegidos; fallo inicial, escritura/reintento, avisos independientes y venta en memoria comprobados. No se agotó cuota real.
- T-20: documentación conciliada y diff de producto limitado a `index.html`, `js/ventas.js`, nuevo `js/persistencia.js` y nuevo `README.md`; pendientes y defectos previos explícitos.
- El ejercicio **no se declara completamente verificado**: quedan T-15 a T-19, integrantes y resolución de los defectos previos con autorización. Documentar esos pendientes no los convierte en aprobados.
