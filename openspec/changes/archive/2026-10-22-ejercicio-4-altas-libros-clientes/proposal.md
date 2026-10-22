# Proposal — Ejercicio 4: alta de libros y clientes

## Contexto y origen

El punto 4 se implementó e integró en main el 20/10/2026 mediante el PR #1.
Se agregaron js/altas.js y su referencia en index.html. Al revisar la documentación
del equipo el 22/10/2026 se detectó que faltaban el prompt y el change de este punto.

Este paquete regulariza esa omisión. Su fecha es la de documentación, no una fecha
retroactiva de aprobación. Se elaboró manualmente con estructura compatible con
OpenSpec; no se ejecutaron comandos de Active-Stack/OpenSpec para producirlo.

Fuentes:
- docs/Consigna Primer Parcial.pdf, página 3 (Ejercicio 4) y página 6 (rúbrica).
- js/altas.js, js/datos.js y js/catalogo.js del repositorio.
- Pedido, autorización e integración realizados en la conversación de trabajo.
- README.md y documentos de los demás ejercicios para conservar sus convenciones.
- Revisión documental sobre main en cc540b9e441573829953e22805b2a00a47497a07.

## Objetivo

Permitir registrar libros y clientes válidos usando los datos locales existentes,
informando errores y actualizando la interfaz sin recargar.

## Alcance implementado

- Selectores de editorial, género y varios autores desde las colecciones locales.
- Validación completa de libros, ISBN equivalente y relaciones existentes.
- Nombre completo y email válido/único en el alta de clientes.
- Validación previa a mutar, mensajes, foco y conservación de datos ante errores.
- Refresco de listados y opciones, conservación de borradores y filtro de catálogo.
- Evento libreria:alta para la integración de otros ejercicios.

No incluye edición ni eliminación, dígito de control del ISBN, backend, gestión de
editoriales/géneros/autores, ventas ni persistencia propia. Los ejercicios 5 y 6,
que ahora están en main, consumen este módulo sin formar parte de su implementación.

## Requisitos y criterios de aceptación

| ID | Requisito | Criterio de aceptación |
| --- | --- | --- |
| R-01 | Opciones locales | Editorial/género/autores se generan desde sus arrays; «Sin clasificar» representa null. |
| R-02 | Libro válido | Título e ISBN no vacíos, precio finito > 0, editorial existente y uno o más autores existentes. |
| R-03 | ISBN y género | ISBN único sin espacios/guiones; género opcional y existente si se asigna. |
| R-04 | Cliente válido | Un campo nombreCompleto; email obligatorio, de formato válido y único con trim/minúsculas. |
| R-05 | Registro atómico | No se agrega nada si falla un control; se muestran errores cercanos y se conserva lo escrito. |
| R-06 | Actualización | preventDefault, mensaje de éxito, limpieza del formulario correcto y refresco sin recarga. |
| R-07 | Integración | Mismos arrays/IDs del Ejercicio 3; catálogo con filtro activo, opciones de ventas y borradores preservados. |
| R-08 | DOM seguro | Inserción como texto, campos relacionados con mensajes y foco al primer error. |

Los escenarios detallados están en specs/altas-libros-clientes/spec.md.

## Entregables documentales de esta corrección

1. Prompt consolidado, con la consigna y el contexto del pedido real.
2. proposal.md, design.md, tasks.md y metadatos del change.
3. Spec de escenarios dentro del change.
4. Spec principal en openspec/specs/altas-libros-clientes/spec.md.

La corrección agrega documentos; no cambia los archivos de producto.

## Evidencia y límites

En la conversación del 20/10/2026 se ejecutaron pruebas de lógica y 26 escenarios
sobre los archivos del ZIP con JSDOM (DOM simulado). Esos controles aprobaron.
El usuario revisó visualmente la aplicación en su equipo y compartió capturas.
No se afirma haber ejecutado personalmente un navegador real ni el recorrido
manual completo de todos los casos.

El README actual contiene la evidencia de integración registrada en el Ejercicio 6.
Esa evidencia se conserva bajo su autoría y contexto; no se presenta como una nueva
ejecución realizada al escribir este change.

La regularización del 22/10/2026 se valida por correspondencia documental con el
código y la consigna. No altera ni amplía los resultados históricos de pruebas.
