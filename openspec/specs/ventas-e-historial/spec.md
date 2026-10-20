# ventas-e-historial Specification

## Purpose
Definir el comportamiento observable de la composición de ventas con renglones, los cálculos de importes, la confirmación con precio histórico y el historial inmutable de ventas consultable, para el frontend «Libreria Nya» (Ejercicio 5 del Parcial 1, Programación III).

## Requirements

### Requirement: Venta en curso con cliente y renglones válidos
El sistema SHALL mantener en memoria, separada del historial, una venta en curso compuesta por un cliente existente seleccionado y una lista de renglones (libro existente + cantidad entera mayor que cero), y SHALL recolectar cada renglón desde el formulario de renglones sin recargar la página.

#### Scenario: Renglón válido agrega a la venta
- **WHEN** el usuario envía el formulario de renglón con un libro existente y una cantidad entera mayor que cero
- **THEN** el renglón queda agregado a la venta en curso, la página no se recarga y la tabla de renglones muestra el nuevo renglón

#### Scenario: Cantidad inválida rechazada
- **WHEN** el usuario intenta agregar un renglón con cantidad cero, negativa, decimal o vacía
- **THEN** el renglón no se agrega y el sistema informa el motivo en el contenedor de resultado de venta

### Requirement: Libros sin repetir dentro de la venta
El sistema SHALL impedir que el mismo libro aparezca dos veces en la venta en curso: cuando se intenta agregar un libro ya presente, SHALL informar el duplicado y SHALL dejar la venta en curso sin cambios (sin agregar renglón y sin modificar la cantidad del renglón existente).

#### Scenario: Duplicado informado y rechazado
- **WHEN** el usuario intenta agregar un libro que ya figura entre los renglones de la venta en curso
- **THEN** el sistema informa que el libro ya está en la venta, no se agrega ningún renglón y la cantidad del renglón existente no cambia

### Requirement: Cálculo de importes con dos decimales
El sistema SHALL presentar por cada renglón su libro, cantidad, precio unitario y subtotal, y SHALL calcular el subtotal como cantidad por precio unitario y el total de la venta como la suma de los subtotales; todos los importes SHALL presentarse con dos decimales.

#### Scenario: Importes correctos con decimales
- **WHEN** la venta contiene un renglón de cantidad 3 de un libro cuyo precio unitario copiado es 12990.5
- **THEN** el subtotal mostrado es «38971.50» y el total de la venta es la suma de todos los subtotales con dos decimales

### Requirement: Edición y eliminación de renglones pre-confirmación
El sistema SHALL permitir, mientras la venta no esté confirmada, cambiar la cantidad de un renglón existente y quitar un renglón, recalculando de inmediato los subtotales afectados, el total y el estado vacío de la tabla.

#### Scenario: Cambiar cantidad recalcula
- **WHEN** el usuario cambia la cantidad de un renglón existente antes de confirmar
- **THEN** el subtotal de ese renglón y el total se actualizan al instante

#### Scenario: Quitar el único renglón vuelve al estado vacío
- **WHEN** la venta tiene un solo renglón y el usuario lo quita
- **THEN** la tabla queda sin filas, el mensaje de venta sin renglones vuelve a mostrarse y el total vuelve a «0.00»

#### Scenario: Quitar un renglón intermedio conserva los demás
- **WHEN** la venta tiene tres renglones y el usuario quita el segundo
- **THEN** el primero y el tercero permanecen con sus datos intactos y el total se recalcula con los renglones restantes

### Requirement: Bloqueo de confirmación inválida
El sistema SHALL impedir confirmar una venta cuando no hay cliente seleccionado, cuando no hay renglones o cuando alguna cantidad es inválida, informando en cada caso el motivo y sin registrar ninguna venta en el historial.

#### Scenario: Confirmar sin cliente
- **WHEN** el usuario confirma una venta con renglones pero sin cliente seleccionado
- **THEN** la venta no se registra y se informa el motivo

#### Scenario: Confirmar sin renglones
- **WHEN** el usuario confirma una venta sin renglones
- **THEN** la venta no se registra y se informa el motivo

#### Scenario: Confirmar con cantidad inválida
- **WHEN** algún renglón de la venta en curso tiene una cantidad que no es entera mayor que cero
- **THEN** la venta no se registra y se informa el motivo

### Requirement: Confirmación de venta válida con limpieza del formulario
Al confirmar una venta válida, el sistema SHALL registrarla en el historial con su identificador estable, la fecha de confirmación, el cliente (identificador y datos descriptivos), sus renglones (título del libro, cantidad, precio unitario y subtotal copiados como valores) y el total. La confirmación SHALL limpiar el formulario de la venta en curso (selector de cliente, renglones, total y mensajes) para iniciar una nueva venta y SHALL mostrar un mensaje de éxito.

#### Scenario: Confirmación exitosa limpia el formulario
- **WHEN** el usuario confirma una venta válida
- **THEN** la venta queda registrada en el historial, el selector de cliente vuelve a su valor vacío, la tabla de renglones queda vacía, el total vuelve a «0.00» y se muestra el mensaje de éxito

#### Scenario: Dos ventas seguidas acumulan en el historial
- **WHEN** el usuario confirma una venta, compone una segunda venta distinta y la confirma
- **THEN** el historial acumula ambas ventas con identificadores distintos y el formulario queda limpio tras la segunda confirmación

### Requirement: Precio histórico copiado al confirmar
El precio unitario de cada renglón confirmado SHALL conservarse como valor copiado al momento de confirmar, y su consulta posterior SHALL NOT depender del precio actual del catálogo.

#### Scenario: Precio histórico copiado
- **WHEN** una venta confirmada se consulta en el historial después de que el precio del catálogo de uno de sus libros cambie sin recargar la página
- **THEN** el precio unitario, los subtotales y el total de esa venta siguen mostrando los valores copiados al momento de confirmar

### Requirement: Historial inmutable con detalle consultable
El sistema SHALL mostrar por cada venta confirmada su identificador, fecha (formato dd/mm/yyyy, sin hora), cliente y total en la tabla del historial, SHALL permitir consultar los renglones de cada venta en el contenedor de detalle (que se reemplaza por completo en cada consulta), SHALL mostrar el mensaje de historial vacío únicamente cuando no existan ventas confirmadas, y SHALL NOT ofrecer desde la interfaz ninguna acción de edición o eliminación de ventas confirmadas.

#### Scenario: Historial vacío
- **WHEN** no hay ventas confirmadas
- **THEN** el mensaje de historial vacío es visible y la tabla no muestra filas

#### Scenario: Consulta del detalle de una venta
- **WHEN** el usuario consulta el detalle de una venta confirmada
- **THEN** el contenedor de detalle muestra los renglones de esa venta (título, cantidad, precio unitario, subtotal y total) tomados de los valores copiados, y no existe ningún control para editar o eliminar la venta

### Requirement: Integración con altas sin recarga ni duplicación
La vista de ventas SHALL reaccionar al evento de alta de libros/clientes para refrescar los selectores de cliente y de libro sin duplicar la lógica de altas, SHALL reutilizar los arrays de datos existentes y SHALL funcionar abierta como archivo local sin servidor ni peticiones de red, con consola sin errores.

#### Scenario: Refresco de selects tras un alta
- **WHEN** se registra un libro o un cliente nuevo desde las altas
- **THEN** los selectores de la vista de ventas incluyen el nuevo registro sin duplicar la lógica de altas

#### Scenario: Consumo local sin red
- **WHEN** la página se abre como archivo local (file://) y se interactúa con ventas e historial
- **THEN** no se realizan peticiones de red y la consola no registra errores
