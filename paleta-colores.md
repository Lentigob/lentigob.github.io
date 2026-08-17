# Paleta de colores — Lentigob

Documento de referencia para el cliente y para el equipo de desarrollo.
No forma parte del sitio publicado (no está enlazado en la barra lateral).

## Colores de marca (tema)

| Uso                          | Color       | Hex       |
|-------------------------------|-------------|-----------|
| Color de tema (acento)        | 🟦          | `#3c5aa6` |
| Color de tema, tono oscuro    | 🟦          | `#253c73` |

## Superficies oscuras (sidebar, barra superior en escritorio, bloques de código)

| Uso                          | Color       | Hex       |
|-------------------------------|-------------|-----------|
| Fondo oscuro principal        | ⬛          | `#1a1d2e` |
| Texto sobre fondo oscuro      | ⬜          | `#ffffff` |
| Texto secundario sobre oscuro | 🔲          | `#c5cae9` |

## Superficies claras (contenido, tarjetas)

| Uso                          | Color       | Hex       |
|-------------------------------|-------------|-----------|
| Fondo principal (blanco)      | ⬜          | `#ffffff` |
| Fondo suave                   | ⬜          | `#f8fafc` |
| Fondo tenue                   | ⬜          | `#f1f5f9` |
| Bordes                        | ▫️          | `#e2e8f0` |

## Texto

| Uso                          | Color       | Hex       |
|-------------------------------|-------------|-----------|
| Texto principal                | ⬛          | `#1a1d2e` |
| Texto secundario               | 🔳          | `#475569` |
| Texto atenuado                 | ◻️          | `#64748b` |
| Texto sutil                    | ◻️          | `#94a3b8` |

## Colores de acento / etiquetas (badges)

| Uso                          | Color       | Hex       |
|-------------------------------|-------------|-----------|
| Azul                           | 🟦          | `#4f7cff` |
| Índigo                         | 🟪          | `#4f46e5` |
| Ámbar                          | 🟧          | `#fbbf24` |
| Rojo                           | 🟥          | `#ef4444` |
| Verde                          | 🟩          | `#166534` sobre `#dcfce7` |
| Amarillo                       | 🟨          | `#854d0e` sobre `#fef9c3` |

## Logo (marca de agua / isotipo)

| Versión                       | Colores                  | Dónde se usa |
|-------------------------------|---------------------------|--------------|
| Clara (`assets/logo-mark.svg`)     | `#f4f6f8` / `#c7d3e3` | Sidebar y favicon (fondo oscuro) |
| Oscura (`assets/logo-mark-dark.svg`) | `#1a1d2e` / `#475569` | Barra de navegación superior (fondo blanco) |

---

## Cómo cambiar el color del sitio (nota técnica)

El color de tema del sitio se define en **un solo lugar**: el bloque
`<style>` dentro de `<head>` en [index.html](index.html) (líneas ~19-28).
Todo lo demás (`css/variables.css` y el resto de las hojas de estilo) toma
su valor de ahí, así que basta con editar estas 4 variables para que el
color se propague a todo el sitio (enlaces, sidebar activo, sombras, etc.):

```css
--app-theme-color: #3c5aa6;       /* color de tema principal */
--app-theme-color-dark: #253c73;  /* variante oscura, hover/activo */
--app-theme-color-rgb: 60, 90, 166;      /* mismo color en formato r,g,b */
--app-theme-color-dark-rgb: 37, 60, 115; /* mismo color oscuro en r,g,b */
```

También hay que actualizar el meta `theme-color` (color de la barra del
navegador en móvil), justo arriba de ese bloque:

```html
<meta name="theme-color" content="#3c5aa6" />
```

Los fondos oscuros (sidebar, barra superior en escritorio, bloques de
código) y los colores de texto NO dependen del color de tema — están fijos
en `css/variables.css` (`--color-surface-dark`, `--color-text-primary`,
etc.) porque son parte del sistema de superficie oscura, no del acento de
marca. Si el cliente quiere cambiar esos, hay que editarlos ahí por
separado.
