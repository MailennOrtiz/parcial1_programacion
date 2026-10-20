# Design — Ejercicio 5: ventas, cálculos e historial inmutable

## Context

Ver `proposal.md` (motivación, requisitos R-01..R-12, escenarios y decisiones aprobadas D-1..D-3) y `specs/ventas-e-historial/spec.md` (contrato de comportamiento). Estado actual: HTML completo con todos los ganchos de Ventas/Historial; `datos.js` (arrays globales), `catalogo.js` (catálogo + filtro), `altas.js` (altas + evento `libreria:alta` + carga de selects). No existe JS de ventas. Sin test runner ni npm en el proyecto: la verificación es manual por `file://`.

## Goals / Non-Goals

**Goals:**
- Un único archivo nuevo `js/ventas.js` con el flujo completo de ventas e historial; el único cambio en `index.html` es su etiqueta `<script defer>` después de `altas.js`.
- Estado en memoria separado (`ventaEnCurso` vs `historialVentas`), con precio copiado al agregar el renglón y pasado literal al confirmar.
- Inserción 100 % segura de datos: `createElement`/`textContent`/`replaceChildren`, sin `innerHTML` con datos.
- Delegación de eventos (listeners en `tbody`, botones con `data-id`) para no re-registrar listeners en cada render.

**Non-Goals:**
- Persistencia (Ejercicio 6), edición/baja de ventas confirmadas, búsqueda u orden en el historial, stock, impuestos/descuentos, modificaciones a `datos.js`/`altas.js`/`catalogo.js`/CSS.

## Decisions

1. **Un archivo `js/ventas.js` en lugar de varios.** El alcance (R-01..R-07) es un único dominio con estado compartido; separar en módulos exigiría pasar el estado por `window` o romper el patrón global de los scripts existentes. Alternativa descartada: `js/ventas.js` + `js/historial.js` — duplicaría el acceso al estado o exigiría un tercer módulo compartido, sin beneficio en tamaño (~250 líneas estimadas).

2. **Patrón render-total, no render-diferencial.** Cada cambio de estado llama a `renderTablaRenglones()`, `renderResumenVenta()` (recalculando subtotales en render) o `renderHistorial()`; el estado es la fuente única de verdad y el DOM siempre se reconstruye desde él con `replaceChildren`. Alternativa descartada: mutar solo la fila afectada — abre la puerta a inconsistencias (total vs filas) y complica la evidencia de inserción como texto.

3. **Cantidades editables pre-confirmación con `input number` dentro de la fila**, con `min="1"` `step="1"`, validadas con la misma función que valida el renglón nuevo (entero > 0); el recálculo ocurre en el evento `change` (y confirmación re-valida como red de seguridad, cubre la manipulación manual del DOM del escenario R-05). Alternativa descartada: solo quitar/volver a agregar — obligaría a re-ingresar el libro para corregir una cantidad.

4. **Precio copiado doble: al agregar (venta en curso) y literal al confirmar (historial).** El renglón de la venta en curso copia `libro.precio` al agregarse (el select nunca es fuente de verdad); la venta confirmada copia esos valores tal cual. Así el precio histórico sobrevive incluso a cambios en vivo del catálogo (CA-05). Fecha generada **solo al confirmar** (D-2: solo `dd/mm/yyyy`, construida manualmente con `getFullYear`/`getMonth`/`getDate` + `padStart` para determinismo local, no `toLocaleString`).

5. **Duplicados: rechazo con mensaje (D-1).** `agregarRenglon` valida antes de mutar: cantidad entera > 0, libro existente en `libros`, y ausencia del `idLibro` en `ventaEnCurso.renglones`; en duplicado devuelve error «El libro ya está en la venta» mostrado en `#resultado-venta` sin tocar el estado.

6. **Id de venta secuencial con mismo patrón de `generarIdAlta`** (`ven-01`, `ven-02`…), encapsulado en una función local de `ventas.js` con bucle anti-colisión (aunque el historial no se borra en esta entrega, el bucle es barato y blindado).

7. **Cliente/resumen copiados al confirmar:** la venta confirmada guarda `{ id, nombre }` del cliente y `titulo`/`cantidad`/`precioUnitario`/`subtotal` de cada renglón; ni el render del historial ni el del detalle leen `libros`/`clientes` (requisito R-01 literal de la consigna). NO se copia el `idLibro` al renglón confirmado (la interfaz no lo usa); si la cátedra lo pidiera, es un cambio de una línea + ajuste del delta spec.

8. **Refresco de selects solo por `libreria:alta`**, reutilizando la función `cargarOpcionesAlta` existente de `altas.js` (global por scope de scripts). El listener de `ventas.js` NO re-renderiza menús al iniciar porque `actualizarVistasAltas()` ya lo hace en `DOMContentLoaded` — evita el doble render y garantiza R-12 sin tocar `altas.js`.

## Risks / Trade-offs

- [Riesgo CA-05 con recarga] Sin persistencia, la recarga borra el historial → la prueba del precio histórico es en vivo por DevTools (mutar `libros[idx].precio` y volver a abrir el detalle). Mitigación: declarado en proposal (S-03) y en el resumen entregable; la vía completa es Ejercicio 6.
- [Riesgo estado global] `ventaEnCurso` e `historialVentas` son variables de módulo (scope del script), análogo a los arrays de `datos.js`. Sin riesgo real en este uso (única página, sin mods de datos fuera de altas o ventas).
- [Trade-off render-total] Reconstruir el tbody en cada cambio re-crea nodos (~filas de venta) → costo insignificante con este volumen; a cambio, determinismo del DOM y evidencia clara de inserción como texto.
- [Riesgo numérico flotante] `precio 12990.5 × 3` etc. puede acumular decimales binarios → mitigación: cálculo sobre valores redondeados a 2 decimales **solo al formatear** (`toFixed(2)`), nunca al acumular, para no arrastrar errores; los datos de prueba del parcial no llegan a magnitudes con problemas representativos.

## Migration Plan

No aplica (entrega nueva, sin rollback backend): si la implementación debía rehidratarse, basta retirar la etiqueta `<script>` nueva para volver al estado del Ejercicio 4.

## Open Questions

Ninguna: D-1..D-3 resueltas; S-01..S-04 se validan durante la implementación sin cambiar el contrato.
