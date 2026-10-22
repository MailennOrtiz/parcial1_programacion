# Libreria Nya

Frontend de una librería · Parcial 1 · Programación III · Tecnicatura Universitaria en Programación.

**Integrantes:** Mailen Ortiz, Leonel Fachinelli, Maximiliano Mendez, Roman Avila, Gabriel D'Anna y Gonza Sanchez.

Aplicación de práctica con datos ficticios, construida con HTML, CSS y JavaScript nativos. Permite consultar libros, registrar libros/clientes y confirmar ventas simuladas con historial. No requiere backend, API, inicio de sesión ni conexión a Internet. No gestiona stock, cobros ni facturación fiscal.

## Abrir el proyecto

1. Descomprimir o copiar la carpeta conservando su estructura.
2. Abrir `index.html` con doble clic o desde la opción «Abrir archivo» del navegador.
3. Mantener JavaScript habilitado. La dirección comienza con `file://`.
4. Para recuperar registros anteriores, volver a abrir desde la misma ubicación, con el mismo navegador y perfil.

**No se necesita npm, instalación de dependencias, compilación ni servidor.** Si aparece un aviso de almacenamiento, leerlo antes de recargar: los últimos cambios podrían existir solo en la sesión.

## Navegación y uso

Los enlaces del encabezado llevan a cinco secciones de una misma página:

| Vista | Operación |
| --- | --- |
| Catálogo | Buscar por parte del título; ignora mayúsculas y espacios exteriores. Vaciar el buscador muestra todo. Cada tarjeta incluye ISBN, editorial, género/autores y precio; género ausente se muestra como «Sin clasificar». |
| Libros | Registrar título, ISBN, precio, editorial, género opcional y uno o más autores. El ISBN se compara sin espacios ni guiones. Para selección múltiple de autores se pueden usar Ctrl/Cmd o los controles de teclado del navegador. |
| Clientes | Registrar nombre completo y email. Se valida formato y duplicados sin distinguir mayúsculas ni espacios exteriores. |
| Ventas | Seleccionar cliente, libro y cantidad entera positiva; agregar renglones, cambiar cantidades o quitarlos antes de confirmar. Un libro repetido se rechaza con un mensaje. |
| Historial | Consultar fecha, cliente, total y «Ver detalle». Las ventas confirmadas no se editan ni eliminan desde la interfaz. |

Los formularios muestran mensajes de resultado sin recargar. Una venta válida copia los descriptivos y los precios a su historial y limpia cliente/renglones/total para una venta nueva. Los importes se presentan con dos decimales.

## Archivos y ejemplos iniciales

```text
index.html
css/
  styles.css
js/
  datos.js
  persistencia.js
  catalogo.js
  altas.js
  ventas.js
README.md
```

- `js/datos.js`: ejemplos ficticios, con identificadores estables: 6 libros, 3 clientes, 2 editoriales, 2 géneros y 3 autores. No hay ventas precargadas.
- `js/persistencia.js`: carga, validación estructural, guardado y avisos de almacenamiento.
- `js/catalogo.js`: relaciones descriptivas, tarjetas y filtro.
- `js/altas.js`: validación de libros/clientes, listados y opciones de formularios.
- `js/ventas.js`: venta en curso, cálculos, confirmación e historial.

El orden de scripts es **datos → persistencia → catálogo → altas → ventas**, con `defer`. Libros/clientes se recuperan antes de renderizar catálogo y opciones; el historial se recupera al comenzar la inicialización de ventas.

## Persistencia con localStorage

### Ubicación y estructura

En DevTools del navegador, abrir **Application/Aplicación o Storage/Almacenamiento → Local Storage/Almacenamiento local**, según navegador, y seleccionar la ubicación de apertura del proyecto.

Cada clave contiene un **array JSON completo**, sin objeto envolvente:

| Clave | Colección y campos |
| --- | --- |
| `libreria-nya.libros.v1` | `[{ idLibro, titulo, isbn, idEditorial, idGenero, idsAutores, precio }]` |
| `libreria-nya.clientes.v1` | `[{ idCliente, nombreCompleto, email }]` |
| `libreria-nya.ventas.v1` | `[{ idVenta, fecha, cliente: { id, nombre }, renglones: [{ titulo, cantidad, precioUnitario, subtotal }], total }]` |

Los importes son números, no cadenas con símbolo monetario. El género ausente es `null`. La fecha de venta se conserva como texto `dd/mm/yyyy`. El detalle histórico utiliza sus propios descriptivos/precios, sin reconstruirlos desde el catálogo o cliente actuales.

**Campo que se modifica para la prueba guiada de precios:** dentro de `libreria-nya.libros.v1`, localizar el objeto por `idLibro` y cambiar únicamente su propiedad numérica `precio`. No modificar los renglones de `libreria-nya.ventas.v1`.

### Primer inicio y guardados

- Si falta una clave, se conservan y guardan los ejemplos de esa colección; para ventas se guarda `[]`.
- Si una clave existe con un array válido, se recupera reemplazando el contenido en memoria, sin concatenar ejemplos ni reescribirla por el solo hecho de cargarla.
- Un array guardado `[]` es válido: no vuelve a cargar ejemplos.
- Un alta correcta emite `libreria:alta` y guarda solo libros o clientes, según corresponda.
- Una venta confirmada emite `libreria:venta-confirmada` después de incorporarse al historial, y guarda el historial completo.
- Operaciones rechazadas no agregan registros guardados. No se espera al cierre de pestaña para escribir.
- El borrador de venta y la búsqueda no persisten. Editoriales, géneros y autores son datos locales fijos de `datos.js`.

### Fallos y límites

- El almacenamiento depende del **navegador, perfil y ubicación de apertura**. No comparte información entre usuarios, perfiles, navegadores ni equipos.
- Cambiar la ruta o abrir mediante otro protocolo puede dar acceso a otro almacenamiento. El comportamiento de localStorage bajo `file://` depende del navegador; no se garantiza que todos separen las rutas del mismo modo.
- Borrar datos del navegador elimina registros. El modo privado puede descartarlos al cerrar; permisos, restricciones o cuota pueden impedir guardar.
- Los datos son de práctica: localStorage no brinda seguridad ni integridad de un servidor y puede modificarse desde DevTools.
- No hay sincronización entre pestañas ni transacciones entre claves. Usar una pestaña de operación para evitar sobrescrituras entre sesiones simultáneas.
- Antes de restaurar se valida la estructura y los campos necesarios para representar datos. Un valor ilegible o incompatible no se corrige ni descarta parcialmente.
- Si falla la lectura o hay JSON/estructura inválidos, se conserva el valor almacenado, se usan ejemplos o historial vacío solo en memoria y **se bloquea la escritura de esa colección durante la sesión**. Las demás colecciones siguen independientes.
- Si falla únicamente la escritura, el registro permanece en memoria y se conserva el valor previo almacenado; se vuelve a intentar en la siguiente operación correcta de esa colección. Si se logra guardar, desaparece únicamente su aviso pendiente.
- El aviso de persistencia, al principio del contenido principal, permanece aunque se muestre un mensaje de alta o confirmación correcta: esos mensajes indican que la operación se registró en sesión, no que un guardado fallido se haya completado.
- No hay botón de borrado o reparación. Revisar los valores problemáticos en DevTools **en una copia de prueba** y recargar después de corregirlos; no borrar el almacenamiento personal para hacer las pruebas.

## Verificación: entorno y distinción de resultados

Se realizaron **controles automatizados en navegador real**, mediante Chrome headless y su protocolo de depuración, sobre `file:///D:/parcial1programacion/index.html`. Se usó un script temporal fuera de la entrega y un perfil nuevo independiente del perfil habitual del usuario; no se instalaron dependencias del proyecto ni se modificó su almacenamiento personal.

- Navegador: **Chrome 155.0.8059.85**, Windows.
- Fecha local observada en ventas: **20/10/2026**. Fin de ejecución registrado: **2026-10-21T02:17:53.576Z (UTC)**.
- Perfil temporal usado: `C:\Users\Maxi\AppData\Local\Temp\opencode\e6-chrome-1792549067986`.
- Apertura con archivos locales, recargas y reapertura en otra pestaña del mismo perfil temporal; sin servidor.
- Los envíos e interacciones de formulario se ejecutaron mediante DOM; se midieron anchos y un cambio de foco por Tab. **Esto no es un recorrido manual completo, inspección visual humana ni una prueba guiada por el docente.**

### Casos manuales exigidos y resultados observados

Los resultados de la última columna son evidencia **automatizada complementaria**. Los casos que no tuvieron ejecución manual no se presentan como aprobados manualmente. Al hacer el recorrido manual, agregar fecha, navegador/versión, datos usados, observado y estado; conservar cualquier fallo real.

| Caso | Pasos y datos para repetir manualmente | Resultado esperado | Estado manual / observado automatizado |
| --- | --- | --- | --- |
| M-01 · Búsqueda | Buscar `  FAROL  `, vaciar el campo y buscar `zzzinexistente987`. | Coincidencias parciales sin distinguir mayúsculas; catálogo completo al vaciar; mensaje sin coincidencias. | **Pendiente manual.** Automatizado: 1 coincidencia, luego 6 tarjetas y después mensaje sin resultados visible. |
| M-02 · Libros | Con ejemplos iniciales, intentar ISBN `9789871001011`; luego registrar «Prueba persistencia A», ISBN ficticio nuevo `PRUEBA-E6-1500`, precio 1500, editorial Farolito (`edi-01`), autor Camila (`aut-01`), género sin clasificar. | Duplicado rechazado; alta válida en catálogo y selección de venta. | **Pendiente manual.** Automatizado: duplicado rechazado sin alterar clave; alta dejó 7 libros/7 tarjetas y 8 opciones contando la opción inicial del selector. |
| M-03 · Clientes | Nombre «Cliente prueba E6»; intentar `correo-invalido`, luego `LUCIA.FERNANDEZ@EJEMPLO.COM` y después `prueba.e6@ejemplo.com`. | Primeros dos rechazados; nuevo cliente en listado y selección. | **Pendiente manual.** Automatizado: rechazos correctos y clave intacta hasta alta válida; 4 clientes y 5 opciones contando la inicial. |
| M-04 · Venta inválida | Agregar un renglón y confirmar sin cliente. Seleccionar cliente; probar cantidades 0, -1 y 1.5 al agregar y editar. Repetir el mismo libro. | No confirmar ventas inválidas; duplicado no agrega renglón. | **Pendiente manual.** Automatizado: sin cliente y los seis intentos de cantidad rechazados, sin ventas; duplicado informado sin agregar renglón. El fallo de quitar un renglón inválido fue corregido y vuelto a comprobar; ver la verificación de correcciones. |
| M-05 · Venta válida | Agregar «Prueba persistencia B», ISBN nuevo `PRUEBA-E6-2000`, precio 2000 y relaciones válidas; seleccionar Lucía (`cli-01`); vender 2 unidades de A y 1 de B. | Subtotales 3000.00/2000.00, total 5000.00; detalle conservado y formulario limpio. | **Pendiente manual.** Automatizado: `ven-01`, total 5000, subtotales 3000/2000, detalle con dos decimales y borrador vacío tras confirmar. |
| M-06 · Precio histórico | Seguir el protocolo guiado de la sección siguiente en copia de prueba. | Al recargar, precio histórico, subtotales y total no cambian. | **Pendiente de instancia guiada docente.** Control automatizado: catálogo cambiado a 9000, venta mantuvo 1500/2000 y total 5000; cadena JSON de ventas idéntica antes/después. |
| M-07 · Recarga | Anotar ids y conteos después de las altas y venta; recargar dos veces y reabrir el mismo archivo con mismo navegador/perfil. | Datos recuperados sin duplicar ejemplos, altas ni ventas. | **Pendiente manual.** Automatizado: 8 libros, 4 clientes, 1 venta, estado completo idéntico después de recargas y reapertura; selector de libros con 9 opciones incluida la inicial. |
| M-08 · Teclado y adaptación | A 320 px y 1280 px recorrer todas las vistas y detalle con Tab/Shift+Tab, Enter y Espacio según control; comprobar foco y scroll propio de tablas. | Foco visible y uso por teclado; sin scroll horizontal de página. | **Medición anterior fallida; corregida y verificada automáticamente a 320/1280 px. Recorrido manual completo pendiente.** A 320 px la página midió 439 px de ancho de contenido; wrappers de tablas de 205 px desplazaban sus tablas de 560 px. A 1280 px no se observó desborde global (contenido 1265 px). Tab desde búsqueda enfocó «Buscar» con contorno sólido de 3 px. |

Los ISBN de prueba no tienen que ser ISBN editoriales reales: la consigna no exige dígito de control. Si los identificadores/email de prueba ya existen en el contexto elegido, usar variantes nuevas y anotar exactamente cuáles. El sistema normaliza espacios y guiones de ISBN al dar el alta, por lo que el ISBN A guardado resulta `PRUEBAE61500`.

### Otros controles técnicos ejecutados

| Control | Observado |
| --- | --- |
| Primer inicio en perfil nuevo | 6 libros, 3 clientes, 0 ventas; tres claves con arrays JSON; 6 tarjetas. |
| Arrays vacíos guardados | `[]` en las tres claves se recuperó como 0/0/0 y se mostraron los mensajes vacíos, sin repoblar ejemplos. |
| Validación estructural | Rechazó objeto en lugar de array, `null`, ids duplicados y editorial inexistente; no alteró arrays de entrada. Aceptó venta descriptiva independiente del catálogo/clientes y no recalculó importes. |
| JSON/estructura ilegibles | `{invalido`, `{}` y `[null]` conservaron su valor literal almacenado después de un alta en memoria; colección bloqueada y aviso de sesión visible. |
| Escritura fallida y reintento | Simulación temporal de excepción en `Storage.prototype.setItem`: altas quedaron en memoria sin cambiar valores guardados; dos avisos simultáneos. Siguiente alta con escritura restaurada guardó 8 libros y retiró solo el aviso de libros. |
| Lectura rechazada | Simulación temporal de excepción `SecurityError` en `Storage.prototype.getItem`: escritura de libros bloqueada y valor anterior intacto tras un alta. |
| Fallo inicial de escritura | Clave ausente siguió ausente; resultado de error y aviso de posible pérdida, sin excepción no controlada. |
| Venta con escritura fallida | Una venta en memoria, cero guardadas y aviso visible. |
| Ids y borrador | Altas nuevas tras recuperación no colisionaron; dos ventas con ids distintos; borrador desapareció al recargar sin agregar una venta. |
| Sintaxis y consola | `node --check` de scripts modificados pasó; no hubo excepciones de página durante el recorrido automatizado. |

Los fallos de almacenamiento fueron **simulados** en el perfil temporal y los métodos originales se restauraron al terminar cada control. No demuestran que se haya agotado la cuota real del navegador ni que un permiso concreto haya sido denegado por su configuración.

## Prueba guiada de precio histórico — M-06

1. Preparar una copia del proyecto con datos ficticios y un perfil/contexto de prueba aislado. Confirmar en DevTools que no se están usando datos personales: copiar la carpeta no garantiza por sí solo aislamiento en todos los navegadores bajo `file://`.
2. Dar de alta los libros A/B con precios **1500 y 2000** y relaciones válidas. Seleccionar cliente y confirmar 2 unidades de A y 1 de B.
3. Anotar id de venta, precios 1500/2000, subtotales 3000/2000 y total 5000 desde el detalle.
4. Con guía docente, abrir DevTools → Application/Storage → Local Storage → ubicación del proyecto → **`libreria-nya.libros.v1`**.
5. Localizar A por su `idLibro` y cambiar **solo** su campo `precio` de `1500` a `9000`, manteniendo número JSON. Conservar todos los demás objetos/campos.
6. **No editar ni borrar `libreria-nya.ventas.v1`**. No cambiar precios en `datos.js`, cliente, renglones históricos, subtotales ni total guardados.
7. Recargar. Verificar que el catálogo muestra 9000 para A; consultar la venta anterior mediante «Ver detalle».
8. Comprobar que esa venta sigue con precio 1500 para A, subtotal 3000 y total 5000. Registrar resultado observado, fecha, navegador e instancia guiada, incluso si falla.

El control automatizado ya realizado no sustituye esta instancia docente pendiente.

## Verificación actual — 22/10/2026

Esta sección actualiza la evidencia histórica anterior. Se abrió la versión de `D:\parcial1programacion\index.html` mediante `file://` en Chrome **155.0.8059.85**, Windows, con Playwright y un contexto nuevo aislado del almacenamiento habitual. Inicio de ejecución: **22/10/2026 11:28:16, hora argentina** (14:28:16 UTC). Browser plugin no disponible; se usó el navegador automatizado ya instalado, sin dependencias nuevas en el proyecto.

Las operaciones de formulario se enviaron mediante eventos DOM; el filtro usó eventos input y el foco se comprobó con una pulsación Tab. Parte de las validaciones de cantidades se ejercitó invocando las funciones de la aplicación. Se inspeccionaron capturas de historial y detalle a ambos anchos. **Son controles automatizados con inspección visual de capturas; no se presentan como recorrido manual completo ni como prueba docente.**

| Caso | Datos y resultado observado en esta ejecución | Estado y límite |
| --- | --- | --- |
| M-01 | `  FAROL  `: 1 tarjeta; búsqueda vacía: 6; texto inexistente: 0 y aviso visible. | Control automatizado correcto; recorrido manual pendiente. |
| M-02 | ISBN `9789871001011`: rechazo y almacenamiento sin cambios. Altas «Prueba revision A/B», ISBN `REV-A/REV-B`, editorial edi-01, autor aut-01 y precios 1500/2000: colección pasó de 6 a 8 libros. | Control automatizado correcto; recorrido manual pendiente. |
| M-03 | `invalido` y ` LUCIA.FERNANDEZ@EJEMPLO.COM `: rechazados sin cambiar almacenamiento. «Cliente revision», `revision@ejemplo.com`: colección pasó de 3 a 4 clientes. | Control automatizado correcto; recorrido manual pendiente. |
| M-04 | Sin cliente ni renglones: rechazo, 0 ventas. Cantidades 0, -1 y 1.5: rechazadas por agregarRenglon. Quitar una fila con cantidad 0 permitió confirmar la restante; corregir uno de dos campos inválidos mantuvo el otro error. | Subcasos automatizados correctos. Libro repetido y todos los subcasos mediante teclado/formulario no se reejecutaron en esta fecha; evidencia previa permanece como antecedente. |
| M-05 | Cliente nuevo, 2 unidades de A y 1 de B: ven-01, subtotales 3000/2000, total 5000; borrador vacío. Detalle observado con 1500.00/2000.00 y total 5000.00. | Control automatizado correcto; recorrido manual pendiente. |
| M-06 | Se cambió solo precio de A a 9000 dentro de la clave de libros del contexto aislado. Tras recargar: catálogo 9000, venta histórica 1500, total 5000. | Control técnico correcto; instancia guiada docente pendiente. No se declara realizada esa instancia ni una edición manual mediante DevTools. |
| M-07 | Tras altas y venta, una recarga recuperó 8 libros, 4 clientes y 1 venta sin duplicados. | Control automatizado de una recarga correcto. Recarga repetida y reapertura en otra pestaña no se reejecutaron en esta fecha; recorrido manual pendiente. |
| M-08 | Documento de 320 px a viewport 320 y de 1280 px a viewport 1280. Con detalle abierto a 320, página de 320 y tabla de 560 dentro de su contenedor. Tab desde búsqueda enfocó Buscar, contorno sólido de 3 px. Campos de cantidades con label asociado. Capturas del historial inspeccionadas. | Mediciones y control parcial de teclado correctos; recorrido completo de todas las vistas con Tab/Shift+Tab/Enter/Espacio pendiente. |

La página mostró el título «Libreria Nya — Catálogo y gestión», contenido real y ninguna pantalla de error. No se detectaron excepciones de JavaScript durante el recorrido. Estos resultados actualizan la verificación sin modificar HTML, CSS ni JavaScript. Las pruebas de fallos de almacenamiento y arrays vacíos descritas antes no se reejecutaron en esta fecha.

## Funcionalidades y pendientes reales

**Implementado:** catálogo/filtro, altas y selectores, venta simulada/historial y persistencia por colección, recuperación sin duplicados, protección de valores ilegibles y avisos de errores de almacenamiento.

**Pendientes para cerrar la entrega:**

- Ejecutar y registrar los casos manuales; M-06 con guía docente y copia de prueba. No declarar el parcial completamente verificado mientras falten.
## Verificación de correcciones

Se corrigieron los defectos de presentación y ventas y se completaron los integrantes. Se realizaron nuevos controles automatizados en Chrome headless con un contexto aislado, abriendo el `index.html` de esta copia por `file://`. Las mediciones anteriores se conservan como antecedente, no como estado actual.

| Control | Resultado observado tras corregir |
| --- | --- |
| Adaptación | A 320 px la página midió 320 px, incluso con el detalle de venta abierto; a 1280 px midió 1280 px. La tabla del detalle se desplaza dentro de su contenedor. |
| Quitar cantidad inválida | Dos renglones; cantidad 0 en el primero; quitar ese renglón; confirmar el restante: se confirmó correctamente una segunda venta. |
| Más de un campo inválido | Se comprueba cada libro por separado: corregir uno no borra el error pendiente del otro. Los campos inválidos conservan su indicación tras renderizar. |
| Etiquetas de cantidades | Cada campo generado tiene un label asociado con el título del libro. |
| Guardado y precio histórico | Después de altas y venta: 8 libros, 4 clientes y 1 venta al recargar; precio actual cambiado a 9000, histórico conservado en 1500, total 5000. |
| Consola | Sin excepciones de página durante el recorrido automatizado. |

Estos controles automatizados no sustituyen el recorrido manual completo ni la instancia guiada docente M-06. Los casos manuales siguen pendientes hasta su ejecución real.

## Recursos e imágenes

La interfaz actual usa tipografías del sistema y no contiene imágenes, fuentes descargadas, librerías ni recursos de terceros. La consigna y las capturas de trabajo se conservan en el repositorio original; esta copia incluye los archivos necesarios para abrir y entregar la aplicación.

## Entrega

Entregar una carpeta o archivo comprimido con `index.html`, `css/`, `js/` y este `README.md`; pueden acompañarse los documentos de trabajo y consigna. No incluir perfiles del navegador, scripts temporales de verificación, `node_modules`, dependencias instaladas ni herramientas de compilación. No es necesario entregar `.git/` ni configuración de agentes para abrir la aplicación. Las altas y ventas de cada perfil de prueba no se transfieren al copiar la carpeta: los ejemplos se generan al abrir en un contexto nuevo.
