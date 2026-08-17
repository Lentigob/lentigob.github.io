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

  // Los archivos descargables ("Archivo") viven todos en assets/sources/ y
  // el CSV solo guarda el nombre de archivo (si un registro necesita más de
  // uno, se pide empaquetarlos en un .zip en vez de agregar más botones).
  const FILES_BASE_PATH = 'assets/sources/';

  function fileHref(value) {
    const name = String(value).trim();
    return name ? FILES_BASE_PATH + name : null;
  }

  // DOI -> URL resolvible (acepta tanto el DOI suelto como una URL ya
  // completa por si el CSV la trae así). "N/A" o vacío se descarta.
  function doiHref(value) {
    if (!value) return null;
    const norm = String(value).trim();
    if (!norm || norm.toLowerCase() === 'n/a') return null;
    return /^https?:\/\//i.test(norm) ? norm : 'https://doi.org/' + norm;
  }

  // Convierte el link de un ítem (p.ej. una fila de Destacados) en un "deep
  // link" que, al llegar a la página destino, precarga su buscador
  // (searchQuery de csv-loader, ver getHashQueryParam en csv-loader.js) con
  // el título del ítem - así la tarjeta no solo lleva a la sección, sino que
  // deja ese ítem específico ya filtrado en la lista.
  // Solo aplica a rutas internas (empiezan con "#/"); un link externo se
  // deja tal cual.
  function deepLink(item) {
    const url = item && item.url;
    if (!url || !url.startsWith('#/')) return url;
    const titulo = item.titulo || item.nombre || '';
    if (!titulo) return url;
    const sep = url.includes('?') ? '&' : '?';
    return url + sep + 'q=' + encodeURIComponent(titulo);
  }

  function registerAppComponents(app) {
    app.config.globalProperties.$toHref = toHref;
    app.config.globalProperties.$fileHref = fileHref;
    app.config.globalProperties.$doiHref = doiHref;
    app.config.globalProperties.$deepLink = deepLink;

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
            <span class="data-table__subtitle" v-if="item.archivo" :title="'Archivos: ' + item.archivo">{{ 'Archivos: ' + item.archivo.split(',').map(a => a.trim()).filter(Boolean).join(' • ') }}</span>
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
            <span class="data-table__actions">
                <a v-if="item.url" :href="item.url" target="_blank" class="data-action">
                    <icon-svg name="bx-right-arrow-alt"></icon-svg>
                    Detalles
                </a>
                <a v-if="$fileHref(item.archivo)" :href="$fileHref(item.archivo)" download class="data-action">
                    <icon-svg name="bx-download"></icon-svg>
                    Archivo
                </a>
            </span>
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
                <a v-if="$fileHref(item.archivo)" :href="$fileHref(item.archivo)" download class="data-action">
                    <icon-svg name="bx-download"></icon-svg>
                    Archivo
                </a>
                <a v-if="$doiHref(item.doi)" :href="$doiHref(item.doi)" target="_blank" class="data-action">
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

    // <action-icons> - fila de botones de acción/contacto (linkedin, correo,
    // ver URL, DOI, descargar archivo, etc.), reutilizable en el slot #bottom
    // de cualquier tarjeta. No sabe nada de "equipo" ni de tarjetas: solo
    // recibe una lista de campos a leer del item y arma los links, evitando
    // duplicados cuando dos campos apuntan al mismo valor (p.ej. una columna
    // "url" genérica que repite el correo).
    //
    // Uso:
    //   <action-icons :item="item" :fields="[
    //       { key: 'url', title: 'Contacto' },
    //       { key: 'contacto', icon: 'bx-envelope', title: 'Correo' },
    //       { key: 'linkedin', icon: 'bx-linkedin', title: 'LinkedIn' },
    //       { key: 'pagina', icon: 'bx-link-alt', title: 'Página' },
    //       { key: 'doi', title: 'DOI', type: 'doi' },
    //       { key: 'archivo', title: 'Descargar', type: 'file' }
    //   ]"></action-icons>
    // Si un campo no trae "icon", se detecta automáticamente email vs. link.
    // "type" cambia cómo se arma el href:
    //   'link' (por defecto) - el valor tal cual, o "mailto:" si es un correo.
    //   'doi'  - antepone "https://doi.org/" si el valor no es ya una URL.
    //   'file' - resuelve el nombre de archivo dentro de assets/sources/ y
    //            agrega el atributo "download".
    app.component('action-icons', {
      props: {
        item: { type: Object, required: true },
        fields: { type: Array, required: true }
      },
      computed: {
        links() {
          const seen = new Set();
          const links = [];
          this.fields.forEach(({ key, icon, title, type }) => {
            const raw = this.item[key];
            if (!raw) return;
            const norm = String(raw).trim();
            if (!norm) return;

            let href;
            let isFile = false;
            if (type === 'doi') {
              href = doiHref(norm);
            } else if (type === 'file') {
              href = fileHref(norm);
              isFile = true;
            } else {
              href = toHref(norm);
            }
            if (!href || seen.has(href)) return;
            seen.add(href);

            const email = !isFile && type !== 'doi' && isEmail(norm);
            links.push({
              href,
              download: isFile,
              icon: icon || (isFile ? 'bx-download' : type === 'doi' ? 'bx-link-external' : email ? 'bx-envelope' : 'bx-link-alt'),
              title: title || key
            });
          });
          return links;
        }
      },
      template: `
        <div class="row align-right">
            <a v-for="link in links" :key="link.href" :href="link.href" :target="link.download ? null : '_blank'" :download="link.download" :title="link.title">
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
