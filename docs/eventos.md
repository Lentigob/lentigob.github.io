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
                    <div class="card-image-container" v-if="ev.imagen">
                        <a v-if="ev.url" :href="ev.url" target="_blank" title="Ver información">
                            <img :src="ev.imagen" :alt="ev.nombreevento" class="image-photo" @error="$event.target.parentElement.parentElement.style.display='none'">
                        </a>
                        <img v-else :src="ev.imagen" :alt="ev.nombreevento" class="image-photo" @error="$event.target.parentElement.style.display='none'">
                    </div>
                </template>
                <template #top>
                    <div class="row row-xs align-right">
                        <span class="card-inline"><icon-svg name="bx-calendar"></icon-svg> {{ ev.fechainicio }} - {{ ev.fechafin }}</span>
                    </div>
                </template>
                <div class="card-content">
                    <md-content>
                        #### {{ ev.url ? ('<a href="' + ev.url + '" target="_blank">' + ev.nombreevento + '</a>') : ev.nombreevento }} <br>
                        {{ ev.titulo ? '*' + ev.titulo + '*' : '' }}
                    </md-content>
                    <ul class="icon-bullets">
                        <li><icon-svg name="bx-user"></icon-svg><span>{{ ev.autores }}</span></li>
                        <li><icon-svg name="bx-map-pin"></icon-svg><span>{{ ev.institucionsede }} ({{ ev.alcance }})</span></li>
                        <li><icon-svg name="bx-briefcase"></icon-svg><span>{{ ev.organizador }}</span></li>
                        <li><icon-svg name="bx-flag"></icon-svg><span>{{ ev.etapa }}</span></li>
                    </ul>
                </div>
                <template #bottom>
                    <div class="row space-between">
                        <span class="badge badge-default">{{ ev.tipo }}</span>
                        <div>
                            <a v-if="ev.url" :href="ev.url" target="_blank" class="data-action">
                                <icon-svg name="bx-link-external"></icon-svg>
                                Ver evento
                            </a>
                        </div>
                    </div>
                </template>
            </card-block>
            <div v-show="items.length === 0" class="no-results">
                No se encontraron eventos con los criterios seleccionados.
            </div>
        </div>
    </script>
</csv-loader>
</div>
