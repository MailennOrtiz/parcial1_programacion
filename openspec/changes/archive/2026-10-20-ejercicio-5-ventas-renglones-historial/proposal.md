# Proposal — Ejercicio 5: Composición de ventas, cálculos e historial inmutable

**Change:** `ejercicio-5-ventas-renglones-historial`
**Estado:** APROBADO con decisiones D-1 (duplicados: informar y rechazar), D-2 (fecha: solo `dd/mm/yyyy` sin hora) y D-3 (detalle: reemplazo simple) — ver §8. No se escribió código.
**Puntos de la consigna:** 20 (Ejercicio 5).

---

## 1. Problema, objetivo y resultado esperado

### Problema
La interfaz actual (Ejercicios 1–4) permite mostrar el catálogo, filtrar por título y dar de alta libros y clientes, pero las vistas **Ventas** e **Historial** son puramente estructurales: los selects están poblados y las tablas existen, pero no hay ninguna lógica de renglones, cálculos, confirmación de ventas ni registro del historial.

### Objetivo
Implementar en JavaScript nativo el flujo completo del Ejercicio 5:
1. Componer una **venta en curso** (cliente + renglones) en memoria, distinta del historial.
2. agregar renglones con libro existente y cantidad entera > 0, sin libros repetidos dentro de la misma venta.
3. Editar cantidades y quitar renglones antes de confirmar, con recálculo inmediato.
4. **Confirmar** la venta validando cliente, renglones y cantidades, copiando el precio unitario como **valor histórico**.
5. Mostrar un **historial inmutable** con detalle consultable, sin acciones de edición/baja.

### Resultado esperado
Al abrir `index.html` por `file://`, la vista Ventas permite componer y confirmar ventas que quedan registradas en la vista Historial con su identificador, fecha, cliente, renglones y total, conservando los precios copiados al momento de la confirmación aunque el catálogo cambie después.

---

## 2. Contexto verificado y referencias

**Fuentes leídas directamente en esta sesión (hechos verificados):**

| Fuente | Verificación |
| --- | --- |
| `index.html` | Vistas Ventas (líneas 102–143) e Historial (145–164) completas y con todos los ganchos declarados por el pedido. Confirmados: `#venta-cliente`, `#form-renglon` con `#renglon-libro` y `#renglon-cantidad` (`min="1"` `step="1"` `value="1"`), `#tabla-renglones` con thead Libro/Cantidad/Precio unitario/Subtotal/Quitar, `#mensaje-renglones-vacio`, `#resumen-venta` con `#venta-total` = `0.00`, `#boton-confirmar-venta`, `#resultado-venta` (`aria-live="polite"`); en Historial: `#mensaje-historial-vacio`, `#tabla-historial` (thead Identificador/Fecha/Cliente/Total/Detalle, tbody vacío), `#detalle-venta`. Scripts cargados con `defer`: `datos.js`, `catalogo.js`, `altas.js`. Sin script de ventas. |
| `js/datos.js` | Arrays globales `editoriales` (2), `generos` (2), `autores` (3), `libros` (6, con campo `precio` numérico, ej. `12990.5`) y `clientes` (3), con integridad referencial por ids (`lib-01..06`, `cli-01..03`). |
| `js/altas.js` | Confirma el evento `libreria:alta` (líneas 283–285, detalle `{tipo, registro}`) y que `actualizarVistasAltas()` ya puebla `#venta-cliente` (cliente → `nombreCompleto`) y `#renglon-libro` (libro → `titulo`) con `cargarOpcionesAlta`. Todos los inserts de texto usan `textContent`/`createElement`. Patrón de validación/errores con `aria-invalid` y `mensaje-error`/`mensaje-exito`. |

**Fuentes referenciadas pero NO leídas en esta sesión:**
- `docs/Consigna Primer Parcial.pdf` (página 4, Ejercicio 5): la consigna textual del Ejercicio 5 fue provista completa en el pedido y se toma como fuente primaria de requisitos; el PDF es su respaldo documental.
- `js/catalogo.js` y `css/styles.css`: no los abrí en esta sesión; el estado declarado en el pedido (clases `tabla`, `tabla-contenedor`, `boton`, `mensaje`, `mensaje-vacio`; función `actualizarCatalogo`) lo tomo como **dado por el usuario** y lo validaré al implementar.

**Estado del repo:** cambios OpenSpec activos: ninguno (verificado con `openspec list`). Change creado con `openspec new change`. Ejercicio 4 implementado y mergeado (datos provistos en el pedido).

---

## 3. Alcance

### Incluido
- Estado en memoria separado: `ventaEnCurso` (cliente + renglones) y `historialVentas` (ventas confirmadas).
- Selección de cliente desde `#venta-cliente`; alta de renglón desde `#form-renglon` con `preventDefault`.
- Regla de no-duplicados dentro de la venta con estrategia **(b) informar y rechazar** (decidida → §5.4).
- Edición pre-confirmación: cambiar cantidad y quitar renglón, con recálculo.
- Render de `#tabla-renglones` reutilizando clase `tabla`; control de `#mensaje-renglones-vacio`.
- Cálculos: subtotal = cantidad × precio; total = suma de subtotales; dos decimales en todo importe.
- Validaciones de confirmación (sin cliente / sin renglones / cantidad inválida) con motivo en `#resultado-venta`.
- Confirmación: registro con id estable, fecha, cliente (id + descriptivos), renglones (título + cantidad + precio + subtotal copiados) y total; precio unitario como **valor histórico**.
- Limpieza del formulario tras confirmar (cliente, renglones, total, mensajes) + mensaje de éxito en `#resultado-venta`.
- Historial en `#tabla-historial` + detalle de renglones en `#detalle-venta`; `#mensaje-historial-vacio` solo si está vacío.
- Inmutabilidad desde la interfaz: sin acciones de editar/eliminar ventas confirmadas.
- Nuevo archivo `js/ventas.js` enlazado desde `index.html` después de los tres scripts existentes (`defer`).
- Integración: reutiliza arrays de `datos.js`, y reacciona al evento `libreria:alta` de `altas.js` para refrescar selects **sin duplicar** su lógica.

### Excluido
- Ejercicios 1 (HTML/vistas), 2 (CSS/estilos), 3 (catálogo/filtro), 4 (altas/validaciones/evento), 6 (localStorage, casos manuales, README).
- Descuentos, impuestos, stock, cobros, facturación, exportación; edición/baja de ventas confirmadas; búsqueda/orden/paginación del historial; ventas precargadas (el historial **arranca vacío**); `fetch`/red; librerías; persistencia de cualquier tipo.

---

## 4. Requisitos y escenarios observables

### Requisitos (R-01..R-12)

| ID | Grupo | Requisito verificable |
| --- | --- | --- |
| R-01 | Datos y estados | Memoria separada: venta en curso (cliente + renglones) e historial confirmado; venta confirmada = {id, fecha, cliente (id + nombreCompleto), renglones (titulo + cantidad + precioUnitario + subtotal), total}; precio unitario copiado al confirmar, nunca releído del catálogo. |
| R-02 | Funcional | Cliente existente seleccionable; renglón agregable con libro existente y cantidad entera > 0; libros repetidos no admitidos según la estrategia aprobada; cantidad 0/negativa/decimal/vacía rechazada. |
| R-03 | Funcional | Cada renglón muestra libro, cantidad, precio unitario y subtotal; subtotal = cantidad × precio; total = suma de subtotales; importes a 2 decimales en tabla y `#venta-total`. |
| R-04 | Funcional | Antes de confirmar: cambiar cantidad y quitar renglón recalculan subtotales, total y estado vacío al instante. |
| R-05 | Funcional | Confirmar se bloquea sin cliente, sin renglones o con cantidad inválida; motivo en `#resultado-venta`; el historial no cambia. |
| R-06 | Funcional | Confirmación válida registra id, fecha, cliente, renglones y total; limpia el formulario (cliente, renglones, total, mensajes) para nueva venta; mensaje de éxito en `#resultado-venta`. |
| R-07 | Funcional | Historial muestra id, fecha, cliente, total y permite ver los renglones en `#detalle-venta`; `#mensaje-historial-vacio` solo si vacío; sin acciones de edición/baja de ventas. |
| R-08 | Estructura | `js/ventas.js` (o archivos justificados) enlazado con `defer` después de datos/catalogo/altas; ganchos intactos; `preventDefault` en `#form-renglon` sin recarga. |
| R-09 | Calidad | Funciones con responsabilidad única y reconocibles; todo dato insertado como texto (`textContent`/`createElement`); sin `innerHTML` con datos. |
| R-10 | Compatibilidad | `file://` sin servidor ni red: cero peticiones; consola limpia en Chrome/Firefox. |
| R-11 | Convenciones | `js/` en minúsculas con guiones; nombres en español; indentación 2 espacios; HTML/CSS sin cambios salvo el `<script>` (y ajustes mínimos solo si se justifican). |
| R-12 | Integración | Reacción al evento `libreria:alta` refrescando `#venta-cliente` y `#renglon-libro`; sin duplicar arrays de `datos.js` ni la lógica de altas. |

### Escenarios observables y casos límite

1. **Sin cliente:** confirmar → bloqueado, motivo visible, historial intacto.
2. **Sin renglones:** confirmar → bloqueado, motivo visible.
3. **Cantidad inválida:** 0, negativa, decimal (ej. `1.5`) o vacía → renglón no agregado, motivo en `#resultado-venta`.
4. **Duplicado:** agregar el mismo libro que ya está en la venta → **estrategia (b):** se informa «el libro ya está en la venta» en `#resultado-venta`, no se agrega y la cantidad del renglón existente no cambia.
5. **Quitar el único renglón:** tabla vuelve a estado vacío (`#mensaje-renglones-vacio` visible), total = 0.00.
6. **Quitar renglón intermedio** (venta de 3 renglones): los restantes se conservan íntactos, recálculo correcto.
7. **Cambiar cantidad y recalcular:** aumentar/reducir la cantidad de un renglón → subtotal y total actualizados al instante.
8. **Total con decimales:** precio `12990.5` × cantidad `3` = `38971.50` en tabla y `#venta-total`.
9. **Dos ventas seguidas:** confirmar venta A → formulario limpio + mensaje de éxito; componer venta B → confirmar → historial acumula ambas con ids distintos.
10. **Precio histórico:** confirmar venta con precio P; luego cambiar el precio del libro en el catálogo (en vivo por DevTools; editar `datos.js` exige recargar, y una recarga **borra el historial** porque no hay persistencia — Ejercicio 6) → la venta del historial y su detalle mantienen P y los subtotales originales.
11. **Detalle sin catálogo:** abrir el detalle de una venta → los renglones provienen de los datos copiados, no del catálogo actual.
12. **Caracteres especiales:** libro/cliente con `&`, `<`, `'` (ej. «Cuentos de nieve & ceniza», ya en datos) se muestran como texto sin romper el DOM ni tirar errores.
13. **Refresco de selects:** registrar un libro/cliente nuevo → evento `libreria:alta` → `#renglon-libro` y `#venta-cliente` incluyen el nuevo registro.
14. **Envío sin recarga:** agregar renglón → la URL no cambia y no se recarga la página.
15. **Inmutabilidad:** tras confirmar, no existen botones/controles de editar o eliminar la venta en Historial.

---

## 5. Estructura, componentes y datos propuestos

### 5.1 Modelo de datos (memoria, dentro de `js/ventas.js`)

```javascript
// Ejemplo estructural — no es una venta real precargada.
let ventaEnCurso = {
  idCliente: null,          // string | null
  renglones: []             // Array<RenglonVenta>
};

// RenglonVenta (venta en curso):
// {
//   idLibro: "lib-01",        // referencia para validaciones
//   titulo: "El farol...",    // copia descriptiva desdecia al agregar
//   cantidad: 2,
//   precioUnitario: 12990.5,  // copiado al agregar (precio vigente del catálogo)
//   subtotal: 25981           // derivado: recalculado en cada render
// }

const historialVentas = [];   // immutable por interfaz: solo push al confirmar

// VentaConfirmada:
// {
//   idVenta: "ven-01",          // estable, prefijo "ven-" + secuencial (mismo patrón que generarIdAlta)
//   fecha: "20/10/2026",        // solo fecha dd/mm/yyyy, generada al confirmar (D-2)
//   cliente: { id: "cli-01", nombre: "Lucía Fernández" },  // copia descriptiva
//   renglones: [ { titulo, cantidad, precioUnitario, subtotal } ],  // todo copiado
//   total: 25981
// }
```

Propiedades clave:
- `fecha` se genera al **confirmar** (`new Date()`), no al agregar renglones.
- El renglón de la venta en curso guarda `idLibro` (para detectar duplicados y editar/quitar por libro); el renglón confirmado **no** lo necesita en la interfaz, solo valores copiados según la consigna («título del libro descriptivo»); si la cátedra requiere conservar el id, queda pendiente de confirmación (S-02, §8).
- El precio histórico se obtiene una sola vez: cuando el renglón se **agrega a la venta en curso** se copia `libro.precio`; al confirmar, ese valor pasa literal a la venta confirmada. Ninguna función de render lee precios del catálogo para el historial.

### 5.2 Funciones previstas (una responsabilidad por función, en `js/ventas.js`)

| Función | Responsabilidad | Requisito |
| --- | --- | --- |
| `obtenerVentaEnCurso()` | Accede al estado (o lo expone por referencia controlada). | R-01 |
| `validarAgregarRenglon(idLibro, cantidad)` | Devuelve `{renglon}` o `{errores}`: libro existente, entero > 0, duplicado → rechazo con mensaje (estrategia b). | R-02 |
| `agregarRenglon(idLibro, cantidad)` | Agrega renglón nuevo a la venta en curso (+ precio copiado si pasa la validación). | R-01, R-02 |
| `calcularSubtotal(renglon)` | `cantidad × precioUnitario`. | R-03 |
| `calcularTotalVenta(renglones)` | Suma de subtotales. | R-03 |
| `formatearImporte(valor)` | `Number → string` con 2 decimales (`toFixed(2)`, coma decimal es-AR si la decisión de formato lo fija). | R-03 |
| `renderTablaRenglones()` | Reconstruye tbody de `#tabla-renglones` + botones «Quitar» (delegación por `dataset`). | R-03 |
| `renderResumenVenta()` | `#venta-total` + visibilidad `#mensaje-renglones-vacio`. | R-03, R-04 |
| `cambiarCantidadRenglon(idLibro, nuevaCantidad)` | Edición pre-confirmación + recálculo. | R-04 |
| `quitarRenglon(idLibro)` | Eliminación pre-confirmación + recálculo. | R-04 |
| `validarConfirmarVenta(ventaEnCurso)` | Devuelve lista de errores: cliente, renglones, cantidades válidas. | R-05 |
| `registrarVentaConfirmada()` | Crea la VentaConfirmada con todo copiado + push al historial. | R-06, R-01 |
| `limpiarVentaEnCurso()` | Reset del estado + `#venta-cliente`.value = "" + renders. | R-06 |
| `mostrarResultadoVenta(mensajes, tipo)` | `#resultado-venta` (exito/error), sin persistencia. | R-05, R-06 |
| `renderHistorial()` | tbody de `#tabla-historial` + botones «Ver detalle» + `#mensaje-historial-vacio`. | R-07 |
| `renderDetalleVenta(idVenta)` | `#detalle-venta`: renglones de esa venta desde los datos copiados. | R-07 |
| `refrescarSelectsVenta()` | Carga/reload de opciones de `#venta-cliente` y `#renglon-libro` **reutilizando** `cargarOpcionesAlta` de `altas.js`. | R-12 |
| `iniciarVentas()` | Registra listeners + primer render. | R-08 |

### 5.3 Integración con lo existente

- **Selects:** `#venta-cliente` y `#renglon-libro` ya se cargan al iniciar (`actualizarVistasAltas()`). `ventas.js` los refresca **solo al recibir `libreria:alta`**, evitando doble carga al inicio.
- **Nombre del cliente/libro:** se resuelve con bucles/`find` sobre `clientes`/`libros` de `datos.js`; **no** se re-lee del DOM ni duplica arrays.
- **Eventos `dataset` para quitar/detalle:** los botones generados llevan `data-id` = `idLibro`/`idVenta`; una única delegación por tabla (listeners en `tbody`) evita recrear listeners en cada render.
- **`index.html`:** única línea nueva `<script src="js/ventas.js" defer></script>` después de `altas.js`. Cero cambios en ids/clases/estructura.

### 5.4 Estrategia de no-duplicados — **DECIDIDA: (b) informar y rechazar**

La consigna admite dos estrategias. El usuario eligió la **(b)**: si el libro ya está en la venta en curso, NO se agrega, NO se modifica cantidad y se **informa el duplicado** en `#resultado-venta` (clase `mensaje-error`), dejando la venta en curso sin cambios.

- Registro de la decisión: el usuario respondió «(b) informar el duplicado y no agregar» el 20/10/2026.
- Nota de contexto: en la propuesta se recomendó (a); la justificación original queda como referencia, pero no rige.

<details>
<summary>Justificación original de la alternativa (a) — solo como referencia histórica</summary>

Es la conducta más natural para el usuario: repetir un libro se entiende como «quiero más unidades de este», y encaja con «se modifica la cantidad del renglón existente», que la consigna admite expresamente. Además, la venta queda compacta (un renglón por libro) y el total es idéntico al de la alternativa. Riesgo: si el usuario quisiera dos líneas separadas del mismo libro, no podría — para este alcance (sin stock ni lotes) es equivalente en resultados.
</details>

---

## 6. Estados y manejo de errores

| Estado | Condición | Presentación |
| --- | --- | --- |
| Venta vacía | `renglones.length === 0` | `#mensaje-renglones-vacio` visible; tabla sin filas; `#venta-total` = `0.00`. |
| Venta con renglones | ≥ 1 renglón | `#mensaje-renglones-vacio` hidden; tabla con filas; subtotal y total visibles a 2 decimales. |
| Error al agregar renglón | cantidad inválida, o duplicado (libro ya en la venta) rechazado | motivo en `#resultado-venta` (clase `mensaje-error`), la venta en curso no cambia. |
| Error al confirmar | sin cliente / sin renglones / cantidad inválida (p.ej. edición manual en DOM) | listado de motivos en `#resultado-venta`; historial sin cambios. |
| Confirmación exitosa | validación pasa | venta en historial; formulario limpio (cliente = "", renglones vacíos, total 0.00); mensaje de éxito en `#resultado-venta`. |
| Historial vacío | `historialVentas.length === 0` | `#mensaje-historial-vacio` visible; tabla sin filas; `#detalle-venta` vacío. |
| Historial con ventas | ≥ 1 venta | `#mensaje-historial-vacio` hidden; filas con id/fecha/cliente/total + botón «Ver detalle». |
| Detalle visible | usuario lo pide | `#detalle-venta` con los renglones copiados; se reemplaza por completo si se consulta otra venta (D-3). |

Errores de runtime esperados: ninguno nuevo. Cantidades inválidas que pasen por render (p.ej. usuario edita el DOM) se rechazan en la validación de confirmación (R-05).

---

## 7. Restricciones técnicas y convenciones

1. **Sin fetch/XHR/WebSockets/red.** Apertura por `file://`, sin servidor ni npm.
2. **Sin librerías ni frameworks;** JS nativo en un archivo externo (`js/ventas.js`), ES moderno sin módulos (los scripts comparten scope global por `defer`).
3. **Sin persistencia** de ningún tipo (localStorage/sessionStorage son Ejercicio 6); la venta en curso e historial viven solo en memoria.
4. **Confirmaciones inmutables desde la UI:** ninguna acción de editar/eliminar ventas del historial.
5. **Sin datos precargados** de ventas ni historial: arrancan vacíos y se pueblan solo al operar la interfaz.
6. **Sin `innerHTML` con datos:** todo texto por `textContent`/`createElement`/`replaceChildren`.
7. **Sin cambios en `css/styles.css`** salvo necesidad mínima justificada (se prevén **cero** cambios: las clases `tabla`, `tabla-contenedor`, `boton`, `mensaje`, `mensaje-vacio` ya existen).
8. **Sin modificar `datos.js` ni `altas.js`** (o mínimo indispensable autorizable); el evento `libreria:alta` se consume, no se altera.
9. Formato numérico a 2 decimales con `toFixed(2)`; el separador decimal es el punto (`.`), consistente con el catálogo y la data existente (`0.00` inicial de `#venta-total`).
10. Patrones heredados del repo: helpers estilo `generarIdAlta` para el id secuencial, patrón `limpiarResultado/mostrarErrores`, uso de `hidden` para mensajes vacíos.

---

## 8. Supuestos y decisiones

### Decisiones cerradas (aprobadas por el usuario el 20/10/2026)
- **D-1 — No-duplicados: (b) informar y rechazar.** Un libro ya presente en la venta en curso se rechaza con mensaje y su renglón existente no se modifica.
- **D-2 — Formato de fecha del historial: solo fecha, sin hora.** `dd/mm/yyyy`, generado de forma determinista (construcción manual con `getFullYear/getMonth/getDate` con `padStart`), no `toLocaleString` (evita variar con la configuración regional del navegador).
- **D-3 — Detalle del historial: reemplazo simple.** El botón «Ver detalle» escribe todo el contenido de `#detalle-venta` con el detalle de la venta consultada; si se consulta otra venta, se reemplaza. Sin botón de mostrar/ocultar.

### Supuestos declarados (no bloquean el SPEC, se validan al implementar)
- S-01: `catalogo.js` no expone helpers que las ventas necesiten; si aparece algo reutilizable se usará; si no, se resuelven los `find` propios en `ventas.js`.
- S-02: el renglón confirmado guarda `titulo` (y opcionalmente el `idLibro` para trazabilidad interna, sin mostrarlo).
- S-03: la verificación de CA-05 (precio histórico) se hará mutando en vivo un precio del catálogo vía DevTools y comprobando que el historial/detalle conservan el valor copiado; la vía «editar `datos.js` y recargar» **no es aplicable en esta entrega** porque la recarga borra el historial (sin persistencia hasta el Ejercicio 6). Queda declarado como limitación de alcance, no como control omitido.
- S-04: la comprobación de `libreria:alta` se hará registrando un libro/cliente en la vista correspondiente y verificando que los selects de Ventas quedan refrescados (el render se actualiza aunque el usuario esté en otra vista; al volver a Ventas los nuevos registros ya figuran).

### Pendientes informativos
- P-01: la comprobación formal del PDF (Consigna página 4) queda como respaldo; la fuente de requisitos es la consigna textual completa provista en el pedido.
- ~~P-02: detalle con toggle o reemplazo — decidido: **reemplazo simple** (D-3).~~

---

## 9. Criterios de aceptación

- **CA-01** — Renglones con cliente y libro válidos y cantidad entera > 0; duplicado (estrategia b) informado y rechazado, verificado repitiendo el mismo libro; cantidad 0/negativa/decimal/vacía rechazada con mensaje (R-02, R-05).
- **CA-02** — Subtotales = cantidad × precio y total = suma, presentados con 2 decimales en `#tabla-renglones` y `#venta-total`; cambiar cantidad o quitar renglón recalcula al instante (R-03, R-04).
- **CA-03** — Confirmación bloqueada sin cliente, sin renglones o con cantidades inválidas, con motivo visible en `#resultado-venta` y sin registro en el historial (R-05).
- **CA-04** — Confirmación válida: venta registrada con id, fecha, cliente, renglones y total; formulario limpio; mensaje de éxito; dos ventas seguidas acumulan en el historial (R-01, R-06).
- **CA-05** — Precio histórico: los renglones y totales del historial/detalle provienen de los valores **copiados** al confirmar; verificar (a) mostrando el detalle tras mutar en consola un precio del catálogo sin recargar, y (b) documentando que la prueba completa con recarga queda para el Ejercicio 6 (sin persistencia, la recarga borra el historial) (R-01, R-07).
- **CA-06** — Historial: id, fecha, cliente, total por venta; `#mensaje-historial-vacio` solo si está vacío; detalle muestra los renglones de la venta; sin acciones de editar/eliminar (R-07).
- **CA-07** — `js/ventas.js` como archivo externo enlazado con `defer` tras los 3 scripts existentes; ganchos intactos; `#form-renglon` sin recarga; `libreria:alta` refresca selects sin duplicar lógica; funciones con responsabilidad única; inserción como texto verificable (R-08, R-09, R-12).
- **CA-08** — `file://` sin red: cero peticiones, consola limpia en Chrome/Firefox (R-10).

---

## 10. Decisiones — RESUMEN

Todas las decisiones abiertas fueron respondidas por el usuario el 20/10/2026 y quedan cerradas en §8 (D-1, D-2, D-3). SPEC aprobado. Continúa Fase 2 (PLAN).
