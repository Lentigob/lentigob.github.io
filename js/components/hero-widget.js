// <hero-widget> - Web Component nativo que monta el hero de portada
// (foto de fondo, overlay con título/texto y botón "Explorar Proyectos").
//
// Agrega un modo de exploración: un botón de lupa en la esquina superior
// derecha de la foto que, al hacer click, oculta el overlay y el botón de
// abajo y deja ver la foto a tamaño ampliado (zoom), siguiendo la posición
// del cursor dentro de la foto. Un botón de cerrar aparece en el mismo lugar
// que el de lupa para volver al estado normal.
//
// Mismo mecanismo que <vue-mount> (protege la plantilla con
// <script type="text/template">, compila con Vue) pero con estado propio
// (zoomActive, originX/Y) en vez de una plantilla estática.
//
// Uso:
//   <hero-widget>
//     <script type="text/template">
//       <div class="hero-section">...</div>
//     </script>
//   </hero-widget>
(function () {
  class HeroWidget extends HTMLElement {
    connectedCallback() {
      if (this._initialized) return;
      this._initialized = true;

      const templateEl = this.querySelector('script[type="text/template"]');
      const template = templateEl ? templateEl.textContent.trim() : '';
      if (templateEl) templateEl.remove();

      if (!template) {
        console.error('hero-widget: se requiere una <script type="text/template"> hija.');
        return;
      }

      this.innerHTML = '';

      const app = Vue.createApp({
        template,
        data() {
          return {
            zoomActive: false,
            originX: 50,
            originY: 50
          };
        },
        methods: {
          activateZoom() {
            this.zoomActive = true;
          },
          deactivateZoom() {
            this.zoomActive = false;
            this.originX = 50;
            this.originY = 50;
          },
          trackCursor(event) {
            const rect = event.currentTarget.getBoundingClientRect();
            this.originX = ((event.clientX - rect.left) / rect.width) * 100;
            this.originY = ((event.clientY - rect.top) / rect.height) * 100;
          }
        }
      });

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

  customElements.define('hero-widget', HeroWidget);
})();
