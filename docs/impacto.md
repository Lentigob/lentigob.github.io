# Impacto y Trayectoria

Logros e impactos del proyecto en el ámbito académico e industrial.

<div class="vue-mount">
<csv-loader src="data/Premios_Impacto.csv" filter-col="tipologro" category="Todos">
    <script type="text/template">
        <div class="filters">
            <div class="filter-group">
                <input type="text" v-model="searchQuery" placeholder="Buscar logro, institución o país..." class="form-control" style="max-width: 300px; display: inline-block;">
                <select v-model="selectedYear" class="form-control" style="max-width: 150px; display: inline-block;">
                    <option v-for="year in years" :value="year">{{ year === 'Todos' ? 'Todos los años' : year }}</option>
                </select>
            </div>
            <div class="filters__tags">
                <button v-for="cat in categories" @click="activeCategory = cat" :class="{'active': activeCategory === cat}" class="filter-chip">{{ cat }}</button>
            </div>
        </div>
        <div v-show="loading" class="loading-state">
            <svg class="icon-svg bx-spin"><use xlink:href="assets/icons/sprite.svg#bx-loader-alt"></use></svg> Cargardo trayectoria...
        </div>
        <div v-show="!loading" class="layout-grid">
            <div class="card card--interactive card--accent-left" v-for="item in items" :key="item.nombre">
                <div class="card__section card__section--top card__section--muted">
                    <div class="card-row card-row--between">
                        <span class="badge badge-amber">{{ item.tipologro }}</span>
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-trophy"></use></svg> {{ item.fecha }}</span>
                    </div>
                </div>
                <div class="card__body card__body--stack">
                    <md-content>
                        #### {{ item.url ? ('<a href="' + item.url + '" target="_blank">' + item.nombre + '</a>') : item.nombre }} 
                        <br>
                        {{ item.descripcion }}
                    </md-content>
                </div>
                <div class="card__section card__section--bottom card__section--muted">
                    <div class="card-row card-row--left">
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-map-pin"></use></svg> {{ item.institucion }}</span>
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-world"></use></svg> {{ item.pais }}</span>
                    </div>
                    <div class="card-row card-row--left" v-if="item.url">
                        <a :href="item.url" target="_blank" class="data-action">
                            <svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-link-external"></use></svg>
                            Ver más
                        </a>
                    </div>
                </div>
            </div>
            <div v-show="items.length === 0" class="no-results">
                No se encontraron logros con los criterios seleccionados.
            </div>
        </div>
    </script>
</csv-loader>
</div>
