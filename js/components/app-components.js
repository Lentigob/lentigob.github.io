// Componentes de Vue (NO Web Components nativos):
//
// <card-block> es un solo componente genérico para el "molde" que comparten
// todas las tarjetas del sitio (imagen arriba opcional, y cuerpo con multiples secciones.
// 
// <proyecto-row> y <resultado-row> son componentes de fila de tabla para los
// listados de proyectos y resultados, respectivamente. Son usados por
// <csv-loader> para renderizar cada fila de la tabla a partir de un objeto
// (cada fila del CSV).
// Son componentes específicos de una página (no primitivas de diseño como
// icon-svg), así que viven todos juntos aquí en vez de un archivo por
// componente - evita agregar media docena de <script> más a index.html por
// piezas que solo se usan una vez cada una.
(function () {
  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // Convierte un valor de contacto (URL o correo suelto) en un href usable:
  // si parece un correo le antepone "mailto:", si no lo deja tal cual.
  function toHref(value) {
    if (!value) return value;
    return isEmail(value) ? 'mailto:' + value : value;
  }

  function registerAppComponents(app) {
    app.config.globalProperties.$toHref = toHref;

    app.component('proyecto-row', {
      props: { item: { type: Object, required: true } },
      template: `
        <td>
            <a v-if="item.imagen && item.url" :href="item.url" target="_blank" title="Ver información">
                <img :src="item.imagen" :alt="item.titulo" class="data-table__thumbnail" @error="$event.target.parentElement.style.display='none'">
            </a>
            <img v-else-if="item.imagen" :src="item.imagen" :alt="item.titulo" class="data-table__thumbnail" @error="$event.target.style.display='none'">
            <div v-else class="data-table__thumbnail data-table__thumbnail--placeholder" title="Sin imagen">
                <icon-svg name="bx-briefcase-alt"></icon-svg>
            </div>
        </td>
        <td>
            <a v-if="item.url" :href="item.url" target="_blank" class="data-table__title-link">
                <strong class="data-table__title" :title="item.titulo">{{ item.titulo }}</strong>
            </a>
            <strong v-else class="data-table__title" :title="item.titulo">{{ item.titulo }}</strong>
            <span class="data-table__subtitle" :title="'Investigadores: ' + item.investigadores">{{ 'Investigadores: ' + item.investigadores }}</span>
            <span class="data-table__subtitle" v-if="item.archivos" :title="'Archivos: ' + item.archivos">{{ 'Archivos: ' + item.archivos.split(',').map(a => a.trim()).filter(Boolean).join(' • ') }}</span>
        </td>
        <td>
            <span class="badge badge-default">{{ item.institucion }}</span>
        </td>
        <td>
            <span class="badge" :class="{
                'badge-green': item.situacion.toLowerCase() === 'terminado',
                'badge-yellow': item.situacion.toLowerCase() === 'activo',
                'badge-red': item.situacion.toLowerCase() === 'pausado'
            }">{{ item.situacion }}</span>
        </td>
        <td>{{ item.anio }}</td>
        <td>
            <a v-if="item.url" :href="item.url" target="_blank" class="data-action">
                <icon-svg name="bx-right-arrow-alt"></icon-svg>
                Detalles
            </a>
        </td>
      `
    });

    app.component('resultado-row', {
      props: { item: { type: Object, required: true } },
      template: `
        <td>
            <a v-if="item.url" :href="item.url" target="_blank" class="data-table__title-link">
                <strong class="data-table__title" :title="item.titulo || item.nombre">{{ item.titulo || item.nombre }}</strong>
            </a>
            <strong v-else class="data-table__title" :title="item.titulo || item.nombre">{{ item.titulo || item.nombre }}</strong>
            <span class="data-table__subtitle" :title="item.autores || item.participantes">{{ item.autores || item.participantes }}</span>
            <span class="data-table__subtitle" style="font-style: italic;" v-if="item.revistaeditorial" :title="item.revistaeditorial">{{ item.revistaeditorial }}</span>
        </td>
        <td><span class="badge badge-default">{{ item.tipo }}</span></td>
        <td>{{ item.anio }}</td>
        <td>
            <span class="data-table__actions">
                <a v-if="item.url" :href="item.url" target="_blank" class="data-action">
                    <icon-svg name="bx-link-external"></icon-svg>
                    Ver
                </a>
                <a v-if="item.pdf" :href="item.pdf" download class="data-action">
                    <icon-svg name="bx-download"></icon-svg>
                    PDF
                </a>
                <a v-if="item.doi && item.doi !== 'N/A'" :href="'https://doi.org/' + item.doi" target="_blank" class="data-action">
                    <icon-svg name="bx-link-external"></icon-svg>
                    DOI
                </a>
            </span>
        </td>
      `
    });

    // Molde genérico de tarjeta.
    // Slots nombrados:
    //    #image (opcional) - imagen arriba de la tarjeta
    //    #top (opcional)   - franja gris arriba del contenido (p.ej. badge + fecha).
    //                        card-block ya la envuelve en .muted; el contenido del
    //                        slot solo pone su(s) .row de adentro.
    //    #bottom (opcional) - misma idea que #top pero abajo del contenido
    //                         (p.ej. badge + link "Ver más").
    // Slot default: contenido principal de la tarjeta (md-content, listas, etc.)
    // Las clases modificadoras:
    //    .interactive - agrega hover y box-shadow, para tarjetas que son links
    // Clases de utilidad para el contenido de la tarjeta:
    //    .row (align-right, space-between) - para alinear elementos en fila dentro de la tarjeta

    // <contact-icons> - fila de iconos de contacto (linkedin, correo, etc.),
    // reutilizable en cualquier tarjeta que necesite mostrarlos. No sabe nada
    // de "equipo" ni de tarjetas: solo recibe una lista de campos a leer del
    // item y arma los links, evitando duplicados cuando dos campos apuntan al
    // mismo valor (p.ej. una columna "url" genérica que repite el correo).
    //
    // Uso:
    //   <contact-icons :item="item" :fields="[
    //       { key: 'url', title: 'Contacto' },
    //       { key: 'contacto', icon: 'bx-envelope', title: 'Correo' },
    //       { key: 'linkedin', icon: 'bx-linkedin', title: 'LinkedIn' },
    //       { key: 'pagina', icon: 'bx-link-alt', title: 'Página' }
    //   ]"></contact-icons>
    // Si un campo no trae "icon", se detecta automáticamente email vs. link.
    app.component('contact-icons', {
      props: {
        item: { type: Object, required: true },
        fields: { type: Array, required: true }
      },
      computed: {
        links() {
          const seen = new Set();
          const links = [];
          this.fields.forEach(({ key, icon, title }) => {
            const raw = this.item[key];
            if (!raw) return;
            const norm = String(raw).trim();
            if (!norm || seen.has(norm)) return;
            seen.add(norm);
            const email = isEmail(norm);
            links.push({
              href: toHref(norm),
              icon: icon || (email ? 'bx-envelope' : 'bx-link-alt'),
              title: title || key
            });
          });
          return links;
        }
      },
      template: `
        <div class="row align-right">
            <a v-for="link in links" :key="link.href" :href="link.href" target="_blank" :title="link.title">
                <icon-svg :name="link.icon" class="small gray"></icon-svg>
            </a>
        </div>
      `
    });

    app.component('card-block', {
      props: { interactive: { type: Boolean, default: false } },
      template: `
        <div :class="['card', { 'interactive': interactive }]">
            <slot name="image"></slot>
            <div class="card__body">
                <div v-if="$slots.top" class="muted">
                    <slot name="top"></slot>
                </div>
                <slot></slot>
                <div v-if="$slots.bottom" class="muted">
                    <slot name="bottom"></slot>
                </div>
            </div>
        </div>
      `
    });
  }

  window.registerAppComponents = registerAppComponents;
})();
