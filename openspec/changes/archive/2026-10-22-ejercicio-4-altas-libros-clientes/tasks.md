# Tasks — Ejercicio 4: trazabilidad y cierre documental

Documento elaborado el 22/10/2026 sobre una implementación ya integrada.
Las marcas describen el estado constatado; no acreditan ejecución cronológica
de una fase PLAN ni aprobaciones SDD anteriores.

## 1. Implementación existente

- [x] 1.1 Reutilizar arrays e IDs del Ejercicio 3, sin crear datos paralelos. (R-01, R-07.)
- [x] 1.2 Generar selectores y representar género sin asignar con null. (R-01, R-03.)
- [x] 1.3 Validar libro, ISBN equivalente, precio y relaciones antes de insertar. (R-02, R-03, R-05.)
- [x] 1.4 Validar nombreCompleto/email y duplicados normalizados. (R-04, R-05.)
- [x] 1.5 Conectar submits con preventDefault y mensajes cercanos al formulario. (R-05, R-06.)
- [x] 1.6 Conservar datos ante error; aplicar foco y marcas accesibles. (R-05, R-08.)
- [x] 1.7 Tras éxito, limpiar solo el formulario correcto y refrescar listados/opciones. (R-06, R-07.)
- [x] 1.8 Mantener filtro, borradores y selecciones válidas. (R-07.)
- [x] 1.9 Usar texto seguro y emitir libreria:alta. (R-07, R-08.)
- [x] 1.10 Enlazar js/altas.js en index.html e integrar el PR #1 en main.

## 2. Evidencia histórica disponible

- [x] 2.1 Pruebas de lógica sobre las validaciones de los archivos del ZIP.
- [x] 2.2 Ejecutar 26 escenarios con JSDOM: carga, opciones, altas, rechazos,
  normalización, refresco, filtro, limpieza, conservación de datos y texto seguro.
  Resultado registrado en la conversación del 20/10/2026: 26 aprobados, sin errores JS.
- [x] 2.3 Inspección visual general realizada y reportada por el usuario, con capturas.
- [ ] 2.4 Recorrido manual completo de todos los escenarios de este SPEC en navegador
  real, con datos, observado, fecha y versión por caso. La inspección visual general
  no se considera evidencia individual de todos los casos.

Las pruebas históricas no se reejecutaron al redactar esta corrección documental.
Consultar README.md para los controles posteriores de integración del Ejercicio 6,
conservando su distinción entre automatizado, reportado por el usuario y pendiente.

## 3. Regularización documental del 22/10/2026

- [x] 3.1 Constatar la ausencia del prompt y change del punto 4 en main.
- [x] 3.2 Contrastar la consigna PDF (páginas 3 y 6) y el código actual.
- [x] 3.3 Registrar el pedido recibido y un prompt consolidado identificado como tal.
- [x] 3.4 Incorporar proposal.md, design.md, tasks.md y metadatos del change.
- [x] 3.5 Incorporar escenarios y su spec principal.
- [x] 3.6 Revisar coherencia de nombres, IDs, rutas y estado de la evidencia.
- [ ] 3.7 Incorporar estos documentos al repositorio mediante commit/PR.
  La conexión de esta sesión devuelve 403 al intentar crear una rama; se entrega
  un paquete de documentos para que el usuario pueda subirlos.

## Criterio de cierre

La funcionalidad del punto 4 ya estaba integrada. El cierre de esta corrección
requiere incorporar los documentos y mantener explícitos los controles pendientes.
No se marca como ejecutado ningún comando de OpenSpec/Active-Stack.
