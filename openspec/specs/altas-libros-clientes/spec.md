# altas-libros-clientes Specification

## Purpose

Registrar libros y clientes en los arrays compartidos de Libreria Nya, validando las
entradas y actualizando la interfaz sin recargar la página. Corresponde al Ejercicio 4
de la consigna (página 3, 15 puntos: libros/selectores 6; clientes 4;
validación/actualización 5, según la rúbrica de página 6).

Esta especificación se incorporó el 22/10/2026 para documentar la implementación ya
integrada el 20/10/2026. No acredita una fase SPEC previa ni comandos OpenSpec ejecutados.

## Requirements

### Requirement: Opciones generadas desde los datos locales

El sistema SHALL generar las opciones de editorial, género y autores desde los arrays
editoriales, generos y autores. Editorial y género SHALL utilizar selectores simples;
autores SHALL permitir selección múltiple. El género SHALL incluir «Sin clasificar»,
representado internamente por null.

#### Scenario: Carga de los formularios

- **WHEN** termina la carga del documento
- **THEN** los selectores contienen las entidades locales y el género ofrece
  «Sin clasificar», sin crear datos paralelos al Ejercicio 3.

#### Scenario: Libro sin género

- **WHEN** se registra un libro válido con «Sin clasificar»
- **THEN** idGenero es null y las tarjetas muestran «Sin clasificar».

### Requirement: Validación completa de libros

El sistema SHALL exigir título e ISBN no vacíos tras normalizarlos, precio numérico
finito mayor que cero, editorial existente y al menos un autor existente. Todos los
autores seleccionados SHALL existir. Un género asignado SHALL existir en generos.
El ISBN SHALL compararse contra el conjunto local quitando espacios y guiones de
ambos valores; no se exige longitud, patrón editorial ni dígito de control.

#### Scenario: Libro válido con varios autores

- **WHEN** título, ISBN, precio, editorial y autores son válidos
- **THEN** se agrega exactamente un libro con sus relaciones por ID, incluyendo todos
  los autores seleccionados sin repetir una relación.

#### Scenario: ISBN equivalente a otro registro

- **GIVEN** un libro con ISBN 978-987-1001-01-1
- **WHEN** se intenta registrar 9789871001011 o 978 987 1001 01 1
- **THEN** se rechaza el alta y la colección no cambia.

#### Scenario: Campos obligatorios vacíos

- **WHEN** el título contiene solo espacios o el ISBN contiene solo espacios y guiones
- **THEN** se informa el campo inválido sin agregar el registro.

#### Scenario: Precio inválido

- **WHEN** el precio está vacío, no es numérico, no es finito, es cero o es negativo
- **THEN** se rechaza el alta completa.

#### Scenario: Precio positivo menor que un centavo

- **WHEN** se ingresa 0.001 con el resto de los datos válidos
- **THEN** el precio cumple la condición mayor que cero; el formulario no agrega
  una restricción de centavos que la consigna no exige.

#### Scenario: Relación inexistente

- **WHEN** la editorial no existe, algún autor no existe, no se selecciona ningún
  autor o un género asignado no existe
- **THEN** se informa el motivo y no se incorpora un libro parcial.

### Requirement: Validación de clientes con nombre completo y email único

El sistema SHALL registrar nombreCompleto en un único campo y email. Ambos SHALL
ser obligatorios. El email SHALL cumplir el formato básico usuario@dominio.extensión,
sin espacios interiores, y SHALL compararse mediante trim y minúsculas para impedir
duplicados. No se requiere un apellido separado ni comprobar la existencia del buzón.

#### Scenario: Cliente válido

- **WHEN** nombre completo y email son válidos y el email no existe
- **THEN** se agrega un cliente con idCliente único, nombreCompleto recortado y
  email normalizado.

#### Scenario: Email equivalente

- **GIVEN** un cliente con email lucia.fernandez@ejemplo.com
- **WHEN** se ingresa « LUCIA.FERNANDEZ@EJEMPLO.COM »
- **THEN** se rechaza el duplicado y la colección no cambia.

#### Scenario: Nombre o email inválido

- **WHEN** el nombre o email quedan vacíos, o el email carece de formato válido
- **THEN** se muestran los motivos sin agregar ningún cliente.

### Requirement: Envío controlado y mutación atómica

Los manejadores SHALL cancelar submit mediante preventDefault. Las validaciones SHALL
completarse antes de modificar los arrays. Los errores SHALL aparecer junto al
formulario en los contenedores de resultado existentes, mediante texto y no solo color.

#### Scenario: Varios campos incorrectos

- **WHEN** un envío contiene varios errores
- **THEN** se informa cada motivo, se conserva lo escrito, los campos reciben
  aria-invalid y el primero recibe foco, sin mutar las colecciones.

#### Scenario: Corrección del formulario

- **WHEN** se corrigen los valores y se vuelve a enviar
- **THEN** se retiran las marcas anteriores, se valida nuevamente y solo se guarda
  si todos los controles pasan.

### Requirement: Listados y opciones actualizados sin recarga

Después de un alta correcta, el sistema SHALL limpiar solo ese formulario,
mostrar un mensaje de éxito, reconstruir listados y opciones relacionadas y
actualizar el catálogo con el filtro activo del Ejercicio 3. Se SHALL conservar
el borrador del otro formulario y las selecciones relacionadas que sigan siendo válidas.

#### Scenario: Libro nuevo disponible

- **WHEN** se registra un libro
- **THEN** aparece en Libros y en el selector de libro para ventas; el catálogo
  lo muestra si coincide con la búsqueda activa, sin recargar.

#### Scenario: Cliente nuevo disponible

- **WHEN** se registra un cliente
- **THEN** aparece en Clientes y en el selector de cliente para ventas.

#### Scenario: Conservación de un borrador ajeno

- **GIVEN** un libro en borrador y un cliente/libro seleccionados en Ventas
- **WHEN** se registra otro cliente
- **THEN** se conservan el borrador, sus autores y las selecciones de venta válidas.

### Requirement: Integración y textos seguros

El sistema SHALL reutilizar los arrays e identificadores del Ejercicio 3, así como
crearTarjetaLibro y actualizarCatalogo de catalogo.js. SHALL insertar entradas como
texto con createElement/textContent y emitir libreria:alta tras un registro correcto.
Los scripts de producto SHALL ser locales y nativos, aptos para apertura por file://.

#### Scenario: Texto con marcado

- **WHEN** un título o nombre contiene caracteres como <, >, comillas o &
- **THEN** se representa literalmente y no se crea HTML ejecutable con esa entrada.

#### Scenario: Notificación para otros ejercicios

- **WHEN** termina un alta correcta
- **THEN** document emite libreria:alta con detail.tipo y detail.registro; un envío
  rechazado no emite ese evento.
