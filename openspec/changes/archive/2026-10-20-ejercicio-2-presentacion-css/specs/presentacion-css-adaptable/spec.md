# Spec Delta

## Purpose

Define la capa de presentación CSS externa, coherente y adaptable de las 5 vistas del frontend «Libreria Nya», verificable vía `file://` a 320 px y 1280 px sin romper la estructura ni los ganchos DOM del Ejercicio 1.

## ADDED Requirements

### Requirement: Identidad visual coherente en las 5 vistas

El sistema SHALL aplicar la misma identidad visual (paleta, tipografía, espaciado, botones, tarjetas, formularios, tablas y mensajes) en las 5 vistas, con cada tipo de componente equivalente luciendo igual.

#### Scenario: Recorrido por las 5 vistas

- **WHEN** el usuario recorre Catálogo → Libros → Clientes → Ventas → Historial vía `file://`
- **THEN** cada tipo de elemento equivalente (botón, campo, tarjeta, tabla, mensaje) luce igual en todas las vistas

### Requirement: CSS externo con clases reutilizables

El sistema SHALL proveer su presentación exclusivamente desde hoja(s) externa(s) bajo `css/` enlazada(s) con `<link rel="stylesheet">`, con cero `<style>` estructural y cero CDN/`@import` remoto, usando clases reutilizables (una definición por componente).

#### Scenario: Inspección de enlace y fuentes

- **WHEN** se inspecciona `index.html` y DevTools → Sources
- **THEN** existe el `<link>` a CSS local, no hay `<style>` estructural y solo aparece CSS local

### Requirement: Layout declarado con Flexbox y Grid

El sistema SHALL declarar el layout por zona: Flexbox en `header`/`nav` y formularios, Grid en `listado-catalogo`, bloque centrado con ancho máximo en `main`/`section`/`footer`, y wrapper con `overflow-x: auto` alrededor de `tabla-renglones` y `tabla-historial`; los `id`, `thead`/`th` y semántica quedan intactos.

#### Scenario: Layout identificable por zona

- **WHEN** se inspecciona el CSS y el DOM
- **THEN** cada zona usa la técnica declarada y los ids de tablas y secciones son los del Ejercicio 1

### Requirement: Adaptación a 320 px y 1280 px

El sistema SHALL ser legible a 320 px y 1280 px con la página sin scroll horizontal (`html`/`body` sin scroll-x en ambos anchos); las tablas anchas SHALL desplazarse solo dentro de su contenedor wrapper.

#### Scenario: Tabla ancha a 320 px

- **WHEN** se abre la vista Ventas o Historial a 320 px vía `file://`
- **THEN** la página no tiene scroll-x y la tabla se desplaza solo dentro de su wrapper

### Requirement: Foco visible y operación completa por teclado

El sistema SHALL reforzar `:focus-visible` con indicador de alto contraste en enlaces, campos, botones y selects (nunca `outline: none` sin reemplazo) y permitir operar todo con Tab / Shift+Tab / Enter / Espacio sin trampas de foco.

#### Scenario: Recorrido por teclado

- **WHEN** el usuario tabula desde el primer enlace del `nav` hasta el `footer`
- **THEN** el foco siempre es visible y ningún control queda inalcanzable

### Requirement: Errores y estados con texto explícito vía aria-live

El sistema SHALL mostrar errores y estados con texto explícito además del color, reutilizando los contenedores `aria-live="polite"` existentes (`resultado-alta-libro`, `resultado-alta-cliente`, `resultado-venta`, `mensaje-sin-resultados`).

#### Scenario: Mensaje de error legible sin color

- **WHEN** se lee un mensaje de error o estado
- **THEN** su significado se comprende por el texto solo, sin interpretar el color

### Requirement: Tratamiento explícito de imágenes

El sistema SHALL declarar explícitamente su tratamiento de imágenes: las informativas con `alt` descriptivo, las decorativas con `alt=""` o fondo CSS, o la decisión documentada de no usar imágenes (válida y sin `alt` exigible).

#### Scenario: Declaración de imágenes

- **WHEN** se revisa el SPEC/diseño y el DOM
- **THEN** existe una decisión explícita (usar con `alt` o no usar) y el DOM la cumple

### Requirement: Funcionamiento file:// sin peticiones externas

El sistema SHALL funcionar abierto como archivo local (`file://`) en Chrome/Firefox actuales sin peticiones externas: en Network solo aparecen `index.html` y el CSS local.

#### Scenario: Apertura sin red

- **WHEN** se abre `index.html` por doble clic a 320 px y 1280 px
- **THEN** las 5 vistas funcionan y Network no muestra filas distintas del HTML y CSS local

### Requirement: Convenciones CSS del proyecto

La hoja SHALL residir en `css/` en minúsculas con guiones (por defecto `css/styles.css`), organizada en secciones comentadas base → layout → componentes → vistas → responsive → foco/accesibilidad, con indentación de 2 espacios, minúsculas, clases con guiones y sin `!important` salvo justificación documentada.

#### Scenario: Inspección del CSS

- **WHEN** se abre el archivo CSS
- **THEN** las secciones comentadas aparecen en ese orden y se cumplen las convenciones

### Requirement: Ganchos DOM de Ejercicios 3–5 preservados

El sistema SHALL preservar todos los `id`, `name`, semántica, jerarquía de encabezados y ganchos DOM de los Ej. 3–5; el CSS SHALL NOT ocultar ni deshabilitar contenido funcional (`display: none` permanente prohibido).

#### Scenario: Contraste de ganchos

- **WHEN** se contrasta el spec `estructura-pantallas-html` con el DOM tras el change
- **THEN** cada gancho existe con el `id` exacto y ningún contenido funcional quedó oculto o deshabilitado por CSS
