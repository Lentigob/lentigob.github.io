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
            <svg class="icon-svg bx-spin"><use xlink:href="assets/icons/sprite.svg#bx-loader-alt"></use></svg> Cargardo agenda de eventos...
        </div>
        <div v-show="!loading" class="layout-grid">
            <div class="card card--interactive card--accent-left" v-for="ev in items" :key="ev.nombreevento">
                <div class="card-image-container" v-if="ev.imagen">
                    <a :href="ev.imagen" target="_blank" title="Ver imagen completa">
                        <img :src="ev.imagen" :alt="ev.nombreevento" class="image-photo" @error="$event.target.parentElement.parentElement.style.display='none'">
                    </a>
                </div>
                <div class="card__section card__section--top card__section--muted">
                    <div class="card-row card-row--between">
                        <span class="badge badge-blue">{{ ev.tipo }}</span>
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-calendar"></use></svg> {{ ev.fechainicio }} - {{ ev.fechafin }}</span>
                    </div>
                </div>
                <div class="card__body card__body--stack">
                    <md-content>
                        #### {{ ev.url ? ('<a href="' + ev.url + '" target="_blank">' + ev.nombreevento + '</a>') : ev.nombreevento }}
                        <br>
                        *{{ ev.titulo }}*
                    </md-content>
                </div>
                <div class="card__section card__section--bottom card__section--muted">
                    <div class="card-row card-row--left">
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-user"></use></svg> {{ ev.autores }}</span>
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-map-pin"></use></svg> {{ ev.institucionsede }} ({{ ev.alcance }})</span>
                    </div>
                    <div class="card-row card-row--between">
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-briefcase"></use></svg> {{ ev.organizador }}</span>
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-flag"></use></svg> {{ ev.etapa }}</span>
                    </div>
                    <div class="card-row card-row--left" v-if="ev.url">
                        <a :href="ev.url" target="_blank" class="data-action">
                            <svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-link-external"></use></svg>
                            Ver evento
                        </a>
                    </div>
                </div>
            </div>
            <div v-show="items.length === 0" class="no-results">
                No se encontraron eventos con los criterios seleccionados.
            </div>
        </div>
    </script>
</csv-loader>
</div>
