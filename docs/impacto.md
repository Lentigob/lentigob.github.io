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
            <icon-svg name="bx-loader-alt" class="bx-spin"></icon-svg> Cargardo trayectoria...
        </div>
        <div v-show="!loading" class="layout-grid">
            <card-block v-for="item in items" :key="item.nombre" interactive>
                <div class="muted row space-between">
                    <span class="badge badge-amber">{{ item.tipologro }}</span>
                    <span class="card-inline"><icon-svg name="bx-trophy"></icon-svg> {{ item.fecha }}</span>
                </div>
                <md-content class="card-content">
                    #### {{ item.url ? ('<a href="' + item.url + '" target="_blank">' + item.nombre + '</a>') : item.nombre }}
                    <br>
                    {{ item.descripcion }}
                </md-content>
                <div class="muted">
                    <div class="row">
                        <span class="card-inline"><icon-svg name="bx-map-pin"></icon-svg> {{ item.institucion }}</span>
                        <span class="card-inline"><icon-svg name="bx-world"></icon-svg> {{ item.pais }}</span>
                    </div>
                    <div class="row" v-if="item.url">
                        <a :href="item.url" target="_blank" class="data-action">
                            <icon-svg name="bx-link-external"></icon-svg>
                            Ver más
                        </a>
                    </div>
                </div>
            </card-block>
            <div v-show="items.length === 0" class="no-results">
                No se encontraron logros con los criterios seleccionados.
            </div>
        </div>
    </script>
</csv-loader>
</div>
