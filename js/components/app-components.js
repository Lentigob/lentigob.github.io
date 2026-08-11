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
  function registerAppComponents(app) {
    app.component('proyecto-row', {
      props: { item: { type: Object, required: true } },
      template: `
        <td>
            <a v-if="item.imagen && item.url" :href="item.url" target="_blank" title="Ver información">
                <img :src="item.imagen" :alt="item.titulo" class="data-table__thumbnail" @error="$event.target.parentElement.style.display='none'">
            </a>
            <img v-else-if="item.imagen" :src="item.imagen" :alt="item.titulo" class="data-table__thumbnail" @error="$event.target.style.display='none'">
        </td>
        <td>
            <a v-if="item.url" :href="item.url" target="_blank" class="data-table__title-link">
                <strong class="data-table__title">{{ item.titulo }}</strong>
            </a>
            <strong v-else class="data-table__title">{{ item.titulo }}</strong>
            <span class="data-table__subtitle">{{ 'Investigadores: ' + item.investigadores }}</span>
        </td>
        <td>
            <span class="badge badge-blue">{{ item.institucion }}</span>
        </td>
        <td>
            <span class="badge" :class="{
                'badge-green': item.situacion.toLowerCase() === 'terminado',
                'badge-yellow': item.situacion.toLowerCase() === 'activo',
                'badge-red': item.situacion.toLowerCase() === 'pausado'
            }">{{ item.situacion }}</span>
        </td>
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
                <strong class="data-table__title">{{ item.titulo || item.nombre }}</strong>
            </a>
            <strong v-else class="data-table__title">{{ item.titulo || item.nombre }}</strong>
            <span class="data-table__subtitle">{{ item.autores || item.participantes }}</span>
            <span class="data-table__subtitle" style="font-style: italic;" v-if="item.revistaeditorial">{{ item.revistaeditorial }}</span>
        </td>
        <td><span class="badge badge-blue">{{ item.tipo }}</span></td>
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
    // Slot nombrado: #image (opcional) - imagen arriba de la tarjeta
    // Slot default: contenido principal de la tarjeta
    // Las clases modificadoras:
    //    .interactive - agrega hover y box-shadow, para tarjetas que son links
    // Clases de utilidad para el contenido de la tarjeta:
    //    .muted - texto gris, para subtítulos o secciones secundarias
    //    .row (align-right, space-between) - para alinear elementos en fila dentro de la tarjeta

    app.component('card-block', {
      props: { interactive: { type: Boolean, default: false } },
      template: `
        <div :class="['card', { 'interactive': interactive }]">
            <slot name="image"></slot>
            <div class="card__body">
                <slot></slot>
            </div>
        </div>
      `
    });
  }

  window.registerAppComponents = registerAppComponents;
})();
