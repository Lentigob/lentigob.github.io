// <md-content> - Web Component nativo para renderizar Markdown.
//
// Uso normal (directo en un archivo .md, fuera de cualquier framework):
//   <md-content>
//     <script type="text/template">
//       ### Titulo
//       Texto **en negrita**.
//     </script>
//   </md-content>
//
// El contenido debe ir dentro de un <script type="text/template"> para que
// el parser de Markdown de Docsify no lo interprete antes de que este
// componente lo procese (a diferencia de <template>, el contenido de un
// <script> no es tocado por Markdown-it).
//
// Uso dentro de una plantilla de <csv-loader> (Vue): igual que en Markdown
// normal, directo como texto del tag, con {{ mustaches }} si hace falta:
//   <md-content>### {{ item.nombre }}
//   **{{ item.rol }}**
//   *{{ item.institucion }}*</md-content>
// (csv-loader.js configura `whitespace: 'preserve'` en su app de Vue para
// que los saltos de línea "duros" de Markdown -dos espacios + salto- no se
// pierdan; por defecto Vue los colapsaría igual que el navegador colapsa
// espacios repetidos en HTML.)
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
//
// También se acepta el atributo "source" (con un template literal) por si
// se prefiere ensamblar el texto en JS en vez de escribirlo como contenido:
//   <md-content :source="`### ${nombre}`"></md-content>
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
      let rawSource;

      if (this.hasAttribute('source')) {
        rawSource = this.getAttribute('source');
      } else {
        const templateEl = this.querySelector('script[type="text/template"]');
        rawSource = templateEl ? templateEl.textContent : this.textContent;
      }
      console.log(rawSource, this);
      const rawMd = unescapeAndDedent(rawSource || '');
      if (!rawMd) return;

      const html = marked.parse(rawMd, { breaks: !this.hasAttribute('no-breaks') });

      // Desenvuelve SVGs que Marked haya envuelto en <p> por error
      this.innerHTML = html.replace(/<p>\s*(<svg[\s\S]*?<\/svg>)\s*<\/p>/g, '$1');
    }
  }

  customElements.define('md-content', MdContent);
})();
