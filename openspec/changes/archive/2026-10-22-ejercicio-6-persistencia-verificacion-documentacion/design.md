# Diseño — Ejercicio 6: persistencia, verificación y documentación

## Context

La aplicación abre index.html directamente, sin servidor ni dependencias. Los arrays de datos son const y el catálogo renderiza al evaluar su script. El historial se declara en ventas.js. Este documento describe el diseño ya implementado y completa los artefactos de la propuesta; no introduce cambios de producto.

## Goals / Non-Goals

Conservar libros, clientes y ventas entre aperturas; recuperar antes de representar; mantener precios históricos; documentar errores, límites y pruebas reales. Quedan fuera los borradores, filtros, modificaciones de los ejercicios 1–5, sincronización entre pestañas, backend y herramientas de compilación.

## Decisions

### D-01 — Tres claves independientes con arrays JSON

Se usan `libreria-nya.libros.v1`, `libreria-nya.clientes.v1` y `libreria-nya.ventas.v1`. Cada valor es un array completo, sin envoltorio. Las relaciones fijas de editoriales, géneros y autores siguen en datos.js. La escritura afecta solo la colección correspondiente y nunca usa localStorage.clear(). No hay migraciones automáticas.

### D-02 — Ausencia, vacío e información incompatible son estados distintos

Si falta la clave, se conservan los ejemplos y se intenta guardarlos; ventas comienza con []. Un array válido, incluido [], reemplaza por mutación el contenido del array const y no se reescribe por cargarlo. La validación estructural exige ids únicos y campos representables; libros comprueba relaciones existentes. Un registro incompatible rechaza toda la colección, sin descartar filas silenciosamente.

### D-03 — Recuperación antes del primer render

Orden con defer: datos → persistencia → catálogo → altas → ventas. persistencia.js restaura libros y clientes al evaluarse. iniciarVentas() restaura historialVentas antes de renderizar. El listener de guardado de ventas consulta el historial únicamente al recibir el evento posterior, evitando acceder a una declaración aún no inicializada.

### D-04 — Guardado por eventos de operaciones válidas

El listener de libreria:alta consume detail.tipo para guardar libros o clientes después del alta. registrarVentaConfirmada() emite libreria:venta-confirmada después del push al historial; su listener guarda la colección completa. Las operaciones rechazadas no emiten guardado y no se depende de cerrar la pestaña. Restaurar no invoca funciones de alta ni genera identificadores nuevos.

### D-05 — El historial es una copia descriptiva independiente

La venta conserva idVenta, fecha dd/mm/yyyy, cliente { id, nombre }, renglones { titulo, cantidad, precioUnitario, subtotal } y total. Recuperación y detalle usan esos valores, sin reconstruirlos desde el catálogo ni recalcularlos. La comprobación modifica exclusivamente precio en el catálogo guardado de un contexto de prueba y compara las ventas tras recargar.

### D-06 — Protección por colección y avisos separados

Ante lectura rechazada, JSON inválido o estructura incompatible se conserva el valor original y se bloquean escrituras de esa colección durante la sesión. Los ejemplos o historial vacío permiten operar solo en memoria, con aviso explícito. Si únicamente falla la escritura, se conserva memoria y valor previo y se reintenta en la siguiente operación válida. Un éxito retira solo su aviso. #estado-persistencia usa texto y aria-live, independiente de los mensajes de alta o venta.

### D-07 — Registro honesto de pruebas y archivo documental

README contiene apertura, integrantes, navegación, claves, límites, protocolo M-01 a M-08 y resultados observados. Evidencia automatizada, recorrido manual e instancia docente se distinguen. Los pendientes de tasks.md no se marcan completados al archivar. El archivo solicitado el 22/10/2026 conserva estos pendientes y publica el contrato de la capacidad; no certifica aprobación completa del parcial.

## Risks / Trade-offs

- localStorage depende de navegador, perfil y ubicación; file:// no garantiza un comportamiento uniforme entre navegadores.
- No hay sincronización ni transacciones entre claves; se recomienda una pestaña de operación.
- Un fallo de guardado deja cambios solo en memoria. Los avisos no prometen durabilidad.
- Se valida estructura para representar datos; no se garantiza integridad ni seguridad de servidor.
- M-06 sigue pendiente de instancia guiada docente y el recorrido manual completo permanece pendiente según README.

## Migration Plan

Primer inicio inicializa únicamente claves ausentes. No se borra almacenamiento ni se migran contratos previos. Para volver a una versión sin persistencia se debe conservar una copia de los datos antes de retirar su integración; no se incluye reparación automática.

## Open Questions

No quedan decisiones de diseño bloqueantes. La verificación manual y docente es trabajo pendiente, no una decisión de arquitectura.
