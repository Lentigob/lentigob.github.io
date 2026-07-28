// <md-content> - Web Component nativo para renderizar Markdown.
//
// SIEMPRE se usa anidado dentro de una plantilla de <csv-loader> o
// <vue-mount> (nunca solo, directo en un archivo .md): esos componentes ya
// protegen su contenido de Markdown-it (vía <script type="text/template">) y
// lo compilan con Vue, así que <md-content> solo necesita leer su propio
// texto ya resuelto:
//   <md-content>### {{ item.nombre }}
//   **{{ item.rol }}**
//   *{{ item.institucion }}*</md-content>
// (csv-loader.js/vue-mount.js configuran `whitespace: 'preserve'` en su app
// de Vue para que los saltos de línea "duros" de Markdown -dos espacios +
// salto- no se pierdan; por defecto Vue los colapsaría igual que el
// navegador colapsa espacios repetidos en HTML.)
//
// ¡OJO! Incluso con "preserve", si una línea es SOLO un mustache (sin texto
// ni asteriscos/almohadillas alrededor) y la línea siguiente TAMBIÉN es solo
// un mustache, Vue colapsa el salto de línea entre ambos a un simple espacio
// (es un caso especial del compilador de Vue, no un bug de este componente).
// Por eso campos independientes (p.ej. un título y una descripción) deben ir
// en DOS <md-content> separados, no uno solo con ambos en líneas distintas:
//   <md-content>#### {{ item.nombre }}</md-content>
//   <md-content>{{ item.descripcion }}</md-content>
// Esto NO afecta a líneas que ya traen sintaxis de Markdown pegada al
// mustache (### título, **negrita**, *cursiva*), como en el ejemplo de arriba
// con nombre/rol/institución: ahí sí puede ir todo junto en un solo tag.
(function () {
  function unescapeAndDedent(text) {
    return text
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/^[ \t]+/gm, '') // Quita la sangría de cada línea
      .trim();
  }

  class MdContent extends HTMLElement {
    connectedCallback() {
      if (this._rendered) return;
      this._rendered = true;
      this.render();
    }

    render() {
      const rawMd = unescapeAndDedent(this.textContent || '');
      if (!rawMd) return;

      const html = marked.parse(rawMd, { breaks: !this.hasAttribute('no-breaks') });

      // Desenvuelve SVGs que Marked haya envuelto en <p> por error
      this.innerHTML = html.replace(/<p>\s*(<svg[\s\S]*?<\/svg>)\s*<\/p>/g, '$1');
    }
  }

  customElements.define('md-content', MdContent);
})();
