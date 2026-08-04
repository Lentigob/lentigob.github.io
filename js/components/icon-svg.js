// <icon-svg> - Web Component nativo que reemplaza el patrón repetido
//   <svg class="icon-svg ..."><use xlink:href="assets/icons/sprite.svg#NOMBRE"></use></svg>
// por:
//   <icon-svg name="bx-calendar"></icon-svg>
//
// Cualquier clase puesta en el propio <icon-svg> (small, medium, large, gray,
// bx-spin, error-icon, etc.) se reenvía tal cual al <svg> interno, así que
// todas las reglas existentes en css/components.css/custom.css (.icon-svg,
// .icon-svg.small, .icon-svg.gray...) siguen funcionando sin cambios:
//   <icon-svg name="bx-loader-alt" class="bx-spin"></icon-svg>
(function () {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const XLINK_NS = 'http://www.w3.org/1999/xlink';

  class IconSvg extends HTMLElement {
    connectedCallback() {
      if (this._rendered) return;
      this._rendered = true;

      const name = this.getAttribute('name');
      if (!name) {
        console.error('icon-svg: falta el atributo "name"');
        return;
      }

      const svg = document.createElementNS(SVG_NS, 'svg');
      svg.setAttribute('class', ('icon-svg ' + this.className).trim());

      const use = document.createElementNS(SVG_NS, 'use');
      use.setAttributeNS(XLINK_NS, 'xlink:href', 'assets/icons/sprite.svg#' + name);

      svg.appendChild(use);
      this.className = '';
      this.appendChild(svg);
    }
  }

  customElements.define('icon-svg', IconSvg);
})();
