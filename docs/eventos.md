# Eventos

Congresos, talleres y seminarios donde participamos.

<div class="vue-mount">
<csv-loader src="data/Eventos.csv" filter-col="tipo" category="Todos">
    <script type="text/template">
        <div class="filters">
            <div class="filter-group">
                <input type="text" v-model="searchQuery" placeholder="Buscar evento, ponente o tema..." class="form-control" style="max-width: 300px; display: inline-block;">
                <select v-model="selectedYear" class="form-control" style="max-width: 150px; display: inline-block;">
                    <option v-for="year in years" :value="year">{{ year === 'Todos' ? 'Todos los años' : year }}</option>
                </select>
            </div>
            <div class="filters__tags">
                <button v-for="cat in categories" @click="activeCategory = cat" :class="{'active': activeCategory === cat}" class="filter-chip">{{ cat }}</button>
            </div>
        </div>
        <div v-show="loading" class="loading-state">
            <icon-svg name="bx-loader-alt" class="bx-spin"></icon-svg> Cargardo agenda de eventos...
        </div>
        <div v-show="!loading" class="layout-grid">
            <card-block v-for="ev in items" :key="ev.nombreevento" class="interactive">
                <template #image>
                    <a v-if="ev.url || ev.imagen" :href="ev.url ? $toHref(ev.url) : ev.imagen" target="_blank" :title="ev.url ? 'Ver información' : 'Ver imagen completa'" class="card-image-container">
                        <img src="assets/img/logo.png" class="image-placeholder">
                        <img v-if="ev.imagen" :src="ev.imagen" :alt="ev.nombreevento" class="image-photo" @error="$event.target.style.display='none'">
                    </a>
                    <div v-else class="card-image-container">
                        <img src="assets/img/logo.png" class="image-placeholder">
                    </div>
                </template>
                <div class="row align-right">
                    <span class="badge badge-default">{{ ev.anio }}</span>
                    <span class="badge badge-default">{{ ev.tipo }}</span>
                </div>
                <div class="card-separator"></div>
                <md-content class="card-content">
                    #### {{ ev.url ? ('<a href="' + ev.url + '" target="_blank">' + ev.titulo + '</a>') : ev.titulo }}
                </md-content>
                <ul class="icon-bullets">
                    <li v-if="ev.nombredeevento"><icon-svg name="bx-user"></icon-svg><span>{{ ev.nombredeevento }}</span></li>
                    <li v-if="ev.autores"><icon-svg name="bx-user"></icon-svg><span>{{ ev.autores }}</span></li>
                    <li v-if="ev.institucionsede"><icon-svg name="bx-map-pin"></icon-svg><span>{{ ev.institucionsede }}</span></li>
                    <li v-if="ev.organizador"><icon-svg name="bx-briefcase"></icon-svg><span>{{ ev.organizador }}</span></li>
                    <li v-if="ev.etapa"><icon-svg name="bx-flag"></icon-svg><span>{{ ev.etapa }}</span></li>
                    <li><icon-svg name="bx-calendar"></icon-svg><span>{{ ev.fechainicio }} - {{ ev.fechafin }}</span></li>
                </ul>
                <template #bottom>
                    <action-icons :item="ev" :fields="[
                        { key: 'url', icon: 'bx-link-external', title: 'Ver evento' },
                        { key: 'archivo', title: 'Descargar archivo', type: 'file' }
                    ]"></action-icons>
                </template>
            </card-block>
            <div v-show="items.length === 0" class="no-results">
                No se encontraron eventos con los criterios seleccionados.
            </div>
        </div>
    </script>
</csv-loader>
</div>
