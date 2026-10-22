# persistencia-verificacion-documentacion Specification

## Purpose
Conservar libros, clientes y ventas confirmadas entre aperturas mediante localStorage, sin duplicar ejemplos ni reconstruir importes históricos. Define recuperación, protección ante fallos y documentación reproducible con resultados y pendientes explícitos del ejercicio 6.

## Requirements

### Requirement: Colecciones persistidas e inicialización sin duplicados
El sistema SHALL guardar libros, clientes y ventas confirmadas como arrays JSON en las claves libreria-nya.libros.v1, libreria-nya.clientes.v1 y libreria-nya.ventas.v1. SHALL usar ejemplos únicamente si falta la clave, respetar arrays vacíos y recuperar por mutación sin concatenar ejemplos ni cambiar identificadores.

#### Scenario: Primer inicio
- **WHEN** se abre index.html en un contexto sin las tres claves y con escritura disponible
- **THEN** se representan seis libros, tres clientes y cero ventas y se guardan las tres colecciones

#### Scenario: Recuperación repetida y colección vacía
- **WHEN** se recarga con arrays válidos guardados, incluido un array vacío
- **THEN** se recuperan exactamente esos registros sin duplicar ejemplos ni repoblar la colección vacía

### Requirement: Restauración y guardado integrados con las vistas
El sistema SHALL recuperar cada colección antes del primer render que la consume y guardar únicamente las altas válidas y ventas confirmadas mediante los eventos libreria:alta y libreria:venta-confirmada. SHALL conservar los contratos de formularios y selectores y no persistir borradores ni búsquedas.

#### Scenario: Alta y venta recuperadas
- **WHEN** se completa un alta válida o se confirma una venta y se vuelve a abrir el mismo archivo en el mismo contexto
- **THEN** el registro aparece en las vistas y opciones correspondientes sin duplicaciones

#### Scenario: Operación rechazada y borrador
- **WHEN** se rechaza un formulario o se recarga una venta sin confirmar
- **THEN** no se incorpora un registro persistido y el borrador no se recupera

### Requirement: Historial persistido independiente del catálogo
El sistema SHALL serializar y recuperar idVenta, fecha, cliente descriptivo, renglones y total, incluyendo títulos, cantidades, precios unitarios y subtotales históricos. SHALL representar el historial desde esos valores sin reconstruirlos desde el catálogo o clientes actuales.

#### Scenario: Cambio exclusivo de precio del catálogo guardado
- **WHEN** en un contexto de prueba se confirma una venta de dos unidades a 1500 y una a 2000, se modifica solo el precio del primer libro en la clave de libros y se recarga
- **THEN** la venta conserva sus precios 1500 y 2000, subtotales 3000 y 2000 y total 5000 aunque el catálogo muestre otro precio

### Requirement: Recuperación protegida y avisos por colección
El sistema SHALL validar la estructura antes de sustituir arrays. Ante lectura rechazada, JSON inválido o estructura incompatible SHALL conservar el valor almacenado, bloquear escrituras de esa colección durante la sesión y advertir que opera solo en memoria. Ante un fallo exclusivo de escritura SHALL conservar el registro en memoria y permitir reintento sin borrar otras claves ni avisos.

#### Scenario: Contenido ilegible
- **WHEN** una clave contiene JSON inválido o una colección incompatible
- **THEN** se muestra un aviso, se conserva literalmente el valor original y un alta posterior en memoria no lo sobrescribe

#### Scenario: Escritura fallida y recuperación
- **WHEN** falla setItem y una operación válida posterior logra guardar la misma colección
- **THEN** se conserva la operación inicial en memoria y el guardado posterior retira solo el aviso de esa colección

### Requirement: Contrato y límites documentados
El README SHALL identificar integrantes, apertura directa sin npm, navegación, archivos, datos iniciales, funcionalidades, pendientes y procedencia de imágenes si corresponde. SHALL documentar claves, estructuras JSON, ruta al campo precio y dependencia de navegador, perfil y ubicación, ausencia de datos compartidos, borrado y limitaciones de file://.

#### Scenario: Reproducción desde la documentación
- **WHEN** se siguen las instrucciones del README
- **THEN** se puede abrir index.html sin instalación y localizar el precio de catálogo para la prueba sin editar las ventas guardadas

### Requirement: Evidencia verificable de los ocho casos
El README SHALL registrar M-01 a M-08 con pasos, datos, resultado esperado, observado o motivo de pendiente, estado y entorno de ejecución. SHALL distinguir controles automatizados, recorrido manual e instancia guiada docente y nunca presentar un caso no ejecutado como aprobado.

#### Scenario: Prueba manual o guiada sin ejecutar
- **WHEN** solo existe evidencia automatizada o no se realizó la instancia docente de precio histórico
- **THEN** la documentación conserva explícitamente el pendiente manual o docente y no lo sustituye por una aprobación

### Requirement: Entrega local y alcance del ejercicio 6
La aplicación SHALL conservar HTML, CSS y JavaScript nativos con recursos locales y apertura directa sin servidor, librerías ni compilación. El cierre documental del ejercicio 6 SHALL registrar pendientes externos sin cambiar funcionalidades de los ejercicios 1 a 5 ni crear sus cambios faltantes.

#### Scenario: Archivo documental con pendientes explícitos
- **WHEN** se archiva el cambio por solicitud del usuario
- **THEN** se conservan proposal, design, specs y tasks y los controles manuales pendientes permanecen abiertos sin declarar el parcial completamente verificado
