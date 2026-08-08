// <vue-mount> - Web Component nativo que monta una app de Vue "vacía"
// (sin datos, sin CSV) sobre su propio contenido. Es el mismo mecanismo que
// usa <csv-loader> (protege el contenido de Markdown-it de Docsify con
// <script type="text/template">, compila con Vue y preserva saltos de línea
// para que <md-content> funcione dentro), pero sin la parte de cargar/filtrar
// un CSV. Útil para páginas estáticas que solo necesitan Markdown dinámico
// (p.ej. contacto.md, 404.md) sin ningún dato tabular.
//
// Uso:
//   <vue-mount>
//     <script type="text/template">
//       <div class="card">
//         <md-content>### Título</md-content>
//       </div>
//     </script>
//   </vue-mount>
(function () {
  class VueMount extends HTMLElement {
    connectedCallback() {
      if (this._initialized) return;
      this._initialized = true;

      const templateEl = this.querySelector('script[type="text/template"]');
      const template = templateEl ? templateEl.textContent.trim() : '';
      if (templateEl) templateEl.remove();

      if (!template) {
        console.error('vue-mount: se requiere una <script type="text/template"> hija.');
        return;
      }

      this.innerHTML = '';

      const app = Vue.createApp({ template });
      app.config.compilerOptions.whitespace = 'preserve';
      window.registerAppComponents(app);

      this._app = app;
      app.mount(this);
    }

    disconnectedCallback() {
      if (this._app) {
        this._app.unmount();
        this._app = null;
      }
      this._initialized = false;
    }
  }

  customElements.define('vue-mount', VueMount);
})();
