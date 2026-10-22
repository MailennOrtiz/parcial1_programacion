# Design — Ejercicio 4: validación y actualización de altas

## Estado compartido y dependencias

Se conservan los arrays globales del Ejercicio 3: editoriales, generos, autores,
libros y clientes. Los campos son idEditorial, idGenero, idAutor, idLibro,
idsAutores e idCliente; el nombre del cliente es nombreCompleto.
No se reemplazan las colecciones ni se mantiene una copia paralela.

js/altas.js se carga después de catalogo.js y registra iniciarAltas en DOMContentLoaded.
Reutiliza crearTarjetaLibro y actualizarCatalogo.
En el main actual el orden general es datos → persistencia → catálogo → altas → ventas.
La carga de persistencia y las ventas pertenecen a otros ejercicios.

## Decisiones implementadas

1. **Un archivo de altas.** Funciones de registro separadas de los manejadores DOM,
   sin módulos, build ni dependencias del producto. Mantiene la apertura por file://.

2. **Comparación normalizada.** normalizarISBN quita espacios y guiones tanto al
   ingreso como al comparar datos previos. normalizarEmail aplica trim/minúsculas.
   El título y nombre completo se recortan. No se consulta un servicio externo
   ni se comprueba el dígito del ISBN o la existencia del buzón.

3. **Validar antes de insertar.** registrarLibro y registrarCliente devuelven
   { registro, errores }. Si hay errores, no ejecutan push. Los errores incluyen
   campo y mensaje. La comprobación del precio combina Number.isFinite con > 0.

4. **Relaciones por ID.** Editorial y género se validan con some; cada autor con
   every sobre el conjunto local. idGenero null representa ausencia.
   Un Set elimina relaciones repetidas de autores.

5. **Identificadores estables.** generarIdAlta usa los prefijos lib-/cli- y un
   bucle de comprobación para evitar un identificador ya presente.

6. **Mensajes propios.** Se configura noValidate para que el submit alcance la
   validación conjunta del código y los errores se muestren junto al formulario.
   Se aplica aria-invalid, aria-describedby y foco al primer error.
   El precio admite step="any", porque la consigna exige > 0 sin imponer centavos.

7. **Refresco desde el estado.** actualizarVistasAltas reconstruye listados y opciones.
   cargarOpcionesAlta recuerda las selecciones vigentes. Solo se resetea el formulario
   exitoso; el catálogo se actualiza con el texto de búsqueda actual.

8. **Texto e integración.** Los nodos se crean con createElement/textContent.
   Tras un alta correcta se emite document.dispatchEvent(new CustomEvent("libreria:alta",
   { detail: { tipo, registro } })). Ventas y persistencia pueden escucharlo sin
   volver a implementar las validaciones.

## Ganchos DOM

| Área | IDs |
| --- | --- |
| Formularios | form-alta-libro, form-alta-cliente |
| Libro | libro-titulo, libro-isbn, libro-precio, libro-editorial, libro-genero, libro-autores |
| Cliente | cliente-nombre, cliente-email |
| Resultados | resultado-alta-libro, resultado-alta-cliente |
| Listados | listado-libros, listado-clientes |
| Vacíos | mensaje-libros-vacio, mensaje-clientes-vacio |
| Integración | busqueda-titulo, venta-cliente, renglon-libro |

## Límites

La validación es didáctica y local: no brinda integridad de servidor.
La persistencia corresponde a js/persistencia.js; este módulo solo modifica los arrays
y notifica el evento. El formato del email es básico; no certifica que el buzón exista.
El render de precios reutiliza el criterio visual de catalogo.js.

Este diseño describe el código ya integrado. No representa un diseño aprobado
antes de su implementación ni una nueva modificación del comportamiento.
