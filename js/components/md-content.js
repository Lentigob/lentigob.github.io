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
// Esto NO afecta a líneas que ya traen sintaxis de Markdown pegada al
// mustache (### título, **negrita**, *cursiva*), como el ejemplo de arriba
// con nombre/rol/institución: ahí el salto sí sobrevive tal cual.
//
// Para forzar un salto entre dos mustaches "pelones" sin depender de eso,
// se puede escribir un <br> literal entre ellos:
//   <md-content>#### {{ item.nombre }}<br>{{ item.descripcion }}</md-content>
// render() no usa this.textContent (que aplanaría el <br> a nada, pegando
// las dos palabras) sino que recorre los nodos hijos a mano y convierte cada
// <br> en un '\n' antes de pasarle el texto a Marked.
(function () {
  // Recorre los child nodes en vez de usar textContent para poder traducir
  // <br> (que Vue conserva como elemento real incluso cuando colapsa el
  // whitespace circundante) a un salto de línea explícito.
  function nodeToText(node) {
    let out = '';
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        out += child.textContent;
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        out += child.tagName === 'BR' ? '\n' : nodeToText(child);
      }
    });
    return out;
  }

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
      const rawMd = unescapeAndDedent(nodeToText(this));
      if (!rawMd) return;

      const html = marked.parse(rawMd, { breaks: !this.hasAttribute('no-breaks') });

      // window.marked es reemplazado por docsify con su propio compilador,
      // que envuelve cada encabezado en un <a class="anchor"> (permalink de
      // su TOC). Aquí no aplica: rompería el <a> exterior de las cartas
      // (nesting inválido) y arrastraría los estilos de link de docsify.
      const unwrappedHeadings = html.replace(
        /<h([1-6])[^>]*>\s*<a[^>]*class="anchor"[^>]*>\s*<span>([\s\S]*?)<\/span>\s*<\/a>\s*<\/h\1>/g,
        '<h$1>$2</h$1>'
      );

      // Desenvuelve SVGs que Marked haya envuelto en <p> por error
      this.innerHTML = unwrappedHeadings.replace(/<p>\s*(<svg[\s\S]*?<\/svg>)\s*<\/p>/g, '$1');
    }
  }

  customElements.define('md-content', MdContent);
})();
