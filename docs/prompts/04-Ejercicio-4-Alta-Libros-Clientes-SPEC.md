# Prompt consolidado — Ejercicio 4: alta de libros y clientes

> Documento elaborado el 22/10/2026 para completar la documentación del punto 4.
> La implementación se realizó en esta conversación y fue integrada el 20/10/2026
> mediante el PR #1. No existió un único prompt SDD previo idéntico a este archivo:
> aquí se conserva el pedido recibido y se consolida un prompt de referencia.
> No se afirma haber ejecutado Active-Stack, comandos OpenSpec ni aprobaciones
> de fases que no constan en el trabajo realizado.

## 1. Pedido recibido

El usuario indicó que le correspondía el Ejercicio 4 y transcribió su consigna.
Después autorizó realizarlo desde ChatGPT: «a genial entonces realizemolos desde aca».
Cuando el Ejercicio 3 estuvo disponible, se adaptó la solución a sus arrays y funciones.

### Consigna de origen

Fuente contrastada: docs/Consigna Primer Parcial.pdf, página 3, Ejercicio 4.

El formulario de libros permite registrar título, ISBN, precio y las relaciones con
editorial, género y autores. Las opciones se generan a partir de los datos locales:
editorial y género mediante selectores, y autores mediante un selector múltiple o
controles de selección equivalentes. El selector de género incluye la opción
«Sin clasificar», que representa la ausencia de género.

Se comprueba que el título y el ISBN no estén vacíos, que el ISBN no exista en el conjunto
local, que el precio sea numérico y mayor que cero y que la editorial y todos los autores
seleccionados existan en los datos locales. Se selecciona al menos un autor. El género
puede quedar sin asignar; si se asigna, se verifica que exista en los datos locales. Para
este parcial, el ISBN se compara sin espacios ni guiones; no se requiere implementar su
dígito de control.

El formulario de clientes permite registrar nombre completo y email. No se requiere un
campo de apellido separado. Se comprueba que el nombre completo y el email no estén
vacíos, que el email tenga un formato válido y que no exista otro cliente con el mismo
email, comparado sin espacios exteriores y sin distinguir mayúsculas de minúsculas.

Se controla el envío con preventDefault, se muestran errores cerca del formulario y solo
se agrega el registro si todas las comprobaciones pasan. Tras un alta correcta, el listado y
las opciones relacionadas se actualizan sin recargar la página. No se exige editar ni
eliminar registros.

## 2. Prompt consolidado de referencia

El siguiente texto reúne los requisitos y decisiones del punto. Es una reconstrucción
documental, no un registro literal de un prompt ejecutado antes de escribir el código.

### Rol

Actuá como desarrollador frontend con experiencia en JavaScript nativo, formularios,
validaciones y actualización segura del DOM.

### Contexto y fuentes

Proyecto: Libreria Nya, repositorio MailennOrtiz/parcial1_programacion.
La base que permitió integrar este punto fue el commit 4dc85f95fd992135385e8411bd83969c2f4a8700,
correspondiente al Ejercicio 3. Allí existen index.html, css/styles.css,
js/datos.js y js/catalogo.js.

Usá la consigna del Ejercicio 4, los campos HTML existentes y los arrays compartidos.
Respetá los contratos:

- Editorial: idEditorial, nombre.
- Género: idGenero, nombre.
- Autor: idAutor, nombre.
- Libro: idLibro, titulo, isbn, idEditorial, idGenero, idsAutores, precio.
- Cliente: idCliente, nombreCompleto, email.

No inventes otro dataset ni renombres los campos del equipo.

### Alcance

Implementá exclusivamente las altas de libros y clientes en js/altas.js.
En index.html, agregá su script local con defer después de catalogo.js.
Reutilizá los estilos, crearTarjetaLibro y actualizarCatalogo existentes.
No agregues edición, eliminación, ABM de editoriales/géneros/autores, backend,
dependencias, cálculo de ventas ni almacenamiento dentro del módulo de altas.

La versión actual de main ya incluye los ejercicios 5 y 6: no se deben retirar
sus archivos ni revertir su orden de carga al consultar esta referencia histórica.

### Requisitos verificables

1. Cargar selectores desde los datos locales, con varios autores y género opcional.
2. Validar título, ISBN único normalizado, precio finito positivo y relaciones existentes.
3. Validar nombre completo y email obligatorio, formato y unicidad con trim/minúsculas.
4. Completar todas las validaciones antes de insertar; conservar los datos ante rechazo.
5. Cancelar submit, mostrar errores cercanos y enfocar el primer campo inválido.
6. Tras éxito, limpiar solo el formulario correspondiente, informar el resultado y
   actualizar listados, opciones de ventas y catálogo con su filtro vigente.
7. Conservar las selecciones válidas y el borrador del otro formulario.
8. Insertar textos con createElement/textContent y evitar innerHTML con entradas.
9. Reutilizar IDs estables con prefijos lib-/cli- y evitar colisiones.
10. Emitir libreria:alta con tipo y registro después de un alta válida para facilitar
    la integración de otros módulos.

### Documentación en formato OpenSpec

Documentá objetivo y requisitos en proposal.md; decisiones e interfaces en design.md;
trazabilidad y estado de las tareas en tasks.md; requisitos y escenarios en
specs/altas-libros-clientes/spec.md. Conservá una especificación principal en
openspec/specs/altas-libros-clientes/spec.md.

En esta regularización los documentos se escriben después de la implementación.
Separá lo implementado de lo probado; no conviertas una reconstrucción documental
en evidencia de una ejecución SDD anterior.

### Verificación y entrega

Comprobá libros válidos, ISBN equivalente, campos vacíos, precio inválido, autores
vacíos/inexistentes, género ausente/inexistente, emails inválidos/equivalentes,
filtro activo, selectores y conservación de borradores.
Usá solo datos ficticios de prueba y contextos aislados.

Informá qué pruebas se ejecutaron realmente y en qué entorno; separá pruebas
de lógica, DOM simulado, inspección visual del usuario y pruebas en navegador real.
No presentes una captura estática como prueba de todos los envíos.

## 3. Trazabilidad

- Implementación integrada: PR #1, Ejercicio 4: alta de libros y clientes.
- Archivos de producto: js/altas.js y la referencia de script en index.html.
- Regularización: openspec/changes/archive/2026-10-22-ejercicio-4-altas-libros-clientes/.
- Contrato vigente: openspec/specs/altas-libros-clientes/spec.md.
- La documentación se cotejó con main en cc540b9e441573829953e22805b2a00a47497a07.
